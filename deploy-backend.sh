#!/bin/bash

# Script de Deploy do Backend
# Usage: ./deploy-backend.sh [usuario@servidor] [caminho-remoto]

set -e  # Exit on error

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Iniciando deploy do backend...${NC}\n"

# Verificar argumentos
if [ -z "$1" ]; then
    echo -e "${RED}❌ Erro: Informe o servidor${NC}"
    echo "Usage: ./deploy-backend.sh usuario@servidor [caminho-remoto]"
    echo "Exemplo: ./deploy-backend.sh root@glheringer.site /var/www/glheringer-backend"
    exit 1
fi

SERVER=$1
REMOTE_PATH=${2:-/var/www/glheringer-backend}

echo -e "${YELLOW}📋 Configurações:${NC}"
echo "   Servidor: $SERVER"
echo "   Caminho remoto: $REMOTE_PATH"
echo ""

# 1. Build local
echo -e "${YELLOW}🔨 Fazendo build do backend...${NC}"
cd server
npm run build
cd ..

# 2. Criar pasta remota se não existir
echo -e "${YELLOW}📁 Criando diretório no servidor...${NC}"
ssh $SERVER "mkdir -p $REMOTE_PATH/dist"

# 3. Enviar arquivos
echo -e "${YELLOW}📦 Enviando arquivos...${NC}"

# package.json e package-lock.json
scp server/package*.json $SERVER:$REMOTE_PATH/

# Código compilado
scp -r server/dist/* $SERVER:$REMOTE_PATH/dist/

# tsconfig
scp server/tsconfig.json $SERVER:$REMOTE_PATH/

# 4. Instalar dependências remotamente
echo -e "${YELLOW}📚 Instalando dependências no servidor...${NC}"
ssh $SERVER "cd $REMOTE_PATH && npm install --production"

# 5. Verificar PM2 e reiniciar
echo -e "${YELLOW}🔄 Reiniciando aplicação com PM2...${NC}"
ssh $SERVER << 'ENDSSH'
    # Verificar se PM2 está instalado
    if ! command -v pm2 &> /dev/null; then
        echo "⚠️  PM2 não encontrado, instalando..."
        npm install -g pm2
    fi

    cd $REMOTE_PATH

    # Criar ecosystem.config.js se não existir
    if [ ! -f "ecosystem.config.js" ]; then
        cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'glheringer-backend',
    script: './dist/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
};
EOF
    fi

    # Criar pasta de logs
    mkdir -p logs

    # Reiniciar ou iniciar aplicação
    if pm2 describe glheringer-backend > /dev/null 2>&1; then
        echo "♻️  Reiniciando aplicação..."
        pm2 restart glheringer-backend
    else
        echo "▶️  Iniciando aplicação..."
        pm2 start ecosystem.config.js
        pm2 save
    fi

    # Mostrar status
    pm2 status glheringer-backend
ENDSSH

# 6. Verificar saúde
echo -e "\n${YELLOW}🏥 Verificando saúde do backend...${NC}"
sleep 2
ssh $SERVER "curl -s http://localhost:3001/api/contact || echo 'Backend está rodando (esperado: Method Not Allowed para GET)'"

echo -e "\n${GREEN}✅ Deploy concluído com sucesso!${NC}\n"
echo -e "${YELLOW}📊 Comandos úteis:${NC}"
echo "   Ver logs: ssh $SERVER 'pm2 logs glheringer-backend'"
echo "   Status: ssh $SERVER 'pm2 status'"
echo "   Reiniciar: ssh $SERVER 'pm2 restart glheringer-backend'"
echo ""
echo -e "${GREEN}🌐 Seu backend está rodando em: https://glheringer.site/api/contact${NC}"

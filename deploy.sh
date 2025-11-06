#!/bin/bash

# Script de deploy para VPS Oracle Cloud
# Autor: Guilherme Heringer

set -e

echo "🚀 Iniciando deploy do portfólio..."

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Variáveis (Ajuste conforme necessário)
PROJECT_NAME="glheringer-portfolio"
DEPLOY_DIR="/var/www/${PROJECT_NAME}"
NGINX_CONF="/etc/nginx/sites-available/${PROJECT_NAME}"
REPO_URL="https://github.com/glheringer/glheringer-portfolio.git"

# Verificar se está rodando como root ou sudo
if [ "$EUID" -ne 0 ]; then
    echo -e "${RED}Por favor, execute com sudo${NC}"
    exit 1
fi

echo -e "${BLUE}📦 Instalando dependências do sistema...${NC}"

# Atualizar sistema
apt update && apt upgrade -y

# Instalar Node.js e Bun
if ! command -v node &> /dev/null; then
    echo -e "${BLUE}Instalando Node.js...${NC}"
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt install -y nodejs
fi

if ! command -v bun &> /dev/null; then
    echo -e "${BLUE}Instalando Bun...${NC}"
    curl -fsSL https://bun.sh/install | bash
    export BUN_INSTALL="$HOME/.bun"
    export PATH="$BUN_INSTALL/bin:$PATH"
fi

# Instalar Nginx se não estiver instalado
if ! command -v nginx &> /dev/null; then
    echo -e "${BLUE}Instalando Nginx...${NC}"
    apt install -y nginx
fi

# Instalar Git se não estiver instalado
if ! command -v git &> /dev/null; then
    echo -e "${BLUE}Instalando Git...${NC}"
    apt install -y git
fi

echo -e "${GREEN}✅ Dependências instaladas${NC}"

# Criar diretório do projeto
echo -e "${BLUE}📁 Configurando diretório do projeto...${NC}"
mkdir -p ${DEPLOY_DIR}
cd ${DEPLOY_DIR}

# Clonar ou atualizar repositório
if [ -d ".git" ]; then
    echo -e "${BLUE}Atualizando repositório...${NC}"
    git fetch origin main
    git reset --hard origin/main
else
    echo -e "${BLUE}Clonando repositório...${NC}"
    git clone ${REPO_URL} .
fi

echo -e "${GREEN}✅ Código atualizado${NC}"

# Instalar dependências e fazer build
echo -e "${BLUE}📦 Instalando dependências do projeto...${NC}"
bun install

echo -e "${BLUE}🔨 Fazendo build do projeto...${NC}"
bun run build

echo -e "${GREEN}✅ Build concluído${NC}"

# Configurar Nginx
echo -e "${BLUE}⚙️  Configurando Nginx...${NC}"

cat > ${NGINX_CONF} << 'EOF'
server {
    listen 80;
    listen [::]:80;

    server_name _; # Substitua pelo seu domínio

    root /var/www/glheringer-portfolio/dist;
    index index.html;

    # Compressão Gzip
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript application/json;

    # Cache de assets estáticos
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Configuração para SPA (Single Page Application)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
EOF

# Ativar site no Nginx
ln -sf ${NGINX_CONF} /etc/nginx/sites-enabled/

# Remover configuração padrão se existir
if [ -f "/etc/nginx/sites-enabled/default" ]; then
    rm /etc/nginx/sites-enabled/default
fi

# Testar configuração do Nginx
echo -e "${BLUE}🧪 Testando configuração do Nginx...${NC}"
nginx -t

# Reiniciar Nginx
echo -e "${BLUE}🔄 Reiniciando Nginx...${NC}"
systemctl restart nginx
systemctl enable nginx

echo -e "${GREEN}✅ Nginx configurado e rodando${NC}"

# Configurar firewall
echo -e "${BLUE}🔥 Configurando firewall...${NC}"
if command -v ufw &> /dev/null; then
    ufw allow 'Nginx Full'
    ufw allow OpenSSH
    ufw --force enable
    echo -e "${GREEN}✅ Firewall configurado${NC}"
fi

# Ajustar permissões
echo -e "${BLUE}🔐 Ajustando permissões...${NC}"
chown -R www-data:www-data ${DEPLOY_DIR}
chmod -R 755 ${DEPLOY_DIR}

echo ""
echo -e "${GREEN}╔══════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                                              ║${NC}"
echo -e "${GREEN}║  ✅ Deploy concluído com sucesso!            ║${NC}"
echo -e "${GREEN}║                                              ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${BLUE}📍 Seu site está disponível em:${NC}"
echo -e "   http://$(curl -s ifconfig.me)"
echo ""
echo -e "${BLUE}📝 Próximos passos (opcional):${NC}"
echo -e "   1. Configure seu domínio apontando para: $(curl -s ifconfig.me)"
echo -e "   2. Execute o script SSL para HTTPS: sudo bash ssl-setup.sh seu-dominio.com"
echo ""

# 🔗 Deploy Automático via GitHub na VPS

Guia completo para configurar deploy automático do portfólio (frontend + backend) via Git na mesma VPS.

## 🎯 Arquitetura

```
VPS (glheringer.site)
├── /var/www/glheringer-portfolio/     # Repositório Git
│   ├── src/                            # Frontend
│   ├── server/                         # Backend
│   ├── dist/                           # Build do frontend
│   └── server/dist/                    # Build do backend
│
├── Nginx                               # Reverse Proxy
│   ├── Frontend: / → dist/
│   └── Backend: /api/ → localhost:3001
│
└── PM2                                 # Process Manager
    └── Backend rodando em :3001
```

---

## 📋 Pré-requisitos

- ✅ VPS com Ubuntu/Debian
- ✅ Acesso SSH root ou sudo
- ✅ Node.js 18+ instalado
- ✅ Git instalado
- ✅ Nginx instalado
- ✅ Domínio configurado (glheringer.site)

---

## 🚀 Parte 1: Configuração Inicial da VPS

### 1.1 Conectar via SSH

```bash
ssh seu-usuario@glheringer.site
```

### 1.2 Instalar Dependências (se necessário)

```bash
# Atualizar pacotes
sudo apt update && sudo apt upgrade -y

# Instalar Git
sudo apt install git -y

# Instalar Node.js (se não tiver)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install nodejs -y

# Verificar versões
node --version  # Deve ser 18+
npm --version
git --version

# Instalar PM2 globalmente
sudo npm install -g pm2

# Instalar Nginx (se não tiver)
sudo apt install nginx -y
```

### 1.3 Configurar SSH Key para GitHub (Recomendado)

```bash
# Gerar chave SSH (se não tiver)
ssh-keygen -t ed25519 -C "seu-email@gmail.com"
# Pressione Enter 3 vezes (sem senha)

# Copiar chave pública
cat ~/.ssh/id_ed25519.pub
```

**Adicione a chave no GitHub:**
1. Vá em: https://github.com/settings/keys
2. Clique em "New SSH key"
3. Cole a chave pública
4. Salve

**Testar conexão:**
```bash
ssh -T git@github.com
# Deve aparecer: "Hi seu-usuario! You've successfully authenticated..."
```

---

## 📦 Parte 2: Clonar Repositório na VPS

### 2.1 Criar Diretório e Clonar

```bash
# Criar diretório
sudo mkdir -p /var/www
cd /var/www

# Clonar repositório (via SSH - recomendado)
sudo git clone git@github.com:glheringer/glheringer-portfolio.git

# OU via HTTPS (se não configurou SSH)
sudo git clone https://github.com/glheringer/glheringer-portfolio.git

# Entrar no diretório
cd glheringer-portfolio

# Dar permissões ao seu usuário
sudo chown -R $USER:$USER /var/www/glheringer-portfolio
```

### 2.2 Instalar Dependências

```bash
# Dependências do frontend
npm install

# Dependências do backend
cd server
npm install
cd ..
```

---

## ⚙️ Parte 3: Configurar Variáveis de Ambiente

### 3.1 Frontend (.env na raiz)

```bash
cd /var/www/glheringer-portfolio
nano .env
```

Adicione:
```bash
# Frontend Environment Variables
VITE_API_URL=https://glheringer.site
```

### 3.2 Backend (server/.env)

```bash
nano server/.env
```

Adicione:
```bash
# Server Environment Variables
PORT=3001
NODE_ENV=production

# Supabase Configuration
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=sua-chave-anon

# CORS
ALLOWED_ORIGINS=https://glheringer.site,https://www.glheringer.site

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

**⚠️ IMPORTANTE:** Adicione `.env` ao `.gitignore` (já deve estar):
```bash
# Verificar
cat .gitignore | grep .env
```

---

## 🏗️ Parte 4: Fazer Build

### 4.1 Build do Frontend

```bash
cd /var/www/glheringer-portfolio
npm run build
```

Isso criará a pasta `dist/` com os arquivos estáticos.

### 4.2 Build do Backend

```bash
cd server
npm run build
cd ..
```

Isso criará a pasta `server/dist/` com o código compilado.

---

## 🔄 Parte 5: Configurar PM2 para Backend

### 5.1 Criar arquivo de configuração do PM2

```bash
cd /var/www/glheringer-portfolio
nano ecosystem.config.js
```

Cole este conteúdo:

```javascript
module.exports = {
  apps: [
    {
      name: 'glheringer-backend',
      script: './server/dist/index.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      },
      error_file: './logs/backend-err.log',
      out_file: './logs/backend-out.log',
      log_file: './logs/backend-combined.log',
      time: true
    }
  ]
};
```

### 5.2 Criar pasta de logs

```bash
mkdir -p /var/www/glheringer-portfolio/logs
```

### 5.3 Iniciar Backend com PM2

```bash
cd /var/www/glheringer-portfolio
pm2 start ecosystem.config.js

# Ver status
pm2 status

# Ver logs
pm2 logs glheringer-backend

# Salvar configuração para iniciar no boot
pm2 startup
# Copie e execute o comando que aparecer
pm2 save
```

---

## 🌐 Parte 6: Configurar Nginx

### 6.1 Criar/Editar configuração do Nginx

```bash
sudo nano /etc/nginx/sites-available/glheringer.site
```

Cole esta configuração completa:

```nginx
# Upstream do backend
upstream backend {
    server 127.0.0.1:3001;
    keepalive 64;
}

# Servidor principal
server {
    listen 80;
    listen [::]:80;
    server_name glheringer.site www.glheringer.site;

    # Logs
    access_log /var/log/nginx/glheringer-access.log;
    error_log /var/log/nginx/glheringer-error.log;

    # Tamanho máximo de upload (para formulário)
    client_max_body_size 10M;

    # Proxy para backend (/api/*)
    location /api/ {
        proxy_pass http://backend;
        proxy_http_version 1.1;

        # Headers
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;

        # Cache
        proxy_cache_bypass $http_upgrade;
    }

    # Frontend (SPA)
    location / {
        root /var/www/glheringer-portfolio/dist;
        try_files $uri $uri/ /index.html;

        # Headers de segurança
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;

        # Cache para index.html (sem cache)
        location = /index.html {
            add_header Cache-Control "no-cache, no-store, must-revalidate";
            add_header Pragma "no-cache";
            add_header Expires "0";
        }

        # Cache para assets (longo prazo)
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|webp)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
            access_log off;
        }
    }

    # Bloquear acesso a arquivos sensíveis
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }

    location ~ /\.env {
        deny all;
        access_log off;
        log_not_found off;
    }
}
```

### 6.2 Habilitar Site e Testar

```bash
# Criar link simbólico (se não existir)
sudo ln -sf /etc/nginx/sites-available/glheringer.site /etc/nginx/sites-enabled/

# Remover configuração padrão (se existir)
sudo rm -f /etc/nginx/sites-enabled/default

# Testar configuração
sudo nginx -t

# Recarregar Nginx
sudo systemctl reload nginx

# Verificar status
sudo systemctl status nginx
```

### 6.3 Configurar SSL com Certbot

```bash
# Instalar Certbot (se não tiver)
sudo apt install certbot python3-certbot-nginx -y

# Obter certificado SSL
sudo certbot --nginx -d glheringer.site -d www.glheringer.site

# Certbot irá:
# - Obter certificado SSL gratuito
# - Configurar HTTPS automaticamente
# - Configurar renovação automática

# Testar renovação
sudo certbot renew --dry-run
```

---

## ✅ Parte 7: Testar Tudo

### 7.1 Verificar Backend

```bash
# Teste local
curl http://localhost:3001/api/contact
# Deve retornar: Cannot GET (esperado)

# Teste externo
curl https://glheringer.site/api/contact
# Deve retornar: Cannot GET (esperado)
```

### 7.2 Verificar Frontend

Acesse no navegador:
- https://glheringer.site
- Deve carregar o portfólio
- Teste o formulário de contato
- Deve aparecer toast de sucesso! ✨

### 7.3 Ver Logs

```bash
# Logs do backend
pm2 logs glheringer-backend

# Logs do Nginx
sudo tail -f /var/log/nginx/glheringer-error.log
sudo tail -f /var/log/nginx/glheringer-access.log
```

---

## 🔄 Parte 8: Criar Script de Deploy Automático

### 8.1 Criar script de deploy na VPS

```bash
nano /var/www/glheringer-portfolio/deploy.sh
```

Cole este conteúdo:

```bash
#!/bin/bash

# Script de Deploy Automático
# Usage: ./deploy.sh [branch]

set -e  # Exit on error

BRANCH=${1:-main}
PROJECT_DIR="/var/www/glheringer-portfolio"

echo "🚀 Iniciando deploy do branch: $BRANCH"
echo "📂 Diretório: $PROJECT_DIR"
echo ""

cd $PROJECT_DIR

# 1. Backup do .env (importante!)
echo "💾 Fazendo backup dos .env..."
cp .env .env.backup 2>/dev/null || true
cp server/.env server/.env.backup 2>/dev/null || true

# 2. Git pull
echo "📥 Baixando últimas mudanças do GitHub..."
git fetch origin
git reset --hard origin/$BRANCH

# 3. Restaurar .env
echo "♻️  Restaurando arquivos .env..."
cp .env.backup .env 2>/dev/null || true
cp server/.env.backup server/.env 2>/dev/null || true

# 4. Instalar dependências
echo "📦 Instalando dependências do frontend..."
npm install

echo "📦 Instalando dependências do backend..."
cd server
npm install
cd ..

# 5. Build frontend
echo "🏗️  Fazendo build do frontend..."
npm run build

# 6. Build backend
echo "🏗️  Fazendo build do backend..."
cd server
npm run build
cd ..

# 7. Reiniciar backend
echo "🔄 Reiniciando backend com PM2..."
pm2 restart glheringer-backend || pm2 start ecosystem.config.js

# 8. Limpar cache do Nginx (opcional)
echo "🧹 Limpando cache do Nginx..."
sudo systemctl reload nginx

# 9. Ver status
echo ""
echo "✅ Deploy concluído com sucesso!"
echo ""
echo "📊 Status do backend:"
pm2 status glheringer-backend

echo ""
echo "🌐 Seu site está disponível em:"
echo "   Frontend: https://glheringer.site"
echo "   Backend: https://glheringer.site/api/contact"
echo ""
echo "📋 Logs:"
echo "   Backend: pm2 logs glheringer-backend"
echo "   Nginx: sudo tail -f /var/log/nginx/glheringer-error.log"
```

### 8.2 Dar permissão de execução

```bash
chmod +x /var/www/glheringer-portfolio/deploy.sh
```

### 8.3 Testar o script

```bash
cd /var/www/glheringer-portfolio
./deploy.sh
```

---

## 🎯 Fluxo de Trabalho (Workflow)

### No seu computador local:

```bash
# 1. Fazer mudanças no código
# 2. Commit
git add .
git commit -m "feat: nova funcionalidade"

# 3. Push para GitHub
git push origin main
```

### Na VPS:

```bash
# 4. Executar deploy
ssh usuario@glheringer.site
cd /var/www/glheringer-portfolio
./deploy.sh
```

**Pronto! Site atualizado em ~2 minutos!** 🚀

---

## 🤖 Parte 9: Automatizar Deploy com Webhook (BONUS)

### 9.1 Instalar webhook listener

```bash
# Na VPS
sudo npm install -g webhook
```

### 9.2 Criar configuração do webhook

```bash
nano /var/www/glheringer-portfolio/webhook.json
```

```json
[
  {
    "id": "deploy-portfolio",
    "execute-command": "/var/www/glheringer-portfolio/deploy.sh",
    "command-working-directory": "/var/www/glheringer-portfolio",
    "pass-arguments-to-command": [],
    "trigger-rule": {
      "match": {
        "type": "payload-hash-sha256",
        "secret": "seu-secret-aqui-mude-isso",
        "parameter": {
          "source": "header",
          "name": "X-Hub-Signature-256"
        }
      }
    }
  }
]
```

### 9.3 Iniciar webhook com PM2

```bash
# Adicionar ao ecosystem.config.js
nano ecosystem.config.js
```

Adicione o webhook:

```javascript
module.exports = {
  apps: [
    {
      name: 'glheringer-backend',
      script: './server/dist/index.js',
      // ... configuração existente
    },
    {
      name: 'github-webhook',
      script: 'webhook',
      args: '-hooks webhook.json -verbose -port 9000',
      cwd: '/var/www/glheringer-portfolio'
    }
  ]
};
```

```bash
pm2 restart ecosystem.config.js
pm2 save
```

### 9.4 Configurar no GitHub

1. Vá em: https://github.com/seu-usuario/glheringer-portfolio/settings/hooks
2. Clique em "Add webhook"
3. **Payload URL:** `https://glheringer.site:9000/hooks/deploy-portfolio`
4. **Content type:** `application/json`
5. **Secret:** (mesmo do webhook.json)
6. **Events:** Just the push event
7. Salve

**Agora todo `git push` fará deploy automático!** 🎉

---

## 📊 Comandos Úteis

### Gerenciar Aplicação

```bash
# Status geral
pm2 status

# Logs em tempo real
pm2 logs glheringer-backend

# Reiniciar backend
pm2 restart glheringer-backend

# Ver uso de recursos
pm2 monit

# Parar backend
pm2 stop glheringer-backend
```

### Git

```bash
cd /var/www/glheringer-portfolio

# Ver status
git status

# Ver commits recentes
git log --oneline -10

# Mudar de branch
git checkout outra-branch
./deploy.sh outra-branch

# Voltar para main
git checkout main
./deploy.sh
```

### Nginx

```bash
# Testar configuração
sudo nginx -t

# Recarregar
sudo systemctl reload nginx

# Reiniciar
sudo systemctl restart nginx

# Ver logs
sudo tail -f /var/log/nginx/glheringer-error.log
```

---

## 🐛 Troubleshooting

### Git pull falha (mudanças locais)

```bash
cd /var/www/glheringer-portfolio

# Ver o que mudou
git status

# Descartar mudanças locais
git reset --hard origin/main

# Ou fazer stash
git stash
git pull
```

### Backend não reinicia

```bash
# Ver logs
pm2 logs glheringer-backend --lines 50

# Deletar e recriar
pm2 delete glheringer-backend
pm2 start ecosystem.config.js
pm2 save
```

### Build falha

```bash
# Limpar node_modules e reinstalar
rm -rf node_modules server/node_modules
npm install
cd server && npm install && cd ..

# Tentar build novamente
npm run build
cd server && npm run build && cd ..
```

### Permissões negadas

```bash
# Dar permissão ao seu usuário
sudo chown -R $USER:$USER /var/www/glheringer-portfolio

# Ou rodar deploy com sudo (não recomendado)
sudo ./deploy.sh
```

---

## ✅ Checklist Final

- [ ] Repositório clonado na VPS
- [ ] Dependências instaladas (frontend + backend)
- [ ] Arquivos .env configurados
- [ ] Builds executados com sucesso
- [ ] PM2 gerenciando backend
- [ ] Nginx configurado com proxy
- [ ] SSL/HTTPS funcionando
- [ ] Script de deploy criado
- [ ] Frontend carrega corretamente
- [ ] Formulário de contato funciona
- [ ] Logs estão OK

---

## 🎉 Pronto!

Seu portfólio agora está:
- ✅ Hospedado na VPS
- ✅ Conectado ao GitHub
- ✅ Com deploy automático via script
- ✅ Frontend + Backend na mesma VPS
- ✅ SSL/HTTPS configurado
- ✅ PM2 gerenciando processos
- ✅ Nginx como reverse proxy

**Workflow de atualização:**
```bash
# Local
git push

# VPS
ssh usuario@glheringer.site
cd /var/www/glheringer-portfolio
./deploy.sh
```

**2 minutos e seu site está atualizado!** 🚀

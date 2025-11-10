# 🚀 Guia de Deploy - Backend na VPS com Nginx

Este guia irá te ajudar a fazer deploy do backend Express na mesma VPS onde está o frontend.

## 📋 Pré-requisitos

- ✅ VPS com acesso SSH
- ✅ Node.js instalado
- ✅ Nginx configurado
- ✅ Supabase configurado
- ✅ Domínio: glheringer.site

---

## 🔧 Passo 1: Preparar o Backend Localmente

### 1.1 Criar arquivo de ambiente do servidor

```bash
# Na pasta do projeto local
cd server
nano .env
```

Adicione suas credenciais do Supabase:

```bash
# Server Environment Variables
PORT=3001
NODE_ENV=production

# Supabase Configuration
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=sua-chave-anon-aqui

# CORS Configuration (permite requisições do frontend)
ALLOWED_ORIGINS=https://glheringer.site,https://www.glheringer.site

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

**⚠️ IMPORTANTE:** Não commite o arquivo `.env`! Ele deve estar no `.gitignore`.

### 1.2 Testar o Backend Localmente

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run server:dev

# Testar se está funcionando
curl http://localhost:3001/api/contact
```

### 1.3 Fazer Build do Backend

```bash
npm run server:build
```

Isso criará a pasta `server/dist/` com o código compilado.

---

## 📦 Passo 2: Enviar Backend para VPS

### 2.1 Conectar via SSH

```bash
ssh seu-usuario@seu-servidor
```

### 2.2 Criar Diretório do Backend

```bash
# Criar pasta para o backend
cd /var/www  # ou onde está seu projeto
mkdir -p glheringer-backend
cd glheringer-backend
```

### 2.3 Enviar Arquivos (do seu computador local)

**Opção A: Via SCP (mais simples)**

```bash
# No seu computador local, na pasta do projeto
cd server

# Enviar package.json e package-lock.json
scp package*.json seu-usuario@seu-servidor:/var/www/glheringer-backend/

# Enviar código compilado
scp -r dist seu-usuario@seu-servidor:/var/www/glheringer-backend/

# Enviar tsconfig (se necessário)
scp tsconfig.json seu-usuario@seu-servidor:/var/www/glheringer-backend/
```

**Opção B: Via Git (recomendado)**

```bash
# Na VPS
cd /var/www/glheringer-backend
git init
git remote add origin https://github.com/glheringer/glheringer-portfolio.git
git pull origin main

# Fazer build na VPS
cd server
npm install
npm run build
```

### 2.4 Instalar Dependências de Produção na VPS

```bash
# Na VPS, na pasta do backend
cd /var/www/glheringer-backend
npm install --production
```

### 2.5 Criar Arquivo .env na VPS

```bash
# Na VPS
nano /var/www/glheringer-backend/.env
```

Cole as mesmas configurações do passo 1.1:

```bash
PORT=3001
NODE_ENV=production
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=sua-chave-anon
ALLOWED_ORIGINS=https://glheringer.site,https://www.glheringer.site
```

Salve com `Ctrl+O`, Enter, `Ctrl+X`.

---

## 🔄 Passo 3: Configurar PM2 (Process Manager)

PM2 vai manter o backend rodando 24/7 e reiniciar automaticamente se cair.

### 3.1 Instalar PM2

```bash
# Instalar PM2 globalmente
sudo npm install -g pm2
```

### 3.2 Criar Arquivo de Configuração do PM2

```bash
cd /var/www/glheringer-backend
nano ecosystem.config.js
```

Cole este conteúdo:

```javascript
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
```

### 3.3 Criar Pasta de Logs

```bash
mkdir -p /var/www/glheringer-backend/logs
```

### 3.4 Iniciar Backend com PM2

```bash
cd /var/www/glheringer-backend
pm2 start ecosystem.config.js
```

### 3.5 Verificar Status

```bash
pm2 status
pm2 logs glheringer-backend
```

### 3.6 Configurar PM2 para Iniciar no Boot

```bash
pm2 startup
# Copie e execute o comando que aparecer

pm2 save
```

---

## 🌐 Passo 4: Configurar Nginx (Reverse Proxy)

### 4.1 Criar Configuração do Backend no Nginx

```bash
sudo nano /etc/nginx/sites-available/glheringer-backend
```

Cole esta configuração:

```nginx
# Upstream do backend
upstream backend {
    server 127.0.0.1:3001;
    keepalive 64;
}

# Bloco do servidor para API
server {
    listen 80;
    server_name glheringer.site www.glheringer.site;

    # Logs
    access_log /var/log/nginx/glheringer-backend-access.log;
    error_log /var/log/nginx/glheringer-backend-error.log;

    # Proxy para /api
    location /api/ {
        proxy_pass http://backend;
        proxy_http_version 1.1;

        # Headers necessários
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

    # Servir frontend (arquivos estáticos)
    location / {
        root /var/www/glheringer-site/dist;  # Ajuste para o caminho do seu frontend
        try_files $uri $uri/ /index.html;

        # Cache para assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

### 4.2 Habilitar a Configuração

```bash
# Criar link simbólico
sudo ln -s /etc/nginx/sites-available/glheringer-backend /etc/nginx/sites-enabled/

# Remover configuração antiga se existir
sudo rm /etc/nginx/sites-enabled/default  # Se necessário

# Testar configuração
sudo nginx -t

# Recarregar Nginx
sudo systemctl reload nginx
```

### 4.3 Configurar SSL com Certbot (HTTPS)

```bash
# Instalar Certbot (se não tiver)
sudo apt update
sudo apt install certbot python3-certbot-nginx

# Obter certificado SSL
sudo certbot --nginx -d glheringer.site -d www.glheringer.site

# Renovação automática já está configurada
```

---

## 🔐 Passo 5: Configurar Frontend para Usar o Backend

### 5.1 Criar Arquivo .env para Frontend (Local)

```bash
# Na pasta raiz do projeto (local)
nano .env
```

Adicione:

```bash
# Frontend Environment Variables
VITE_API_URL=https://glheringer.site
```

### 5.2 Fazer Novo Build do Frontend

```bash
npm run build
```

### 5.3 Enviar Novo Build para VPS

```bash
# Do seu computador local
scp -r dist/* seu-usuario@seu-servidor:/var/www/glheringer-site/dist/
```

---

## ✅ Passo 6: Testar Tudo

### 6.1 Verificar Backend

```bash
# Da VPS
curl http://localhost:3001/api/contact

# Do navegador
https://glheringer.site/api/contact
```

Deve retornar erro de método (GET não permitido), mas confirma que está funcionando.

### 6.2 Testar Formulário

Acesse https://glheringer.site e teste o formulário de contato.

### 6.3 Ver Logs em Tempo Real

```bash
# Logs do PM2
pm2 logs glheringer-backend

# Logs do Nginx
sudo tail -f /var/log/nginx/glheringer-backend-error.log
sudo tail -f /var/log/nginx/glheringer-backend-access.log
```

---

## 🔧 Comandos Úteis

### Gerenciar Backend (PM2)

```bash
# Status
pm2 status

# Logs
pm2 logs glheringer-backend

# Reiniciar
pm2 restart glheringer-backend

# Parar
pm2 stop glheringer-backend

# Deletar
pm2 delete glheringer-backend

# Monitorar recursos
pm2 monit
```

### Atualizar Backend

```bash
# 1. Parar aplicação
pm2 stop glheringer-backend

# 2. Atualizar código (git pull ou scp)
cd /var/www/glheringer-backend
git pull origin main

# 3. Instalar dependências (se houve mudanças)
npm install --production

# 4. Rebuild
npm run build

# 5. Reiniciar
pm2 restart glheringer-backend
```

### Verificar Nginx

```bash
# Status
sudo systemctl status nginx

# Testar configuração
sudo nginx -t

# Recarregar
sudo systemctl reload nginx

# Reiniciar
sudo systemctl restart nginx
```

---

## 🐛 Troubleshooting

### Backend não inicia

```bash
# Ver logs detalhados
pm2 logs glheringer-backend --lines 100

# Verificar se porta 3001 está em uso
sudo lsof -i :3001

# Matar processo na porta 3001 (se necessário)
sudo kill -9 $(sudo lsof -t -i:3001)
```

### Erro de CORS

Verifique se `ALLOWED_ORIGINS` no `.env` tem o domínio correto:
```bash
ALLOWED_ORIGINS=https://glheringer.site,https://www.glheringer.site
```

### Nginx retorna 502 Bad Gateway

```bash
# Verificar se backend está rodando
pm2 status

# Ver logs do Nginx
sudo tail -f /var/log/nginx/glheringer-backend-error.log

# Reiniciar backend
pm2 restart glheringer-backend
```

### Erro de conexão com Supabase

Verifique as credenciais no `.env`:
```bash
cat /var/www/glheringer-backend/.env
```

---

## 📊 Monitoramento

### Ver Uso de Recursos

```bash
# CPU e Memória
pm2 monit

# Logs em tempo real
pm2 logs glheringer-backend --raw
```

### Configurar Alertas (Opcional)

```bash
# Instalar PM2 Plus para monitoramento web
pm2 install pm2-server-monit
```

---

## 🎉 Pronto!

Seu backend agora está rodando em:
- **URL:** https://glheringer.site/api/contact
- **Status:** PM2 gerenciando processo
- **Proxy:** Nginx redirecionando `/api/` para `localhost:3001`
- **SSL:** Certificado válido via Let's Encrypt

**Próximos passos:**
1. Teste o formulário de contato
2. Configure backup do banco de dados (Supabase já faz isso)
3. Configure monitoramento de uptime (UptimeRobot, Pingdom)

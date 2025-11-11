# 🔧 Adicionar Backend ao Deploy Existente

Guia rápido para adicionar o backend ao seu deploy existente do frontend.

## 📋 Situação Atual

- ✅ Frontend já está rodando em produção
- ✅ Nginx já configurado para o frontend
- ✅ Você faz deploy manual do frontend (build + upload)
- 🎯 **Meta:** Adicionar backend na mesma VPS

---

## 🚀 Passo 1: Clonar/Atualizar Repositório na VPS

### 1.1 Verificar onde está seu frontend

```bash
# Conectar na VPS
ssh seu-usuario@glheringer.site

# Encontrar onde está o frontend
# Normalmente em: /var/www/glheringer-site/dist ou similar
ls /var/www
```

### 1.2 Clonar repositório em novo diretório

```bash
# Criar diretório para o repositório completo
cd /var/www
sudo git clone https://github.com/glheringer/glheringer-portfolio.git

# Dar permissões
sudo chown -R $USER:$USER /var/www/glheringer-portfolio

cd glheringer-portfolio
```

**Estrutura ficará:**
```
/var/www/
├── glheringer-site/          # Seu frontend atual (pode manter)
│   └── dist/
└── glheringer-portfolio/     # Novo: repositório completo
    ├── src/
    ├── server/               # Backend aqui!
    ├── dist/                 # Frontend build
    └── server/dist/          # Backend build
```

---

## 📦 Passo 2: Configurar Backend

### 2.1 Instalar dependências do backend

```bash
cd /var/www/glheringer-portfolio/server
npm install
```

### 2.2 Criar arquivo .env do backend

```bash
nano /var/www/glheringer-portfolio/server/.env
```

Cole:
```bash
PORT=3001
NODE_ENV=production

# Suas credenciais do Supabase
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=sua-chave-anon

# CORS
ALLOWED_ORIGINS=https://glheringer.site,https://www.glheringer.site

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

Salve: `Ctrl+O`, Enter, `Ctrl+X`

### 2.3 Fazer build do backend

```bash
cd /var/www/glheringer-portfolio/server
npm run build

# Verificar se criou dist/
ls -la dist/
```

---

## 🔄 Passo 3: Configurar PM2

### 3.1 Criar configuração do PM2

```bash
cd /var/www/glheringer-portfolio
nano ecosystem.config.js
```

Cole:
```javascript
module.exports = {
  apps: [{
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
  }]
};
```

### 3.2 Criar pasta de logs

```bash
mkdir -p /var/www/glheringer-portfolio/logs
```

### 3.3 Instalar PM2 (se não tiver)

```bash
sudo npm install -g pm2
```

### 3.4 Iniciar backend

```bash
cd /var/www/glheringer-portfolio
pm2 start ecosystem.config.js

# Ver status
pm2 status

# Ver logs
pm2 logs glheringer-backend

# Salvar para iniciar no boot
pm2 startup
# Execute o comando que aparecer
pm2 save
```

---

## 🌐 Passo 4: Atualizar Nginx

### 4.1 Editar configuração existente do Nginx

```bash
# Encontrar seu arquivo de configuração
ls /etc/nginx/sites-available/

# Editar (substitua pelo nome correto do seu arquivo)
sudo nano /etc/nginx/sites-available/glheringer.site
```

### 4.2 Adicionar proxy para /api/

**Adicione ANTES do `location /`:**

```nginx
server {
    # ... suas configurações existentes (listen, server_name, ssl, etc)

    # ADICIONE ISTO AQUI (novo):
    # Proxy para backend
    location /api/ {
        proxy_pass http://127.0.0.1:3001;
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

    # Seu location / existente (não mexa):
    location / {
        # ... sua configuração atual do frontend
    }
}
```

**Exemplo completo ficaria:**

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name glheringer.site www.glheringer.site;

    # SSL (se já tiver configurado)
    # listen 443 ssl http2;
    # ssl_certificate ...
    # ssl_certificate_key ...

    # NOVO: Proxy para backend
    location /api/ {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Frontend (já existente - não mexa)
    location / {
        root /var/www/glheringer-site/dist;  # ou onde está seu frontend
        try_files $uri $uri/ /index.html;
    }
}
```

### 4.3 Testar e recarregar Nginx

```bash
# Testar configuração
sudo nginx -t

# Se OK, recarregar
sudo systemctl reload nginx

# Verificar status
sudo systemctl status nginx
```

---

## 🎨 Passo 5: Atualizar Frontend

### 5.1 No seu computador local

```bash
# Na raiz do projeto
echo "VITE_API_URL=https://glheringer.site" > .env

# Fazer novo build
npm run build
```

### 5.2 Enviar para VPS

```bash
# Upload do build (ajuste o caminho do destino)
scp -r dist/* seu-usuario@glheringer.site:/var/www/glheringer-site/dist/
```

---

## ✅ Passo 6: Testar Tudo

### 6.1 Testar backend diretamente

```bash
# Da VPS
curl http://localhost:3001/api/contact
# Deve retornar erro de método (esperado)

# Do navegador ou terminal local
curl https://glheringer.site/api/contact
# Deve retornar erro de método (esperado)
```

### 6.2 Testar formulário

1. Acesse: https://glheringer.site
2. Vá até o formulário de contato
3. Preencha os campos
4. Clique em "Enviar"
5. Deve aparecer toast verde: "Mensagem enviada com sucesso!" ✨

### 6.3 Ver logs

```bash
# Logs do backend
ssh seu-usuario@glheringer.site
pm2 logs glheringer-backend

# Logs do Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

---

## 📊 Comandos Úteis

### Gerenciar Backend

```bash
# Status
pm2 status

# Logs
pm2 logs glheringer-backend

# Reiniciar
pm2 restart glheringer-backend

# Parar
pm2 stop glheringer-backend

# Monitorar recursos
pm2 monit
```

### Atualizar Backend (Depois)

```bash
ssh seu-usuario@glheringer.site
cd /var/www/glheringer-portfolio

# Baixar mudanças
git pull

# Reinstalar dependências (se necessário)
cd server
npm install

# Rebuild
npm run build

# Reiniciar
cd ..
pm2 restart glheringer-backend
```

---

## 🔄 Workflow de Deploy Agora

### Frontend (como você já faz):

```bash
# Local
npm run build
scp -r dist/* usuario@servidor:/var/www/glheringer-site/dist/
```

### Backend (novo):

```bash
# Via SSH
ssh usuario@glheringer.site
cd /var/www/glheringer-portfolio
git pull
cd server && npm run build && cd ..
pm2 restart glheringer-backend
```

### Ou criar um script (recomendado):

```bash
# Na VPS
nano /var/www/glheringer-portfolio/update-backend.sh
```

Cole:
```bash
#!/bin/bash
set -e

echo "🔄 Atualizando backend..."
cd /var/www/glheringer-portfolio

git pull
cd server
npm install
npm run build
cd ..

pm2 restart glheringer-backend

echo "✅ Backend atualizado!"
pm2 status glheringer-backend
```

```bash
chmod +x /var/www/glheringer-portfolio/update-backend.sh
```

**Para atualizar:**
```bash
ssh usuario@servidor '/var/www/glheringer-portfolio/update-backend.sh'
```

---

## 🐛 Troubleshooting

### ❌ Backend não inicia

```bash
pm2 logs glheringer-backend --lines 50

# Verificar porta 3001
sudo lsof -i :3001

# Verificar .env
cat /var/www/glheringer-portfolio/server/.env
```

### ❌ 502 Bad Gateway

```bash
# Verificar se backend está rodando
pm2 status

# Verificar logs do Nginx
sudo tail -f /var/log/nginx/error.log

# Reiniciar backend
pm2 restart glheringer-backend
```

### ❌ CORS Error

Verificar `ALLOWED_ORIGINS` no `.env`:
```bash
nano /var/www/glheringer-portfolio/server/.env

# Deve ter:
ALLOWED_ORIGINS=https://glheringer.site,https://www.glheringer.site
```

```bash
pm2 restart glheringer-backend
```

### ❌ Formulário não envia

1. Abrir DevTools (F12)
2. Ver aba Console
3. Ver aba Network
4. Verificar se está fazendo POST para `/api/contact`
5. Ver resposta do servidor

```bash
# Ver logs em tempo real
pm2 logs glheringer-backend --raw
```

---

## ✅ Checklist Final

- [ ] Backend clonado em `/var/www/glheringer-portfolio`
- [ ] Dependências instaladas (`server/node_modules`)
- [ ] Arquivo `.env` configurado no backend
- [ ] Build do backend executado (`server/dist/`)
- [ ] PM2 instalado e backend rodando
- [ ] Nginx configurado com proxy `/api/`
- [ ] Frontend atualizado com `VITE_API_URL`
- [ ] Novo build do frontend enviado
- [ ] Teste: `curl https://glheringer.site/api/contact`
- [ ] Teste: Formulário de contato funciona
- [ ] Logs estão OK (`pm2 logs`)

---

## 🎉 Pronto!

Seu portfólio agora tem:
- ✅ Frontend funcionando (como antes)
- ✅ Backend rodando na mesma VPS
- ✅ Formulário de contato funcional
- ✅ PM2 gerenciando backend
- ✅ Nginx fazendo proxy `/api/` → `localhost:3001`

**Formulário funcionando em produção!** 🚀

---

## 📞 Próximos Passos (Opcional)

1. **Automatizar deploy completo** - Veja [DEPLOY-GITHUB.md](./DEPLOY-GITHUB.md)
2. **Webhook do GitHub** - Deploy automático no push
3. **Monitoramento** - UptimeRobot, New Relic, Sentry
4. **Backup** - Configurar backup do Supabase
5. **CI/CD** - GitHub Actions para testes e deploy

**Seu backend está no ar!** 🎊

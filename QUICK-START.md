# ⚡ Guia Rápido de Deploy do Backend

## 🎯 Objetivo
Fazer deploy do backend Express na VPS para o formulário de contato funcionar em produção.

---

## 📝 Checklist Pré-Deploy

- [ ] Acesso SSH à VPS
- [ ] Node.js instalado na VPS
- [ ] Nginx configurado
- [ ] Credenciais do Supabase em mãos
- [ ] Domínio configurado (glheringer.site)

---

## 🚀 Deploy em 5 Passos

### 1️⃣ Configurar Variáveis de Ambiente

```bash
# Na pasta server/ (local)
cp .env.example .env
nano .env
```

Preencha com suas credenciais do Supabase:
```bash
PORT=3001
NODE_ENV=production
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=sua-chave-aqui
ALLOWED_ORIGINS=https://glheringer.site,https://www.glheringer.site
```

### 2️⃣ Usar Script Automático de Deploy

```bash
# Dar permissão de execução (primeira vez)
chmod +x deploy-backend.sh

# Executar deploy
./deploy-backend.sh seu-usuario@glheringer.site /var/www/glheringer-backend
```

**O script irá:**
- ✅ Fazer build do backend
- ✅ Enviar arquivos para VPS
- ✅ Instalar dependências
- ✅ Configurar PM2
- ✅ Iniciar aplicação

### 3️⃣ Configurar .env no Servidor

```bash
# Conectar via SSH
ssh seu-usuario@glheringer.site

# Criar .env
cd /var/www/glheringer-backend
nano .env
```

Cole as mesmas configurações do passo 1 e salve (Ctrl+O, Enter, Ctrl+X).

### 4️⃣ Configurar Nginx

```bash
# Na VPS
sudo nano /etc/nginx/sites-available/glheringer.site
```

Adicione o proxy para `/api/` antes do `location /`:

```nginx
server {
    listen 80;
    server_name glheringer.site www.glheringer.site;

    # Proxy para backend
    location /api/ {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Frontend (já existente)
    location / {
        root /var/www/glheringer-site/dist;
        try_files $uri $uri/ /index.html;
    }
}
```

Testar e recarregar:
```bash
sudo nginx -t
sudo systemctl reload nginx
```

### 5️⃣ Atualizar Frontend

```bash
# No seu computador local (pasta raiz do projeto)
echo "VITE_API_URL=https://glheringer.site" > .env

# Rebuild
npm run build

# Enviar para VPS
scp -r dist/* seu-usuario@glheringer.site:/var/www/glheringer-site/dist/
```

---

## ✅ Testar

1. **Teste direto do backend:**
   ```bash
   curl https://glheringer.site/api/contact
   ```
   Deve retornar erro de método (GET não permitido) - isso é esperado!

2. **Teste o formulário:**
   - Acesse: https://glheringer.site
   - Preencha o formulário de contato
   - Envie a mensagem
   - Deve aparecer toast de sucesso! ✨

3. **Ver logs:**
   ```bash
   ssh seu-usuario@glheringer.site
   pm2 logs glheringer-backend
   ```

---

## 🐛 Problemas Comuns

### ❌ ERR_CONNECTION_REFUSED

**Causa:** Backend não está rodando.

**Solução:**
```bash
ssh seu-usuario@glheringer.site
pm2 restart glheringer-backend
pm2 status
```

### ❌ 502 Bad Gateway

**Causa:** Nginx não consegue conectar ao backend.

**Solução:**
```bash
# Verificar se backend está na porta 3001
ssh seu-usuario@glheringer.site
sudo lsof -i :3001

# Reiniciar
pm2 restart glheringer-backend
```

### ❌ CORS Error

**Causa:** Domínio não está em `ALLOWED_ORIGINS`.

**Solução:**
```bash
ssh seu-usuario@glheringer.site
nano /var/www/glheringer-backend/.env

# Adicionar:
ALLOWED_ORIGINS=https://glheringer.site,https://www.glheringer.site

# Reiniciar
pm2 restart glheringer-backend
```

---

## 📊 Comandos Úteis

```bash
# Ver status do backend
ssh seu-usuario@glheringer.site "pm2 status"

# Ver logs em tempo real
ssh seu-usuario@glheringer.site "pm2 logs glheringer-backend"

# Reiniciar backend
ssh seu-usuario@glheringer.site "pm2 restart glheringer-backend"

# Parar backend
ssh seu-usuario@glheringer.site "pm2 stop glheringer-backend"
```

---

## 🔄 Atualizar Backend (Depois)

```bash
# Fazer mudanças no código local
# Depois executar novamente:
./deploy-backend.sh seu-usuario@glheringer.site /var/www/glheringer-backend
```

---

## 📚 Documentação Completa

Para instruções detalhadas, veja: [DEPLOY.md](./DEPLOY.md)

---

## 🎉 Pronto!

Seu formulário de contato agora está funcionando em produção! 🚀

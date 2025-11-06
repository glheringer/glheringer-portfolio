# 🚀 Guia de Deploy - Oracle Cloud VPS

## Pré-requisitos

- Uma VPS Oracle Cloud ativa
- Acesso SSH à VPS
- Ubuntu 20.04 ou superior (recomendado)
- Domínio configurado (opcional, mas recomendado para SSL)

## 📋 Passo a Passo

### 1. Conectar na VPS via SSH

```bash
ssh ubuntu@SEU_IP_DA_VPS
```

**Encontrar o IP da sua VPS:**
1. Acesse: https://cloud.oracle.com/
2. Vá em: Menu → Compute → Instances
3. Copie o "Public IP Address"

### 2. Configurar Regras de Firewall na Oracle Cloud

Antes do deploy, você precisa abrir as portas HTTP (80) e HTTPS (443):

1. Acesse o Console da Oracle Cloud
2. Vá em: **Networking → Virtual Cloud Networks**
3. Clique na VCN da sua instância
4. Clique em **Security Lists** → **Default Security List**
5. Clique em **Add Ingress Rules**
6. Adicione estas regras:

   **Regra 1 (HTTP):**
   - Source CIDR: `0.0.0.0/0`
   - IP Protocol: `TCP`
   - Destination Port Range: `80`

   **Regra 2 (HTTPS):**
   - Source CIDR: `0.0.0.0/0`
   - IP Protocol: `TCP`
   - Destination Port Range: `443`

### 3. Upload dos Scripts de Deploy

Na sua máquina local, envie os scripts para a VPS:

```bash
# Na pasta do projeto (sua máquina)
scp deploy.sh ssl-setup.sh ubuntu@SEU_IP_DA_VPS:~/
```

### 4. Executar o Deploy

Na VPS, execute:

```bash
# Tornar os scripts executáveis
chmod +x deploy.sh ssl-setup.sh

# Executar deploy
sudo bash deploy.sh
```

**O script irá:**
- ✅ Instalar Node.js, Bun, Nginx e Git
- ✅ Clonar o repositório do GitHub
- ✅ Instalar dependências
- ✅ Fazer build do projeto
- ✅ Configurar Nginx
- ✅ Configurar firewall
- ✅ Iniciar o servidor

### 5. Verificar se está funcionando

Após o deploy, acesse no navegador:
```
http://SEU_IP_DA_VPS
```

Você deverá ver seu portfólio rodando! 🎉

### 6. Configurar Domínio (Opcional mas Recomendado)

Se você tem um domínio:

**6.1. Configurar DNS**

No seu provedor de domínio (Registro.br, GoDaddy, etc):

- Adicione um registro **A** apontando para o IP da sua VPS
  ```
  @ (ou seu domínio)    A    SEU_IP_DA_VPS
  www                   A    SEU_IP_DA_VPS
  ```

**6.2. Aguardar propagação DNS** (pode levar até 24h, mas geralmente é rápido)

**6.3. Configurar SSL/HTTPS**

Na VPS, execute:

```bash
sudo bash ssl-setup.sh seu-dominio.com
```

Pronto! Seu site estará disponível em:
- https://seu-dominio.com
- https://www.seu-dominio.com

## 🔄 Atualizar o Site Após Mudanças

Quando você fizer alterações no código e enviar para o GitHub:

```bash
# Na VPS
cd /var/www/glheringer-portfolio
sudo git pull origin main
sudo bun install
sudo bun run build
sudo systemctl reload nginx
```

## 📊 Comandos Úteis

### Verificar status do Nginx
```bash
sudo systemctl status nginx
```

### Ver logs do Nginx
```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Reiniciar Nginx
```bash
sudo systemctl restart nginx
```

### Verificar certificado SSL
```bash
sudo certbot certificates
```

### Renovar certificado SSL manualmente
```bash
sudo certbot renew
```

### Ver IP público da VPS
```bash
curl ifconfig.me
```

## 🔐 Segurança Adicional (Recomendado)

### 1. Configurar Autenticação por Chave SSH

```bash
# Na sua máquina local
ssh-keygen -t rsa -b 4096

# Copiar chave pública para VPS
ssh-copy-id ubuntu@SEU_IP_DA_VPS
```

### 2. Desabilitar login por senha

Na VPS:
```bash
sudo nano /etc/ssh/sshd_config
```

Alterar/adicionar:
```
PasswordAuthentication no
```

Reiniciar SSH:
```bash
sudo systemctl restart sshd
```

### 3. Configurar Fail2Ban (proteção contra ataques)

```bash
sudo apt install fail2ban -y
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

## 🐛 Resolução de Problemas

### Site não carrega
1. Verificar se Nginx está rodando: `sudo systemctl status nginx`
2. Verificar logs: `sudo tail -f /var/log/nginx/error.log`
3. Verificar firewall da Oracle Cloud (portas 80 e 443 abertas)

### Erro de permissão
```bash
sudo chown -R www-data:www-data /var/www/glheringer-portfolio
sudo chmod -R 755 /var/www/glheringer-portfolio
```

### Certificado SSL não funciona
1. Verificar se domínio está apontando para VPS: `nslookup seu-dominio.com`
2. Tentar renovar: `sudo certbot renew --dry-run`

## 📞 Suporte

Se tiver problemas, verifique:
- Logs do Nginx: `/var/log/nginx/error.log`
- Status dos serviços: `sudo systemctl status nginx`
- Firewall: `sudo ufw status`

## 🎯 Resumo Rápido

```bash
# 1. Conectar na VPS
ssh ubuntu@SEU_IP

# 2. Upload dos scripts
scp deploy.sh ssl-setup.sh ubuntu@SEU_IP:~/

# 3. Na VPS - Deploy inicial
chmod +x deploy.sh ssl-setup.sh
sudo bash deploy.sh

# 4. (Opcional) Configurar SSL
sudo bash ssl-setup.sh seu-dominio.com

# 5. Acessar
http://SEU_IP  ou  https://seu-dominio.com
```

---

✅ **Deploy concluído com sucesso!** Seu portfólio está no ar! 🎉

#!/bin/bash

# Script para configurar SSL/HTTPS com Let's Encrypt
# Autor: Guilherme Heringer

set -e

# Cores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Verificar se domínio foi passado como argumento
if [ -z "$1" ]; then
    echo -e "${RED}❌ Erro: Domínio não especificado${NC}"
    echo -e "${YELLOW}Uso: sudo bash ssl-setup.sh seu-dominio.com${NC}"
    exit 1
fi

DOMAIN=$1
EMAIL="guilhermeheringer1999@gmail.com"  # Ajuste seu email
PROJECT_NAME="glheringer-portfolio"
NGINX_CONF="/etc/nginx/sites-available/${PROJECT_NAME}"

# Verificar se está rodando como root
if [ "$EUID" -ne 0 ]; then
    echo -e "${RED}Por favor, execute com sudo${NC}"
    exit 1
fi

echo -e "${BLUE}🔐 Configurando SSL para: ${DOMAIN}${NC}"

# Instalar Certbot
echo -e "${BLUE}📦 Instalando Certbot...${NC}"
apt update
apt install -y certbot python3-certbot-nginx

# Atualizar configuração do Nginx com o domínio
echo -e "${BLUE}⚙️  Atualizando configuração do Nginx...${NC}"

cat > ${NGINX_CONF} << EOF
server {
    listen 80;
    listen [::]:80;

    server_name ${DOMAIN} www.${DOMAIN};

    root /var/www/${PROJECT_NAME}/dist;
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

    # Configuração para SPA
    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
EOF

# Testar configuração
nginx -t

# Recarregar Nginx
systemctl reload nginx

# Obter certificado SSL
echo -e "${BLUE}🔒 Obtendo certificado SSL...${NC}"
certbot --nginx -d ${DOMAIN} -d www.${DOMAIN} --non-interactive --agree-tos --email ${EMAIL} --redirect

# Configurar renovação automática
echo -e "${BLUE}⏰ Configurando renovação automática...${NC}"
systemctl enable certbot.timer
systemctl start certbot.timer

echo ""
echo -e "${GREEN}╔══════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                                              ║${NC}"
echo -e "${GREEN}║  ✅ SSL configurado com sucesso!             ║${NC}"
echo -e "${GREEN}║                                              ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${BLUE}🌐 Seu site está disponível em:${NC}"
echo -e "   https://${DOMAIN}"
echo -e "   https://www.${DOMAIN}"
echo ""
echo -e "${BLUE}🔄 Certificado será renovado automaticamente${NC}"
echo ""

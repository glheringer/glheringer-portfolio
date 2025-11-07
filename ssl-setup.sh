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

# Banner
echo -e "${BLUE}"
echo "╔══════════════════════════════════════════════╗"
echo "║                                              ║"
echo "║     🔐 Configuração SSL Let's Encrypt        ║"
echo "║                                              ║"
echo "╚══════════════════════════════════════════════╝"
echo -e "${NC}"

# Verificar se domínio foi passado como argumento
if [ -z "$1" ]; then
    echo -e "${RED}❌ Erro: Domínio não especificado${NC}"
    echo -e "${YELLOW}Uso: sudo bash ssl-setup.sh glheringer.site${NC}"
    exit 1
fi

DOMAIN=$1
EMAIL="guilhermeheringer1999@gmail.com"
PROJECT_NAME="glheringer-portfolio"
NGINX_CONF="/etc/nginx/sites-available/${PROJECT_NAME}"

# Verificar se está rodando como root
if [ "$EUID" -ne 0 ]; then
    echo -e "${RED}❌ Por favor, execute com sudo${NC}"
    exit 1
fi

echo -e "${BLUE}📝 Configurando SSL para:${NC}"
echo "   Domínio: ${DOMAIN}"
echo "   WWW: www.${DOMAIN}"
echo ""

# Verificar DNS antes de continuar
echo -e "${BLUE}🔍 Verificando DNS...${NC}"
DOMAIN_IP=$(dig +short ${DOMAIN} @8.8.8.8 | tail -n1)

if [ -z "$DOMAIN_IP" ]; then
    echo -e "${RED}❌ ERRO: Domínio ${DOMAIN} não está resolvendo${NC}"
    echo -e "${YELLOW}⚠️  IMPORTANTE:${NC}"
    echo "   1. Acesse a Cloudflare e configure o registro A"
    echo "   2. Certifique-se de que o Proxy está DESLIGADO (DNS only)"
    echo "   3. Aguarde alguns minutos para propagação"
    echo ""
    read -p "Deseja continuar mesmo assim? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
else
    echo -e "${GREEN}✅ DNS configurado: ${DOMAIN} -> ${DOMAIN_IP}${NC}"
fi

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

# Verificar firewall
echo -e "${BLUE}🔥 Verificando firewall...${NC}"
if command -v ufw &> /dev/null; then
    ufw allow 80/tcp > /dev/null 2>&1 || true
    ufw allow 443/tcp > /dev/null 2>&1 || true
    echo -e "${GREEN}✅ Portas 80 e 443 liberadas${NC}"
elif command -v firewall-cmd &> /dev/null; then
    firewall-cmd --permanent --add-service=http > /dev/null 2>&1 || true
    firewall-cmd --permanent --add-service=https > /dev/null 2>&1 || true
    firewall-cmd --reload > /dev/null 2>&1 || true
    echo -e "${GREEN}✅ Portas 80 e 443 liberadas${NC}"
else
    echo -e "${YELLOW}⚠️  Certifique-se de que as portas 80 e 443 estão abertas${NC}"
fi

# Obter certificado SSL
echo -e "${BLUE}🔒 Obtendo certificado SSL...${NC}"
echo -e "${YELLOW}   Isso pode levar alguns segundos...${NC}"
echo ""

if certbot --nginx -d ${DOMAIN} -d www.${DOMAIN} --non-interactive --agree-tos --email ${EMAIL} --redirect; then
    echo ""
    echo -e "${GREEN}✅ Certificado SSL obtido com sucesso!${NC}"
else
    echo ""
    echo -e "${RED}❌ ERRO ao obter certificado SSL${NC}"
    echo -e "${YELLOW}⚠️  Possíveis causas:${NC}"
    echo "   1. DNS não está apontando corretamente para o servidor"
    echo "   2. Proxy da Cloudflare está LIGADO (deve estar em 'DNS only')"
    echo "   3. Portas 80/443 bloqueadas no firewall"
    echo "   4. Domínio ainda está em propagação DNS"
    echo ""
    echo -e "${BLUE}💡 Solução:${NC}"
    echo "   1. Na Cloudflare, clique no ícone da nuvem laranja ao lado do registro A"
    echo "   2. Mude de 'Proxied' para 'DNS only' (nuvem cinza)"
    echo "   3. Aguarde 5-10 minutos e tente novamente"
    exit 1
fi

# Configurar renovação automática
echo -e "${BLUE}🔄 Configurando renovação automática...${NC}"
systemctl enable certbot.timer > /dev/null 2>&1
systemctl start certbot.timer > /dev/null 2>&1

# Testar renovação
if certbot renew --dry-run > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Renovação automática configurada${NC}"
else
    echo -e "${YELLOW}⚠️  Teste de renovação apresentou avisos${NC}"
fi

echo ""
echo -e "${GREEN}"
echo "╔══════════════════════════════════════════════╗"
echo "║                                              ║"
echo "║  ✅ SSL configurado com sucesso!             ║"
echo "║                                              ║"
echo "╚══════════════════════════════════════════════╝"
echo -e "${NC}"

echo -e "${BLUE}🌐 Seu site está disponível em:${NC}"
echo "   https://${DOMAIN}"
echo "   https://www.${DOMAIN}"
echo ""
echo -e "${BLUE}📝 Informações importantes:${NC}"
echo "   • Certificado válido por 90 dias"
echo "   • Renovação automática configurada"
echo "   • HTTP redireciona para HTTPS"
echo "   • Grade de segurança A+ esperada"
echo ""
echo -e "${YELLOW}💡 Teste seu SSL: https://www.ssllabs.com/ssltest/analyze.html?d=${DOMAIN}${NC}"
echo ""

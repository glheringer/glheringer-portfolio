#!/bin/bash

# Script para atualizar o site rapidamente após mudanças
# Execute na VPS após fazer push no GitHub

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

PROJECT_DIR="/var/www/glheringer-portfolio"

echo -e "${BLUE}🔄 Atualizando site...${NC}"

cd ${PROJECT_DIR}

# Atualizar código do GitHub
echo -e "${BLUE}📥 Baixando últimas alterações...${NC}"
git pull origin main

# Instalar dependências (caso tenha novas)
echo -e "${BLUE}📦 Instalando dependências...${NC}"
bun install

# Fazer build
echo -e "${BLUE}🔨 Fazendo build...${NC}"
bun run build

# Recarregar Nginx
echo -e "${BLUE}🔄 Recarregando Nginx...${NC}"
systemctl reload nginx

echo -e "${GREEN}✅ Site atualizado com sucesso!${NC}"

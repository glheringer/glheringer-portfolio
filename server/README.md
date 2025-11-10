# 🖥️ Backend - Portfolio API

API REST em Express + TypeScript para gerenciar mensagens de contato do portfólio.

## 🚀 Stack

- **Express** - Framework web
- **TypeScript** - Type safety
- **Supabase** - Database (PostgreSQL)
- **Express Validator** - Validação de dados
- **Express Rate Limit** - Proteção contra spam
- **CORS** - Controle de acesso

---

## 📁 Estrutura

```
server/
├── src/
│   ├── config/
│   │   └── supabase.ts          # Cliente Supabase
│   ├── controllers/
│   │   └── contactController.ts # Lógica de negócio
│   ├── middlewares/
│   │   ├── errorHandler.ts      # Tratamento de erros
│   │   └── rateLimiter.ts       # Rate limiting
│   ├── routes/
│   │   └── contactRoutes.ts     # Rotas da API
│   └── index.ts                 # Entry point
├── dist/                        # Build compilado
├── .env                         # Variáveis de ambiente (não commitado)
├── .env.example                 # Exemplo de .env
├── package.json
└── tsconfig.json
```

---

## ⚙️ Configuração

### 1. Instalar Dependências

```bash
cd server
npm install
```

### 2. Configurar Variáveis de Ambiente

```bash
cp .env.example .env
nano .env
```

Preencha:
```bash
PORT=3001
NODE_ENV=development
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=sua-chave
ALLOWED_ORIGINS=http://localhost:5173
```

### 3. Configurar Banco de Dados

Execute o SQL no Supabase (disponível em `/supabase-schema.sql` na raiz):

```sql
CREATE TABLE contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(500),
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'unread',
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_status ON contact_messages(status);
CREATE INDEX idx_created_at ON contact_messages(created_at DESC);
```

---

## 🏃 Executar

### Desenvolvimento

```bash
npm run server:dev
```

Servidor iniciará em `http://localhost:3001` com auto-reload.

### Produção

```bash
# Build
npm run server:build

# Start
npm run server:start
```

---

## 🌐 Endpoints

### POST /api/contact

Envia uma mensagem de contato.

**Body:**
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "phone": "(11) 99999-9999",     // Opcional
  "subject": "Proposta de projeto", // Opcional
  "message": "Olá, gostaria de conversar sobre..."
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Mensagem enviada com sucesso!",
  "data": {
    "id": "uuid-da-mensagem",
    "created_at": "2025-11-10T12:00:00Z"
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Mensagem de erro",
  "errors": [
    {
      "field": "email",
      "message": "Email inválido"
    }
  ]
}
```

**Status Codes:**
- `201` - Mensagem criada com sucesso
- `400` - Dados inválidos
- `429` - Rate limit excedido
- `500` - Erro interno

### GET /api/contact

Lista todas as mensagens (endpoint admin - implementar autenticação).

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "João Silva",
      "email": "joao@example.com",
      "message": "...",
      "status": "unread",
      "created_at": "2025-11-10T12:00:00Z"
    }
  ]
}
```

---

## 🛡️ Segurança

### Rate Limiting

- **Janela:** 15 minutos (900000ms)
- **Máximo:** 100 requisições por IP
- **Configurável via:** `RATE_LIMIT_WINDOW_MS` e `RATE_LIMIT_MAX_REQUESTS`

### CORS

Apenas domínios em `ALLOWED_ORIGINS` podem fazer requisições.

### Validação

Todos os campos são validados com `express-validator`:
- **name:** 2-255 caracteres
- **email:** Email válido
- **message:** 10-5000 caracteres

### Headers de Segurança

- IP do cliente capturado
- User-Agent registrado
- Timestamps automáticos

---

## 📊 Monitoramento

### Logs

```bash
# Desenvolvimento
npm run server:dev  # Logs no console

# Produção (com PM2)
pm2 logs glheringer-backend
```

### Métricas

Considere adicionar:
- **New Relic** - APM
- **Sentry** - Error tracking
- **Datadog** - Monitoramento

---

## 🧪 Testes (TODO)

```bash
npm test
```

Estrutura sugerida:
```
server/
├── tests/
│   ├── integration/
│   │   └── contact.test.ts
│   └── unit/
│       └── validation.test.ts
```

---

## 🚀 Deploy

Veja [QUICK-START.md](../QUICK-START.md) ou [DEPLOY.md](../DEPLOY.md) para instruções completas.

**Resumo:**
```bash
# Da raiz do projeto
./deploy-backend.sh usuario@servidor /var/www/backend
```

---

## 🔧 Scripts

```json
{
  "server:dev": "Desenvolvimento com auto-reload",
  "server:build": "Compila TypeScript para dist/",
  "server:start": "Inicia servidor de produção"
}
```

---

## 📝 TODO

- [ ] Adicionar autenticação JWT para GET /api/contact
- [ ] Implementar testes unitários e de integração
- [ ] Adicionar endpoint de health check
- [ ] Implementar paginação no GET
- [ ] Adicionar filtros (status, data)
- [ ] Webhook para notificações (email, Slack)
- [ ] Documentação OpenAPI/Swagger
- [ ] Docker support

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

---

**Desenvolvido com ❤️ por Guilherme Heringer Cordeiro**

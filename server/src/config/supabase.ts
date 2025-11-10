import postgres from 'postgres';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// ES module support for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Carrega .env do diretório server/
dotenv.config({ path: resolve(__dirname, '../../.env') });

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL não configurada no .env');
}

// Conexão com PostgreSQL via postgres.js
export const sql = postgres(connectionString, {
  max: 10, // Pool de conexões
  idle_timeout: 20,
  connect_timeout: 10,
});

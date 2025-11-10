-- Tabela para armazenar mensagens de contato
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(500),
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'unread',
  ip_address VARCHAR(50),
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para melhorar performance
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON contact_messages(email);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar updated_at
CREATE TRIGGER update_contact_messages_updated_at
  BEFORE UPDATE ON contact_messages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS (Row Level Security) - Desabilitar para permitir acesso via service role
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Policy para inserção pública (via API)
CREATE POLICY "Permitir inserção pública de mensagens"
  ON contact_messages
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy para leitura apenas por usuários autenticados (admin)
CREATE POLICY "Permitir leitura apenas para autenticados"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (true);

-- Comentários nas colunas
COMMENT ON TABLE contact_messages IS 'Tabela para armazenar mensagens recebidas via formulário de contato';
COMMENT ON COLUMN contact_messages.status IS 'Status da mensagem: unread, read, replied, archived';
COMMENT ON COLUMN contact_messages.ip_address IS 'IP do remetente para controle de spam';
COMMENT ON COLUMN contact_messages.user_agent IS 'User agent do navegador para análise';

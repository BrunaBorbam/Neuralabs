-- Criar tabela de diagnósticos
CREATE TABLE diagnosticos (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL,
  visitors integer NOT NULL,
  conversion_rate decimal NOT NULL,
  ticket decimal NOT NULL,
  annual_loss decimal NOT NULL,
  created_at timestamp DEFAULT now(),
  whatsapp_sent boolean DEFAULT false,
  whatsapp_sent_at timestamp,
  notes text
);

-- Criar índices para performance
CREATE INDEX idx_diagnosticos_email ON diagnosticos(email);
CREATE INDEX idx_diagnosticos_created_at ON diagnosticos(created_at DESC);

-- Habilitar RLS (Row Level Security) se necessário
ALTER TABLE diagnosticos ENABLE ROW LEVEL SECURITY;

-- Policy para leitura pública (acessível via app)
CREATE POLICY "Enable read access for all users" ON diagnosticos
FOR SELECT
USING (true);

-- Policy para inserção via API
CREATE POLICY "Enable insert for authenticated users" ON diagnosticos
FOR INSERT
WITH CHECK (true);

-- Policy para delete
CREATE POLICY "Enable delete for all users" ON diagnosticos
FOR DELETE
USING (true);

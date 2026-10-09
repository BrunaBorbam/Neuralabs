-- PROPOSTA PARA REVISAO: NAO EXECUTAR SEM BACKUP E AUDITORIA DO BANCO REAL.
-- Pode haver politicas diferentes no Supabase atualmente pausado.
-- Este script e intencionalmente restritivo: acesso publico direto a leads e proibido.
BEGIN;

CREATE TABLE IF NOT EXISTS public.diagnosticos (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL,
  visitors integer NOT NULL,
  conversion_rate decimal NOT NULL,
  ticket decimal NOT NULL,
  annual_loss decimal NOT NULL,
  created_at timestamptz DEFAULT now(),
  whatsapp_sent boolean DEFAULT false,
  whatsapp_sent_at timestamptz,
  notes text
);

CREATE TABLE IF NOT EXISTS public.contatos (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  company text,
  phone text,
  source text NOT NULL DEFAULT 'site',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_diagnosticos_email ON public.diagnosticos(email);
CREATE INDEX IF NOT EXISTS idx_diagnosticos_created_at ON public.diagnosticos(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contatos_created_at ON public.contatos(created_at DESC);

ALTER TABLE public.diagnosticos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contatos ENABLE ROW LEVEL SECURITY;

-- Remover todas as politicas antigas dessas duas tabelas, inclusive as
-- politicas publicas de SELECT/DELETE do script legado.
DO $$
DECLARE existing_policy record;
BEGIN
  FOR existing_policy IN
    SELECT tablename, policyname
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename IN ('diagnosticos', 'contatos')
  LOOP
    EXECUTE format(
      'DROP POLICY %I ON public.%I',
      existing_policy.policyname,
      existing_policy.tablename
    );
  END LOOP;
END $$;

-- Defesa em profundidade: nenhuma role de navegador deve ler ou alterar leads.
REVOKE ALL ON TABLE public.diagnosticos, public.contatos FROM PUBLIC, anon, authenticated;
-- A role service_role so deve ser usada no servidor, com chave secreta.
GRANT SELECT, INSERT ON TABLE public.diagnosticos, public.contatos TO service_role;

COMMIT;

-- Conferir grants/RLS e testar acesso anon NEGADO antes de liberar captacao.
-- Nunca colocar SUPABASE_SERVICE_ROLE_KEY em variavel NEXT_PUBLIC_.

-- SCRIPT LEGADO DESATIVADO POR SEGURANÇA (09/10/2026).
-- O script antigo criava politicas PUBLICAS para SELECT e DELETE de leads.
-- NAO executar nem restaurar o script legado.
-- Ver proposta sujeita a aprovacao: scripts/harden-supabase-leads.sql
DO $$
BEGIN
  RAISE EXCEPTION 'Script legado desativado: consulte docs/AUDITORIA-LEADS-SEGURANCA-2026-10-09.md';
END $$;

# Neuralabs — proposta de segurança do CRM e captação

## Estado (não aplicado)
- Alterações apenas na branch fix/formulario-supabase-seguro-20261009.
- Não executar SQL, não conectar segredos reais e não publicar na produção sem aprovação.
- O Supabase foi observado pausado em 09/10/2026.
- Politicas RLS em uso ainda não foram inspecionadas. O SQL legado no GitHub era inseguro.

## Mudanças de código propostas
1. O formulario principal usa POST /api/contact, que salva na tabela contatos e responde sucesso apenas após insert confirmado.
2. A calculadora usa /api/lead com validação e nunca retorna falso sucesso se Supabase indisponível.
3. Supabase service_role fica restrito ao servidor: SUPABASE_SERVICE_ROLE_KEY (NUNCA NEXT_PUBLIC_).
4. /dashboard/diagnosticos exige Basic Auth no proxy Next.js 16 e API; API é somente leitura.
5. Removido acesso direto da dashboard ao banco via anon e a operação de delete.
6. scripts/harden-supabase-leads.sql prepara tabelas e revoga acesso anon/authenticated; **NÃO FOI EXECUTADO**.

## Variáveis necessárias (somente em servidor, nunca no cliente)
- SUPABASE_URL (ou NEXT_PUBLIC_SUPABASE_URL já existente)
- SUPABASE_SERVICE_ROLE_KEY (segredo novo, nunca exibir/publicar/colar no chat)
- CRM_ADMIN_USER
- CRM_ADMIN_PASSWORD (aleatória, pelo menos 16 caracteres, exclusiva)

## Bloqueadores antes de liberar
1. Exportar backup do banco, quando for seguro reativar.
2. Inspecionar políticas ativas antes de executar o SQL: o arquivo proposto remove quaisquer políticas das tabelas diagnosticos e contatos.
3. Avaliar se outras aplicações dependem dessas tabelas/policies.
4. Preparar autenticação/controle de abuso robustos (rate limiting persistente, captcha ou Turnstile) antes de permitir tráfego público.
5. Testar com chaves de teste e dados fictícios; verificar 401 sem credenciais no CRM e API; impedir anon SELECT e DELETE; testar erro seguro quando Supabase está pausado.
6. Validar formulário, calculadora, acesso do admin, e mobile no ambiente isolado.
7. Garantir que deploys Preview não exponham banco real nem segredos de Production.
8. Revisar fluxo de privacidade/consentimento aplicável, retenção e exclusão dos dados antes da ativação.

## Importante
- CRM é somente leitura nesta revisão. Sem exclusão para reduzir risco.
- O formulário não envia confirmação por email; apenas grava. Notificação/Resend ficará para outro passo.
- Não houve testes de integração reais, pois banco pausado e sem credenciais seguras.
- Não foi executado SQL no Supabase e a branch main não foi alterada.

## Proteção anti-spam preparada em branch (09/10/2026)
- Novo módulo `lib/rate-limit.ts` integrado a `/api/contact`, `/api/lead` e `/api/send-email`.
- Vercel KV / Upstash Redis REST: `KV_REST_API_URL` e `KV_REST_API_TOKEN` (alternativas `UPSTASH_REDIS_REST_URL` e `UPSTASH_REDIS_REST_TOKEN`).
- Operação Redis atômica via EVAL: no máximo 10 requisições/IP em 60 minutos para todos os formulários e 3/IP por rota em 15 minutos.
- Identificador de IP derivado por HMAC; não armazena IP em texto claro no Redis.
- Resposta 429 com Retry-After ao exceder limite; 503 (fail closed) em caso de configuração ausente ou falha de Redis.
- Validação de código: 11 verificações estáticas realizadas e aprovadas. **Não houve testes ao vivo com Redis nem build completo de Next.js**.
- Confirmar comportamento do encaminhamento de IP na Vercel, suporte a EVAL pelo serviço conectado, capacidade de Redis e políticas de proteção de dados antes do deploy.
- Ainda falta anti-bot complementar (Turnstile / challenge), teste de concorrência real, privacidade e revisão de formulários.
- Qualquer Preview pode ser criada automaticamente pela Vercel; verificar proteção contra deploy Preview antes de revisão.

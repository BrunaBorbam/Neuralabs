# 🚀 CRM Neuralabs - Guia de Setup

## ✅ O que foi criado

1. **API `/api/lead`** - Recebe diagnósticos da calculadora e salva no Supabase
2. **Dashboard em `/dashboard/diagnosticos`** - Visualiza todos os leads capturados em tempo real
3. **Banco de dados Supabase** - Tabela `diagnosticos` com todos os dados

---

## 🔧 Passo 1: Criar a Tabela no Supabase

1. Vá em **[Supabase Dashboard](https://supabase.com/dashboard)**
2. Clica em seu projeto **neuralabs**
3. No menu lateral, vai em **SQL Editor**
4. Clica em **New Query**
5. Cola o conteúdo do arquivo `/scripts/setup-supabase.sql`
6. Clica em **Run** (botão azul)
7. Pronto! Tabela criada ✅

---

## 🎯 Passo 2: Testar a API

A calculadora no site agora salva automaticamente os diagnósticos quando o usuário digita o email.

Teste assim:
1. Vai em **https://neuralabs.online**
2. Rola até a **seção Calculadora**
3. Preenche com dados de teste
4. Digita um email e clica em "Enviar diagnóstico"
5. Vai para **https://neuralabs.online/dashboard/diagnosticos**
6. Deve aparecer o novo diagnóstico! 🎉

---

## 📱 Passo 3: Configurar Notificações WhatsApp

### Opção A: Usar Zapier (Recomendado - Fácil)

1. Cria conta em **[Zapier](https://zapier.com)**
2. Clica em **Create Zap**
3. **Trigger:** Supabase → Seleciona "New Row"
   - Conecta sua conta Supabase
   - Seleciona tabela `diagnosticos`
4. **Action:** WhatsApp
   - Conecta seu número de WhatsApp Business (ou usa ngrok para testar)
   - Configura a mensagem template:
   ```
   🎯 Novo Lead Capturado!
   Email: {{email}}
   Visitantes: {{visitors}}
   Taxa Conversão: {{conversion_rate}}%
   Perda Anual: R$ {{annual_loss}}
   ```
5. Testa e ativa o Zap

### Opção B: Usar Make (Alternativa)

Processo similar no **[Make.com](https://make.com)**

### Opção C: Webhook Customizado (Avançado)

Você pode enviar um webhook pra qualquer serviço quando um diagnóstico chegar. A estrutura será:

```json
POST https://seu-webhook.com/diagnosticos
{
  "email": "cliente@example.com",
  "visitors": 5000,
  "conversionRate": 1.2,
  "ticket": 500,
  "annualLoss": 28800
}
```

---

## 🔐 Segurança

- A tabela só aceita inserts via API autenticada
- Row Level Security está ativado
- Dados são sempre salvos com timestamp

---

## 📊 Acompanhando Leads

**Dashboard interno:** `https://neuralabs.online/dashboard/diagnosticos`

Nele você vê:
- Total de leads capturados
- Email, visitantes, taxa de conversão
- Perda anual estimada
- Data/hora de captura
- Opção de deletar leads

---

## 🔄 Próximos Passos (Opcional)

1. **Integrar com CRM:** Conectar a um RD Station, Pipedrive, ou outro CRM
2. **Email automático:** Enviar email de confirmação pro cliente
3. **Scoring de leads:** Priorizar leads com maior perda anual
4. **Relatórios:** Gerar relatórios mensais de leads capturados

---

**Dúvidas?** Tá tudo pronto pra ser usado! 🚀

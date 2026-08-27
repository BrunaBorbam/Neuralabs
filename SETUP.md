# 🚀 Setup Neuralabs Premium Landing Page

## ✅ O que foi entregue

- ✅ 10 seções completas (hero, problema, solução, resultados, casos, processo, diferencial, FAQ, CTA, footer)
- ✅ 3D neural network animado (Canvas + Framer Motion)
- ✅ Form de lead com validação
- ✅ Webhook Discord para notificações
- ✅ Google Analytics integrado
- ✅ SEO completo (meta tags, sitemap, robots.txt)
- ✅ Glassmorphism UI
- ✅ Scroll reveals e animações
- ✅ Mobile responsivo
- ✅ TypeScript + Tailwind CSS

---

## 🔧 Configuração de Integrações

### 1️⃣ Discord Webhook (Lead Notifications)

**Passo 1:** Criar webhook no seu Discord

1. Abra seu servidor Discord
2. Vá para **Settings > Integrations > Webhooks**
3. Clique em **Create Webhook**
4. Nomeie como "Neuralabs Leads"
5. Copie a URL completa

**Passo 2:** Adicionar ao .env.local

```env
NEXT_PUBLIC_DISCORD_WEBHOOK=https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN
```

**Passo 3:** Testar localmente

```bash
npm run dev
# Acesse http://localhost:3001
# Preencha o form e verifique Discord
```

---

### 2️⃣ Google Analytics (GA4)

**Passo 1:** Criar projeto GA4

1. Acesse [Google Analytics](https://analytics.google.com)
2. Crie uma nova propriedade "Neuralabs"
3. Copie o **Measurement ID** (formato: G-XXXXXXXXXX)

**Passo 2:** Adicionar ao .env.local

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**Passo 3:** Validar

- Deploy o site
- Acesse neuralabs.online
- Vá para GA4 > Realtime
- Você deve ver sua sessão em tempo real

---

### 3️⃣ WhatsApp Link

**Editar em `app/page.tsx`:**

Procure por:
```jsx
href="https://wa.me/55119xxxx"
```

E substitua pelo seu número:
```jsx
href="https://wa.me/55119XXXXX"
```

Formato: `wa.me/` + **país** (55) + **DDD** (11) + **número** (9XXXX-XXXX)

---

## 🏗️ Estrutura do Projeto

```
app/
├── page.tsx              ← PÁGINA PRINCIPAL (650+ linhas)
├── layout.tsx            ← Header + Google Analytics
└── globals.css           ← Tailwind

public/
├── sitemap.xml           ← Para SEO
└── robots.txt            ← Para bots

.env.local               ← Integrações (NÃO COMMIT!)
```

---

## 📊 Componentes Principais

### `NeuralNetwork3D`
- Canvas-based 3D animation
- 80 partículas laranja
- Linhas de conexão dinâmicas
- Responsivo

### `Counter`
- Animações de números
- Scroll-based triggers
- Smooth easing

### `LeadForm`
- Validação nome + email
- Webhook Discord automático
- GA4 event tracking
- Clear após submit

---

## 🧪 Testes Locais

```bash
# 1. Instalar dependências
npm install

# 2. Criar .env.local com values reais
echo "NEXT_PUBLIC_DISCORD_WEBHOOK=..." > .env.local

# 3. Rodar dev server
npm run dev

# 4. Abrir http://localhost:3001

# 5. Testar:
#   - Scroll reveals (todas as seções)
#   - Hover effects (cards)
#   - Form (Discord + GA)
#   - FAQ accordion
#   - Mobile responsivo (F12 > Responsive)
```

---

## 📋 Checklist Pré-Deploy

- [ ] Discord webhook configurado (.env.local)
- [ ] Google Analytics GA4 ID adicionado
- [ ] WhatsApp link atualizado
- [ ] npm install rodou sem erros
- [ ] npm run dev funciona
- [ ] Form submete com sucesso
- [ ] Lighthouse score 90+
- [ ] Mobile testa bem (iPhone + Android)
- [ ] Links internos funcionam

---

## 🚀 Deploy & Go Live

```bash
# 1. Fazer commit final
git add .
git commit -m "Setup: Discord, GA, WhatsApp configured"

# 2. Push para Vercel
git push

# 3. Vercel faz deploy automático (2-3 min)

# 4. Verificar em https://neuralabs.online
```

---

## 📞 Próximos Passos (Opcional)

### SEO Avançado
- [ ] Adicionar schema.json (structured data)
- [ ] Criar blog com artigos de neuromarketing
- [ ] Otimizar imagens (WebP + responsive)
- [ ] Adicionar FAQ schema JSON-LD

### Conversão
- [ ] A/B teste no form (cores CTA)
- [ ] Pixel Facebook/Meta
- [ ] Retargeting (Google Ads)
- [ ] SMS automático após lead

### Performance
- [ ] Image optimization (next/image)
- [ ] Font preload
- [ ] Critical CSS inlining
- [ ] Lazy load FAQ

---

## ❓ Troubleshooting

**"Form não está enviando para Discord"**
- ✓ Verificar .env.local tem webhook
- ✓ Verificar webhook URL é válida
- ✓ Testar webhook com curl

**"Google Analytics não mostra dados"**
- ✓ GA4 ID está no .env.local
- ✓ Aguarde 24h para GA4 processar
- ✓ Verificar console para erros de GA4

**"Mobile não fica responsivo"**
- ✓ Verificar meta viewport em layout.tsx
- ✓ Testar com F12 responsive mode
- ✓ Verificar Tailwind breakpoints (md:, lg:)

**"Lighthouse < 90"**
- ✓ Reduzir size imagens
- ✓ Lazy load componentes pesados
- ✓ Preload critical fonts
- ✓ Cache strategy no Vercel

---

## 📞 Support

- GitHub Issues: https://github.com/BrunaBorbam/Neuralabs/issues
- Discord: [seu-servidor]
- Email: ola@neuralabs.online

---

**Status:** ✅ Pronto para produção
**Versão:** 1.0.0
**Data:** 2026-08-27

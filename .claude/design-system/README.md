# Neuralabs Design System & OpenDesign Skills

Dokumentação completa de design system e skills customizadas para OpenDesign.

---

## 📚 Documentação

### Design System
- **[DESIGN.md](../DESIGN.md)** - Tokens, cores, tipografia, componentes, spacing

### OpenDesign Setup
- **[OPENDESIGN_SETUP.md](OPENDESIGN_SETUP.md)** - Instalação e troubleshooting
- **[OPENDESIGN_MCP_CONFIG.md](OPENDESIGN_MCP_CONFIG.md)** - Configurar MCP no Claude Code

### Neuralabs Design Skills
- **[neuralabs-design-skill.md](neuralabs-design-skill.md)** - Guia geral de design no OpenDesign
- **[landing-page-skill.md](landing-page-skill.md)** - Gerar landing pages
- **[ui-prototype-skill.md](ui-prototype-skill.md)** - Gerar protótipos de UI
- **[marketing-assets-skill.md](marketing-assets-skill.md)** - Gerar assets de marketing

---

## 🎯 Quick Start

### 1. Verificar Setup

```bash
# OpenDesign CLI instalado?
which od

# Daemon rodando?
curl http://127.0.0.1:7456/

# MCP configurado?
cat ~/.claude/settings.json | grep opendesign
```

### 2. Usar no Claude Code

```
Cria [tipo] para [objetivo]:

Descrição: [seu brief]

Design system Neuralabs
Exportar: [HTML/PNG]
```

### 3. Exemplos de Uso

**Landing Page:**
```
Cria landing page para "Neuralabs Pro":
- Headline: "Desbloqueia poder total"
- Features: Unlimited designs, Priority support
- CTA: "Upgrade agora"
Exportar HTML
```

**UI Prototype:**
```
Cria dashboard analytics mockup:
- KPI cards (4x)
- Revenue chart
- Users table
- Sidebar menu
Exportar HTML 1920x1080
```

**Social Graphic:**
```
Cria social graphic 1080x1080 para product launch:
- Headline: "Introducing Neuralabs Analytics"
- Visual: Dashboard preview
- CTA: "Available Now"
Exportar PNG
```

---

## 📂 Skills Organization

```
.claude/design-system/
├── README.md (este arquivo)
├── DESIGN.md (design system reference)
├── OPENDESIGN_SETUP.md (instalação)
├── OPENDESIGN_MCP_CONFIG.md (configuração MCP)
├── neuralabs-design-skill.md (guia geral)
├── landing-page-skill.md ⭐ (landing pages)
├── ui-prototype-skill.md ⭐ (protótipos UI)
└── marketing-assets-skill.md ⭐ (assets marketing)
```

---

## 🚀 Usando as Skills

### Landing Page Skill

**Quando usar:**
- Apresentar novo produto
- Promover feature
- Campanha de marketing
- Presale landing

**Prompt base:**
```
Cria landing page [tipo] para [produto]:
- Headline: [...]
- Features: [...]
- CTA: [...]
Design system Neuralabs
Exportar HTML
```

**Output:**
- HTML responsivo
- Mobile-first
- Design system colors
- Pronto para deploy

**Onde salvar:**
```
designs/marketing/[nome]-v1.html
```

---

### UI Prototype Skill

**Quando usar:**
- Prototipagem rápida
- Design reviews
- Stakeholder presentations
- Developer reference

**Tipos:**
- Dashboard (analytics, ecommerce, etc)
- Form (checkout, signup, etc)
- Product page
- Onboarding flow
- App interface

**Prompt base:**
```
Cria [tipo] prototype mockup para [feature]:
- Seções: [...]
- Dados: [exemplo]
Design system
Exportar HTML/PNG
```

**Output:**
- HTML ou PNG
- Estatísticos (sem interação)
- Exemplo de dados
- Mobile responsive

**Onde salvar:**
```
designs/ui-mockups/[feature]-v1.html
```

---

### Marketing Assets Skill

**Quando usar:**
- Social media content
- Email campaigns
- Web banners
- Blog promotion
- Ads creatives

**Tipos:**
- Social graphics (Instagram: 1080x1080)
- Email templates (600px wide)
- Web banners (728x90, 300x600, etc)
- Blog thumbnails (1200x630)
- LinkedIn graphics (1200x627)

**Prompt base:**
```
Cria [tipo] asset para [objetivo]:
- Plataforma: [...]
- Tamanho: [...]
- Conteúdo: [...]
- Tone: [...]
Design system
Exportar PNG/HTML
```

**Output:**
- Otimizado por plataforma
- Dimensões corretas
- Brand colors
- Pronto para publicar

**Onde salvar:**
```
designs/marketing/[tipo]/[nome]-v1.png
```

---

## 🎨 Design System Colors

```
Primary:   #6D28D9 (Purple-700)
Secondary: #0EA5E9 (Sky-500)
Success:   #10B981 (Emerald-500)
Warning:   #F59E0B (Amber-500)
Error:     #EF4444 (Red-500)

Gray-50:   #FAFAFA
Gray-900:  #111827
```

---

## 📐 Typography

```
Display:  48px, 700 weight (heroes)
Heading:  32px, 600 weight (titles)
Body:     16px, 400 weight (content)
Small:    14px, 400 weight (secondary)
Caption:  12px, 400 weight (labels)
```

---

## 📏 Spacing Grid

```
xs: 4px
sm: 8px
md: 12px
lg: 16px (default)
xl: 24px
2xl: 32px
3xl: 48px
4xl: 64px
```

---

## 🔧 Troubleshooting

### OpenDesign não está respondendo
```bash
# Verificar daemon
curl http://127.0.0.1:7456/

# Reiniciar
pkill -f "od --no-open"
od --no-open &
```

### Cores não seguem design system
- Sempre especificar hex color (#6D28D9)
- Não usar nomes de cores (purple)
- Referenciar DESIGN.md no prompt

### Layout quebrado em mobile
- Pedir explicitamente: "Mobile-first"
- Especificar breakpoints: 768px, 1024px
- Testar em viewport pequena

### Arquivo muito grande
- Remover seções desnecessárias
- Reduzir complexidade
- Usar combo A (simples) em vez de B (completo)

---

## 📊 Phase 2 Progress

| Skill | Status | Exemplos | Pronto |
|-------|--------|----------|--------|
| Landing Page | ✅ | 5+ casos | ✅ |
| UI Prototype | ✅ | Dashboard, form, product | ✅ |
| Marketing Assets | ✅ | Social, email, banner | ✅ |

---

## 📋 Checklist para novo design

Ao gerar novo design:
- [ ] Design system colors usadas?
- [ ] Typography consistente?
- [ ] Spacing grid seguido?
- [ ] Mobile responsive?
- [ ] Alt text em imagens?
- [ ] CTA claro?
- [ ] Arquivo otimizado?
- [ ] Salvo em pasta correta?

---

## 🔗 Referências

- [OpenDesign GitHub](https://github.com/nexu-io/open-design)
- [Design System (DESIGN.md)](../DESIGN.md)
- [Setup Guide](OPENDESIGN_SETUP.md)
- [MCP Config](OPENDESIGN_MCP_CONFIG.md)

---

## 📝 Version History

**v1.0** - Phase 2 Complete
- 3 custom skills criadas
- Documentação completa
- Exemplos para cada tipo
- Troubleshooting guide
- Design system reference

---

**Status:** ✅ Phase 2 Complete | ⏳ Phase 3 (CI/CD Integration) next

Pronto para começar a gerar designs? 🚀

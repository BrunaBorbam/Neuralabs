# Landing Page Skill para OpenDesign

Skill para gerar landing pages responsivas seguindo design system Neuralabs.

---

## Propósito

Gerar landing pages HTML modernas, responsivas e otimizadas seguindo o design system do Neuralabs. Cada página:
- Usa palette de cores do design system
- Tipografia consistente
- Componentes reutilizáveis
- Mobile-first responsive
- Pronta para importação em Next.js

---

## Template Padrão

### Estrutura Base

Toda landing page gerada segue esta estrutura:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <!-- Meta tags, título, favicon -->
    <!-- CSS com design tokens -->
</head>
<body>
    <!-- Hero section -->
    <!-- Features/Benefits section -->
    <!-- CTA section -->
    <!-- Footer -->
</body>
</html>
```

### Seções Padrão

1. **Hero** - Apresentação do produto/feature
2. **Features** - 3-4 cards com benefícios
3. **CTA** - Call-to-action prominente
4. **Footer** - Links e info

---

## Casos de Uso

### 1. Landing Page de Produto

```
Cria uma landing page para apresentar [nome produto]:

Descrição:
- Headline: [frase principal]
- Subheading: [descrição breve]
- Features: [3-4 benefícios principais]
- CTA: [botão principal + texto]
- Imagens: [descrições de placeholders]

Seguir design system Neuralabs (DESIGN.md)
Exportar como HTML responsivo
```

**Exemplo preenchido:**
```
Cria uma landing page para apresentar "Neuralabs Analytics Dashboard":

Descrição:
- Headline: "Visualize seus dados em tempo real"
- Subheading: "Dashboard inteligente com 10+ widgets customizáveis"
- Features: 
  1. Real-time data sync
  2. 50+ chart types
  3. Custom alerts
- CTA: "Começar grátis" + "Ver demo"
- Imagens: Dashboard preview, charts, team collaboration

Seguir design system Neuralabs
Exportar como HTML
```

### 2. Landing Page de Feature

```
Cria landing page para nova feature [nome]:

O que faz: [descrição técnica]
Benefício: [impacto para usuário]
Público: [quem vai usar]

Incluir comparação antes/depois se aplicável
```

### 3. Landing Page de Campanha

```
Cria landing page para campanha [tema]:

Objetivo: [o que quer comunicar]
Oferta: [promo/benefício]
Urgência: [data limite se houver]
Audiência: [perfil do visitante]

Usar cores accent (secundária) para destaque
```

---

## Componentes Reutilizáveis

### Hero Section
```html
<!-- Conteúdo à esquerda, imagem à direita -->
<!-- Background gradient com colors primária/light -->
<!-- Badge "New" ou "Feature" opcional -->
```

### Feature Cards
```html
<!-- Grid 3 colunas (responsive 1 col mobile) -->
<!-- Ícone + título + descrição -->
<!-- Padding e spacing consistente -->
```

### CTA Button
```html
<!-- Primary button (white bg, purple text) -->
<!-- Hover state com box-shadow -->
<!-- Tamanho: min-width 160px -->
```

### Testimonials (opcional)
```html
<!-- Avatar + quote + name -->
<!-- Star rating -->
```

---

## Design Tokens Obrigatórios

**Cores:**
- Primary background: `#6D28D9` (purple)
- Secondary accent: `#0EA5E9` (sky)
- Text: `#111827` (gray-900)
- Light backgrounds: `#FAFAFA` (gray-50)

**Typography:**
- Display (heroes): 48px, 700 weight
- Heading: 32px, 600 weight
- Body: 16px, 400 weight

**Spacing:**
- Section padding: 48px vertical, 24px horizontal
- Component gaps: 16px
- Max-width: 1280px

**Effects:**
- Border radius: 8px (components), 12px (cards)
- Shadow: `0 1px 3px rgba(0,0,0,0.1)`
- Transition: 300ms ease

---

## Padrão de Prompt

Use este template para máximo sucesso:

```
Cria uma landing page [tipo] para [produto/feature]:

Tema: [principal elemento visual]

Conteúdo:
- Hero headline: [frase de impacto]
- Subheading: [detalhe]
- Seções principais: [lista]
- CTA primária: [texto botão]
- CTA secundária: [texto botão 2]

Visual:
- Estilo: [moderno/minimalist/bold]
- Paleta: Use purple (#6D28D9) + sky (#0EA5E9)
- Tone: [professional/friendly/tech]

Requisitos técnicos:
- Responsivo (mobile-first)
- Semantic HTML
- CSS-in-head (sem imports externos)
- Otimizado para performance

Seguir rigorosamente:
- Design system: DESIGN.md
- Componentes: buttons, cards, badge
- Spacing: 16px/24px/48px grid

Exportar como: HTML
```

---

## Exemplos de Saída

### Exemplo 1: Produto SaaS

**Prompt:**
```
Cria landing page para "Neuralabs Pro" (upgrade do produto):
- Headline: "Desbloqueia poder total"
- Features: Unlimited designs, Priority support, Custom branding
- CTA: "Upgrade agora"
- Preço: Destacar plano mensal/anual
```

**Output esperado:**
- Hero com background gradient purple
- 3 feature cards com checkmarks
- Pricing section (2 columns: monthly/yearly)
- FAQ collapsible
- CTA sticky footer em mobile

### Exemplo 2: Feature Launch

**Prompt:**
```
Cria landing page para lançar "Live Collaboration":
- Destaque que permite edição em tempo real
- Mostre comparação antes/depois
- Testimonial de early user
- Botão "Join beta"
```

**Output esperado:**
- Hero com feature image
- Side-by-side comparison (antes/depois)
- Testimonial card com avatar
- CTA prominent
- Animation subtle no scroll

---

## Boas Práticas

✅ **Faça:**
- Use design system colors e spacing
- Mobile-first responsive
- Semântica HTML (nav, section, footer)
- Alt text em imagens
- Focus states para acessibilidade
- Performance: CSS inline, minimal JS

❌ **Evite:**
- Hardcoded colors fora do design system
- Layouts quebrados em mobile
- Imagens sem alt
- Muitas animações pesadas
- Dependências externas (jQuery, etc)
- Overflow ou scroll horizontal

---

## Variações & Combos

### Combo A: Simples (MVP)
- Hero
- 2-3 features
- CTA
- Footer
**Tempo:** Rápido | **Impacto:** Médio

### Combo B: Completo
- Hero com badge
- 4 features
- Testimonials
- Pricing
- FAQ
- Newsletter signup
- CTA estratégica
**Tempo:** Normal | **Impacto:** Alto

### Combo C: Performance (Ultra-lite)
- Hero minimalista
- 1 feature
- CTA
- Footer
**Tempo:** Muito rápido | **Impacto:** Focused

---

## Troubleshooting

**Landing page fica muito grande**
→ Reduzir número de seções (use Combo A)
→ Remover features redundantes

**Cores não parecem corretas**
→ Respecificar: "Use exatamente #6D28D9 para backgrounds"
→ Evitar usar `purple-700` (use hex direto)

**Layout quebrado em mobile**
→ Pedir: "Mobile-first, sem overflow, stack vertical em 768px"

**Falta interatividade**
→ Seções são estáticas por design (use Next.js para interativo)
→ Animações: CSS apenas (sem JavaScript)

---

## Integração com Neuralabs

### Usar no Claude Code

```
@Claude: Use landing-page-skill

Cria landing page para [seu projeto]
[descriptive brief]
```

### Exportar para o Projeto

```bash
# Gerado em designs/marketing/
# Copiar para public/landing-pages/
# Ou importar em pages/landing.tsx do Next.js
```

### Next.js Import

```jsx
// pages/landing.tsx
import landingHTML from '@/public/landing-page.html'

export default function Landing() {
  return <div dangerouslySetInnerHTML={{ __html: landingHTML }} />
}
```

---

## Versão

**v1.0** - Landing Page Skill
- Template HTML responsivo
- Design system integration
- Mobile-first
- Performance-optimized

---

**Próximo**: Testar skill com um exemplo real!

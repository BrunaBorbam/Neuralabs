# UI Prototype Skill para OpenDesign

Skill para gerar protótipos de interface (dashboards, forms, etc) seguindo design system Neuralabs.

---

## Propósito

Criar mockups de UI/UX para features, dashboards e interfaces. Output é HTML estático pronto para:
- Design reviews
- Stakeholder feedback
- Developer reference
- Rápida iteração

---

## Tipos de Protótipos

### 1. Dashboard

```
Cria dashboard mockup com:
- Header com navegação
- Sidebar com menu
- Grid de widgets/cards
- Gráfico(s)
- Tabela de dados

Tema: [analytics/ecommerce/saas/etc]
Usuário: [quem usa]
Dados: [exemplo de dados]

Design system Neuralabs
Exportar PNG 1920x1080
```

### 2. Form

```
Cria form mockup para [objetivo]:
- Campos necessários: [lista]
- Validação: [rules]
- Layout: [single col / multi col]
- Botões: [submit + cancel]

Mobile-friendly
Incluir states: empty, filled, error

Exportar HTML
```

### 3. Product Page

```
Cria product detail page mockup:
- Product image/gallery
- Detalhes: nome, preço, descrição
- Variações: cores/tamanhos
- Reviews
- Recomendações

E-commerce style
Design system colors

Exportar como HTML
```

### 4. App Onboarding

```
Cria onboarding flow:
- Step 1: [título + descrição]
- Step 2: [título + descrição]
- Step 3: [título + descrição]
- Progress indicator
- Navigation: back/next

Design system
Exportar HTML com navegação

```

---

## Componentes Padrão

### Header/Navbar
```html
- Logo
- Navigation links
- User menu
- Search bar (opcional)
```

### Sidebar
```html
- Menu items com icons
- Collapse toggle
- User profile footer
```

### Card/Widget
```html
- Title
- Content area
- Footer (opcional)
- Subtle shadow
```

### Data Table
```html
- Column headers
- Rows com dados
- Hover state
- Pagination (opcional)
```

### Form Input
```html
- Label
- Input field
- Help text (opcional)
- Error state
```

---

## Padrão de Prompt

```
Cria [tipo] prototype mockup para [feature/product]:

Contexto:
- Objetivo: [o que faz]
- Usuário: [perfil]
- Fluxo: [passos principais]

Seções:
- [Seção 1]: [descrição]
- [Seção 2]: [descrição]
- [Seção 3]: [descrição]

Dados de exemplo:
- [dados sample]

Design:
- Paleta: Design system Neuralabs
- Responsivo: [sim/não + breakpoints]
- Interativo: [hover states, etc]

Estados a mostrar:
- [estado 1]
- [estado 2]

Exportar: [HTML/PNG]
```

---

## Exemplos

### Dashboard Analytics
```
Cria dashboard de analytics mockup:
- Top: KPI cards (4x)
- Middle: Line chart + bar chart
- Bottom: Users table
- Sidebar: menu + filters

Exemplo data:
- Revenue: $45,230
- Growth: +12%
- Users: 1,234
- Churn: 2.3%

Mobile responsive
Exportar HTML
```

### Checkout Form
```
Cria checkout form mockup:
- Shipping info
- Billing address
- Payment method
- Order summary sidebar

Estados:
- Empty form
- Filled form
- Error validation
- Success

Mobile-first
Exportar HTML
```

---

## Design System Application

**Cores:**
- Primary (#6D28D9): Headers, highlights
- Secondary (#0EA5E9): Links, secondary actions
- Gray scale: Backgrounds, text, borders

**Components:**
- Buttons: Primary, secondary, ghost
- Inputs: Default, focus, error states
- Cards: 12px radius, subtle shadow
- Tables: Striped rows, hover highlight

**Spacing:**
- Padding: 16px (cards), 24px (sections)
- Gaps: 16px (components), 24px (sections)
- Margins: 48px (sections)

---

## Boas Práticas

✅ Use grid layouts (CSS Grid / Flexbox)
✅ Design system colors e components
✅ Data samples realistas
✅ Show states: default, hover, active, disabled
✅ Mobile breakpoints: 768px, 1024px
✅ Semantic HTML

❌ Não use imagens reais (use placeholders)
❌ Avoid complex animations
❌ Sem APIs/dados dinâmicos
❌ Não use external libraries (Bootstrap, etc)

---

## Export Formats

### HTML
- Pronto para compartilhar
- Pode ser aberto em browser
- CSS inline
- Importável em Next.js

### PNG
- Para apresentações
- Screenshots de protótipos
- Melhor para comentários visuais

---

## Iteração

Após gerar:
1. Review do design
2. Pedir ajustes
3. Refinar estados/interações
4. Exportar versão final

---

**Próximo**: Criar skill de marketing assets!

# 🌐 Guia Completo: Componentes & Efeitos - Melhores Sites do Mundo

**Referência rápida para Antigravity IDE e Claude Code**

---

## 📚 ÍNDICE RÁPIDO
- [Efeitos Visuais](#efeitos-visuais)
- [Componentes UI](#componentes-ui)
- [Padrões de Layout](#padrões-de-layout)
- [Otimizações](#otimizações)
- [Componentes Avançados](#componentes-avançados)
- [Acessibilidade](#acessibilidade)
- [Tecnologias](#tecnologias-modernas)
- [Snippets Prontos](#snippets-prontos)

---

## 🎨 EFEITOS VISUAIS

### Motion & Scroll
```
✓ Scroll-driven animations      → Sincronizam com rolagem
✓ Parallax effects             → Camadas em velocidades diferentes
✓ View Transitions API         → Transições entre páginas suaves
✓ Scroll reveal                → Elementos aparecem ao scroll
✓ Lazy animation loading       → Anima só ao entrar em viewport
✓ Glassmorphism                → Vidro + blur + backdrop
✓ Morphing animations          → Formas que se transformam
✓ Floating/breathing effects   → Movimento delicado contínuo
```

### Hover & Interação
```
✓ Micro-interactions           → Feedback visual imediato
✓ Ripple effects               → Ondas ao clicar (Material Design)
✓ Gradient shifts              → Cores transitam suavemente
✓ Icon animations              → Ícones ganham vida
✓ Button state transitions     → hover → active → rest com efeito
✓ 3D perspective transforms    → Efeito 3D em CSS puro
✓ Smooth scale effects         → Zoom suave e controlado
✓ Text selection highlight     → ::selection customizado
```

### Visual Effects
```
✓ Blur effects                 → backdrop-filter: blur()
✓ Color overlays               → Camadas coloridas
✓ Shadow depth                 → box-shadow para profundidade
✓ Border animations            → Bordas que se animam
✓ Glow effects                 → Brilho ao redor de elementos
✓ Dot matrix backgrounds       → Padrão de pontos dinâmicos
✓ Gradient backgrounds         → Gradientes animados
✓ Skeleton loaders             → Placeholders durante carregamento
```

---

## 🧩 COMPONENTES UI

### Navegação
```
┌─ Navbar (Sticky)
│  ├─ Logo/Branding
│  ├─ Menu items com hover
│  ├─ Search bar
│  └─ Call-to-action button
│
├─ Hamburger Menu
│  ├─ Icon animations (3 linhas → X)
│  ├─ Slide-out drawer
│  └─ Overlay backdrop
│
├─ Mega Menu
│  ├─ Múltiplas colunas
│  ├─ Ícones + descrição
│  └─ Preview cards
│
└─ Secondary Navigation
   ├─ Tabs com underline
   ├─ Breadcrumbs
   └─ Sidebar navigation
```

**Casos de Uso:**
- Apple: Navbar sticky com mega menu
- Google: Menu simples e responsivo
- Figma: Navbar com avatar profile

### Modais & Overlays
```
┌─ Modal Dialog
│  ├─ Backdrop blur
│  ├─ Conteúdo centralizado
│  ├─ Close button (X)
│  └─ Fade in/out animation
│
├─ Slide Drawers
│  ├─ Position: left/right
│  ├─ Slide animation
│  └─ Dismiss ao clicar backdrop
│
├─ Popovers
│  ├─ Floating UI (arrow pointing)
│  ├─ Auto positioning
│  └─ Click outside dismiss
│
└─ Toast Notifications
   ├─ Position: top-right (padrão)
   ├─ Auto-dismiss após 3-4s
   ├─ Stacking múltiplos toasts
   └─ Ícone + mensagem + ação
```

### Formulários
```
INPUTS
├─ Text Input com floating label
│  └─ Label sobe ao focar/preencher
├─ Email input com validação
├─ Password input com toggle visibility
├─ Search input com autocomplete
└─ Number input com spinner

SELECTS & CHECKBOXES
├─ Custom select dropdown
│  ├─ Searchable
│  ├─ Multiple selection
│  └─ Grouping
├─ Checkbox group
└─ Radio button group

ADVANCED INPUTS
├─ Date picker (calendário)
├─ Time picker
├─ Color picker
├─ File upload (drag-and-drop)
├─ Range slider dual
└─ Tags input com autocomplete

VALIDATION
├─ Real-time validation
├─ Error messages em vermelho
├─ Success checkmark
├─ Loading state (spinner)
└─ Disabled state styling
```

### Cartões & Containers
```
Card Variants:
├─ Basic Card
│  ├─ Border + shadow
│  ├─ Padding interno
│  └─ Rounded corners
│
├─ Hover Card
│  ├─ Elevation ao hover
│  ├─ Shadow depth change
│  └─ Scale transform
│
├─ Image Card
│  ├─ Image top
│  ├─ Overlay gradient
│  ├─ Text bottom
│  └─ Play button (se vídeo)
│
├─ Product Card
│  ├─ Image com rating stars
│  ├─ Price + original price
│  ├─ "Add to cart" button
│  └─ Wishlist heart icon
│
└─ Team Member Card
   ├─ Avatar circular
   ├─ Name + title
   ├─ Bio curta
   └─ Social links
```

### Galeria & Mídia
```
├─ Image Gallery Grid
│  ├─ Masonry layout responsivo
│  ├─ Hover zoom effect
│  └─ Click para lightbox
│
├─ Lightbox/Modal Images
│  ├─ Full-screen ou grande
│  ├─ Next/Previous arrows
│  ├─ Keyboard navigation
│  └─ Close button
│
├─ Carousel/Slider
│  ├─ Auto-scroll opcional
│  ├─ Navigation dots
│  ├─ Arrow buttons
│  └─ Fade ou slide transition
│
├─ Video Player
│  ├─ Custom controls
│  ├─ Progress bar
│  ├─ Volume control
│  ├─ Fullscreen button
│  └─ Thumbnail preview on hover
│
└─ Before/After Slider
   ├─ Dois elementos lado a lado
   ├─ Divisor móvel
   └─ Mouse/touch drag
```

### Tabelas
```
├─ Data Table Básica
│  ├─ Header fixo
│  ├─ Rows com hover
│  └─ Alternating row colors
│
├─ Sortable Table
│  ├─ Click header para sort
│  ├─ Up/down arrow indicator
│  └─ Ascending/descending toggle
│
├─ Filterable Table
│  ├─ Search box top
│  ├─ Column filters
│  ├─ Real-time filtering
│  └─ Reset filters button
│
├─ Expandable Rows
│  ├─ Click row para expandir
│  ├─ Chevron icon rotation
│  └─ Fade in detail content
│
└─ Sticky Headers
   ├─ Header fica fixo ao scroll
   ├─ Shadow bottom quando scrolled
   └─ Body scrolls underneath
```

---

## 📐 PADRÕES DE LAYOUT

### Estrutura Base
```
GRID & FLEX PATTERNS

CSS Grid:
├─ 12-column grid (Bootstrap-like)
├─ Auto-fit responsive
├─ Grid areas nomeadas
└─ Gap/gutter consistency

Flexbox:
├─ Row layouts
├─ Column layouts
├─ Space-between/around/evenly
└─ Wrap behavior
```

### Seções Especiais
```
┌─ Hero Section
│  ├─ Full-screen ou grande
│  ├─ Background video/image
│  ├─ Centered text + CTA
│  ├─ Scroll indicator (arrow animado)
│  └─ Dark overlay sobre fundo
│
├─ Feature Sections
│  ├─ Image + text (alternando)
│  ├─ Icon + title + description
│  ├─ 3-column grid
│  └─ Hover animations
│
├─ CTA Sections
│  ├─ Heading grande
│  ├─ Subheading menor
│  ├─ Primary button
│  └─ Secondary link
│
├─ Testimonials/Reviews
│  ├─ Carousel com quotes
│  ├─ Author info + avatar
│  ├─ 5-star rating
│  └─ Slide transitions
│
├─ FAQ Accordion
│  ├─ Question + chevron
│  ├─ Click para expandir
│  ├─ Smooth height animation
│  └─ Only one open at a time
│
├─ Comparison Tables
│  ├─ Feature x Plans
│  ├─ Checkmarks/X icons
│  ├─ Highlight best plan
│  └─ Sticky left column
│
├─ Pricing Table
│  ├─ Price destaque
│  ├─ Features list
│  ├─ "Get Started" button
│  ├─ Popular badge
│  └─ Yearly/Monthly toggle
│
└─ Stats Section
   ├─ Large number + label
   ├─ Counter animation ao scroll
   ├─ 4-column grid
   └─ Icon background subtle
```

---

## ⚡ OTIMIZAÇÕES

### Carregamento de Imagens
```
LAZY LOADING
└─ loading="lazy" em <img>

RESPONSIVE IMAGES
├─ srcset com múltiplos tamanhos
├─ sizes attribute
└─ WebP com fallback PNG

IMAGE OPTIMIZATION
├─ Compressão com Cloudinary/Imgix
├─ Progressive JPEGs
├─ Modern formats (WebP, AVIF)
└─ Appropriate sizing

FETCH PRIORITY
└─ fetchpriority="high" para LCP images
```

### Performance Rendering
```
DEFER OFFSCREEN CONTENT
├─ content-visibility: auto
├─ contain-intrinsic-size
└─ Adia painting de conteúdo

CONTAINER QUERIES
├─ Queries baseadas em container
├─ Responsividade sem media queries
└─ @container rules

VIRTUALIZATION
├─ Renderiza apenas items visíveis
├─ Perfeito para listas longas
└─ Scroll suave mesmo com 1000+ items

CODE SPLITTING
├─ Carrega JS só quando necessário
├─ Reduz bundle inicial
└─ Melhora Core Web Vitals

CRITICAL CSS
├─ Inline CSS crítico na head
├─ Defer non-critical styles
└─ Reduz render-blocking time
```

---

## 🎪 COMPONENTES AVANÇADOS

### Data Visualization
```
├─ Line Charts          (D3.js, Chart.js, Recharts)
├─ Bar Charts           (trends, comparisons)
├─ Pie/Donut Charts     (distribuição)
├─ Area Charts          (variação ao longo tempo)
├─ Scatter Plots        (correlações)
├─ Heatmaps             (intensidade de dados)
└─ 3D Charts            (Three.js, Babylon.js)
```

### Interactive Components
```
├─ Kanban Boards        (drag-drop columns)
├─ Tree Menus           (hierarquia expandível)
├─ Breadcrumb Trail     (navegação atual)
├─ Progress Indicators  (multi-step forms)
├─ Timeline Components  (histórico/milestones)
├─ Infinite Scroll      (carregar contínuo)
└─ Pagination           (skip, prev, next, jump)
```

### Animation Libraries
```
GSAP (GreenSock Animation Platform)
├─ timeline animations
├─ Scroll animations
└─ Morphing SVG

FRAMER MOTION (React)
├─ Gesture detection
├─ Drag animations
└─ Layout animations

MOTION (Vue/Svelte)
├─ Similar ao Framer Motion
├─ Framework-specific

LOTTIE
├─ JSON-based animations
├─ Lightweight
└─ From After Effects

THREE.JS / BABYLON.JS
├─ 3D graphics
├─ WebGL rendering
└─ Complex interactions
```

---

## 🔐 ACESSIBILIDADE & UX

```
KEYBOARD NAVIGATION
├─ Tab order lógico
├─ Focus visible sempre
├─ Escape fecha modais
└─ Enter submete forms

ARIA & SEMANTIC HTML
├─ <button> para botões
├─ <nav> para navegação
├─ aria-label para ícones
├─ aria-live para updates
├─ role="tab", role="tabpanel"
└─ aria-expanded, aria-pressed

COLOR & CONTRAST
├─ WCAG AA: 4.5:1 ratio min
├─ Color-blind friendly palettes
├─ prefers-color-scheme: dark/light
├─ High contrast mode support
└─ Text não é só cor

TEXT & READABILITY
├─ Minimum font size 16px
├─ Line-height 1.5 mínimo
├─ Letter-spacing adequado
├─ Max line-width 80 chars
└─ prefers-reduced-motion respected

TOUCH ACCESSIBILITY
├─ 44px x 44px touch targets min
├─ Espaçamento entre alvos
├─ No hover-only interactions
├─ Swipe gesture feedback
└─ Mobile-friendly forms

SCREEN READERS
├─ Semantic structure
├─ Alt text para images
├─ aria-describedby links
├─ Live regions para updates
└─ Skip links to content
```

---

## 🌐 TECNOLOGIAS MODERNAS

### Frameworks & Libraries
```
FRONTEND FRAMEWORKS
├─ React 19+
├─ Vue 3 + Composition API
├─ Svelte 5
├─ Astro (static + islands)
└─ Next.js (React full-stack)

CSS SOLUTIONS
├─ Tailwind CSS (utility-first)
├─ Sass/SCSS (pre-processor)
├─ CSS-in-JS (styled-components)
├─ CSS Modules (scoped styles)
└─ PostCSS (transformations)

ANIMATION LIBRARIES
├─ Framer Motion (React)
├─ GSAP (all frameworks)
├─ Motion (Vue/Svelte)
├─ React Spring (physics-based)
└─ Lottie (JSON animations)

BUILD TOOLS
├─ Vite (fast bundler)
├─ Webpack (complex configs)
├─ Turbopack (next-gen)
└─ Rspack (Rust-based)
```

### Web APIs
```
INTERSECTION OBSERVER
├─ Lazy loading images
├─ Infinite scroll
└─ Scroll reveal animations

RESIZE OBSERVER
├─ Monitor element size
├─ Responsive behavior
└─ Container queries polyfill

MUTATION OBSERVER
├─ Track DOM changes
├─ Real-time updates
└─ Dynamic content handling

WEB WORKERS
├─ Heavy computation offscreen
├─ Keep main thread responsive
└─ Perfect para data processing

VIEW TRANSITIONS API
├─ Cross-page animations
├─ Smooth transitions
└─ Navigation effects
```

---

## 💻 SNIPPETS PRONTOS

### 1. SCROLL REVEAL ANIMATION
```html
<style>
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease-out;
}

.reveal.active {
  opacity: 1;
  transform: translateY(0);
}
</style>

<script>
const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => observer.observe(el));
</script>
```

### 2. GLASSMORPHISM MODAL
```css
.modal {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}
```

### 3. SMOOTH SCROLL BEHAVIOR
```css
html {
  scroll-behavior: smooth;
}

/* Vanilla JS alternative */
element.scrollIntoView({ behavior: 'smooth' });
```

### 4. PARALLAX SCROLL EFFECT
```html
<style>
.parallax {
  background-attachment: fixed;
  background-size: cover;
}
</style>

<!-- Or with Intersection Observer + transform -->
```

### 5. MICRO-INTERACTION BUTTON
```css
button {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

button:active {
  transform: translateY(0);
}
```

### 6. FLOATING LABEL INPUT
```html
<style>
.input-group {
  position: relative;
}

.input-group input {
  padding-top: 20px;
  border: none;
  border-bottom: 2px solid #ccc;
  transition: border-color 0.3s;
}

.input-group label {
  position: absolute;
  top: 0;
  transition: all 0.3s;
  pointer-events: none;
}

.input-group input:focus ~ label,
.input-group input:not(:placeholder-shown) ~ label {
  top: -20px;
  font-size: 12px;
  color: #007bff;
}
</style>
```

### 7. INFINITE SCROLL
```javascript
const options = {
  root: null,
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadMoreItems();
    }
  });
}, options);

observer.observe(document.querySelector('.load-trigger'));
```

### 8. LAZY LOAD IMAGES
```html
<img 
  src="placeholder.jpg" 
  data-src="actual-image.jpg" 
  loading="lazy" 
  alt="Description"
/>

<script>
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.src = entry.target.dataset.src;
        imageObserver.unobserve(entry.target);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}
</script>
```

---

## 🎯 SITES DE REFERÊNCIA

**Use como inspiração:**
- **Apple** → Elegância, transições suaves, vídeos em hero
- **Google** → Simplicidade, animações sutis, performance
- **Netflix** → Carousels, card hover effects, video previews
- **Figma** → Moderns UI, 3D transforms, smooth transitions
- **Stripe** → Componentes funcionais, documentação visual
- **Vercel** → Nextgen web practices, performance focus
- **Framer** → Motion design, creative interactions

---

## 📋 CHECKLIST PARA IMPLEMENTAÇÃO

```
PLANEJAMENTO
☐ Define quais componentes preciso
☐ Escolhe cores + tipografia
☐ Planeja layout responsivo
☐ Pensa em acessibilidade desde o início

DESENVOLVIMENTO
☐ HTML semântico
☐ CSS modular (BEM ou similar)
☐ JavaScript progressivo (sem JS = funciona?)
☐ Testa em múltiplos browsers
☐ Mobile-first approach

OTIMIZAÇÃO
☐ Imagens otimizadas
☐ CSS crítico inlined
☐ JS code-split
☐ Lazy loading implementado
☐ Web Vitals no alvo

ACESSIBILIDADE
☐ WAVE ou Axe DevTools passed
☐ Keyboard navigation works
☐ Screen reader tested
☐ Color contrast OK
☐ prefers-reduced-motion respected

PERFORMANCE
☐ Lighthouse score > 90
☐ LCP < 2.5s
☐ FID < 100ms
☐ CLS < 0.1
```

---

**Última atualização:** 2026
**Para usar:** Copie snippets direto para seu projeto Claude Code ou Antigravity IDE

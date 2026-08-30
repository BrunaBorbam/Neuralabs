# 🎯 CLAUDE.md - Contexto Padrão para Codificação Web

**Arquivo de instruções automático para Claude Code + Antigravity IDE**

---

## 📌 SOBRE ESTE PROJETO

- **Objetivo:** Toda codificação segue padrões modernos de web
- **Base:** Melhores práticas dos top sites (Apple, Google, Netflix, Figma)
- **Foco:** Componentes, efeitos, performance e acessibilidade
- **Aplicado em:** Todo código React, Vue, HTML/CSS/JS gerado

---

## 🎨 PADRÕES DE COMPONENTES

Quando criar componentes, SEMPRE considere:

### Estrutura Base
```
COMPONENTE = [ HTML Semântico ] + [ Tailwind CSS ] + [ Animações ] + [ Acessibilidade ]
```

### Checklist por Componente
```
✅ HTML semântico (<button>, <nav>, <section>, etc)
✅ Tailwind classes (utility-first)
✅ Animações suaves (transition, transform)
✅ Hover states definidos
✅ Focus states visíveis
✅ Mobile responsive
✅ ARIA labels onde necessário
✅ Dark mode suportado (prefers-color-scheme)
```

---

## 🧩 COMPONENTES ESSENCIAIS

**Sempre use essas estruturas como base:**

### 1. BOTÕES COM MICRO-INTERACTION
```jsx
<button className="
  px-6 py-2 rounded-lg
  bg-blue-600 text-white
  hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5
  active:translate-y-0
  transition-all duration-300 ease-out
  focus:outline-none focus:ring-2 focus:ring-blue-400
  disabled:opacity-50 disabled:cursor-not-allowed
">
  Click me
</button>
```

### 2. CARDS COM HOVER
```jsx
<div className="
  p-6 rounded-xl
  bg-white dark:bg-slate-900
  shadow-md hover:shadow-xl
  hover:scale-105
  transition-all duration-300
  border border-gray-200 dark:border-slate-700
  cursor-pointer
">
  Content
</div>
```

### 3. INPUTS COM FLOATING LABEL
```jsx
<div className="relative">
  <input
    type="text"
    id="email"
    className="
      peer w-full px-4 py-2
      border-b-2 border-gray-300 focus:border-blue-600
      bg-transparent
      focus:outline-none
      transition-colors
    "
    placeholder=" "
  />
  <label
    htmlFor="email"
    className="
      absolute left-4 top-2 text-sm text-gray-500
      peer-placeholder-shown:top-3 peer-placeholder-shown:text-base
      peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-600
      transition-all duration-300
    "
  >
    Email
  </label>
</div>
```

### 4. MODAL COM BACKDROP BLUR
```jsx
<div className="
  fixed inset-0
  bg-black/40 backdrop-blur-sm
  flex items-center justify-center
  z-50
">
  <div className="
    bg-white dark:bg-slate-900
    rounded-2xl shadow-2xl
    p-6 max-w-md w-full
    animate-in fade-in zoom-in-95 duration-300
  ">
    Content
  </div>
</div>
```

### 5. NAVBAR STICKY
```jsx
<nav className="
  sticky top-0 z-40
  bg-white/80 dark:bg-slate-900/80
  backdrop-blur-md
  border-b border-gray-200 dark:border-slate-700
  shadow-sm
">
  <div className="flex items-center justify-between px-6 py-4">
    {/* Logo, Menu, CTA */}
  </div>
</nav>
```

### 6. HERO SECTION
```jsx
<section className="
  relative min-h-screen
  bg-gradient-to-br from-blue-50 to-white
  dark:from-slate-900 dark:to-slate-800
  flex items-center justify-center
  overflow-hidden
">
  {/* Background video/image optional */}
  <div className="relative z-10 text-center px-6">
    <h1 className="text-5xl font-bold">Heading</h1>
    <p className="text-xl text-gray-600 mt-4">Subheading</p>
    <button className="mt-8">CTA</button>
  </div>
</section>
```

### 7. GRID DE FEATURES
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {features.map(feature => (
    <div key={feature.id} className="
      p-6 rounded-lg
      border border-gray-200 dark:border-slate-700
      hover:shadow-lg
      hover:border-blue-500
      transition-all duration-300
      group
    ">
      <div className="
        text-3xl mb-4
        group-hover:scale-110
        transition-transform duration-300
      ">
        {feature.icon}
      </div>
      <h3 className="font-semibold">{feature.title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mt-2">
        {feature.description}
      </p>
    </div>
  ))}
</div>
```

### 8. ACCORDION/FAQ
```jsx
{items.map(item => (
  <div key={item.id} className="border-b">
    <button
      onClick={() => toggle(item.id)}
      className="
        w-full px-6 py-4
        flex items-center justify-between
        hover:bg-gray-50 dark:hover:bg-slate-800
        transition-colors
        font-semibold
      "
    >
      {item.title}
      <span className={`
        transform transition-transform duration-300
        ${expanded ? 'rotate-180' : ''}
      `}>
        ↓
      </span>
    </button>
    {expanded && (
      <div className="px-6 py-4 bg-gray-50 dark:bg-slate-800">
        {item.content}
      </div>
    )}
  </div>
))}
```

---

## ⚡ EFEITOS SEMPRE USAR

### Animações de Entrada
```css
/* Fade in */
.animate-in fade-in duration-300

/* Slide + Fade */
.animate-in slide-in-from-bottom-4 fade-in duration-500

/* Zoom */
.animate-in zoom-in-95 fade-in duration-300
```

### Hover Effects
```css
/* Elevação */
.hover:shadow-lg

/* Escala */
.hover:scale-105

/* Movimento vertical */
.hover:-translate-y-2

/* Cor */
.hover:bg-blue-700
```

### Transições Suaves
```css
.transition-all duration-300 ease-out
.transition-colors duration-200
.transition-transform duration-300
```

---

## 🔐 ACESSIBILIDADE OBRIGATÓRIA

Toda codificação DEVE incluir:

```jsx
✅ aria-label para ícones
✅ role="button" em divs clicáveis
✅ tabindex="0" para elementos interativos
✅ focus:ring-2 focus:ring-offset-2 em botões
✅ sr-only para screen readers
✅ alt text em imagens
✅ semantic HTML (<button>, <nav>, <section>)
✅ keyboard navigation testada
```

### Exemplo Completo
```jsx
<button
  onClick={handleClick}
  aria-label="Abrir menu de navegação"
  className="
    p-2
    hover:bg-gray-100
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    rounded-lg
  "
>
  <MenuIcon aria-hidden="true" />
</button>
```

---

## 📱 RESPONSIVIDADE

**Sempre mobile-first:**

```jsx
{/* Mobile (default) */}
<div className="text-sm px-4 py-2">

{/* Tablet md: */}
className="md:text-base md:px-6"

{/* Desktop lg: */}
className="lg:text-lg lg:px-8"

{/* Large screen xl: */}
className="xl:text-xl xl:px-12"
```

---

## 🌓 DARK MODE

**Sempre suporte dark mode:**

```jsx
{/* Light mode default */}
<div className="
  bg-white text-black
  dark:bg-slate-900 dark:text-white
">
</div>

{/* Em Tailwind.config.js: */}
darkMode: 'class'
```

---

## 🎯 PERFORMANCE ESSENCIAL

Quando codificar, SEMPRE considere:

```
✅ Images lazy loaded (loading="lazy")
✅ Code splitting em rotas
✅ memoization de componentes pesados
✅ CSS crítico inlined
✅ Minimize re-renders
✅ Optimize bundles
✅ Compress assets
```

---

## 📋 ESTRUTURA DE PROJETO

```
src/
├── components/
│   ├── common/           # Button, Card, Modal, etc
│   ├── layouts/          # Header, Footer, Navbar
│   ├── sections/         # Hero, Features, CTA, etc
│   └── forms/            # Input, Select, Textarea
├── pages/
├── styles/
│   └── globals.css       # Tailwind imports
├── lib/
│   └── utils.js          # Helper functions
└── hooks/                # Custom React hooks
```

---

## 🎨 CORES & TIPOGRAFIA

**Paleta Padrão (Tailwind):**
- **Primary:** Blue (blue-600)
- **Secondary:** Slate (slate-600)
- **Success:** Emerald (emerald-600)
- **Warning:** Amber (amber-600)
- **Error:** Red (red-600)
- **Text:** Slate (slate-900 / slate-50 dark)

**Tipografia:**
```
h1: text-4xl md:text-5xl font-bold
h2: text-3xl md:text-4xl font-bold
h3: text-2xl md:text-3xl font-semibold
Body: text-base md:text-lg
Caption: text-xs md:text-sm
```

---

## 🔄 WORKFLOW PADRÃO

**Sempre siga essa ordem:**

1. **HTML Semântico** - Estrutura limpa primeiro
2. **Tailwind Base** - Estilos básicos
3. **Responsividade** - Mobile-first
4. **Animações** - Transições suaves
5. **Interatividade** - JavaScript/React
6. **Acessibilidade** - ARIA + Focus
7. **Dark Mode** - Suporte dark
8. **Performance** - Otimize
9. **Testes** - Validate
10. **Deploy** - Ship

---

## 💡 DÚVIDAS?

Quando tiver dúvida:
1. Consulte `web-components-effects-guide.md`
2. Procure referência em Apple.com, Google.com, Figma.com
3. Teste com Lighthouse
4. Valide acessibilidade com WAVE

---

**Versão:** 1.0
**Atualizado:** 2026
**Aplicável a:** Todos os projetos web React/Vue/HTML-CSS-JS

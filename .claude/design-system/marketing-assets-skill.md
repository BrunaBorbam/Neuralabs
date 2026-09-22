# Marketing Assets Skill para OpenDesign

Skill para gerar marketing visuals: social graphics, email templates, banners, etc.

---

## Propósito

Criar assets de marketing prontos para publicar em canais:
- Social media (Instagram, Twitter, LinkedIn)
- Email campaigns
- Web banners
- Ads creatives
- Blog thumbnails

Todos seguem design system Neuralabs e são otimizados por plataforma.

---

## Tipos de Assets

### 1. Social Graphics (Instagram)

**Formato:** 1080x1080px (quadrado)

```
Cria social graphic para [plataforma]:

Tema: [produto/promo/anúncio]
Headline: [texto principal]
Texto: [copy adicional]
CTA: [call-to-action]

Estilo: [moderno/playful/professional]
Cores: Usar design system (purple + sky)
Ícone/Imagem: [descrição do elemento]

Exportar como PNG 1080x1080
```

**Exemplos:**
- Product launch announcement
- Feature highlight
- Testimonial/quote
- Event promotion
- Blog article teaser

### 2. Email Template

**Formato:** 600px wide (desktop), responsive mobile

```
Cria email template para [objetivo]:

Seções:
- Header com logo
- Hero banner [descrição]
- Content [corpo do email]
- CTA button [texto]
- Footer com links

Tipo: [newsletter/promo/announcement/onboarding]

Design system
Exportar como HTML
```

### 3. Web Banner

**Formatos:**
- Leaderboard: 728x90px
- Half-page: 300x600px
- Wide skyscraper: 160x600px

```
Cria banner [tamanho] para [objetivo]:

Copy:
- Headline: [frase]
- Subtext: [detalhe]
- CTA: [botão]

Visual: [descrição]
Paleta: Design system
Alvo: [audiência]

Exportar PNG [dimensões]
```

### 4. Blog Thumbnail

**Formato:** 1200x630px (Open Graph)

```
Cria blog thumbnail para artigo:

Título: [do artigo]
Tema: [assunto]
Autora: [nome]
Data: [data publicação]

Estilo: [tech/design/business/etc]
Destaque: [main visual]

Design system colors
Exportar PNG 1200x630
```

### 5. LinkedIn Graphic

**Formato:** 1200x627px

```
Cria LinkedIn post visual para:

Mensagem: [texto principal]
Categoria: [artigo/tip/announce/poll]
Industria: [tech/design/business]

Profissional + visual
Design system
Exportar PNG 1200x627
```

---

## Brand Guidelines (Design System)

**Cores Primárias:**
- Purple #6D28D9 - Main brand
- Sky #0EA5E9 - Secondary
- White #FFFFFF - Backgrounds

**Typography:**
- Headlines: 48px, 700 weight
- Body: 16px, 400 weight
- Small: 12px, 400 weight

**Logo/Branding:**
- Include Neuralabs logo
- Logo size: 20-30% of asset
- Ensure legibility on all backgrounds

**Spacing:**
- Padding: 24px minimum
- Clear hierarchy
- Breathing room

---

## Padrão de Prompt

```
Cria [tipo] asset para [objetivo]:

Plataforma: [Instagram/Email/Web/Blog]
Tamanho: [dimensões]

Conteúdo:
- Headline: [frase principal]
- Copy: [texto descritivo]
- CTA: [botão ou link]

Visual:
- Main element: [descrição]
- Background: [cor/pattern]
- Ícones: [quais usar]

Tone: [professional/playful/urgent/inspirational]
Target: [audiência]

Design system Neuralabs
Exportar: [PNG/HTML]
```

---

## Template Library

### Social: Product Launch

```
- Gradient background (purple → light purple)
- Product image/mockup centered
- Headline: "Introducing [Product]"
- Subtext: [descrição]
- CTA: "Available Now"
- Logo bottom corner
```

### Social: Success Story

```
- Testimonial quote large
- Avatar + name of user
- Company logo
- 4-5 star rating
- CTA: "Read Full Story"
```

### Email: Newsletter

```
- Header: Logo + welcome text
- Featured article thumbnail + link
- 3 smaller articles list
- CTA: "Read More"
- Footer: unsubscribe, social links
```

### Email: Promotional

```
- Banner: Big visual of offer
- Offer copy: Discount/promo details
- Urgency: "Limited time offer"
- CTA: "Claim Now"
- T&C small text bottom
```

### Banner: Announcement

```
- Text left: Headline + body
- Image right: Product/feature
- CTA button
- Logo tiny corner
```

### Banner: Newsletter Signup

```
- Headline: "Stay Updated"
- Input: Email field
- Button: "Subscribe"
- Small benefit text
```

---

## Optimization por Plataforma

### Instagram
- Square 1080x1080 or 1080x1350 (feed)
- 1080x1920 (stories)
- High contrast for scroll-stop
- No small text (mobile viewing)

### Email
- 600px width (Outlook compatible)
- Alt text for all images
- Responsive (mobile fallback)
- Avoid dark mode issues

### Web Banners
- Fast loading (optimized images)
- Clear CTA
- Mobile: 300x250 (most common)
- Desktop: 728x90 or 970x250

### Blog Thumbnails
- 1200x630 (Open Graph standard)
- Text readable at small size
- Include branding/author
- Contrasting colors

### LinkedIn
- 1200x627 or square 1200x1200
- Professional tone
- Text overlay legible
- Call to action clear

---

## Best Practices

✅ **Do:**
- Use design system colors consistently
- Clear hierarchy and readability
- Include logo/branding
- Optimize file size (< 500KB)
- A/B test variations
- Include alt text

❌ **Don't:**
- Mix fonts from outside design system
- Cluttered layouts
- Small unreadable text
- Excessive shadows/effects
- Inconsistent branding
- Stock photo overuse

---

## Asset Organization

```
designs/marketing/
├── social-graphics/
│   ├── product-launch-v1.png
│   ├── testimonial-v1.png
│   └── feature-highlight-v2.png
├── email-templates/
│   ├── newsletter-template.html
│   ├── promo-email-v1.html
│   └── onboarding-v1.html
├── web-banners/
│   ├── leaderboard-728x90.png
│   ├── halfpage-300x600.png
│   └── skyscraper-160x600.png
├── blog-thumbnails/
│   ├── article-1-thumbnail.png
│   ├── article-2-thumbnail.png
│   └── article-3-thumbnail.png
└── linkedin-graphics/
    ├── tip-1.png
    ├── announcement-v1.png
    └── poll-design.png
```

---

## Versions & Variations

Generate A/B testing variations:

```
Cria 3 versões de social graphic:

Versão A: Headline-focused
Versão B: Visual-focused
Versão C: CTA-focused

Mesmo tema, diferentes abordagens
Exportar todas como PNG
```

---

## Performance Checklist

- [ ] Image optimized (< 500KB)
- [ ] Text readable at small size
- [ ] Brand colors used
- [ ] Logo visible
- [ ] CTA clear
- [ ] Platform specs met
- [ ] Mobile preview checked

---

## Integration

### Social Media Scheduling

```bash
# Generate, then schedule via:
# - Buffer
# - Hootsuite
# - Later
# - Meta Business Suite
```

### Email Campaigns

```bash
# Export HTML, import into:
# - Mailchimp
# - Sendgrid
# - Klaviyo
# - HubSpot
```

### Web Deployment

```bash
# Place PNG in:
# public/marketing-assets/
# Reference in components
```

---

## Version

**v1.0** - Marketing Assets Skill
- Social graphics templates
- Email templates
- Web banner formats
- Blog thumbnails
- LinkedIn graphics
- Platform optimization

---

**Próximo**: Começar a gerar assets!

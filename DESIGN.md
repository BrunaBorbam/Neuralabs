# Neuralabs Design System

Design system versionado para Neuralabs - define tokens, componentes e padrões visuais.

---

## Color Palette

### Primária
- **Primary**: `#6D28D9` (purple-700)
- **Primary Light**: `#A78BFA` (purple-400)
- **Primary Dark**: `#4C1D95` (purple-950)

### Secundária  
- **Secondary**: `#0EA5E9` (sky-500)
- **Secondary Light**: `#7EE7FD` (sky-200)
- **Secondary Dark**: `#0369A1` (sky-700)

### Neutras
- **Gray 50**: `#FAFAFA`
- **Gray 100**: `#F3F4F6`
- **Gray 600**: `#4B5563`
- **Gray 900**: `#111827`

### Feedback
- **Success**: `#10B981` (emerald-500)
- **Warning**: `#F59E0B` (amber-500)
- **Error**: `#EF4444` (red-500)
- **Info**: `#3B82F6` (blue-500)

---

## Typography

### Font Families
```css
--font-sans: system-ui, -apple-system, sans-serif;
--font-mono: 'SF Mono', Monaco, monospace;
```

### Scales
- **Display**: 48px, 700 weight (page titles, heroes)
- **Heading 1**: 36px, 600 weight
- **Heading 2**: 28px, 600 weight
- **Heading 3**: 24px, 600 weight
- **Body Large**: 18px, 400 weight
- **Body**: 16px, 400 weight
- **Small**: 14px, 400 weight
- **Caption**: 12px, 400 weight (secondary text)

### Line Heights
- **Tight**: 1.2
- **Normal**: 1.5
- **Relaxed**: 1.75

---

## Spacing System

Based on 4px unit:
```
4px   = xs
8px   = sm
12px  = md
16px  = lg
24px  = xl
32px  = 2xl
48px  = 3xl
64px  = 4xl
```

---

## Components

### Button
```
Primary:
  - Background: Primary (#6D28D9)
  - Text: White
  - Padding: 12px 24px
  - Border Radius: 8px
  - Hover: Primary Dark (#4C1D95)

Secondary:
  - Background: Transparent
  - Border: 2px Secondary (#0EA5E9)
  - Text: Secondary
  - Hover: Light background
```

### Card
```
- Background: White (Gray 50 in dark)
- Border: 1px Gray 200
- Border Radius: 12px
- Padding: 24px
- Shadow: 0 1px 3px rgba(0,0,0,0.1)
```

### Form Input
```
- Border: 1px Gray 300
- Border Radius: 8px
- Padding: 10px 12px
- Font Size: 16px
- Focus: Border Primary, Ring Primary with opacity 10%
```

### Badge
```
- Padding: 4px 12px
- Border Radius: 999px
- Font Size: 12px weight 500
- Background: Primary Light with 20% opacity
- Text: Primary
```

---

## Layout

### Container
- Max Width: 1280px
- Padding: 16px (mobile), 24px (tablet), 32px (desktop)
- Margin: auto

### Grid
- Columns: 12
- Gap: 16px (mobile), 24px (desktop)
- Responsive: 4 cols (mobile), 8 cols (tablet), 12 cols (desktop)

### Spacing
- Section padding: 48px vertical, 24px horizontal
- Component gaps: 16px default

---

## Motion & Transitions

### Easing
- **Standard**: cubic-bezier(0.4, 0, 0.2, 1)
- **Entrance**: cubic-bezier(0, 0, 0.2, 1)
- **Exit**: cubic-bezier(0.4, 0, 1, 1)

### Duration
- **Quick**: 150ms (micro-interactions)
- **Standard**: 300ms (UI transitions)
- **Slow**: 500ms (complex animations)

---

## Accessibility

- **Color Contrast**: WCAG AA (4.5:1 for text)
- **Focus States**: Visible 2px ring in Primary color
- **Touch Targets**: Minimum 44x44px
- **Font Sizes**: Minimum 16px for body text

---

## Usage in Code

### Tailwind Config
```js
export default {
  theme: {
    extend: {
      colors: {
        primary: '#6D28D9',
        secondary: '#0EA5E9',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        // ...
      },
    },
  },
}
```

### CSS Variables
```css
:root {
  --color-primary: #6D28D9;
  --color-secondary: #0EA5E9;
  --spacing-md: 16px;
  --radius: 8px;
  --shadow: 0 1px 3px rgba(0,0,0,0.1);
}
```

---

## Version History

- **v1.0** (2026-09-22): Initial design system with colors, typography, components, and tokens

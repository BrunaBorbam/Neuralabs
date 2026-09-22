# Neuralabs Design Skill para OpenDesign

Skill customizada para gerar designs seguindo o design system do Neuralabs.

## Quando Usar

Use esta skill quando precisar:
- Gerar mockup de feature/interface
- Criar landing page
- Produzir social graphics
- Prototipar dashboard/UI

## Prompt Template

```
Cria um [tipo de design] para Neuralabs seguindo o design system:

Requisitos:
- Use cores do design system: Purple (#6D28D9) para primária, Sky (#0EA5E9) para secundária
- Typography: Display 48px para títulos, Body 16px para texto
- Spacing: 24px entre seções, 16px entre componentes
- Components: Buttons com padding 12px 24px, Cards com border-radius 12px
- Layout: Max-width 1280px, responsive

Descrição: [sua descrição do design]

Exportar: [formato: HTML, PNG, PDF]
```

## Exemplos de Uso

### Exemplo 1: Landing Page Hero

```
Cria uma landing page hero section para Neuralabs seguindo o design system:

Requisitos:
- Purple background gradient (#6D28D9 to #A78BFA)
- Headline em Display 48px (branca)
- Subheading em Body Large 18px
- CTA button com primary style
- Responsive para mobile

Descrição:
Section hero para apresentar novo produto Neuralabs.
Deve ter image placeholder no lado direito.
Exportar como HTML
```

### Exemplo 2: Dashboard Mockup

```
Cria um mockup de dashboard com:
- Header com logo e navegação
- Sidebar com menu
- Cards de estatísticas com badges
- Tabela de dados
- Gráfico simples

Seguir design system Neuralabs.
Exportar como PNG de alta resolução.
```

### Exemplo 3: Social Graphics

```
Cria uma social graphic 1080x1080px para Instagram:
- Background: Purple (#6D28D9)
- Destaque product image
- Texto do CTA em branco
- Badge de "Novo" em Sky (#0EA5E9)

Tema: Anúncio de novo feature
Exportar como PNG
```

## Como Estruturar um Brief

Bom brief para OpenDesign:

1. **Tipo**: Landing page / Dashboard / Social media / etc
2. **Objetivo**: O que quer comunicar
3. **Elementos**: Seções, componentes, dados
4. **Estilo**: Referências, tom visual
5. **Restrições**: Tamanho, formato, plataforma
6. **Design System**: "Segue DESIGN.md do Neuralabs"

Exemplo completo:

```
Tipo: Landing Page
Objetivo: Apresentar nova feature de Analytics do Neuralabs
Elementos:
  - Hero section com image
  - 3 benefit sections (Feature cards)
  - CTA section
  - FAQ (collapsible)
Estilo: Modern, professional, seguir Neuralabs design system
Export: HTML responsive, importável em Next.js
```

## Integração com Neuralabs

### No Claude Code

Quando quiser gerar um design:

```
@Claude: Usar skill de design Neuralabs

Cria um mockup de [descrição]
Segue DESIGN.md e [reqs específicos]
```

### No Fluxo de Desenvolvimento

1. **Feature planning**: Usar OpenDesign para prototipar UI
2. **Review**: Exportar PNG para comentários
3. **Implementation**: Exportar HTML como referência
4. **Documentation**: Gerar asset de documentação visual

### Em CI/CD

```yaml
- name: Generate Design Assets
  run: |
    od create --brief "Generate marketing assets" \
      --design-system ./DESIGN.md \
      --output ./designs/exports
```

## Design System Reference

```
Colors:
  Primary: #6D28D9
  Secondary: #0EA5E9
  Success: #10B981
  Error: #EF4444

Typography:
  Display: 48px 700
  Heading 1: 36px 600
  Body: 16px 400
  Caption: 12px 400

Spacing (4px unit):
  xs: 4px, sm: 8px, md: 12px
  lg: 16px, xl: 24px, 2xl: 32px

Components:
  Button: padding 12px 24px, radius 8px
  Card: padding 24px, radius 12px, shadow
  Input: padding 10px 12px, radius 8px
```

## Tips & Tricks

1. **Sempre mencione DESIGN.md** - Garante consistência
2. **Descreva a interação** - "On hover, button gets darker"
3. **Export format importa** - HTML para código, PNG para review
4. **Responsive-first** - Mobile first, depois desktop
5. **Use componentes** - Cards, buttons, inputs do design system

## Troubleshooting

**Design não segue palette**
- Respecificar cores do DESIGN.md no prompt
- Usar nomes de variáveis: "use --color-primary"

**Exportação com problemas**
- Verificar formato solicitado
- Tentar PNG se HTML falhar
- Aumentar timeout se design é complexo

---

**Próximo**: Criar skills específicas para Landing Pages, Dashboards, etc.

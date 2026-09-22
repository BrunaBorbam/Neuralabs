# Integração OpenDesign + Neuralabs

**Data**: 2026-09-22  
**Autor**: Claude Haiku 4.5

---

## Objetivo

Integrar OpenDesign (alternativa open-source ao Claude Design) com Neuralabs para melhorar o workflow de design, geração de assets e prototipagem rápida.

**O que é OpenDesign?**
- App desktop local (macOS/Windows) para design workflow
- Exporta para HTML, PDF, PPTX, MP4
- Integra com 26 agentes de código (Claude Code, Cursor, Copilot, etc)
- Sistema de skills/plugins para workflows reutilizáveis
- Design systems como DESIGN.md (brand contracts)

---

## Análise: Opções de Integração

### 1. **MCP Integration** (Recomendado)
**O que é**: Usar OpenDesign como MCP (Model Context Protocol) no Claude Code

**Benefícios:**
- OpenDesign já suporta MCP via comando `od mcp install claude`
- Permite gerar designs direto no fluxo de desenvolvimento
- Usa skills e design systems do OpenDesign
- Integra com workflows existentes do Neuralabs

**Como funciona:**
```bash
od mcp install claude
```

**Casos de uso:**
- Gerar mockups de features enquanto desenvolve
- Criar assets de marketing via agente
- Prototipar UI rapidamente
- Exportar designs para PPTX/PDF automaticamente

---

### 2. **CLI Integration** 
**O que é**: Usar o CLI `od` para automação em CI/CD

**Benefícios:**
- Integração em pipelines de build/deploy
- Gerar designs como parte do build process
- Versionar designs junto com código
- Automatizar geração de documentação visual

**Como funciona:**
```bash
npm install -g open-design  # or via sistema de pacotes
od create --brief "Landing page hero" --output ./generated-designs
```

---

### 3. **Design System Export**
**O que é**: Criar um DESIGN.md no Neuralabs com design tokens

**Benefícios:**
- Design system versionado no Git
- Consistência visual garantida
- Reutilizável em todos os projetos
- Funciona como "brand contract"

**Estrutura:**
```
neuralabs/
  DESIGN.md          # Design system (tokens, cores, tipografia)
  designs/           # Arquivos gerados
  .claude/
    design-system/   # Skills customizadas
```

---

## Plano de Implementação

### Fase 1: Setup Inicial (Esta semana)
- [ ] **Instalar OpenDesign CLI**
  ```bash
  npm install -g open-design
  # ou usar o instalador do GitHub
  ```

- [ ] **Configurar MCP no Claude Code**
  ```bash
  od mcp install claude
  ```

- [ ] **Criar DESIGN.md base**
  - Definir palette de cores do Neuralabs
  - Tipografia (Tailwind + custom fonts)
  - Componentes base (buttons, cards, forms)
  - Spacing/sizing tokens

- [ ] **Criar pasta de designs**
  ```
  neuralabs/
    designs/
      marketing/     # Landing pages, ads
      ui-mockups/    # Feature designs
      exports/       # PDFs, PNGs, PNGs
  ```

### Fase 2: Skills Customizadas (Próximas 2 semanas)
- [ ] **Criar skill para landing pages**
  - Template com hero + CTA + features
  - Usa design system do Neuralabs
  
- [ ] **Criar skill para UI prototypes**
  - Componentes React-ready
  - Exports para HTML/CSS

- [ ] **Criar skill para marketing assets**
  - Social graphics templates
  - Email templates
  - Deck presentations

### Fase 3: CI/CD Integration (Depois)
- [ ] **Adicionar job no GitHub Actions**
  - Gerar designs em PRs
  - Preview de mudanças visuais
  - Export automático de assets

- [ ] **Webhook para design changes**
  - Monitorar alterações em designs/
  - Atualizar documentação

---

## Estrutura de Diretórios Proposta

```
neuralabs/
├── DESIGN.md                      # Design system versionado
├── designs/
│   ├── marketing/
│   │   ├── landing-page-v1.html
│   │   ├── hero-section.png
│   │   └── cta-button.svg
│   ├── ui-mockups/
│   │   ├── dashboard-layout.html
│   │   └── user-profile-card.html
│   └── exports/
│       ├── neuralabs-brand.pdf
│       └── component-library.pptx
├── .claude/
│   ├── design-system/            # Skills customizadas
│   │   ├── landing-page-skill.md
│   │   ├── ui-prototype-skill.md
│   │   └── marketing-assets-skill.md
│   └── skills/
└── .github/
    └── workflows/
        └── design-export.yml      # Export automático
```

---

## Casos de Uso Imediatos

### 1. **Gerar Mockup de Nova Feature**
```
Usuário: "Cria um mockup de um novo painel de analytics para Neuralabs"
Claude Code + OpenDesign: Gera HTML/CSS/design usando DESIGN.md
Resultado: Arquivo em designs/ui-mockups/ + preview
```

### 2. **Criar Asset de Marketing**
```
Usuário: "Preciso de uma social graphic para anunciar nova feature"
OpenDesign: Usa skill customizada + design system
Resultado: PNG exportado, pronto para redes sociais
```

### 3. **Prototipo Rápido**
```
Usuário: "Protótipo de landing page para novo produto"
OpenDesign: Gera em segundos com template + design system
Resultado: HTML exportado, já com responsividade
```

### 4. **Design System Documentation**
```
Usuário: "Gera doc visual do design system"
OpenDesign: Cria PDF com todos componentes + tokens
Resultado: PPTX/PDF para compartilhar com time
```

---

## Próximos Passos

1. **Instalar OpenDesign** e explorar os exemplos
2. **Criar DESIGN.md** com identidade visual do Neuralabs
3. **Configurar MCP** no claude-code
4. **Criar 1ª skill** para landing pages
5. **Testar fluxo** end-to-end
6. **Documentar** learnings e patterns

---

## Referências

- [OpenDesign GitHub](https://github.com/nexu-io/open-design)
- [OpenDesign Docs](https://open-design.ai)
- [MCP Setup](https://open-design.ai/docs/mcp)
- [DESIGN.md Format](https://open-design.ai/docs/design-md)

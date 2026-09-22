# Neuralabs Designs

Este diretório contém todos os designs, mockups e assets gerados para Neuralabs usando OpenDesign.

## Estrutura

- **marketing/** - Landing pages, ads, social graphics
- **ui-mockups/** - Mockups de features, protótipos de interface
- **exports/** - Arquivos exportados (PDF, PPTX, PNG)

## Geração de Designs

Para gerar novos designs, use OpenDesign via Claude Code:

```
Prompt: "Gera um mockup de [descrição]"
```

Ou via CLI:

```bash
od create --brief "Landing page para novo produto" --output ./exports
```

## Padrões de Nomenclatura

- `{tipo}-{descricao}-v{numero}.{ext}`
- Exemplos:
  - `landing-page-hero-v1.html`
  - `dashboard-mockup-v2.png`
  - `social-graphic-product-launch-v1.png`

## Design System

Todos os designs devem seguir o [DESIGN.md](../DESIGN.md) na raiz do projeto.

Ver [OPENDESIGN_INTEGRATION.md](../OPENDESIGN_INTEGRATION.md) para mais detalhes sobre integração.

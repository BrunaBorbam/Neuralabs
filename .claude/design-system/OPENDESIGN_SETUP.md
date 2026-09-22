# OpenDesign Setup para Neuralabs

## Status Atual

OpenDesign requer Node.js ~24, mas o projeto está em Node ~22. Aqui estão as opções:

## Opção 1: Instalar Localmente (Recomendado para Dev)

### Pré-requisitos
- Node.js >= 24.0.0
- npm >= 10.0.0

### Instalação

1. **Instalar OpenDesign CLI globalmente**
```bash
npm install -g open-design
```

Ou via o script:
```bash
curl -fsSL https://open-design.ai/install.sh | sh -s claude
```

2. **Verificar instalação**
```bash
od --version
```

3. **Configurar MCP para Claude Code**
```bash
od mcp install claude
```

Isso vai adicionar OpenDesign como MCP provider no seu `settings.json` do Claude Code.

## Opção 2: Usar Docker (CI/CD)

Para pipelines de build/deploy:

```dockerfile
FROM node:24-alpine

RUN npm install -g open-design

WORKDIR /app
COPY . .

# Generate designs
RUN od create --brief "Marketing assets" --output ./designs/exports
```

## Opção 3: Usar OpenDesign Cloud (Sem instalação local)

Acesse [open-design.ai](https://open-design.ai) para:
- Usar versão web
- Gerenciar designs na nuvem
- Exportar via integração OpenDesign Cloud

## Após Instalação

### Testar Fluxo Básico

```bash
# No projeto Neuralabs
cd /path/to/neuralabs

# Criar novo projeto de design
od create --brief "Landing page hero section" --output ./designs/marketing
```

### Usar no Claude Code

Uma vez configurado o MCP:

```
Prompt: "Cria um mockup de um painel de dashboard para Neuralabs usando o design system"
Claude Code + OpenDesign: Vai gerar o design automaticamente
```

## Troubleshooting

### "Command not found: od"
- Verificar instalação: `which od`
- Reinstalar: `npm install -g open-design`
- Adicionar ao PATH se necessário

### "Node version mismatch"
- Usar nvm: `nvm install 24`
- Ou instalar Node.js 24+ manualmente

### MCP não aparece no Claude Code
- Executar: `od mcp install claude --print` para debug
- Verificar `.claude/settings.json` foi atualizado
- Reiniciar Claude Code

## Próximas Steps

1. ✅ Design system (DESIGN.md) criado
2. ⬜ Instalar OpenDesign CLI localmente
3. ⬜ Configurar MCP
4. ⬜ Testar primeira geração de design
5. ⬜ Criar skills customizadas

---

Mais info: https://github.com/nexu-io/open-design

# OpenDesign MCP Configuration para Claude Code

## ✅ Status

OpenDesign daemon está rodando em `http://127.0.0.1:7456` e pronto para integração MCP.

## Configuração no Claude Code

### 1. Localizar arquivo de settings

O arquivo `.claude/settings.json` ou `~/.claude/settings.json` (dependendo da instalação).

### 2. Adicionar MCP Server

Adicione esta configuração ao seu `settings.json`:

```json
{
  "mcpServers": {
    "opendesign": {
      "type": "stdio",
      "command": "/usr/local/bin/od",
      "args": ["mcp"],
      "env": {
        "OD_DAEMON_URL": "http://127.0.0.1:7456"
      }
    }
  }
}
```

### 3. Verificar se funciona

No Claude Code, tente usar OpenDesign:

```
@Claude: Use OpenDesign to create a design

Cria um mockup de um painel de dashboard seguindo o design system do Neuralabs
```

## Alternativa: Usando od diretamente no Neuralabs

Se preferir usar sem MCP global, pode usar localmente:

```bash
cd /home/user/Neuralabs

# Terminal 1: Iniciar daemon
od --no-open

# Terminal 2: Usar MCP localmente
od mcp
```

## Troubleshooting

### "od command not found"
```bash
# Verificar symlink
ls -la /usr/local/bin/od

# Se não existir, recrear:
sudo ln -sf /home/user/nexu-io/open-design/apps/daemon/bin/od.mjs /usr/local/bin/od
```

### "Cannot connect to daemon"
```bash
# Verificar se daemon está rodando
curl http://127.0.0.1:7456/

# Se não estiver, iniciar:
od --no-open &
```

### MCP não aparece no Claude Code
- Reiniciar Claude Code após adicionar settings.json
- Verificar permissões: `chmod +x /usr/local/bin/od`
- Ver logs: `od diagnostics export`

## Comandos Úteis

```bash
# Verificar daemon status
curl http://127.0.0.1:7456/

# Listar design directions
od tools directions --json

# Verificar plugins
od plugin list

# Ver diagnostics
od diagnostics export /tmp/od-diagnostics.zip

# Verificar daemon logs
tail -f /tmp/od-daemon.log
```

## Próximos Passos

1. ✅ Daemon rodando
2. ⏳ Adicionar MCP config ao settings.json
3. ⏳ Testar primeira geração de design
4. ⏳ Criar skill customizada
5. ⏳ Integrar em CI/CD

---

**Daemon status**: ✅ Operacional em http://127.0.0.1:7456

**MCP Status**: ✅ Pronto para configuração

**Próximo**: Adicione MCP config e teste no Claude Code!

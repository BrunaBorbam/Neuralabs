# 🚀 Como Configurar CLAUDE.md em Seus IDEs

**Guia para usar o contexto web padrão automaticamente**

---

## 📦 ARQUIVOS QUE VOCÊ TEM

```
✅ CLAUDE.md                           → Instruções de sistema
✅ web-components-effects-guide.md     → Referência completa
✅ SETUP-INSTRUCTIONS.md               → Este arquivo
```

---

## 🔧 ANTIGRAVITY IDE

### Passo 1: Copiar arquivo CLAUDE.md
```bash
# Na raiz do seu projeto Antigravity
cp CLAUDE.md ./

# Ou manualmente:
# 1. Abra seu projeto em Antigravity IDE
# 2. Crie arquivo: CLAUDE.md
# 3. Cole o conteúdo completo do CLAUDE.md fornecido
```

### Passo 2: Configurar leitura automática
```javascript
// No arquivo .antigravity.config.json (se existir)
// Ou crie um
{
  "ai": {
    "contextFile": "CLAUDE.md",
    "autoLoad": true,
    "autoRefresh": true
  }
}
```

### Passo 3: Verificar se está funcionando
```
1. Abra Antigravity IDE
2. Vá em Settings/Configurações
3. Procure por "Context Files" ou "AI Context"
4. Confirme que CLAUDE.md está carregado
5. Próximo código que gerar já deve usar os padrões
```

---

## 💻 CLAUDE CODE

### Passo 1: Copiar arquivo na raiz do projeto
```bash
# Terminal no seu projeto
cp CLAUDE.md ./

# Ou pelo VS Code:
# 1. Abra seu workspace
# 2. Crie arquivo: CLAUDE.md
# 3. Cole o conteúdo completo
```

### Passo 2: Claude Code lerá automaticamente
✅ Claude Code **lê automaticamente CLAUDE.md**

Não precisa configuração extra! Se o arquivo estiver na raiz do projeto, Claude Code vai:
- Ler CLAUDE.md no início
- Aplicar essas instruções em todos os códigos gerados
- Usar como context padrão

### Passo 3: Verificar
```bash
# Termine um comando com: "@claude-code"
# Ou comece um chat assim:

"@claude-code gera um button component seguindo nossos padrões"

# Ele deve responder com componente que inclui:
# ✅ Tailwind classes
# ✅ Hover/focus states
# ✅ Acessibilidade
# ✅ Dark mode
# ✅ Transições suaves
```

---

## 📍 ESTRUTURA RECOMENDADA DO PROJETO

```
seu-projeto/
├── CLAUDE.md                          ← Instruções (lido automaticamente)
├── web-components-effects-guide.md    ← Referência
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── layouts/
│   │   └── sections/
│   ├── pages/
│   ├── styles/
│   └── lib/
├── tailwind.config.js
├── package.json
└── README.md
```

---

## 🎯 COMO USAR NA PRÁTICA

### No Antigravity IDE

```
1. Abra seu projeto
2. Comece a codificar normalmente
3. IA automaticamente aplicará padrões do CLAUDE.md
4. Se precisar de algo específico:
   - "Cria um card component com hover"
   - "Componente de formulário com validation"
   - "Hero section com video background"
```

### No Claude Code

```bash
# Terminal
claude-code "gera uma navbar sticky"

# Ou em chat
"@claude-code faz um grid de features com 3 colunas"

# Componentes individuais
"@claude-code modal with glassmorphism"
```

### No Chat do Claude

```
Diga ao Claude:
"Use o contexto em CLAUDE.md para gerar..."

Ou:
"Seguindo meus padrões web, cria..."
```

---

## ✨ VERIFICAÇÃO: PADRÕES SENDO APLICADOS?

Após configurar, seu código gerado deve incluir:

### ✅ Checklist
```
[ ] Tailwind classes usadas
[ ] Hover states presentes
[ ] Focus states visíveis
[ ] Responsive classes (md:, lg:)
[ ] Dark mode suportado (dark:)
[ ] Transitions/animations
[ ] ARIA labels em componentes
[ ] Semântica HTML correta
[ ] Mobile-first approach
[ ] Comentários claros
```

Se esses itens estão presentes = Configuração OK! ✅

Se não está funcionando = Continue lendo...

---

## 🐛 TROUBLESHOOTING

### "Antigravity IDE não está lendo CLAUDE.md"

```
1. Confirme arquivo está na RAIZ do projeto
   ✅ correto:   ./CLAUDE.md
   ❌ errado:    ./src/CLAUDE.md

2. Reinicie Antigravity IDE completamente
   - Feche tudo
   - Abra novamente
   - Tente de novo

3. Verifique permissões do arquivo
   chmod 644 CLAUDE.md

4. Se ainda não funcionar:
   - Copie conteúdo manualmente em cada prompt
   - Ou use: "Usando esse contexto: [cola conteúdo]"
```

### "Claude Code não está aplicando padrões"

```
1. Confirme CLAUDE.md na raiz
   ls -la | grep CLAUDE.md

2. No prompt, mencione explicitamente:
   "@claude-code seguindo CLAUDE.md, cria..."

3. Ou copia o contexto no início:
   """
   [Cola CLAUDE.md aqui]
   """
   "Agora gera um componente..."

4. Se não funcionar:
   - Claude está working as designed
   - Apenas copie + cola o contexto quando chamar
```

### "Qual diferença com/sem CLAUDE.md?"

**SEM CLAUDE.md:**
```jsx
<button className="bg-blue-500 text-white">
  Click
</button>
```

**COM CLAUDE.md:**
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
  Click
</button>
```

Diferença = Profissional vs Básico!

---

## 🔄 MANUTENÇÃO

### Atualizar CLAUDE.md

Se quiser adicionar novos padrões:

```markdown
1. Abra CLAUDE.md
2. Adicione sob seção apropriada
3. Salve
4. Reinicie IDE
5. Próximos códigos usarão novo padrão
```

### Exemplo: Adicionar novo componente

```markdown
## MEUS COMPONENTES CUSTOMIZADOS

### Alert Box
[Adicione seu componente aqui]
```

---

## 📚 WORKFLOW FINAL

```
SETUP (uma única vez)
│
├─ Copiar CLAUDE.md para raiz
├─ Copiar web-components-effects-guide.md
├─ Reiniciar IDE
└─ Pronto!

DESENVOLVIMENTO (toda vez)
│
├─ Pedir novo componente
├─ IDE aplica padrões automaticamente
├─ Você apenas refina/customiza
└─ Deploy profissional

REFERÊNCIA (quando precisar)
│
├─ Consulta web-components-effects-guide.md
├─ Copia snippets
├─ Cola em seu código
└─ Ajusta conforme necessário
```

---

## 🎁 BONUS: Alias úteis (Claude Code)

Para acelerar, crie esses shortcuts:

```bash
# ~/.bashrc ou ~/.zshrc

# Novo componente rápido
alias newcomp='claude-code "usando CLAUDE.md, cria um novo componente"'

# Verificar padrões
alias checkpatterns='claude-code "valida se esse código segue CLAUDE.md"'

# Adicionar dark mode
alias addark='claude-code "adiciona dark mode suporte"'
```

---

## ❓ DÚVIDAS FREQUENTES

**P: Preciso copiar CLAUDE.md em cada projeto?**
R: Sim. Cada projeto deve ter seu próprio CLAUDE.md na raiz.

**P: E se meu projeto já tiver CLAUDE.md diferente?**
R: Merge! Combine o conteúdo dos dois.

**P: Funciona com TypeScript?**
R: Sim! CLAUDE.md é agnóstico de linguagem.

**P: E se não estiver funcionando?**
R: 
1. Confirme arquivo está salvo
2. Reinicie IDE
3. Na próxima vez, copie conteúdo no prompt

**P: Posso adicionar meus próprios padrões?**
R: Claro! É seu arquivo. Customize à vontade.

**P: Isso afeta performance do IDE?**
R: Não! Arquivo é lido só uma vez.

---

## 🚀 PRÓXIMOS PASSOS

```
1. ✅ Copia CLAUDE.md para teu projeto
2. ✅ Copia web-components-effects-guide.md também
3. ✅ Reinicia Antigravity IDE
4. ✅ Testa gerando um componente
5. ✅ Celebra código profissional! 🎉
```

---

**Dúvidas?** Consulte `web-components-effects-guide.md` ou retorne ao `CLAUDE.md` para clarificar qualquer padrão.

**Happy Coding!** 🚀

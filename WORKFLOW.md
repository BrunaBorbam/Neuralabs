# 🚀 Workflow de Edição - Neuralabs

Seu ambiente está configurado! Aqui está como editar e fazer deploy:

## 📁 Estrutura de Pastas

```
neuralabs-github/
├── app/
│   ├── page.js          ← PÁGINA PRINCIPAL (onde você edita)
│   ├── layout.tsx       ← Layout global
│   └── globals.css      ← Estilos globais
├── public/              ← Imagens e assets
├── package.json         ← Dependências
└── next.config.ts       ← Configuração Next.js
```

## ✏️ Como Editar

### 1. **Editar a página principal** (`app/page.js`)

A página está dividida em seções:
- **Hero** - Seção inicial com "Neurociência Vira Conversão"
- **Problems** - Problemas que resolvemos
- **Solutions** - Método Neuralabs
- **Portfolio** - Trabalhos (Torra, Órbita)
- **Process** - Processo em 4 etapas
- **FAQ** - Perguntas frequentes
- **CTA Form** - Formulário de contato
- **Footer** - Rodapé

### 2. **Ver mudanças em tempo real**

```bash
cd C:\Users\Micro\Desktop\bruna\neuralabs-github
npm run dev
```

Acesse: `http://localhost:3000`

As mudanças aparecem automaticamente (Hot Reload).

### 3. **Fazer commit e push**

```bash
# Após fazer edições:
git add .
git commit -m "Descrição das mudanças"
git push
```

**PRONTO!** O Vercel detecta automaticamente e faz deploy em neuralabs.online em 2-3 minutos.

## 🎨 Estrutura da Página

### Componentes principais:

```javascript
// Header com navegação
- Logo "Neuralabs"
- Menu: Solução, Diferenciais, Trabalhos, Processo, FAQ
- CTA button: "Solicitar diagnóstico"

// Hero Section
- Tagline: "NEUROCIÊNCIA APLICADA A PERFORMANCE"
- Headline: "Onde Neurociência Vira Conversão"
- Subheading: "95% das decisões..."
- Buttons: "Solicitar diagnóstico" + "Ver como funciona"
- Stats: 100%, 30 dias, 24h

// Problem Section
- 3 cards: Testes no escuro, Copy que não conecta, CRO genérico

// Solution Section
- 4 cards: Mapas de atenção, Gatilhos cognitivos, IA, Arquitetura

// Portfolio
- 2 projects: Torra (Cafeteria), Órbita (E-commerce)

// Process
- 4 steps: Diagnóstico, Mapeamento, Design, Entrega

// FAQ
- 6 perguntas com accordion

// Form
- Campos: Nome, WhatsApp, Email, Negócio (opcional)
- Submit button: "Solicitar diagnóstico gratuito"
```

## 🔧 Cores Principais

```css
- Cor primária: bg-blue-600 (Azul)
- Cor secundária: bg-slate-900 (Cinza escuro)
- Fundo: bg-slate-950 (Preto)
- Texto: text-white
- Bordas: border-slate-800
- Hover: hover:text-blue-400
```

## 📝 Exemplos de Edições Comuns

### Mudar o headline
```javascript
// Procure por:
<h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
  Onde Neurociência<br /><span className="text-blue-400">Vira Conversão</span>
</h1>

// E edite o texto
```

### Editar um card de solução
```javascript
// Procure na array 'solutions':
const solutions = [
  {
    title: 'Mapas de atenção',
    description: 'Mapeamos onde o usuário...'
  },
  // Edite aqui
];
```

### Adicionar uma pergunta no FAQ
```javascript
// Procure na array 'faqs':
const faqs = [
  {
    q: 'Sua pergunta?',
    a: 'Sua resposta aqui.'
  },
  // Adicione uma nova linha
];
```

## 🚨 Importante

- **Não edite `node_modules/`** - Use `npm install` apenas quando adicionar pacotes
- **Commits frequentes** - Faça commits pequenos e descritivos
- **Teste localmente** - Sempre teste em `localhost:3000` antes de fazer push
- **Aguarde o deploy** - Vercel demora 2-3 minutos para fazer deploy após push

## 🆘 Troubleshooting

### "Port 3000 already in use"
```bash
# Matá processo anterior:
npx kill-port 3000
npm run dev
```

### "Git não reconhece mudanças"
```bash
git status  # Veja o que mudou
git add .   # Adicione tudo
git commit -m "msg"
git push
```

### "Vercel não fez deploy"
Vá para https://vercel.com/bruna-s-projects-4c73f076/neuralabs-novo e veja o status dos deployments.

---

**Está pronto para editar! Boa sorte! 🎉**

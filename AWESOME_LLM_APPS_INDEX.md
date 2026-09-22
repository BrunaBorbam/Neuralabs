# Awesome LLM Apps - Repository Index

Índice de referência rápida do repositório [shubhamsaboo/awesome-llm-apps](https://github.com/shubhamsaboo/awesome-llm-apps).

**Descrição:** 100+ templates open-source (Apache-2.0) de agentes IA, skills e aplicações RAG. Prontas para clonar, executar e adaptar. Funciona com Claude, GPT, Gemini, DeepSeek, Llama, Qwen.

**Source:** https://github.com/shubhamsaboo/awesome-llm-apps  
**Tutorial:** https://www.theunwindai.com  
**Cloned:** 2026-09-22

---

## 1. Estrutura Principal

```
awesome-llm-apps/
├── agent_skills/              # Skills instaláveis para Claude Code/Codex/Cursor
├── starter_ai_agents/         # Agentes simples (single-file, API keys)
├── advanced_ai_agents/        # Agentes avançados (production-ready, tools, memory)
├── always_on_agents/          # Background agents (scheduled, monitoring)
├── voice_ai_agents/           # Speech-in/out com APIs de voz
├── generative_ui_agents/      # Agentes que renderizam UI interativa
├── mcp_ai_agents/             # Agentes usando Model Context Protocol
├── rag_tutorials/             # 20+ tutoriais de RAG (retrieval patterns)
├── advanced_llm_apps/         # Apps avançadas (memory, chat, optimization)
├── ai_agent_framework_crash_course/  # Tutoriais Google ADK + OpenAI SDK
└── docs/                      # Documentação e assets
```

---

## 2. Categorias Principais

### 🧩 Agent Skills (11 disponíveis)

Skills instaláveis que adicionam funcionalidades a coding agents. Formato: `npx skills add <git-url>`

| Skill | Propósito | Quando usar |
|-------|-----------|------------|
| **Project Graveyard** | Escaneia máquina para projetos abandonados, analisa git history, sugere ressurreição | Quando user quer reviver projeto antigo ou entender padrões de abandono |
| **First Reader** | Simula leitores reais, reporta onde perdem interesse, sem reescrever | Code review: identificar partes confusas da documentação |
| **Scope Creep Detector** | Verifica se diff excedeu intent original | Antes de fazer commit: validar escopo |
| **Commit Archaeologist** | Reconstrói why de um arquivo/região usando git history | Entender decisões de design antigas |
| **Dependency Doctor** | Valida manifesto: unpinned, yanked, obsolete | Manutenção de dependências |
| **Self-Improving Agent Skills** | Skills otimizadas com Gemini + eval | Experimentação com otimização automática |
| **Advisor Orchestrator Worker** | Meta-loop: Fable 5.1 (advisor) + GPT-6 (orchestrator) + Gemini Flash (worker) | Multi-model reasoning |

**Instalação padrão:** `npx skills add https://github.com/Shubhamsaboo/awesome-llm-apps/tree/main/agent_skills/<skill-name>`

---

### 🌱 Starter AI Agents (13 templates)

Single-file agents que rodam com API keys. Cada um ~30-100 linhas Python/Node.

Exemplos relevantes:
- **AI Travel Agent** - Itinerários personalizados (DAG com web search + reasoning)
- **AI Data Analysis Agent** - Q&A over CSV/Excel (uploads + LLM reasoning)
- **AI Music Generator Agent** - Prompt → MP3 track (API integration)
- **Mixture of Agents** - Múltiplos LLMs respondem, um agrega melhor resposta
- **AI Meme Generator** (BrowserUse) - Browser automation real, não image API

**Padrão de uso:** Clone → `pip install -r requirements.txt` → `streamlit run *.py`

---

### 🚀 Advanced AI Agents (20+ templates)

Production-style agents com tools, memory, multi-step reasoning. Multi-agent systems.

**Categorias:**
- **Single Agent:** Home Renovation, Deep Research, Consultant, System Architect, Financial Coach, Movie Production, Investment, Fraud Investigation, Journalist, Mental Wellbeing, Meeting, Sales Intelligence
- **Multi-Agent Teams:** Competitor Intelligence, Finance Team, Game Design, Legal Team, Recruitment, Real Estate, Services Agency, Teaching, Design Feedback, Travel Planner

**Padrões arquitectónicos:**
- Tool routing com function calling
- Memory systems (conversation + context)
- Agentic loops com reasoning
- Multi-turn interactions

---

### 🛰️ Always-on Agents (2 templates)

Background agents que rodam em schedule/events, monitoram contexto, entregam updates proativos.

| Agent | O quê | Saída |
|-------|-------|--------|
| **HN Briefing Agent** | Scheduled scout que lê Hacker News | Ranked daily brief → Slack/email |
| **Release Radar Agent** | Observa releases de dependências | Brief sobre breaking/deprecated/security changes |

**Pattern:** Scheduled trigger → web research → reasoning → notification

---

### 🗣️ Voice AI Agents (5 templates)

Speech-in, speech-out usando real-time voice APIs (Gemini Live, OpenAI Realtime).

- **Audio Tour Agent** - Tours auto-guiados baseados em location + interests
- **Customer Support Voice** - Voice Q&A grounded em docs
- **Insurance Claim Live Team** - Intake de claims em voz, análise visual (câmera), sketch de incidente
- **Voice RAG Agent** - Perguntar PDFs e ouvir respostas
- **Voice Dictation** (OSS clone Whispr) - Dictate to type

---

### 🖼️ Generative UI Agents (7 templates)

Agentes que renderizam componentes UI interativos (forms, cards, charts, editable plans), não just texto.

| Agent | Output |
|-------|--------|
| **Generative UI Starter** | Chat-driven kanban board (você + agent) |
| **Financial Coach** | Budget/savings/debt plans como interactive cards |
| **Dashboard Canvas** | Describe dashboard em chat, charts assemble live |
| **MCP App Builder** | Describe MCP app → live sandboxed instance |
| **Shadcn Component Generator** | Chat → production-ready shadcn components |

**Stack:** React/TypeScript + streaming UI components + Vercel/Claude rendering

---

### ♾️ MCP AI Agents (6 templates)

Agentes que usam Model Context Protocol para conectar ferramentas/dados externas.

| Agent | Conecta a |
|-------|-----------|
| **Browser MCP Agent** | Real browser automation via MCP |
| **GitHub MCP Agent** | GitHub API (repos, PRs, issues, analysis) |
| **Notion MCP Agent** | Notion pages (read/query) |
| **Travel Planner MCP Agent** | Airbnb + Google Maps (live pricing/availability) |
| **Multi-MCP Router** | Specialist agents, cada um com seu MCP server |
| **OpenAI Remote MCP Bridge** | Connect OpenAI function calling → remote MCP |

**Pattern:** Agent → MCP client → MCP server ↔ external tool

---

### 📀 RAG Tutorials (20+ recipes)

Desde simples chains até agentic e multi-source retrieval.

**Principais padrões:**
- **Local RAG:** Llama 3.2, DeepSeek (offline, sem API keys)
- **Agentic RAG:** Agent decides when to retrieve (LangGraph pattern)
- **Corrective RAG (CRAG):** Retrieval grades itself, retries before answering
- **Multimodal RAG:** Text, PDFs, imagens, áudio, vídeo com citations
- **Knowledge Graph RAG:** Multi-hop answers com source attribution
- **Hybrid Search:** Keyword + vector search

**Tools frequentes:** LangGraph, Chroma, Qdrant, LlamaParse, Firecrawl

---

### 🧑‍🏫 AI Agent Framework Crash Courses

**Google ADK Crash Course:**
- Starter agent, structured outputs, tools (built-in, function, third-party, MCP)
- Memory, callbacks, plugins, multi-agent patterns
- Model-agnostic

**OpenAI Agents SDK Crash Course:**
- Starter agent, function calling, structured outputs, tools
- Memory, evaluation, handoffs, swarm orchestration, routing logic

---

## 3. Padrões & Convenções

### Skill Format (agent_skills/)

```yaml
---
name: project-graveyard
description: >-
  Scans developer machine for dead side projects...
license: Apache-2.0
metadata:
  author: "Shubham Saboo"
  version: "1.0.0"
  source: "https://github.com/Shubhamsaboo/awesome-llm-apps"
---

# Project Graveyard
[Markdown docs...]
```

**Estrutura:**
- Frontmatter YAML (name, description, license, metadata)
- Markdown documentation (when to use, how to run, how to interpret)
- `scripts/` directory com código Python/Node
- `references/` directory com documentation complementar

### Agent Format (starter_ai_agents/)

```
ai_travel_agent/
├── README.md
├── travel_agent.py (ou .js)
├── requirements.txt
├── .env.example
└── docs/ (opcional)
```

**Convenção:**
- Single entry file (travel_agent.py)
- requirements.txt com pinned versions
- .env.example com vars necessárias
- Streamlit/FastAPI/Node CLI para executar

### MCP Agent Format (mcp_ai_agents/)

```
github_mcp_agent/
├── README.md
├── github_agent.py
├── requirements.txt
├── .env.example
└── mcp_server.py ou mcp_config.json
```

**Diferença:** Explicitamente configura MCP servers (Docker, local, remote)

---

## 4. Aplicabilidade ao Neuralabs

### Alta Relevância

#### 4.1 Agent Skills → OpenDesign Skills
Nossa estrutura de design skills (landing-page-skill.md, ui-prototype-skill.md, marketing-assets-skill.md) segue padrão similar ao project-graveyard e outras skills. Considerações:

- **Versionamento:** Adicionar frontmatter YAML aos .md skills
- **Avaliação:** Implementar eval suite para testar geração de designs
- **Instalação:** Tornar skills instaláveis via `npx skills add` ou similar

#### 4.2 MCP Integration
O repositório tem 6 exemplos prontos de MCP agents. Nosso OpenDesign MCP integration segue exatamente esse pattern:
- Agent ↔ MCP client (Claude Code)
- MCP server (OpenDesign daemon em localhost:7456)
- Tool/resource discovery

**Aplicar:** Usar github_mcp_agent como template para documentar OpenDesign MCP setup.

#### 4.3 Generative UI Agents
Nossa visão de "designs que renderizam UI interativa" alinha-se com generative_ui_agents/:
- MCP App Builder generates interactive components
- AI Dashboard Canvas renderiza charts live
- Multimodal Design Feedback Team com Gemini

**Learnings:** Usar React/TypeScript + streaming UI para enhanced design previews.

### Moderada Relevância

#### 4.4 Always-on Agents → Design Monitoring
Padrão: Schedule trigger → Analysis → Proactive delivery

Aplicação ao Neuralabs:
- Scheduled design consistency checker (verifica designs vs design system)
- Dependency updates → alert about impact on design tokens
- Design asset change logger

#### 4.5 RAG for Design Knowledge
Uso: Indexar design system docs, components, patterns. Query com natural language.

Implementação:
- Index DESIGN.md, skill docs, component library
- Query: "Qual cor devo usar para success state?"
- Answer com citations e design token reference

### Baixa Relevância (Por Enquanto)

- Voice AI Agents (Neuralabs é visual-first, não audio-first)
- Autonomous Game Playing (não aplicável)
- Finance/Legal/Healthcare agents (domínios específicos)

---

## 5. Próximos Passos & Recomendações

### Curto Prazo (Sprint Atual)

1. **Versionar design skills** com frontmatter YAML (tipo agent_skills)
2. **Criar eval suite** para testar quality de designs gerados
3. **Documentar MCP setup** using github_mcp_agent como template

### Médio Prazo (Q4 2026)

1. **Implementar always-on design monitor** (scheduled consistency checks)
2. **Build RAG layer** sobre design system + component library
3. **Generative UI previews** para designs em browser (React + streaming)

### Longo Prazo (2027)

1. **Integração com agent skills registry** (tornar Neuralabs skills compartilháveis)
2. **Multi-agent design system** (especialista cores, tipografia, layout)
3. **Community template library** (usuários compartilham designs/skills)

---

## 6. Recursos Úteis

- **Main Repo:** https://github.com/Shubhamsaboo/awesome-llm-apps
- **Tutorial Portal:** https://www.theunwindai.com
- **GitHub Skills Installer:** `npx skills add <url>`
- **MCP Registry:** https://github.com/anthropics/model-context-protocol/tree/main/resources
- **OpenAI Agents SDK Docs:** https://platform.openai.com/docs/agents
- **Google ADK Docs:** https://ai.google.dev/agentic-reasoning

---

## 7. Terminologia & Conceitos-Chave

| Termo | Definição |
|-------|-----------|
| **Skill** | Funcionalidade instalável para coding agents (Claude Code, Cursor, etc.) |
| **Agent** | Sistema autônomo com LLM, tools, memory que executa tarefas |
| **Multi-agent** | Múltiplos agentes colaborando (routing, handoff, aggregation) |
| **MCP** | Model Context Protocol - standar para conectar agents a tools/data |
| **RAG** | Retrieval Augmented Generation - técnica para ground LLM em documentos |
| **Generative UI** | UI components gerados/atualizados em real-time pelo agent |
| **Always-on** | Agent rodando em background (scheduled ou event-driven) |
| **Tool** | Função que agent pode chamar (search, calculator, API call, etc.) |
| **Structured Output** | LLM retorna JSON/schema validado (vs free-form text) |

---

## 8. Exemplos para Reference

### Usar projeto-graveyard como inspiração para design autopsy skill

Skill que:
- Escaneia codebase para designs "mortos" (não usados em componentes)
- Analisa git history de design files
- Sugere redesigns prontos para ressurreição

### Usar github_mcp_agent como template para OpenDesign agent

Padrão a copiar:
- Streamlit interface
- MCP server discovery (Docker + local)
- Query templates (example queries)
- Multi-turn conversation

### Usar generative_ui_agents/ai-dashboard-canvas como inspiração para design preview

Implementar:
- Chat interface para describe dashboard
- Live canvas que atualiza com components
- Streaming updates (não full refresh)

---

**Last Updated:** 2026-09-22  
**Maintainer:** Claude  
**Status:** Active reference document - update quando explorar mais templates


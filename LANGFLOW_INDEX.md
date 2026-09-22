# Langflow Repository - Visual AI Workflow Builder Index

Índice de referência rápida do repositório [langflow-ai/langflow](https://github.com/langflow-ai/langflow).

**Descrição:** Plataforma visual open-source (MIT) para construir, testar e deployar aplicações AI-powered com drag-and-drop interface. Suporta 100+ LLMs, vector databases, tools. Componentes customizáveis em Python. Execução como API, CLI, MCP servers. Designer visual + code editor híbrido.

**Source:** https://github.com/langflow-ai/langflow  
**Latest Release:** 2026-09-22 (versão 1.12.2, múltiplas releases por semana)  
**Stack:** Python 3.10-3.14 (FastAPI backend), React/TypeScript (frontend), Node.js v22 LTS  
**License:** MIT (open-source)  
**Contributors:** 2,000+ community developers  
**Download:** Langflow Desktop (macOS, Windows) com deps incluídas

---

## 1. Arquitetura Geral

### Componentes Principais

```
langflow/
├── src/
│   ├── backend/               # FastAPI server (Python)
│   │   ├── langflow/          # Main app logic
│   │   ├── tests/             # Backend tests
│   │   └── base/              # Base classes
│   ├── frontend/              # React + TypeScript UI
│   │   ├── src/               # React components
│   │   │   ├── components/    # UI components (canvas, palette, etc)
│   │   │   ├── pages/         # Pages (flows, components, etc)
│   │   │   └── stores/        # Zustand state management
│   │   └── tests/             # E2E + unit tests (Playwright)
│   ├── sdk/                   # Python SDK for programmatic usage
│   ├── lfx/                   # Langflow X (cloud features, agents)
│   └── langflow-stepflow/     # Step-flow execution engine
├── src/bundles/               # Extension bundles (100+ available)
│   ├── ollama/                # Ollama integration
│   ├── confluent/             # Kafka integration
│   ├── toolguard/             # Security guardrails
│   ├── paddle/                # Payment processing
│   └── ... (more integrations)
├── docs/                      # Markdown documentation + API reference
├── deploy/                    # Deployment configs (Docker, K8s, etc)
└── Makefile                   # Build orchestration
```

### Stack Técnico Detalhado

| Layer | Technology | Propósito |
|-------|-----------|----------|
| **API Server** | FastAPI (Python) | REST endpoints, WebSocket support |
| **Web UI** | React 19 + TypeScript | Visual flow builder, canvas |
| **State Management** | Zustand | Client-side state (flows, components) |
| **Canvas** | Custom React + Reactflow-like | Node-based workflow editor |
| **Component System** | Python dataclasses | Component definitions + validation |
| **Executor** | `lfx` CLI (Rust/Python) | Local flow execution |
| **Database** | SQLAlchemy (Postgres/SQLite) | Persistence layer |
| **Auth** | JWT + OAuth2 | User authentication |
| **Cloud Bridge** | LangFlow Cloud API | Cloud deployment integration |
| **Observability** | LangSmith, LangFuse, etc | Monitoring integrations |
| **Build System** | Make + npm + Python uv | Coordination script |

---

## 2. Conceitos Centrais

### Flow (Workflow)

Um Flow é o conceito fundamental: um grafo DAG (Directed Acyclic Graph) de componentes conectados.

```json
{
  "id": "design-generator-flow",
  "name": "Design Generator",
  "description": "Generate design components using AI",
  "nodes": [
    {
      "id": "input_node",
      "type": "Input",
      "data": { "text": "design prompt" }
    },
    {
      "id": "llm_node",
      "type": "ChatOpenAI",
      "data": { "model": "gpt-4", "temperature": 0.7 }
    },
    {
      "id": "output_node",
      "type": "Output",
      "data": { "result": "generated design" }
    }
  ],
  "edges": [
    { "source": "input_node", "target": "llm_node" },
    { "source": "llm_node", "target": "output_node" }
  ]
}
```

Flows podem ser:
- **Testados interativamente** no Playground (side-panel)
- **Debugados** com step-by-step execution
- **Compartilhados** via JSON export
- **Deployados** como API endpoints, CLI tools, ou MCP servers

### Component (Node)

Componentes são os blocos de construção reutilizáveis. Cada um:
- Tem inputs tipados (Text, File, Dropdown, etc)
- Executa lógica (Python code)
- Produz outputs tipados
- Pode ter fallbacks/error handling
- Registra no Display (para UI e palette)

#### Exemplo de Custom Component

```python
from lfx.custom import Component
from lfx.io import MessageTextInput, Output

class MyDesignComponent(Component):
    display_name = "My Design Component"
    description = "Custom component para análise de design"
    icon = "palette"
    
    design_prompt = MessageTextInput(
        display_name="Design Prompt",
        info="Descreva o design desejado",
        value=""
    )
    
    def build(self) -> dict:
        # Lógica do componente
        result = f"Design: {self.design_prompt}"
        return {"result": result}
```

### Bundle (Extension)

Bundles são pacotes de componentes que estendem Langflow:

```yaml
name: my-design-bundle
version: 1.0.0
description: Custom design components
lfx:
  compat: ["1"]  # Bundle API version compatibility
components:
  - my_design_component.MyDesignComponent
  - other_component.OtherComponent
```

Bundles oficiais disponíveis:
- **Ollama** - Local LLM inference
- **Confluent/Kafka** - Event streaming
- **ToolGuard** - Security policies
- **Paddle** - Payment processing
- **Bedrock** - AWS AI services
- **Anthropic** - Claude API
- **OpenAI** - GPT models
- **And 100+ more integrations**

---

## 3. Supported Integrations (100+)

### LLM Providers

| Provider | Models | Status |
|----------|--------|--------|
| **OpenAI** | GPT-4, GPT-4V, o1, o1-mini | Native ✅ |
| **Anthropic** | Claude 3, 3.5, 3.7 | Native ✅ |
| **Google** | Gemini, PaLM | Native ✅ |
| **Azure OpenAI** | GPT-4, GPT-4V | Native ✅ |
| **AWS Bedrock** | Claude, Llama, Mixtral | Bundle |
| **Cohere** | Command, Embed | Native ✅ |
| **Hugging Face** | Inference API | Native ✅ |
| **Ollama** | Local models (Llama, Gemma, etc) | Bundle |
| **DeepSeek** | DeepSeek-V3 | Native ✅ |
| **Together AI** | Open models | Native ✅ |
| **Groq** | Fast LLM inference | Native ✅ |
| **vLLM** | Local inference | Native ✅ |
| **MLX** | Apple Silicon models | Native ✅ |
| **And 50+ more** | Mistral, Replicate, etc | Supported |

### Vector Databases & Embeddings

| Service | Use Case | Status |
|---------|----------|--------|
| **Pinecone** | Managed vector DB | Native ✅ |
| **Weaviate** | Self-hosted vector search | Native ✅ |
| **Chroma** | Embedded/local vectors | Native ✅ |
| **Supabase (pgvector)** | PostgreSQL vectors | Native ✅ |
| **Milvus** | Open-source vector DB | Native ✅ |
| **Qdrant** | Vector similarity search | Native ✅ |
| **Elasticsearch** | Full-text + vectors | Native ✅ |
| **OpenSearch** | AWS Elasticsearch | Native ✅ |
| **Faiss** | Meta's vector search | Native ✅ |
| **Langflow Vectorstore** | Built-in | Native ✅ |
| **MongoDB Atlas** | Document + vectors | Native ✅ |
| **Neo4j** | Graph + vectors | Native ✅ |

### Data & API Tools

| Tool | Purpose | Status |
|------|---------|--------|
| **Web Search** | Search engines | Native (Google, DuckDuckGo, Brave) |
| **Web Scraping** | HTML/content extraction | Firecrawl, BeautifulSoup |
| **PDF/Document** | Parsing & extraction | LlamaParse, PyPDF2 |
| **Databases** | SQL/NoSQL queries | PostgreSQL, MongoDB, Elasticsearch |
| **APIs** | HTTP requests | OpenAPI spec generation |
| **Webhooks** | Event listeners | Inbound/outbound webhooks |
| **File Upload** | Document handling | S3, local storage |
| **Chat History** | Conversation memory | Built-in SQLAlchemy stores |

### Observability & Monitoring

| Service | Integration | Status |
|---------|-------------|--------|
| **LangSmith** | Tracing + evals | Native ✅ |
| **LangFuse** | Open-source observability | Native ✅ |
| **Datadog** | Monitoring dashboard | Integration |
| **Sentry** | Error tracking | Integration |
| **New Relic** | APM | Integration |

### Deployment & Hosting

| Platform | Support | Status |
|----------|---------|--------|
| **Docker** | Container support | Native ✅ |
| **Kubernetes** | K8s deployment | Guides available |
| **AWS** | EC2, ECS, Lambda | Deployment guides |
| **Google Cloud** | Compute Engine, Cloud Run | Deployment guides |
| **Azure** | App Service, AKS | Deployment guides |
| **Heroku** | PaaS deployment | Supported |
| **Render** | Easy deployment | Supported |
| **Railway** | Cloud platform | Supported |
| **Fly.io** | Edge deployment | Supported |

---

## 4. REST API Endpoints

### Core Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| **GET** | `/api/flows` | List all flows |
| **POST** | `/api/flows` | Create new flow |
| **GET** | `/api/flows/{id}` | Get flow details |
| **PUT** | `/api/flows/{id}` | Update flow |
| **DELETE** | `/api/flows/{id}` | Delete flow |
| **GET** | `/api/flows/{id}/versions` | Flow version history |
| **GET** | `/api/components` | List available components |
| **POST** | `/api/flows/{id}/run` | Execute flow |
| **GET** | `/api/flows/{id}/logs` | Execution logs |
| **POST** | `/api/flows/{id}/build` | Deploy as API endpoint |
| **GET** | `/api/me` | Current user info |
| **POST** | `/api/login` | Authentication |

### Flow Execution Endpoint (Dynamic)

Flows deployados como APIs criam endpoints dinâmicos:

```bash
# Deploy flow as API
POST /api/flows/{flow_id}/build

# Call the generated endpoint
POST /api/v1/run/{flow_id}
{
  "input": "Design a button component",
  "session_id": "optional-session-id"
}
```

### WebSocket for Real-time Streaming

Flows podem usar WebSocket para streaming:

```javascript
const ws = new WebSocket('ws://localhost:7860/api/ws');
ws.send(JSON.stringify({
  type: 'run_flow',
  flow_id: 'design-generator',
  inputs: { prompt: 'Create a card design' }
}));
ws.onmessage = (event) => console.log(event.data);
```

---

## 5. Python SDK

### Installation

```bash
uv pip install langflow-sdk
# or
pip install langflow-sdk
```

### Basic Usage

```python
from langflow_sdk import Config, LangflowClient

# Configure connection
config = Config(
    host="http://localhost:7860",
    user_id="user_id",
    password="password"
)

# Create client
client = LangflowClient(config=config)

# List flows
flows = client.list_flows()

# Get flow details
flow = client.get_flow("flow_id")

# Run flow
result = client.run_flow(
    flow_name="design-generator",
    input_value="Design a navigation menu"
)
print(result)
```

### Async Flow Execution

```python
import asyncio
from langflow_sdk import LangflowClient

async def run_async():
    async with LangflowClient(config=config) as client:
        result = await client.run_flow_async(
            flow_id="design-generator",
            inputs={"prompt": "Create a form"}
        )
        return result

result = asyncio.run(run_async())
```

### Batch Processing

```python
from langflow_sdk import LangflowClient

client = LangflowClient(config=config)

# Run multiple flows in parallel
prompts = ["Button design", "Card design", "Modal design"]
results = client.batch_run(
    flow_id="design-generator",
    inputs_list=[{"prompt": p} for p in prompts]
)
```

---

## 6. Desktop App & Local Development

### Desktop Installation

**macOS/Windows:** Download from https://www.langflow.org/desktop

- All dependencies included (no Python setup needed)
- Auto-updates
- Native performance
- Local flows + cloud sync (optional)

### Local Development Setup

```bash
# 1. Clone repository
git clone https://github.com/langflow-ai/langflow.git
cd langflow

# 2. Initialize environment
make init

# 3. Option A: Run CLI (all-in-one)
make run_cli
# Langflow at http://localhost:7860

# 4. Option B: Development mode (hot-reload)
# Terminal 1 - Backend
make backend

# Terminal 2 - Frontend
make frontend
```

---

## 7. Deployment Patterns

### As REST API

```bash
# Run Langflow with persistent backend
docker run -d \
  -p 7860:7860 \
  -e LANGFLOW_DATABASE_URL=postgresql://... \
  langflowai/langflow:latest

# Flows automatically available at /api/v1/run/{flow_id}
```

### As MCP Server

Langflow flows podem ser expostos como MCP servers (Model Context Protocol):

```bash
langflow export --flow-id design-generator --format mcp
# Generates MCP server definition
```

Claude ou outros MCP clients podem chamar:

```bash
# Via MCP
mcp install /path/to/langflow-mcp-export.json
```

### As Scheduled Jobs

Usar Always-on agents com Langflow:

```python
# Define background job
flow = client.get_flow("design-consistency-checker")

# Schedule execution
job = client.schedule_flow(
    flow_id=flow.id,
    cron="0 9 * * *",  # Daily at 9 AM
    inputs={"design_system_path": "/path/to/designs"}
)
```

### Containerized Deployment (Docker Compose)

```yaml
version: '3.8'
services:
  langflow:
    image: langflowai/langflow:latest
    ports:
      - "7860:7860"
    environment:
      LANGFLOW_DATABASE_URL: postgresql://user:pass@db:5432/langflow
      LANGFLOW_API_KEY: your-secure-key
    depends_on:
      - db
  
  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: password
      POSTGRES_DB: langflow
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

---

## 8. Relevância para Neuralabs

### Alta Relevância

#### 8.1 Visual Design Workflow Builder

Langflow como plataforma para construir visual workflows de design:

**Use Case:** UI/UX designers criam workflows visuais sem código

```
[Design Prompt] → [Claude LLM] → [Vision Analysis] → [Design Output]
                       ↓
                [Component Gen] → [CSS Output]
```

**Implementação:**
- Custom components para design tokens
- Firecrawl para análise de designs competitors
- Vision model para screenshot analysis
- Export para React/Tailwind

#### 8.2 RAG System for Design Knowledge

Langflow + vector database + LLM para design knowledge base:

```
[Design System Docs] → [Embeddings] → [Vector DB]
                           ↑
                      [Query: "Color for error state?"]
                           ↓
                      [LLM + Context] → [Answer with token]
```

**Components:**
- Document loader (design system PDFs)
- Embeddings generator (Ollama ou OpenAI)
- Vector search (Chroma, Pinecone)
- Context-aware LLM response

#### 8.3 Multi-Agent Design Systems

Langflow's multi-agent orchestration para especialistas de design:

```
[Design Brief] → [Specialist Router]
                      ↓
          ┌───────────┼───────────┐
          ↓           ↓           ↓
      [Color      [Typography  [Layout
       Expert]     Expert]      Expert]
          ↓           ↓           ↓
          └───────────┼───────────┘
                      ↓
              [Final Design Output]
```

Cada agente especializado em seu domínio:
- Cores e paletas
- Tipografia e hierarchy
- Layout e spacing
- Responsividade

#### 8.4 Design Quality Assurance Pipeline

Automated design review flow:

```
[Generated Design] → [Vision Analysis]
                          ↓
         ┌─────────────────┼─────────────────┐
         ↓                 ↓                 ↓
    [Accessibility    [Performance      [Brand
     Checker]          Audit]            Compliance]
         ↓                 ↓                 ↓
         └─────────────────┼─────────────────┘
                      ↓
            [Quality Report + Fixes]
```

### Implementação Estratégica para Neuralabs

**Phase 1 (Q4 2026): Foundation**
- [ ] Deploy Langflow Docker container
- [ ] Create basic design generation flow
- [ ] Connect to local Ollama + Claude API
- [ ] Build vision analysis component

**Phase 2 (Q1 2027): Sophistication**
- [ ] Implement design system RAG layer
- [ ] Multi-agent specialist team
- [ ] Custom design component library
- [ ] Conversation memory (multi-turn refinement)

**Phase 3 (Q2 2027): Production**
- [ ] Deploy as MCP server (Claude integration)
- [ ] Schedule automated design reviews
- [ ] Export flows as APIs for frontend integration
- [ ] Performance monitoring + LangSmith observability

---

## 9. Comparação: Langflow vs Alternativas

### Langflow vs LangChain (Python framework)

| Aspecto | Langflow | LangChain |
|---------|----------|-----------|
| **Interface** | Visual + Code | Code-only |
| **Learning Curve** | Low (visual) | Moderate-High |
| **Debugging** | Step-by-step playground | Print statements |
| **Deployment** | 1-click as API/MCP | Manual setup |
| **Components** | 100+ pre-built | DIY via chains |
| **Team Collaboration** | Easy (visual) | Requires code review |
| **Prototyping Speed** | ⚡⚡ Fast | ⚡ Moderate |

### Langflow vs Make.com / Zapier

| Aspect | Langflow | Make.com |
|--------|----------|---------|
| **Price** | Free (open-source) | $0-500+/month |
| **AI Focus** | ✅ AI-first | ❌ Generic automation |
| **Customization** | ✅ Full code access | ❌ Limited |
| **LLM Support** | 100+ providers | Limited |
| **Deployment** | Self-hosted + cloud | Cloud-only |
| **Data Privacy** | Full control | Vendor-hosted |

### Langflow vs Dify

| Aspect | Langflow | Dify |
|--------|----------|------|
| **Visual Builder** | ✅ Full DAG editor | ✅ Similar |
| **Component Library** | 100+ | 50+ |
| **Code Integration** | ✅ Python components | Limited |
| **LLM Support** | Excellent (100+) | Good (50+) |
| **Open Source** | ✅ MIT | ✅ MIT |
| **Deployment** | Docker, cloud | Docker, cloud |
| **Maturity** | Established | Growing |

### Langflow vs Claude Code (this session)

| Aspect | Langflow | Claude Code |
|--------|----------|-----------|
| **UI** | Visual drag-drop | Terminal/IDE |
| **Target User** | Non-devs + devs | Developers |
| **Workflow Design** | Visual | Code-focused |
| **Debugging** | Interactive UI | Logs + read-eval |
| **Deployment** | API/MCP/CLI | Git push |
| **Customization** | Components | Code |
| **Ideal Use Case** | Business users | Engineers |

---

## 10. Best Practices & Patterns

### Component Design

```python
class DesignGenerator(Component):
    """Generates design components from natural language."""
    
    display_name = "Design Generator"
    description = "Transforms text prompts into design outputs"
    icon = "wand2"  # shadcn icon
    documentation = "https://docs.neuralabs.ai/design-gen"
    
    # Inputs (type-safe)
    prompt = MessageTextInput(
        display_name="Design Prompt",
        info="Describe the design you want to create",
        value="",
        placeholder="e.g., 'A modern card component with shadow'"
    )
    
    style_variant = DropdownInput(
        display_name="Style",
        options=["minimalist", "gradient", "glassmorphic"],
        value="minimalist"
    )
    
    def build(self) -> dict:
        # Call Ollama/Claude locally
        response = llm.generate(
            prompt=f"Design: {self.prompt}",
            style=self.style_variant
        )
        
        return {
            "html": response.html,
            "css": response.css,
            "accessibility": response.a11y_notes
        }
```

### Flow Organization

```
flows/
├── design-generation/
│   ├── basic-component-gen.json
│   ├── advanced-system-gen.json
│   └── a11y-checker.json
├── analysis/
│   ├── design-audit.json
│   ├── performance-review.json
│   └── brand-compliance.json
└── maintenance/
    ├── design-debt-detector.json
    └── component-deprecation-notifier.json
```

### Error Handling in Flows

```python
class SafeDesignComponent(Component):
    def build(self) -> dict:
        try:
            result = self.generate_design()
            return {"success": True, "data": result}
        except Exception as e:
            return {
                "success": False,
                "error": str(e),
                "fallback": self.get_default_design()
            }
```

---

## 11. Recursos e Links

- **Official Website:** https://langflow.org
- **GitHub:** https://github.com/langflow-ai/langflow
- **Documentation:** https://docs.langflow.org
- **API Docs:** https://docs.langflow.org/api
- **Discord Community:** https://discord.gg/EqksyE2EX9
- **YouTube:** https://www.youtube.com/@Langflow
- **Bundles Registry:** https://langflow.org/bundles

---

## 12. Local LLM Integration (Ollama + Langflow)

### Setup

1. **Start Ollama:**
```bash
ollama serve
```

2. **Create Langflow Component:**
```python
class OllamaDesignGen(Component):
    model_name = DropdownInput(
        options=["llama3.2", "gemma4", "qwen3"]
    )
    
    def build(self) -> dict:
        import requests
        response = requests.post(
            "http://localhost:11434/api/generate",
            json={
                "model": self.model_name,
                "prompt": self.design_prompt,
                "stream": False
            }
        )
        return {"response": response.json()["response"]}
```

3. **Use in Flow:**
- Add Ollama component to canvas
- Connect to design flow
- Test in playground
- Deploy as API

---

## 13. Next Steps for Integration

### Immediate (Week 1-2)
- [ ] Install Langflow Desktop or Docker
- [ ] Create first design generation flow
- [ ] Test with local Ollama + Claude
- [ ] Build vision analysis component

### Short-term (Month 1)
- [ ] Design system RAG integration
- [ ] Multi-agent specialist team
- [ ] Custom component library
- [ ] Flow version control + Git integration

### Medium-term (Month 2-3)
- [ ] Deploy as MCP server
- [ ] Langflow + Neuralabs MCP integration
- [ ] Automated design review pipeline
- [ ] Observability setup (LangSmith)

### Long-term (2027)
- [ ] Production-grade design system
- [ ] Team collaboration features
- [ ] Advanced reasoning models
- [ ] Custom model fine-tuning

---

## 14. Developer Environment Commands

```bash
# Development setup
make init              # Install dependencies
make backend           # Run FastAPI server (port 7860)
make frontend          # Run React dev server (port 3000)

# Running
make run_cli           # One-command build + run
make run_clic          # Clean rebuild

# Debugging
make lint              # Check code style
make test              # Run test suite
make test_backend      # Backend tests only
make test_frontend     # Frontend tests (Playwright)

# Building
make build             # Production build
make docker_build      # Docker image build
```

---

**Last Updated:** 2026-09-22  
**Maintainer:** Claude Haiku 4.5  
**Status:** Knowledge base entry - Integration planning  
**Next Review:** When Langflow prototyping begins (Phase 1)


# Ollama Repository - Infrastructure Index

Índice de referência rápida do repositório [ollama/ollama](https://github.com/ollama/ollama).

**Descrição:** Plataforma open-source para rodar modelos de linguagem localmente com suporte multi-platform (macOS, Windows, Linux). REST API, CLI, desktop app, Docker. Backends: GGML (CPU), MLX (Apple Silicon), CUDA (NVIDIA), ROCm (AMD), Vulkan. 100+ integrações com agentes, RAG, IDEs, chat interfaces.

**Source:** https://github.com/ollama/ollama  
**Latest Release:** 2026-09-22 (ativamente mantido, múltiplas releases por semana)  
**Stack:** Go (CLI/API), C/C++ (GGML/MLX backends), CMake build system  
**Contributors:** 2,000+ open-source contributors

---

## 1. Arquitetura Principal

### Componentes Core

```
ollama/
├── server/           # REST API (Gin HTTP server)
│   ├── routes.go     # API endpoints (chat, generate, create, list, etc)
│   ├── sched.go      # Model scheduler + memory management
│   ├── create.go     # Model creation from Modelfile/GGUF/Safetensors
│   ├── images.go     # Vision model support (multimodal)
│   └── cloud_proxy.go # Cloud model proxying (Ollama Cloud)
├── cmd/              # CLI commands (run, create, list, show, delete, etc)
├── llm/              # LLM interface abstraction
│   └── server/       # llama.cpp server integration
├── model/            # Model parsing + rendering
│   └── parsers/      # Model-specific parsers (20+ modelos)
├── mlx/              # MLX engine (Apple Silicon optimization)
├── app/              # Desktop GUI (macOS/Windows/Linux native)
├── types/            # Type definitions (Model, Generation, etc)
├── manifest/         # Model manifest format (layers, metadata)
├── auth/             # Authentication (Ollama Cloud signin)
├── middleware/       # HTTP middleware (logging, auth, CORS)
└── docs/             # OpenAPI + Markdown documentation
```

### Stack Técnico

| Layer | Technology | Propósito |
|-------|-----------|----------|
| **CLI/API** | Go + Gin Framework | HTTP REST server, command-line interface |
| **Inference** | llama.cpp (GGML) | Quantized model inference, memory optimization |
| **Acceleration (Apple)** | MLX Framework | Metal GPU inference on Apple Silicon |
| **GPU Backends** | CUDA, ROCm, Vulkan | NVIDIA, AMD, Intel GPU support |
| **Model Format** | GGUF, Safetensors | Binary model files, metadata |
| **Build System** | CMake + Ninja | Cross-platform native compilation |
| **Desktop App** | Electron-like (native) | macOS, Windows, Linux GUI |
| **Cloud Bridge** | Ollama.com proxy | Access to cloud-hosted models |

---

## 2. Modelos Suportados (20+ Arquitecturas)

### Modelos com Parsers Dedicados

| Modelo | Capabilities | Use Case | Tamanho Típico |
|--------|-------------|----------|---|
| **Llama 3.2** | Text + Vision | General purpose LLM | 7B-405B |
| **Gemma 4** | Text + Vision + Thinking | Google's efficient LLM | 2B-27B |
| **DeepSeek 3** | Text + Tool use | Chinese reasoning | 236B |
| **Qwen 3** | Text + Vision + Reasoning | Alibaba's multimodal | 1B-110B |
| **Qwen 3.5 Turbo** | Optimized text generation | Speed-focused | 7B-72B |
| **Qwen 3 Coder** | Code generation + reasoning | Programming | 7B-32B |
| **Qwen 3 VL** | Vision-Language (thinking) | Advanced multimodal | 7B-32B |
| **Cohere** | Text generation | Corporate APIs | Various |
| **Ministral** | Efficient inference | Lightweight | 3B-8B |
| **GLM-4-6** | Vision-Language | Chinese LLM | Multiple sizes |
| **OLMo 3** | Thinking + reasoning | Open language model | Various |
| **OLMo 3 Think** | Extended reasoning traces | Deep reasoning | Various |
| **Nemotron 3 Nano** | MLX vision support | Lightweight vision | Nano |
| **Glimmer** | Vision models | Image understanding | Various |
| **Laguna** | Specialized | Domain-specific | Various |
| **LFM-2** | Specialized | Fine-tuned | Various |
| **GLM-OCR** | OCR capabilities | Text extraction | Various |
| **Cogito** | Reasoning | Logic/thinking | Various |
| **FunctionGemma** | Function calling | Tool use | Various |

### Modelo Thinking (Extended Reasoning)

Ollama suporta "thinking tokens" nativamente:
- Modelos podem expor raciocínio interno (hidden tokens)
- API `GET /api/generate` com `thinking_level` parameter
- Suporta níveis: "disabled" (default), "soft", "medium", "hard"
- Útil para complex reasoning, multi-step planning

### Custom Models via Modelfile

```dockerfile
# Exemplar: Custom model com parâmetros ajustados
FROM llama3.2
PARAMETER temperature 0.7
PARAMETER top_k 40
PARAMETER top_p 0.9
PARAMETER num_ctx 4096
TEMPLATE """{{ .System }}{{ .Prompt }}{{ .Response }}"""
SYSTEM "You are a code assistant."
```

---

## 3. API REST Endpoints (OpenAPI)

### Core Endpoints

| Method | Endpoint | Propósito |
|--------|----------|----------|
| **POST** | `/api/chat` | Chat inference (streaming/non-streaming) |
| **POST** | `/api/generate` | Raw generation (legacy, but powerful) |
| **POST** | `/api/embed` | Embeddings para RAG |
| **POST** | `/api/create` | Create custom model from Modelfile |
| **GET** | `/api/tags` | List all local models |
| **GET** | `/api/show` | Show model details (config, template, size) |
| **DELETE** | `/api/delete` | Remove model from disk |
| **POST** | `/api/pull` | Download model from registry |
| **POST** | `/api/push` | Upload model to registry |
| **POST** | `/api/copy` | Copy/rename model |
| **GET** | `/api/ps` | List running models (memory usage) |
| **POST** | `/api/vision` | Multimodal vision endpoint |

### Chat Endpoint (exemplo)

```bash
curl http://localhost:11434/api/chat \
  -d '{
    "model": "llama3.2",
    "messages": [
      {"role": "user", "content": "Hello"}
    ],
    "stream": true,
    "thinking": {"enabled": true, "level": "medium"}
  }'
```

### Generate Endpoint (low-level)

```bash
curl http://localhost:11434/api/generate \
  -d '{
    "model": "llama3.2",
    "prompt": "Explain quantum computing",
    "stream": false,
    "images": ["base64_encoded_image"],
    "template": "{{ .Prompt }}"
  }'
```

---

## 4. Integrações (100+ Ecossistema)

### Chat Interfaces (Web/Desktop)

**Web Self-Hosted:**
- Open WebUI (extensible)
- LibreChat (multi-provider)
- Lobe Chat (modern + plugins)
- NextChat (cross-platform)
- Perplexica (search-like)
- AnythingLLM (all-in-one)

**Desktop:**
- Continue (IDE assistant)
- Cline (VS Code multi-file)
- Dify.AI (LLM app platform)
- Cherry Studio (multi-provider desktop)
- Witsy (Mac/Windows/Linux)
- Ollama App (native cross-platform)

### Code Editors & Development

- **VS Code:** AI Toolkit (Microsoft official), Continue, Cline
- **Cursor:** Native Ollama support
- **IDEs:** JetBrains via plugins, Qt Creator via QodeAssist
- **Terminal:** VT Code (Rust), Emacs (ellama/gptel), Sublime Text
- **Web editors:** Obsidian, Vim (twinny)

### Frameworks & Libraries

**LLM Orchestration:**
- LangChain (Python/JS)
- LlamaIndex (data framework)
- Semantic Kernel (Microsoft)
- LiteLLM (unified 100+ providers)
- Haystack (AI pipelines)

**Agent Frameworks:**
- crewAI (multi-agent teams)
- AutoGPT (autonomous agents)
- LangChain Agents (tool routing)
- Semantic Kernel Agents
- Cheshire Cat (conversational AI)

**RAG & Knowledge Bases:**
- RAGFlow (document understanding)
- R2R (open-source RAG engine)
- MaxKB (ready-to-use chatbot)
- Chipper (Haystack + RAG)
- Archyve (document library)

**SDKs & Language Support:**
- Python: `ollama` package (official)
- JavaScript/Node: `ollama-js` (official)
- Go: native (embedded)
- Java: LangChain4j, Ollama4j
- Rust: ollama-rs
- C#/.NET: OllamaSharp, LangChain.NET
- Ruby, Dart, Swift, R, Julia, Elixir

### Messaging & Bots

- Discord bot
- Telegram bot
- Slack integration
- WhatsApp (via OpenClaw)
- Multi-platform (LangBot, AstrBot)

---

## 5. Backends & Performance

### Backend Selection

| Backend | Hardware | Performance | Memory | Qualidade |
|---------|----------|-------------|--------|-----------|
| **GGML (CPU)** | Intel/AMD CPU | Slow (reference) | Low | Baseline |
| **MLX (Apple)** | Apple Silicon (Metal) | Fast (⚡) | Optimized | Best for macOS |
| **CUDA** | NVIDIA GPU | Very Fast (⚡⚡) | High (VRAM) | Production |
| **ROCm** | AMD GPU | Very Fast | High (VRAM) | AMD alternative |
| **Vulkan** | Intel/AMD/Mobile | Fast | Medium | Cross-platform GPU |

### Build Options (CMake)

```bash
# macOS (Metal + MLX by default)
cmake -B build .

# CUDA (NVIDIA GPU)
cmake -B build . -DOLLAMA_LLAMA_BACKENDS=cuda_v13

# ROCm (AMD GPU)
cmake -B build . -DOLLAMA_LLAMA_BACKENDS=rocm_v7_2

# Vulkan (cross-GPU)
cmake -B build . -DOLLAMA_LLAMA_BACKENDS=vulkan

# Multiple backends
cmake -B build . -DOLLAMA_LLAMA_BACKENDS="cuda_v13;rocm_v7_2"
```

---

## 6. Docker & Cloud Deployment

### Official Docker Image

```bash
docker run -d -v ollama:/root/.ollama -p 11434:11434 ollama/ollama:latest
docker exec -it <container> ollama run llama3.2
```

### Docker Compose Example

```yaml
version: '3'
services:
  ollama:
    image: ollama/ollama:latest
    container_name: ollama
    ports:
      - "11434:11434"
    volumes:
      - ollama:/root/.ollama
    environment:
      OLLAMA_MODELS: /root/.ollama/models
  
  open-webui:
    image: ghcr.io/open-webui/open-webui:latest
    ports:
      - "3000:8080"
    depends_on:
      - ollama
    environment:
      OLLAMA_BASE_URL: http://ollama:11434
```

---

## 7. Relevância para Neuralabs

### Alta Relevância

#### 7.1 Local LLM Backbone (Design Agent Inference)

Ollama pode substituir APIs de LLM pagas para:
- Local design generation (sem custo de API)
- Private data handling (designs nunca deixam máquina local)
- Thinking models para reasoning sobre design decisions
- Vision models para design analysis + feedback

**Implementação:**
```python
from ollama import chat

response = chat(
  model='llama3.2:vision',
  messages=[{
    'role': 'user',
    'content': 'Analyze this design screenshot for accessibility issues',
    'images': ['base64_design_image']
  }]
)
```

#### 7.2 RAG Integration for Design System Knowledge

Ollama + embeddings para RAG:
- Index design system docs, components, patterns
- Natural language queries sobre design tokens
- Context-aware design suggestions

**Pattern:**
```python
# 1. Generate embeddings via Ollama
response = ollama.embed(model='nomic-embed-text', input='color palette')

# 2. Vector search against design system docs
# 3. LLM augmented with design context
```

#### 7.3 Agentes de Design com Extended Reasoning

Ollama thinking models para:
- Multi-step design decisions
- Complex constraint solving (responsive, accessibility, performance)
- Design validation reasoning

**Pattern:**
```bash
ollama run qwen3 --thinking hard
# Agent thinks through design decisions step-by-step
```

#### 7.4 Vision Models para Design Analysis

Multimodal capabilities:
- Screenshot analysis (design review automation)
- Component recognition
- Visual regression detection
- Accessibility audit (contrast, text size, etc)

### Relevância Moderada

#### 7.5 Always-on Background Agents

Ollama como inference backend para:
- Design consistency checker (scheduled)
- Component deprecation monitor
- Design drift detector

#### 7.6 Developer Workflow (Claude Code Integration)

Ollama launch commands para:
```bash
ollama launch claude  # Integra Ollama com Claude Code
ollama launch copilot # GitHub Copilot alternative
```

### Implementação Estratégica

**Phase 1 (Q4 2026):** Local Ollama server com Llama 3.2 Vision
- Design agent queries Ollama localmente
- RAG layer indexa design system
- No API costs, full privacy

**Phase 2 (Q1 2027):** Extended reasoning for design validation
- Qwen 3 thinking models para architectural decisions
- Multi-step design refinement loops

**Phase 3 (Q2 2027):** Always-on monitoring
- Background Ollama agents checking design consistency
- Proactive alerts via Slack/Discord

---

## 8. Padrões de Uso em Codebase

### CLI Commands

```bash
# Run interactive chat
ollama run llama3.2

# Chat with vision model + image
ollama run llama3.2:vision
# Load image: /path/to/image.png

# Create custom model
ollama create mymodel -f ./Modelfile

# List all models
ollama list

# Show model details
ollama show llama3.2 --modelfile

# Delete model
ollama delete llama3.2

# Pull from registry
ollama pull qwen3

# Launch IDE integration
ollama launch claude-code
```

### Python SDK

```python
from ollama import chat, embed
from ollama import AsyncClient

# Sync chat
response = chat(model='llama3.2', messages=[
  {'role': 'user', 'content': 'Design a button component'}
])
print(response.message.content)

# Async for high-concurrency
client = AsyncClient()
response = await client.chat(
  model='llama3.2:vision',
  messages=[...],
  stream=True
)

# Embeddings (RAG)
embeddings = embed(model='nomic-embed-text', input=[
  'design system', 'color token', 'component library'
])
```

### JavaScript SDK

```javascript
import ollama from 'ollama';

// Chat
const response = await ollama.chat({
  model: 'llama3.2',
  messages: [{ role: 'user', content: 'Explain design tokens' }]
});

// Vision
const designResponse = await ollama.chat({
  model: 'llama3.2:vision',
  messages: [
    {
      role: 'user',
      content: 'Analyze this design',
      images: ['base64_image_data']
    }
  ]
});
```

### Server Integration (Gin framework)

```go
// Ollama server uses Gin for HTTP routing
// Similar pattern for custom endpoints:

router.POST("/api/design/generate", func(c *gin.Context) {
  // Call local Ollama at http://localhost:11434
  client := ollama.NewClient()
  response, _ := client.Chat(c.Request.Context(), &ollama.ChatRequest{
    Model: "llama3.2:vision",
    Messages: messages,
  })
  c.JSON(200, response)
})
```

---

## 9. Comparação: Ollama vs Alternativas

### Ollama vs Hosted APIs

| Critério | Ollama (Local) | OpenAI API | Anthropic Claude | Google Gemini |
|----------|---|---|---|---|
| **Custo** | $0 (hardware) | $0.50-20/1M tokens | $0.80-30/1M tokens | $0.05-50/1M tokens |
| **Privacy** | ✅ Local | ❌ Cloud | ❌ Cloud | ❌ Cloud |
| **Latência** | ~500ms-2s | 200-500ms | 200-500ms | 200-500ms |
| **Control** | ✅ Full | ❌ Limited | ❌ Limited | ❌ Limited |
| **Modelos** | 20+ OSS | Proprietary | Proprietary | Proprietary |
| **Vision** | ✅ Llama, Qwen | ✅ GPT-4V | ✅ Claude 3.5 | ✅ Gemini Pro |
| **Reasoning** | ✅ Thinking | ✅ o1 | ❌ No | ❌ No |
| **Setup** | 5 min | Instant | Instant | Instant |

### Ollama vs LlamaCPP (CLI)

- Ollama = full platform (CLI + API + desktop)
- llama.cpp = pure inference engine (lower level)
- Ollama builds on top of llama.cpp

### Ollama vs Hugging Face (local inference)

- Ollama = managed model registry + unified API
- HF = raw model files (more flexible, more setup)
- Ollama simpler for beginners

---

## 10. Instalação & Quick Start

### macOS

```bash
# Install
curl -fsSL https://ollama.com/install.sh | sh

# Run server
ollama serve

# In another terminal
ollama run llama3.2
```

### Linux

```bash
curl -fsSL https://ollama.com/install.sh | sh
ollama serve
```

### Windows

```powershell
irm https://ollama.com/install.ps1 | iex
```

### Docker

```bash
docker run -it -v ollama:/root/.ollama ollama/ollama
```

---

## 11. Configuração Avançada

### Environment Variables

```bash
# Model storage directory
export OLLAMA_MODELS=/custom/path

# Server listen address
export OLLAMA_HOST=0.0.0.0:11434

# Number of parallel loads
export OLLAMA_NUM_PARALLEL=4

# GPU backend
export OLLAMA_GPU=true  # auto-detect
export OLLAMA_CUDA_COMPUTE_CAPABILITY=80  # NVIDIA A100

# Experiment flags
export OLLAMA_EXPERIMENT=client2  # enable experimental features

# Security
export OLLAMA_LLM_LIBRARY=/path/to/libllama.so
```

### Model Scheduling (sched.go)

Ollama gerencia memory automaticamente:
- Unload modelos quando GPU memory necessária
- Keep-alive timeout (default: 5 minutos)
- Concurrent model loading limits
- Request queuing + priority scheduling

---

## 12. Recursos e Links

- **Official:** https://ollama.com
- **Registry:** https://ollama.com/library (100+ curated models)
- **Docs:** https://docs.ollama.com
- **API Reference:** https://docs.ollama.com/api
- **GitHub:** https://github.com/ollama/ollama
- **Discord:** https://discord.gg/ollama
- **Community Integrations:** Listed in README (~250+ projects)

---

## 13. Próximos Passos para Neuralabs Integration

### Curto Prazo (2-4 weeks)

- [ ] Deploy Ollama server (Docker ou binary)
- [ ] Setup Llama 3.2 Vision model (7B-13B size recomendado)
- [ ] Create OpenDesign daemon → Ollama bridge
- [ ] Build eval suite para design generation quality

### Médio Prazo (1-2 months)

- [ ] RAG layer: indexar design system com Ollama embeddings
- [ ] Implement Ollama vision endpoint para design review automation
- [ ] Extended reasoning: usar Qwen 3 thinking models
- [ ] Multi-agent design team (crewAI + Ollama)

### Longo Prazo (Q2+ 2027)

- [ ] Always-on design monitoring agents (APScheduler + Ollama)
- [ ] Custom Modelfiles para design-specific fine-tuning
- [ ] Community model registry (similar ollama.com/library)
- [ ] Benchmark Ollama vs cloud APIs (cost + quality)

---

**Last Updated:** 2026-09-22  
**Maintainer:** Claude Haiku 4.5  
**Status:** Knowledge base entry - Active integration planning  
**Next Review:** When Ollama integration begins (Phase 1)


# Matt Pocock Skills Repository - Agent Skill Library Index

Índice de referência rápida do repositório [mattpocock/skills](https://github.com/mattpocock/skills).

**Descrição:** Coleção curada de skills (prompts + workflows) para coding agents (Claude Code, Codex, etc). Desenvolvidas por Matt Pocock baseado em decades de engenharia prática. 25+ skills focadas em resolver falhas comuns de agentes: misalignment, verbosidade, bugs. Composable, adaptável, open-source.

**Source:** https://github.com/mattpocock/skills  
**Latest Update:** 2026-09-22 (ativo, múltiplas atualizações por semana)  
**Philosophy:** Small, easy to adapt, composable. Work with any model. Not dogmatic.  
**Installation:** Claude Code plugin (managed) OR `npx skills@latest add mattpocock/skills` (editable)  
**Newsletter:** ~60,000+ developers subscribed to updates  

---

## 1. Problemas que These Skills Resolvem

### Problem #1: The Agent Didn't Do What I Want (Misalignment)

**Root Cause:** Communication gap entre o usuário e o agente.

**Solutions:**
- **`/grill-me`** - Relentless interview para sharpen planos/designs
- **`/grill-with-docs`** - Grilling + domain modeling + ADR updates

**Impact:** Alinha expectativas ANTES de começar o trabalho. Economiza 10x em rework.

### Problem #2: The Agent Is Way Too Verbose

**Root Cause:** Agentes não conhecem a linguagem do projeto; precisam de 20 palavras quando 1 faria.

**Solution:** `CONTEXT.md` - documento compartilhado de linguagem ubíqua

**Example:**
- BEFORE: "There's a problem when a lesson inside a section of a course is made 'real'"
- AFTER: "There's a problem with the materialization cascade"

**Impact:** Reduz tokens + verbosidade. Melhor navegação de codebase.

### Problem #3: The Code Doesn't Work

**Root Cause:** Sem feedback em loop, agentes voam blind.

**Solutions:**
- **`/tdd`** - Test-driven development com red-green-refactor
- **`/diagnosing-bugs`** - Systematic bug diagnosis loop
- **`/code-review`** - Two-axis review (Standards + Spec)

**Impact:** Feedback loop curto = melhor código.

---

## 2. Estrutura de Skills

### Anatomy of a Skill

```markdown
---
name: skill-name
description: What this skill does
disable-model-invocation: true  # User-only or model-callable
---

# Skill Documentation

Instructions for the agent on how to execute this skill.
```

### Categorias Principais

```
skills/
├── engineering/          # Code work (18+ skills)
│   ├── grill-with-docs/
│   ├── code-review/
│   ├── tdd/
│   ├── implement/
│   ├── diagnosing-bugs/
│   ├── triage/
│   ├── to-spec/
│   ├── to-tickets/
│   ├── wayfinder/
│   └── ...
├── productivity/         # General work (8+ skills)
│   ├── grill-me/
│   ├── grilling/
│   ├── writing-for-agents/
│   ├── handoff/
│   ├── teach/
│   └── ...
├── in-progress/         # Experimental (4+ skills)
│   ├── retro/
│   ├── loop-me/
│   └── ...
└── deprecated/          # Legacy skills
```

---

## 3. Engineering Skills (Production-Grade)

### User-Invoked Skills

#### 3.1 `/grill-with-docs`

**Purpose:** Grilling session que constrói o domain model do projeto simultaneamente.

**Workflow:**
1. Ask deep questions sobre o que você está construindo
2. Capture respostas no `CONTEXT.md` (linguagem ubíqua)
3. Update ADRs (Architecture Decision Records) inline
4. Sharpen terminology acrossbase

**Output:**
- Sharpened plan
- Updated CONTEXT.md
- Updated ADRs
- Shared language established

**Use:** Executar SEMPRE antes de trabalho significativo.

#### 3.2 `/triage`

**Purpose:** Move issues através de state machine de triagem.

**States:**
- `triaged` - Issue foi triaged e classificado
- `blocked` - Waiting on dependency
- `ready` - Ready to implement
- `in-progress` - Being worked on
- `closed` - Done

**Features:**
- Automated label application
- Blocking edge management
- Status transitions via issue tracker

#### 3.3 `/to-spec`

**Purpose:** Turn conversation into formal spec + publish para issue tracker.

**Process:**
1. Capture current conversation
2. Structure como spec (goal, acceptance criteria, non-goals)
3. Publish to GitHub/Linear issue

#### 3.4 `/to-tickets`

**Purpose:** Break plan/spec em tracer-bullet tickets com blocking edges.

**Features:**
- Tracer bullets (vertical slices)
- Blocking edge declarations
- Native issue tracker integration (GitHub, Linear, local files)

#### 3.5 `/implement`

**Purpose:** Build work described by spec/tickets com quality gates.

**Workflow:**
1. Read spec + ticket list
2. TDD at pre-agreed seams (drive `/tdd`)
3. Code review before commit (drive `/code-review`)
4. Commit with traceability

#### 3.6 `/wayfinder`

**Purpose:** Plan massive work (multi-session) como shared map de decision tickets.

**Workflow:**
1. Break into decision points
2. Resolve one at a time
3. Build shared map on issue tracker
4. Clear path emerges as decisions resolve

**Use:** For 2+ week projects or high uncertainty.

#### 3.7 `/setup-matt-pocock-skills`

**Purpose:** Configure repo para engineering skills.

**Setup:**
- Which issue tracker (GitHub, Linear, local files)?
- What triage labels?
- Where to save docs?

**Creates:**
- `docs/agents/issue-tracker.md`
- `CONTEXT.md` template
- ADR template

**Run Once Per Repo.**

#### 3.8 `/ask-matt`

**Purpose:** Router skill - which skill fits your situation?

**Use:** When you're not sure which skill to pick.

### Model-Invoked Skills

#### 3.9 `/prototype`

**Purpose:** Build throwaway prototype to answer design question.

**Output Options:**
- Single shareable HTML file (state + logic)
- Multiple toggleable UI variations

**Use:** Early-stage design validation without full implementation.

#### 3.10 `/diagnosing-bugs`

**Purpose:** Systematic bug diagnosis loop (especially hard bugs + perf regressions).

**Loop:**
1. Build feedback loop (goes red on bug)
2. Minimize repro
3. Hypothesize root cause
4. Instrument code
5. Fix bug
6. Regression test

#### 3.11 `/research`

**Purpose:** Investigate question against high-trust primary sources.

**Output:**
- Cited Markdown file in repo
- Background agent (doesn't block main flow)

**Use:** When you need facts, not opinions.

#### 3.12 `/tdd`

**Purpose:** Test-driven development with red-green-refactor loop.

**Workflow:**
1. RED: Write failing test
2. GREEN: Minimal code to pass
3. REFACTOR: Clean up
4. Repeat

**Use:** Building features or fixing bugs (vertical slices).

#### 3.13 `/domain-modeling`

**Purpose:** Actively build + sharpen domain model by challenging terms + scenarios.

**Activities:**
- Challenge terminology
- Stress-test with scenarios
- Update CONTEXT.md inline
- Update ADRs

#### 3.14 `/codebase-design`

**Purpose:** Shared discipline for designing deep modules.

**Principles:**
- Small interfaces
- Clean seams
- Testable through the interface
- Explicit dependencies

#### 3.15 `/code-review`

**Purpose:** Two-axis review of diff since fixed point.

**Axes:**
1. **Standards:** Does it follow repo's coding standards? + Fowler smell baseline
2. **Spec:** Does it faithfully implement the originating issue/spec?

**Execution:** Parallel sub-agents (don't pollute each other's context)

**Smells Detected:**
- Mysterious Name
- Duplicated Code
- Feature Envy
- Data Clumps
- Primitive Obsession
- Repeated Switches
- (And more classic code smells from Refactoring book)

#### 3.16 `/resolving-merge-conflicts`

**Purpose:** Work through merge/rebase conflict hunk-by-hunk.

**Approach:**
- Resolve by intent traced to each side's primary source
- Never `--abort`
- Finish the operation

#### 3.17 `/wizard`

**Purpose:** Generate interactive bash wizard for human-only steps.

**Use Cases:**
- Infrastructure provisioning
- Credential/CI secret setup
- Third-party dashboard navigation
- One-off migrations/cutover

**Output:** Interactive bash script

---

## 4. Productivity Skills (General)

### 4.1 `/grill-me`

**Purpose:** Relentless interview to sharpen plan or design.

**Output:**
- Sharpened thinking
- Clearer direction
- Anticipate issues

**Use:** Before making ANY change (product, not just code).

### 4.2 `/grilling`

**Purpose:** Similar to `/grill-me` but callable by model.

### 4.3 `/writing-for-agents`

**Purpose:** Write instructions that agents understand.

**Techniques:**
- Explicit over implicit
- Examples over abstractions
- Action-oriented language

### 4.4 `/handoff`

**Purpose:** Prepare work for handoff to another agent or human.

**Contents:**
- Current state summary
- Next steps clearly defined
- Context preserved

### 4.5 `/teach`

**Purpose:** Teach something to the agent (skill, domain knowledge, coding pattern).

**Output:**
- Updated CONTEXT.md or code comments
- Agent has new knowledge for future sessions

### 4.6 `/to-questionnaire`

**Purpose:** Convert topic into questionnaire (for user research, requirements gathering).

---

## 5. In-Progress & Experimental Skills

### 5.1 `/retro`

**Purpose:** Retrospective on agent's work (what went well, what didn't).

**Status:** Experimental (being refined)

### 5.2 `/loop-me`

**Purpose:** Setup automated loop for repetitive work.

**Status:** In-progress

---

## 6. Installation & Usage

### Option 1: Claude Code Plugin (Managed, Read-Only)

```bash
claude plugins install mattpocock-skills
```

Or from Claude Code session:
```
/plugin install mattpocock-skills
```

**Pros:**
- Updates arrive automatically
- Always latest version
- No fork management

**Cons:**
- Can't customize
- Read-only

### Option 2: Editable Installation (Fork + Hack)

```bash
npx skills@latest add mattpocock/skills
```

**Process:**
1. Choose which skills to install
2. Make sure `setup-matt-pocock-skills` is included
3. Skills copied into your repo (`.claude/skills/` or equivalent)
4. Run `/setup-matt-pocock-skills` once per repo

**Pros:**
- Full control
- Customize for your workflow
- No auto-updates (you pull when ready)

**Cons:**
- Manual updates needed
- Maintenance burden

### Option 3: Tinkerers (Both)

Install both:
1. Managed plugin (reference)
2. Editable copies (customize)

Then choose which to use per skill.

---

## 7. Getting Started Workflow

### First Time Setup

```bash
# 1. Install skills
npx skills@latest add mattpocock/skills

# 2. Run setup (once per repo)
/setup-matt-pocock-skills
```

### Typical Workflow

**Starting work:**
```
/grill-with-docs
→ Sharpen requirement
→ Update CONTEXT.md + ADRs
```

**Planning:**
```
/to-spec
→ Create formal spec
→ /to-tickets
→ Break into tickets with blocking edges
```

**Implementing:**
```
/implement
→ Runs /tdd at seams
→ Runs /code-review before commit
→ Closes out ticket
```

**Quality:**
```
/code-review [since main]
→ Standards axis (code smells)
→ Spec axis (does it match requirement?)
```

**Hard bugs:**
```
/diagnosing-bugs
→ Minimize repro
→ Hypothesize
→ Fix + regression test
```

---

## 8. Relevância para Neuralabs

### Alta Relevância

#### 8.1 Design Skills Adaptation

Adaptar `grill-with-docs` e `code-review` para design workflows:

```
/grill-design
→ Interview sobre design requirements
→ Update DESIGN_CONTEXT.md (cores, tipografia, spacing patterns)
→ Update design ADRs (decisões de design ratificadas)
```

#### 8.2 Component Library Quality Gates

Usar `/code-review` pattern para design components:

**Two-Axis Review:**
1. **Design Standards:** Segue design system guidelines? Accessibility compliant?
2. **Spec:** Faithfully implements the component spec?

#### 8.3 Design Workflow Scaffolding

Skills como `/tdd`, `/prototype`, `/implement` adaptadas para design:

- `/design-prototype` - Throwaway prototype para answer design Q
- `/design-tdd` - Component-driven design (render → refine → finalize)
- `/design-implement` - Build component with quality gates

#### 8.4 Documentation + Knowledge Building

`/grill-with-docs` + `CONTEXT.md` para design:

- Shared design language (color taxonomy, naming conventions)
- Architecture decision records para design choices
- Domain modeling para design patterns

### Implementação para Neuralabs

**Phase 1 (Q4 2026):**
- [ ] Adapt `/grill-me` → `/grill-design`
- [ ] Adapt `/code-review` → `/design-review` (standards + spec)
- [ ] Create `DESIGN_CONTEXT.md` template
- [ ] Design ADR template

**Phase 2 (Q1 2027):**
- [ ] Adapt `/tdd` → `/design-tdd` (vertical slices)
- [ ] Adapt `/prototype` → `/design-prototype`
- [ ] Implement `/design-review` in design workflows

**Phase 3 (Q2 2027):**
- [ ] Full integration with Langflow
- [ ] Collaborative design skill workflows
- [ ] Community skill sharing

---

## 9. Skill Development Patterns

### Creating a Custom Skill

```yaml
---
name: my-design-skill
description: What this skill does for design work
disable-model-invocation: true  # Or remove for model-invocation
---

# My Design Skill

## Overview
What problem does this solve?

## Workflow

### Step 1: [Action]
Detailed instructions for agent.

### Step 2: [Action]
More details.

## Output
What will be produced?

## Edge Cases
What could go wrong?
```

### Best Practices for Skills

1. **Isolation:** Each skill solves ONE problem
2. **Composability:** Skills work together (output of one is input to another)
3. **Clarity:** Instructions assume no context (agent-agnostic)
4. **Feedback:** Build in explicit feedback loops (tests, reviews)
5. **Testability:** Skills are testable independently

### Skill Organization

```
my-design-skills/
├── README.md
├── productivity/
│   ├── grill-design/
│   │   ├── SKILL.md
│   │   └── examples/
│   └── ...
├── engineering/
│   ├── design-review/
│   │   ├── SKILL.md
│   │   └── examples/
│   ├── design-tdd/
│   │   ├── SKILL.md
│   │   └── examples/
│   └── ...
└── templates/
    ├── DESIGN_CONTEXT.md
    └── design-adr.md
```

---

## 10. Philosophy Behind the Skills

### No Dogma

> "These skills are designed to be small, easy to adapt, and composable. They work with any model. They're based on decades of engineering experience. Hack around with them. Make them your own. Enjoy."

Key principles:
- Not prescriptive (adapt to YOUR workflow)
- Not opinionated (work with any tool)
- Not comprehensive (pick what you need)
- Based on decades of real engineering (not theory)

### Decades of Experience

Matt Pocock's background:
- TypeScript deep expertise
- Course creation (Total TypeScript)
- Large codebase maintenance
- Team scaling
- Open-source community

This shapes skills toward:
- Clear communication (avoiding misalignment)
- Code quality (without heavy process)
- Practical patterns (not idealistic)
- Composability (not monolithic workflows)

---

## 11. Comparison: Matt's Skills vs Other Approaches

### vs Process-Oriented Tools (GSD, BMAD, Spec-Kit)

| Aspect | Matt's Skills | Process-Oriented |
|--------|---------------|------------------|
| **Control** | User stays in control | Process owns flow |
| **Bugs** | Easy to debug | Hard to fix process bugs |
| **Flexibility** | Highly adaptable | Rigid process |
| **Learning Curve** | Low (pick what you need) | High (full system) |
| **Composability** | Skills combine freely | Monolithic workflows |

### vs Raw Prompting

| Aspect | Matt's Skills | Raw Prompts |
|--------|---------------|-----------|
| **Consistency** | Reproducible | Hit-or-miss |
| **Quality Gates** | Built-in (reviews, TDD) | Manual |
| **Knowledge** | Domain modeling (CONTEXT.md) | Inline in prompt |
| **Sharing** | Easy to share/install | Hard to version |

### vs LangFlow Workflows

| Aspect | Matt's Skills | LangFlow |
|--------|--------------|----------|
| **Visual** | Text-based | Drag-drop UI |
| **Learning Curve** | Low (Markdown) | Low (visual) |
| **Model-Agnostic** | ✅ Works with any | ✅ Works with any |
| **Customization** | Code editing | Visual + code |
| **Deployment** | Git + natural execution | Cloud + APIs |
| **Ideal User** | Code-focused devs | Non-technical users |

---

## 12. Resources & Community

- **GitHub:** https://github.com/mattpocock/skills
- **Newsletter:** https://www.aihero.dev/s/skills-newsletter (~60,000 subscribers)
- **Ask Matt:** Twitter @mattpocock_
- **Discussions:** GitHub Discussions in repo
- **Examples:** Linked examples in each skill

---

## 13. Próximos Passos para Neuralabs

### Immediate (1-2 weeks)
- [ ] Install Matt's skills locally
- [ ] Run `/grill-with-docs` on a design feature
- [ ] Update CONTEXT.md with design language
- [ ] Map design-specific ADRs

### Short-term (1 month)
- [ ] Adapt `/code-review` → `/design-review`
- [ ] Create DESIGN_CONTEXT.md template
- [ ] Test `/design-review` on component PR
- [ ] Document design standards for review

### Medium-term (2-3 months)
- [ ] Create `grill-design` skill
- [ ] Adapt `/prototype` → `/design-prototype`
- [ ] Full workflow integration (design-tdd + design-review)
- [ ] Share as community skill bundle

### Long-term (2027)
- [ ] Publish Neuralabs design skills on skills.sh
- [ ] Community contributions + forks
- [ ] Best practices guide (design + agents)
- [ ] Integration with Langflow

---

**Last Updated:** 2026-09-22  
**Maintainer:** Claude Haiku 4.5  
**Status:** Knowledge base entry - Framework reference  
**Next Review:** After adapting skills for Neuralabs workflows  


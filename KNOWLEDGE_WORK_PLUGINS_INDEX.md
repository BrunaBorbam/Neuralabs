# Knowledge Work Plugins Index

Anthropic's official plugin marketplace for Claude Cowork and Claude Code. 18 plugins (11 core + 5 partner-built + 2 infrastructure) that turn Claude into a specialist for 20+ roles and workflows.

**Repository:** https://github.com/anthropics/knowledge-work-plugins  
**Version:** As of Sep 2024  
**License:** Apache 2.0

---

## Architecture Overview

Every plugin follows the same structure:

```
plugin-name/
├── .claude-plugin/plugin.json    # Metadata: name, version, description
├── .mcp.json                     # MCP server connections (Figma, Slack, Linear, etc)
├── README.md                     # Plugin overview, commands, example workflows
├── CONNECTORS.md                 # Which tools are connected, how to configure
├── skills/                       # Domain knowledge (auto-triggered)
│   ├── skill-name/SKILL.md       # Skill definition with usage patterns
│   └── ...
└── commands/                     # Slash commands (user-triggered)
    └── [optional; many use skills]
```

**Key Design Pattern:**
- **Skills** encode domain expertise, best practices, step-by-step workflows. Claude draws on them *automatically* when relevant.
- **Commands** are explicit actions you trigger (e.g., `/design-critique`, `/finance:reconciliation`).
- **Connectors** wire Claude to external tools via MCP servers (Figma, Slack, Linear, Notion, etc).
- **Files-based:** All configuration is markdown + JSON. No code, no infrastructure, no build steps.

---

## Core Plugins (11)

### 1. Design Plugin (v1.2.0)

**Purpose:** Accelerate design workflows — critique, design system management, UX writing, accessibility audits, research synthesis, dev handoff.

**Commands:**
- `/critique` - Structured design feedback (usability, hierarchy, accessibility, consistency)
- `/design-system` - Audit, document, or extend design systems (components, tokens, patterns)
- `/handoff` - Generate developer handoff specs (measurements, tokens, states, interactions, edge cases)
- `/ux-copy` - Write or review UX copy (microcopy, error messages, empty states, onboarding)
- `/accessibility` - WCAG 2.1 AA compliance audit (color contrast, screen reader, keyboard nav)
- `/research-synthesis` - Synthesize user research (interviews, surveys, tests → insights)

**Skills:**
- `design-critique` - Evaluate designs for usability, hierarchy, consistency
- `design-system-management` - Manage tokens, component libraries, pattern docs
- `ux-writing` - Clear, concise, consistent microcopy
- `accessibility-review` - WCAG 2.1 AA compliance audits
- `user-research` - Plan, conduct, synthesize research (interviews, surveys, tests)
- `design-handoff` - Comprehensive developer specs from designs

**MCP Connectors:**
- Figma (pull designs, inspect components, access tokens)
- Slack (share feedback, coordinate with team)
- Linear / Asana / Jira (link designs to tickets)
- Notion (brand guidelines, design principles)
- Intercom (user feedback, NPS data)

**Neuralabs Relevance:** ⭐⭐⭐⭐⭐ CRITICAL
- Foundational plugin for design workflows
- Design critique skill aligns with /grill-design pattern
- Design system management is core to Neuralabs (tokens, component library)
- Accessibility review fits design QA pipeline
- Research synthesis feeds design decisions
- MCP integration model is reference for Neuralabs plugin architecture

**Integration Strategy:**
- Phase 1: Adapt design-critique skill for AI-assisted design feedback
- Phase 2: Integrate Figma MCP for design system management
- Phase 3: Build design QA pipeline (accessibility + consistency automated checks)

---

### 2. Engineering Plugin (v1.2.0)

**Purpose:** Streamline engineering workflows — standups, code review, architecture decisions, incident response, technical documentation.

**Skills:**
- `code-review` - Security, performance, correctness, maintainability reviews
- `system-design` - Design systems, services, architectures
- `testing-strategy` - Test strategies, test plans, coverage approaches
- `debug` - Structured debugging (reproduce → isolate → diagnose → fix)
- `incident-response` - Incident triage, communication, postmortem
- `standup` - Daily standup templates and progress synthesis

**MCP Connectors:**
- Linear / Jira (link reviews to tickets)
- Slack (share reviews, incident updates)
- GitHub (pull request reviews, commit context)
- Notion (document architectural decisions, ADRs)

**Neuralabs Relevance:** ⭐⭐⭐⭐
- Code review skill model (2-axis: Standards + Spec) maps to design review pattern
- System design for AI/ML infrastructure planning
- Testing strategy for design automation pipelines
- Incident response for deployment/system issues

---

### 3. Product Management Plugin (v1.2.0)

**Purpose:** Write specs, plan roadmaps, synthesize research, keep stakeholders updated, track competitive landscape.

**Skills:**
- `write-spec` - Turn ideas into PRDs/feature specs with goals, non-goals, metrics, acceptance criteria
- `product-brainstorming` - Explore problem spaces, challenge assumptions, stress-test ideas
- `synthesize-research` - Interviews, surveys, feedback → themes, insights, recommendations
- `metrics-review` - Trend analysis, actionable insights, scorecards
- `stakeholder-update` - Tailored updates for leadership, engineering, customers
- `competitive-analysis` - Competitive landscape research and battlecards

**MCP Connectors:**
- Linear / Asana / Monday (track roadmap, roadmap items)
- Amplitude / Mixpanel / Pendo (product analytics, usage data)
- Figma (design mockups, prototypes)
- Intercom / Productboard (user feedback, feature requests)
- Slack (team communication)
- Notion (research repository)

**Neuralabs Relevance:** ⭐⭐⭐⭐
- Spec writing pattern for design features/workflows
- Brainstorming for design problem exploration
- Research synthesis for design direction
- Metrics review for design system health metrics

---

### 4. Marketing Plugin (v1.2.0)

**Purpose:** Draft content, plan campaigns, enforce brand voice, brief on competitors, report on performance.

**Skills:**
- `content-strategy` - Audience research, messaging, content calendar planning
- `brand-voice` - Enforce consistent tone, messaging, brand guidelines
- `campaign-planning` - Multi-channel campaign strategy and execution
- `copy-writing` - Blog posts, emails, landing pages, social media
- `competitive-intelligence` - Competitor tracking, benchmarking, insights
- `performance-reporting` - Channel analytics, ROI analysis, recommendations

**MCP Connectors:**
- Canva (design templates, brand assets)
- Figma (marketing designs, brand kit)
- HubSpot (email campaigns, lead tracking)
- Amplitude / Mixpanel (campaign analytics)
- Ahrefs / SimilarWeb (SEO, traffic analysis)
- Notion (brand guidelines, content calendar)
- Slack (team coordination)
- Klaviyo (email marketing, segments)

**Neuralabs Relevance:** ⭐⭐⭐
- Brand voice consistency patterns
- Content strategy for design documentation
- Competitive intelligence for design trends
- Figma integration for marketing collateral

---

### 5. Sales Plugin (v1.2.0)

**Purpose:** Research prospects, prep for calls, review pipeline, draft outreach, build battlecards.

**Skills:**
- `prospect-research` - Background, company context, decision-makers, pain points
- `call-prep` - Meeting prep, talking points, competitive positioning, objection handling
- `pipeline-review` - Deal tracking, stage analysis, bottleneck identification
- `outreach-drafting` - Cold emails, follow-ups, personalized messaging
- `battlecard-building` - Competitive positioning, win/loss strategies
- `sales-forecasting` - Pipeline analysis, forecast modeling, risk assessment

**MCP Connectors:**
- HubSpot (CRM, contact data)
- Close / ZoomInfo (prospect research, contact data)
- Clay (contact data enrichment)
- Slack (team communication)
- Notion (sales playbooks, battlecards)
- Jira / Linear (deal tracking)
- Fireflies (call recording, transcription)
- Microsoft 365 (email, calendar)

**Neuralabs Relevance:** ⭐⭐
- Prospect research patterns for customer analysis
- Call prep for customer discovery
- Outreach for customer communications

---

### 6. Finance Plugin (v1.2.0)

**Purpose:** Prep journal entries, reconcile accounts, generate statements, analyze variances, manage close, support audits.

**Skills:**
- `journal-entry-prep` - Transaction analysis, journal entry preparation, posting
- `account-reconciliation` - Account matching, discrepancy analysis, reconciliation workflows
- `financial-reporting` - Statement generation, variance analysis, reporting packages
- `budget-analysis` - Budget vs actual, variance explanation, forecast updates
- `audit-support` - Audit workpapers, control documentation, testing support
- `financial-forecasting` - Financial modeling, scenario analysis, forecast preparation

**MCP Connectors:**
- Snowflake / Databricks / BigQuery (data warehouse access)
- Slack (team communication)
- Microsoft 365 (Excel, Outlook)

**Neuralabs Relevance:** ⭐
- Financial forecasting for cost modeling
- Budget analysis for infrastructure costs
- Data warehouse integration patterns

---

### 7. Legal Plugin (v1.2.0)

**Purpose:** Review contracts, triage NDAs, navigate compliance, assess risk, prep for meetings, draft templated responses.

**Skills:**
- `contract-review` - Risk assessment, red flags, negotiation leverage points
- `nda-triage` - Skim and categorize NDAs (inbound, outbound, internal)
- `compliance-check` - Regulatory navigation, compliance gaps, remediation
- `risk-assessment` - Legal risk analysis, mitigation strategies
- `meeting-prep` - Legal risk briefing, talking points, fallback strategies
- `template-drafting` - Legal response templates, standard language, variations

**MCP Connectors:**
- Box / Egnyte (document management)
- Jira / Linear (legal ticket tracking)
- Slack (team communication)
- Microsoft 365 (email, documents)

**Neuralabs Relevance:** ⭐
- Contract review patterns
- Compliance check for AI/ML regulations
- Risk assessment for data privacy

---

### 8. Data Plugin (v1.2.0)

**Purpose:** Query, visualize, and interpret datasets — write SQL, run analysis, build dashboards, validate work.

**Skills:**
- `sql-writing` - Query generation, query optimization, query documentation
- `data-analysis` - Exploratory analysis, statistical analysis, hypothesis testing
- `visualization-design` - Dashboard design, chart selection, storytelling
- `data-validation` - Quality checks, outlier detection, data completeness
- `documentation` - Data dictionary, methodology docs, analysis walkthroughs

**MCP Connectors:**
- Snowflake / Databricks / BigQuery (data warehouse query)
- Hex / Definite (notebook environment)
- Amplitude / Mixpanel (product analytics)
- Jira / Linear (result tracking)
- Slack (result sharing)

**Neuralabs Relevance:** ⭐⭐⭐
- Data analysis for design metrics (usage, performance)
- SQL writing for analytics integration
- Visualization design for design dashboards
- Data validation for design system audit

---

### 9. Customer Support Plugin (v1.2.0)

**Purpose:** Triage tickets, draft responses, package escalations, research customer context, turn resolved issues into knowledge base articles.

**Skills:**
- `ticket-triage` - Prioritization, severity assessment, routing, categorization
- `response-drafting` - Customer-appropriate responses, tone matching, solutions
- `escalation-packaging` - Context packaging, critical info summary, handoff docs
- `customer-research` - Account context, history, related issues, patterns
- `knowledge-base-creation` - Articles from resolved tickets, documentation, FAQs
- `feedback-synthesis` - Customer feedback patterns, common issues, feature requests

**MCP Connectors:**
- Intercom (support tickets, customer context)
- HubSpot (CRM, account data)
- Guru / Notion (knowledge base)
- Jira / Linear (ticket tracking)
- Slack (team communication)
- Microsoft 365 (email)

**Neuralabs Relevance:** ⭐⭐
- Ticket triage for support workflows
- Response drafting for customer communication
- Knowledge base creation for design system docs

---

### 10. Productivity Plugin (v1.2.0)

**Purpose:** Manage tasks, calendars, daily workflows, and personal context so you spend less time repeating yourself.

**Skills:**
- `task-management` - Task creation, prioritization, decomposition, organization
- `calendar-optimization` - Meeting scheduling, time blocking, focus time protection
- `daily-standup` - Progress tracking, blockers, roadblock surfacing
- `note-taking` - Structured note-taking, meeting notes, decision capture
- `context-synthesis` - Daily context, weekly recap, progress tracking

**MCP Connectors:**
- Slack (team communication, status)
- Notion / Asana / Monday / ClickUp (task management)
- Linear / Jira (ticket tracking)
- Microsoft 365 (email, calendar)
- Google Calendar (calendar integration)

**Neuralabs Relevance:** ⭐⭐
- Task management for design workflow orchestration
- Calendar optimization for design team coordination
- Daily standup for design team status
- Context synthesis for design decisions

---

### 11. Enterprise Search Plugin (v1.2.0)

**Purpose:** Find anything across email, chat, docs, and wikis — one query across all company tools.

**Skills:**
- `cross-tool-search` - Unified search across multiple tools in one query
- `knowledge-synthesis` - Aggregate results, synthesize duplicates, surface context
- `person-search` - Find people with expertise, context, relationships
- `decision-search` - Find past decisions, contexts, rationale

**MCP Connectors:**
- Slack (chat history)
- Notion / Guru (knowledge base, wiki)
- Jira / Asana / Linear / Monday (ticket history)
- Microsoft 365 (email, documents, Teams)

**Neuralabs Relevance:** ⭐⭐⭐
- Enterprise search for design decision history
- Person search for design expertise
- Knowledge synthesis for design patterns

---

## Infrastructure & Utilities (2)

### 12. PDF Viewer Plugin (v1.2.0)

**Purpose:** Browse, search, and extract content from PDFs.

**Capabilities:**
- PDF upload and preview
- Search within PDFs
- Content extraction
- Citation preservation

**Neuralabs Relevance:** ⭐⭐
- PDF analysis for design documentation
- Design guide extraction
- Research paper analysis

---

### 13. Cowork Plugin Management (v1.2.0)

**Purpose:** Create new plugins or customize existing ones for organization-specific tools and workflows.

**Skills:**
- `plugin-scaffolding` - Generate plugin structure, boilerplate
- `skill-authoring` - Write new skills, adapt existing skills
- `connector-configuration` - Configure MCP connections, OAuth setup
- `plugin-testing` - Test plugins locally before deploying

**Neuralabs Relevance:** ⭐⭐⭐⭐⭐ CRITICAL
- Self-service plugin creation for Neuralabs-specific workflows
- Skill authoring for design automation
- MCP connector setup for Figma, design tools, analytics
- Essential for building Neuralabs design plugin

**Implementation Strategy:**
- Use as reference for building design-plugin
- Adapt skill templates for design workflows
- MCP connector patterns for integrating Figma, analytics, design tools

---

## Partner-Built Plugins (5)

### 14. Apollo Plugin
- Prospect data, contact enrichment, sales intelligence
- MCP Connectors: Apollo API
- Neuralabs: Sales prospecting, customer research

### 15. Brand Voice Plugin
- Brand voice enforcement, tone matching, messaging consistency
- MCP Connectors: Notion (brand guidelines)
- Neuralabs: Design language consistency, design voice guides

### 16. Common Room Plugin
- Community intelligence, event management, community building
- MCP Connectors: Common Room API
- Neuralabs: Design community engagement, feedback

### 17. Slack Plugin
- Slack workspace management, channel orchestration, workflow automation
- MCP Connectors: Slack API
- Neuralabs: Design team coordination, async feedback

### 18. Zoom Plugin
- Meeting automation, transcription, recording management
- MCP Connectors: Zoom API
- Neuralabs: Design review meetings, user research sessions

---

## MCP Server Ecosystem

All plugins integrate via Model Context Protocol (MCP) servers. Common patterns:

**HTTP-based MCP Servers:**
```json
{
  "mcpServers": {
    "figma": {
      "type": "http",
      "url": "https://mcp.figma.com/mcp"
    },
    "slack": {
      "type": "http",
      "url": "https://mcp.slack.com/mcp",
      "oauth": {
        "clientId": "...",
        "callbackPort": 3118
      }
    }
  }
}
```

**Connection Patterns:**
- **OAuth 2.0** (Slack, Figma): Callback port + authentication flow
- **API Key** (Linear, Asana): Configured in `.mcp.json` or environment
- **Direct HTTP** (Notion, Intercom): URL-based endpoints

**Tool Surface:**
Each MCP server exposes tools that plugins call:
- Figma: `figma.get_design`, `figma.list_components`, `figma.create_component`
- Slack: `slack.post_message`, `slack.list_channels`, `slack.get_conversation_history`
- Linear: `linear.create_issue`, `linear.update_issue`, `linear.search_issues`
- Notion: `notion.query_database`, `notion.create_page`, `notion.update_page`

---

## Key Architectural Patterns

### 1. Skill Auto-Triggering (Content-Driven)

Skills activate automatically based on conversation context, not explicit commands.

```markdown
---
name: design-critique
description: Get structured design feedback...
trigger: "review this design", "critique this mockup", "what do you think of this screen?"
---
```

**Pattern:** Claude reads skill descriptions and trigger patterns, activates when relevant.

**Neuralabs Parallel:** Domain-Driven Design + CONTEXT.md vocabulary
- Shared language reduces activation friction
- Clear trigger patterns make skills discoverable

---

### 2. MCP Connector Flexibility

Each plugin's `.mcp.json` defines available tools. Skills use tool calls, not hardcoded APIs.

```markdown
# /design-critique

If you have Figma connected:
- Pull the design directly
- Inspect components and tokens
- Cross-reference with design system

If you're working standalone:
- Describe your design or paste a screenshot
- I'll give the same structured feedback
```

**Pattern:** Graceful degradation — works standalone, supercharged with connectors.

**Neuralabs Parallel:** Ollama fallback + API-based LLMs
- Works locally without API costs
- Enhanced with cloud APIs when available

---

### 3. Role-Specific Collections

Plugins bundle skills + commands + connectors for specific roles.

```
design/
├── skills/
│   ├── design-critique/
│   ├── design-system-management/
│   └── accessibility-review/
└── .mcp.json  (Figma, Notion, Slack, Linear)
```

**Pattern:** Curated, integrated experience for each role.

**Neuralabs Parallel:** Function-specific design tools
- Design tools bundle (Figma, Penpot, tokens)
- Developer handoff bundle (specs, code gen, tokens)
- Design QA bundle (accessibility, consistency, performance)

---

### 4. CONNECTORS.md Pattern

Each plugin documents which tools are available, how to configure, and what to expect.

```markdown
# CONNECTORS.md

## Figma
Status: Connected to workspace "Company Design"
Capabilities: Read designs, components, tokens
Configuration: OAuth via Cowork settings

## Notion
Status: Not connected
How to connect: Settings > Integrations > Notion
What you'll unlock: Brand guidelines, design principles, component docs
```

**Pattern:** Transparent tool availability and configuration.

**Neuralabs Parallel:** Skill dependencies documentation
- Clear tool availability
- Configuration steps
- Graceful fallback when tools unavailable

---

## Neuralabs Integration Strategy

### Phase 1: Reference Architecture (Weeks 1-4)

**Goal:** Understand plugin patterns, validate approach.

**Tasks:**
1. ✅ Document Knowledge Work Plugins (this file)
2. Study design plugin architecture in detail
3. Map design plugin skills to Neuralabs workflows
4. Prototype plugin.json + .mcp.json structure
5. Identify custom skills needed (design-generation, design-review, design-tdd)

**Deliverables:**
- Plugin architecture document
- Neuralabs plugin boilerplate

---

### Phase 2: Design Plugin Foundation (Weeks 5-12)

**Goal:** Build core Neuralabs design plugin with foundational skills.

**Tasks:**
1. Create plugin.json manifest
2. Implement core skills:
   - `/design-generation` - AI-assisted design generation (adapted from /grill-design)
   - `/design-review` - Design review with 2-axis feedback (Standards + Spec)
   - `/design-tdd` - Design-driven development workflow
   - `/design-system` - Design system management (tokens, components)
   - `/accessibility` - WCAG compliance audit (from design plugin)
3. Build DESIGN_CONTEXT.md template (like CLAUDE.md for design)
4. Configure MCP connectors:
   - Figma (design tools)
   - Slack (team communication)
   - Linear (design tickets)
   - Analytics (usage data)

**Deliverables:**
- Neuralabs design plugin v0.1
- 5+ production skills
- MCP connector configuration

---

### Phase 3: Ecosystem Integration (Weeks 13+)

**Goal:** Integrate with other plugins, build cross-functional workflows.

**Tasks:**
1. Integrate with engineering plugin (design → dev handoff)
2. Integrate with product management plugin (research → design)
3. Create custom partner-built plugins:
   - Token sync plugin (design tokens ↔ code)
   - Design audit plugin (automated design QA)
   - Design metrics plugin (design system health)
4. Document plugin marketplace strategy

**Deliverables:**
- Cross-plugin workflows
- Partner plugin examples
- Plugin marketplace strategy

---

## Skill Adaptation Examples

### Design Critique Skill (from design plugin)

**Original:**
```
/critique

Share a Figma link, screenshot, or describe your design.
Get structured feedback on:
- Usability and interaction patterns
- Visual hierarchy and information density
- Consistency and design system adherence
- Accessibility and inclusive design
```

**Neuralabs Adaptation:**
```
/design-critique

Review a design with 2-axis feedback:

STANDARDS (does it follow design principles + best practices?)
- Visual hierarchy clarity
- Consistency with design system
- Accessibility WCAG 2.1 AA
- Performance (file size, render time)

SPEC (does it solve the stated problem?)
- User needs satisfied
- Feature completeness
- Edge cases handled
- Design tokens applied correctly
```

---

### Design System Skill (from design plugin)

**Original:**
```
/design-system audit

Review your component library for:
- Consistency in naming
- Completeness of variants
- Documentation quality
- Accessibility coverage
```

**Neuralabs Adaptation:**
```
/design-system manage

Audit, document, or extend design system:

AUDIT: Check consistency across:
- Component naming (Figma library)
- Design tokens (colors, typography, spacing)
- Variant coverage (states, sizes, themes)
- Accessibility (WCAG compliance)
- Documentation (specs, usage guides)

DOCUMENT: Generate component docs:
- Component overview
- Variant matrix
- Accessibility notes
- Figma usage guidelines
- Code generation mapping

EXTEND: Design new components:
- Problem statement
- Design patterns
- Variant definitions
- Accessibility considerations
- Documentation template
```

---

## Comparison Matrix: Matt Pocock Skills vs Knowledge Work Plugins

| Aspect | Matt Pocock Skills | Knowledge Work Plugins |
|--------|-------------------|----------------------|
| **Distribution** | Claude Code plugin OR editable npm package | Cowork marketplace + GitHub repo |
| **Installation** | `claude plugin install` OR `npx skills add` | `claude plugin install` OR GitHub fork |
| **Skill Format** | Markdown with YAML frontmatter + eval suite | Markdown with simple structure |
| **Trigger Pattern** | Explicit slash commands (`/grill-me`) | Auto-trigger + slash commands |
| **MCP Integration** | Mentioned but not deeply integrated | Core to architecture (every plugin) |
| **Role Focus** | Engineering-specific (TDD, code review, design) | 20+ roles (sales, finance, HR, etc) |
| **Composition** | Standalone skills | Bundled skill collections per role |
| **Customization** | Fork + edit skill files | Fork + edit .mcp.json + skill files |

**Neuralabs Synthesis:**
- Use Matt Pocock patterns for skill discipline (eval suites, trigger patterns)
- Use Knowledge Work Plugins patterns for ecosystem architecture (role bundles, MCP)
- Build design-specific skills following both patterns

---

## File Structure Summary

```
knowledge-work-plugins/
├── README.md                     # Overview, 11 core plugins, getting started
├── LICENSE                       # Apache 2.0
│
├── Core Plugins (11)
│   ├── design/
│   │   ├── .claude-plugin/plugin.json
│   │   ├── .mcp.json
│   │   ├── README.md
│   │   ├── CONNECTORS.md
│   │   └── skills/
│   │       ├── design-critique/SKILL.md
│   │       ├── design-system/SKILL.md
│   │       ├── design-handoff/SKILL.md
│   │       ├── ux-copy/SKILL.md
│   │       ├── accessibility-review/SKILL.md
│   │       ├── user-research/SKILL.md
│   │       └── research-synthesis/SKILL.md
│   │
│   ├── engineering/
│   │   ├── .claude-plugin/plugin.json
│   │   ├── .mcp.json
│   │   └── skills/
│   │       ├── code-review/SKILL.md
│   │       ├── system-design/SKILL.md
│   │       ├── testing-strategy/SKILL.md
│   │       ├── debug/SKILL.md
│   │       ├── incident-response/SKILL.md
│   │       └── standup/SKILL.md
│   │
│   ├── product-management/
│   ├── marketing/
│   ├── sales/
│   ├── finance/
│   ├── legal/
│   ├── data/
│   ├── customer-support/
│   ├── enterprise-search/
│   ├── productivity/
│   │
├── Infrastructure (2)
│   ├── pdf-viewer/
│   └── cowork-plugin-management/
│
└── Partner-Built (5)
    ├── partner-built/apollo/
    ├── partner-built/brand-voice/
    ├── partner-built/common-room/
    ├── partner-built/slack/
    └── partner-built/zoom-plugin/
```

---

## Key Takeaways for Neuralabs

1. **Plugin = Role Bundle**: Curated skills + commands + MCP connectors for a specific role.

2. **Skills = Domain Expertise**: Auto-triggered, reusable building blocks. No explicit commands needed.

3. **MCP = Tool Integration**: Figma, Slack, Linear, Notion, etc. Graceful degradation when tools unavailable.

4. **CONNECTORS.md = Transparency**: Clear documentation of tool availability and configuration.

5. **Files-Based = Simple**: Markdown + JSON. No code, infrastructure, or build steps. Forkable, customizable.

6. **Role-Specific = Relevant**: Design plugin focuses on design workflows. Engineering plugin focuses on code. Not generic "AI assistant."

7. **Cowork + Claude Code**: Same plugins work in both Cowork (agentic desktop app) and Claude Code (CLI). Different UIs, same skills.

8. **Extensible**: Start with core plugins, customize for your company (tools, terminology, processes), build new plugins for unmet needs.

---

## Applicable Patterns for Neuralabs

### Pattern: Auto-Triggered Skills

Skills activate based on conversation content, not explicit invocation.

**Neuralabs Application:**
```
Trigger: User shares a Figma design

Auto-activated skills:
- design-system (check consistency with tokens)
- accessibility-review (WCAG audit)
- design-critique (feedback on design)
```

### Pattern: Graceful Degradation

Works standalone, supercharged with MCP connectors.

**Neuralabs Application:**
```
Scenario 1: User has Figma connected
- Pull design directly
- Inspect components, tokens
- Auto-generate CSS/design tokens

Scenario 2: User pasting screenshot
- Analyze image visually
- Provide feedback, suggestions
- No Figma access needed
```

### Pattern: CONTEXT.md for Shared Language

Projects with CONTEXT.md (terminology, processes, org structure) get better Claude assistance.

**Neuralabs Application:**
```
DESIGN_CONTEXT.md:
- Design system terminology (tokens, components, patterns)
- Brand voice (tone, messaging guidelines)
- Design process (exploration → critique → handoff)
- Team roles and responsibilities
- Common design patterns in this codebase
```

### Pattern: MCP Connectors as Multiplier

Each connector adds new capabilities without new skills.

**Neuralabs Application:**
```
Base: Design critique skill (standalone)
+ Figma connector: Design critique from Figma links
+ Slack connector: Share feedback in Slack threads
+ Linear connector: Link critiques to design tickets
```

---

## References

- Repository: https://github.com/anthropics/knowledge-work-plugins
- Plugin Marketplace: https://claude.com/plugins
- MCP Documentation: https://modelcontextprotocol.io/
- Cowork: https://claude.com/product/cowork
- Claude Code: https://claude.ai/code

---

**Documentation Status:** Complete  
**Last Updated:** Sep 22, 2024  
**Neuralabs Integration Roadmap:** Phase 1-3 planning complete


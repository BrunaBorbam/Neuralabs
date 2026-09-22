# Vercel Labs Skills CLI Index

Open-source CLI for managing the universal agent skills ecosystem. Central infrastructure for installing, discovering, versioning, and updating skills across 75+ AI coding agents.

**Repository:** https://github.com/vercel-labs/skills  
**Package:** https://www.npmjs.com/package/skills  
**Version:** 1.7.0  
**License:** MIT  
**Supported Agents:** 75+

---

## Overview

`skills` is the command-line interface for the open agent skills ecosystem. It abstracts away the complexity of managing skills across different coding agents (Claude Code, Cursor, Cline, Codex, OpenCode, etc) and provides a unified installation, discovery, and versioning system.

**Core Problem It Solves:**
- Skills live in different directories for different agents (`.claude/skills/` vs `.cursor/skills/` vs `.cline/skills/`)
- Each agent has different configuration requirements
- Keeping skills up-to-date across multiple sources is tedious
- Discovering skills from GitHub, GitLab, Azure Repos requires custom integration for each

**Solution:**
- Unified CLI for all agents
- Automatic agent detection
- Support for public + private repositories (GitHub, GitLab, Azure Repos)
- Lock file system for reproducible skill installation
- Update checking and automatic installation

---

## Core Commands

### `skills add` — Install Skills

```bash
npx skills add <source> [options]
```

Installs skills from git repositories, direct URLs, or local paths to one or more agents.

**Source Formats:**

| Format | Example | Use Case |
|--------|---------|----------|
| GitHub shorthand | `vercel-labs/skills` | Public GitHub repos |
| GitHub URL | `https://github.com/vercel-labs/skills` | Public + private repos |
| GitHub tree path | `https://github.com/org/repo/tree/main/skills/my-skill` | Specific skill folder |
| GitLab | `https://gitlab.com/org/repo` | GitLab repositories |
| Azure Repos | `https://dev.azure.com/org/project/_git/repo` | Azure DevOps repos |
| Git SSH | `git@github.com:org/private-skills.git` | SSH authentication |
| Direct download | `https://example.com/skill.tar.gz` | Single file or archive |
| Local path | `./my-local-skills` | Local development |

**Options:**

| Option | Description |
|--------|-------------|
| `-g, --global` | Install to user directory (~) instead of project (.) |
| `-a, --agent <agents...>` | Target specific agents (e.g., `claude-code cursor codex`) |
| `-s, --skill <skills...>` | Install specific skills by name (use `'*'` for all) |
| `-l, --list` | List available skills without installing |
| `--copy` | Copy files instead of symlinking (useful for WSL, network shares) |
| `-y, --yes` | Skip all confirmation prompts (CI/CD friendly) |
| `--all` | Install all skills to all detected agents without prompts |

**Examples:**

```bash
# List available skills in a repo
npx skills add vercel-labs/skills --list

# Install specific skills to specific agents
npx skills add vercel-labs/skills -s design-review -s accessibility-audit -a claude-code -a cursor

# Install all skills from a repo to all agents
npx skills add vercel-labs/skills --all

# Install to global (user) scope
npx skills add my-skills-repo -g -y

# Install from private repo (uses git credentials)
npx skills add acme/private-skills -a claude-code

# Install from Azure Repos
npx skills add https://dev.azure.com/acme/design/_git/skills -s typography-guide

# Install from direct download URL
npx skills add https://example.com/my-skill.tar.gz
```

**Installation Scope:**

| Scope | Flag | Location | Behavior |
|-------|------|----------|----------|
| **Project** | (default) | `./<agent>/skills/` | Checked into version control, shared with team |
| **Global** | `-g` | `~/<agent>/skills/` | Available across all projects on machine |

**Installation Methods:**

- **Symlink** (default, recommended): Creates symlinks from each agent to a canonical copy. Single source of truth, easy updates.
- **Copy** (`--copy`): Creates independent copies for each agent. Useful on systems that don't support symlinks (WSL, network shares).

---

### `skills list` — View Installed Skills

```bash
npx skills list
npx skills ls  # Alias
```

List all installed skills organized by agent and scope.

**Options:**

| Option | Description |
|--------|-------------|
| `-g, --global` | Show only global skills |
| `-p, --project` | Show only project skills |
| `-a, --agent <agents...>` | Filter by specific agents |

**Examples:**

```bash
# List all installed skills
npx skills list

# List only global skills
npx skills ls -g

# List skills for specific agents
npx skills ls -a claude-code -a cursor
```

---

### `skills find` — Discover Skills

```bash
npx skills find [query]
```

Search for skills across known repositories interactively or by keyword.

**Examples:**

```bash
# Interactive search (fzf-style picker)
npx skills find

# Search by keyword
npx skills find typescript

# Search across a specific organization
npx skills find react --owner vercel
```

---

### `skills update` — Update Installed Skills

```bash
npx skills update [skills...]
```

Update installed skills to their latest versions. Uses GitHub Trees API for efficient change detection.

**Options:**

| Option | Description |
|--------|-------------|
| `-g, --global` | Update only global skills |
| `-p, --project` | Update only project skills |
| `-y, --yes` | Skip scope prompt (auto-detect based on current directory) |
| `[skills...]` | Update specific skills by name instead of all |

**Examples:**

```bash
# Interactive update (prompts for scope: project, global, both)
npx skills update

# Update specific skills
npx skills update design-review accessibility-audit

# Update all global skills non-interactively
npx skills update -g -y

# Update only project scope
npx skills update -p
```

**How It Works:**

1. Reads `~/.agents/.skill-lock.json` to find installed skills
2. For GitHub-backed skills, calls GitHub Trees API to fetch latest folder SHA
3. Compares current folder SHA with latest; if different, update available
4. Reinstalls changed skills by re-running `skills add`

---

### `skills use` — Use Without Installing

```bash
npx skills use <source>[@skill] [--agent agent-name]
```

Generate a prompt for one skill or launch an agent with a skill pre-loaded, without installing it.

**Examples:**

```bash
# Generate prompt for a skill and pipe to Claude CLI
npx skills use vercel-labs/skills@design-review | claude

# Launch Claude Code with a skill
npx skills use vercel-labs/skills@design-review --agent claude-code

# Use skill from private repo
npx skills use acme/skills@internal-guidelines --agent cursor
```

---

### `skills init` — Create New Skill

```bash
npx skills init [name]
```

Create a new skill template with SKILL.md boilerplate.

**Examples:**

```bash
# Create SKILL.md in current directory
npx skills init

# Create new skill in subdirectory
npx skills init my-custom-skill

# Creates: my-custom-skill/SKILL.md with frontmatter template
```

---

### `skills remove` — Uninstall Skills

```bash
npx skills remove [skills...]
```

Remove installed skills from agents.

**Options:**

| Option | Description |
|--------|-------------|
| `-g, --global` | Remove from global scope only |
| `-p, --project` | Remove from project scope only |
| `-a, --agent <agents...>` | Remove from specific agents only |
| `-s, --skill <skills...>` | Remove specific skills (use `'*'` for all) |
| `--all` | Remove all skills without confirmation |

**Examples:**

```bash
# Interactive removal (select from installed)
npx skills remove

# Remove specific skill
npx skills remove design-review

# Remove from global scope
npx skills remove --global web-design-guidelines

# Remove specific skill from specific agent
npx skills remove --agent claude-code design-review

# Remove all skills
npx skills remove --all
```

---

## Supported Agents (75+)

CLI auto-detects installed agents and prompts for selection if needed. Can target specific agents with `--agent` flag.

**Major Agents:**

| Agent | Flag | Project Path | Global Path |
|-------|------|--------------|------------|
| Claude Code | `claude-code` | `.claude/skills/` | `~/.claude/skills/` |
| Cursor | `cursor` | `.agents/skills/` | `~/.cursor/skills/` |
| Cline | `cline` | `.agents/skills/` | `~/.agents/skills/` |
| Codex | `codex` | `.agents/skills/` | `~/.codex/skills/` |
| Windsurf | `windsurf` | `.windsurf/skills/` | `~/.codeium/windsurf/skills/` |
| Continue | `continue` | `.continue/skills/` | `~/.continue/skills/` |
| OpenCode | `opencode` | `.agents/skills/` | `~/.config/opencode/skills/` |
| OpenClaw | `openclaw` | `skills/` | `~/.openclaw/skills/` |
| OpenHands | `openhands` | `.openhands/skills/` | `~/.openhands/skills/` |
| Zed | `zed` | `.agents/skills/` | `~/.agents/skills/` |
| GitHub Copilot | `github-copilot` | `.agents/skills/` | `~/.copilot/skills/` |
| Gemini CLI | `gemini-cli` | `.agents/skills/` | `~/.gemini/skills/` |
| Qwen Code | `qwen-code` | `.qwen/skills/` | `~/.qwen/skills/` |
| Kimi Code CLI | `kimi-code-cli` | `.agents/skills/` | `~/.agents/skills/` |
| Grok | `grok` | `.grok/skills/` | `~/.grok/skills/` |

**Full List:** See [Supported Agents](https://github.com/vercel-labs/skills#supported-agents) in README (75+ agents documented)

---

## Lock File System

Skills CLI uses lock files for reproducible installations and version tracking.

### Global Lock File: `~/.agents/.skill-lock.json`

**Purpose:** Track globally installed skills and their versions

**Format (v3):**
```json
{
  "version": 3,
  "skills": [
    {
      "name": "design-review",
      "source": "vercel-labs/skills",
      "skillPath": "skills/design-review",
      "skillFolderHash": "a1b2c3...",
      "installTime": "2024-09-22T17:00:00Z",
      "scope": "global"
    }
  ]
}
```

**Key Fields:**
- `skillFolderHash`: SHA of the skill folder from GitHub Trees API (used for update detection)
- `skillPath`: Path within the repo (e.g., `skills/design-review`)
- `source`: Repository source (e.g., `vercel-labs/skills` or full URL)

### Project Lock File: `skills-lock.json`

**Purpose:** Track project-scoped skills (checked into version control)

**Format:** Same as global lock file, but project-specific

**Workflow:**

1. `skills add vercel-labs/skills -s design-review` → Creates entries in lock files
2. `skills update` → Checks GitHub Trees API for latest hash
3. If hash differs → Skill update available → Run `skills add` to reinstall

---

## Architecture

### CLI Structure

```
src/
├── cli.ts               # Entry point, command routing
├── add.ts               # Install skills command
├── list.ts              # List installed skills
├── find.ts              # Discover skills
├── update.ts            # Update installed skills
├── remove.ts            # Remove skills
├── use.ts               # Use skill without installing
├── agents.ts            # Agent detection + configuration
├── installer.ts         # Symlink/copy installation logic
├── skills.ts            # Skill discovery and parsing
├── skill-lock.ts        # Global lock file management
├── local-lock.ts        # Project lock file management
├── source-parser.ts     # Parse git URLs, GitHub shorthand, local paths
├── git.ts               # Git clone operations
├── download-source.ts   # Direct download URL handling
├── providers/           # Remote skill providers
│   ├── registry.ts      # Well-known skill registries
│   ├── wellknown.ts     # GitHub org index, etc
│   └── types.ts         # Provider interfaces
└── telemetry.ts         # Anonymous usage tracking
```

### Agent Configuration

Each agent has platform-specific paths:

```
agents.ts:
├── Claude Code:  `.claude/skills/` + `~/.claude/skills/`
├── Cursor:       `.agents/skills/` + `~/.cursor/skills/`
├── Cline:        `.agents/skills/` + `~/.agents/skills/`
├── Codex:        `.agents/skills/` + `~/.codex/skills/`
└── [70+ more]
```

### Update Checking Flow

```
1. skills update
   ↓
2. Read ~/.agents/.skill-lock.json
   ↓
3. Filter to GitHub-backed skills (has skillFolderHash + skillPath)
   ↓
4. For each skill:
   a. Fetch latest folder SHA via GitHub Trees API
      (Anonymous → GITHUB_TOKEN → gh api)
   b. Compare current SHA vs latest SHA
   c. If different → update available
   ↓
5. Reinstall updated skills via `skills add`
```

**GitHub API Strategy:**
1. Try anonymous (public repos, no auth needed)
2. Try explicit `GITHUB_TOKEN` or `GH_TOKEN` environment variable
3. Try `gh api` (uses stored GitHub CLI credentials, doesn't export them)
4. Fallback to authenticated git clone if API fails

---

## Key Features

### 1. Multi-Agent Support

Single command to manage skills across any combination of installed agents.

```bash
# Install one skill to many agents
npx skills add my-skills -s design-review -a claude-code -a cursor -a cline

# Install many skills to one agent
npx skills add my-skills --skill '*' -a claude-code

# Broadcast to all agents
npx skills add my-skills --all
```

### 2. Flexible Source Resolution

Support for public repos, private repos, specific subpaths, and direct downloads.

```bash
# GitHub shorthand (auto-discovers agent type)
npx skills add owner/repo

# Specific skill folder only
npx skills add https://github.com/owner/repo/tree/main/skills/my-skill

# Private repo (uses git credentials)
npx skills add git@github.com:acme/private-skills.git

# Azure DevOps
npx skills add https://dev.azure.com/org/proj/_git/repo?path=/skills/my-skill

# Direct download
npx skills add https://example.com/skill.tar.gz
```

### 3. Reproducible Installations

Lock files ensure same versions across environments and team members.

```bash
# skills-lock.json checked into version control
# Each clone/checkout restores exact same skills
npx skills experimental_install  # Restore from lock file
```

### 4. Efficient Update Detection

Uses GitHub Trees API for O(1) change detection instead of cloning entire repos.

```bash
# Checks only metadata, not file contents
# Fast even for large skill repositories
npx skills update
```

### 5. Interactive + Non-Interactive

Works with prompts for interactive use or flags for CI/CD.

```bash
# Interactive (prompts for agents, scope, confirmation)
npx skills add vercel-labs/skills

# Non-interactive (CI/CD friendly)
npx skills add vercel-labs/skills -s design-review -a claude-code -g -y
```

### 6. Automatic Agent Detection

Detects which agents are installed, prompts for selection if needed.

```bash
# Auto-detects Claude Code, Cursor, Cline, etc
npx skills add my-skills

# Or force specific agents
npx skills add my-skills -a claude-code -a cursor
```

---

## Neuralabs Integration Strategy

### Phase 1: Skill Infrastructure Setup (Week 1)

**Goal:** Understand skills CLI, prepare Neuralabs skill publishing.

**Tasks:**
1. ✅ Document vercel-labs/skills CLI architecture
2. Install vercel-labs/skills locally
3. Explore existing public skill repositories (vercel-labs/agent-skills, etc)
4. Understand SKILL.md format and frontmatter requirements
5. Plan Neuralabs skill repository structure

**Deliverables:**
- Skills CLI documentation (this file)
- Neuralabs skill repository plan

---

### Phase 2: Neuralabs Skill Repository (Weeks 2-4)

**Goal:** Create Neuralabs public skill repository compatible with skills CLI.

**Tasks:**
1. Create `github.com/brunaborbam/neuralabs-skills` repository
2. Set up directory structure:
   ```
   neuralabs-skills/
   ├── README.md           # Overview, installation instructions
   ├── skills/
   │   ├── design-critique/SKILL.md
   │   ├── design-generation/SKILL.md
   │   ├── design-tdd/SKILL.md
   │   ├── design-system/SKILL.md
   │   ├── accessibility-review/SKILL.md
   │   └── [more skills]
   └── .github/CODEOWNERS
   ```
3. Create 5+ Neuralabs skills (adapted from Matt Pocock patterns)
4. Write SKILL.md templates for each
5. Test with `npx skills add brunaborbam/neuralabs-skills --list`

**Skills to Create:**
- `/design-critique` — AI-assisted design feedback (2-axis: Standards + Spec)
- `/design-generation` — Guided design generation workflow
- `/design-tdd` — Design-driven development (design → code)
- `/design-system` — Design system management (tokens, components)
- `/accessibility-audit` — WCAG compliance auditing
- `/figma-handoff` — Developer handoff from Figma (design → specs → code)

**Deliverables:**
- Public skills repository
- 5+ production skills
- skills-lock.json for reproducible installs

---

### Phase 3: Distribution (Weeks 5+)

**Goal:** Make Neuralabs skills discoverable and easy to install.

**Tasks:**
1. Register skills in `vercel-labs/skills` wellknown provider
2. Create install instructions in Neuralabs documentation
3. Add to `skills.sh` registry (if possible)
4. Support across all agents (Claude Code, Cursor, Cline, etc)
5. Version management and updates

**Installation Command:**
```bash
npx skills add brunaborbam/neuralabs-skills --all
```

---

## SKILL.md Format Reference

Every skill is a directory containing a `SKILL.md` file with YAML frontmatter:

```markdown
---
name: design-critique
description: Get structured design feedback on usability, hierarchy, and consistency
triggers: "review this design", "critique this mockup", "what do you think of this screen?"
---

# Design Critique

Get structured feedback on your design...

## Usage

Describe your design or share a screenshot.

## Feedback Dimensions

- **Usability:** Does the interface work intuitively?
- **Hierarchy:** Is visual hierarchy clear?
- **Consistency:** Does it follow the design system?
- **Accessibility:** Is it WCAG 2.1 AA compliant?
```

**Frontmatter Fields:**
- `name` (required): Skill identifier (lowercase, hyphens)
- `description` (required): 1-2 sentence overview
- `triggers` (optional): Natural language patterns that activate this skill
- Other metadata as needed

---

## Comparison: Matt Pocock Skills vs Vercel Skills CLI

| Aspect | Matt Pocock | Vercel Skills CLI |
|--------|------------|-------------------|
| **Distribution** | Claude Code plugin OR editable npm | Universal CLI + registry |
| **Multi-Agent** | Claude Code only | 75+ agents |
| **Installation** | `claude plugin install` OR `npx skills add` | `npx skills add` (unified) |
| **Versioning** | Git-based | Lock files (git + GitHub API) |
| **Update Detection** | Git clone | GitHub Trees API (O(1)) |
| **Private Repos** | Supported | Supported (git credentials) |
| **Well-Known Registry** | Per-agent (Claude Code) | Universal (GitHub orgs, etc) |
| **Scope** | Engineering-specific | Universal (all domains) |

**Neuralabs Use:** Publish skills via both channels
- Matt Pocock marketplace (managed, read-only, Claude Code focused)
- vercel-labs/skills CLI (self-service, multi-agent, open-source focused)

---

## Key Learnings for Neuralabs

### 1. Universal Installation, Not Universal Code

Skills CLI abstracts the agent differences away. Single `npx skills add` command works for Claude Code, Cursor, Cline, etc.

**Neuralabs Pattern:**
```bash
# One command to install to all agents
npx skills add brunaborbam/neuralabs-skills --all

# Behind the scenes: symlinks to ~/.claude/skills/, ~/.cursor/skills/, etc
```

### 2. Reproducible via Lock Files

Lock files (like package-lock.json) ensure exact versions across environments.

**Neuralabs Pattern:**
- Check in `skills-lock.json` to version control
- Team members run `npx skills experimental_install` to restore exact versions
- No "skills drift" across team

### 3. Efficient Update Detection

GitHub Trees API provides O(1) change detection without cloning entire repos.

**Neuralabs Pattern:**
- Large skill repositories (1000s of designs) stay fast
- Update checks complete in milliseconds
- No need to download full history

### 4. Private Repository Support

Full support for private repos via git credentials (SSH, HTTPS, GitHub CLI).

**Neuralabs Pattern:**
- Internal skills repository for company-specific workflows
- Install via: `npx skills add git@github.com:acme/internal-skills.git`

### 5. Graceful Degradation

Works on any system that has git + npm. No special tools needed.

**Neuralabs Pattern:**
- Works in GitHub Codespaces, local dev, CI/CD, WSL, etc
- No agent-specific setup required beyond agent installation

---

## References

- Repository: https://github.com/vercel-labs/skills
- Package: https://www.npmjs.com/package/skills
- Skills Registry: https://skills.sh/
- Source Code: [GitHub](https://github.com/vercel-labs/skills) (TypeScript, ~1000 lines)

---

**Documentation Status:** Complete  
**Last Updated:** Sep 22, 2024  
**Neuralabs Integration Strategy:** Phase 1-3 planning complete


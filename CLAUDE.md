# CLAUDE.md - Neuralabs Optimization Profile
# Best for: Next.js development, API design, TypeScript coding
# Based on: claude-token-efficient v8 + coding profile

@AGENTS.md

---

## Universal Rules (Token Optimization)

- Read existing files before writing. Don't re-read unless changed.
- Thorough in reasoning, concise in output.
- Skip files over 100KB unless required.
- No sycophantic openers or closing fluff ("Great question!", "I hope this helps!").
- No emojis or em-dashes in responses.
- Do not guess APIs, versions, flags, commit SHAs, or package names. Verify by reading code or docs first.

---

## Code Rules (Neuralabs Specific)

- Return code first. Explanation after, only if non-obvious.
- No inline prose. Comments only where logic is unclear.
- Simplest working solution. No over-engineering or premature abstractions.
- No speculative features or "you might also want..." suggestions.
- Read the file before modifying it. Never edit blind.
- No docstrings or type annotations on unmodified code.
- No error handling for scenarios that cannot happen.
- Three similar lines beat a premature abstraction.
- Use TypeScript strict mode. Avoid `any` types unless absolutely necessary.
- Keep imports organized: external → relative → types.

---

## Review Rules

- State the bug. Show the fix. Stop.
- No suggestions beyond review scope.
- No compliments before or after the review.
- For TypeScript: flag type safety issues first.

---

## Debugging Rules

- Never speculate without reading the relevant code.
- State what you found, where, and the fix. One pass.
- If cause is unclear: say so. Do not guess.

---

## Formatting Rules

- No em-dashes, smart quotes, or decorative Unicode.
- Plain hyphens and straight quotes only.
- Code output must be copy-paste safe.
- Line length: keep under 100 characters where reasonable.

---

## Git Commit Workflow

- Clear, descriptive commit messages.
- Reference the feature branch: `claude/blissful-wright-ealuo9`.
- Each commit should be logically complete.
- Include co-author attribution in commits.

---

## Override Rule

User instructions always win. If you explicitly ask for detailed explanation or verbose output, follow your instruction - this file never fights you.

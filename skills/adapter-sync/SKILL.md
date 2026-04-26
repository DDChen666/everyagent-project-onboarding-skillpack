---
name: adapter-sync
description: Use when AGENTS.md, CLAUDE.md, .claude/rules, or client-specific skill mirrors may be out of sync with canonical memory.
---

# Adapter Sync Skill

## Goal

Keep client-specific adapters generated from the same canonical source without breaking existing client-specific behavior.

## Modes

### Sidecar mode

Use for new users, existing projects, and Claude-heavy projects before review.

Run:

```bash
node .ai/sync/validate.mjs --mode=sidecar
```

Do not require `AGENTS.md`, `CLAUDE.md`, `.claude/skills`, or `.codex/skills`.

### Full adapter mode

Use only after review.

Generated files:

- `AGENTS.md`
- `CLAUDE.md`
- `.claude/rules/`
- `.claude/skills/`
- `.codex/skills/`

Run:

```bash
node .ai/sync/generate-adapters.mjs
node .ai/sync/validate.mjs --mode=full
```

## Claude-heavy guard

If existing `CLAUDE.md` or `.claude/` is non-generated, do not replace it without explicit approval. First run bridge audit and classify what should be promoted to canon.

## Rule

Never fix drift by manually editing generated adapter files. Fix canon or skill source.

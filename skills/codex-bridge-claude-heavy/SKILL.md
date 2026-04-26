---
name: codex-bridge-claude-heavy
description: Use when Codex is entering a project that was previously operated mainly by Claude Code, especially with CLAUDE.md, .claude/rules, .claude/skills, MCP tools, or private memory assumptions.
---

# Codex Bridge for Claude-heavy Projects

## Goal

Let Codex understand repo-visible Claude Code state without pretending to know invisible Claude private memory.

## Required posture

Codex must behave as a read-only auditor until a bridge plan is reviewed.

Do not perform Risk 2 or Risk 3 changes during first contact.

## Procedure

1. Read `CLAUDE.md` if present.
2. Inventory `.claude/rules/`, `.claude/skills/`, settings, hooks, and MCP config.
3. Identify Claude-specific tools and assumptions.
4. Classify each claim as:
   - cross-agent canon candidate
   - Claude-only rule
   - Codex adapter candidate
   - stale or conflicting evidence
   - unknown
5. Produce or update:
   - `.ai/reports/existing-claude-state.local.md`
   - `.ai/reports/codex-bridge-plan.local.md`
   - `.ai/reports/unknowns.local.md`
6. Ask for review before full adapter sync.

## Unknowns that must be stated

- Claude private/auto memory is not visible.
- Prior Claude conversations are not visible unless documented.
- MCP runtime permissions may differ.
- Tool availability may differ.
- User taste and style preferences may be incomplete.

## Suggested command

```bash
node .ai/sync/scan-project.mjs --claude-bridge
node .ai/sync/validate.mjs --mode=sidecar
```

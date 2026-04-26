---
name: project-audit
description: Use to inspect an existing project, especially one with unclear structure, old docs, or prior agent activity, without making risky changes.
---

# Project Audit Skill

## Goal

Create an evidence-based view of the project before canonicalizing anything.

## Audit areas

- top-level structure
- README claims
- docs claims
- manifests and package managers
- tests and validation commands
- CI/deployment files
- existing AI files
- Claude Code files and memory adapters
- Codex files and memory adapters
- MCP/tool configs
- workflows and automation
- unknowns and contradictions

## Existing Claude Code state

When `CLAUDE.md` or `.claude/` exists, produce:

- `.ai/reports/existing-claude-state.local.md`
- `.ai/reports/codex-bridge-plan.local.md`
- `.ai/reports/unknowns.local.md`

Classify each Claude-specific claim as:

- cross-agent canon candidate
- Claude-only adapter rule
- obsolete/stale evidence
- conflict requiring human review
- unknown requiring more evidence

## Evidence table format

| Claim | Source | Confidence | Freshness | Conflict | Suggested action |
|---|---|---|---|---|---|

## Output files

Recommended:

- `.ai/reports/project-archaeology.local.md`
- `.ai/reports/existing-claude-state.local.md`
- `.ai/reports/codex-bridge-plan.local.md`
- `.ai/reports/unknowns.local.md`
- `.ai/reports/risk-register.local.md`

## Rule

Do not rewrite project docs during audit. Report first.

# Claude-to-Codex Bridge Checklist

Use this checklist when Codex is first introduced to a Claude Code-heavy project.

## Required posture

- Codex starts as a read-only auditor.
- Codex must not perform Risk 2 or Risk 3 actions.
- Codex must not replace Claude-specific files on first pass.

## Inventory

- [ ] Read `CLAUDE.md` if present.
- [ ] Inventory `.claude/rules/`.
- [ ] Inventory `.claude/skills/`.
- [ ] Inventory `.claude/settings*.json`.
- [ ] Inventory MCP config such as `.mcp.json`, `mcp.json`, or client-specific config.
- [ ] Inventory hooks.
- [ ] Inventory existing `AGENTS.md` and `.codex/` if present.

## Classification

Classify each observed rule or memory as:

- [ ] cross-agent canon candidate
- [ ] Claude-only adapter rule
- [ ] Codex adapter candidate
- [ ] stale/obsolete evidence
- [ ] conflict requiring human review
- [ ] unknown requiring more evidence

## Required reports

- [ ] `.ai/reports/existing-claude-state.local.md`
- [ ] `.ai/reports/codex-bridge-plan.local.md`
- [ ] `.ai/reports/unknowns.local.md`

## Stop conditions

Stop and ask for review before:

- replacing `CLAUDE.md`
- replacing `.claude/`
- enabling full adapter sync
- modifying MCP config
- changing README/docs/source code

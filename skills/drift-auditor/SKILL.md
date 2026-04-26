---
name: drift-auditor
description: Use to detect whether Claude Code, Codex, MCP policy, skills, or memory files have diverged.
---

# Drift Auditor Skill

## Drift types

- instruction drift: `AGENTS.md` and `CLAUDE.md` imply different behavior
- skill drift: `.claude/skills` and `.codex/skills` differ
- memory drift: private or proposed memory conflicts with canon
- MCP drift: client tool configuration differs from canonical MCP policy
- docs drift: README/docs conflict with canon
- command drift: actual package scripts differ from `.ai/canon/50_commands.yaml`

## Procedure

1. Run `node .ai/sync/validate.mjs`.
2. Compare current adapters with generated output.
3. Compare skill mirrors.
4. Inspect proposed memory inbox for unresolved claims.
5. Check project-specific commands against manifests.
6. Report unresolved drift.

## Output

A drift report should include:

- drift type
- affected files
- severity
- recommended source of truth
- recommended fix

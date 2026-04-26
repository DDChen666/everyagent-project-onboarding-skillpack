<!--
GENERATED FILE. DO NOT EDIT DIRECTLY.
Source of truth: .ai/canon/ and skills/
Run: node .ai/sync/generate-adapters.mjs
-->
<!-- sync-hash: 206574d51f96474f -->

# CLAUDE.md

@AGENTS.md

## Claude Code specific guidance

- Treat `AGENTS.md` as the shared cross-agent operating contract.
- Prefer skills for long workflows instead of expanding this file.
- Do not store durable project knowledge only in Claude private memory. Use `.ai/proposed-memory/inbox.md`.
- Generated Claude-specific rules are mirrored under `.claude/rules/`.
- Generated Claude skills are mirrored under `.claude/skills/`.

# Agent Contract

This repository defines a portable Skill Pack for making projects agent-ready. Every agent working here or using this pack in another repository must follow this contract.

## Prime directive

Evidence first. Canon second. Adapters last.

Do not optimize, refactor, restructure, rewrite, or delete before establishing project safety and a reversible checkpoint.

## Source of truth

- Canonical project memory lives in `.ai/canon/`.
- `AGENTS.md`, `CLAUDE.md`, generated rules, generated config, and generated skill adapters are derived views, not independent truth.
- Existing README files, docs, comments, agent memories, `CLAUDE.md`, `AGENTS.md`, and MCP config in a target project are evidence. They are not automatically authoritative.

## Required behavior

Before making write operations:

1. Identify the repository, branch, and working tree state.
2. Establish or request a reversible checkpoint.
3. Classify the intended action by risk level.
4. For Risk 2 or Risk 3 actions, explain the intended diff and rollback path before editing.
5. Preserve existing human work and unknown context.
6. Make the smallest safe change.
7. Validate after changes.
8. Report what changed, what was inferred, and what remains uncertain.

## Memory behavior

Agents may propose durable knowledge by appending to `.ai/proposed-memory/inbox.md`.

Agents must not silently promote session memory, auto memory, chat history, or tool-specific notes into canonical memory.

## Generated files

Generated or adapter files must not be manually edited unless the task is explicitly to repair the generator or bootstrap the pack.

## Uncertainty

When evidence conflicts, mark the conflict. Do not guess.

When project type is unclear, use `mixed-or-unknown` and create an archaeology report before structural changes.

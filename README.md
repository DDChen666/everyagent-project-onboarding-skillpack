# EveryAgent Project Onboarding Skillpack

A safety-first Skill Pack for turning any repository into an agent-ready project that Claude Code, Codex, and other capable agents can enter with highly aligned memory, rules, tools, and judgment.

This repository is intentionally conservative. The pack does **not** tell agents to immediately refactor, restructure, or rewrite a project. It teaches them to establish a reversible checkpoint, classify risk, collect evidence, build canonical project memory, generate tool-specific adapters, and validate drift before making high-impact changes.

## What this pack provides

- A cross-agent onboarding workflow for new, existing, messy, software, knowledge-base, writing, and creative-generation projects.
- A canonical project memory model under `.ai/canon`.
- Generated adapter patterns for `AGENTS.md`, `CLAUDE.md`, Claude rules, Codex config, skills, MCP policy, and memory proposal workflows.
- Risk gates for README, docs, directory moves, workflow files, config, dependencies, secrets, and generated files.
- A portable Python validator / generator with no third-party dependencies.
- A set of composable skills that can be used by Claude Code, Codex, or another agent that understands `SKILL.md` bundles.

## Core idea

Do not synchronize Claude Code memory with Codex memory directly.

Instead:

```text
.ai/canon/        -> source of truth
skills/           -> reusable cross-agent playbooks
templates/        -> generated adapter templates
scripts/          -> deterministic sync and validation
AGENTS.md         -> Codex-facing adapter
CLAUDE.md         -> Claude-facing adapter importing AGENTS.md
.ai/proposed-memory/ -> safe inbox for agent-discovered durable knowledge
```

Agents may propose durable memory. They may not silently canonize it.

## Quick start for this repository

```bash
python scripts/ai_agentify.py doctor
python scripts/ai_agentify.py validate
python scripts/ai_agentify.py sync
```

## Quick start for another project

Copy this pack into a target repository or vendor it as a submodule, then ask the agent:

```text
Use the project-agentification skill. First perform safety preflight. Do not make Risk 2 or Risk 3 changes until a checkpoint and rollback path exist.
```

## Risk model

| Level | Meaning | Default action |
| --- | --- | --- |
| Risk 0 | Read-only inspection and reports | Proceed |
| Risk 1 | Additive `.ai/` scaffolding or draft reports | Proceed with report |
| Risk 2 | README, docs, agent adapters, MCP config, skill config | Explain plan before edit |
| Risk 3 | Directory moves, deletes, build/deploy/test changes, lockfiles, workflow JSON, secrets-adjacent config | Require explicit approval and rollback plan |

## Repository layout

```text
.ai/canon/                 canonical memory for this pack
.ai/proposed-memory/       inbox for candidate durable memory
.ai/sync/                  sync manifest and implementation notes
skills/                    portable agent skills
scripts/                   deterministic validator / generator
templates/                 adapter templates
schemas/                   JSON schemas for canonical memory files
docs/                      design and operating policy
AGENTS.md                  generated Codex-facing adapter
CLAUDE.md                  Claude-facing bridge importing AGENTS.md
```

## Current status

`v0.1.0` foundation. This is a complete first working structure: skill definitions, canonical memory, adapter templates, validation script, CI, and operating docs are present. It should be reviewed before being used to modify high-risk production repositories.

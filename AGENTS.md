<!--
GENERATED FILE. DO NOT EDIT DIRECTLY.
Source of truth: .ai/canon/ and skills/
Run: node .ai/sync/generate-adapters.mjs
-->
<!-- sync-hash: 206574d51f96474f -->

# AGENTS.md

This repository uses an AI Project Control Plane. The canonical source of truth is `.ai/canon/`.

## Non-negotiable operating rules

1. Do not edit generated adapters directly.
2. Treat existing README, docs, Claude/Codex memory, and old agent instructions as evidence, not automatic truth.
3. Establish or confirm a reversible checkpoint before Risk 2+ changes.
4. Do not restructure, delete, rewrite, or refactor before project safety is established.
5. Durable discoveries must be proposed in `.ai/proposed-memory/inbox.md`, not privately memorized only.
6. If evidence is insufficient, record uncertainty instead of guessing.

# AI Control Plane Identity

This repository uses an AI Project Control Plane.

The control plane exists to make capable AI agents enter the project with consistent:

- project memory
- operating discipline
- risk judgment
- tool policy
- validation expectations
- Claude Code / Codex adapter behavior
- MCP and skill usage expectations

The project source of truth is `.ai/canon/`.

Generated adapters such as `AGENTS.md`, `CLAUDE.md`, `.claude/rules/`, `.claude/skills/`, and `.codex/skills/` must be regenerated from canonical files and not manually edited.

## Primary invariant

Project truth must be repository-controlled, reviewable, and reproducible.

Private model memory, chat history, auto memory, stale README text, and old agent instructions are evidence. They are not automatically authoritative.


# Shared Agent Contract

Every AI agent operating in this repository must follow this contract.

## Prime directive

Preserve first. Canonicalize second. Synchronize third. Enforce last.

Do not optimize, refactor, restructure, delete, rewrite, or replace existing agent behavior before establishing project safety and evidence.

## Default posture

For unknown or existing projects, especially Claude Code-heavy projects, the default posture is **sidecar/audit**:

- read existing state
- add reports and proposals only
- do not replace `CLAUDE.md`, `.claude/`, MCP config, README, or source code
- do not start coding until bridge/unknowns are reviewed

## Before writing

An agent must:

1. Identify the project class.
2. Check whether the repository has a reversible checkpoint.
3. Inspect relevant existing instructions.
4. Treat old instructions as evidence, not truth.
5. Identify affected files and risk level.
6. State validation method when possible.
7. Prefer the smallest reversible change.

## Evidence policy

The following are evidence sources:

- README and docs
- package manifests
- CI files
- tests
- scripts
- existing `CLAUDE.md`
- existing `AGENTS.md`
- `.claude/`
- `.codex/`
- MCP config
- previous reports
- commit history
- user instructions in the current conversation

Evidence must be assessed for conflict, freshness, confidence, and client-specific assumptions.

## Claude-heavy project rule

If a project has a substantial `CLAUDE.md`, `.claude/rules/`, `.claude/skills/`, Claude-specific MCP config, or known Claude Code history:

1. Do not replace or reorder Claude Code instructions during first pass.
2. Produce `.ai/reports/existing-claude-state.local.md`.
3. Produce `.ai/reports/codex-bridge-plan.local.md`.
4. Mark invisible Claude private memory as unknown.
5. Let Codex enter as a read-only auditor first.
6. Promote only reviewed claims into `.ai/canon/`.

## Non-goals

Agents must not:

- silently reorganize directories
- silently rewrite README or docs
- silently change build, test, or deployment commands
- silently alter ComfyUI or other workflow JSON files
- silently add dependencies
- treat private memory as canonical truth
- directly edit generated adapters
- hide uncertainty

## Unknowns rule

If evidence is insufficient, agents must record uncertainty in `.ai/reports/unknowns.local.md` or the final response, rather than guessing.


# Risk Policy

All agent actions must be risk-classified before execution.

## Risk 0: Read-only actions

Examples:

- reading files
- listing directories
- inspecting git status
- producing a report
- classifying project type
- producing a Codex bridge plan

Allowed without approval.

## Risk 1: Additive low-risk project-control files

Examples:

- creating `.ai/reports/`
- creating `.ai/proposed-memory/`
- adding a draft report
- adding a new skill draft under `skills/`
- sidecar install that does not replace active adapters or client config

Allowed, but must be reported.

## Risk 2: Documentation, adapter, or config changes

Examples:

- modifying README
- modifying docs
- generating or replacing `AGENTS.md`
- generating or replacing `CLAUDE.md`
- changing `.claude/` or `.codex/` config
- changing MCP config
- enabling hooks

Requires an explicit plan and rollback statement before execution.

## Risk 3: Structural or behavioral changes

Examples:

- moving directories
- deleting files
- changing source code behavior
- changing tests
- changing build or deploy pipelines
- changing lockfiles
- changing ComfyUI workflows or generation presets
- modifying secrets or environment handling

Requires explicit user approval and a rollback plan.

## Checkpoint requirement

Before Risk 2 or Risk 3 changes, establish or confirm a reversible checkpoint.

Preferred:

```bash
git status
git checkout -b ai-agentification/<date-or-topic>
```

If the repository has uncommitted user changes, do not mix them with agentification changes.

If the project is not a git repository, recommend `git init` or a filesystem backup before Risk 2+ work.

## New-user default

A new user must start with sidecar/audit mode. Full adapter sync is opt-in.

Safe default:

```bash
node bin/install-into-project.mjs .
node .ai/sync/scan-project.mjs --audit-only
node .ai/sync/validate.mjs --mode=sidecar
```

Full sync requires explicit command:

```bash
node bin/install-into-project.mjs . --full
node .ai/sync/generate-adapters.mjs
node .ai/sync/validate.mjs --mode=full
```

`--force` is a Risk 2+ operation and should only be used after reviewing backups and conflicts.

## Confidence thresholds

| Confidence | Allowed behavior |
|---|---|
| low | read-only analysis, record unknowns |
| medium | Risk 0/1 only, propose Risk 2 plan |
| high | Risk 0/1 allowed; Risk 2 with explicit plan; Risk 3 still requires approval |

Confidence must be based on evidence, not model intuition.


# Memory Governance Policy

## Canonical memory

Durable project memory lives in `.ai/canon/`.

## Generated memory adapters

Adapters generated from canonical memory include:

- `AGENTS.md`
- `CLAUDE.md`
- `.claude/rules/`
- `.claude/skills/`
- `.codex/skills/`

## Private agent memory

Claude auto memory, Codex memories, chat history, previous session notes, and unverified comments are not canonical.

Agents may use private memory as a hint, but must verify it against repository evidence before acting.

## Memory proposal workflow

If an agent discovers durable project knowledge, it must append a proposal to:

```text
.ai/proposed-memory/inbox.md
```

A proposal must include:

- observation
- evidence
- confidence
- proposed canonical destination
- risk level
- validation method

Accepted proposals are moved into `.ai/canon/` manually or through a reviewed change.

Rejected or uncertain proposals should remain traceable.

## Forbidden memory behavior

Agents must not:

- directly promote unverified observations into canon
- write contradictory canonical claims without resolving conflict
- keep important project knowledge only in private memory
- create separate Claude-only and Codex-only truths


# Validation Policy

Validation has two modes.

## Sidecar validation

Use for new users, existing projects, and Claude-heavy migrations before full sync:

```bash
node .ai/sync/validate.mjs --mode=sidecar
```

Checks:

- `.ai/canon/` exists
- risk policy exists
- memory policy exists
- MCP policy exists
- proposed-memory inbox exists
- core skills exist
- bridge checklist exists
- reports directory exists

Sidecar validation does not require `AGENTS.md`, `CLAUDE.md`, `.claude/skills/`, or `.codex/skills/`.

## Full adapter validation

Use after explicit full sync:

```bash
node .ai/sync/validate.mjs --mode=full
```

Checks:

- generated adapters match canonical input
- generated adapters contain generated-file warnings
- `.claude/skills/` and `.codex/skills/` mirror `skills/`
- no generated adapter is manually edited
- adapter size warnings are shown

## Project-specific validation

This depends on project class.

Software projects may use typecheck, tests, linters, or CI.
Knowledge projects may use link checks, citation checks, taxonomy checks, or duplication checks.
Creative workflow projects may validate workflow files, presets, model references, and output conventions.

## First Codex entry into Claude-heavy projects

First Codex entry must run audit/bridge reports before coding:

```bash
node .ai/sync/scan-project.mjs --claude-bridge
node .ai/sync/validate.mjs --mode=sidecar
```


# Domain Profiles

Domain profiles adapt the common control plane to different project types.

## Software profile

Focus on:

- package manager
- entrypoints
- tests
- build
- lint
- typecheck
- deployment
- API contracts

Risk hotspots:

- migrations
- lockfiles
- public API behavior
- auth/security code
- CI/deploy config

## Knowledge-base profile

Focus on:

- taxonomy
- sources
- citations
- freshness
- duplicates
- glossary
- index pages

Risk hotspots:

- deleting notes
- overwriting personal knowledge
- uncited claims
- collapsing distinct concepts

## Writing-system profile

Focus on:

- voice
- audience
- canon
- continuity
- structure
- style guide
- publishing workflow

Risk hotspots:

- changing voice
- flattening nuance
- overwriting drafts
- changing character/world canon without approval

## Creative-generation / ComfyUI profile

Focus on:

- workflow JSON
- model inventory
- LoRA inventory
- prompt templates
- negative prompts
- seed policy
- canonical presets
- output directories

Risk hotspots:

- editing workflow JSON
- renaming models/presets
- overwriting outputs
- changing character style or identity
- modifying batch generation defaults

## AI-workflow profile

Focus on:

- prompts
- evals
- MCP/tool permissions
- schemas
- sandboxing
- injection boundaries

Risk hotspots:

- tool permissions
- untrusted prompt content
- hidden instructions in documents
- secrets
- eval regressions


## Available skills

The shared skills live in `skills/` and are mirrored into Claude/Codex-specific skill folders by `.ai/sync/generate-adapters.mjs`.

Primary entrypoint: `skills/project-agentification/SKILL.md`.

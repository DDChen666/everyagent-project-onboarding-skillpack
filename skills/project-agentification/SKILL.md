---
name: project-agentification
description: Use when entering any existing or new project and you need to make it reliable for Claude Code, Codex, MCP-enabled agents, and future AI sessions. Establishes safety, audits evidence, builds canonical project memory, generates adapters, and validates drift.
---

# Project Agentification Skill

## Goal

Transform a project into an agent-ready canonical state while preserving existing behavior first.

The desired state is:

- one repository-controlled source of truth
- Claude Code and Codex adapters generated from the same canon when full sync is approved
- shared skills mirrored across clients when safe
- MCP policy aligned across clients
- proposal-only durable memory workflow
- validation and drift detection in place

## Non-goals

Do not:

- refactor code unless explicitly requested
- restructure directories unless explicitly approved
- silently rewrite README or documentation
- silently change build, test, deploy, workflow, or generation behavior
- treat old agent memory as truth
- directly edit generated adapters
- replace a Claude Code-heavy setup during first pass

## Prime directive

Preserve first. Canonicalize second. Synchronize third. Enforce last.

Evidence first. Canon second. Adapters last.

## Phase 0: Safety preflight

Before any write operation:

1. Check whether this is a git repository.
2. Check current branch.
3. Check working tree status.
4. If uncommitted changes exist, do not perform Risk 2+ changes without explicit user direction.
5. Recommend a branch/checkpoint when allowed.
6. Identify sensitive files and generated files.
7. Classify intended actions by risk.

Risk policy:

- Risk 0: read-only; may proceed.
- Risk 1: additive sidecar/control-plane files; may proceed with report.
- Risk 2: README/docs/adapter/config changes; requires explicit plan and rollback statement.
- Risk 3: structural/behavioral/deleting/build/deploy/workflow changes; requires explicit approval.

## Default mode

For new users and existing projects, start in sidecar/audit mode.

Run:

```bash
node .ai/sync/doctor.mjs
node .ai/sync/scan-project.mjs --audit-only
node .ai/sync/validate.mjs --mode=sidecar
```

Do not run full adapter sync until the user has reviewed reports.

## Claude-heavy project rule

If `CLAUDE.md`, `.claude/`, Claude-specific skills, Claude MCP config, or known Claude Code history exists:

1. Treat the project as Claude-heavy.
2. Do not replace `CLAUDE.md` or `.claude/` on first pass.
3. Generate these reports first:
   - `.ai/reports/existing-claude-state.local.md`
   - `.ai/reports/codex-bridge-plan.local.md`
   - `.ai/reports/unknowns.local.md`
4. Codex must enter as a read-only auditor first.
5. Classify Claude-specific claims before syncing to Codex.

## Phase 1: Classify the project

Classify the project as one or more:

- software
- knowledge-base
- writing-system
- creative-generation
- ai-workflow
- data-project
- mixed-or-unknown

If uncertain, classify as mixed-or-unknown and perform read-only archaeology first.

## Phase 2: Collect evidence

Inspect, as available:

- README
- docs
- package manifests
- CI
- tests
- scripts
- workflows
- existing `CLAUDE.md`
- existing `AGENTS.md`
- `.claude/`
- `.codex/`
- MCP configuration
- recent git history

Treat all existing instructions as evidence, not truth.

## Phase 3: Audit existing agent memory

For every existing agent-related file:

- extract claims
- identify source
- mark confidence
- mark conflicts
- mark staleness
- mark tool-specific assumptions
- identify whether the claim should become canonical, remain adapter-specific, or be rejected

Do not merge contradictory rules silently.

## Phase 4: Build or update canon

Create or update `.ai/canon/` only after evidence is strong or the user approves.

For project-specific discoveries, prefer memory proposals unless the evidence is strong and the user asked to canonize.

## Phase 5: Generate adapters, only after review

Full sync is opt-in.

Run:

```bash
node .ai/sync/generate-adapters.mjs
node .ai/sync/validate.mjs --mode=full
```

If existing non-generated `AGENTS.md` or `CLAUDE.md` exists, generation will refuse to overwrite unless `--force` is used. Do not use `--force` without approval and rollback plan.

## Phase 6: Report

Produce a report with:

- what changed
- what was only observed
- what was inferred
- what remains uncertain
- risk level of changes
- validation performed
- validation not performed
- next safest steps

## Completion criteria

The project is agent-ready when:

- `.ai/canon/` exists and is coherent
- sidecar validation passes
- bridge reports exist for Claude-heavy projects
- full adapters exist and validate only if explicitly approved
- proposed memory workflow exists
- risk policy exists
- MCP policy exists
- unknowns are recorded rather than hidden

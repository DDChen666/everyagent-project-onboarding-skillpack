# AI Project Control Plane

[English](README.md) | [繁體中文](README.zh.md)

Portable Skill Pack and repository template for helping Claude Code, Codex, and other capable agents enter a project with aligned memory, judgment, operating discipline, and tool policy.

## Status

This project is an early control-plane scaffold, not a finished one-click automation system.

It is useful today as a structured onboarding and safety framework. It should not yet be described as perfectly ready for every project scenario because several core runtime pieces are still expected but not present in this repository, especially `.ai/canon/` and `.ai/sync/*.mjs`.

## Design Promise

This pack does not promise that agents can never make mistakes.

It promises a safer default:

- new users start in sidecar/audit mode
- existing Claude Code setups are preserved first
- full adapter sync is opt-in
- conflicts stop installation instead of being overwritten
- risky actions require an explicit plan, checkpoint, and rollback path
- unknowns are recorded instead of guessed

## Core Idea

Do not synchronize private model memories. Use a repository-controlled source of truth.

```text
.ai/canon/              canonical source of truth
.ai/reports/            audit, unknowns, bridge, and risk reports
.ai/proposed-memory/    proposal-only memory intake
skills/                 shared skills
AGENTS.md               Codex-facing adapter, generated only in full mode
CLAUDE.md               Claude Code-facing adapter, generated only in full mode
.claude/skills/         Claude skill mirror, generated only in full mode
.codex/skills/          Codex skill mirror, generated only in full mode
```

## Readiness Assessment

The pack has a strong foundation for:

- existing software repositories that need a safe audit-first AI onboarding flow
- Claude Code-heavy projects where Codex should enter as a read-only auditor first
- knowledge bases, writing systems, AI workflows, and creative-generation projects that need risk classification before edits
- teams that want shared agent rules instead of separate Claude-only and Codex-only memories

The pack is not yet perfectly ready for all scenarios because:

- `.ai/canon/` is referenced as the source of truth but is not included yet
- `.ai/sync/doctor.mjs`, `.ai/sync/scan-project.mjs`, `.ai/sync/generate-adapters.mjs`, `.ai/sync/validate.mjs`, and `.ai/sync/review-memory.mjs` are referenced but not included yet
- `npm run ai:*` scripts are package-local and are not automatically installed into target projects
- generated adapter validation is described, but the generator and validator implementation still needs to exist
- domain profiles are policy-level guidance today, not automated project-specific analyzers

Practical conclusion: this is a solid agentification specification and starter pack. It still needs the canonical memory files, sync scripts, and validation implementation before it can be called broadly production-ready.

## New-User Safe Quick Start

For an existing project, do not start with full sync.

```bash
git checkout -b ai-agentification/audit
node /path/to/ai-project-control-plane/bin/install-into-project.mjs .
node .ai/sync/doctor.mjs
node .ai/sync/scan-project.mjs --audit-only
node .ai/sync/validate.mjs --mode=sidecar
```

The default installer mode is sidecar. It does not install or overwrite:

```text
AGENTS.md
CLAUDE.md
.claude/
.codex/
MCP runtime config
README
source code
```

## Full Adapter Sync

Only after reviewing reports:

```bash
node /path/to/ai-project-control-plane/bin/install-into-project.mjs . --full
node .ai/sync/generate-adapters.mjs
node .ai/sync/validate.mjs --mode=full
```

If there are existing non-generated adapters, the generator refuses to overwrite them. Use `--force` only after review and backup.

## Claude-Heavy Project Migration

For projects deeply tied to Claude Code:

```bash
node .ai/sync/scan-project.mjs --claude-bridge
node .ai/sync/validate.mjs --mode=sidecar
```

Review:

```text
.ai/reports/existing-claude-state.local.md
.ai/reports/codex-bridge-plan.local.md
.ai/reports/unknowns.local.md
```

First Codex entry should be read-only and audit-focused.

## Repository Contents

```text
bin/        installer
docs/       Traditional Chinese operating docs
hooks/      example hook policies
schemas/    JSON Schemas for commands, MCP policy, and memory proposals
shared/     checklists and report templates
skills/     shared agent skills
```

## Main Scripts

These scripts are defined in this repository's `package.json`:

```bash
npm run ai:doctor
npm run ai:scan:audit
npm run ai:bridge-audit
npm run ai:validate:sidecar
npm run ai:sync
npm run ai:validate:full
```

Until `.ai/sync/` is added, treat these as planned workflow entrypoints rather than currently runnable commands.

## Safety Rule

Preserve first. Canonicalize second. Synchronize third. Enforce last.

---
name: canon-builder
description: Use when turning audited evidence into canonical project memory under .ai/canon.
---

# Canon Builder Skill

## Goal

Turn verified project evidence into durable canonical memory.

## Canonization criteria

A claim may enter canon only if:

- evidence is clear
- conflict has been checked
- confidence is medium or high
- the claim is useful to future agents
- the canonical destination is appropriate

## Do not canonize

- guesses
- stale comments
- unsupported README claims
- private model memory
- one-off task details
- tool-specific quirks unless explicitly adapter relevant

## Canon destinations

- project identity: `.ai/canon/00_identity.md`
- classification: `.ai/canon/05_project_classification.md`
- operating contract: `.ai/canon/10_agent_contract.md`
- risk policy: `.ai/canon/20_risk_policy.md`
- memory policy: `.ai/canon/30_memory_policy.md`
- MCP policy: `.ai/canon/40_mcp_policy.yaml`
- commands: `.ai/canon/50_commands.yaml`
- adapters: `.ai/canon/60_adapter_policy.md`
- validation: `.ai/canon/70_validation_policy.md`
- domain profiles: `.ai/canon/80_domain_profiles.md`
- architectural decisions: `.ai/canon/decisions/`

## Output

After canon changes:

```bash
node .ai/sync/generate-adapters.mjs
node .ai/sync/validate.mjs
```

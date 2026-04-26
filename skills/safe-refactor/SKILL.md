---
name: safe-refactor
description: Use only after project safety is established and the user explicitly asks for code or structure changes.
---

# Safe Refactor Skill

## Preconditions

Do not use this skill until:

- git checkpoint exists
- project class is known
- affected area is identified
- validation command is known or absence is documented
- user has approved Risk 3 actions if applicable

## Procedure

1. State target behavior to preserve.
2. Identify public interfaces.
3. Identify tests or validation.
4. Make the smallest change.
5. Run targeted validation.
6. Record changed assumptions as memory proposals if durable.

## Rule

Refactor must not be used as part of initial agentification unless explicitly requested.

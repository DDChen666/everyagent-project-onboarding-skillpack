---
name: project-intake
description: Use at the beginning of any project onboarding to establish safety, classify repository state, and decide whether write operations are allowed.
---

# Project Intake Skill

## Goal

Determine the safest way to begin work in a project.

## Intake checklist

1. Is this a git repository?
2. What branch is active?
3. Is the working tree clean?
4. Are there existing AI instruction files?
5. Are there existing MCP/tool configs?
6. Are there obvious secrets or sensitive files?
7. What project class is likely?
8. Are requested actions Risk 0, 1, 2, or 3?

## Output

Produce:

- current safety state
- project class hypothesis
- detected agent files
- detected risky areas
- allowed next actions
- actions requiring user approval

## Rule

If the working tree is dirty, do not perform Risk 2+ work unless the user explicitly says to proceed.

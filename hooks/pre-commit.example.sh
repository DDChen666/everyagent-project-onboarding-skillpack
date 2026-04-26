#!/usr/bin/env sh
set -eu

node .ai/sync/generate-adapters.mjs
node .ai/sync/validate.mjs

git diff --exit-code AGENTS.md CLAUDE.md .claude/rules .claude/skills .codex/skills

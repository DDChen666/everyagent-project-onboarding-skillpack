# Claude Code 深度綁定專案遷移指南

如果一個專案已經有大量 Claude Code 狀態，例如：

```text
CLAUDE.md
.claude/rules/
.claude/skills/
.claude/settings.json
Claude 專屬 MCP 設定
大量過去 Claude 操作習慣
```

不要直接用本專案取代它。

## 正確順序

```text
audit only
→ sidecar install
→ Claude state inventory
→ unknowns report
→ Codex bridge plan
→ small read-only Codex test
→ adapter proposal
→ full sync
```

## 指令

```bash
node .ai/sync/scan-project.mjs --claude-bridge
node .ai/sync/validate.mjs --mode=sidecar
```

會產生：

```text
.ai/reports/existing-claude-state.local.md
.ai/reports/codex-bridge-plan.local.md
.ai/reports/unknowns.local.md
```

## Codex 第一次接入

建議提示：

```text
Use project-agentification and project-audit. This is a Claude Code-heavy project. First inventory CLAUDE.md, .claude/, skills, MCP config, and reports. Treat Claude-specific state as evidence, not truth. Do not perform Risk 2 or Risk 3 changes. Produce a bridge plan before editing.
```

中文：

```text
請使用 project-agentification 與 project-audit。這是一個 Claude Code 深度綁定專案。先盤點 CLAUDE.md、.claude/、skills、MCP config 與 reports。Claude 專屬狀態只能視為 evidence，不是自動真相。不要執行 Risk 2 或 Risk 3 變更，先產出 bridge plan。
```

## 重要限制

Codex 可以理解 repo-visible 的 Claude 狀態，但不能憑空知道：

- Claude private / auto memory
- 過去聊天裡形成但沒寫入 repo 的 project lore
- 實際 MCP runtime 權限與 secrets
- 使用者隱性品味與偏好

這些都必須寫入 unknowns。

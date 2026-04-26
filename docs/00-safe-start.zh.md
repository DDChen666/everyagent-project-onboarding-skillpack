# 安全起步：新手預設流程

這個專案的預設目標不是「一鍵接管」，而是先安全地旁路安裝、盤點、產生報告。

## 新手第一步

在既有專案中：

```bash
git checkout -b ai-agentification/audit
node /path/to/ai-project-control-plane/bin/install-into-project.mjs .
node .ai/sync/doctor.mjs
node .ai/sync/scan-project.mjs --audit-only
node .ai/sync/validate.mjs --mode=sidecar
```

預設 installer 是 sidecar 模式。

它會安裝：

```text
.ai/
skills/
shared/
schemas/
hooks/ examples
docs/ai-control-plane/
```

它不會預設安裝或覆蓋：

```text
AGENTS.md
CLAUDE.md
.claude/
.codex/
MCP runtime config
README
source code
```

## 何時 full sync？

只有在你看過 reports，確認可以接管 adapter 後：

```bash
node /path/to/ai-project-control-plane/bin/install-into-project.mjs . --full
node .ai/sync/generate-adapters.mjs
node .ai/sync/validate.mjs --mode=full
```

若要覆蓋既有非 generated adapter，必須額外使用 `--force`。這是高風險動作。

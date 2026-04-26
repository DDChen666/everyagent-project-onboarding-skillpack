# 從零搭建新專案

新專案最適合直接導入本控制平面。

## 建議順序

1. 初始化 git。
2. 放入本 Skill Pack。
3. 根據專案類型修改 `.ai/canon/05_project_classification.md`。
4. 在 `.ai/canon/50_commands.yaml` 補上專案命令。
5. 執行 `node .ai/sync/generate-adapters.mjs`。
6. 執行 `node .ai/sync/validate.mjs`。
7. commit。

## 最小有效狀態

至少要有：

```text
.ai/canon/
.ai/proposed-memory/inbox.md
skills/project-agentification/SKILL.md
AGENTS.md
CLAUDE.md
```

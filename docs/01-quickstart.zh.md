# 快速開始

這套 Skill Pack 的用途，是把任何專案整理成 AI agent 進入後能穩定工作的狀態。

它不是讓 Claude Code 和 Codex 各自記一份，再互相同步。它建立一個單一真相來源：

```text
.ai/canon/
```

然後由這份 canon 產生：

```text
AGENTS.md
CLAUDE.md
.claude/rules/
.claude/skills/
.codex/skills/
```

## 第一次使用

在目標專案中建立新分支：

```bash
git checkout -b ai-agentification/initial
```

複製本 Skill Pack 到專案根目錄後執行：

```bash
node .ai/sync/doctor.mjs
node .ai/sync/generate-adapters.mjs
node .ai/sync/validate.mjs
```

## 重要規則

不要手改：

```text
AGENTS.md
CLAUDE.md
.claude/rules/
.claude/skills/
.codex/skills/
```

要改行為，請改：

```text
.ai/canon/
skills/
```

然後重新產生 adapters。

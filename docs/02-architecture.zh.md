# 架構說明

## 一句話

專案真相不放在 agent 腦袋裡，而放在 repo 裡。

## 主要結構

```text
.ai/canon/              正式記憶與政策
.ai/proposed-memory/    agent 發現的新知識提案
.ai/sync/               生成與驗證腳本
skills/                 共享 Skill Pack 原始來源
AGENTS.md               Codex adapter
CLAUDE.md               Claude Code adapter
.claude/rules/          Claude rules mirror
.claude/skills/         Claude skills mirror
.codex/skills/          Codex skills mirror
```

## 為什麼不是直接同步 Claude / Codex 記憶？

因為私有記憶不可審核、不可重現、容易漂移。

穩定做法是：

```text
canon → generated adapters → validation
```

## 哪些東西是生成的？

生成物不該手改。它們是 canon 的投影，不是真相本身。

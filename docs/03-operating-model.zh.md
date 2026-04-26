# 操作模型

## 風險分級

Risk 0：只讀取、盤點、報告。可以直接做。

Risk 1：新增 `.ai/`、報告、Skill 草稿等低風險 additive 檔案。可以做，但要報告。

Risk 2：修改 README、docs、AGENTS.md、CLAUDE.md、agent config、MCP config。需要先說明計畫與 rollback。

Risk 3：搬目錄、刪檔、改行為、改 build/test/deploy、改 workflow JSON、改 lockfile。需要明確同意。

## 信心原則

低信心：只讀取與記錄 unknown。

中信心：只做 Risk 0/1，提出 Risk 2 計畫。

高信心：可以做 Risk 0/1；Risk 2 仍要先說明；Risk 3 永遠要明確同意。

## 核心紀律

有風險的事，不能默默做。

不確定的事，不能假裝知道。

持久知識，不能只存在 agent 私有記憶。

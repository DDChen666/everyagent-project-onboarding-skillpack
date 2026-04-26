# 導入既有專案

既有專案最危險，因為可能已經有舊 README、舊 docs、舊 CLAUDE.md、舊 AGENTS.md、舊 prompt、舊 MCP config。

這些都只能當 evidence，不直接當 truth。

## 推薦流程

1. 建立分支。
2. 執行 doctor。
3. 執行 scan。
4. 檢查 `.ai/reports/project-archaeology.local.md`。
5. 把可信資訊整理到 `.ai/canon/`。
6. 執行 generate-adapters。
7. 執行 validate。
8. 人類 review diff。

## 不該做的事

- 一開始就重構。
- 一開始就整理目錄。
- 一開始就改 README 成看起來更漂亮。
- 一開始就相信舊 agent 記憶。
- 一開始就刪除看起來沒用的檔案。

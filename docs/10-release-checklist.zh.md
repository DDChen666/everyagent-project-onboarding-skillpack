# 發布與導入檢查表

導入到任何專案前，確認：

- [ ] 已建立 git branch 或備份
- [ ] `node .ai/sync/doctor.mjs` 已執行
- [ ] `node .ai/sync/generate-adapters.mjs` 已執行
- [ ] `node .ai/sync/validate.mjs` 已通過
- [ ] AGENTS.md / CLAUDE.md 沒有手改
- [ ] `.claude/skills` 與 `.codex/skills` 與 `skills/` 同步
- [ ] `.ai/proposed-memory/inbox.md` 存在
- [ ] README 或 docs 如需修改，已明確列為 Risk 2
- [ ] 目錄結構或行為如需修改，已明確列為 Risk 3
- [ ] 未完成或不確定事項已記錄

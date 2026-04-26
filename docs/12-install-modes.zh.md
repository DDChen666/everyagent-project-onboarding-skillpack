# 安裝模式

## Sidecar 模式，預設

```bash
node bin/install-into-project.mjs /path/to/project
```

適合：

- 新手
- 既有專案
- Claude Code 深度綁定專案
- 混亂專案

特性：不接管 active adapters，不碰 `CLAUDE.md` / `.claude/` / `AGENTS.md` / `.codex/`。

## Dry run

```bash
node bin/install-into-project.mjs /path/to/project --dry-run
```

只顯示會做什麼。

## Full 模式

```bash
node bin/install-into-project.mjs /path/to/project --full
```

適合新專案或已經 review 過的專案。

## Force

```bash
node bin/install-into-project.mjs /path/to/project --full --force
```

高風險。會備份衝突檔案後覆蓋。只應在人工 review 後使用。

# AI Project Control Plane

[English](README.md) | [繁體中文](README.zh.md)

這是一套可攜式 Skill Pack 與 repository template，目標是讓 Claude Code、Codex，以及其他具備工具能力的 agent 進入專案時，能共享一致的專案記憶、判斷規則、操作紀律與工具政策。

## 目前狀態

這個專案目前是早期 control-plane scaffold，不是完成版的一鍵自動化系統。

它現在已經適合作為結構化的 onboarding 與安全治理框架使用。不過，它還不能被描述成已經對所有專案情境都完美 ready，因為 repo 裡仍缺少幾個核心 runtime 組件，尤其是 `.ai/canon/` 與 `.ai/sync/*.mjs`。

## 設計承諾

這套 pack 不承諾 agent 永遠不會犯錯。

它承諾提供更安全的預設值：

- 新使用者預設從 sidecar/audit 模式開始
- 既有 Claude Code 設定先保留，不直接取代
- full adapter sync 必須明確 opt-in
- 遇到衝突時停止安裝，而不是默默覆蓋
- 高風險行動需要明確計畫、checkpoint 與 rollback path
- 不確定事項要記錄，而不是猜測

## 核心概念

不要同步私有模型記憶。改用 repository-controlled source of truth。

```text
.ai/canon/              canonical source of truth
.ai/reports/            audit, unknowns, bridge, and risk reports
.ai/proposed-memory/    proposal-only memory intake
skills/                 shared skills
AGENTS.md               Codex-facing adapter, generated only in full mode
CLAUDE.md               Claude Code-facing adapter, generated only in full mode
.claude/skills/         Claude skill mirror, generated only in full mode
.codex/skills/          Codex skill mirror, generated only in full mode
```

## Ready 程度分析

這套 pack 對以下情境已經有很好的基礎：

- 需要安全 audit-first AI onboarding 的既有軟體 repo
- Claude Code 深度使用過、但希望 Codex 先以 read-only auditor 進入的專案
- 需要在改動前做風險分類的知識庫、寫作系統、AI workflow、creative-generation 專案
- 希望用共享 agent rules 取代 Claude-only / Codex-only 分裂記憶的團隊

但它目前還不是對所有情境都完美 ready，原因是：

- `.ai/canon/` 被設計成 source of truth，但目前尚未包含在 repo 中
- `.ai/sync/doctor.mjs`、`.ai/sync/scan-project.mjs`、`.ai/sync/generate-adapters.mjs`、`.ai/sync/validate.mjs`、`.ai/sync/review-memory.mjs` 都已被文件引用，但目前尚未包含在 repo 中
- `npm run ai:*` scripts 目前只存在於本 repo 的 `package.json`，不會自動安裝到目標專案
- generated adapter validation 已經被設計出來，但 generator 與 validator 的實作仍需補上
- domain profiles 目前是政策層級 guidance，還不是自動化的 project-specific analyzer

務實結論：這是一套方向正確、結構清楚的 agentification specification 與 starter pack。若要稱為廣泛 production-ready，下一步需要補齊 canonical memory files、sync scripts 與 validation implementation。

## 新手安全起步

對既有專案，不要一開始就 full sync。

```bash
git checkout -b ai-agentification/audit
node /path/to/ai-project-control-plane/bin/install-into-project.mjs .
node .ai/sync/doctor.mjs
node .ai/sync/scan-project.mjs --audit-only
node .ai/sync/validate.mjs --mode=sidecar
```

預設 installer 是 sidecar 模式。它不會安裝或覆蓋：

```text
AGENTS.md
CLAUDE.md
.claude/
.codex/
MCP runtime config
README
source code
```

## Full Adapter Sync

只有在 review 報告之後才執行：

```bash
node /path/to/ai-project-control-plane/bin/install-into-project.mjs . --full
node .ai/sync/generate-adapters.mjs
node .ai/sync/validate.mjs --mode=full
```

如果已有非生成的 adapter，generator 應拒絕覆蓋。只有在人工 review 與備份後，才使用 `--force`。

## Claude-Heavy 專案遷移

對深度綁定 Claude Code 的專案：

```bash
node .ai/sync/scan-project.mjs --claude-bridge
node .ai/sync/validate.mjs --mode=sidecar
```

需要 review：

```text
.ai/reports/existing-claude-state.local.md
.ai/reports/codex-bridge-plan.local.md
.ai/reports/unknowns.local.md
```

Codex 第一次進入時應該採用 read-only audit posture。

## Repo 內容

```text
bin/        installer
docs/       繁體中文操作文件
hooks/      hook policy 範例
schemas/    commands、MCP policy、memory proposal 的 JSON Schema
shared/     checklists 與 report templates
skills/     shared agent skills
```

## 主要 Scripts

這些 scripts 定義在本 repo 的 `package.json`：

```bash
npm run ai:doctor
npm run ai:scan:audit
npm run ai:bridge-audit
npm run ai:validate:sidecar
npm run ai:sync
npm run ai:validate:full
```

在 `.ai/sync/` 補上前，請把這些視為規劃中的 workflow entrypoints，而不是目前已可執行的命令。

## 安全規則

Preserve first. Canonicalize second. Synchronize third. Enforce last.

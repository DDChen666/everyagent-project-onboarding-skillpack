# 記憶治理

## 問題

Claude Code、Codex、其他 agent 都可能有自己的記憶。這些記憶不可保證同步。

## 解法

正式記憶只放在：

```text
.ai/canon/
```

新發現先放在：

```text
.ai/proposed-memory/inbox.md
```

## 提案格式

每個提案要有：

- observation
- evidence
- confidence
- suggested destination
- risk
- validation
- conflicts or uncertainty

## 核心原則

Agent 可以 propose。

Agent 不應自行 canonize 低證據記憶。

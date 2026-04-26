# MCP 同步

MCP 同步的目標不是讓每個 client 內部完全一樣，而是讓它們遵守同一份能力與風險政策。

Canonical source:

```text
.ai/canon/40_mcp_policy.yaml
```

## 要同步的內容

- tool purpose
- write policy
- default risk
- allowed paths
- dangerous operations
- client-specific adapter expectations

## 不該做的事

- 給 Claude 和 Codex 不同的 tool 權限卻不記錄原因。
- 讓某個 MCP server 的說明文字覆蓋 project canon。
- 讓 memory MCP 直接寫入 canon。

## 正確做法

MCP 發現的新知識應進入 proposed memory，而不是直接修改 canon。

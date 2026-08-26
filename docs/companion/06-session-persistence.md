# 6. Session 与 Persistence：模型看到的东西为什么必须可重建

**本节主教材**：Reference 中 Session、Session Persistence、Persistence Events、Runtime Invariants。

## 先纠正一个常见误解

Session log 不是“聊天 messages 数组”。

【源码事实】它是 append-only typed `SessionEvent` log；模型历史由 `deriveMessages()` 投影。`turn/*`、`step/*`、`user/message`、`assistant/*`、`tool/*` 等 durable facts 与 UI / recovery / persistence 共用同一事件源。

## 实验：从日志重建，而不是从 UI 猜

跑一个包含 tool call 的 session，记录：

1. 原始 SessionEvents；
2. `deriveMessages()` 结果；
3. 重启 / reload 后投影是否一致；
4. 取消或中断时最终 `turn/end` reason。

## Persistence Path

用官方 Persistence Reference 找：Provider → batch / flush → inspect / prepare / load → recovery。

这页不列所有 backend。Reference 是查表层；你只需要能回答“谁拥有 durable append、谁负责落盘、crash recovery 在哪里补齐状态”。

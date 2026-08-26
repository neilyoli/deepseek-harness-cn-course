# Source Reading Card：Session Persistence

**主教材**：Session / Session Persistence / Persistence Events Reference。

别一开始读 provider 实现。先找 seam：

```text
Session append
→ persistence boundary
→ batching / flush
→ inspect / prepare / load
→ recovery
```

## Fault Lab

构造一个没有正常 `turn/end` 的持久 session，再走官方 recovery 路径。

先预测：恢复后会补什么 durable fact？模型历史还能不能由 log 重建？

## 你要回答

- 内存 Session 和 persistence provider 的责任边界；
- flush timing 谁拥有；
- crash recovery 为什么不能只修 UI 状态；
- fork / resume 为什么依赖 durable event boundary。

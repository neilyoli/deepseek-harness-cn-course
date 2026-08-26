# Source Reading Card：Agent Turn

入口：[ReactLoopAgent](https://github.com/deepseek-ai/deepseek-harness/blob/b150a551b8d465e31e418e1b2eaf5e79bbb7d28e/packages/core/agent-loop/src/agent.ts)

先自己找，不看答案：

- `followup / steer / inject` 在 inbox target 和 wakeup 上有什么差别？
- `turn()` 在什么时候先写 `turn/start`？
- `preStep()` 在什么时间组装 system prompt / runtime context？
- `step()` 的 request loop 什么时候退出？
- tool call 由哪个文件执行？
- 哪些 durable event 在 finally 中保证闭合？

## 断点建议

只打 6 个：`send`、`wakeDriver`、`turn`、`preStep`、`step`、`buildRequest`。

断点多了会把调用链切碎。

## 自主性训练

读完后关掉本站，仅用 Architecture + Agent Lifecycle + source，重新画一遍 happy path。两次图不一致的地方就是你还没搞清楚的点。

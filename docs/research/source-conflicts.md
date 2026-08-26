# 源码与文档冲突记录

这里专门记录“官方材料之间并不完全一致”的地方。目标不是挑错，而是训练证据优先级。

## Request-error retry

【源码事实】固定 commit 的 `packages/core/agent-loop/src/agent.ts` 在一次 `step()` 内部用 `while (true)` 驱动请求；`agent/request-error` 返回 `{ kind: 'retry' }` 后，代码执行 `continue`，回到同一个 `step()` 的请求构造流程。

[看源码](https://github.com/deepseek-ai/deepseek-harness/blob/b150a551b8d465e31e418e1b2eaf5e79bbb7d28e/packages/core/agent-loop/src/agent.ts)

【官方事实】Implemented Agent Note `2026-07-27-request-error-retry-action.md` 写的是“关闭失败 turn，再从 durable history 打开一个 retry turn”。

[看 Agent Note](https://github.com/deepseek-ai/deepseek-harness/blob/b150a551b8d465e31e418e1b2eaf5e79bbb7d28e/.agents/notes/implemented/simplification/2026-07-27-request-error-retry-action.md)

**结论：当前固定源码与这份 implemented note 的文字存在差异。** 本课程描述运行行为时以源码为准，同时保留这个冲突，要求你用 tests / SessionEvent 亲自验证。

## 处理规则

出现冲突时：

```text
source / tests
→ generated reference
→ current subsystem / architecture docs
→ package README
→ implemented note（设计理由）
```

不要把 Agent Note 当成逐行实现规范；也不要因为源码“能跑”就忽略 note 里解释的设计意图。

# 5. 亲手追一次真实 Agent Turn

**本节主教材**：Architecture 的 Turn flow + [Agent Lifecycle](https://deepseek-harness.github.io/deepseek-harness/reference/agent-lifecycle) + Tool Execution Reference。

## 先画你的预测

在下断点前写出：

```text
User Input
→ turn/start
→ pre-step
→ step/start
→ request
→ LLM stream
→ assistant message
→ tool call/result
→ step/end
→ turn/end
```

再去源码确认哪些是 live event，哪些是 durable SessionEvent。

## 源码入口

【源码事实】默认驱动器在 `packages/core/agent-loop/src/agent.ts::ReactLoopAgent`。重点方法：`followup / steer / inject`、`wakeDriver`、`turn`、`preStep`、`step`、`buildRequest`。

[看固定源码](https://github.com/deepseek-ai/deepseek-harness/blob/b150a551b8d465e31e418e1b2eaf5e79bbb7d28e/packages/core/agent-loop/src/agent.ts)

Tool 并发与结果提交继续进 `tool-calls.ts`： [源码](https://github.com/deepseek-ai/deepseek-harness/blob/b150a551b8d465e31e418e1b2eaf5e79bbb7d28e/packages/core/agent-loop/src/tool-calls.ts)。

## 一次调试只记录四列

| 时刻 | 函数 | live extension point | durable event |
|---|---|---|---|
| 输入被领取 | 你填 | 你填 | 你填 |
| 模型请求前 | 你填 | 你填 | 你填 |
| 工具执行 | 你填 | 你填 | 你填 |
| turn 收敛 | 你填 | 你填 | 你填 |

不要直接抄 Reference。用断点 / Session log 填。

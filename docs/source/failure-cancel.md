# Source Reading Card：Failure / Cancel / Retry

正常请求只能证明主链存在；Runtime 的可信度看中途失败时怎么收敛。

## 必追三条

### LLM failure

在 `step()` 的 stream assembler 里制造 terminal error。观察 `agent/request-error`、retry action、durable events。

**特别注意**：[冲突记录](/research/source-conflicts) 中 Agent Note 与固定源码对 retry turn 的描述不一致。用测试和 SessionEvent 证明真实行为。

### Tool failure

分别制造：body throw、policy deny、timeout、abort。不要把它们全部叫“tool error”。

### Cancellation

在 model stream 与 tool execution 两个位置 cancel。追 `AbortSignal`，确认 interrupted assistant content / turn end reason / inbox 行为。

## 验收

你能指出“异常被发现的地方”“被转成结构化状态的地方”“durable log 最终闭合的地方”分别是谁。

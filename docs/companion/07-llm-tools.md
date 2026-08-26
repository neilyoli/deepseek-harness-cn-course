# 7. LLM Seam 与 Tool Pipeline

**本节主教材**：LLM Streaming、Tools、Tool Execution、[开发一个 Tool](https://deepseek-harness.github.io/deepseek-harness/develop/basic/tool)、[LLM Adapter](https://deepseek-harness.github.io/deepseek-harness/develop/practice/llm-adapter)。

## LLM：先看 contract，再看 provider

【源码事实】`ctx.llm` 的 adapter seam 以 async stream 交付 `StreamChunk`；默认 Agent Loop 消费 chunk、写 `assistant/chunk`，由 assembler 收敛成 `assistant/message`。

临时补课如果需要：只理解 `AsyncIterable` / `for await` / `AbortSignal` 如何影响取消传播，够了就回源码。

## Tool：不要把“注册”和“执行”混在一起

【源码事实】真实执行链会经过 durable `tool/call`、`tools/pre-execute`、`tools/execute`、`tools/post-execute`、live result / durable `tool/result` 等边界。

实验：

- policy 拒绝一个 tool；
- 让 tool timeout；
- tool 运行中 cancel；
- waterfall listener 忘 `next()`；
- 并行 tool 中制造不同完成顺序，观察提交顺序。

你的目标不是记事件名，而是能说清：**策略在哪里介入、执行 body 谁拥有、最终 durable result 谁写。**

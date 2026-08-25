# Capstone C：修改 DeepSeek Harness Core

## 目标

【教学模型】证明你能进入 Core ownership，做一个受控 contract change，并用 source/tests/composition 证明没有破坏边界。

## 选题：为模型请求 attempt 增加一个非 model-facing Durable Event

### 背景

【源码事实】当前 `ReactLoopAgent.step()` 可以在一个 step 内经历多个 model request attempt（特别是 `agent/request-error` 返回 retry action 时）。Session 目前持久化 request header/context、assistant chunks/message、step/turn boundaries，但没有一个统一的 durable event 明确标记“第 N 次 request attempt 开始/失败/重试决定”。

【源码事实】当前 source 的 retry 行为与旧 Implemented Agent Note prose 存在边界描述差异，这让“发生了几次 attempt”非常适合用日志事实来验证，而不是靠 live logs 推断。

### 变更目标

新增一个**不进入 `deriveMessages()`** 的 durable event，例如：

```text
request/attempt
```

建议 payload 只包含 replay-safe、lossless JSON facts：

```ts
{
  turn: number
  step: number
  attempt: number
  phase: 'start' | 'failure' | 'retry'
  provider?: string
  model?: string
  failure?: { code: string; message: string }
}
```

这只是题目规格；最终字段必须在阅读 source/tests 后最小化。

::: warning 不允许直接照规格实现
先确认仓库是否已有同语义 event / telemetry / projection；若已有，题目必须调整为扩展现有 contract，禁止重复造轮子。
:::

## 为什么这个 change 属于 `agent-loop` ownership？

【工程解释】attempt 是 concrete model-call orchestration 的事实，producer 位于 `ReactLoopAgent.step()/buildRequest()`。`core/session` 应继续只提供开放 `SessionEventMap` 与 append/fold machinery，不应该因为某个 producer 新增 domain event 就硬编码 loop policy。

推荐方式：在 `agent-loop` 自己的 types/module declaration 中 augmentation `@deepseek-ai/dsh-session` 的 `SessionEventMap`，让 event type 跟 producer package 走；是否需要单独 exported type 以当前 repo conventions 为准。

## 严格流程

```text
1. 填 agent-loop Source Reading Card
2. 读 docs/architecture.md
3. 读 docs/subsystems/core.md + session.md
4. 读 agent-loop README
5. 读 request-error / reconstructability 相关 Implemented Agent Notes
6. 搜 persistence catalog，确认无重复 event
7. 读 loop.spec / contract-regressions / cancel.spec
8. 设计 event contract
9. 修改 declaration + append producer
10. 如有 projection 需求，单独修改 owning projection package
11. 增 regression tests
12. pnpm run typecheck
13. focused vitest
14. pnpm run doc-sync（catalog 会变化）
15. real composition smoke
```

## 必须回答的架构问题

### 为什么不改 `core/session` 的 sealed union？

因为 `SessionEventMap` 当前就是 merge-extensible extension point；把 producer-owned event 硬塞进 session core 会扩大错误 ownership。

### 为什么不是 live `agent/request-attempt` event 就够了？

题目目标是“重启/replay 后仍能证明 attempt chronology”。live event 只能满足观察，不满足 durable fact。

### 为什么不能让它进入 model history？

这是 runtime diagnostic/orchestration fact，不是模型可见 message；`deriveMessages()` 不应因此增加 tokens。

### 失败 message 是否应该完整持久化？

先对照现有 `LlmFailure` serialization 与隐私/size contract。只保存稳定 provider-neutral facts，禁止随手 stringify Error stack。

## Regression Tests

至少：

1. 单次成功 request：start attempt 事实准确；
2. error → retry → success：attempt 编号/phase 顺序固定；
3. terminal error：failure 事实 + turn end 一致；
4. cancel race：abort 后不出现虚假的新 attempt；
5. `deriveMessages()` output 完全不变；
6. persistence round-trip 保留 event；
7. Catalog regeneration 把新 event 纳入 persistence catalog（若生成器按 augmentation 自动发现）。

## Scope control

【教学模型】整个 change 的 production diff 目标控制在 2–4 个 owning files + tests/docs generated output；如果需要跨十几个 consumer patch，先停下重新审 ownership。

## 备选题

如果 frozen source 已经在你开始实践时包含等价 `request/attempt`：

- 给 `tools` pipeline 增加一个**只读 observation extension point**，前提是证明现有 event 无法满足；或
- 修一个 cancellation quiescence edge case，并用 failing regression first 证明 bug 真实存在。

不要为了完成作业强行新增重复 abstraction。

## 通过条件

Reviewer 能看到完整推理：

```text
为什么是这个 package
为什么不是另一个 package
为什么是 durable 而非 live
为什么不改变 model history
哪条 test 先失败
real composition 如何证明没破坏 boot/runtime
```

只交一个“能编译的 diff”不算通过。
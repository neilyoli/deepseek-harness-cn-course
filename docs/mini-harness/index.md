# Mini Harness：闭卷架构验证

> 【教学实现，不代表 DeepSeek Harness 内部源码】

## 前置 Gate

【教学模型】只有 Capstone A/B/C 全部通过后才开始。此项目禁止复制 DSH source；你可以记得设计思想，但不能打开其实现文件。

## 最小功能范围

必须实现：

```text
Plugin
Context
Service
Event
Effect
Agent Loop
Session Log
Prompt Assembly
LLM Adapter
Tool Registry
```

不实现：Web UI、MCP、Skill、SubAgent、Workflow、复杂 persistence、完整 Cordis loader。

## 目标不是“像 DSH”

【教学模型】每个 abstraction 都必须提交一段设计理由：

```text
问题：没有它会出现什么具体耦合/bug？
最小 contract：什么必须稳定？
owner：谁创建/销毁/持久化？
替换性：哪个 implementation 可以换？
失败边界：异常/取消如何收敛？
```

如果回答只是“因为 DeepSeek Harness 有这个”，该 abstraction 判 0 分。

## 要求 1：Plugin / Context / Effect

- plugin 可注册 Service / Event / Tool；
- 每项 registration 返回 disposer；
- plugin dispose 后所有 owned effects 消失；
- required Service 缺失时 consumer 不 active；
- provider 恢复后 consumer 能重建。

## 要求 2：Live Events

至少：

- emit；
- waterfall with `next()`；
- listener dispose。

写一个 test：忘记 `next()` 会短路 downstream；明确这不是“bug”，而是 middleware contract。

## 要求 3：Session Log

append-only：

```text
turn/start
user/message
assistant/message
tool/call
tool/result
turn/end
```

实现 `deriveMessages()`；不要存第二份 authoritative messages。

## 要求 4：Prompt Assembly

至少支持：

- global sections；
- per-agent section；
- tool schemas；
- dynamic context 进入 durable user message 的显式路径。

## 要求 5：LLM Adapter

```ts
interface LlmAdapter {
  stream(request, signal): AsyncIterable<Chunk>
}
```

至少两个 adapters：deterministic mock + failure mock。Agent Loop 不能 `if (provider === ...)`。

## 要求 6：Tool Registry

至少：

```text
schema registry
pre waterfall
execute body
post waterfall
result notification
durable tool/result
AbortSignal
```

## 要求 7：Agent Loop

一次 turn：

```text
claim input
→ append turn/start
→ append user/message
→ assemble request from log + registries
→ stream model
→ append assistant/message
→ execute tool calls
→ append tool/result
→ continuation or stop
→ append turn/end
```

失败必须留下合法 terminal boundary。

## 必做 tests

1. plugin effect cleanup；
2. missing service pending/recover；
3. live event ≠ durable event；
4. replay `deriveMessages()` 等价；
5. provider replacement zero loop changes；
6. tool policy deny；
7. cancel slow tool reaches quiescence；
8. two agents scoped tools 不串线；
9. retry/failure closes a turn consistently；
10. process restart from serialized log produces same next request（可用简单 JSON persistence）。

## 最终口试

Reviewer 随机删除一个 abstraction，让你预测后果。例如：

- 删除 Effect；
- 把 Session 改成 messages[]；
- 把 Tool policy 塞进 Tool body；
- 把 provider selection 塞进 Agent Loop；
- 去掉 per-agent scope。

你必须能给出一个具体失败案例，而不是抽象地说“耦合变高”。
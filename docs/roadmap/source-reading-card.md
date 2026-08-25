# Source Reading Card：每个 subsystem 都用同一套问题

【教学模型】这张卡是整个课程最重要的可迁移技能。每次研究一个新 package，都先填它，再深入函数。

## 12 个固定问题

1. **Owns 什么？** 哪个 contract / state / lifecycle 明确归这个 subsystem？
2. **暴露什么 Service？** 是 Cordis Service、registry 还是纯 library？
3. **ctx key 是什么？** 例如 `ctx.tools`；没有 key 也必须写“无”。
4. **哪个 package 提供实现？** Definition 与 Provider 是否分包？
5. **谁 inject / consume？** 直接依赖是否符合边界？
6. **声明哪些 Live Events？** mode 是 emit / waterfall / serial / parallel / bail？
7. **产生哪些 SessionEvents？** 如果没有，明确写“无”。
8. **lifecycle 由谁管理？** Fiber、Effect、Agent Scope、Session、Provider handle？
9. **Scope 如何工作？** global / agent / isolate / initiator 是否参与？
10. **Configuration 在哪里？** Config schema、profile row、bundle patch、runtime args？
11. **最重要的 tests 在哪里？** 哪些 test 是 behavior contract 而不只是 coverage？
12. **哪份官方文档描述当前行为？** subsystem doc / README / generated catalog / Agent Note？

## 填卡顺序

【教学模型】推荐严格按以下顺序：

```text
Package README（ownership）
↓
Subsystem doc / Catalog（public contract）
↓
Module Graph（dependency boundary）
↓
Source declarations（types / events / service）
↓
Implementation（control flow）
↓
Tests（behavioral truth）
↓
Implemented Agent Note（design rationale）
```

不要从一个 1,000 行 implementation 文件开始读。

## 示例：`packages/core/agent-loop`

| 问题 | 当前答案 |
|---|---|
| Owns | 默认 concrete Agent driver：turn/step、request、tool scheduling、cancellation convergence |
| Service | `AgentLoop` |
| ctx key | `ctx.agentLoop` |
| Provider | `@deepseek-ai/dsh-agent-loop` 本身 |
| Consumer | composition / demo；extension plugins 应依赖 `dsh-agent` 而不是 loop |
| Live Events | dispatch `agent/pre-step`, `agent/request`, `agent/request-error`, `agent/turn-stopping`, status/error/inbox 等 |
| Durable Events | `turn/*`, `step/*`, `user/message`, `assistant/*`, `request/*`, `tool/*` |
| Lifecycle | `AgentRegistry` factory + Agent handle ownership + agent scope + driver activity |
| Scope | 构造器 `createScope(loopCtx, this)`，`agent.ctx = scope.ctx.extend({agent:this})` |
| Config | `ctx.agentLoop.config` 等；具体看 Config catalog / package source |
| Tests | `packages/core/agent-loop/tests/loop.spec.ts`, `cancel.spec.ts`, `interception.spec.ts`, `contract-regressions.spec.ts` 等 |
| Docs | `docs/subsystems/core.md`, `docs/agent-lifecycle.md`, Architecture + relevant Agent Notes |

## “找到定义”的反向导航算法

【教学模型】看到陌生 `ctx.foo`：

```text
IDE usage / grep "foo"
→ 找 declare module '@deepseek-ai/cordis' { interface Context { foo: ... } }
→ 找 Service class / provide
→ 找 static inject / exported inject consumers
→ 查 capability-seams / module-graph
→ 查 tests
```

看到陌生 event：

```text
Event Catalog
→ declaration site
→ dispatchers
→ listeners
→ mode semantics
→ scope carrier
→ tests
```

看到陌生 SessionEvent：

```text
Persistence Catalog / SessionEventMap augmentation
→ append producer
→ derive/projection consumer
→ persistence behavior
→ replay/resume tests
```
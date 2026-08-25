# 官方事实地图：以后 API 变了去哪里找

本页的目标不是列链接，而是训练“**问题类型 → 正确事实源**”的条件反射。

## 决策表

| 你要回答的问题 | 第一事实源 | 第二事实源 | 为什么 |
|---|---|---|---|
| 跨 subsystem 的运行链 | `docs/architecture.md` | `docs/agent-lifecycle.md` | 架构图与生成生命周期图给全局顺序 |
| Service / Event / public types | `docs/subsystems/*.md` | 对应 `src/*.ts` | subsystem 文档的 `cordis-catalog` 从源码生成 |
| Package 边界 / owns | `packages/<group>/<pkg>/README.md` | package source + tests | README 必须说清 package ownership |
| Event producer / consumer | `docs/event-producer-consumer.md` | declaration + dispatch/listener source | 生成矩阵直接给 declared/dispatcher/listener |
| 配置项 | `docs/config-catalog.md` | Config schema source | Catalog 从 Config export 生成 |
| 模型可见 Tool | `docs/tool-catalog.md` | `defineTool` source | Catalog 适合查 schema；实现回源码 |
| Durable SessionEvent | `docs/persistence-catalog.md` | `SessionEventMap` declarations | catalog 展开 core + declaration merging |
| 包依赖方向 | `docs/module-graph.md` | package manifests | 先判断依赖边界再追实现 |
| 为什么这样设计 | `.agents/notes/implemented/**` | tests / source | Agent Note 解释 decision；最终行为仍由 source+tests 裁决 |
| “现在到底怎么跑” | CLI source + `--help` | `apps/cli/reference/README.md` | CLI 在快速变化，先读 parser |

## 当前 Core Spine

【源码事实】`docs/subsystems/core.md` 与 `packages/core/README.md` 当前给出以下 spine：

| Package | Owns | ctx key |
|---|---|---|
| `packages/core/session` | append-only in-memory SessionEvent log | `ctx.sessions` |
| `packages/core/system-prompt` | prompt / tool-schema assembly | `ctx.systemPrompt` |
| `packages/core/tools` | scoped tool registry + guarded execution | `ctx.tools` |
| `packages/core/agent` | Agent interface / registry / live event vocabulary | `ctx.agents` |
| `packages/core/agent-loop` | 默认 concrete driver | `ctx.agentLoop` |
| `packages/core/scope` | scoped registration primitive | 无 Cordis Service key |
| `packages/llm/llm` | LLM adapter registry + streaming contract | `ctx.llm` |

【工程解释】`scope` 没有 ctx service 并不是“少一个核心组件”，而是因为它是依赖更低的库原语，供 session/system-prompt/agent 等复用，避免把所有东西都变成一个 runtime service。

## 当前生成事实图

【源码事实】冻结 commit 中存在并由脚本维护的关键事实地图：

- `docs/agent-lifecycle.md`：Agent Turn/Step 生成 sequence。
- `docs/tool-execution-pipeline.md`：Tool pipeline 生成 flowchart。
- `docs/event-producer-consumer.md`：event declared / dispatcher / listeners。
- `docs/capability-seams.md`：Service Definition、Provider、Consumer 关系。
- `docs/module-graph.md`：package dependency graph。
- `docs/config-catalog.md`：配置 catalog。
- `docs/tool-catalog.md`：Tool schemas。
- `docs/persistence-catalog.md`：持久事件 catalog。

【教学模型】查一个陌生需求时先跑“地图搜索”，再打开 source；不要反过来在整个仓库盲 grep。

## 三个示例

### 示例 A：我要拦截所有工具执行

【教学模型】先查 `tool-execution-pipeline.md`，确认 pre/guard/execute/post/result；再查 `event-producer-consumer.md` 看谁声明/监听 `tools/*`；最后读 `packages/core/tools/src` 和相关 tests。不要先改某个 `tool-bash` body。

### 示例 B：Resume 为什么不对

【教学模型】先区分 `core/session` 的内存 log 与 `SessionPersistence`。查 `docs/subsystems/session.md`、`persistence.md`、`persistence-catalog.md`；再读 persistence backend 与 recovery tests。不要把“聊天历史”当成单独数据源。

### 示例 C：两个 Agent 的 Tool 串线

【教学模型】先查 `docs/subsystems/scope.md`，确认 `ScopeKey` / `Scope` / scoped layer；再读 `ReactLoopAgent` 构造器中的 `createScope()` 和 `agent.ctx`；最后找 tools/system-prompt scoped registry tests。

## 版本升级练习

【教学模型】当未来 commit 改变 API 时，不查这套教程正文。只执行：

1. 更新 version-lock。
2. 重新生成/阅读官方 catalogs 与 graphs。
3. 对每个受影响 subsystem 重做 Source Reading Card。
4. 用 tests 验证行为。
5. 最后修改教程。

这就是“学完后不依赖本教程”的核心能力。
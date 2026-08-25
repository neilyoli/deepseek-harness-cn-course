# 最小术语边界

本章只建立进入真实 Harness 所需的边界，不扩展成 Agent 理论课。

| 术语 | 最小定义 |
|---|---|
| LLM | 接受 request、生成 streaming output 的模型能力；在 DSH 中通过 `ctx.llm` adapter registry 解耦 provider |
| Agent | 持有 Session、Inbox、Options、Scope，并由 driver 推进工作的 live handle |
| Agent Framework | 泛指构建 agent 应用的开发框架；不等同于具体 runtime ownership 模型 |
| Agent Harness | 把模型、工具、会话、策略、运行循环、插件、持久化等组合成可运行 agent 的宿主系统 |
| Cordis | DSH 的 plugin runtime：Context、Service、Fiber/Effect、Event、Composition/Loader 等机制 |
| Plugin | 被 Cordis 生命周期管理、通过 ctx 注册能力或提供 Service 的组件 |
| Service | 挂在 `ctx` 上的命名能力 / registry / runtime service |
| Tool | 模型可请求执行的 schema + execution contract，经 `ctx.tools` pipeline 运行 |
| Skill | DSH 的独立 capability family；通常是可发现/加载的技能内容，不是 Tool 的同义词 |
| MCP | 一种外部工具/资源协议生态；不是 DSH Tool Registry 本身 |
| Session | append-only typed `SessionEvent` log + metadata / projections；不是 message 数组 |

## 必须能立刻说出的“不等于”

### DeepSeek Model ≠ DeepSeek Harness

【官方事实】Harness 是开源 agent harness；DeepSeek model 是它可以通过 adapter 使用的模型之一。把两者混为一谈，会让你错误地把 runtime 行为归因给模型。

### Cordis ≠ Agent

【源码事实】Cordis 不知道什么是 Turn、Step、Tool Call 或 SessionEvent；这些是 DSH 的插件和类型构建出来的 domain。

### Cordis ≠ 完整 Agent Harness

【工程解释】Cordis 提供插件生命周期、Service、Event、Composition 等“运行时骨架”；DSH 的 Agent、Session、LLM、Tools、Persistence 才把它组成 Agent Harness。

### Agent Loop ≠ Harness 全部

【源码事实】`dsh-agent-loop` 是默认 concrete driver，但 Session、LLM、Tools、System Prompt、Scope、Persistence、Capability Providers 都是独立 package/service。extension plugin 也被要求依赖 public `dsh-agent`，而不是 loop implementation。

### Tool ≠ Skill

【源码事实】`ctx.tools` 与 `ctx.skills` 是不同 capability；Tool 是 execution schema/runtime，Skill 是 skill provider/catalog/loader family。Skill 可以最终通过 Tool 暴露给模型，但概念不同。

### Tool ≠ MCP

【工程解释】MCP 可能成为 Tool 的来源/桥接协议，但 `ToolDefinition`、Tool Pipeline、durable `tool/*` 是 Harness 自己的 runtime contract。

### Session ≠ `messages[]`

【源码事实】Session 是 typed append-only event log；`deriveMessages()` 从 surface events 派生模型 history。turn/step boundary、chunks、request header/context 等 durable facts 都不能塞进一个普通 messages 数组里解释。

### Cordis Event ≠ SessionEvent

【源码事实】`agent/*`、`tools/*`、`llm/*` 等是 process-local live coordination/control events；`SessionEvent` 是 append 到 Session log 的 durable fact。`session/event` 本身又是一个 live Cordis notification，它携带“刚追加的 durable SessionEvent”。

## 5 分钟自测

【教学模型】不查资料回答：

1. 为什么一个 `while (true) { callLLM(); callTools(); }` 还不是 DeepSeek Harness？
2. 为什么 `tool/result` 能 replay，而 `tools/result` 本身不应该被当成 replay 数据？
3. 为什么替换 FileSystem Provider 不应该修改 file Tool 的 consumer code？
4. 为什么一个 Plugin 的 timer 必须是 Effect？
5. 为什么 `agent.inject()` 不等价于直接向 `messages[]` push 一条字符串？

任一题只能靠背名词回答，先不要进入 Stage 4。
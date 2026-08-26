# 4. Core Runtime：只建一张够用的地图

**本节主教材**：[Architecture](https://deepseek-harness.github.io/deepseek-harness/reference/) → Reference 中 Core / Scope / Agent Lifecycle / Tool Execution。

别背整个 packages 目录。先记住这条 spine：

```text
Session
SystemPrompt
Tools
Agent
AgentLoop
Scope
LLM
```

【源码事实】Architecture 当前给出的核心 `ctx` seam 包括 `ctx.sessions`、`ctx.systemPrompt`、`ctx.tools`、`ctx.agents`、`ctx.agentLoop`、`ctx.llm`；Scope 是库原语而不是普通 `ctx` key。

## 这里要持续区分两套“上下文”

- Cordis Context：plugin/service/event/effect 的运行环境；
- Agent scoped context：某个活跃 Agent 的注册边界与运行时能力视图。

把它们都叫 “context” 很容易误读。以后看到 `ctx`，先问：**这是谁的生命周期？**

## 第一次 Source Reading Card

选 `core/tools` 或 `core/session`，自己填 [Source Reading Card](/roadmap/self-study-method#source-reading-card)。这次允许看答案和 Reference；下一次减少提示。

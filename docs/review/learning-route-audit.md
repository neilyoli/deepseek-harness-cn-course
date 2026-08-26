# DeepSeek Harness 学习路线审查

真正写教程前先做这次审查。目标是确认路线服务于“独立研究和修改 Harness”，而不是制造一套平行课程。

## 当前官方资料地图与依赖关系

【官方事实】Architecture 明确写着：改 `packages/` 前应先理解 Cordis；不会 Cordis 时先读 Primer 或 Tutorial。

因此只做一处关键顺序调整：**先用官方基础开发教程做出一个真实插件，再完整走 Cordis 教程，然后才进入 Architecture / Core Runtime。**

这样不会先学一堆抽象，也不会在看 Architecture 时把 Cordis Context、Fiber、Service、Event 当成黑箱。

## 建议阅读顺序

| 顺序 | 官方主教材 | 为什么现在读 | 是否进源码 |
|---|---|---|---|
| 0 | Guide / 根 README | 先有真实可运行对象 | 只看启动入口 |
| 1 | Development 基础四篇 | 做出真实 plugin/tool/config | 少量 |
| 2 | Cordis Tutorial 1–7 | 补齐 lifecycle / inject / effect / event / HMR | 开始 |
| 3 | Architecture | 拼出 composition、core packages、loop、seam | 必须 |
| 4 | Agent Lifecycle / Tool Execution / Core / Scope | 跟一次真实 Turn | 必须 |
| 5 | Session / Persistence / LLM / System Prompt / Tools | 理解“模型看见什么”和 durable state | 必须 |
| 6 | Capability Services + Practice | 学会替换 provider，而不是 fork consumer | 必须 |
| 7 | Publish / Cookbook / Package README / Tests | 工程化 plugin 并准备改 core | 必须 |
| 8 | 选一个陌生 subsystem | 检验自主阅读能力 | 自己找 |

## 核心必修

- Cordis：Plugin、Context、Fiber、Effect、Service、inject、Event、Config、Composition、HMR；
- Profile / Bundle / Patch 与真实 boot；
- Agent / Agent Loop / Session / System Prompt / LLM / Tools / Scope；
- SessionEvent 与 persistence；
- Capability seam：Definition / Provider / Consumer；
- plugin loading、依赖、cleanup、取消、retry、tool/LLM failure；
- Package README + tests + generated reference 的组合阅读法。

## 按需补课

AsyncGenerator、AbortSignal、Declaration Merging、Branded Type、Event Sourcing、Middleware。只有读到相应源码卡住时才补，够用就回 Harness。

## 高级选修

Skill、MCP、Subagent、Workflow、Goal、Schedule、Jobs、Plan、ACP、SDK、Web UI。它们不要求全记；选一个当“陌生 capability 阅读测试”。

## 实验节点

每个关键机制都走：

```text
先预测 → 改一个变量 → 运行 → 观察 → 回源码解释
```

重点故障：missing inject、HMR 重挂、waterfall 忘 `next()`、whole-row patch replacement、LLM failure/retry、invalid stream、tool denial/timeout/cancel、persistence recovery、scope leak。

## 同一个 Plugin 贯穿全程

`workspace-reviewer` 从 v1 长到 v10：Config → inject → Event → Tool → Hook → Service → scoped contribution → tests → Profile/Bundle。见 [贯穿式 Plugin Lab](/plugin-lab/)。

## 能力检查点

不是“读完第几章”，而是五次验收：Cordis、Composition、Agent Runtime、Plugin、Source Modification，再加一次陌生模块阅读测试。

## 反向检查

严格完成核心内容后，你应当能：

- 独立使用官方资料层定位事实；
- 说清 Cordis Runtime 与 Harness Runtime 的边界；
- 从 CLI 追到 Plugin Tree；
- 从 user input 追到 model request / tool result / turn end；
- 用 SessionEvent 解释 durable state；
- 开发、reload、卸载、测试真实 plugin；
- 判断一个新需求应写 plugin 还是改 core；
- 找 package / contract / provider / consumer / events / tests；
- 为小型 core 修改加 regression test；
- 面对没学过的 subsystem 仍知道怎么研究。

这九项都有对应训练，所以路线可以进入正文。

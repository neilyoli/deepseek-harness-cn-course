# 高级选修：只在 Core 毕业后进入

【教学模型】高级模块不是新的地基，只是已掌握 abstraction 的组合案例。完成三个 Capstone 之前不要用它们替代 Core 训练。

## 推荐案例 1：Skill + MCP

### Skill 建立在哪些 Core abstraction 上？

【源码事实】Skill 是独立 capability family：`ctx.skills` provider registry；filesystem skill provider、badge、tool-skill 等围绕 registry / Tool / context 组合。

【工程解释】你已经会：Service Definition/Provider、Tool registry、prompt/context contribution、Scope，因此读 Skill 时只需问“它把哪种内容变成 provider catalog，再如何暴露给 Agent”。

### MCP 建立在哪些 abstraction 上？

【教学模型】把 MCP 当外部 capability/protocol bridge 研究：连接生命周期是 Plugin/Effect，暴露能力会映射到 Harness Tool/资源 contract，权限仍应该走 Harness policy seam。不要把 MCP 当 Agent Loop 的另一套核心。

## 推荐案例 2：SubAgent + Workflow

### SubAgent

【源码事实】当前有 `ctx.subagents` provider/continuation service、in-process 与 ACP/Codex/Claude Code providers、model-facing tool family。

【工程解释】阅读重点：parent/child session ownership、Scope、continuation、provider seam、Tool dispatch；不是“多 Agent prompt 技巧”。

### Workflow

【源码事实】当前 workflow family 有 engine seam、worker-thread provider 与 model-facing workflow/ralph tools。

【工程解释】阅读重点：execution engine provider、Tool integration、background/quiescence contract；复用你已经学会的 capability seam 与 tool pipeline。

## 其他选修

可按需求浅学：Goal、Schedule、Jobs、Plan、Code Mode、Creator、SDK、ACP、Web UI。

每个模块只回答三题：

1. 它建立在哪些 Core Service / Event / SessionEvent 上？
2. 它新增哪一个稳定 capability seam 或 projection？
3. 它的 lifecycle / scope / persistence owner 是谁？

回答不了就回 Core，不扩写成新百科。
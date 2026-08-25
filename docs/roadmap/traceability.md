# Graduation Capability Traceability Matrix

如果一项能力没有 **源码锚点 + Lab + 独立验收**，就不能算闭环。

| 最终能力 | Stage | 主要源码 / 事实图 | 必做 Lab | 验收 |
|---|---|---|---|---|
| 解释 DSH 与 Cordis 的边界 | 1,3 | `docs/architecture.md`, Cordis tutorial | 画三层模型 + 预测 lifecycle | 5 分钟讲清 Harness ≠ Cordis |
| 排查 Plugin 不加载 | 2,4 | `apps/cli/src/profile-boot.ts`, `app-boot::boot/assertEntriesActivated` | 错 module / config / inject | 能区分 resolution/config/dependency/apply |
| 开发 Tool Plugin | 2,14,17 | `packages/core/tools`, tool catalog | `defineTool` + real composition | 不改 loop，工具被模型 schema 发现并执行 |
| 开发 Hook Plugin | 3,7,14 | Event catalog + tools pipeline | observe/deny/replace | 能选择正确 waterfall / result event |
| 开发 Service Plugin | 3,17 | Cordis Service + declaration merging | provider+consumer+missing provider | 能解释 provider 消失后的 unload/reload |
| 追完整 Agent Turn | 6–9 | `agent-loop/src/agent.ts`, `tool-calls.ts`, generated lifecycle | Debugger 从 followup 到 `tool/result` | 不看流程图可重走一遍 |
| 理解 Session Replay | 7,10 | `core/session`, `deriveMessages`, persistence catalog | 自写 projection | 能从 event log 重建 model history |
| 理解 crash recovery | 9,11 | persistence seam/backends/tests | flush/reload/interrupted tail | 解释 synthetic interrupted turn/end |
| 反向定位模型 request 来源 | 12 | system-prompt + `buildRequest()` | 可辨识 context contribution | 能分类 durable/registry/runtime contribution |
| 接入 LLM Provider | 13 | `llm/llm`, adapter cookbook, real adapters | deterministic mock adapter | 不改 Agent Loop 注册新 provider |
| 修改 Tool Pipeline 策略 | 14 | tools + generated pipeline | deny/replace/timeout/cancel | 组织策略不改 shell tool body |
| 理解两个 Agent 不串能力 | 15 | core/scope + scoped registries | global vs agent-scoped | 两 Agent 能力集合不同且 dispose 干净 |
| 替换 Capability Provider | 16 | `dsh-fs`, `fs-local`, `fs-sandbox/e2b` | mock FS provider | consumer 源码零修改 |
| 发布可安装插件 | 17 | publish tutorial + CLI profile code | bundle install / dump / boot | 另一 profile 可 `dsh plugin add` |
| 修改 DSH Core | Capstone C | owning package + tests + Agent Note | 小真实 contract change | regression + typecheck + composition |
| 独立设计 Agent Harness | Mini Harness | 不允许复制 DSH 源码 | 闭卷 mini harness | 能解释每个抽象为什么存在 |

## 六大能力总映射

| 毕业能力 | 必修 Stage / 项目 | 失败信号 |
|---|---|---|
| 架构理解 | 0–7, 15–16 | 只能列 package，解释不了 ownership 与 seam |
| 源码阅读 | 4–14 | 仍靠别人告诉“哪个文件” |
| 插件开发 | 2–3, 12–17, Capstone A | 只能 `ctx.plugin()`，不会真实 Profile/Bundle |
| Harness 修改 | 6–17, Capstone C | 修改 consumer 绕过 extension point |
| 调试排障 | 3–4, 7–14, Debug Challenges | 只会看最终 error，不会事件/日志/源码证伪 |
| 独立设计 | A+B+C + Mini Harness | 只能复述 DSH 名词，无法重建设计理由 |

## Gate 规则

【教学模型】进入 Capstone 前必须至少达到：

- Stage 4：能独立定位“插件没启动”。
- Stage 8：能走完 Turn happy path。
- Stage 9：能说明 failure 如何收敛。
- Stage 10/11：能区分内存 event sourcing 与 durability。
- Stage 13/14：能改 LLM / Tool 的 seam，不改 loop。
- Stage 15/16：能解释 scope 与 provider replacement。

任一项不通过，回对应 Stage，不用靠多读高级模块补救。
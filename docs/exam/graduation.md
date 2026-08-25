# Graduation Exam：脱离教程步骤的最终考试

## 规则

【教学模型】这是闭卷实践考试。可以查 frozen DSH source / 官方生成 docs / tests，但**不能查本教程 Stage 的“应该去哪改”答案**。目标正是证明你会重新找答案。

建议总时长：1.5–2 天工程实践；Question 1 有硬 30 分钟限制。

## Question 1：源码导航（30 分钟）

给出陌生需求：

> “某类 agent-scoped Tool 的最终 model-visible result 需要加入一个只读审计 footer，但不能修改 Tool body，并且 footer 必须在 durable log 中 replay 一致。”

在 30 分钟内提交：

```text
owning package(s)
relevant service / ctx key
event / extension point
implementation source
tests
durable event impact
why-not alternatives
```

评分重点：是否正确区分 post policy、finalizeContent、live result 与 durable result。

## Question 2：Plugin

独立写一个 plugin：

- Config；
- inject 一个真实 Service；
- 一个 Effect；
- 用 bundle 安装到新 profile；
- `--dump-config` 验证。

不允许复制 Stage 2 的 hello。

## Question 3：Hook

需求：

> “特定 Agent Scope 内，拒绝名称满足某规则的 Tool；其他 Agent 不受影响。”

不得修改 Tool definition/body。提交 hook + scope test + HMR cleanup test。

## Question 4：Provider

替换一个 Capability Provider：Filesystem、Shell/Subprocess、LLM Adapter 三选一。

要求：consumer zero changes + shared contract tests + real composition。

## Question 5：LLM

实现最小 Mock LLM Adapter：

- text stream；
- tool-call stream；
- abort；
- 一个 sanctioned failure path；
- 通过 `ctx.llm.registerAdapter` 安装。

不得修改 Agent Loop。

## Question 6：Debug

从 Debug Challenges 随机抽至少三个，只给症状。每题提交：

```text
假设
证据
source path
test path
根因
最小修复
regression test
```

直接猜中根因但没有证据链，只得一半分。

## Question 7：Core Change

从下列类别抽一个新题，不得照抄 Capstone C：

- 增加一个合理 extension point；
- 增加 SessionEvent + projection；
- 扩展 runtime policy；
- 修改 Agent behavior 的局部 contract；
- 修一个 lifecycle/cancellation edge case。

强制流程：

```text
Source Reading Card
→ Architecture / subsystem docs
→ Package README
→ relevant Implemented Agent Note
→ existing tests
→ failing regression
→ implementation
→ focused tests
→ typecheck
→ doc-sync if catalog surface changed
→ real composition
```

## 评分

| 项目 | 及格条件 |
|---|---|
| Q1 Source Navigation | 30 分钟内找对 package/service/event/tests |
| Q2 Plugin | 真 profile/bundle 可安装，cleanup 正确 |
| Q3 Hook | 不改 Tool body，scope 正确 |
| Q4 Provider | Consumer zero changes |
| Q5 LLM | 合法 stream + signal + failure contract |
| Q6 Debug | 三题均有证据链 |
| Q7 Core | ownership 正确 + regression + composition |

七项**全部通过**才可以宣称：

> 已经系统掌握 DeepSeek Harness 核心架构、源码、插件机制，并具备修改 Agent Harness 的能力。

## 失败后的回炉映射

- Q1 失败 → Stage 4–7 + Source Reading Card；
- Q2/Q3 失败 → Stage 2–3, 14, 17；
- Q4 失败 → Stage 16；
- Q5 失败 → Stage 12–13；
- Q6 失败 → Stage 7–11, 14–15；
- Q7 失败 → Stage 6–17 + Capstone C。
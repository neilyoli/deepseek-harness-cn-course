# Evidence Log：本教程实际使用的官方事实源

【教学模型】这不是“推荐阅读列表”，而是本次 2026-08-25 研究批次实际用于裁决课程事实的证据清单。未来升级 commit 时应逐项重新核对。

## 1. 固定源码与 manifest

【源码事实】已核对：

- root `package.json`：root version、Node engine、pnpm pin、scripts/workspaces；
- `apps/cli/package.json`：`@deepseek-ai/dsh@0.1.1-rc.2`、`dsh` bin；
- `apps/cli/src/bin.ts`：CLI dispatch；
- `apps/cli/src/args.ts`：launcher/profile/patch/dump/plugin flags；
- `apps/cli/src/profile-boot.ts`：profile composition、home patch、overlays、HMR watch；
- `packages/boot/app-boot/src/profile.ts`：profile/bundle resolution、`composeEntries()`；
- `packages/boot/app-boot/src/index.ts`：`boot()`、Loader、fail-loud activation diagnostics；
- `packages/core/agent-loop/src/agent.ts`：`ReactLoopAgent` turn/step/request/abort；
- `packages/core/agent-loop/src/tool-calls.ts`：tool scheduling + durable `tool/*` commit；
- `packages/llm/llm/src/index.ts`：`ctx.llm`, `LlmAdapter`, `llm/stream`；
- `packages/shell/shell/src/index.ts`：`ctx.shell`, `ShellExecutor` definition。

## 2. 源码生成的事实地图

【源码事实】已使用：

- `docs/agent-lifecycle.md`：generated Turn/Step sequence；
- `docs/event-producer-consumer.md`：event mode/declaration/dispatcher/listener matrix；
- `docs/tool-execution-pipeline.md`：generated Tool pipeline；
- `docs/capability-seams.md`：Definition / Provider / Consumer graph；
- `docs/config-catalog.md`：课程将其作为 Config lookup 首选；
- `docs/tool-catalog.md`：课程将其作为 Tool schema lookup 首选；
- `docs/persistence-catalog.md`：课程将其作为 SessionEvent lookup 首选；
- `docs/module-graph.md`：课程将其作为 package dependency lookup 首选。

## 3. Architecture / subsystem docs

【官方事实】已实际读取并用于课程：

- `docs/architecture.md`；
- `docs/subsystems/core.md`；
- `docs/subsystems/session.md`；
- `docs/subsystems/persistence.md`；
- `docs/subsystems/llm-streaming.md`；
- `docs/subsystems/tools.md`；
- `docs/subsystems/system-prompt.md`；
- `docs/subsystems/scope.md`。

## 4. Package README / Tutorial / Cookbook

【官方事实】已实际读取：

- `packages/README.md`：group map / extension dependency rule；
- `packages/fs/fs/README.md`：Filesystem 4-layer capability seam；
- `packages/shell/shell/README.md`：Shell Definition behavior contract；
- `docs/cordis-primer.md`；
- `docs/cordis-tutorial/01-first-plugin.md` … `07-into-the-harness.md`；
- `docs/user/develop/basic/index.md`：first Harness plugin + `--patch`；
- `docs/user/develop/basic/publish.md`：bundle/profile manifests、`dsh plugin add`、layer order、whole-config replacement、git prepare caveat；
- `docs/cookbook/adding-an-llm-adapter.md`；
- `docs/cookbook/adding-a-package.md`；
- `docs/development.md`。

## 5. Implemented Agent Notes

【官方事实】本次至少实际核对：

- `.agents/notes/implemented/simplification/2026-07-27-request-error-retry-action.md`；
- capability seam / filesystem / branded ids 等由 Package README 明确链接的 Implemented Notes 被作为设计理由入口。

【教学模型】课程要求学习者遇到 design question 再打开 owning package 链出的 Agent Note，而不是把 `.agents/notes` 从头刷一遍。

## 6. Tests

【源码事实】实际枚举 `packages/core/agent-loop/tests/`，确认当前至少有：

```text
agent-initiator.spec.ts
agent.spec.ts
cancel.spec.ts
config-session-id.spec.ts
contract-regressions.spec.ts
coverage-edges.spec.ts
interception.spec.ts
invariant.spec.ts
loop.spec.ts
...
```

【教学模型】Stage 8/9 把 `loop`, `cancel`, `interception`, `contract-regressions` 作为行为 contract 的优先入口；不能用 docs 替代 tests。

## 7. 发现的冲突 / 漂移点

### Conflict A：request-error retry boundary

【源码事实】冻结 commit 的 `ReactLoopAgent.step()` 在 terminal stream failure 后调用 `agent/request-error`；若返回 `{kind:'retry'}`，当前代码直接 `continue` **同一个 `step()` 内部 request loop**。

【官方事实】【版本敏感】同一 commit 的 Implemented Agent Note `2026-07-27-request-error-retry-action.md` prose 写的是“loop reads action, closes failed turn, opens one retry turn”。

【工程解释】课程按事实优先级采用当前 source behavior，并把这个差异变成 Fault Lab：让 learner 用 SessionEvent chronology + tests 自己裁决。

### Conflict B：Persistence provider count prose

【版本敏感】`docs/subsystems/persistence.md` 的某处 prose 使用“three interchangeable providers”措辞，但当前详细 backend section 明确展开 JSONL 与 SQLite。课程不凭措辞猜第三个 provider；学习者应回 capability graph / package map / source 重新确认。

## 8. 本次没有凭记忆补全的项

【教学模型】无法从固定 source/supporting official docs稳定确认的具体 helper signature、mock fixture API、未来 package 发布约束，在 Lab 中都要求“以 frozen source 类型检查为准”，没有写成【源码事实】。
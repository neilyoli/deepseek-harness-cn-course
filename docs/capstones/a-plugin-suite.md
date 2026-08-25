# Capstone A：真实 Plugin Suite — `dsh-plugin-workspace-reviewer`

## 目标

【教学模型】证明你不是“会写一个 apply 函数”，而是能做完整 Harness plugin engineering。

## 产品需求

为当前 workspace 提供一个只读审查能力：模型可以调用 `workspace_review` 获取一个 bounded JSON summary，并在每次执行前经过 live policy hook；plugin 还向模型上下文贡献一条“review mode 可用”的动态提示。

## 必须包含

- Config；
- required `inject`；
- 自有 Service；
- Tool；
- 一个 live Hook；
- model-facing context contribution；
- Effect cleanup；
- agent-scoped registration；
- Bundle/Profile 安装；
- Unit Test；
- HMR/Lifecycle Test；
- Real Composition Test。

## 推荐分层

```text
index.ts
├─ ReviewService           owns analysis/cache-free domain logic
├─ registerReviewTool()    ctx.tools
├─ registerReviewPolicy()  tools/pre-execute or result observer
└─ registerContext()       ctx.systemPrompt.context
```

【工程解释】Tool body 不应该同时读取 config 文件、拼 system prompt、注册 hook。把 ownership 分开，才能分别测试 lifecycle 与 domain logic。

## Config

【教学模型】至少：

```ts
interface Config {
  maxFiles: number
  maxBytesPerFile: number
  includeExtensions: string[]
}
```

用 Schemastery runtime schema 给合理 bounds；Config hot-reload 后旧 registrations 必须撤销。

## Service

【教学模型】`ctx.workspaceReviewer`：

```text
review(root, signal) → deterministic lossless-JSON summary
```

不要把 model-facing rendering 放 Service；Tool owns render。

## Tool

`workspace_review`：

- 参数：可选子路径；
- canonical output：JSON summary；
- render：有界文本；
- honor `exec.signal`；
- 不直接触碰 persistence。

如果使用 filesystem，inject stable `ctx.fs` definition，不 import `fs-local`。

## Live Hook

【教学模型】在 tool pipeline 观察/限制 workspace_review；必须证明 hook dispose 后不再生效。

## Model-facing context

用 `ctx.systemPrompt.context()` 提供一条可辨识动态 context，例如“workspace_review 可用于只读审查”。通过最终 request + Session log 证明模型为什么看得到。

## Agent Scope

【教学模型】让同一 plugin 可以只在 Agent A 的 `agent.ctx` 上注册 review Tool/context；Agent B 不可见。

## Bundle

```json
{
  "name": "dsh-plugin-workspace-reviewer",
  "version": "0.1.0",
  "type": "module",
  "main": "lib/index.js",
  "files": ["lib", "cordis.patch.yml"],
  "dsh": { "bundle": { "patch": "./cordis.patch.yml" } }
}
```

```yaml
- insert:
    - id: workspace-reviewer
      name: dsh-plugin-workspace-reviewer
      config:
        maxFiles: 50
        maxBytesPerFile: 65536
        includeExtensions: ['.ts', '.md', '.json']
```

实际 row config 必须由你的 Config schema 决定。

## Tests

### Unit

- deterministic ordering；
- bounds；
- abort；
- invalid config/schema boundary。

### Lifecycle/HMR

```text
activate → one service/tool/hook/context
reload   → old gone, one new generation
missing dependency → plugin unload/pending
provider returns → re-activate
```

### Real Composition

从 bundle/profile Loader 启动；不能只 `ctx.plugin()`。

## 最终演示脚本

```bash
dsh plugin --profile cap-a add ./dsh-plugin-workspace-reviewer
dsh --profile cap-a --dump-config
dsh --profile cap-a
# exercise tool + hot config change
dsh plugin --profile cap-a remove dsh-plugin-workspace-reviewer
```

## 通过条件

【教学模型】Reviewer 只看行为，不看代码量：

1. package boundary 清楚；
2. no provider concrete import；
3. HMR 无重复注册；
4. A/B Agent scope 可证明；
5. request 中能追到 context 来源；
6. real composition PASS；
7. tests 能捕获故意引入的 cleanup regression。
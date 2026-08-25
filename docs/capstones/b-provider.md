# Capstone B：替换基础 Capability Provider

## 目标

【教学模型】证明你理解“Definition / Provider / Consumer”不是画图，而是可以**替换机制、零修改 Consumer**。

## 题目：Deterministic Shell Provider

选择 Shell 而不是 Filesystem，是为了把练习重点放在 seam contract 与 composition，而不是 12 个 FS primitives 的实现量。

## 当前架构事实

【源码事实】

```text
Definition: @deepseek-ai/dsh-shell       → ctx.shell / ShellExecutor
Provider:   @deepseek-ai/dsh-bash-local
Provider:   @deepseek-ai/dsh-bash-sandbox
Consumer:   @deepseek-ai/dsh-tool-bash
```

`ShellExecutor` 必须实现：

```ts
resolve(request: ShellExecRequest): ShellExecSpec
run(spec: ShellExecSpec): Promise<ShellRunResult>
start(spec: ShellExecSpec): ShellProcess
```

## Provider 需求

实现 `dsh-shell-deterministic`：

| command | 行为 |
|---|---|
| `course:ok` | stdout 固定，exit 0 |
| `course:fail` | stdout/stderr 固定，exit 非 0，但 `run()` resolve |
| `course:slow` | 等待 signal；abort 后以 contract 规定的 killed/aborted result resolve |
| 其他 | 作为受支持执行域中的 command-not-found result；是否属于 infra error 先对照真实 provider/tests |

`start()` 返回 in-memory `ShellProcess`，至少支持 incremental `readOutput()`、`kill()` 与 `done` quiescence contract；具体 shape 以 frozen `types.ts` 为准。

## Composition

【教学模型】复制当前 profile 的 provider row config，使用 patch 替换 provider：

```text
old bash-local row disabled/replaced
↓
insert deterministic provider row
↓
ctx.shell exactly one provider
↓
tool-bash unchanged
```

先 `--dump-config` 证明 composition；再 boot。

## Consumer 零修改证明

提交一个 diff 统计：

```text
packages/shell/tool-bash/** 0 changed files
```

如果为了让 Provider 工作去改 Tool Consumer，Capstone 失败；除非你发现 Definition contract 本身缺失，此时先写 architecture argument 并把题目升级为 Capstone C。

## Contract tests

必须覆盖：

- duplicate provider fails loud；
- `course:fail` resolve，不 reject；
- pre-aborted signal 的行为与 Definition contract 一致；
- cancellation reaches quiescence；
- background process consecutive reads 不重复；
- provider dispose 后 owned process 不泄漏；
- tool-bash 通过同一 `ctx.shell` 正常执行。

## Extension exercise

【教学模型】把 provider 改成一个 RPC client stub，但保留完全相同的 consumer-facing contract。记录哪些字段必须被序列化，哪些（AbortSignal / live process handle）需要 bridge，而不是直接 JSON stringify。

## 通过条件

> Reviewer 删除 local provider、启用 deterministic provider，完全不改 tool-bash，所有 contract + real composition tests 通过。

能做到才算真正理解 Capability Seam。
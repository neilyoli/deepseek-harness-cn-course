# 版本冻结：本教程的事实边界

## 冻结记录

| 字段 | 固定值 | 证据 |
|---|---|---|
| 研究日期 | 2026-08-25 | 本教程研究批次 |
| Repository | `deepseek-ai/deepseek-harness` | 官方 GitHub 仓库 |
| Branch | `master` | 仓库默认分支 |
| Commit | `b150a551b8d465e31e418e1b2eaf5e79bbb7d28e` | 2026-08-21 合并 release `dsh@0.1.1-rc.2` |
| CLI package | `@deepseek-ai/dsh@0.1.1-rc.2` | `apps/cli/package.json` |
| Node.js | `^22.19.0 || >=24.0.0` | 根 `package.json` / development guide |
| pnpm | `11.7.0` | 根 `package.json#packageManager` |

【源码事实】官方 CLI package 的 `bin` 是 `dsh -> lib/bin.js`；源码入口是 `apps/cli/src/bin.ts`。该入口先调用 `parseDshArgs()`，然后分发到 `profile`、`plugin` 或 `dump-config` 模式。

【官方事实】【版本敏感】DeepSeek Harness 处于 developer preview，官方明确警告会发生兼容性破坏。因此课程中的文件路径与 API 不是“长期真理”，而是这个 commit 的事实快照。

## 当前真实运行命令

【源码事实】从源码运行的官方最短路径：

```bash
git clone https://github.com/deepseek-ai/deepseek-harness.git
cd deepseek-harness
git checkout b150a551b8d465e31e418e1b2eaf5e79bbb7d28e
corepack enable
pnpm install
pnpm run typecheck
pnpm run build
pnpm dsh web
```

【源码事实】Headless：

```bash
pnpm dsh --profile headless "summarize this workspace"
```

【源码事实】查看真实配置，而不启动：

```bash
pnpm dsh --profile web --dump-config
pnpm dsh --profile web --dump-default-config
```

`--dump-default-config` 只看 bundle layers；不能与 `--patch` 同时使用。`--dump-config` 会包含 profile user layer、home layer 与命令行 overlays。

## Profile / Bundle / Patch 的当前语义

【源码事实】`$DSH_HOME/profiles/<name>/package.json` 的 `dsh.profile.bundles` 是有序 bundle 列表；bundle package 通过 `dsh.bundle.patch` 指向自己的 `cordis.patch.yml`。

【源码事实】内置模板：

```text
web      = @deepseek-ai/dsh-base → @deepseek-ai/dsh-web-app
headless = @deepseek-ai/dsh-base → @deepseek-ai/dsh-headless
```

【源码事实】`apps/cli/src/profile-boot.ts::composeProfile()` 的用户可见层顺序：

```text
bundle patches（profile 列表顺序）
↓
profile $DSH_HOME/profiles/<name>/cordis.patch.yml
↓
home $DSH_HOME/cordis.patch.yml
↓
--patch overlays（argv 顺序）
```

随后 launcher 还可能追加 app-owned overlay，例如 agent preset root 和 telemetry hard-disable。这些不是用户手写的第五种 profile layer，而是 launcher 自身的启动行为。

【源码事实】Patch 以 row `id` 为目标；**给 row 写 `config` 时替换整个 config，不是 deep merge**。因此：

```yaml
- id: some-row
  config:
    changed: true
```

如果原 row 还需要 `path`、`timeout` 等键，上面的 patch 会把它们丢掉。学习者必须通过 `--dump-config` 验证最终 row，而不是靠直觉。

## 启动路径事实锚点

【源码事实】当前纵向启动主线：

```text
apps/cli/src/bin.ts
  → apps/cli/src/args.ts::parseDshArgs
  → apps/cli/src/profile-boot.ts::runProfile
  → @deepseek-ai/dsh-app-boot profile.ts::loadProfile / composeEntries
  → app-boot index.ts::boot
  → new Context()
  → ctx.plugin(Loader)
  → mountRootInclude(...)
  → loader.await()
  → assertEntriesActivated(...)
  → settled Cordis Plugin Tree
```

【源码事实】`assertEntriesActivated()` 会把 PENDING fiber 的缺失依赖打印成 `waiting for service(s): ...`，因此“插件一直 pending”不是模糊现象，而有明确 boot 诊断入口。

## 事实来源优先级

【教学模型】本教程遇到冲突时按以下顺序裁决：

```text
固定 commit 源码
↓
源码生成 Catalog / Graph
↓
官方 Architecture / Subsystem Docs
↓
Package README
↓
Implemented Agent Notes
↓
官方 Tutorial / Cookbook
↓
官方网站
↓
社区资料
```

【教学模型】任何新版本学习时，先更新本页，再更新所有 Source Reading Card。禁止仅根据旧教程修 API 名。

## 已知生成环境限制

【源码事实】本交付容器当前是 Node `v22.16.0`，低于 Harness 的 `22.19` floor，且没有 pnpm；容器网络也无法安装依赖。因此这里只把真实 DSH 执行项记录在验证页为 `SKIPPED`，不会用另一版本冒充通过。
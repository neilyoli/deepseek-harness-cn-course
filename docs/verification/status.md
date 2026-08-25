# 验证记录

> 本页必须只记录真正执行过的结果。`PASS`、`FAIL`、`SKIPPED + 原因` 三种状态之外不写“理论上可运行”。

## 生成环境

| 项目 | 实测 |
|---|---|
| Date | 2026-08-25 |
| Node | `v22.16.0` |
| pnpm | 不存在 |
| npm | `10.9.2` |
| VitePress local install | 不存在 |
| Container network | 无法解析/下载安装 GitHub/npm dependencies |
| Frozen DSH source checkout | 无法在容器联网 clone；事实研究通过官方 GitHub connector 完成 |

【源码事实】Frozen DSH 要求 Node `^22.19.0 || >=24.0.0` 与 pnpm `11.7.0`。所以当前容器**不满足 DSH runtime prerequisite**。

## 验证状态

| 检查 | 状态 | 说明 |
|---|---|---|
| 官方 repo / branch / commit 研究 | PASS | 官方 GitHub repo + current commit metadata 已核对 |
| CLI/package version | PASS | `apps/cli/package.json` = `0.1.1-rc.2` |
| Node/pnpm requirement | PASS | 根 package + official development guide 核对 |
| Boot/Profile/Patch source research | PASS | `apps/cli/src/profile-boot.ts`, `packages/boot/app-boot/src/*` |
| Agent Turn source research | PASS | `agent-loop/src/agent.ts`, `tool-calls.ts`, generated lifecycle |
| Session/LLM/Tool/Scope/Capability research | PASS | subsystem docs + source/capability graph |
| `node scripts/verify-curriculum.mjs` | PASS | 实际执行：18 stages、13 debug challenges、41 structural assertions 全部通过 |
| `node scripts/verify-links.mjs` | PASS | 实际执行：18 个本地 VitePress/Markdown 链接全部可解析 |
| VitePress `pnpm install` | SKIPPED | 当前容器无 pnpm，网络不可安装 dependencies；不能伪造 install PASS |
| VitePress `pnpm docs:build` | SKIPPED | `vitepress` package 未安装，前置 install 无法执行 |
| DSH `pnpm install` | SKIPPED | frozen source 无法 clone + pnpm 缺失 + Node 低于 22.19 floor |
| DSH `pnpm run typecheck` | SKIPPED | 同上，不能在不满足 prerequisite 的环境冒充验证 |
| DSH `pnpm run test` | SKIPPED | 同上 |
| DSH `pnpm run build` | SKIPPED | 同上 |
| Web smoke | SKIPPED | DSH build/deps 不存在 |
| Headless smoke | SKIPPED | DSH build/deps 不存在；真实 API 还需要 key |
| Lab smoke tests | SKIPPED | Lab 依赖 frozen DSH workspace packages/Loader；当前容器无 checkout/deps |
| Capstone tests | SKIPPED | Capstone 是毕业作业规格，不内置一份可照抄 production solution；当前也无 DSH runtime env |

## 用户环境复验命令

在满足 frozen prerequisite 的机器：

```bash
# Tutorial site
corepack enable
pnpm install
pnpm verify
pnpm verify:links
pnpm docs:build

# Frozen DSH checkout
git checkout b150a551b8d465e31e418e1b2eaf5e79bbb7d28e
pnpm install
pnpm run typecheck
pnpm run test
pnpm run build
pnpm dsh --profile web --dump-config
pnpm dsh web
pnpm dsh --profile headless "smoke"
```

Headless real provider smoke 可改用课程的 mock adapter，避免 API key 依赖。

## 为什么没有把 SKIPPED 写成 PASS

【工程解释】教程的核心训练之一就是区分“source says contract X”和“我在当前机器验证过 X”。如果交付本身把未执行命令写成 PASS，就违背课程要求的证据纪律。
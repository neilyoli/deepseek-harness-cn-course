# DeepSeek Harness 中文源码学习教程

这是一套以“**最终能独立读源码、写插件、替换 Provider、修改 Core、调试 Runtime**”为验收目标的 VitePress 教程项目，而不是 DeepSeek Harness 百科全书。

## 版本基线

- 研究日期：2026-08-25
- Repository：`deepseek-ai/deepseek-harness`
- Branch：`master`
- Commit：`b150a551b8d465e31e418e1b2eaf5e79bbb7d28e`
- CLI：`@deepseek-ai/dsh@0.1.1-rc.2`
- Node.js：`^22.19.0 || >=24.0.0`
- pnpm：`11.7.0`
- VitePress：`1.6.4`

> DeepSeek Harness 当前仍处于 developer preview。本教程所有源码路径、API、Event、Service、Profile/Bundle/Patch 行为都以以上 commit 为事实基线。

## 本地运行教程站点

```bash
corepack enable
pnpm install
pnpm docs:dev
```

构建：

```bash
pnpm docs:build
```

课程自身的结构完整性检查不依赖 VitePress：

```bash
node scripts/verify-curriculum.mjs
```

## 学习顺序

请不要跳过 `Version Lock → Fact Map → Traceability Matrix → Stage 0…17 → Capstones → Graduation Exam → Mini Harness`。这里的顺序是能力依赖，不是推荐阅读顺序。

## 事实标签

- `【源码事实】`：冻结 commit 中可直接验证。
- `【官方事实】`：官方文档明确声明。
- `【教学模型】`：为了建立心智模型而人为构造。
- `【工程解释】`：基于源码的架构解释。
- `【版本敏感】`：开发预览阶段可能变化。
- `【待核实】`：当前证据不足，不补猜。

## 重要限制

当前生成环境没有可用 pnpm，Node 为 22.16.0（低于 Harness 的 22.19 最低要求），同时无法从容器联网安装仓库依赖。因此本交付中：教程项目的结构/内容检查会实际执行；DeepSeek Harness 的 `pnpm install/typecheck/test/build`、VitePress dependency install/build、真实 Lab 与 Capstone 运行会在 `docs/verification/status.md` 明确记录为 `SKIPPED + 原因`，而不是伪报 PASS。
### 标签作用域约定

为了避免每个 Lab 步骤重复堆叠标签：一个小节开头出现的事实标签，作用于该小节中随后明确属于同一论断的命令、图表、代码定位和说明，直到下一条事实标签或下一层同级标题为止。纯练习要求、验收题和故障注入默认属于 `【教学模型】`；它们引用的真实 API/路径仍必须由同节的 `【源码事实】` 或 `【官方事实】` 支撑。任何跨越该作用域的新事实都必须重新标记。

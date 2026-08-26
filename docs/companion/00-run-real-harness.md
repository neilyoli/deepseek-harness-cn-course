# 0. 先把真实 Harness 跑起来

**本节主教材**：[根 README](https://github.com/deepseek-ai/deepseek-harness) · [使用 Web UI](https://deepseek-harness.github.io/deepseek-harness/guide/quickstart) · [配置模型](https://deepseek-harness.github.io/deepseek-harness/guide/providers)

不要在这里看架构图。先保证你有一个能观察的系统。

## 你只需要确认四件事

【源码事实】固定 commit 要求 Node `^22.19.0 || >=24.0.0`、pnpm `11.7.0`。

从源码：

```bash
git clone https://github.com/deepseek-ai/deepseek-harness.git
cd deepseek-harness
git checkout b150a551b8d465e31e418e1b2eaf5e79bbb7d28e
corepack enable
pnpm install
pnpm run build
pnpm dsh web
```

运行一个最小任务，确认 workspace、model、session 都真的工作。

## 第一个源码问题

运行 `dsh --profile web --dump-config`。

先不要解释输出。只回答：**这棵配置树是谁组出来的？** 把问题留到 Composition 站。

## 验收

你能区分“产品已经能用”和“我理解它为什么这样运行”是两回事。现在进入第一个真实 plugin。

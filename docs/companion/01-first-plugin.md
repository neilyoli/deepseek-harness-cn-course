# 1. 第一个真实 Plugin

**本节主教材**：[第一个 Harness 插件](https://deepseek-harness.github.io/deepseek-harness/develop/basic/) → [开发一个 Tool](https://deepseek-harness.github.io/deepseek-harness/develop/basic/tool) → [插件配置](https://deepseek-harness.github.io/deepseek-harness/develop/basic/config)

官方教程已经把代码写得很清楚，这里不重抄。

## 读的时候只盯三个问题

1. `apply(ctx)` 里的注册为什么会随着 plugin 卸载一起撤销？
2. `inject = ['tools']` 为什么不是普通的“从容器 get 一次 service”？
3. 修改 config 触发 HMR 后，为什么不会留下第二份 Tool？

还答不出来没关系。先把官方例子跑通。

## 预测—验证：移除 Provider

把练习 plugin 的 required inject 改成一个不存在的 service。

运行前先写下预测：

```text
apply 会不会执行？
进程会不会直接崩？
plugin 会处于什么状态？
恢复 provider 后是否能激活？
```

运行，保存 startup diagnostic。下一站用 Cordis 的 Fiber / inject 解释它。

## Plugin v1 → v3

把官方 `scratch-plugin` 改名成你自己的 `workspace-reviewer`，后面一直用同一个：

- v1：只加载并正确 cleanup；
- v2：加一个最小 Tool；
- v3：加 Config，并验证 HMR。

别开三个 demo 仓库。

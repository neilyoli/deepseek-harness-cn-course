# 能力 Checkpoints

达到条件再继续，不按阅读页数放行。

## Cordis

不看笔记解释 Plugin / Context / Fiber / Effect / Service / inject / Event / Config / HMR 的关系，并能预测 provider disappearance。

## Composition

给一个运行中的 profile，你能从 manifest + patch + dump 找出最终 Plugin Tree，并解释 precedence 与 whole-row replacement。

## Agent Runtime

给一个有 tool calling 的 session，你能从 user input 追到 `tool/result` 和 `turn/end`，同时区分 live event 与 durable SessionEvent。

## Plugin

不给步骤，你能自己找到 Service、声明 inject、注册 Tool / Hook、正确 cleanup、通过 patch 加载并写 lifecycle test。

## Source Modification

给一个小需求，你能找到 owning subsystem、package contract、tests、extension point，判断 plugin 还是 core，做 regression test。

## 陌生模块

任选一个没学过的 subsystem，只给 90 分钟。最后交一张 Source Reading Card + 一条实际调用链 + 两个 failure case。

如果最后一关还依赖本站告诉你文件路径，说明还没毕业。

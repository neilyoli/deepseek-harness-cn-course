# Capstone：真实 `workspace-reviewer` Plugin

把 [v1→v10](/plugin-lab/) 收敛成真正可安装的 plugin，而不是另开一个项目。

## 验收条件

- 真实 Harness 可以通过 profile / bundle 加载；
- Config 能 HMR；
- required dependency 缺失时行为正确；
- reload / unload 不留 registration；
- Tool 可用；
- 自己提供的 Service 能被另一个 consumer 使用；
- agent scoped 数据不会串 session；
- tests 覆盖 load/unload、missing dependency、HMR、tool result；
- README 按 package contract 写，不复制 generated catalog。

## 评审问题

你必须能说出每一项注册的 lifecycle owner。说不出来就不要合并。

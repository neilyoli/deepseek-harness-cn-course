# 8. Capability Seam：为什么换 Provider 不需要改 Tool

**本节主教材**：[能力的三种角色设计](https://deepseek-harness.github.io/deepseek-harness/develop/practice/) + Architecture 的 capability seam + 对应 subsystem / Package README。

官方把 seam 拆成三种角色：

```text
Service Definition
Service Provider
Consumer
```

【教学解释】真正值得学的不是“三层架构”这个词，而是**替换方向**：Consumer 只依赖 Definition；Provider 可以换成本地、sandbox、remote，而模型侧 Tool 不需要知道。

## 实验：替换 Shell Provider

不要新写一个 Tool。保持 Consumer 不变，只替换 `ctx.shell` Provider，用 deterministic fake 返回固定 stdout / exit code / timeout / abort 结果。

验收：

- Tool 代码没有 provider-specific branch；
- non-zero exit 与 infrastructure failure 能区分；
- cancel 能穿透到 provider；
- 卸载 provider 后 consumer 的依赖行为符合 Cordis lifecycle。

完成后，你才算真的理解 Harness 的可替换性，而不是只会“写插件”。

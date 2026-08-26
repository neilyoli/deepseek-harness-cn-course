# 9. 插件工程化：从 scratch patch 到可维护包

**本节主教材**：[打包与安装插件](https://deepseek-harness.github.io/deepseek-harness/develop/basic/publish) + Cookbook 的 Adding a Package + Package README 规范 + CONTRIBUTING。

## 这一步开始按仓库标准做事

你的 `workspace-reviewer` 至少要有：

- Config schema；
- required inject；
- 自己提供的 Service；
- 一个 Tool；
- 一个 live Hook / Event；
- 所有 registration 都能随 lifecycle 撤销；
- agent scoped contribution（若功能需要）；
- unit tests + lifecycle / missing dependency test；
- Profile / Bundle integration；
- Package README 写清 contract / limitations / extension points。

## HMR 验收

不是“页面刷新后还能用”。而是：

```text
修改 config
→ old fiber dispose
→ registrations 全撤销
→ new fiber active
→ 不出现 duplicate tool / listener / service
```

## 什么时候别写 Plugin

如果需求必须改变已经定义好的 core contract，而现有 event / service / seam 无法表达，才进入 Core Change。先证明“没有合适 extension point”，再改内核。

# 当前官方资料地图

这页不是课程目录。它回答：**官方资料现在实际分成哪些层，每层该拿来解决什么问题。**

## 官方网站

### 入门

- [使用 Web UI](https://deepseek-harness.github.io/deepseek-harness/guide/quickstart)
- [配置模型](https://deepseek-harness.github.io/deepseek-harness/guide/providers)
- [Python SDK](https://deepseek-harness.github.io/deepseek-harness/guide/python-sdk)

用途：先把产品跑起来，确认你面对的是一个真实 Agent Harness，而不是只读源码。

### 开发

**基础**
- [第一个 Harness 插件](https://deepseek-harness.github.io/deepseek-harness/develop/basic/)
- [开发一个 Tool](https://deepseek-harness.github.io/deepseek-harness/develop/basic/tool)
- [插件配置](https://deepseek-harness.github.io/deepseek-harness/develop/basic/config)
- [打包与安装插件](https://deepseek-harness.github.io/deepseek-harness/develop/basic/publish)

**框架能力**
- [插件与生命周期](https://deepseek-harness.github.io/deepseek-harness/develop/framework/)
- [服务与依赖](https://deepseek-harness.github.io/deepseek-harness/develop/framework/service)
- [事件系统](https://deepseek-harness.github.io/deepseek-harness/develop/framework/events)

**实战**
- [能力的三种角色设计](https://deepseek-harness.github.io/deepseek-harness/develop/practice/)
- [LLM 适配器](https://deepseek-harness.github.io/deepseek-harness/develop/practice/llm-adapter)

**Cordis 教程**
- [总览](https://deepseek-harness.github.io/deepseek-harness/develop/cordis-tutorial/)
- 官方顺序：Plugin → Lifecycle / Effect → Service → Event → Config → Composition / HMR → 进入 Harness。

### 参考

[Reference 首页](https://deepseek-harness.github.io/deepseek-harness/reference/) 当前把资料分为：

- 概念：Architecture、Cordis Primer、Capability Services、Agent Lifecycle、Tool Execution；
- 生成参考：Plugin Config、Tool Schema、Persistence Events；
- Cordis API：Context、Events、Fiber、Plugin Registry、Service、继承接口；
- 开发手册：新增 Package / Tool / LLM Adapter / UI 扩展等；
- Subsystem Reference：Core、Scope、Session、Persistence、LLM、System Prompt、Tools、Shell、Filesystem、Subagent、Workflow、Approval 等。

不要从头到尾顺序读 Reference。它是查表层。

## 官方仓库中的资料层

- [Architecture](https://github.com/deepseek-ai/deepseek-harness/blob/b150a551b8d465e31e418e1b2eaf5e79bbb7d28e/docs/architecture.md)：跨 subsystem 的有序地图。
- [Subsystem Reference](https://github.com/deepseek-ai/deepseek-harness/blob/b150a551b8d465e31e418e1b2eaf5e79bbb7d28e/docs/subsystems/README.md)：类型、Service、Event、语义。
- [Package README](https://github.com/deepseek-ai/deepseek-harness/blob/b150a551b8d465e31e418e1b2eaf5e79bbb7d28e/packages/README.md)：package contract，再下钻到具体 package README。
- [Cookbook](https://github.com/deepseek-ai/deepseek-harness/blob/b150a551b8d465e31e418e1b2eaf5e79bbb7d28e/docs/cookbook/adding-a-package.md)：操作流程。
- [Development Guide](https://github.com/deepseek-ai/deepseek-harness/blob/b150a551b8d465e31e418e1b2eaf5e79bbb7d28e/docs/development.md)：贡献者环境与日常工作流。
- [AGENTS.md](https://github.com/deepseek-ai/deepseek-harness/blob/b150a551b8d465e31e418e1b2eaf5e79bbb7d28e/AGENTS.md) 与 [docs/AGENTS.md](https://github.com/deepseek-ai/deepseek-harness/blob/b150a551b8d465e31e418e1b2eaf5e79bbb7d28e/docs/AGENTS.md)：仓库规则与文档治理。
- [Examples](https://github.com/deepseek-ai/deepseek-harness/blob/b150a551b8d465e31e418e1b2eaf5e79bbb7d28e/examples)：真实组合、配置和演示入口。
- [Implemented Agent Notes](https://github.com/deepseek-ai/deepseek-harness/blob/b150a551b8d465e31e418e1b2eaf5e79bbb7d28e/.agents/notes/implemented)：为什么这么设计、放弃了什么。
- Generated Catalog：`config-catalog`、`tool-catalog`、`persistence-catalog`、`module-graph`、Cordis API surface。
- Source + Tests：行为争议的最终落点。

## 你应该形成的查资料反射

| 你在问什么 | 先去哪 |
|---|---|
| 整体怎么串起来 | Architecture |
| 某类型 / Event / Service 现在怎么定义 | Subsystem Reference / Generated Catalog |
| 某 package 承诺什么 | Package README |
| 为什么做成这样 | Implemented Agent Note |
| 怎么新增一个东西 | Cookbook / Development |
| 实际到底怎么跑 | Source + Tests |

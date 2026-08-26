# 官方文档学习路线

这条路线尽量不重排官方资料。每一站只补官方文档不方便承担的教学层。

## 0 → 2：先做，再理解底层

### 0. Guide / README

主教材：[使用 Web UI](https://deepseek-harness.github.io/deepseek-harness/guide/quickstart) + [根 README](https://github.com/deepseek-ai/deepseek-harness)

阅读重点：从 npm / source 启动的区别、workspace、模型配置。实验：真实跑一次请求并保存会话。

### 1. Development 基础

主教材：第一个插件 → Tool → Config → Publish。

阅读重点：先不要背 API，盯住三件事：**谁拥有注册的生命周期、inject 何时决定 activation、patch 如何把插件放进真实 composition。**

### 2. Cordis Tutorial

主教材：[Cordis 教程](https://deepseek-harness.github.io/deepseek-harness/develop/cordis-tutorial/)

这一步才系统补 Plugin / Fiber / Effect / Service / Event / Config / Composition / HMR。

## 3 → 7：源码成为主体

### 3. Architecture + Composition

先读 Architecture，再追 CLI → Profile → composeEntries → Loader → Plugin Tree。

### 4. Core Runtime

用 Core / Scope / Agent Lifecycle / Tool Execution Reference 建 contract，再去 source。

### 5. Agent Turn

亲手追一个 happy path，并同时记录 live events 与 durable SessionEvents。

### 6. Session / Persistence

从 append-only log、projection、flush、reload、recovery 理解“模型可见即已记录”。

### 7. LLM / Tool / Capability Seam

不要把 Provider 和 Consumer 写死在一起；通过三角色 seam 学会替换实现。

## 8 → 9：工程化与独立研究

### 8. Plugin 工程化

Publish / Cookbook / Package README / tests。把 `workspace-reviewer` 做到可安装、可 reload、可卸载、依赖缺失行为明确。

### 9. Core 修改 + 陌生模块

先做一次小 core change，再任选一个没学过的 subsystem。教程只给验收条件，不给逐步路径。

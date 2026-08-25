---
layout: home

hero:
  name: "DeepSeek Harness"
  text: "源码、插件与 Agent Runtime 学习路径"
  tagline: "目标不是记住 API，而是独立找到正确 package / Service / event / tests，并能实现修改。"
  actions:
    - theme: brand
      text: 从版本冻结开始
      link: /research/version-lock
    - theme: alt
      text: 查看毕业能力矩阵
      link: /roadmap/traceability

features:
  - title: 架构闭环
    details: 从 CLI → Profile/Bundle/Patch → Loader/Cordis → Core Spine → Agent Turn。
  - title: 源码闭环
    details: 每个 subsystem 使用同一张 Source Reading Card：owns、Service、Provider、Consumer、Event、tests。
  - title: 修改闭环
    details: Plugin → Hook → Provider → Core Change → regression test → real composition。
---

## 你学完后必须真正会什么？

【教学模型】课程的毕业标准不是“看完 18 个 Stage”，而是能对一个陌生需求完成以下闭环：

```text
需求
↓
识别 subsystem ownership
↓
找到 Service / ctx key
↓
找到 Provider / Consumer
↓
判断 Live Event 还是 Durable SessionEvent
↓
找到正确 extension point
↓
实现 Plugin / Provider / Core Change
↓
补 regression test
↓
真实 composition 验证
```

如果你仍然需要别人告诉你“该改哪个文件”，课程尚未毕业。

## 六项毕业能力

1. **架构理解**：解释 Cordis、Plugin Tree、Profile、Bundle、Patch、Agent Loop、Session、Tools、LLM 的关系与设计理由。
2. **源码阅读**：从 CLI 入口跟到 Plugin Tree，从 Agent input 跟到 durable `tool/result`，并能反向导航类型声明。
3. **插件开发**：Tool / Hook / Service / Capability Provider，且能通过 Profile/Bundle/Patch 真正安装。
4. **Harness 修改**：修改局部 subsystem、增加 extension point、维持边界、补 regression tests。
5. **调试排障**：Plugin loading、inject、Config、HMR、Scope、Event、Tool、LLM stream、Persistence、Agent Loop。
6. **独立设计**：完成三个 Capstone 后，在不看 DSH 源码的前提下实现极简 Mini Harness。

## 使用规则

【官方事实】DeepSeek Harness 仍是 developer preview，存在 breaking changes。因此本教程首先教“**如何重新查事实**”，其次才教当前 API。

【教学模型】每个 Stage 都有四个固定区块：`毕业能力映射 → Source Reading Card → Lab / Fault Lab → 验收`。验收不过，不建议进入下一个 Stage。
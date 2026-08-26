# DeepSeek Harness 学习伴侣

> 官方文档负责告诉你 DeepSeek Harness 是什么。这里负责帮你把它读懂、跑通、和源码接上，然后逐渐不再需要这里。

这版课程面向已经做过多年全栈开发、能读 TypeScript 项目，但还没有形成 Agent Runtime / Cordis 源码心智模型的工程师。

## 先别按章节数量学习

进度用能力判断：

```text
官方文档 → 预测 → 实验 → 源码定位 → 调用链 → 故障注入 → 修改 → 验证
```

如果你只能复述 `Service`、`Event`、`Tool` 的定义，却不能预测 Provider 消失后 Consumer 会发生什么，说明还没学会。

## 三个入口

- 第一次进来：先看 [学习路线审查](/review/learning-route-audit)。
- 想知道该读哪些官方材料：看 [官方资料地图](/research/official-map)。
- 已经开始动手：从 [跑起真实 Harness](/companion/00-run-real-harness) 顺着走。

## 最终要做到什么

面对“我要改变 DeepSeek Harness 的某个行为”，你应该能自己完成：

```text
判断 subsystem
→ 找官方资料层
→ 找 package / contract
→ 找 provider / consumer
→ 找 event / lifecycle
→ 找 tests
→ 追调用链
→ 判断写 plugin 还是改 core
→ 实现与回归验证
```

到这个状态，本站的使命就结束了。

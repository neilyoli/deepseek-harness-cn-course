# 官方文档治理：一条事实只放一个家

【官方事实】固定 commit 的 `docs/AGENTS.md` 明确规定了文档层级职责。这个规则本身就是学习 DeepSeek Harness 的捷径。

[读官方 docs/AGENTS.md](https://github.com/deepseek-ai/deepseek-harness/blob/b150a551b8d465e31e418e1b2eaf5e79bbb7d28e/docs/AGENTS.md)

| 层 | 官方职责 | 学习时怎么用 |
|---|---|---|
| `architecture.md` | composition、core packages、loop、seams、extension points | 建立跨模块调用关系 |
| `subsystems/` | 类型定义、语义、生成 Cordis API | 查 contract |
| Agent Notes | why、trade-off、验证理由 | 解释设计动机 |
| `cookbook/` | 带验证步骤的 how-to | 动手改仓库 |
| `user/` | 面向产品使用者的 guide | 先跑起来 |
| Package README | 单 package contract、限制、扩展点 | 下钻前先读 |
| `development.md` | contributor setup / workflow / CI 摘要 | 准备源码修改 |
| Generated Reference | 从源码再生的穷举事实 | 查当前事件、配置、tool、module graph |

【教学解释】这比“把整个仓库从 `index.ts` 开始硬啃”高效得多。先问问题属于哪个资料层，再去找文件。

## 一个例子

问题：`tools/pre-execute` 到底是干嘛的？

不要先全局搜几十个 listener。

```text
Architecture：它在整条 Agent Turn 的哪里？
→ Tools subsystem：事件 contract 是什么？
→ Generated event / tool reference：当前生产者、消费者是谁？
→ package README：这个包承诺什么？
→ source + tests：失败、取消、timeout 的真实行为是什么？
```

这套路径在后半程会反复使用。

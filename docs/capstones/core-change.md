# Capstone：至少一次真实 Core 修改

代码量不重要，定位过程重要。

## 选题原则

先查现有 extension point。只有现有 plugin / event / service seam 无法表达需求，才改 core。

可选方向：

- 增加一个小 extension point；
- 扩展已有 Tool behavior；
- 增加一个 projection；
- 修改一个 runtime policy；
- 加 Provider；
- 修 lifecycle edge case。

## 固定交付链

```text
需求
→ owning subsystem
→ official reference
→ package README
→ contract
→ implementation
→ tests
→ impact radius
→ 修改
→ regression test
→ 验证
```

## 一个候选题

检查 fixed commit 是否已有能观察“模型请求尝试次数”的 durable / live contract。**如果已经有，禁止重复造概念。** 如果没有，评估是否值得新增最小 extension point，并证明它不会改变 `deriveMessages()` 语义。

这个题故意不给文件路径。你要自己找。

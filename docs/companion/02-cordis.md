# 2. Cordis：把刚才的现象解释清楚

**本节主教材**：[Cordis 教程总览](https://deepseek-harness.github.io/deepseek-harness/develop/cordis-tutorial/) 和 1–7 全部官方实验；补查 [Cordis Primer](https://deepseek-harness.github.io/deepseek-harness/reference/cordis-primer)。

官方顺序已经很好，不另造 Mini Cordis：

```text
Plugin → Lifecycle / Effect → Service → Event → Config → Composition / HMR → Harness
```

## 真正要建立的关系

【教学解释】文件里的 plugin 定义，不等于正在运行的 plugin instance。运行实例由 Fiber 承载生命周期；effect、service registration、event listener 等都应该挂到这条生命周期上。

【源码事实】required `inject` 同时是依赖声明和 activation 条件：provider 不在时 consumer 等待；active 后 provider 消失，consumer 会被卸载；依赖回来后可以重新激活。

这就是为什么它不能只类比成 Spring 构造器注入。**类比在“依赖会动态消失并改变 plugin 生命周期”这里失效。**

## 三个必做实验

### Effect

故意注册一个不受 effect 管理的 timer/listener，再 HMR。观察泄漏；改成 `ctx.effect()` 后重复。

### Event waterfall

找一个官方 waterfall 例子，故意不调用 `next()`。先预测 downstream 会怎样，再运行。

### Composition / id

修改一个没有稳定 id 的 entry 与有显式 id 的 entry，观察 HMR remount 差异。

## Checkpoint 前置

你现在应该能用自己的话把 `Plugin → Fiber → Effect → Service/inject → Event → HMR` 串成一条生命周期关系，而不是六个独立名词。

# Source Reading Card：Cordis Runtime vs Harness Runtime

这页只解决边界问题。

| Cordis | Harness |
|---|---|
| Context | Agent scoped context / runtime context |
| Fiber | Agent turn / step 不是 Fiber |
| Service | Harness capability 可能由 Service seam 实现，但不是同义词 |
| Cordis Event | SessionEvent 不是 Cordis live event |
| plugin composition | agent execution |
| effect / dispose | turn cancel / session persistence 不是同一生命周期 |

## 一个判断法

看到某个对象，问它在什么时候消失：

- plugin HMR / provider disappearance 时消失 → 更可能属于 Cordis lifetime；
- turn / step / cancel 时变化 → Agent runtime；
- reload 后仍必须存在 → durable SessionEvent / persistence。

类比 DI container、EventBus、middleware 只能帮助第一分钟理解；一旦涉及动态 provider、Fiber lifetime、durable event，就必须回到 Cordis / Harness 自己的 contract。

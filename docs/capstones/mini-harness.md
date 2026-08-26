# Mini Harness（选做）

只能在真实 Harness 的 Plugin 和 Core Change 都完成后做。

> 【教学实现，不代表 DeepSeek Harness 内部源码】

只实现你想验证的抽象：Plugin、Service、Event、Effect、Agent Loop、Session Log、Tool Registry。不要复刻整个产品。

推荐测试：provider disappearance、effect cleanup、waterfall short-circuit、append-only session、cancel、tool failure。

如果 Mini Harness 花的时间比真实 Harness 实验还多，停下来。它只是闭卷理解测试，不是主线。

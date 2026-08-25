# Debug Challenges：故障注入训练

## 规则

【教学模型】这里**不提供根因答案**。每个 challenge 都必须走同一条调查链：

```text
观察症状
↓
提出至少 2 个可证伪假设
↓
找到日志 / event / dump
↓
定位 subsystem owner
↓
找到 source + tests
↓
做最小实验验证根因
↓
修复
↓
加 regression assertion
```

禁止第一步就搜异常字符串后照抄修复。

## Challenge 1：Plugin 完全没加载

**症状**：`--dump-config` 能看到 row，但没有 plugin log，也没有 ctx capability。

允许证据：effective config、Loader/app-boot startup diagnostics、Fiber presence/state。

必须排除：

- module path；
- disabled；
- Config；
- missing inject；
- apply failure。

验收：准确归类到 `module / config / dependency / apply`，并解释另外三项为什么不成立。

## Challenge 2：Plugin 一直 PENDING

**症状**：row module 已解析，无 FAILED stack，但 startup 报 waiting。

允许证据：`fiber.inject`、`ctx.get(service)`、provider row。

验收：找到具体 missing service，并说明 provider 恢复后为什么 consumer 会自动 reload。

## Challenge 3：HMR 后重复注册

**症状**：每改一次 config，log/event/tool 都多一份。

允许证据：Fiber generations、disposer、registry contents。

验收：证明某项资源没有进入 Effect lifetime；修复后 10 次 reload 仍只有一条 registration。

## Challenge 4：Patch 后配置莫名丢失

**症状**：只想改一个 key，plugin 却报其他 required config 缺失。

允许证据：`--dump-default-config` vs `--dump-config`、patch row。

验收：不用看答案，用 dump 实验自己证明 whole-config replacement。

## Challenge 5：Event “没触发”

**症状**：你监听 `tool/result` 或 `tools/result`，却看不到预期内容。

允许证据：Event Catalog、Session log、tools pipeline graph。

验收：判断是 event plane、名字、scope、mode 还是执行根本未到该阶段。

## Challenge 6：Agent 卡住

**症状**：Agent status running，LLM/Tool 没继续，process 也没退出。

允许证据：waterfall listener stack、pending promises、Inbox、Agent phase。

验收：至少排查 `waterfall 忘记 next()`、pending dependency、Tool quiescence、未 settle stream 四类假设。

## Challenge 7：Tool 被拒绝

**症状**：Tool schema 可见，`tool/call` 也记录了，但 body 未执行。

允许证据：`tools/pre-execute`、guards、approval、post result。

验收：定位到底是 policy deny、guard deny、approval reject 还是 body failure。

## Challenge 8：Tool 超时

**症状**：timeout result 出现，但后台工作仍在继续。

允许证据：`timeoutMs`、`tools/execute` wrapper、`exec.signal` forwarding。

验收：解释 cooperative cancellation；证明 Tool body 是否观察 signal 并达到 quiescence。

## Challenge 9：Agent Cancel 后仍有工作

**症状**：`turn/end(aborted)` 已出现，但稍后还有 Tool side effect / log。

允许证据：Agent AbortSignal、started/unstarted tool slots、Tool Promise settlement。

验收：定位哪一层错误把“已 abort”误当“已停止”。

## Challenge 10：模型请求失败但 retry 异常

**症状**：重复请求次数/turn-step 边界与预期不一致。

允许证据：`ReactLoopAgent.step()`、`agent/request-error` listener、Session events、llm-retry tests。

验收：明确当前 commit retry 是在哪个 loop boundary 发生，并记录与旧 Agent Note prose 的差异。

## Challenge 11：模型 Stream 非法

**症状**：provider 网络成功，但 assembler/runtime 拒绝 stream。

允许证据：StreamChunk contract、BlockAssembler tests。

验收：找出是 finish ordering、block index、delta/end、tool args 还是 missing finish。

## Challenge 12：Resume 不正确

**症状**：重启后模型 history、turn boundary 或 request header 不一致。

允许证据：raw persisted log、inspect/prepare/load、deriveMessages、request/header。

验收：把 bug 定位到 in-memory log、persistence backend、recovery、projection、agent resume 之一。

## Challenge 13：两个 Agent 能力串线

**症状**：只给 Agent A 注册的 tool/prompt 在 B 也出现。

允许证据：registration ctx、ScopeKey、scoped layer、assembly context、initiator。

验收：证明是哪一次注册/读取丢失了 scope，而不是简单按 agent id if/else 打补丁。

## 随机化方式

【教学模型】毕业前让同伴从 13 项中随机抽 3 项，只给“症状”，不告诉 challenge 编号。每项限 25 分钟给出：

```text
hypotheses.md
observations.md
root-cause.md
fix.diff
regression-test.md
```
# Fault Injection Labs

每个 lab 都先写预测，再动手。不要一次改三处。

| 故障 | 观察点 | 回源码找什么 |
|---|---|---|
| plugin module 不存在 | startup diagnostic | Loader / assertEntriesLoaded |
| invalid Config | Fiber FAILED | schema validation |
| missing inject | PENDING | fiber.inject / activation |
| provider 消失 | consumer unload | Service / Fiber lifecycle |
| HMR duplicate | ghost tool/listener | effect cleanup |
| patch 只写部分 config | 其他 key 消失 | composition replacement |
| waterfall 忘 `next()` | downstream 被吞 | Cordis event mode |
| LLM terminal failure | request-error | step request loop |
| retry | SessionEvent sequence | source vs Agent Note |
| invalid stream | assembler / failure | StreamChunk contract |
| tool denied | 无 body execution | pre-execute policy |
| tool timeout | structured result | tool execution pipeline |
| cancel model/tool | abort propagation | AbortSignal / turn end |
| persistence interrupted | recovery event | persistence seam |
| agent scope leak | 两个 agent 串注册 | Scope / agent.ctx |

## 做完一个 lab 的最低记录

```text
预测：
实际：
关键日志 / SessionEvent：
源码入口：
哪个生命周期拥有收敛：
```

只写“报错了，符合预期”不算完成。

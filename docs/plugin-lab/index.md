# 贯穿式 Plugin Lab：`workspace-reviewer` v1 → v10

不要创建十个 demo。一直改同一个插件，每一版只引入一个新机制。

| 版本 | 新增能力 | 你必须验证什么 |
|---|---|---|
| v1 | 最小 plugin | load / unload |
| v2 | Config | invalid config fail loud |
| v3 | required inject | missing provider → PENDING / 恢复 |
| v4 | Event listener | listener 随 lifecycle cleanup |
| v5 | Tool | schema / execution / result |
| v6 | Hook / waterfall | `next()` ownership |
| v7 | 自己提供 Service | provider / consumer 分离 |
| v8 | agent-scoped contribution | 两个 agent 不串状态 |
| v9 | tests | HMR、dependency disappearance、dispose |
| v10 | Profile / Bundle | 真实 composition 安装与覆盖 |

## 建议功能

让它扫描 workspace 的变更并提供 `workspace_review` Tool，返回结构化 findings；另提供一个 Service，让其他 plugin 可以追加 review rule。

它不需要“很聪明”。课程目标是验证 Harness mechanics。

## 每一版都保留一条实验记录

```text
我预测：
我改了：
实际：
和预测不同的地方：
源码证据：
```

最后 Capstone 不重新开题，直接把 v10 收敛成可发布 plugin。

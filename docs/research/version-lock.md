# 版本冻结

【源码事实】本版研究冻结在：

| 项目 | 值 |
|---|---|
| 研究日期 | 2026-08-26 |
| Repository | `deepseek-ai/deepseek-harness` |
| Branch | `master` |
| Commit | `b150a551b8d465e31e418e1b2eaf5e79bbb7d28e` |
| Release / CLI | `0.1.1-rc.2` |
| Node.js | `^22.19.0 || >=24.0.0` |
| pnpm | `11.7.0` |

[固定 commit](https://github.com/deepseek-ai/deepseek-harness/commit/b150a551b8d465e31e418e1b2eaf5e79bbb7d28e) · [根 package.json](https://github.com/deepseek-ai/deepseek-harness/blob/b150a551b8d465e31e418e1b2eaf5e79bbb7d28e/package.json)

【官方事实】项目仍处于 developer preview，兼容性破坏属于预期范围。课程里的文件路径、事件名、Service 和配置行为都以固定 commit 为源码事实锚点。

## 为什么网站和 commit 要同时保留

网站用于跟随官方当前资料结构；源码链接必须固定到 commit，避免你下周点开同一个路径却读到另一套实现。

如果网站描述和固定源码冲突：记录冲突，不偷偷选一边。见 [源码与文档冲突记录](./source-conflicts.md)。

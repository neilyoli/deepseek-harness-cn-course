# Source Reading Card：Boot / Composition

**Owning area**：CLI + app-boot + Cordis Loader。

【源码事实】入口链：

```text
apps/cli/src/bin.ts
→ apps/cli/src/profile-boot.ts::runProfile
→ packages/boot/app-boot/src/profile.ts::composeEntries
→ packages/boot/app-boot/src/index.ts::boot
→ Loader
```

## 这次不要只看 happy path

重点找 `assertEntriesLoaded` / `assertEntriesActivated` 如何把失败分成：module load、FAILED activation、PENDING missing inject。

## 你要回答

- profile manifest 在哪里读？
- bundle patch 顺序在哪里决定？
- user patch 为什么 HMR 时需要重新 compose？
- partial boot 失败时谁 dispose Context？
- deepest cause 为什么还能出现在最终 diagnostic？

源码：[profile-boot](https://github.com/deepseek-ai/deepseek-harness/blob/b150a551b8d465e31e418e1b2eaf5e79bbb7d28e/apps/cli/src/profile-boot.ts) · [profile](https://github.com/deepseek-ai/deepseek-harness/blob/b150a551b8d465e31e418e1b2eaf5e79bbb7d28e/packages/boot/app-boot/src/profile.ts) · [boot](https://github.com/deepseek-ai/deepseek-harness/blob/b150a551b8d465e31e418e1b2eaf5e79bbb7d28e/packages/boot/app-boot/src/index.ts)

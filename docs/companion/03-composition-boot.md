# 3. Composition 与真实启动链

**本节主教材**：[Architecture](https://deepseek-harness.github.io/deepseek-harness/reference/) 中 Profile/Bundle 部分 + [打包与安装插件](https://deepseek-harness.github.io/deepseek-harness/develop/basic/publish)。

这次开始源码是主体。

## 先追这条链

【源码事实】固定 commit 的关键入口：

```text
apps/cli/src/bin.ts
→ apps/cli/src/profile-boot.ts
→ packages/boot/app-boot/src/profile.ts
→ packages/boot/app-boot/src/index.ts
→ Cordis Loader
→ settled Plugin Tree
```

对应源码：[CLI](https://github.com/deepseek-ai/deepseek-harness/blob/b150a551b8d465e31e418e1b2eaf5e79bbb7d28e/apps/cli/src/bin.ts) · [profile boot](https://github.com/deepseek-ai/deepseek-harness/blob/b150a551b8d465e31e418e1b2eaf5e79bbb7d28e/apps/cli/src/profile-boot.ts) · [profile composition](https://github.com/deepseek-ai/deepseek-harness/blob/b150a551b8d465e31e418e1b2eaf5e79bbb7d28e/packages/boot/app-boot/src/profile.ts) · [boot](https://github.com/deepseek-ai/deepseek-harness/blob/b150a551b8d465e31e418e1b2eaf5e79bbb7d28e/packages/boot/app-boot/src/index.ts)

## Patch 实验

【源码事实】有效层顺序是 bundle layers → profile patch → home patch → `--patch` overlays；一条 patch 对某 row 的 `config` 是**整段替换，不是 deep merge**。

做一次最小证明：找一个有两个 config key 的 row，用 patch 只写其中一个，再 dump config。不要相信文字，亲眼看另一个 key 是否还在。

## Plugin 没启动时先分类

只用 dump + startup log + source，把问题分到：

```text
module resolution
config validation
missing dependency / PENDING
plugin apply failure
```

如果这四类还混在一起，后面所有 plugin debugging 都会变慢。

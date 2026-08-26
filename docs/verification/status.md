# 验证记录

## 本次重生成

- 研究日期：2026-08-26
- 源码锚点：`b150a551b8d465e31e418e1b2eaf5e79bbb7d28e`
- 官方网站结构：按当前 Guide / Development / Reference 导航重新整理
- 官方文档治理：以固定 commit 的 `docs/AGENTS.md` 为依据

## 生成后必须通过

- `node scripts/verify-curriculum.mjs`
- `node scripts/verify-links.mjs`
- GitHub Actions：Node 24 安装依赖
- `npm run docs:build`
- Pages artifact upload
- GitHub Pages deploy

本页不伪造远端 CI 结果；仓库 Actions 是部署事实源。

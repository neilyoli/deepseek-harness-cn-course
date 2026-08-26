# DeepSeek Harness 中文学习伴侣

这不是 DeepSeek Harness 官方文档的中文重写版。

它的用途是：**围绕官方文档学习，补上阅读提示、预测—验证实验、源码定位、故障注入、插件成长路线和能力验收**，最后让你可以脱离这套教程继续读官方文档和源码。

## 事实基线

- 研究日期：2026-08-26
- Repository：`deepseek-ai/deepseek-harness`
- Branch：`master`
- Commit：`b150a551b8d465e31e418e1b2eaf5e79bbb7d28e`
- CLI / package version：`0.1.1-rc.2`
- Node.js：`^22.19.0 || >=24.0.0`
- pnpm：`11.7.0`
- 官方站点：https://deepseek-harness.github.io/deepseek-harness/

DeepSeek Harness 仍是 developer preview。源码事实一律以固定 commit 为锚点；网站链接用于沿官方资料结构学习。

## 推荐入口

1. [学习路线审查](docs/review/learning-route-audit.md)
2. [当前官方资料地图](docs/research/official-map.md)
3. [官方文档学习路线](docs/roadmap/index.md)
4. [第 0 站：先把真实 Harness 跑起来](docs/companion/00-run-real-harness.md)

## 本站约定

- `【源码事实】`：固定 commit 可以直接验证。
- `【官方事实】`：官方文档明确说明。
- `【教学解释】`：为理解源码而补的教学层。
- `【工程推断】`：从实现行为推断出的设计意图，不冒充官方原则。
- `【版本敏感】`：developer preview 下容易变化。
- `【待核实】`：证据不足，停止猜测。

## 本地运行

```bash
npm install
npm run verify
npm run verify:links
npm run docs:dev
```

GitHub Pages 使用仓库子路径 `/deepseek-harness-cn-course/`，推送 `main` 后由 Actions 自动验证、构建和部署。

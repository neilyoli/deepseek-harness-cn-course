import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'DeepSeek Harness 学习伴侣',
  description: '围绕官方文档、源码、实验和插件开发的中文学习伴侣',
  base: '/deepseek-harness-cn-course/',
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: '路线审查', link: '/review/learning-route-audit' },
      { text: '官方资料地图', link: '/research/official-map' },
      { text: '学习路线', link: '/roadmap/' },
      { text: '能力验收', link: '/checkpoints/' },
    ],
    sidebar: [
      {
        text: '开始前',
        items: [
          { text: '首页', link: '/' },
          { text: '学习路线审查', link: '/review/learning-route-audit' },
          { text: '版本冻结', link: '/research/version-lock' },
          { text: '官方资料地图', link: '/research/official-map' },
          { text: '官方文档治理', link: '/research/doc-governance' },
          { text: '源码与文档冲突记录', link: '/research/source-conflicts' },
        ],
      },
      {
        text: '官方文档学习路线',
        items: [
          { text: '路线总览', link: '/roadmap/' },
          { text: '自己研究陌生模块的方法', link: '/roadmap/self-study-method' },
          { text: '0. 跑起真实 Harness', link: '/companion/00-run-real-harness' },
          { text: '1. 第一个插件', link: '/companion/01-first-plugin' },
          { text: '2. Cordis 教程', link: '/companion/02-cordis' },
          { text: '3. Composition 与启动链', link: '/companion/03-composition-boot' },
          { text: '4. Core Runtime 地图', link: '/companion/04-core-runtime' },
          { text: '5. 一次真实 Agent Turn', link: '/companion/05-agent-turn' },
          { text: '6. Session 与持久化', link: '/companion/06-session-persistence' },
          { text: '7. LLM 与 Tool Pipeline', link: '/companion/07-llm-tools' },
          { text: '8. Capability Seam', link: '/companion/08-capability-seams' },
          { text: '9. 插件工程化', link: '/companion/09-plugin-engineering' },
        ],
      },
      {
        text: '贯穿式实战',
        items: [
          { text: 'Workspace Reviewer v1→v10', link: '/plugin-lab/' },
          { text: 'Boot 源码卡', link: '/source/boot' },
          { text: 'Cordis / Harness 边界', link: '/source/cordis-boundary' },
          { text: 'Agent Turn 源码卡', link: '/source/agent-turn' },
          { text: 'Failure / Cancel 源码卡', link: '/source/failure-cancel' },
          { text: 'Persistence 源码卡', link: '/source/persistence' },
          { text: 'Fault Injection Labs', link: '/labs/fault-injection' },
        ],
      },
      {
        text: '能力验收与毕业',
        items: [
          { text: 'Checkpoints', link: '/checkpoints/' },
          { text: '真实 Plugin 项目', link: '/capstones/plugin' },
          { text: '一次 Core 修改', link: '/capstones/core-change' },
          { text: '陌生模块阅读测试', link: '/capstones/unseen-module' },
          { text: 'Mini Harness（选做）', link: '/capstones/mini-harness' },
          { text: '验证记录', link: '/verification/status' },
        ],
      },
    ],
    search: { provider: 'local' },
    outline: { level: [2, 4] },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/deepseek-ai/deepseek-harness' },
      { icon: 'github', link: 'https://github.com/neilyoli/deepseek-harness-cn-course' },
    ],
    footer: { message: '官方文档是主教材 · 源码事实锚点 b150a551 · 研究日期 2026-08-26' },
  },
})

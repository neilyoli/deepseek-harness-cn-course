import { defineConfig } from 'vitepress'

const stages = Array.from({ length: 18 }, (_, i) => {
  const n = String(i).padStart(2, '0')
  const titles = [
    '环境、版本与真实运行', '最小 Harness 心智模型', '第一个真实 Harness Plugin', 'Cordis 核心机制',
    'DeepSeek Harness 如何启动', '源码阅读所需 TypeScript 模式', 'Core Spine', '事件双平面',
    '追踪一次真实 Agent Turn', 'Agent Loop 非 Happy Path', 'Session Event Sourcing', 'Session Persistence',
    'System Prompt 与 Request Assembly', 'LLM Seam 与 Streaming', 'Tool Registry 与执行管线', 'Scope',
    'Capability Seam', '插件工程化与发布',
  ]
  return { text: `Stage ${i}：${titles[i]}`, link: `/stages/${n}` }
})

export default defineConfig({
  lang: 'zh-CN',
  title: 'DeepSeek Harness 源码学习',
  description: '以源码阅读、插件、Runtime 修改和调试为毕业能力的中文教程',
  base: '/deepseek-harness-cn-course/',
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: '开始', link: '/' },
      { text: '版本冻结', link: '/research/version-lock' },
      { text: '能力矩阵', link: '/roadmap/traceability' },
      { text: '毕业考试', link: '/exam/graduation' },
    ],
    sidebar: [
      {
        text: '研究与路线',
        items: [
          { text: '版本冻结', link: '/research/version-lock' },
          { text: '官方事实地图', link: '/research/fact-map' },
          { text: 'Evidence Log', link: '/research/evidence-log' },
          { text: '知识依赖图', link: '/roadmap/dependency-graph' },
          { text: '毕业能力追踪矩阵', link: '/roadmap/traceability' },
          { text: 'Source Reading Card', link: '/roadmap/source-reading-card' },
          { text: '术语边界', link: '/appendix/glossary' },
        ],
      },
      { text: '主线课程', items: stages },
      {
        text: '实战与毕业',
        items: [
          { text: 'Debug Challenges', link: '/labs/debug-challenges' },
          { text: 'Capstone A：Plugin Suite', link: '/capstones/a-plugin-suite' },
          { text: 'Capstone B：Capability Provider', link: '/capstones/b-provider' },
          { text: 'Capstone C：Core Change', link: '/capstones/c-core-change' },
          { text: '毕业考试', link: '/exam/graduation' },
          { text: 'Mini Harness', link: '/mini-harness/' },
          { text: '高级选修', link: '/advanced/' },
          { text: '验证记录', link: '/verification/status' },
        ],
      },
    ],
    outline: { level: [2, 4] },
    search: { provider: 'local' },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/deepseek-ai/deepseek-harness' },
    ],
    footer: { message: '固定源码基线：b150a551 · 研究日期：2026-08-25' },
  },
})

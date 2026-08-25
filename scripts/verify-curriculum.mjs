import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const docs = resolve(root, 'docs')
const failures = []
const passes = []

function need(path) {
  const full = resolve(root, path)
  if (!existsSync(full)) failures.push(`missing: ${path}`)
  else passes.push(`exists: ${path}`)
  return full
}

function contains(path, needles) {
  const full = need(path)
  if (!existsSync(full)) return
  const text = readFileSync(full, 'utf8')
  for (const needle of needles) {
    if (!text.includes(needle)) failures.push(`${path}: missing marker ${JSON.stringify(needle)}`)
  }
}

const required = [
  'README.md', 'package.json', 'docs/index.md', 'docs/.vitepress/config.mts',
  'docs/research/version-lock.md', 'docs/research/fact-map.md',
  'docs/roadmap/dependency-graph.md', 'docs/roadmap/traceability.md', 'docs/roadmap/source-reading-card.md',
  'docs/appendix/glossary.md', 'docs/labs/debug-challenges.md',
  'docs/capstones/a-plugin-suite.md', 'docs/capstones/b-provider.md', 'docs/capstones/c-core-change.md',
  'docs/exam/graduation.md', 'docs/mini-harness/index.md', 'docs/advanced/index.md',
  'docs/verification/status.md',
]
for (const path of required) need(path)

const stageDir = resolve(docs, 'stages')
const stageFiles = existsSync(stageDir) ? readdirSync(stageDir).filter(x => /^\d\d\.md$/.test(x)).sort() : []
if (stageFiles.length !== 18) failures.push(`expected 18 stage files, found ${stageFiles.length}`)

const factLabels = ['【源码事实】', '【官方事实】', '【教学模型】', '【工程解释】', '【版本敏感】', '【待核实】']
for (let i = 0; i < 18; i++) {
  const n = String(i).padStart(2, '0')
  const path = `docs/stages/${n}.md`
  const full = need(path)
  if (!existsSync(full)) continue
  const text = readFileSync(full, 'utf8')
  if (!text.includes(`# Stage ${i}`)) failures.push(`${path}: wrong/missing Stage heading`)
  if (!text.includes('毕业能力映射')) failures.push(`${path}: missing capability mapping`)
  if (!text.includes('验收')) failures.push(`${path}: missing acceptance gate`)
  const presentFacts = factLabels.filter(tag => text.includes(tag)).length
  if (presentFacts < 2) failures.push(`${path}: insufficient fact-nature labels (${presentFacts})`)
}

contains('docs/roadmap/traceability.md', [
  '排查 Plugin 不加载', '开发 Tool Plugin', '追完整 Agent Turn', 'Session Replay',
  'LLM Provider', 'Tool Pipeline', 'Capability Provider', '修改 DSH Core',
])

const debug = readFileSync(resolve(docs, 'labs/debug-challenges.md'), 'utf8')
const challengeCount = [...debug.matchAll(/^## Challenge /gm)].length
if (challengeCount < 13) failures.push(`expected >=13 debug challenges, found ${challengeCount}`)
else passes.push(`debug challenges: ${challengeCount}`)

contains('docs/mini-harness/index.md', ['【教学实现，不代表 DeepSeek Harness 内部源码】'])
contains('docs/exam/graduation.md', [
  'Question 1', 'Question 2', 'Question 3', 'Question 4', 'Question 5', 'Question 6', 'Question 7',
])
contains('docs/research/version-lock.md', [
  'b150a551b8d465e31e418e1b2eaf5e79bbb7d28e', '0.1.1-rc.2', '^22.19.0 || >=24.0.0', '11.7.0',
  'deep merge',
])

if (failures.length) {
  console.error('CURRICULUM VERIFY: FAIL')
  for (const line of failures) console.error(`- ${line}`)
  process.exit(1)
}
console.log('CURRICULUM VERIFY: PASS')
console.log(`- required files checked: ${required.length}`)
console.log(`- stages checked: ${stageFiles.length}`)
console.log(`- debug challenges: ${challengeCount}`)
console.log(`- structural assertions: ${passes.length}`)
import fs from 'node:fs'
import path from 'node:path'

const required = [
  'README.md', 'package.json', '.github/workflows/deploy-pages.yml',
  'docs/.vitepress/config.mts', 'docs/index.md',
  'docs/review/learning-route-audit.md',
  'docs/research/version-lock.md', 'docs/research/official-map.md', 'docs/research/doc-governance.md', 'docs/research/source-conflicts.md',
  'docs/roadmap/index.md', 'docs/roadmap/self-study-method.md',
  ...Array.from({ length: 10 }, (_, i) => `docs/companion/${String(i).padStart(2, '0')}-${[
    'run-real-harness','first-plugin','cordis','composition-boot','core-runtime','agent-turn','session-persistence','llm-tools','capability-seams','plugin-engineering'
  ][i]}.md`),
  'docs/plugin-lab/index.md', 'docs/labs/fault-injection.md', 'docs/checkpoints/index.md',
  'docs/capstones/plugin.md', 'docs/capstones/core-change.md', 'docs/capstones/unseen-module.md', 'docs/capstones/mini-harness.md',
  'docs/source/boot.md', 'docs/source/cordis-boundary.md', 'docs/source/agent-turn.md', 'docs/source/failure-cancel.md', 'docs/source/persistence.md',
  'docs/verification/status.md'
]

const errors = []
for (const f of required) if (!fs.existsSync(f)) errors.push(`missing: ${f}`)

const read = f => fs.readFileSync(f, 'utf8')
const all = required.filter(f => f.endsWith('.md') && fs.existsSync(f)).map(read).join('\n')
const audit = read('docs/review/learning-route-audit.md')
const map = read('docs/research/official-map.md')
const lab = read('docs/plugin-lab/index.md')
const faults = read('docs/labs/fault-injection.md')
const conflicts = read('docs/research/source-conflicts.md')

for (const term of ['当前官方资料地图','建议阅读顺序','核心必修','按需补课','高级选修','实验节点','能力检查点','反向检查']) {
  if (!audit.includes(term)) errors.push(`audit missing term: ${term}`)
}
for (const term of ['入门','开发','参考','Architecture','Subsystem Reference','Package README','Cookbook','Agent Notes','Generated']) {
  if (!map.includes(term)) errors.push(`official map missing: ${term}`)
}
for (const v of Array.from({length:10},(_,i)=>`v${i+1}`)) if (!lab.includes(v)) errors.push(`plugin lab missing ${v}`)
for (const term of ['missing inject','HMR','waterfall','LLM terminal failure','tool timeout','cancel','persistence','agent scope leak']) {
  if (!faults.includes(term)) errors.push(`fault lab missing: ${term}`)
}
if (!conflicts.includes('Request-error retry')) errors.push('source conflict retry case missing')
if (fs.existsSync('docs/stages')) errors.push('obsolete docs/stages directory must not exist in v2')
if (!all.includes('官方文档')) errors.push('course is not anchored to official docs')
if (!all.includes('Source Reading Card')) errors.push('source reading method missing')

if (errors.length) {
  console.error('CURRICULUM VERIFY: FAIL')
  for (const e of errors) console.error('-', e)
  process.exit(1)
}
console.log('CURRICULUM VERIFY: PASS')
console.log(`- required files: ${required.length}`)
console.log('- official-doc-first structure: PASS')
console.log('- plugin v1-v10 progression: PASS')
console.log('- fault/checkpoint/core-change loops: PASS')

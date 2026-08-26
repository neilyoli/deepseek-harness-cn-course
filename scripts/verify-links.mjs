import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve('docs')
const files = []
function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name)
    if (ent.isDirectory() && ent.name !== '.vitepress') walk(p)
    else if (ent.isFile() && p.endsWith('.md')) files.push(p)
  }
}
walk(root)

const errors = []
let checked = 0
const re = /\[[^\]]+\]\(([^)]+)\)/g
for (const file of files) {
  const text = fs.readFileSync(file, 'utf8')
  for (const m of text.matchAll(re)) {
    const href = m[1]
    if (/^(https?:|mailto:|#)/.test(href)) continue
    let target = href.split('#')[0]
    if (!target) continue
    checked++
    if (target.startsWith('/')) target = path.join(root, target.slice(1))
    else target = path.resolve(path.dirname(file), target)
    const candidates = [target, `${target}.md`, path.join(target, 'index.md')]
    if (!candidates.some(p => fs.existsSync(p))) errors.push(`${path.relative('.', file)} -> ${href}`)
  }
}
if (errors.length) {
  console.error('LOCAL LINK VERIFY: FAIL')
  for (const e of errors) console.error('-', e)
  process.exit(1)
}
console.log(`LOCAL LINK VERIFY: PASS (${checked} local links checked)`)

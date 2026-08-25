import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { resolve, dirname, extname } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const docs = resolve(root, 'docs')
const failures = []
let checked = 0

function walk(dir) {
  return readdirSync(dir).flatMap(name => {
    const path = resolve(dir, name)
    return statSync(path).isDirectory() ? walk(path) : [path]
  })
}

function targetFor(link, fromFile) {
  const clean = link.split('#')[0].split('?')[0]
  if (!clean || /^(https?:|mailto:)/.test(clean)) return null
  if (clean.startsWith('/')) {
    const rel = clean.slice(1)
    const base = resolve(docs, rel)
    return [base + '.md', resolve(base, 'index.md'), base]
  }
  if (clean.startsWith('./') || clean.startsWith('../')) {
    const base = resolve(dirname(fromFile), clean)
    return extname(base) ? [base] : [base + '.md', resolve(base, 'index.md'), base]
  }
  return null
}

for (const file of walk(docs).filter(x => x.endsWith('.md'))) {
  const text = readFileSync(file, 'utf8')
  for (const match of text.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
    const link = match[1]
    const targets = targetFor(link, file)
    if (!targets) continue
    checked++
    if (!targets.some(existsSync)) failures.push(`${file.slice(root.length + 1)} -> ${link}`)
  }
}

// Also validate VitePress sidebar/nav clean links.
const config = readFileSync(resolve(docs, '.vitepress/config.mts'), 'utf8')
for (const match of config.matchAll(/link:\s*['"](\/[^'"]+)['"]/g)) {
  const link = match[1]
  if (link === '/') continue
  checked++
  const base = resolve(docs, link.slice(1))
  if (![base + '.md', resolve(base, 'index.md'), base].some(existsSync)) {
    failures.push(`docs/.vitepress/config.mts -> ${link}`)
  }
}

if (failures.length) {
  console.error('LOCAL LINK VERIFY: FAIL')
  for (const line of failures) console.error(`- ${line}`)
  process.exit(1)
}
console.log(`LOCAL LINK VERIFY: PASS (${checked} local links checked)`)
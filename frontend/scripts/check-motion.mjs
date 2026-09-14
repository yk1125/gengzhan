#!/usr/bin/env node
/**
 * 动效门禁（check:motion）—— 只读静态扫描，不启动 Vite、不依赖 node_modules。
 *
 * 守两条不变量（B.md §9.14 申请 3）：
 *  1. 不新增 `transition: all`。`all` 会把 `transform` 一并纳入过渡，与任何逐帧写
 *     `transform` 的 JS（gsap / rAF / 滚动惯性）抢同一个属性：浏览器每帧对同一属性重新
 *     计时，位移被拖成「先停滞、后追赶」（逐帧实测见 handoffs/B.md §9.10）。存量记在
 *     `scripts/motion-baseline.json`，只允许减少、不允许新增。
 *  2. 可点击元素（`a` / `button` / `.el-button` / `[role=button]` / `.clickable`）的
 *     `:hover` 规则改 `transform` 时必须有 `transform` 过渡兜着，否则 hover 位移是瞬移。
 *
 * 覆盖判定（见 `covered()`）：凡是 `transition` / `transition-property` 的值里出现
 * `transform` 或 `all` 的规则，把它每条选择器的 token 集当作一份「过渡覆盖」；某条
 * `:hover` 选择器算被覆盖，当且仅当存在一份覆盖 token 集是它的子集。class token 允许
 * BEM 修饰类（`.el-button--primary` 视作被 `.el-button` 覆盖）。判定只在 token 层面做，
 * 不做真实的 DOM/CSS 匹配——它守的是「作者是否声明过 transform 过渡」，不是浏览器结论。
 *
 * 输出每行 PASS / FAIL / BASELINE-STALE；任一 FAIL（`--strict` 下含 BASELINE-STALE）
 * 退出码 1。`--write-baseline` 重写 `scripts/motion-baseline.json`（只在明确要调整存量
 * 清单时手工执行，且必须人工 review diff）。
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve, relative } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const frontendDir = resolve(here, '..')
const srcDir = resolve(frontendDir, 'src')
const baselineFile = resolve(here, 'motion-baseline.json')

const strict = process.argv.includes('--strict')
const writeBaseline = process.argv.includes('--write-baseline')
const verbose = process.argv.includes('--verbose') || process.argv.includes('-v')

const SOURCE_EXT = /\.(vue|css|scss)$/

/** 选择器主体是否命中可点击元素族（按 B.md §9.14 申请 3 的口径，纯文本判定）。 */
const CLICKABLE = /(^|[\s>+~(,])(a|button)(?![\w-])|\.el-button|\[role=["']?button|\.clickable/

function listSourceFiles (dir) {
  const out = []
  for (const name of readdirSync(dir)) {
    const full = resolve(dir, name)
    const stat = statSync(full)
    if (stat.isDirectory()) {
      if (name === 'node_modules' || name === 'dist') continue
      out.push(...listSourceFiles(full))
    } else if (SOURCE_EXT.test(name)) {
      out.push(full)
    }
  }
  return out
}

const countLines = (text) => (text.match(/\n/g) || []).length

/** 提取 .vue 的 <style> 块（含块内首行行号，便于报错定位）。 */
function styleBlocks (file, text) {
  if (!file.endsWith('.vue')) return [{ body: text, base: 1, scoped: false }]
  const blocks = []
  const re = /<style([^>]*)>/gi
  let match
  while ((match = re.exec(text))) {
    const bodyStart = match.index + match[0].length
    const bodyEnd = text.indexOf('</style>', bodyStart)
    if (bodyEnd < 0) continue
    blocks.push({
      body: text.slice(bodyStart, bodyEnd),
      base: 1 + countLines(text.slice(0, bodyStart)),
      scoped: /scoped/.test(match[1])
    })
  }
  return blocks
}

/** 顶层块切分：返回 { prelude, inner, at }，字符串与注释内的花括号不参与。 */
function splitBlocks (src) {
  const out = []
  let i = 0
  let segStart = 0
  while (i < src.length) {
    const ch = src[i]
    if (ch === '/' && src[i + 1] === '*') {
      const end = src.indexOf('*/', i + 2)
      i = end < 0 ? src.length : end + 2
      continue
    }
    if (ch === '"' || ch === "'") {
      const quote = ch
      i += 1
      while (i < src.length && src[i] !== quote) {
        if (src[i] === '\\') i += 1
        i += 1
      }
      i += 1
      continue
    }
    if (ch === '{') {
      let depth = 1
      let j = i + 1
      while (j < src.length && depth > 0) {
        const c = src[j]
        if (c === '/' && src[j + 1] === '*') {
          const end = src.indexOf('*/', j + 2)
          j = end < 0 ? src.length : end + 2
          continue
        }
        if (c === '"' || c === "'") {
          const quote = c
          j += 1
          while (j < src.length && src[j] !== quote) {
            if (src[j] === '\\') j += 1
            j += 1
          }
          j += 1
          continue
        }
        if (c === '{') depth += 1
        else if (c === '}') depth -= 1
        j += 1
      }
      out.push({ prelude: src.slice(segStart, i), inner: src.slice(i + 1, j - 1), at: i })
      i = j
      segStart = j
      continue
    }
    if (ch === ';') { segStart = i + 1; i += 1; continue }
    i += 1
  }
  return out
}

/** 规则体内的声明列表（括号内不切分）。 */
function parseDeclarations (inner) {
  const parts = []
  let depth = 0
  let buf = ''
  for (let i = 0; i < inner.length; i += 1) {
    const ch = inner[i]
    if (ch === '(') depth += 1
    else if (ch === ')') depth -= 1
    if (ch === ';' && depth === 0) { parts.push(buf); buf = ''; continue }
    buf += ch
  }
  if (buf.trim()) parts.push(buf)
  return parts.map((part) => {
    const sep = part.indexOf(':')
    if (sep < 0) return null
    return {
      prop: part.slice(0, sep).trim().toLowerCase(),
      value: part.slice(sep + 1).replace(/!\s*important/i, '').replace(/\s+/g, ' ').trim()
    }
  }).filter(Boolean)
}

function collectRules (src, file, base, scoped, out) {
  for (const block of splitBlocks(src)) {
    const prelude = block.prelude.trim()
    if (!prelude) continue
    const line = base + countLines(src.slice(0, block.at))
    if (/^@(-\w+-)?keyframes/i.test(prelude)) continue
    if (/^@(media|supports|layer|container|scope|document)/i.test(prelude)) {
      collectRules(block.inner, file, line, scoped, out)
      continue
    }
    if (prelude.startsWith('@')) continue
    out.push({ file, selector: prelude, decls: parseDeclarations(block.inner), line, scoped })
  }
  return out
}

const collapse = (value) => value.replace(/\s+/g, ' ').replace(/\s*,\s*/g, ',').trim()

/** 去注释：只在字符位置上换成空格（保留换行），行号与偏移不受影响。 */
const stripComments = (text) => text.replace(/\/\*[\s\S]*?\*\//g, (comment) => comment.replace(/[^\n]/g, ' '))

/**
 * 选择器 → token 集。`::pseudo-el` 与裸伪类丢弃；伪类函数（`:not(`、`:is(`、`:deep(`）
 * 只去掉函数名、保留括号内容当成同级 token（`:disabled` 这类不带点的会自然落到非 token）。
 */
function tokenize (selector) {
  const stripped = selector
    .replace(/::?[a-zA-Z-]+\(/g, '(')
    .replace(/::?[a-zA-Z-]+/g, '')
  const tokens = []
  let i = 0
  while (i < stripped.length) {
    const ch = stripped[i]
    if (ch === '[') {
      const end = stripped.indexOf(']', i)
      tokens.push(stripped.slice(i, end < 0 ? stripped.length : end + 1).replace(/\s+/g, ''))
      i = end < 0 ? stripped.length : end + 1
      continue
    }
    if (ch === '.' || ch === '#') {
      const match = /^[.#][A-Za-z_][\w-]*/.exec(stripped.slice(i))
      if (match) { tokens.push(match[0]); i += match[0].length; continue }
    }
    if (ch === '*') { tokens.push('*'); i += 1; continue }
    if (/[A-Za-z]/.test(ch) && (i === 0 || /[\s>+~(,]/.test(stripped[i - 1]))) {
      const match = /^[A-Za-z][\w-]*/.exec(stripped.slice(i))
      tokens.push(match[0].toLowerCase())
      i += match[0].length
      continue
    }
    i += 1
  }
  return tokens
}

/** 覆盖 token 集是否落在目标 token 集里（class 允许 BEM 修饰类）。 */
function tokensCover (coverTokens, targetTokens) {
  if (!coverTokens.length) return false
  return coverTokens.every((token) => {
    if (token === '*') return true
    if (token.startsWith('[')) return targetTokens.includes(token)
    if (token.startsWith('.')) {
      return targetTokens.some((target) => target.startsWith('.') &&
        (target === token || target.slice(1).startsWith(`${token.slice(1)}--`)))
    }
    return targetTokens.includes(token)
  })
}

const transitionValues = (rule) => rule.decls
  .filter((decl) => decl.prop === 'transition' || decl.prop === 'transition-property')
  .map((decl) => decl.value)

const hasTransformTransition = (rule) => transitionValues(rule).some((value) =>
  /transform/.test(value) || /(^|[\s,])all([\s,]|$)/.test(value))

const rel = (file) => relative(frontendDir, file).split('\\').join('/')

function main () {
  const rules = []
  for (const file of listSourceFiles(srcDir)) {
    const text = stripComments(readFileSync(file, 'utf8'))
    for (const block of styleBlocks(file, text)) {
      collectRules(block.body, rel(file), block.base, block.scoped, rules)
    }
  }

  // 覆盖池：任何声明了含 transform / all 过渡的规则，都是候选「过渡覆盖」。
  const coverSets = []
  for (const rule of rules) {
    if (!hasTransformTransition(rule)) continue
    for (const member of rule.selector.split(',')) {
      const tokens = tokenize(member.trim())
      if (tokens.length) coverSets.push(tokens)
    }
  }

  const transitionAll = rules.filter((rule) => transitionValues(rule).some((value) => /(^|[\s,])all([\s,]|$)/.test(value)))
  const hoverTransform = []
  for (const rule of rules) {
    if (!rule.decls.some((decl) => decl.prop === 'transform')) continue
    const clickableHoverMembers = rule.selector.split(',').map((member) => member.trim())
      .filter((member) => /:hover/.test(member) && CLICKABLE.test(member))
    if (!clickableHoverMembers.length) continue
    const uncovered = clickableHoverMembers.filter((member) => {
      const tokens = tokenize(member)
      return !coverSets.some((cover) => tokensCover(cover, tokens))
    })
    if (uncovered.length) hoverTransform.push({ rule, members: uncovered })
  }

  let baseline = { transitionAll: [] }
  try {
    baseline = JSON.parse(readFileSync(baselineFile, 'utf8'))
  } catch (error) {
    if (!writeBaseline) {
      console.error(`[FAIL] check:motion 无法读取基线 ${rel(baselineFile)}：${error.message}`)
      return 1
    }
  }

  if (writeBaseline) {
    const payload = {
      note: '存量 `transition: all` 清单（check:motion 基线）。只允许减少；新增会被门禁拦下。key = 文件 | 选择器 | 值，均已折叠空白。',
      capturedAt: 'b6a2c72 (main) + docs 合并后',
      transitionAll: transitionAll.map((rule) => ({
        file: rule.file,
        selector: collapse(rule.selector),
        value: collapse(transitionValues(rule).find((value) => /(^|[\s,])all([\s,]|$)/.test(value)))
      })).sort((a, b) => `${a.file}${a.selector}`.localeCompare(`${b.file}${b.selector}`))
    }
    writeFileSync(baselineFile, `${JSON.stringify(payload, null, 2)}\n`, 'utf8')
    console.log(`已写入基线 ${rel(baselineFile)}：transition: all ${payload.transitionAll.length} 条`)
    return 0
  }

  const key = (rule) => `${rule.file}|${collapse(rule.selector)}|${collapse(transitionValues(rule).find((value) => /(^|[\s,])all([\s,]|$)/.test(value)) ?? '')}`
  const baselineKeys = new Set((baseline.transitionAll ?? []).map((entry) => `${entry.file}|${collapse(entry.selector)}|${collapse(entry.value)}`))
  const currentKeys = new Set(transitionAll.map(key))

  const lines = []
  const newAll = transitionAll.filter((rule) => !baselineKeys.has(key(rule)))
  const staleAll = (baseline.transitionAll ?? []).filter((entry) => !currentKeys.has(`${entry.file}|${collapse(entry.selector)}|${collapse(entry.value)}`))

  lines.push(`[${newAll.length === 0 ? 'PASS' : 'FAIL'}] transition: all —— 基线 ${baselineKeys.size} 条，本次扫到 ${transitionAll.length} 条，新增 ${newAll.length} 条`)
  for (const rule of newAll) lines.push(`[FAIL] ${rule.file}:${rule.line} 新增 transition: all —— ${collapse(rule.selector).slice(0, 120)}`)
  for (const entry of staleAll) lines.push(`[BASELINE-STALE] ${entry.file} 基线里的这条已不在源码中（选择器：${entry.selector.slice(0, 100)}）—— 可以从基线里删掉`)

  lines.push(`[${hoverTransform.length === 0 ? 'PASS' : 'FAIL'}] 可点击元素 hover 改 transform —— 无 transform 过渡的规则 ${hoverTransform.length} 条`)
  for (const item of hoverTransform) {
    lines.push(`[FAIL] ${item.rule.file}:${item.rule.line} hover 改 transform 但没有 transform 过渡 —— ${collapse(item.members.join(', ')).slice(0, 140)}`)
  }
  if (verbose) {
    const total = rules.filter((rule) => rule.decls.some((decl) => decl.prop === 'transform') &&
      rule.selector.split(',').some((member) => /:hover/.test(member) && CLICKABLE.test(member))).length
    lines.push(`[INFO] 可点击元素 hover+transform 规则共 ${total} 条，其中 ${total - hoverTransform.length} 条已有 transform 过渡`)
  }

  console.log('动效门禁（check:motion）—— 只读扫描 frontend/src 的 <style> 与 .css')
  console.log(lines.join('\n'))
  console.log('')
  const failCount = newAll.length + hoverTransform.length + (strict ? staleAll.length : 0)
  const passCount = (newAll.length === 0 ? 1 : 0) + (hoverTransform.length === 0 ? 1 : 0)
  console.log(`结果：PASS ${passCount} / FAIL ${failCount} / BASELINE-STALE ${staleAll.length}${strict ? '（--strict）' : ''}`)
  return failCount === 0 ? 0 : 1
}

process.exit(main())

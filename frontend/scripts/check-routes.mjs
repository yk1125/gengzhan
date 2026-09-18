#!/usr/bin/env node
/**
 * 路由契约门禁（check:routes）
 *
 * 做三件事：
 * 1. 静态解析 src/router/index.js 的 routes（不启动 Vite）；
 * 2. 读取 src/config/routeManifest.js；
 * 3. 把 docs/frontend-rebuild/specs/FRONTEND.md §3 路由契约表每一行（中文/英文）逐条 match，并用 Vue Router 内存路由验证链接解析。
 *
 * 输出每行 PASS / FAIL / PENDING；任一 FAIL（或在 --strict 下任一 PENDING）退出码为 1。
 * PENDING 是「已记录、尚未实现」的路由（含负责人与任务号），既不算通过也不静默放过。
 */
import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, resolve } from 'node:path'
import { tmpdir } from 'node:os'
import assert from 'node:assert/strict'
import { createRouter, createMemoryHistory } from 'vue-router'

const here = dirname(fileURLToPath(import.meta.url))
const frontendDir = resolve(here, '..')
const repoRoot = resolve(frontendDir, '..')
const routerFile = resolve(frontendDir, 'src/router/index.js')
const manifestFile = resolve(frontendDir, 'src/config/routeManifest.js')
const specFile = resolve(repoRoot, 'docs/frontend-rebuild/specs/FRONTEND.md')

const strict = process.argv.includes('--strict')

/** 已记录但尚未实现的 routeKey；必须有负责人和任务号，不允许留空。 */
const PENDING = []

const escapeRe = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

function joinPath (parentPath, childPath = '') {
  if (childPath.startsWith('/')) return childPath
  if (!childPath) return parentPath || '/'
  return parentPath.endsWith('/') ? `${parentPath}${childPath}` : `${parentPath}/${childPath}`
}

function routeToRegex (routePath) {
  const segments = (routePath || '/').split('/').filter(Boolean)
  let pattern = '^'
  for (const segment of segments) {
    if (segment.startsWith(':')) {
      pattern += segment.includes('(.*)') ? '(?:/.*)?' : '/[^/]+'
    } else {
      pattern += `/${escapeRe(segment)}`
    }
  }
  if (segments.length === 0) pattern += '/'
  return new RegExp(`${pattern}/?$`)
}

function collectLeafRoutes (routes, parentPath = '') {
  const out = []
  for (const route of routes) {
    const fullPath = joinPath(parentPath, route.path ?? '')
    if (route.children?.length) {
      out.push(...collectLeafRoutes(route.children, fullPath))
      continue
    }
    if (!route.name) continue
    out.push({ path: fullPath, name: route.name, catchAll: /pathMatch|\*/.test(fullPath) })
  }
  return out
}

async function loadRoutes () {
  const source = readFileSync(routerFile, 'utf8')
  let code = source
    .replace(/import\s*\{[^}]*\}\s*from\s*['"]vue-router['"]\s*;?/, '')
    .replace(/import\s*\([^()]*\)/g, 'null')
    .replace(/export\s+default\s+router\b/, 'export default routes')

  if (!/\bexport\s+default\s+routes\b/.test(code)) {
    throw new Error('router/index.js 未找到 `export default router`，静态解析规则需要同步更新')
  }

  const stubs = [
    'const createRouter = (options) => ({ options, beforeEach () {}, afterEach () {} });',
    'const createWebHistory = () => ({});'
  ].join('\n')

  const tmpFile = resolve(tmpdir(), `yz-check-routes-${process.pid}.mjs`)
  writeFileSync(tmpFile, `${stubs}\n${code}\n`, 'utf8')
  try {
    const mod = await import(pathToFileURL(tmpFile).href)
    if (!Array.isArray(mod.default)) throw new Error('router/index.js 的 routes 不是数组')
    return collectLeafRoutes(mod.default)
  } finally {
    rmSync(tmpFile, { force: true })
  }
}

function parseSpecRows (markdown) {
  const rows = []
  let inTable = false
  for (const line of markdown.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (trimmed.startsWith('| routeKey')) { inTable = true; continue }
    if (!inTable) continue
    if (!trimmed.startsWith('|')) { inTable = false; continue }
    const cells = trimmed.split('|').slice(1, -1).map((cell) => cell.trim())
    if (cells.length < 3 || cells[0].startsWith('---')) continue
    rows.push({ routeKey: cells[0], zh: cells[1], en: cells[2], page: cells[3] ?? '' })
  }
  return rows
}

function parseCell (cell) {
  const ticked = cell.match(/`([^`]+)`/)
  const value = (ticked ? ticked[1] : cell).trim()
  if (value.endsWith('/...')) return { kind: 'catchall-prefix', prefix: value.slice(0, -4) }
  if (value.startsWith('/')) return { kind: 'path', path: value }
  if (/catch-all/i.test(cell)) return { kind: 'catchall-any' }
  return { kind: 'unknown', raw: cell }
}

const normalize = (path) => (path.length > 1 ? path.replace(/\/+$/, '') : path)

function matchRoute (routes, path) {
  const target = normalize(path)
  const exact = routes.filter((route) => !route.catchAll && routeToRegex(route.path).test(target))
  if (exact.length) return exact[0]
  const fallback = routes.filter((route) => route.catchAll && routeToRegex(route.path).test(target))
  return fallback[0] ?? null
}

function main () {
  return loadRoutes().then(async (routes) => {
    const specRows = parseSpecRows(readFileSync(specFile, 'utf8'))
    const { routeManifest: manifest, localizeRoute } = await import(pathToFileURL(manifestFile).href)
    const resolver = createRouter({ history: createMemoryHistory(), routes })
    const pending = new Map(PENDING.map((entry) => [entry.routeKey, entry]))
    const routerSource = readFileSync(routerFile, 'utf8')

    const lines = []
    let pass = 0
    let fail = 0
    let skipped = 0
    let slashChecked = 0
    let slashOk = 0

    for (const row of specRows) {
      for (const [locale, cell] of [['zh', row.zh], ['en', row.en]]) {
        const expected = parseCell(cell)
        const label = `${row.routeKey} ${locale}`
        const holder = pending.get(row.routeKey)
        const report = (status, detail) => {
          lines.push(`[${status}] ${label.padEnd(22)} ${cell.padEnd(20)} ${detail}`)
        }

        if (expected.kind === 'unknown') {
          fail += 1
          report('FAIL', '规格单元格无法解析（既不是路径也不是 catch-all），请同步本脚本')
          continue
        }

        if (holder) {
          skipped += 1
          report('PENDING', `未实现：${holder.reason}（${holder.owner}）`)
          continue
        }

        if (expected.kind === 'catchall-any') {
          const hit = routes.find((route) => route.catchAll && !route.path.startsWith('/en'))
          if (hit) { pass += 1; report('PASS', `命中 catch-all ${hit.path} (${hit.name})`) } else { fail += 1; report('FAIL', '缺少中文 catch-all 路由') }
          continue
        }

        if (expected.kind === 'catchall-prefix') {
          const hit = routes.find((route) => route.catchAll && route.path.startsWith(expected.prefix))
          if (hit) { pass += 1; report('PASS', `命中 catch-all ${hit.path} (${hit.name})`) } else { fail += 1; report('FAIL', `缺少 ${expected.prefix} 下的 catch-all 路由`) }
          continue
        }

        const hit = matchRoute(routes, expected.path)
        if (!hit || hit.catchAll) {
          fail += 1
          report('FAIL', hit ? `只命中 catch-all ${hit.path}，没有独立路由` : '没有任何路由匹配')
          continue
        }
        pass += 1
        report('PASS', `命中 ${hit.path} (${hit.name})`)

        if (expected.path !== '/') {
          slashChecked += 1
          const slashHit = matchRoute(routes, `${normalize(expected.path)}/`)
          if (slashHit && slashHit.name === hit.name) slashOk += 1
          else lines.push(`[FAIL] ${label} 尾斜杠   ${expected.path}/ 未解析到同一条路由`)
        }
      }
    }

    const manifestPending = []
    const manifestProblems = []
    for (const [key, entry] of Object.entries(manifest)) {
      if (pending.has(key)) { manifestPending.push(key); continue }
      for (const [locale, path] of [['zh', entry.zh], ['en', entry.en]]) {
        if (!path) { manifestProblems.push(`${key}.${locale} 未定义路径`); continue }
        const hit = routes.find((route) => route.path === path)
        if (!hit || hit.name !== entry.names?.[locale === 'en' ? 1 : 0]) {
          manifestProblems.push(`${key}.${locale} ${path} 路径或路由名称不匹配`)
          continue
        }
        const specRow = specRows.find((row) => row.routeKey === key)
        const expected = specRow && parseCell(specRow[locale])
        if (!expected || (expected.kind === 'path' && expected.path !== path) ||
          (expected.kind === 'catchall-any' && (!hit.catchAll || path.startsWith('/en'))) ||
          (expected.kind === 'catchall-prefix' && (!hit.catchAll || !path.startsWith(`${expected.prefix}/`)))) {
          manifestProblems.push(`${key}.${locale} 与 SPEC 路由契约不匹配`)
        }
        try {
          const params = key.endsWith('.detail') ? { id: 'sample / 中文?#' } : key === 'notFound' ? { pathMatch: ['missing', '中文'] } : {}
          const query = { page: '2', category: 'AI & Web' }
          const location = localizeRoute({ routeKey: key, locale: locale === 'en' ? 'en' : 'zh-CN', params, query, hash: '#section' })
          const resolved = resolver.resolve(location)
          const roundTrip = resolver.resolve(resolved.fullPath)
          assert.equal(resolved.name, hit.name)
          assert.equal(roundTrip.name, hit.name)
          assert.deepEqual(roundTrip.params, params)
          assert.deepEqual(roundTrip.query, query)
          assert.equal(roundTrip.hash, '#section')
        } catch (error) {
          manifestProblems.push(`${key}.${locale} localizeRoute 解析失败：${error.message}`)
        }
      }
    }
    const missingInManifest = specRows.map((row) => row.routeKey).filter((key) => !(key in manifest))
    try {
      for (const routeKey of ['case.detail', 'news.detail']) {
        for (const locale of ['zh-CN', 'en']) {
          assert.throws(() => resolver.resolve(localizeRoute({ routeKey, locale })), /Missing required param/)
          assert.ok(resolver.resolve(localizeRoute({ routeKey, locale, params: { id: 0 } })).path.endsWith('/0'))
        }
      }
      for (const routeKey of ['unknown', 'toString', '__proto__']) {
        assert.throws(() => localizeRoute({ routeKey, locale: 'en' }), /Unknown route or locale/)
      }
      for (const locale of [undefined, 'fr']) {
        assert.throws(() => localizeRoute({ routeKey: 'home', locale }), /Unknown route or locale/)
      }
      assert.throws(() => localizeRoute({ routeKey: 'home', locale: 'en', hash: 'section' }), /Hash/)
    } catch (error) {
      manifestProblems.push(`localizeRoute 边界检查失败：${error.message}`)
    }

    lines.push('')
    const slashGuardOk = routerSource.includes("endsWith('/')") && routerSource.includes('/\\/+$/')
    const slashOkFinal = slashOk === slashChecked && slashGuardOk
    lines.push(`尾斜杠规范化：match ${slashOk}/${slashChecked}，router beforeEach 守卫 ${slashGuardOk ? '存在' : '缺失'} → ${slashOkFinal ? 'PASS' : 'FAIL'}`)
    lines.push(`routeManifest：${Object.keys(manifest).length} 条记录，${manifestProblems.length === 0 ? 'PASS' : 'FAIL'}`)
    for (const problem of manifestProblems) lines.push(`[FAIL] routeManifest ${problem}`)
    if (missingInManifest.length) {
      lines.push(`[WARN] routeManifest 尚未覆盖 §3 的 ${missingInManifest.length} 个 routeKey：${missingInManifest.join(', ')}`)
    }
    for (const entry of PENDING) lines.push(`[PENDING] ${entry.routeKey} — ${entry.reason}（${entry.owner}）`)
    for (const key of manifestPending) lines.push(`[PENDING] routeManifest ${key} 指向尚未实现的路由（同上）`)

    const slashFail = slashOkFinal ? 0 : 1
    const manifestFail = manifestProblems.length
    const warnFail = strict && missingInManifest.length ? 1 : 0
    const pendingFail = strict ? PENDING.length : 0
    const totalFail = fail + slashFail + manifestFail + warnFail + pendingFail

    console.log('FRONTEND.md §3 路由契约检查（router routes ↔ routeManifest）')
    console.log(lines.join('\n'))
    console.log('')
    console.log(`结果：PASS ${pass} / FAIL ${fail + slashFail + manifestFail + warnFail} / PENDING ${skipped}${strict ? '（--strict）' : ''}`)
    if (strict && pendingFail) console.log('严格模式退出码为 1：仍有 PENDING 路由，不能视为全部通过。')

    return totalFail === 0 ? 0 : 1
  })
}

main()
  .then((code) => process.exit(code))
  .catch((error) => {
    console.error(`[FAIL] check:routes 无法执行：${error.message}`)
    process.exit(1)
  })

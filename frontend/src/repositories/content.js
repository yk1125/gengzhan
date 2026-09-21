import { getCaseDetail, getCases, getNews as getNewsRequest, getNewsDetail } from '@/api'
import { customerLogos, CUSTOMER_ASSET_BASE } from '@/content/home'
import { contentMode, hasMockResource } from '@/config/contentMode'

const mockCases = [
  { id: 'demo-1', title: '中广电器集团 · 数字品牌官网', titleEn: 'Zhongguang · Digital Brand Platform', summary: '用清晰的内容结构与沉浸式视觉，讲好制造企业的产品与服务。', summaryEn: 'A clear content system and immersive visual language for a modern manufacturing brand.', categoryId: 'web', categoryLabel: '网站建设', categoryLabelEn: 'Web design', cover: { id: 'demo-1-cover', src: '/assets/cases/83db3640125b7463feef8d0221cc5f27.webp', alt: '数字品牌官网' }, gallery: ['/assets/cases/83db3640125b7463feef8d0221cc5f27.webp', '/assets/services/web-media.jpg'], technologies: ['WEB', 'UX', 'CONTENT'], publishedAt: '2026-01-15', description: '从品牌内容到服务入口，重新组织制造企业的数字体验。', descriptionEn: 'A rebuilt digital experience connecting brand content and service entry points.', projectLink: null, bodyHtml: '<p>这是用于预览的案例内容。项目以真实业务目标为起点，将信息架构、视觉系统和交互体验统一到一个可持续维护的产品中。</p>' },
  { id: 'demo-2', title: '企业知识工作台', titleEn: 'Enterprise Knowledge Workspace', summary: '把复杂资料变成团队每天都能使用的决策工具。', summaryEn: 'Turning complex information into a decision tool teams can use every day.', categoryId: 'ai', categoryLabel: 'AI 应用', categoryLabelEn: 'AI product', cover: { id: 'demo-2-cover', src: '/assets/services/ai-media.jpg', alt: '企业知识工作台' }, gallery: ['/assets/services/ai-media.jpg'], technologies: ['AI', 'DATA', 'WORKFLOW'], publishedAt: '2025-12-08', description: '从资料沉淀到检索与问答，建立可信的知识流转。', descriptionEn: 'A trusted flow from information capture to retrieval and answers.', bodyHtml: '<p>演示项目将知识整理、权限边界与问答体验放在同一条产品路径中，帮助团队更快找到可信信息。</p>' },
  { id: 'demo-3', title: '零售服务小程序', titleEn: 'Retail Service Mini Program', summary: '连接门店、商品与服务，让每一次使用都更轻。', summaryEn: 'Connecting stores, products and service in a lighter daily experience.', categoryId: 'mini', categoryLabel: '小程序', categoryLabelEn: 'Mini program', cover: { id: 'demo-3-cover', src: '/assets/services/mini-media.jpg', alt: '零售服务小程序' }, gallery: ['/assets/services/mini-media.jpg', '/assets/services/web-media.jpg'], technologies: ['MINI', 'UX'], publishedAt: '2025-11-21', description: '围绕门店服务和用户任务，减少不必要的操作与等待。', descriptionEn: 'A lighter flow for store service and everyday customer tasks.', bodyHtml: '<p>演示项目围绕高频服务任务展开，让门店、商品和用户之间的连接更自然。</p>' }
]
const mockNews = [
  { id: '1', title: '把模型能力放进真实业务', titleEn: 'Putting model capability into real business', summary: '可验收的场景、清晰的数据边界和可持续的工程，决定 AI 能否真正落地。', summaryEn: 'Verifiable scenarios, clear data boundaries and sustainable engineering make AI useful.', categoryId: 'insight', categoryLabel: '行业观察', categoryLabelEn: 'Industry insight', cover: { id: 'news-1-cover', src: '/assets/services/ai-media.jpg', alt: 'AI 行业观察' }, publishedAt: '2026-01-12', author: '耘栈团队', sourceLabel: '耘栈科技研究室', bodyHtml: '<h2>从演示走向交付</h2><p>AI 产品的价值不在一次漂亮的演示，而在真实团队可以持续使用、验证和改进的流程里。</p><p>先把边界说清楚，再把体验做简单，最后用工程把它稳定下来。</p>', bodyHtmlEn: '<h2>From demo to delivery</h2><p>The value of an AI product is not a polished demo, but a workflow real teams can use, validate and improve.</p><p>Define the boundaries first, simplify the experience, then make it reliable through engineering.</p>', sourceUrl: 'https://www.yunzhan.com' },
  { id: '2', title: '从需求到产品的实践', titleEn: 'From requirements to product', summary: '把设计、研发与业务放在同一张进度表上，交付才会更稳。', summaryEn: 'Delivery becomes steadier when design, engineering and business share one plan.', categoryId: 'practice', categoryLabel: '实践分享', categoryLabelEn: 'Practice', cover: { id: 'news-2-cover', src: '/assets/services/web-media.jpg', alt: '产品实践' }, publishedAt: '2025-12-18', author: '耘栈团队', sourceLabel: '耘栈科技研究室', bodyHtml: '<h2>共同语言</h2><p>好的产品协作不是增加会议，而是让每个人都能看见目标、边界与下一步。</p>', bodyHtmlEn: '<h2>A shared language</h2><p>Good product collaboration is not more meetings. It is making goals, boundaries and next steps visible to everyone.</p>' },
  { id: '3', title: '数字化产品的下一步', titleEn: 'The next step for digital products', summary: '上线不是终点，持续观察和复盘才让产品真正变好。', summaryEn: 'Launch is not the finish line; observation and reflection keep products improving.', categoryId: 'insight', categoryLabel: '行业观察', categoryLabelEn: 'Industry insight', cover: { id: 'news-3-cover', src: '/assets/services/custom-media.jpg', alt: '数字化产品' }, publishedAt: '2025-11-30', author: '耘栈团队', sourceLabel: '耘栈科技研究室', bodyHtml: '<h2>保持可观察</h2><p>把反馈变成可行动的信息，产品才能在真实环境中持续靠近用户。</p>', bodyHtmlEn: '<h2>Stay observable</h2><p>Turn feedback into actionable information and the product can keep getting closer to its users.</p>' },
  { id: '4', title: '轻量应用也需要长期主义', titleEn: 'Small products need a long-term view', summary: '小规模上线不等于低标准，稳定维护才是产品价值的延续。', summaryEn: 'A small launch does not mean lower standards; maintenance sustains product value.', categoryId: 'practice', categoryLabel: '实践分享', categoryLabelEn: 'Practice', cover: { id: 'news-4-cover', src: '/assets/services/mini-media.jpg', alt: '轻量应用' }, publishedAt: '2025-10-21', author: '耘栈团队', sourceLabel: '耘栈科技研究室', bodyHtml: '<p>真正轻量的产品，是让复杂性留在系统里，而不是交给用户承担。</p>', bodyHtmlEn: '<p>A truly light product keeps complexity in the system instead of passing it on to users.</p>' },
  { id: '5', title: '把数据边界放在设计之前', titleEn: 'Put data boundaries before design', summary: '智能产品从一开始就要明确什么可以使用，什么必须被保护。', summaryEn: 'Intelligent products should define what may be used and what must be protected from the start.', categoryId: 'insight', categoryLabel: '行业观察', categoryLabelEn: 'Industry insight', cover: { id: 'news-5-cover', src: '/assets/services/iot-media.jpg', alt: '数据边界' }, publishedAt: '2025-09-12', author: '耘栈团队', sourceLabel: '耘栈科技研究室', bodyHtml: '<p>清晰的数据边界让产品更可信，也让团队更敢于把能力交到用户手里。</p>', bodyHtmlEn: '<p>Clear data boundaries make products more trustworthy and help teams deliver with confidence.</p>' },
  { id: '6', title: '从原型到上线的协作节奏', titleEn: 'The rhythm from prototype to launch', summary: '让每一次发布都更稳，需要设计、研发与业务保持同一张进度表。', summaryEn: 'A steady release rhythm comes from one shared plan across design, engineering and business.', categoryId: 'practice', categoryLabel: '实践分享', categoryLabelEn: 'Practice', cover: { id: 'news-6-cover', src: '/assets/services/app-media.jpg', alt: '协作节奏' }, publishedAt: '2025-08-08', author: '耘栈团队', sourceLabel: '耘栈科技研究室', bodyHtml: '<p>把关键决策记录下来，团队就能把一次交付变成下一次迭代的起点。</p>', bodyHtmlEn: '<p>Record the key decisions and one delivery becomes the starting point for the next iteration.</p>' }
]

function payload (response) {
  return response?.data ?? response
}

function records (response) {
  const value = payload(response)
  if (Array.isArray(value)) return value
  return value?.records || value?.list || []
}

function media (value, id, role, index = 0) {
  if (!value) return null
  if (typeof value === 'string') return { id: `${id}-${role}-${index}`, src: value, alt: '' }
  return { id: String(value.id ?? `${id}-${role}-${index}`), src: value.src || value.url || value.path || '', alt: value.alt || value.name || '' }
}

function projectLink (value) {
  if (!value) return null
  const raw = typeof value === 'object' ? value : { value }
  const candidate = String(raw.value ?? raw.url ?? '').trim()
  if (!candidate) return null
  if (candidate.startsWith('#小程序://') || raw.kind === 'mini-program-code') {
    return { kind: 'mini-program-code', value: candidate }
  }
  if (raw.kind === 'url' || /^https?:\/\//i.test(candidate)) {
    return /^https?:\/\//i.test(candidate) ? { kind: 'url', value: candidate } : { kind: 'text', value: candidate }
  }
  return { kind: 'text', value: candidate }
}

function normalizeCase (raw, index = 0) {
  const id = String(raw?.id ?? `case-${index + 1}`)
  const sourceImages = raw?.images ?? raw?.gallery
  const images = Array.isArray(sourceImages) ? sourceImages : typeof sourceImages === 'string' ? sourceImages.split(/[,|]/).map(item => item.trim()).filter(Boolean) : []
  const cover = media(raw?.cover || raw?.coverImage || raw?.image || images[0], id, 'cover')
  return {
    id,
    title: String(raw?.title || ''),
    titleEn: String(raw?.titleEn || raw?.title || ''),
    summary: String(raw?.summary || raw?.excerpt || raw?.description || ''),
    summaryEn: String(raw?.summaryEn || raw?.summary || raw?.excerpt || ''),
    categoryId: String(raw?.categoryId || raw?.type || raw?.category || 'other'),
    categoryLabel: String(raw?.categoryLabel || raw?.category || raw?.type || '其他'),
    categoryLabelEn: String(raw?.categoryLabelEn || raw?.categoryLabel || raw?.category || 'Other'),
    cover,
    gallery: images.map((item, imageIndex) => media(item, id, 'gallery', imageIndex)).filter(item => item?.src),
    description: String(raw?.description || raw?.summary || ''),
    descriptionEn: String(raw?.descriptionEn || raw?.description || raw?.summary || ''),
    bodyHtml: typeof raw?.bodyHtml === 'string' ? raw.bodyHtml : undefined,
    bodyHtmlEn: typeof raw?.bodyHtmlEn === 'string' ? raw.bodyHtmlEn : undefined,
    technologies: Array.isArray(raw?.technologies) ? raw.technologies.map(String) : [],
    duration: raw?.duration ? String(raw.duration) : undefined,
    publishedAt: raw?.publishedAt || raw?.publishTime || raw?.createTime || raw?.date,
    projectLink: projectLink(raw?.projectLink)
  }
}

function normalizeNews (raw, index = 0) {
  const id = String(raw?.id ?? `news-${index + 1}`)
  return {
    id,
    title: String(raw?.title || ''),
    titleEn: String(raw?.titleEn || raw?.title || ''),
    summary: String(raw?.summary || raw?.excerpt || ''),
    summaryEn: String(raw?.summaryEn || raw?.summary || raw?.excerpt || ''),
    categoryId: String(raw?.categoryId || raw?.category || 'other'),
    categoryLabel: String(raw?.categoryLabel || raw?.category || '其他'),
    categoryLabelEn: String(raw?.categoryLabelEn || raw?.categoryLabel || raw?.category || 'Other'),
    cover: media(raw?.cover || raw?.coverImage || raw?.image, id, 'cover'),
    publishedAt: raw?.publishedAt || raw?.publishTime || raw?.createTime || raw?.date,
    author: raw?.author ? String(raw.author) : undefined,
    bodyHtml: String(raw?.bodyHtml || raw?.content || ''),
    bodyHtmlEn: String(raw?.bodyHtmlEn || raw?.contentEn || raw?.bodyHtml || raw?.content || ''),
    sourceLabel: raw?.sourceLabel,
    sourceUrl: raw?.sourceUrl
  }
}

function listResult (items, options, source) {
  const page = Number(options.page || 1)
  const pageSize = Number(options.pageSize || 9)
  const category = options.category || 'all'
  const filtered = category === 'all' ? items : items.filter(item => item.categoryId === category)
  const visible = source === 'mock' ? filtered.slice((page - 1) * pageSize, page * pageSize) : filtered
  return { items: visible, page, pageSize, total: source === 'mock' ? filtered.length : null, hasNext: source === 'mock' ? page * pageSize < filtered.length : null, categories: [...new Set(items.map(item => ({ id: item.categoryId, label: item.categoryLabel })).map(item => JSON.stringify(item)))].map(item => JSON.parse(item)), capabilities: { pagination: source === 'mock' ? 'complete-local' : 'unavailable', categoryFilter: source === 'mock' ? 'complete-local' : 'unavailable' }, source }
}

export async function listCases (options = {}) {
  if (hasMockResource('cases')) return listResult(mockCases.map(normalizeCase), options, 'mock')
  const response = await getCases({ page: options.page || 1, size: options.pageSize || 9, category: options.category === 'all' ? undefined : options.category }, { signal: options.signal, silent: true })
  return listResult(records(response).map(normalizeCase), options, 'api')
}

export async function getCase ({ id, signal } = {}) {
  if (hasMockResource('cases')) {
    const item = mockCases.find(caseItem => caseItem.id === String(id))
    if (!item) throw Object.assign(new Error('Case not found'), { type: 'not-found' })
    return { item: normalizeCase(item), source: 'mock', translationStatus: 'complete' }
  }
  const response = await getCaseDetail(id, { signal, silent: true })
  const item = normalizeCase(payload(response))
  if (!item.id || item.id !== String(id)) throw Object.assign(new Error('Case not found'), { type: 'not-found' })
  return { item, source: 'api', translationStatus: 'source-only' }
}

export async function listNews (options = {}) {
  if (hasMockResource('news')) return listResult(mockNews, options, 'mock')
  const response = await getNewsRequest({ page: options.page || 1, size: options.pageSize || 10, category: options.category === 'all' ? undefined : options.category }, { signal: options.signal, silent: true })
  return listResult(records(response).map(normalizeNews), options, 'api')
}

export async function getNews ({ id, signal } = {}) {
  if (hasMockResource('news')) {
    const item = mockNews.find(newsItem => newsItem.id === String(id))
    if (!item) throw Object.assign(new Error('News not found'), { type: 'not-found' })
    return { item: normalizeNews(item), source: 'mock', translationStatus: 'complete' }
  }
  const response = await getNewsDetail(id, { signal, silent: true })
  const item = normalizeNews(payload(response))
  if (!item.id || item.id !== String(id)) throw Object.assign(new Error('News not found'), { type: 'not-found' })
  return { item, source: 'api', translationStatus: 'source-only' }
}

export async function listCustomers ({ signal } = {}) {
  if (contentMode === 'mock') return { items: customerLogos().map(logo => ({ ...logo, src: `${CUSTOMER_ASSET_BASE}/${logo.file}` })), source: 'mock' }
  try {
    const { getCustomers } = await import('@/api')
    const response = await getCustomers({ signal, silent: true })
    const items = records(response).map((item, index) => ({ id: String(item.id ?? `api-customer-${index}`), key: String(item.key ?? item.id ?? `api-customer-${index}`), file: item.file || item.src || item.url, src: item.src || item.url || item.file, height: Number(item.height) || 36, alt: item.alt || item.name || '' })).filter(item => item.src)
    if (items.length) return { items, source: 'api' }
  } catch (error) {
    // BACKEND-TODO(B01): confirm customer logo endpoint, fields, ordering and completeness.
  }
  return { items: customerLogos().map(logo => ({ ...logo, src: `${CUSTOMER_ASSET_BASE}/${logo.file}` })), source: 'local-fallback' }
}

/**
 * 首页内容与素材登记（归属 Session B · 页面：Home/index.vue）
 *
 * 素材事实全部来自 T00A 的登记，不在此处二次编造：
 * - 24 张客户 Logo：`frontend/public/assets/customers/jun_1.svg` … `jun_24.svg`
 *   （登记表：docs/frontend-rebuild/evidence/reference-assets/INDEX.md 与 assets-manifest.json）
 * - 12 条服务切换过渡视频：`frontend/public/assets/transitions/w*.mp4`（亮）与
 *   `transitions/black/*.mp4`（暗），按「源站服务序号 从-到」成对存在，共 6 对
 * - 首屏视频使用项目自有素材（PC/移动各一条），不使用参考站 banner.mp4：
 *   该文件为 HEVC + 37.4MB 且画面内含烘焙中文（T00A manifest G2、INTEGRATION-NOTES §6）
 *
 * 公司事实（PRD §1「品牌与内容事实」，用户已确认）：2015 年成立、200+ 企业客户、
 * 98% 客户满意度、CMMI 3、24/7 技术支持；微信 yunzhankk、邮箱 yunzhan1129@163.com、
 * 地区北京市昌平区。文档未提供电话/街道地址/二维码，因此页面不得出现这些内容。
 */

/** 客户 Logo 在源站的原始内联高度（px），键为源站序号 1…24（T00A INDEX.md「原始内联高度」列）。 */
export const CUSTOMER_SOURCE_HEIGHTS = {
  1: 32, 2: 23, 3: 16, 4: 24.5, 5: 21, 6: 28, 7: 28, 8: 28,
  9: 23, 10: 23, 11: 32, 12: 18, 13: 25.5, 14: 28, 15: 19, 16: 20,
  17: 28, 18: 33, 19: 30, 20: 22, 21: 30, 22: 23, 23: 22, 24: 14
}

/**
 * 本项目固定的客户墙换序表（用户已确认，REFERENCE §3 / T00A manifest「本项目固定换序」）。
 * 语义：显示位置 p（1 基）放源站第 CUSTOMER_REORDER[p-1] 张 Logo。硬编码，运行时不再随机，
 * 因此刷新、切语言、切主题都不会重排。
 */
export const CUSTOMER_REORDER = [
  7, 19, 2, 14, 23, 5, 11, 1, 17, 9, 24, 4, 16, 8, 21, 12, 3, 20, 6, 22, 10, 15, 18, 13
]

/** 客户墙槽位划分：PC 8 槽 × 每槽 3 张、移动 4 槽 × 每槽 6 张（同一批 24 张）。 */
export const CUSTOMER_SLOT_SIZE_PC = 3
export const CUSTOMER_SLOT_SIZE_MOBILE = 6

/** 客户墙素材前缀与文件后缀（本地副本，禁止引用参考站域名）。 */
export const CUSTOMER_ASSET_BASE = '/assets/customers'

/**
 * 按显示顺序（固定换序后）返回 24 个客户 Logo。
 * @returns {{ key: string, file: string, height: number }[]}
 */
export function customerLogos () {
  return CUSTOMER_REORDER.map((sourceIndex, position) => ({
    key: `position-${position + 1}`,
    file: `jun_${sourceIndex}.svg`,
    height: CUSTOMER_SOURCE_HEIGHTS[sourceIndex]
  }))
}

/**
 * 把 24 张 Logo 切成槽位；每槽是一列独立的纵向轮播（SPEC M-11）。
 * @param {number} perSlot 每槽张数（PC 3 / 移动 6）
 */
export function customerSlots (perSlot) {
  const logos = customerLogos()
  const slots = []
  for (let i = 0; i < logos.length; i += perSlot) {
    slots.push(logos.slice(i, i + perSlot))
  }
  return slots
}

/** 首屏视频：项目自有素材，PC 与移动按断点分别选择（不双份加载）。 */
export const HOME_BANNER_MEDIA = {
  desktop: '/yunzhan-hero.mp4',
  mobile: '/yunzhan-hero-mobile-v3.mp4'
}

/** index4 品牌宣言区块的背景图（项目自有素材）。 */
export const HOME_STATEMENT_BG = '/services-showcase.jpg'

/**
 * 四项主服务（FRONTEND §3：AI、mini、app、web 四项内部路由）。
 * `transitionIndex` 显式声明本产品服务槽位与源站过渡视频编号的对应关系，
 * 不使用翻译后的标题或 class 字符串猜测（FRONTEND §8）。
 * 注意：源站过渡视频只捕获了 1/2/3 三个编号之间的 6 对；涉及第 4 槽的方向无素材，
 * 见 SERVICE_TRANSITIONS 的 null 声明与 handoffs/B.md 的素材缺口登记。
 */
export const HOME_SERVICES = [
  { id: 'ai', transitionIndex: 1, paths: { 'zh-CN': '/ai-development', en: '/en/ai-development' } },
  { id: 'mini', transitionIndex: 2, paths: { 'zh-CN': '/miniprogram-development', en: '/en/miniprogram-development' } },
  { id: 'app', transitionIndex: 3, paths: { 'zh-CN': '/app-development', en: '/en/app-development' } },
  { id: 'web', transitionIndex: 4, paths: { 'zh-CN': '/web-development', en: '/en/web-development' } }
]

/**
 * 服务切换过渡视频：键为「源站服务序号 从-到」，亮色取 transitions/ 根目录，
 * 暗色取 transitions/black/（T00A INTEGRATION-NOTES §5）。null = 素材未捕获，不伪造替代。
 */
export const SERVICE_TRANSITIONS = {
  '1-2': { light: '/assets/transitions/w1-2.mp4', dark: '/assets/transitions/black/1-2.mp4' },
  '2-1': { light: '/assets/transitions/w2-1.mp4', dark: '/assets/transitions/black/2-1.mp4' },
  '1-3': { light: '/assets/transitions/w1-3.mp4', dark: '/assets/transitions/black/1-3.mp4' },
  '3-1': { light: '/assets/transitions/w3-1.mp4', dark: '/assets/transitions/black/3-1.mp4' },
  '2-3': { light: '/assets/transitions/w2-3.mp4', dark: '/assets/transitions/black/2-3.mp4' },
  '3-2': { light: '/assets/transitions/w3-2.mp4', dark: '/assets/transitions/black/3-2.mp4' }
}

/** 所有过渡视频的键（渲染用，顺序固定）。 */
export const TRANSITION_KEYS = Object.keys(SERVICE_TRANSITIONS)

/** 首页双语内容。新增/修改文案只改这里，模板不写字面量。 */
export const homeContent = {
  'zh-CN': {
    hero: {
      eyebrow: 'YUNZHAN TECHNOLOGY / BEIJING',
      lines: ['把想法做成产品', 'AI 应用与企业级软件的一站式交付'],
      desc: '北京耘栈科技有限公司成立于 2015 年，已服务 200+ 企业客户，提供 24/7 技术支持。',
      primary: '开始沟通',
      secondary: '探索服务'
    },
    wall: {
      headline: '我们的客户',
      title: ['2015 年成立', '耘栈只专注企业级数字化产品与 AI 应用落地。']
    },
    intro: {
      eyebrow: '01 / INTRODUCTION',
      paragraphs: [
        '北京耘栈科技有限公司专注企业级软件与 AI 应用的一站式交付：从策略、设计到工程实现，由同一个团队负责到底。',
        '2015 年成立至今，我们服务了 200+ 企业客户，客户满意度 98%，通过 CMMI 3 认证，并提供 24/7 技术支持。',
        '业务覆盖 AI 开发、小程序开发、APP 开发与 WEB 网站开发；擅长把复杂业务拆成可交付、可演进的软件。'
      ],
      more: '认识耘栈'
    },
    capability: {
      eyebrow: '02 / CAPABILITY',
      title: ['四项主服务', '从策略到上线，同一个团队负责到底。'],
      more: '咨询服务方案',
      itemLink: '了解服务详情',
      services: {
        ai: { label: 'AI 应用落地', name: 'AI 开发', desc: '把模型能力接进真实业务流程，先做可验收的场景，再谈规模化。' },
        mini: { label: '微信生态入口', name: '小程序开发', desc: '微信生态内的服务与交易入口，轻量、可迭代、指标可追踪。' },
        app: { label: '移动端原生体验', name: 'APP 开发', desc: '面向 iOS 与 Android 的原生体验，覆盖从原型到上架的全流程。' },
        web: { label: '官网与业务前端', name: 'WEB 网站开发', desc: '企业官网与业务系统前端，兼顾性能、可维护性与品牌表达。' }
      },
      factsTitle: '交付能力',
      facts: [
        { value: '2015', label: '成立年份', desc: '十年以上企业级软件交付经验。' },
        { value: '200+', label: '企业客户', desc: '覆盖制造、新能源、医疗健康等行业。' },
        { value: '98%', label: '客户满意度', desc: '来自已完成项目的用户确认结果。' },
        { value: 'CMMI 3', label: '过程能力', desc: '按 CMMI 3 过程规范管理交付。' }
      ]
    },
    statement: {
      groups: [
        { title: '与值得信赖的伙伴长期共创。', sub: '把一次合作，做成持续多年的技术伙伴关系。' },
        { title: '把你的想法，变成真正被使用的产品。', sub: '从第一行需求到长期维护，我们都在现场。' }
      ],
      transitionMissing: '该方向的服务切换视频素材尚未取得，按素材缺口处理，不播放替代画面。'
    },
    insights: {
      eyebrow: '03 / INSIGHTS',
      title: '了解我们的项目与动态',
      demoLabel: '演示数据，仅用于预览',
      more: '全部案例',
      newsMore: '行业资讯'
    },
    cta: {
      eyebrow: '04 / START A PROJECT',
      title: '把你的想法，变成真正被使用的产品。',
      primary: '开始沟通',
      secondary: 'AI 咨询',
      contact: '微信 yunzhankk ／ 邮箱 yunzhan1129@163.com ／ 北京市昌平区'
    }
  },
  en: {
    hero: {
      eyebrow: 'YUNZHAN TECHNOLOGY / BEIJING',
      lines: ['Turn ideas into products', 'One partner for AI applications and enterprise software'],
      desc: 'Beijing Yunzhan Technology was founded in 2015, serves 200+ enterprise clients and provides 24/7 support.',
      primary: 'Start a conversation',
      secondary: 'Explore services'
    },
    wall: {
      headline: 'Our customers',
      title: ['Since 2015', 'Yunzhan focuses on enterprise digital products and applied AI.']
    },
    intro: {
      eyebrow: '01 / INTRODUCTION',
      paragraphs: [
        'Beijing Yunzhan Technology delivers enterprise software and AI applications end to end: strategy, design and engineering stay with one team.',
        'Founded in 2015, we have served 200+ enterprise clients with a 98% satisfaction rate, hold CMMI 3 process compliance and provide 24/7 technical support.',
        'Our work covers AI development, mini program development, app development and web development, turning complex business rules into shippable software.'
      ],
      more: 'About Yunzhan'
    },
    capability: {
      eyebrow: '02 / CAPABILITY',
      title: ['Four core services', 'One team from strategy to launch.'],
      more: 'Talk to us about services',
      itemLink: 'Service details',
      services: {
        ai: { label: 'Applied AI delivery', name: 'AI development', desc: 'Bring model capability into real processes: prove a usable scenario first, scale second.' },
        mini: { label: 'WeChat ecosystem entry', name: 'Mini program development', desc: 'Service and commerce entry points inside WeChat: light, iterable, measurable.' },
        app: { label: 'Native mobile experience', name: 'App development', desc: 'Native experience for iOS and Android, from prototype to store release.' },
        web: { label: 'Website and business front end', name: 'Web development', desc: 'Corporate sites and business front ends balancing performance, maintenance and brand.' }
      },
      factsTitle: 'Delivery capability',
      facts: [
        { value: '2015', label: 'Founded', desc: 'More than a decade of enterprise delivery.' },
        { value: '200+', label: 'Enterprise clients', desc: 'Manufacturing, new energy, healthcare and more.' },
        { value: '98%', label: 'Satisfaction', desc: 'Confirmed by clients of delivered projects.' },
        { value: 'CMMI 3', label: 'Process level', desc: 'Delivery managed under CMMI 3 process discipline.' }
      ]
    },
    statement: {
      groups: [
        { title: 'Long-term partnership, not one-off delivery.', sub: 'We stay as your technical partner for years, not weeks.' },
        { title: 'Turn your idea into a product people actually use.', sub: 'From the first requirement to long-term maintenance, we stay on site.' }
      ],
      transitionMissing: 'The transition video for this pair of services has not been captured yet, so no substitute footage is played.'
    },
    insights: {
      eyebrow: '03 / INSIGHTS',
      title: 'Projects and updates',
      demoLabel: 'Demo data, preview only',
      more: 'All cases',
      newsMore: 'Industry news'
    },
    cta: {
      eyebrow: '04 / START A PROJECT',
      title: 'Bring your next idea into the world.',
      primary: 'Start a conversation',
      secondary: 'AI consultation',
      contact: 'WeChat yunzhankk / yunzhan1129@163.com / Changping, Beijing'
    }
  }
}

export default homeContent

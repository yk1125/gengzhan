<template>
  <main ref="rootEl" class="service-page" :class="`service-page--${page.kind}`">
    <section class="service-hero">
      <div class="service-shell service-hero__inner">
        <p class="service-kicker">YUNZHAN / {{ page.en }}</p>
        <div class="service-hero__copy">
          <h1 class="each_animate" :class="{ on: titleIn }">
            <span
              v-for="(char, index) in titleChars"
              :key="index"
              :style="titleCharStyle(index, char)"
              >{{ char }}</span
            >
          </h1>
          <p>{{ page.subtitle }}</p>
        </div>
        <p class="service-hero__index">0{{ page.order }} / 07</p>
      </div>
    </section>

    <section v-if="page.kind === 'ai'" class="ai-architecture service-section">
      <div class="service-shell ai-architecture__head" data-aos="fade-top">
        <p class="service-kicker">01 / FROM DATA TO ACTION</p>
        <div>
          <h2 data-aos="fade-clip">把企业已有资料，<br />变成随时可用的智能助手。</h2>
          <p>
            不必从零开始。制度、产品资料、历史案例和业务流程，经过整理后就能成为 AI 的可靠依据。
          </p>
        </div>
      </div>
      <div class="service-shell ai-flow" data-aos="fade-top" data-aos-delay="100">
        <article>
          <span>第一步</span>
          <h3>整理企业资料</h3>
          <p>制度、文档、产品手册、历史工单</p>
        </article>
        <b>→</b>
        <article>
          <span>第二步</span>
          <h3>建立专属知识库</h3>
          <p>统一归档、持续更新、准确检索</p>
        </article>
        <b>→</b>
        <article>
          <span>第三步</span>
          <h3>接入 AI 助手</h3>
          <p>问答、写作、分析与任务协同</p>
        </article>
        <b>→</b>
        <article>
          <span>实际使用</span>
          <h3>服务真实岗位</h3>
          <p>客服、销售、运营和内部员工</p>
        </article>
      </div>
    </section>
    <section v-else-if="page.kind === 'mini'" class="mini-journey service-section">
      <div class="service-shell mini-journey__grid" data-aos="fade-top">
        <div>
          <p class="service-kicker">01 / USER JOURNEY</p>
          <h2 data-aos="fade-clip">把服务放进用户<br />最顺手的入口。</h2>
        </div>
        <div class="mini-phone" data-aos="fade-top" data-aos-delay="100">
          <span>品牌服务</span><b>预约<br />支付<br />会员</b><i></i>
        </div>
        <ol data-aos="fade-top" data-aos-delay="200">
          <li v-for="item in page.modules" :key="item">{{ item }}</li>
        </ol>
      </div>
    </section>
    <section v-else-if="page.kind === 'app'" class="app-product service-section">
      <div class="service-shell" data-aos="fade-top">
        <p class="service-kicker">01 / MOBILE PRODUCT</p>
        <h2 data-aos="fade-clip">让每一次触达，<br />都有完整的产品体验。</h2>
      </div>
      <div class="service-shell app-devices" data-aos="fade-top" data-aos-delay="100">
        <div class="app-device app-device--back"><span>数据总览</span></div>
        <div class="app-device">
          <span>YUNZHAN</span><b>{{ page.modules[0] }}</b
          ><i>{{ page.modules[1] }}</i>
        </div>
        <div class="app-device app-device--small"><span>消息</span><b>01</b></div>
      </div>
    </section>
    <section v-else-if="page.kind === 'web'" class="web-brand service-section">
      <div class="service-shell web-brand__grid" data-aos="fade-top">
        <div>
          <p class="service-kicker">01 / DIGITAL PRESENCE</p>
          <h2 data-aos="fade-clip">让品牌第一眼，<br />就值得被相信。</h2>
          <p class="service-lead">
            从内容逻辑到视觉系统，再到稳定、易维护的技术实现，品牌网站应是一项长期资产。
          </p>
        </div>
        <div class="web-browser" data-aos="fade-top" data-aos-delay="100">
          <div class="web-browser__bar"><i></i><i></i><i></i></div>
          <strong>{{ page.modules[0] }}</strong
          ><span>{{ page.modules[1] }}</span
          ><b>SCROLL TO DISCOVER</b>
        </div>
      </div>
    </section>
    <section v-else-if="page.kind === 'iot'" class="iot-network service-section">
      <div class="service-shell" data-aos="fade-top">
        <p class="service-kicker">01 / CONNECTED SYSTEM</p>
        <h2 data-aos="fade-clip">设备有了语言，<br />现场才真正可见。</h2>
      </div>
      <div class="service-shell iot-dashboard" data-aos="fade-top" data-aos-delay="100">
        <div class="iot-dashboard__main">
          <span>设备运行总览</span><b>98.6<small>%</small></b>
          <p>今日设备在线率</p>
          <i></i>
        </div>
        <div class="iot-dashboard__side">
          <article>
            <span>实时告警</span><b>03</b>
            <p>待处理异常</p>
          </article>
          <article>
            <span>运维工单</span><b>12</b>
            <p>今日任务</p>
          </article>
          <article>
            <span>数据趋势</span><b>稳定</b>
            <p>近 24 小时</p>
          </article>
        </div>
      </div>
    </section>
    <section v-else-if="page.kind === 'custom'" class="custom-system service-section">
      <div class="service-shell custom-system__head" data-aos="fade-top">
        <p class="service-kicker">01 / BUILT FOR YOUR BUSINESS</p>
        <h2 data-aos="fade-clip">不迁就软件，<br />让软件适配组织。</h2>
      </div>
      <div class="service-shell custom-system__steps" data-aos="fade-top" data-aos-delay="100">
        <article v-for="(item, index) in page.modules" :key="item">
          <span>0{{ index + 1 }}</span>
          <h3>{{ item }}</h3>
          <p>{{ page.moduleNotes[index] }}</p>
        </article>
      </div>
    </section>
    <section v-else class="creative-space service-section">
      <div class="service-shell creative-space__top" data-aos="fade-top">
        <p class="service-kicker">01 / CREATIVE TECHNOLOGY</p>
        <h2 data-aos="fade-clip">让内容、空间和技术<br />成为一次完整体验。</h2>
      </div>
      <div class="service-shell creative-panels" data-aos="fade-top" data-aos-delay="100">
        <article>
          <span>01 / BRAND</span>
          <h3>互动品牌体验</h3>
          <p>让品牌故事不止被看见，也能被参与。</p>
        </article>
        <article>
          <span>02 / SPACE</span>
          <h3>数字展陈</h3>
          <p>把空间、屏幕与内容组织成一个现场。</p>
        </article>
        <article>
          <span>03 / MOBILE</span>
          <h3>创意 H5</h3>
          <p>为一次活动或传播，创造可分享的互动入口。</p>
        </article>
      </div>
    </section>

    <section class="service-capabilities service-section">
      <div ref="parallaxHeadEl" class="service-shell service-capabilities__head">
        <p class="service-kicker">02 / WHAT WE DELIVER</p>
        <h2 data-aos="fade-clip">{{ page.capabilityTitle }}</h2>
      </div>
      <div class="service-shell capability-list">
        <article
          v-for="(item, index) in page.capabilities"
          :key="item.title"
          data-aos="fade-top"
          :data-aos-delay="index % 2 === 0 ? 100 : 200"
        >
          <span>0{{ index + 1 }}</span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.text }}</p>
          <b>↗</b>
        </article>
      </div>
    </section>
    <section class="service-approach">
      <div class="service-shell service-approach__grid">
        <div class="headline" data-aos="fade-top">
          <p class="service-kicker">03 / HOW WE WORK</p>
          <span class="headline__line"></span>
        </div>
        <h2 ref="statementEl" class="service-approach__statement public_text" data-speed="200">
          <span class="p"
            ><span class="line">{{ page.statement }}</span></span
          >
          <span class="p" aria-hidden="true">
            <span class="line">{{ page.statement }}</span>
          </span>
        </h2>
        <p class="service-approach__statement-sj public_text sj_text">{{ page.statement }}</p>
        <p data-aos="fade-top">{{ page.description }}</p>
      </div>
    </section>
    <section class="service-switch service-section">
      <div class="service-shell service-switch__head">
        <div class="headline" data-aos="fade-top">
          <p class="service-kicker">04 / EXPLORE SERVICES</p>
          <span class="headline__line"></span>
        </div>
        <h2 data-aos="fade-clip">{{ switchCopy.title }}</h2>
      </div>
      <div class="service-shell service-switch__body">
        <div ref="switchListEl" class="service-switch__list" data-aos="fade-top">
          <button
            v-for="(item, index) in services"
            :key="item.id"
            type="button"
            class="service-switch__item"
            :class="{ on: item.path === page.path || index === pendingIndex }"
            :aria-current="item.path === page.path ? 'true' : undefined"
            :disabled="switching"
            @click="switchService(item, index)"
          >
            <span class="attr" :data-text="item.title">
              <span class="attr__line">{{ item.title }}</span>
            </span>
            <span class="service-switch__en">{{ item.en }}</span>
          </button>
          <span
            class="service-switch__move"
            :style="{ transform: `translateY(${moveOffset}px)` }"
          ></span>
        </div>
        <div
          ref="pictureEl"
          class="service-switch__picture"
          data-aos="fade-top"
          data-aos-delay="100"
        >
          <video
            v-for="clip in transitionClips"
            :key="clip.key"
            :class="clip.key"
            :src="clip.src"
            preload="none"
            muted
            playsinline
          ></video>
          <p class="service-switch__caption">{{ page.title }} / {{ page.en }}</p>
        </div>
        <ul class="service-switch__mobile">
          <li v-for="item in services" :key="item.id">
            <RouterLink :to="item.href">{{ item.title }}</RouterLink>
          </li>
        </ul>
      </div>
    </section>
    <section class="service-cta">
      <div class="service-shell" data-aos="fade-top">
        <p class="service-kicker">START A PROJECT</p>
        <h2 data-aos="fade-clip">
          {{
            locale === 'en'
              ? 'Turn an idea into a\nreal product.'
              : '把一个想法，\n做成真正的产品。'
          }}
        </h2>
        <button
          type="button"
          @click="router.push(locale === 'en' ? '/en/ai-consultation' : '/ai-consultation')"
        >
          {{ locale === 'en' ? 'Start a conversation' : '开始沟通' }} <span>↗</span>
        </button>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const base = (capabilities) => capabilities.map(([title, text]) => ({ title, text }))
const pages = {
  '/ai-development': {
    kind: 'ai',
    order: 1,
    title: 'AI 开发',
    en: 'AI DEVELOPMENT',
    subtitle: '让智能能力进入真实业务，而不是停留在演示里。',
    capabilityTitle: '从模型能力，到业务结果。',
    statement: '把大模型、知识与流程，转化为组织可持续使用的产品能力。',
    description: '从场景判断、知识治理到智能体设计与上线迭代，我们让 AI 在真实流程中产生价值。',
    modules: ['企业知识库', '智能体编排', '模型接入', '业务工作流'],
    capabilities: base([
      ['企业知识智能体', '让制度、文档与经验可被准确检索和调用。'],
      ['智能对话产品', '面向客服、销售、运营与内部协作的智能入口。'],
      ['视觉识别应用', '围绕 OCR、检测与分类建立可落地的业务能力。'],
      ['私有化部署', '兼顾安全、性能、成本与长期的可维护性。'],
    ]),
  },
  '/miniprogram-development': {
    kind: 'mini',
    order: 2,
    title: '小程序开发',
    en: 'MINI PROGRAM',
    subtitle: '用更轻的产品形态，让服务更快抵达用户。',
    capabilityTitle: '把服务，变成顺手的体验。',
    statement: '从第一步触达，到一次服务完成，每个环节都应该轻、快、清楚。',
    description: '我们围绕微信生态、业务流程和运营需要，搭建可持续生长的小程序服务入口。',
    modules: ['进入服务', '完成预约', '在线交易', '沉淀会员'],
    capabilities: base([
      ['品牌服务小程序', '展示、预约、咨询与会员服务的一体化触点。'],
      ['电商交易闭环', '商品、订单、支付、营销与售后完整衔接。'],
      ['企业业务工具', '巡检、填报、审批与现场协作等轻量应用。'],
      ['微信生态集成', '企微、公众号、支付与订阅消息深度接入。'],
    ]),
  },
  '/app-development': {
    kind: 'app',
    order: 3,
    title: 'App 开发',
    en: 'APP DEVELOPMENT',
    subtitle: '构建兼具体验品质与工程稳定性的移动产品。',
    capabilityTitle: '从第一屏，到长期使用。',
    statement: '移动产品的价值，不只是装进手机，而是融入用户每天的动作。',
    description: '我们从用户旅程、交互设计到研发上线，交付体验完整、性能可靠且可持续迭代的应用。',
    modules: ['实时服务', '任务中心', '多端协同'],
    capabilities: base([
      ['原生应用研发', '面向高性能与深度系统能力的 iOS、Android 产品。'],
      ['跨平台方案', '在统一体验与开发效率之间取得合适平衡。'],
      ['移动体验设计', '建立清晰、顺畅并符合品牌气质的交互界面。'],
      ['持续运营支持', '覆盖上架、监控、迭代、性能优化与版本维护。'],
    ]),
  },
  '/web-development': {
    kind: 'web',
    order: 4,
    title: '网站建设',
    en: 'WEB DESIGN',
    subtitle: '让网站成为品牌在数字世界最有分量的表达。',
    capabilityTitle: '不止被看见，更值得被记住。',
    statement: '好的品牌网站，应该同时完成表达、理解与信任。',
    description:
      '我们将品牌策略、内容结构、视觉体验与工程能力整合，让网站成为真实支持业务的长期数字资产。',
    modules: ['品牌故事', '产品价值'],
    capabilities: base([
      ['品牌官网建设', '从定位、内容到视觉与互动的一体化表达。'],
      ['产品与业务平台', '兼顾复杂信息、业务能力与用户转化。'],
      ['多语言全球化', '适配不同地区用户、搜索与内容运营场景。'],
      ['长期技术维护', '性能、安全、内容更新与业务迭代持续支持。'],
    ]),
  },
  '/iot-development': {
    kind: 'iot',
    order: 5,
    title: '物联网开发',
    en: 'IOT SOLUTIONS',
    subtitle: '连接设备、数据与决策，让现场持续可见。',
    capabilityTitle: '让现场数据，成为经营依据。',
    statement: '从一台设备到一个园区，数据链路都应稳定、清楚、可追溯。',
    description:
      '我们覆盖设备接入、数据采集、实时监控、预警分析与业务平台建设，形成完整物联网闭环。',
    modules: ['现场设备', '边缘网关', '数据看板', '预警中心'],
    capabilities: base([
      ['设备接入管理', '适配多种协议、网关和终端的稳定连接。'],
      ['实时监控平台', '设备状态、运行数据、告警与运维统一管理。'],
      ['数据分析应用', '从现场数据中识别趋势、异常与优化机会。'],
      ['边缘云端协同', '兼顾实时响应、网络环境与集中化管理。'],
    ]),
  },
  '/custom-development': {
    kind: 'custom',
    order: 6,
    title: '定制开发',
    en: 'CUSTOM SOFTWARE',
    subtitle: '让系统适配业务，而不是让组织迁就软件。',
    capabilityTitle: '为真实的组织方式而建。',
    statement: '把分散的流程、数据与协作，整理成一套真正好用的系统。',
    description:
      '我们深入业务现场，完成需求拆解、产品设计、研发交付和系统集成，并为持续演进留出空间。',
    modules: ['业务梳理', '产品蓝图', '研发交付', '持续迭代'],
    moduleNotes: [
      '先理解组织如何运作。',
      '把复杂需求变成清晰结构。',
      '用稳定工程落地每个关键环节。',
      '随着业务变化持续优化。',
    ],
    capabilities: base([
      ['业务管理系统', '客户、项目、订单、采购与服务流程数字化。'],
      ['数据决策平台', '统一数据口径，建立清晰可见的经营视图。'],
      ['系统集成服务', '打通已有系统、第三方平台与内部数据资产。'],
      ['遗留系统升级', '保障业务连续性的前提下完成架构与体验更新。'],
    ]),
  },
  '/digital-creativity': {
    kind: 'creative',
    order: 7,
    title: '数字创意',
    en: 'DIGITAL CREATIVE',
    subtitle: '让技术成为内容表达与品牌体验的一部分。',
    capabilityTitle: '创造值得参与的品牌时刻。',
    statement: '当技术真正服务于内容，体验才会留下记忆。',
    description:
      '面向品牌传播、展览展示与文化内容，提供互动网站、数字展陈、创意 H5 与视觉化体验设计。',
    modules: ['互动体验', '数字展陈', '创意 H5', '数据可视化'],
    capabilities: base([
      ['互动品牌体验', '通过动效与交互增强内容的参与感和传播力。'],
      ['数字展陈设计', '连接空间、屏幕、内容与观众的展示体验。'],
      ['创意 H5 开发', '适合活动、传播与叙事的移动互动页面。'],
      ['信息可视化', '将复杂数据转化为清晰、有说服力的视觉表达。'],
    ]),
  },
}
const locale = computed(() => (route.path.startsWith('/en/') ? 'en' : 'zh-CN'))
const translations = {
  '/miniprogram-development': {
    title: '小程序开发',
    enTitle: 'Mini Program Development',
    subtitle: '用更轻的产品形态，让服务更快抵达用户。',
    enSubtitle: 'Reach users faster with a lighter product experience.',
    capabilityTitle: '把服务，变成顺手的体验。',
    enCapabilityTitle: 'Turn services into effortless experiences.',
    statement: '从第一步触达，到一次服务完成，每个环节都应该轻、快、清楚。',
    enStatement:
      'From first touch to completed service, every step should feel light, fast and clear.',
    description: '我们围绕微信生态、业务流程和运营需要，搭建可持续生长的小程序服务入口。',
    enDescription:
      'We build sustainable mini program touchpoints around WeChat, business workflows and operations.',
  },
}
const servicePath = computed(() => route.path.replace(/^\/en/, '') || '/web-development')

/** 服务数据按稳定 serviceId（kind）选取，不根据翻译后标题或 URL 包含关系判断。 */
const resolveService = (path, source) => {
  if (locale.value === 'zh-CN') return { ...source, path }
  const t = translations[path]
  return {
    ...source,
    path,
    title: t?.enTitle || source.en,
    subtitle:
      t?.enSubtitle || `Build a reliable ${source.en.toLowerCase()} experience for your business.`,
    capabilityTitle: t?.enCapabilityTitle || 'Capabilities that create lasting value.',
    statement:
      t?.enStatement || 'Thoughtful product design, stable engineering and a clear path to growth.',
    description:
      t?.enDescription ||
      'From strategy to delivery, we turn complex requirements into useful digital products.',
    modules: source.modules.map(
      (m, i) => ['Enter service', 'Complete booking', 'Pay online', 'Build loyalty'][i] || m,
    ),
    capabilities: source.capabilities.map((c) => ({ ...c, title: c.title, text: c.text })),
  }
}
const services = computed(() =>
  Object.entries(pages).map(([path, source]) => ({
    ...resolveService(path, source),
    id: source.kind,
    href: locale.value === 'en' ? `/en${path}` : path,
  })),
)
const page = computed(
  () =>
    services.value.find((item) => item.path === servicePath.value) ||
    services.value.find((item) => item.path === '/web-development'),
)
const activeIndex = computed(() => {
  const index = services.value.findIndex((item) => item.path === page.value?.path)
  return index < 0 ? 0 : index
})

const rootEl = ref(null)
const parallaxHeadEl = ref(null)
const statementEl = ref(null)
const switchListEl = ref(null)
const pictureEl = ref(null)

const mobileQuery = window.matchMedia('(max-width: 1024px)')
const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
const isMobile = ref(mobileQuery.matches)
const prefersReducedMotion = ref(reducedQuery.matches)
const isDarkTheme = ref(false)

const titleIn = ref(false)
const titleChars = computed(() => [...(page.value?.title || '')])
/** SPEC M-10：逐字入场，每字延迟 index*0.08+0.3s，空格字符 min-width: 10px。 */
const titleCharStyle = (index, char) => ({
  transitionDelay: `${index * 0.08 + 0.3}s`,
  ...(char === ' ' ? { minWidth: '10px' } : {}),
})

const switchCopy = computed(() => ({
  title:
    locale.value === 'en'
      ? 'Switch services,\nand see how we solve adjacent problems.'
      : '切换服务，\n看我们如何解决相近的问题。',
}))

const switching = ref(false)
const pendingIndex = ref(-1)
const moveOffset = ref(0)

/** 过渡视频用共享素材路径；素材只覆盖服务 1—3 的六个方向（T00A 登记）。 */
const TRANSITION_SLOTS = [1, 2, 3]
const transitionClips = computed(() =>
  TRANSITION_SLOTS.flatMap((from) =>
    TRANSITION_SLOTS.filter((to) => to !== from).map((to) => ({
      key: `${from}_${to}`,
      src: isDarkTheme.value
        ? `/assets/transitions/black/${from}-${to}.mp4`
        : `/assets/transitions/w${from}-${to}.mp4`,
    })),
  ),
)
const clipFor = (from, to) =>
  TRANSITION_SLOTS.includes(from) && TRANSITION_SLOTS.includes(to) && from !== to
    ? `${from}_${to}`
    : ''

let frame = 0
let themeObserver
const timers = { title: 0, transition: 0 }
let aosPending = []
const aosDone = new WeakSet()

const scheduleFrame = () => {
  if (frame || document.hidden) return
  frame = window.requestAnimationFrame(runScrollDriven)
}

const collectAosTargets = () => {
  if (!rootEl.value) return
  aosPending = [...rootEl.value.querySelectorAll('[data-aos]')].filter((el) => !aosDone.has(el))
}

/** SPEC M-24/M-25：offset = rect.top - clientHeight + all_num，offset < 0 加 .aos-animate，once。 */
const runAos = (clientHeight) => {
  if (!aosPending.length) return
  const limit = isMobile.value ? 0 : 150
  const remaining = []
  for (const el of aosPending) {
    if (el.getBoundingClientRect().top - clientHeight + limit < 0) {
      el.classList.add('aos-animate')
      aosDone.add(el)
    } else {
      remaining.push(el)
    }
  }
  aosPending = remaining
}

/** SPEC M-12：双列视差，系数 −0.02 / +0.1，逐帧直写，锚点 = 顶端 − clientHeight/3。 */
const runColumnParallax = (scrollTop, clientHeight) => {
  const group = parallaxHeadEl.value
  if (!group || group.children.length < 2) return
  const anchor = group.getBoundingClientRect().top + scrollTop - clientHeight / 3
  if (scrollTop < anchor) return
  const offset = scrollTop - anchor
  group.children[0].style.transform = `translate3d(0, ${offset * -0.02}px, 0)`
  group.children[1].style.transform = `translate3d(0, ${offset * 0.1}px, 0)`
}

/** SPEC M-13：逐行 clip-path 擦除，data-speed 默认 200，负百分比照抄。 */
const runPublicText = (scrollTop, clientHeight) => {
  const root = statementEl.value
  if (!root || isMobile.value) return
  const lines = root.querySelectorAll('.p:first-child .line')
  if (!lines.length) return
  const speed = root.dataset.speed ? Number(root.dataset.speed) : 0
  const dis = speed ? speed * 1 : 200
  const len = lines.length
  const allDis = dis * len
  const ban = allDis / len
  lines.forEach((line, i) => {
    const start = line.getBoundingClientRect().top + scrollTop - clientHeight / 1.2
    const end = start + allDis
    const value = 100 + ((scrollTop - (start + i * ban)) / ban) * -100
    if (scrollTop >= start + i * ban && scrollTop <= end) {
      line.style.clipPath = `inset(0 ${value}% 0 0)`
    } else if (scrollTop <= start + i * ban) {
      line.style.clipPath = 'inset(0 100% 0 0)'
    }
    if (scrollTop >= end) line.style.clipPath = 'inset(0 0 0 0)'
  })
}

const runScrollDriven = () => {
  frame = 0
  if (document.hidden || !rootEl.value || prefersReducedMotion.value) return
  const clientHeight = document.documentElement.clientHeight
  const scrollTop = window.scrollY || document.documentElement.scrollTop || 0
  runAos(clientHeight)
  runColumnParallax(scrollTop, clientHeight)
  runPublicText(scrollTop, clientHeight)
}

/** 减少动态效果：不做位移/擦除，内容直接可见。 */
const revealEverything = () => {
  if (!rootEl.value) return
  rootEl.value.querySelectorAll('[data-aos]').forEach((el) => {
    el.classList.add('aos-animate')
    aosDone.add(el)
  })
  aosPending = []
  statementEl.value?.querySelectorAll('.line').forEach((el) => {
    el.style.clipPath = ''
  })
  if (parallaxHeadEl.value) {
    const columns = [...parallaxHeadEl.value.children]
    columns.forEach((el) => {
      el.style.transform = ''
    })
  }
}

/** SPEC M-10：加载后 setTimeout(…, 10) 播放逐字入场。 */
const playTitleEntrance = () => {
  window.clearTimeout(timers.title)
  titleIn.value = false
  timers.title = window.setTimeout(() => {
    titleIn.value = true
  }, 10)
}

/** SPEC M-14：跟随框位移 = index * item.clientHeight，实测高度而非常量。 */
const syncMoveFrame = (index) => {
  const firstItem = switchListEl.value?.querySelector('.service-switch__item')
  moveOffset.value = firstItem ? index * firstItem.clientHeight : 0
}

/** SPEC M-15：旧片去 .on 并暂停；目标片 currentTime=0 → 加 .on → play()。 */
const playTransition = (key, onDone) => {
  const videos = pictureEl.value ? [...pictureEl.value.querySelectorAll('video')] : []
  const video = videos.find((el) => el.classList.contains(key))
  if (!video) {
    onDone()
    return
  }
  videos.forEach((el) => {
    el.classList.remove('on')
    el.pause()
  })
  let settled = false
  const settle = () => {
    if (settled) return
    settled = true
    video.removeEventListener('ended', settle)
    video.removeEventListener('error', settle)
    window.clearTimeout(timers.transition)
    onDone()
  }
  video.addEventListener('ended', settle)
  video.addEventListener('error', settle)
  timers.transition = window.setTimeout(settle, 2500)
  video.classList.add('on')
  const played = video.play()
  if (played?.catch) played.catch(settle)
}

const switchService = (item, index) => {
  syncMoveFrame(index)
  if (switching.value || item.path === page.value?.path) return
  const key = clipFor(page.value.order, item.order)
  pendingIndex.value = index
  if (!key || isMobile.value || prefersReducedMotion.value) {
    router.push(item.href)
    return
  }
  switching.value = true
  playTransition(key, () => {
    switching.value = false
    router.push(item.href)
  })
}

const onViewportChange = () => {
  isMobile.value = mobileQuery.matches
  prefersReducedMotion.value = reducedQuery.matches
  if (prefersReducedMotion.value) revealEverything()
  collectAosTargets()
  syncMoveFrame(activeIndex.value)
  scheduleFrame()
}

onMounted(() => {
  isDarkTheme.value = document.documentElement.dataset.theme === 'dark'
  themeObserver = new MutationObserver(() => {
    isDarkTheme.value = document.documentElement.dataset.theme === 'dark'
  })
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  })
  mobileQuery.addEventListener('change', onViewportChange)
  reducedQuery.addEventListener('change', onViewportChange)
  window.addEventListener('scroll', scheduleFrame, { passive: true })
  window.addEventListener('resize', onViewportChange)
  document.addEventListener('visibilitychange', scheduleFrame)

  collectAosTargets()
  if (prefersReducedMotion.value) revealEverything()
  syncMoveFrame(activeIndex.value)
  scheduleFrame()
  playTitleEntrance()
})

onBeforeUnmount(() => {
  mobileQuery.removeEventListener('change', onViewportChange)
  reducedQuery.removeEventListener('change', onViewportChange)
  window.removeEventListener('scroll', scheduleFrame)
  window.removeEventListener('resize', onViewportChange)
  document.removeEventListener('visibilitychange', scheduleFrame)
  themeObserver?.disconnect()
  if (frame) window.cancelAnimationFrame(frame)
  window.clearTimeout(timers.title)
  window.clearTimeout(timers.transition)
  pictureEl.value?.querySelectorAll('video').forEach((el) => el.pause())
})

watch(
  () => route.path,
  () => {
    pendingIndex.value = -1
    collectAosTargets()
    if (prefersReducedMotion.value) revealEverything()
    syncMoveFrame(activeIndex.value)
    playTitleEntrance()
    scheduleFrame()
  },
)
</script>

<style scoped>
.service-page {
  color: var(--yz-black);
  background: #fff;
  overflow: hidden;
}
.service-shell {
  width: min(calc(100% - 96px), 1320px);
  margin: auto;
}
.service-kicker {
  margin: 0;
  color: var(--yz-orange);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.2em;
}
.service-hero {
  min-height: 580px;
  display: flex;
  align-items: flex-end;
  background: var(--yz-black);
  color: #fff;
}
.service-hero__inner {
  position: relative;
  padding-bottom: 78px;
}
.service-hero__copy {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 60px;
  margin-top: 24px;
  /* 右侧为 .service-hero__index 预留栏位：序号绝对定位在同一右缘，
     不留空隙时副标题会与「0X / 07」重叠（1440 实测重叠 49px）。 */
  padding-right: 76px;
}
.service-hero h1 {
  margin: 0;
  font-size: clamp(64px, 9vw, 144px);
  font-weight: 620;
  letter-spacing: -0.07em;
  line-height: 0.86;
}
.service-hero__copy p {
  max-width: 400px;
  margin: 0;
  color: #aaa;
  font-size: 15px;
  line-height: 1.8;
}
.service-hero__index {
  position: absolute;
  right: 0;
  bottom: 82px;
  color: #777;
  font-size: 11px;
  letter-spacing: 0.16em;
}
.service-section {
  padding: 132px 0;
}
.service-section h2,
.service-capabilities h2,
.service-cta h2 {
  margin: 20px 0 0;
  font-size: clamp(45px, 5.4vw, 82px);
  font-weight: 620;
  letter-spacing: -0.065em;
  line-height: 1.05;
}
.ai-architecture {
  background: var(--yz-offwhite);
}
.ai-architecture__head,
.custom-system__head {
  display: grid;
  grid-template-columns: 0.7fr 2fr;
  gap: 8vw;
}
.ai-architecture__head h2,
.custom-system__head h2 {
  margin: 0;
}
.ai-map {
  position: relative;
  height: 430px;
  margin-top: 86px;
  border: 1px solid #bdbdb8;
}
.ai-map__node,
.ai-map__core {
  position: absolute;
  display: grid;
  place-items: center;
  border: 1px solid #999;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 700;
}
.ai-map__core {
  top: 50%;
  left: 50%;
  width: 140px;
  height: 140px;
  background: #161616;
  color: #fff;
  transform: translate(-50%, -50%);
  text-align: center;
  line-height: 1.1;
}
.ai-map__node {
  width: 112px;
  height: 112px;
  background: #fff;
}
.ai-map__node:nth-child(1) {
  top: 46px;
  left: 18%;
}
.ai-map__node:nth-child(2) {
  top: 46px;
  right: 18%;
}
.ai-map__node:nth-child(3) {
  bottom: 46px;
  left: 18%;
}
.ai-map__node:nth-child(4) {
  right: 18%;
  bottom: 46px;
}
.mini-journey {
  background: #e8ece2;
}
.mini-journey__grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr 1fr;
  gap: 7vw;
  align-items: center;
}
.mini-phone {
  position: relative;
  min-height: 420px;
  padding: 28px;
  background: #183f32;
  color: #fff;
  border: 10px solid #111;
  border-radius: 26px;
  box-shadow: 12px 14px 0 #c7cfc1;
}
.mini-phone span {
  font-size: 10px;
  letter-spacing: 0.14em;
}
.mini-phone b {
  display: block;
  margin-top: 110px;
  font-size: 38px;
  line-height: 1.35;
}
.mini-phone i {
  position: absolute;
  right: 28px;
  bottom: 26px;
  width: 56px;
  height: 56px;
  background: var(--yz-orange);
  border-radius: 50%;
}
.mini-journey ol {
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid #777;
}
.mini-journey li {
  padding: 22px 0;
  border-bottom: 1px solid #777;
  font-size: 18px;
  font-weight: 700;
}
.mini-journey li::before {
  margin-right: 16px;
  color: var(--yz-orange);
  content: '0' counter(list-item);
}
.app-product {
  background: #202125;
  color: #fff;
}
.app-devices {
  display: flex;
  align-items: end;
  justify-content: center;
  gap: 32px;
  margin-top: 74px;
}
.app-device {
  width: 260px;
  height: 490px;
  padding: 25px;
  background: #e2e4df;
  color: #111;
  border: 10px solid #090909;
  border-radius: 32px;
  box-shadow: 0 0 0 1px #555;
}
.app-device span {
  font-size: 10px;
  letter-spacing: 0.14em;
}
.app-device b {
  display: block;
  margin-top: 180px;
  font-size: 34px;
}
.app-device i {
  display: block;
  margin-top: 16px;
  color: #777;
  font-style: normal;
}
.app-device--back {
  width: 205px;
  height: 390px;
  background: #52585a;
  color: #fff;
  transform: translateX(48px);
}
.app-device--back span {
  display: block;
  margin-top: 170px;
}
.app-device--small {
  width: 190px;
  height: 330px;
  background: #d66d45;
  transform: translateX(-48px);
}
.app-device--small b {
  margin-top: 120px;
}
.web-brand {
  background: #f7f7f4;
}
.web-brand__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8vw;
  align-items: center;
}
.service-lead {
  max-width: 460px;
  margin: 42px 0 0;
  color: #666;
  line-height: 1.9;
}
.web-browser {
  min-height: 410px;
  padding: 20px 28px;
  display: flex;
  flex-direction: column;
  background: #1d1d1d;
  color: #fff;
  box-shadow: 16px 16px 0 #d7d7d2;
}
.web-browser__bar {
  display: flex;
  gap: 7px;
  padding-bottom: 70px;
}
.web-browser__bar i {
  width: 8px;
  height: 8px;
  background: var(--yz-orange);
  border-radius: 50%;
}
.web-browser strong {
  font-size: 44px;
  letter-spacing: -0.05em;
}
.web-browser span {
  max-width: 180px;
  margin: 22px 0;
  color: #999;
  line-height: 1.6;
}
.web-browser b {
  margin-top: auto;
  color: #aaa;
  font-size: 9px;
  letter-spacing: 0.16em;
}
.iot-network {
  background: #151719;
  color: #fff;
}
.iot-network__map {
  position: relative;
  height: 460px;
  margin-top: 82px;
  border: 1px solid #3d4140;
}
.iot-cloud,
.iot-device {
  position: absolute;
  display: grid;
  place-items: center;
  border: 1px solid #838b87;
  border-radius: 50%;
  font-size: 12px;
}
.iot-cloud {
  top: 50%;
  left: 50%;
  width: 150px;
  height: 150px;
  background: #deded9;
  color: #111;
  transform: translate(-50%, -50%);
}
.iot-device {
  width: 100px;
  height: 100px;
}
.iot-device--0 {
  top: 36px;
  left: 15%;
}
.iot-device--1 {
  top: 36px;
  right: 15%;
}
.iot-device--2 {
  bottom: 36px;
  left: 15%;
}
.iot-device--3 {
  right: 15%;
  bottom: 36px;
}
.custom-system {
  background: #e7e3dd;
}
.custom-system__steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 80px;
  border-top: 1px solid #888;
}
.custom-system__steps article {
  min-height: 260px;
  padding: 28px;
  border-right: 1px solid #aaa;
}
.custom-system__steps article:last-child {
  border: 0;
}
.custom-system__steps span {
  color: var(--yz-orange);
  font-size: 11px;
  font-weight: 700;
}
.custom-system__steps h3 {
  margin: 88px 0 10px;
  font-size: 21px;
}
.custom-system__steps p {
  color: #666;
  font-size: 13px;
  line-height: 1.7;
}
.creative-space {
  background: #c3d6e9;
}
.creative-space__strip {
  display: flex;
  width: max-content;
  margin: 74px 0 0;
  animation: creative-scroll 24s linear infinite;
}
.creative-space__strip span {
  padding: 0 55px;
  color: #192639;
  font-size: clamp(46px, 7vw, 96px);
  font-weight: 650;
  letter-spacing: -0.07em;
  white-space: nowrap;
}
.creative-space__blocks {
  display: grid;
  grid-template-columns: 1.5fr 0.8fr 1fr;
  gap: 15px;
  margin-top: 72px;
}
.creative-space__blocks div {
  height: 230px;
  background: var(--yz-orange);
}
.creative-space__blocks div:nth-child(2) {
  background: #182539;
}
.creative-space__blocks div:nth-child(3) {
  background: #e9e4d8;
}
.service-capabilities {
  background: #fff;
}
.service-capabilities__head {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 40px;
  margin-bottom: 66px;
}
.service-capabilities__head h2 {
  margin: 0;
}
.capability-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid #aaa;
}
.capability-list article {
  position: relative;
  min-height: 340px;
  padding: 28px;
  border-right: 1px solid #bbb;
  transition:
    background 0.28s ease,
    color 0.28s ease;
}
.capability-list article:last-child {
  border: 0;
}
.capability-list article:hover {
  background: #1a1a1a;
  color: #fff;
}
.capability-list span {
  color: var(--yz-orange);
  font-size: 11px;
  font-weight: 700;
}
.capability-list h3 {
  margin: 114px 0 14px;
  font-size: 23px;
}
.capability-list p {
  max-width: 240px;
  margin: 0;
  color: #777;
  font-size: 14px;
  line-height: 1.8;
}
.capability-list article:hover p {
  color: #bbb;
}
.capability-list b {
  position: absolute;
  right: 28px;
  bottom: 25px;
  font-size: 20px;
}
.service-approach {
  padding: 125px 0;
  background: var(--yz-offwhite);
}
.service-approach__grid {
  display: grid;
  grid-template-columns: 0.7fr 1.45fr 1fr;
  gap: 7vw;
  align-items: start;
}
.service-approach__statement,
.service-approach__statement-sj {
  margin: 0;
  font-size: clamp(36px, 4vw, 58px);
  font-weight: 620;
  letter-spacing: -0.055em;
  line-height: 1.1;
}
.service-approach__statement-sj {
  display: none;
}
.service-approach__grid > p:last-child {
  margin: 6px 0 0;
  color: #666;
  line-height: 1.9;
}
.service-cta {
  padding: 130px 0;
  background: #151515;
  color: #fff;
}
.service-cta h2 {
  margin: 25px 0 42px;
  white-space: pre-line;
}
.service-cta button {
  width: 210px;
  padding: 0 0 10px;
  display: flex;
  justify-content: space-between;
  color: #fff;
  background: transparent;
  border: 0;
  border-bottom: 1px solid #888;
  font-size: 13px;
  font-weight: 700;
}
.service-cta button span {
  color: var(--yz-orange);
  font-size: 18px;
}
@keyframes creative-scroll {
  to {
    transform: translateX(-20%);
  }
}
@media (max-width: 800px) {
  .service-shell {
    width: calc(100% - 40px);
  }
  .service-hero {
    min-height: 480px;
  }
  .service-hero__inner {
    padding-bottom: 60px;
  }
  .service-hero__copy {
    display: block;
    margin-top: 22px;
  }
  .service-hero h1 {
    font-size: 62px;
  }
  .service-hero__copy p {
    margin-top: 24px;
    font-size: 14px;
  }
  .service-hero__index {
    right: 0;
    bottom: 64px;
  }
  .service-section {
    padding: 85px 0;
  }
  .ai-architecture__head,
  .mini-journey__grid,
  .web-brand__grid,
  .custom-system__head,
  .service-approach__grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .ai-map {
    height: 520px;
    margin-top: 50px;
  }
  .ai-map__node:nth-child(1) {
    top: 36px;
    left: 12%;
  }
  .ai-map__node:nth-child(2) {
    top: 36px;
    right: 12%;
  }
  .ai-map__node:nth-child(3) {
    bottom: 36px;
    left: 12%;
  }
  .ai-map__node:nth-child(4) {
    right: 12%;
    bottom: 36px;
  }
  .mini-phone {
    max-width: 250px;
    min-height: 350px;
  }
  .app-devices {
    gap: 10px;
    margin-top: 52px;
  }
  .app-device {
    width: 155px;
    height: 330px;
    padding: 15px;
    border-width: 7px;
  }
  .app-device b {
    margin-top: 120px;
    font-size: 24px;
  }
  .app-device--back {
    width: 116px;
    height: 270px;
    transform: translateX(28px);
  }
  .app-device--back span {
    display: block;
    margin-top: 170px;
  }
  .app-device--small {
    width: 115px;
    height: 225px;
    transform: translateX(-28px);
  }
  .app-device--small b {
    margin-top: 74px;
  }
  .web-browser {
    min-height: 330px;
  }
  .iot-network__map {
    height: 440px;
    margin-top: 52px;
  }
  .iot-device--0 {
    left: 8%;
  }
  .iot-device--1 {
    right: 8%;
  }
  .iot-device--2 {
    bottom: 28px;
    left: 8%;
  }
  .iot-device--3 {
    right: 8%;
    bottom: 28px;
  }
  .custom-system__steps,
  .capability-list {
    grid-template-columns: 1fr;
  }
  .custom-system__steps {
    margin-top: 52px;
  }
  .custom-system__steps article,
  .capability-list article {
    min-height: 180px;
    border-right: 0;
    border-bottom: 1px solid #aaa;
  }
  .custom-system__steps h3 {
    margin-top: 36px;
  }
  .creative-space__blocks {
    grid-template-columns: 1fr 1fr;
  }
  .creative-space__blocks div {
    height: 140px;
  }
  .service-capabilities__head {
    display: block;
    margin-bottom: 42px;
  }
  .service-capabilities__head h2 {
    margin-top: 20px;
  }
  .capability-list h3 {
    margin-top: 42px;
  }
  .service-approach {
    padding: 85px 0;
  }
  .service-cta {
    padding: 85px 0;
  }
}
.service-page--mini .service-hero {
  background: #183f32;
}
.service-page--app .service-hero {
  background: #292e34;
}
.service-page--web .service-hero {
  background: #e7e5de;
  color: #111;
}
.service-page--web .service-hero__copy p,
.service-page--web .service-hero__index {
  color: #555;
}
.service-page--iot .service-hero {
  background: #102a34;
}
.service-page--custom .service-hero {
  background: #5c564e;
}
.service-page--creative .service-hero {
  background: #b8cfdf;
  color: #182539;
}
.service-page--creative .service-hero__copy p,
.service-page--creative .service-hero__index {
  color: #334d64;
}
.ai-architecture__head {
  align-items: start;
}
.ai-architecture__head > div > p {
  max-width: 520px;
  margin: 25px 0 0;
  color: #666;
  font-size: 15px;
  line-height: 1.9;
}
.ai-flow {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr;
  gap: 14px;
  align-items: stretch;
  margin-top: 70px;
}
.ai-flow article {
  min-height: 260px;
  padding: 26px;
  background: #fff;
  border: 1px solid #c7c7c0;
}
.ai-flow article:nth-of-type(2) {
  background: #1a1a1a;
  color: #fff;
  border-color: #1a1a1a;
}
.ai-flow article:nth-of-type(3) {
  background: #e9e6de;
}
.ai-flow article:nth-of-type(4) {
  background: var(--yz-orange);
  border-color: var(--yz-orange);
}
.ai-flow article span {
  color: #888;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.12em;
}
.ai-flow article:nth-of-type(2) span {
  color: #bbb;
}
.ai-flow article:nth-of-type(4) span {
  color: #5b2c15;
}
.ai-flow h3 {
  margin: 72px 0 13px;
  font-size: 22px;
  letter-spacing: -0.03em;
}
.ai-flow p {
  margin: 0;
  color: #747474;
  font-size: 13px;
  line-height: 1.75;
}
.ai-flow article:nth-of-type(2) p {
  color: #b9b9b9;
}
.ai-flow article:nth-of-type(4) p {
  color: #4c2c20;
}
.ai-flow > b {
  display: grid;
  place-items: center;
  color: #555;
  font-size: 22px;
  font-weight: 400;
}
@media (max-width: 800px) {
  .ai-flow {
    grid-template-columns: 1fr;
    gap: 0;
    margin-top: 45px;
  }
  .ai-flow > b {
    height: 40px;
    transform: rotate(90deg);
  }
  .ai-flow article {
    min-height: 180px;
  }
  .ai-flow h3 {
    margin-top: 36px;
  }
  .ai-architecture__head > div > p {
    font-size: 14px;
  }
}
.ai-flow article:nth-of-type(4) {
  background: #d8d5ce;
  border-color: #d8d5ce;
}
.ai-flow article:nth-of-type(4) span,
.ai-flow article:nth-of-type(4) p {
  color: #555;
}
.ai-flow > b {
  color: var(--yz-orange);
}
.iot-dashboard {
  display: grid;
  grid-template-columns: 1.35fr 0.9fr;
  gap: 16px;
  margin-top: 70px;
}
.iot-dashboard__main {
  position: relative;
  min-height: 360px;
  padding: 34px;
  background: #e8e8e1;
  color: #141414;
  overflow: hidden;
}
.iot-dashboard span,
.iot-dashboard__side span {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
}
.iot-dashboard__main b {
  display: block;
  margin-top: 82px;
  font-size: 92px;
  letter-spacing: -0.08em;
  line-height: 0.8;
}
.iot-dashboard__main b small {
  font-size: 30px;
}
.iot-dashboard__main p,
.iot-dashboard__side p {
  color: #666;
  font-size: 13px;
}
.iot-dashboard__main i {
  position: absolute;
  right: -18px;
  bottom: -40px;
  width: 280px;
  height: 150px;
  border: 20px solid var(--yz-orange);
  border-radius: 50%;
  opacity: 0.7;
}
.iot-dashboard__side {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.iot-dashboard__side article {
  min-height: 172px;
  padding: 25px;
  background: #202224;
}
.iot-dashboard__side article:last-child {
  grid-column: span 2;
  background: #607974;
}
.iot-dashboard__side b {
  display: block;
  margin-top: 36px;
  color: #fff;
  font-size: 44px;
  letter-spacing: -0.05em;
}
.iot-dashboard__side p {
  margin: 8px 0 0;
  color: #b7bab9;
}
.creative-panels {
  display: grid;
  grid-template-columns: 1.35fr 1fr 1fr;
  gap: 14px;
  margin-top: 72px;
}
.creative-panels article {
  min-height: 390px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  background: #17263a;
  color: #fff;
}
.creative-panels article:nth-child(2) {
  background: #e4dfd2;
  color: #1c2636;
}
.creative-panels article:nth-child(3) {
  background: #d86e45;
}
.creative-panels span {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.16em;
}
.creative-panels h3 {
  margin: auto 0 12px;
  font-size: 31px;
  letter-spacing: -0.05em;
}
.creative-panels p {
  max-width: 230px;
  margin: 0;
  color: #b6c1cd;
  font-size: 14px;
  line-height: 1.8;
}
.creative-panels article:nth-child(2) p {
  color: #68707b;
}
.creative-panels article:nth-child(3) p {
  color: #573027;
}
@media (max-width: 800px) {
  .iot-dashboard {
    grid-template-columns: 1fr;
    margin-top: 48px;
  }
  .iot-dashboard__main {
    min-height: 280px;
  }
  .iot-dashboard__main b {
    margin-top: 56px;
    font-size: 75px;
  }
  .creative-panels {
    grid-template-columns: 1fr;
    margin-top: 48px;
  }
  .creative-panels article {
    min-height: 240px;
  }
  .creative-panels h3 {
    margin-top: 95px;
  }
}
/* SPEC M-10：主标题逐字入场（1s，每字延迟 index*0.08+0.3s，起始 translateX(10px)） */
.each_animate span {
  display: inline-block;
  opacity: 0;
  transform: translateX(10px);
  transition: 1s;
}
.each_animate.on span {
  opacity: 1 !important;
  transform: translateX(0) !important;
}
/* SPEC M-24 / M-25：进入视口一次入场；触发阈值（150 / 0）由 JS 逐帧计算 */
[data-aos] {
  transition-duration: 1.5s;
  transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
[data-aos^='fade'] {
  opacity: 0;
  transition-property: all;
}
[data-aos^='fade'].aos-animate {
  opacity: 1;
}
[data-aos-delay='100'].aos-animate {
  transition-delay: 0.1s;
}
[data-aos-delay='200'].aos-animate {
  transition-delay: 0.2s;
}
[data-aos='fade-top'] {
  transform: translate(0, 50px);
}
[data-aos='fade-top'].aos-animate {
  transform: translate(0, 0);
}
[data-aos='fade-clip'] {
  opacity: 1 !important;
  clip-path: inset(0 100% 0 0);
  transition: 2s !important;
  transition-duration: 2s !important;
}
[data-aos='fade-clip'].aos-animate {
  clip-path: inset(0 0% 0 0);
}
/* SPEC M-26：标题横线展开 scaleX(0) → scaleX(1)，2s */
.headline {
  display: flex;
  align-items: center;
  gap: 22px;
}
.headline__line {
  flex: 1;
  height: 1px;
  background: var(--yz-line);
  transform: scaleX(0);
  transform-origin: left;
  transition: 2s;
}
.headline.aos-animate .headline__line {
  transform: scaleX(1);
}
/* SPEC M-13：实心层 + 20% 幽灵层的逐行 clip-path 擦除（DOM 与公式见参考站 function.js:4593-4617） */
.public_text {
  position: relative;
}
.public_text .p {
  display: block;
}
.public_text .p .line {
  display: block;
  width: fit-content;
}
.public_text .p:first-child {
  position: relative;
  z-index: 55;
}
.public_text .p:not(:first-child) {
  position: absolute;
  top: 0;
  left: 0;
  color: rgba(0, 0, 0, 0.2);
  z-index: 5;
}
.capability-list article:hover {
  transform: translateY(-5px);
}
.service-cta button {
  cursor: pointer;
  transition:
    transform 0.25s ease,
    border-color 0.25s ease;
}
.service-cta button:hover {
  transform: translateX(8px);
  border-color: var(--yz-orange);
}
/* SPEC M-14：服务切换跟随框；位移 = index * item.clientHeight（实测高度），transition all .4s */
.service-switch {
  background: var(--yz-offwhite);
}
.service-switch__head {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 40px;
  margin-bottom: 66px;
}
.service-switch__head h2 {
  margin: 0;
  white-space: pre-line;
}
.service-switch__body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 7vw;
  align-items: start;
}
.service-switch__list {
  position: relative;
}
.service-switch__item {
  width: 100%;
  height: 96px;
  padding: 0 34px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  text-align: left;
  color: inherit;
  background: transparent;
  border: 0;
  border-bottom: 1px solid var(--yz-line);
  font: inherit;
  cursor: pointer;
}
.service-switch__item:disabled {
  cursor: default;
}
.service-switch__en {
  color: #8b8b86;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
}
.service-switch__move {
  width: 100%;
  height: 96px;
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid rgba(193, 192, 180, 0.97);
  border-radius: 5px;
  pointer-events: none;
  transition: all 0.4s;
  z-index: 2;
}
.service-switch__move::after {
  content: '';
  width: 5px;
  height: 61px;
  position: absolute;
  left: -5px;
  top: 50%;
  background: var(--yz-orange);
  border-radius: 5px 0 0 5px;
  transform: translateY(-50%);
  transition: all 0.6s;
}
/* SPEC M-15：文本上翻与 :after 用 data-text 接过下一行（transition all .6s） */
.attr {
  position: relative;
  overflow: hidden;
}
.attr__line {
  display: block;
  transition: all 0.6s;
}
.attr::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  transform: translateY(100%);
  transition: all 0.6s;
}
.service-switch__item.on .attr__line {
  transform: translateY(-100%);
}
.service-switch__item.on .attr::after {
  transform: translateY(0);
}
.service-switch__picture {
  position: relative;
}
.service-switch__picture video {
  width: 100%;
  aspect-ratio: 1;
  object-fit: contain;
  opacity: 0;
}
.service-switch__picture video.on {
  opacity: 1;
}
.service-switch__picture video:not(:last-of-type) {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
.service-switch__caption {
  margin: 14px 0 0;
  color: #8b8b86;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
}
.service-switch__mobile {
  display: none;
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid var(--yz-line);
}
.service-switch__mobile li {
  border-bottom: 1px solid var(--yz-line);
}
.service-switch__mobile a {
  display: block;
  padding: 20px 0;
  color: inherit;
  text-decoration: none;
}
/* SPEC 断点速查 ≤1024px：不擦除整段文案、隐藏 PC 专用过渡视频与桌面切换列表 */
@media (max-width: 1024px) {
  .service-shell {
    width: min(calc(100% - 48px), 1320px);
  }
  .service-section,
  .service-approach,
  .service-cta {
    padding: 84px 0;
  }
  .service-hero {
    min-height: 420px;
  }
  .service-hero h1 {
    font-size: clamp(40px, 12vw, 88px);
  }
  .service-hero__copy {
    flex-direction: column;
    align-items: start;
    gap: 22px;
    padding-right: 0;
  }
  .service-hero__index {
    bottom: 30px;
  }
  .service-capabilities__head,
  .service-switch__head {
    flex-direction: column;
    align-items: start;
    gap: 18px;
    margin-bottom: 42px;
  }
  .capability-list {
    grid-template-columns: 1fr;
  }
  .capability-list article {
    min-height: 0;
    padding: 26px 0;
    border-right: 0;
    border-bottom: 1px solid #bbb;
  }
  .capability-list article:last-child {
    border-bottom: 0;
  }
  .capability-list h3 {
    margin: 34px 0 12px;
  }
  .service-approach__grid {
    grid-template-columns: 1fr;
    gap: 26px;
  }
  .public_text {
    display: none !important;
  }
  .public_text.sj_text {
    display: block !important;
  }
  .service-switch__list,
  .service-switch__picture {
    display: none !important;
  }
  .service-switch__mobile {
    display: block;
  }
}
@media (prefers-reduced-motion: reduce) {
  .each_animate span,
  [data-aos] {
    opacity: 1 !important;
    transform: none !important;
    clip-path: none !important;
    transition: none !important;
  }
  .headline__line {
    transform: scaleX(1) !important;
    transition: none !important;
  }
}
</style>

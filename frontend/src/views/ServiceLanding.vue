<template>
  <main
    ref="rootEl"
    class="service-page"
    :class="`service-page--${page.kind}`"
  >
    <!-- hero 排版照参考站 /solution/34.html：左标题 + 右导语 + 通栏图（见 evidence/service-pages/reference-solution）。 -->
    <section class="service-hero">
      <div class="service-shell service-hero__head">
        <p class="service-kicker">
          YUNZHAN / {{ page.en }}
        </p>
        <p class="service-hero__index">
          0{{ page.order }} / 07
        </p>
      </div>
      <div class="service-shell service-hero__title">
        <h1
          ref="titleEl"
          class="each_animate"
          :class="{ on: titleIn, reset: titleReset, 'is-en': locale === 'en' }"
        >
          <span
            v-for="(char, index) in titleChars"
            :key="index"
            :style="titleCharStyle(index, char)"
          >{{ char }}</span>
        </h1>
        <p class="service-hero__lead">
          {{ page.subtitle }}
        </p>
      </div>
      <div class="service-hero__media">
        <img
          :src="page.heroImage"
          :alt="page.mediaAlt"
        >
      </div>
    </section>

    <section
      v-if="page.kind === 'ai'"
      class="ai-architecture service-section"
    >
      <div
        class="service-shell ai-architecture__head"
        data-aos="fade-top"
      >
        <p class="service-kicker">
          01 / FROM DATA TO ACTION
        </p>
        <div>
          <h2 data-aos="fade-clip">
            {{ section.headingA }}<br>{{ section.headingB }}
          </h2>
          <p>
            {{ section.lead }}
          </p>
        </div>
      </div>
      <div
        class="service-shell ai-flow"
        data-aos="fade-top"
        data-aos-delay="100"
      >
        <article>
          <div class="service-card-media">
            <img
              :src="page.flowImages[0]"
              :alt="section.flow[0].alt"
              loading="lazy"
              decoding="async"
            >
          </div>
          <span>{{ section.flow[0].label }}</span>
          <h3>{{ section.flow[0].title }}</h3>
          <p>{{ section.flow[0].text }}</p>
        </article>
        <b>→</b>
        <article>
          <div class="service-card-media">
            <img
              :src="page.flowImages[1]"
              :alt="section.flow[1].alt"
              loading="lazy"
              decoding="async"
            >
          </div>
          <span>{{ section.flow[1].label }}</span>
          <h3>{{ section.flow[1].title }}</h3>
          <p>{{ section.flow[1].text }}</p>
        </article>
        <b>→</b>
        <article>
          <div class="service-card-media">
            <img
              :src="page.flowImages[2]"
              :alt="section.flow[2].alt"
              loading="lazy"
              decoding="async"
            >
          </div>
          <span>{{ section.flow[2].label }}</span>
          <h3>{{ section.flow[2].title }}</h3>
          <p>{{ section.flow[2].text }}</p>
        </article>
        <b>→</b>
        <article>
          <div class="service-card-media">
            <img
              :src="page.flowImages[3]"
              :alt="section.flow[3].alt"
              loading="lazy"
              decoding="async"
            >
          </div>
          <span>{{ section.flow[3].label }}</span>
          <h3>{{ section.flow[3].title }}</h3>
          <p>{{ section.flow[3].text }}</p>
        </article>
      </div>
    </section>
    <section
      v-else-if="page.kind === 'mini'"
      class="mini-journey service-section"
    >
      <div
        class="service-shell mini-journey__grid"
        data-aos="fade-top"
      >
        <div>
          <p class="service-kicker">
            01 / USER JOURNEY
          </p>
          <h2 data-aos="fade-clip">
            {{ section.headingA }}<br>{{ section.headingB }}
          </h2>
        </div>
        <div
          class="mini-phone"
          data-aos="fade-top"
          data-aos-delay="100"
        >
          <span>{{ section.phoneLabel }}</span>
          <div class="mini-phone__screen">
            <img
              :src="page.mediaImage"
              :alt="page.mediaAlt"
              loading="lazy"
              decoding="async"
            >
          </div>
        </div>
        <ol
          data-aos="fade-top"
          data-aos-delay="200"
        >
          <li
            v-for="item in page.modules"
            :key="item"
          >
            {{ item }}
          </li>
        </ol>
      </div>
    </section>
    <section
      v-else-if="page.kind === 'app'"
      class="app-product service-section"
    >
      <div
        class="service-shell"
        data-aos="fade-top"
      >
        <p class="service-kicker">
          01 / MOBILE PRODUCT
        </p>
        <h2 data-aos="fade-clip">
          {{ section.headingA }}<br>{{ section.headingB }}
        </h2>
      </div>
      <div
        class="service-shell app-devices"
        data-aos="fade-top"
        data-aos-delay="100"
      >
        <div class="app-device app-device--back">
          <span>{{ section.dataLabel }}</span>
        </div>
        <div class="app-device">
          <span>YUNZHAN</span>
          <div class="app-device__screen">
            <img
              :src="page.mediaImage"
              :alt="page.mediaAlt"
              loading="lazy"
              decoding="async"
            >
          </div>
        </div>
        <div class="app-device app-device--small">
          <span>{{ section.messageLabel }}</span><b>01</b>
        </div>
      </div>
    </section>
    <section
      v-else-if="page.kind === 'web'"
      class="web-brand service-section"
    >
      <div
        class="service-shell web-brand__grid"
        data-aos="fade-top"
      >
        <div>
          <p class="service-kicker">
            01 / DIGITAL PRESENCE
          </p>
          <h2 data-aos="fade-clip">
            {{ section.headingA }}<br>{{ section.headingB }}
          </h2>
          <p class="service-lead">
            {{ section.lead }}
          </p>
        </div>
        <div
          class="web-browser"
          data-aos="fade-top"
          data-aos-delay="100"
        >
          <div class="web-browser__bar">
            <i /><i /><i />
          </div>
          <div class="web-browser__screen">
            <img
              :src="page.mediaImage"
              :alt="page.mediaAlt"
              loading="lazy"
              decoding="async"
            >
          </div>
        </div>
      </div>
    </section>
    <section
      v-else-if="page.kind === 'iot'"
      class="iot-network service-section"
    >
      <div
        class="service-shell"
        data-aos="fade-top"
      >
        <p class="service-kicker">
          01 / CONNECTED SYSTEM
        </p>
        <h2 data-aos="fade-clip">
          {{ section.headingA }}<br>{{ section.headingB }}
        </h2>
      </div>
      <div
        class="service-shell iot-dashboard"
        data-aos="fade-top"
        data-aos-delay="100"
      >
        <div class="iot-dashboard__main">
          <span>{{ section.mainLabel }}</span><b>98.6<small>%</small></b>
          <p>{{ section.mainNote }}</p>
          <i />
        </div>
        <div class="iot-dashboard__side">
          <article>
            <span>{{ section.alertLabel }}</span><b>03</b>
            <p>{{ section.alertNote }}</p>
          </article>
          <article>
            <span>{{ section.ticketLabel }}</span><b>12</b>
            <p>{{ section.ticketNote }}</p>
          </article>
          <article>
            <span>{{ section.trendLabel }}</span><b>{{ section.trendValue }}</b>
            <p>{{ section.trendNote }}</p>
          </article>
        </div>
      </div>
    </section>
    <section
      v-else-if="page.kind === 'custom'"
      class="custom-system service-section"
    >
      <div
        class="service-shell custom-system__head"
        data-aos="fade-top"
      >
        <p class="service-kicker">
          01 / BUILT FOR YOUR BUSINESS
        </p>
        <h2 data-aos="fade-clip">
          {{ section.headingA }}<br>{{ section.headingB }}
        </h2>
      </div>
      <div
        class="service-shell custom-system__steps"
        data-aos="fade-top"
        data-aos-delay="100"
      >
        <article
          v-for="(item, index) in page.modules"
          :key="item"
        >
          <div class="service-card-media">
            <img
              :src="page.stepImages[index]"
              :alt="item"
              loading="lazy"
              decoding="async"
            >
          </div>
          <span>0{{ index + 1 }}</span>
          <h3>{{ item }}</h3>
          <p>{{ page.moduleNotes[index] }}</p>
        </article>
      </div>
    </section>
    <section
      v-else
      class="creative-space service-section"
    >
      <div
        class="service-shell creative-space__top"
        data-aos="fade-top"
      >
        <p class="service-kicker">
          01 / CREATIVE TECHNOLOGY
        </p>
        <h2 data-aos="fade-clip">
          {{ section.headingA }}<br>{{ section.headingB }}
        </h2>
      </div>
      <div
        class="service-shell creative-panels"
        data-aos="fade-top"
        data-aos-delay="100"
      >
        <article
          v-for="(panel, index) in section.panels"
          :key="panel.title"
        >
          <span>{{ panel.label }}</span>
          <div class="service-card-media">
            <img
              :src="page.panelImages[index]"
              :alt="panel.alt"
              loading="lazy"
              decoding="async"
            >
          </div>
          <h3>{{ panel.title }}</h3>
          <p>{{ panel.text }}</p>
        </article>
      </div>
    </section>

    <section class="service-capabilities service-section">
      <div
        ref="parallaxHeadEl"
        class="service-shell service-capabilities__head"
      >
        <p class="service-kicker">
          02 / WHAT WE DELIVER
        </p>
        <h2 data-aos="fade-clip">
          {{ page.capabilityTitle }}
        </h2>
      </div>
      <div class="service-shell capability-list">
        <article
          v-for="(item, index) in page.capabilities"
          :key="item.title"
          data-aos="fade-top"
          :data-aos-delay="index % 2 === 0 ? 100 : 200"
        >
          <div class="service-card-media">
            <img
              :src="page.capabilityImages[index]"
              :alt="item.title"
              loading="lazy"
              decoding="async"
            >
          </div>
          <span>0{{ index + 1 }}</span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.text }}</p>
          <ul
            v-if="item.tags"
            class="service-card-tags"
          >
            <li
              v-for="tag in item.tags"
              :key="tag"
            >
              {{ tag }}
            </li>
          </ul>
        </article>
      </div>
    </section>
    <section class="service-approach">
      <div class="service-shell service-approach__grid">
        <div
          class="headline"
          data-aos="fade-top"
        >
          <p class="service-kicker">
            03 / HOW WE WORK
          </p>
          <span class="headline__line" />
        </div>
        <h2
          ref="statementEl"
          class="service-approach__statement public_text"
          data-speed="200"
        >
          <span class="p"><span class="line">{{ page.statement }}</span></span>
          <span
            class="p"
            aria-hidden="true"
          >
            <span class="line">{{ page.statement }}</span>
          </span>
        </h2>
        <p class="service-approach__statement-sj public_text sj_text">
          {{ page.statement }}
        </p>
        <p data-aos="fade-top">
          {{ page.description }}
        </p>
      </div>
      <ol class="service-shell service-process">
        <li
          v-for="(step, index) in page.process"
          :key="step[0]"
          data-aos="fade-top"
          :data-aos-delay="index % 3 === 0 ? 100 : 200"
        >
          <span>0{{ index + 1 }} / DELIVERY STEP</span>
          <h3>{{ step[0] }}</h3>
          <p>{{ step[1] }}</p>
        </li>
      </ol>
    </section>
    <section class="service-cta">
      <div
        class="service-shell"
        data-aos="fade-top"
      >
        <p class="service-kicker">
          START A PROJECT
        </p>
        <h2 data-aos="fade-clip">
          {{
            locale === 'en'
              ? 'Turn an idea into a\nreal product.'
              : '把一个想法，\n做成真正的产品。'
          }}
        </h2>
        <button
          type="button"
          @click="router.push(consultPath)"
        >
          {{ locale === 'en' ? 'Start a conversation' : '开始沟通' }} <span>↗</span>
        </button>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { serviceLandingEnByPath, serviceSectionZh, serviceSectionEn } from '../content/service-landing-i18n'
const route = useRoute()
const router = useRouter()
/**
 * 能力卡：`[标题, 说明, 关键词标签]`。标签取自公司旧官网各服务页写明的技术栈/场景词
 * （2026-09-15 用户要求「文案与公司实际贴合」，对照表见 handoffs/C.md 第 5 轮）。
 */
const base = (capabilities) => capabilities.map(([title, text, tags]) => ({ title, text, tags }))
/**
 * 卡片配图（用户 2026-09-15 反馈 3）：`capabilityImages` 是 02 分区四张能力卡的图，与
 * `capabilities` 同序；`flowImages` / `stepImages` / `panelImages` 是各服务 01 分区卡片图。
 * 规格统一 800×600（4:3），来源与替换清单见 evidence/service-pages/service-images.md。
 */
const pages = {
  '/ai-development': {
    kind: 'ai',
    order: 1,
    title: 'AI 开发',
    en: 'AI DEVELOPMENT',
    heroImage: '/assets/services/ai-hero.jpg',
    mediaImage: '/assets/services/ai-media.jpg',
    mediaAlt: '团队在数据与代码前工作',
    capabilityImages: [
      '/assets/services/cards/ai-1.jpg',
      '/assets/services/cards/ai-2.jpg',
      '/assets/services/cards/ai-3.jpg',
      '/assets/services/cards/ai-4.jpg',
    ],
    flowImages: [
      '/assets/services/cards/ai-flow-1.jpg',
      '/assets/services/cards/ai-flow-2.jpg',
      '/assets/services/cards/ai-flow-3.jpg',
      '/assets/services/cards/ai-flow-4.jpg',
    ],
    subtitle: '让智能能力进入真实业务，而不是停留在演示里。',
    capabilityTitle: '从模型能力，到业务结果。',
    statement: '把大模型、知识与流程，转化为组织可持续使用的产品能力。',
    description: '从场景判断、知识治理到智能体设计与上线迭代，我们让 AI 在真实流程中产生价值。',
    modules: ['企业知识库', '智能体编排', '模型接入', '业务工作流'],
    capabilities: base([
      [
        '大语言模型应用',
        '接入主流大模型，开发对话、写作、问答与内容生成应用。',
        ['ChatGPT', '文心一言', '通义千问', 'Claude'],
      ],
      [
        '企业知识智能体',
        '让制度、文档与经验可被准确检索、引用并持续运营。',
        ['RAG 检索增强', '文档解析', '权限体系', '知识运营'],
      ],
      [
        '智能客服系统',
        '面向售前售后与内部服务，提供 7×24 小时的智能应答。',
        ['智能问答', '意图识别', '多轮对话', '知识库'],
      ],
      [
        'AI 图像识别',
        '围绕 OCR、图像分类与目标检测落地可用的识别能力。',
        ['计算机视觉', 'OCR', '人脸识别', '目标检测'],
      ],
    ]),
    /** 交付流程：来自公司旧官网 AI 开发页「开发流程」六步。 */
    process: [
      ['需求分析', '深入了解业务场景，确定 AI 应用方向与验收口径。'],
      ['方案设计', '制定技术方案，选择合适的模型、知识源与集成方式。'],
      ['模型开发', '完成提示词与工作流开发，进行训练、微调与效果调优。'],
      ['系统集成', '把 AI 能力接入现有业务系统与数据流程。'],
      ['测试上线', '全面评估效果与稳定性，确保安全可控地上线。'],
      ['持续优化', '监控运行效果，结合业务反馈持续迭代。'],
    ],
  },
  '/miniprogram-development': {
    kind: 'mini',
    order: 2,
    title: '小程序开发',
    en: 'MINI PROGRAM',
    heroImage: '/assets/services/mini-hero.jpg',
    mediaImage: '/assets/services/mini-media.jpg',
    mediaAlt: '用户在门店用手机与平板办理服务',
    capabilityImages: [
      '/assets/services/cards/mini-1.jpg',
      '/assets/services/cards/mini-2.jpg',
      '/assets/services/cards/mini-3.jpg',
      '/assets/services/cards/mini-4.jpg',
    ],
    subtitle: '用更轻的产品形态，让服务更快抵达用户。',
    capabilityTitle: '把服务，变成顺手的体验。',
    statement: '从第一步触达，到一次服务完成，每个环节都应该轻、快、清楚。',
    description: '我们围绕微信生态、业务流程和运营需要，搭建可持续生长的小程序服务入口。',
    modules: ['进入服务', '完成预约', '在线交易', '沉淀会员'],
    capabilities: base([
      [
        '全平台小程序',
        '覆盖主流平台，一套业务在多端触达用户。',
        ['微信小程序', '支付宝小程序', '抖音小程序', '百度小程序'],
      ],
      [
        '电商交易闭环',
        '商品、订单、支付、营销与售后完整衔接。',
        ['商品管理', '支付系统', '订单跟踪', '营销工具'],
      ],
      [
        '行业场景应用',
        '面向零售、餐饮、教育与本地生活的成熟场景方案。',
        ['电商零售', '餐饮外卖', '教育培训', '本地生活'],
      ],
      [
        '微信生态集成',
        '与公众号、企业微信、支付和消息能力深度打通。',
        ['公众号', '企业微信', '微信支付', '订阅消息'],
      ],
    ]),
    /** 交付流程：沿用公司统一六步交付节奏，按小程序业务（审核、发布、运营）改写。 */
    process: [
      ['需求梳理', '明确业务目标、用户角色与首期功能范围。'],
      ['原型与视觉', '设计页面结构与交互原型，确认品牌视觉风格。'],
      ['开发实现', '前后端并行开发，按里程碑交付可体验版本。'],
      ['联调测试', '完成真机测试、支付与消息链路的联调。'],
      ['提审上线', '准备资质与素材，协助完成平台审核发布。'],
      ['运营迭代', '结合访问与转化数据持续优化功能与内容。'],
    ],
  },
  '/app-development': {
    kind: 'app',
    order: 3,
    title: 'App 开发',
    en: 'APP DEVELOPMENT',
    heroImage: '/assets/services/app-hero.jpg',
    mediaImage: '/assets/services/app-media.jpg',
    mediaAlt: '移动应用的界面草图与设计稿',
    capabilityImages: [
      '/assets/services/cards/app-1.jpg',
      '/assets/services/cards/app-2.jpg',
      '/assets/services/cards/app-3.jpg',
      '/assets/services/cards/app-4.jpg',
    ],
    subtitle: '构建兼具体验品质与工程稳定性的移动产品。',
    capabilityTitle: '从第一屏，到长期使用。',
    statement: '移动产品的价值，不只是装进手机，而是融入用户每天的动作。',
    description: '我们从用户旅程、交互设计到研发上线，交付体验完整、性能可靠且可持续迭代的应用。',
    modules: ['实时服务', '任务中心', '多端协同'],
    capabilities: base([
      [
        '原生应用研发',
        '面向高性能与深度系统能力的 iOS、Android 产品。',
        ['iOS', 'Android', 'Swift', 'Kotlin'],
      ],
      [
        '跨平台方案',
        '一套代码多端运行，在体验与成本之间取得平衡。',
        ['Flutter', 'React Native', 'Uni-app'],
      ],
      [
        '移动体验设计',
        '建立清晰、顺畅并符合品牌气质的交互界面。',
        ['交互设计', '视觉规范', '原型验证'],
      ],
      [
        '上架与持续运营',
        '覆盖应用商店上架、监控、迭代与版本维护。',
        ['应用上架', '版本迭代', '性能监控', '崩溃分析'],
      ],
    ]),
    /** 交付流程：来自公司旧官网 App 开发页「开发流程」六步。 */
    process: [
      ['需求分析', '深入了解客户需求，制定产品规划与版本节奏。'],
      ['UI 设计', '设计界面与交互，输出可开发的设计规范。'],
      ['功能开发', '按设计稿与接口约定推进研发，保证代码质量。'],
      ['测试优化', '全面测试功能与性能，优化体验与稳定性。'],
      ['上线发布', '协助完成应用商店上架与发布材料准备。'],
      ['维护升级', '持续提供技术支持与功能迭代。'],
    ],
  },
  '/web-development': {
    kind: 'web',
    order: 4,
    title: '网站建设',
    en: 'WEB DESIGN',
    heroImage: '/assets/services/web-hero.jpg',
    mediaImage: '/assets/services/web-media.jpg',
    mediaAlt: '桌面上的网站设计与前端实现',
    capabilityImages: [
      '/assets/services/cards/web-1.jpg',
      '/assets/services/cards/web-2.jpg',
      '/assets/services/cards/web-3.jpg',
      '/assets/services/cards/web-4.jpg',
    ],
    subtitle: '让网站成为品牌在数字世界最有分量的表达。',
    capabilityTitle: '不止被看见，更值得被记住。',
    statement: '好的品牌网站，应该同时完成表达、理解与信任。',
    description:
      '我们将品牌策略、内容结构、视觉体验与工程能力整合，让网站成为真实支持业务的长期数字资产。',
    modules: ['品牌故事', '产品价值'],
    capabilities: base([
      [
        '品牌官网建设',
        '从定位、内容到视觉与互动的一体化表达。',
        ['Vue 3', 'React', 'TailwindCSS', 'SEO 优化'],
      ],
      [
        '电商与业务平台',
        '兼顾复杂信息、交易能力与用户转化。',
        ['Next.js', 'Node.js', 'MySQL', '支付集成'],
      ],
      [
        '企业管理系统',
        '内部管理后台与业务系统，兼顾权限与数据看板。',
        ['Element Plus', 'Spring Boot', '权限体系', '数据看板'],
      ],
      [
        '多语言与长期维护',
        '适配多地区内容与搜索，长期保障性能与安全。',
        ['多语言站点', 'CDN 加速', '安全防护', '内容更新'],
      ],
    ]),
    /** 交付流程：来自公司旧官网 WEB 网站开发页「开发流程」六步。 */
    process: [
      ['需求沟通', '明确网站定位、栏目结构与功能需求。'],
      ['方案设计', '制定技术方案，设计信息架构与页面原型。'],
      ['UI 设计', '设计符合品牌形象的视觉界面与组件规范。'],
      ['前端开发', '采用现代框架实现页面、动效与响应式适配。'],
      ['后端开发', '开发稳定的内容与业务后台，保障数据安全。'],
      ['测试上线', '全面测试后部署上线，并交付使用说明。'],
    ],
  },
  '/iot-development': {
    kind: 'iot',
    order: 5,
    title: '物联网开发',
    en: 'IOT SOLUTIONS',
    heroImage: '/assets/services/iot-hero.jpg',
    mediaImage: '/assets/services/iot-media.jpg',
    mediaAlt: '现场设备与自动化终端',
    capabilityImages: [
      '/assets/services/cards/iot-1.jpg',
      '/assets/services/cards/iot-2.jpg',
      '/assets/services/cards/iot-3.jpg',
      '/assets/services/cards/iot-4.jpg',
    ],
    subtitle: '连接设备、数据与决策，让现场持续可见。',
    capabilityTitle: '让现场数据，成为经营依据。',
    statement: '从一台设备到一个园区，数据链路都应稳定、清楚、可追溯。',
    description:
      '我们覆盖设备接入、数据采集、实时监控、预警分析与业务平台建设，形成完整物联网闭环。',
    modules: ['现场设备', '边缘网关', '数据看板', '预警中心'],
    capabilities: base([
      [
        '智能硬件与采集',
        '支持各类传感器、控制器的方案设计与现场数据采集。',
        ['传感器接入', '控制器', '边缘网关', '多协议适配'],
      ],
      [
        '云平台搭建',
        '构建设备管理与数据存储平台，统一纳管各类终端。',
        ['设备管理', '数据存储', '权限体系', '开放接口'],
      ],
      [
        '实时监控与告警',
        '设备状态、运行数据与告警工单统一管理。',
        ['状态监控', '告警中心', '运维工单', '远程配置'],
      ],
      [
        '数据分析与可视化',
        '从现场数据中识别趋势与异常，并做可视化呈现。',
        ['趋势分析', '异常识别', '可视化大屏', '经营报表'],
      ],
    ]),
    /** 交付流程：沿用公司统一六步交付节奏，按物联网业务（接入、现场联调）改写。 */
    process: [
      ['现场调研', '梳理设备、网络与业务现状，明确接入范围。'],
      ['方案设计', '确定硬件选型、通信协议与平台架构。'],
      ['设备接入', '完成网关配置、协议对接与数据采集调试。'],
      ['平台开发', '开发设备管理、监控告警与数据看板。'],
      ['联调上线', '现场联调与压力验证，分批完成设备上线。'],
      ['运维优化', '持续监控设备在线率与数据质量，迭代优化。'],
    ],
  },
  '/custom-development': {
    kind: 'custom',
    order: 6,
    title: '定制开发',
    en: 'CUSTOM SOFTWARE',
    heroImage: '/assets/services/custom-hero.jpg',
    mediaImage: '/assets/services/custom-media.jpg',
    mediaAlt: '业务团队围绕系统需求讨论',
    capabilityImages: [
      '/assets/services/cards/custom-1.jpg',
      '/assets/services/cards/custom-2.jpg',
      '/assets/services/cards/custom-3.jpg',
      '/assets/services/cards/custom-4.jpg',
    ],
    stepImages: [
      '/assets/services/cards/custom-step-1.jpg',
      '/assets/services/cards/custom-step-2.jpg',
      '/assets/services/cards/custom-step-3.jpg',
      '/assets/services/cards/custom-step-4.jpg',
    ],
    subtitle: '让系统适配业务，而不是让组织迁就软件。',
    capabilityTitle: '为真实的组织方式而建。',
    statement: '把分散的流程、数据与协作，整理成一套真正好用的系统。',
    description:
      '我们深入业务现场，完成需求拆解、产品设计、研发交付和系统集成，兼顾既有遗留系统的平滑演进。',
    modules: ['业务梳理', '产品蓝图', '研发交付', '持续迭代'],
    moduleNotes: [
      '先理解组织如何运作。',
      '把复杂需求变成清晰结构。',
      '用稳定工程落地每个关键环节。',
      '随着业务变化持续优化。',
    ],
    capabilities: base([
      [
        '企业管理系统',
        'ERP、CRM、OA 等内部系统的定制开发。',
        ['流程自动化', '数据集成', '权限管理'],
      ],
      [
        '行业解决方案',
        '面向特定行业的业务系统与流程化解决方案。',
        ['行业深耕', '专业团队', '成功案例'],
      ],
      [
        '数据分析平台',
        '数据采集、治理、分析与可视化的一体化平台。',
        ['数据治理', '智能分析', '可视化'],
      ],
      [
        '创新产品研发',
        '从 0 到 1 完成产品设计与技术实现。',
        ['技术创新', '快速验证', 'MVP 开发'],
      ],
    ]),
    /** 交付流程：来自公司旧官网定制开发页「定制开发流程」六步。 */
    process: [
      ['需求调研', '深入了解业务场景，梳理功能需求，明确项目目标。'],
      ['方案设计', '制定技术方案，设计系统架构，规划开发路线。'],
      ['原型确认', '设计交互原型，确认业务流程，验证需求理解。'],
      ['开发实施', '敏捷迭代开发，定期汇报进度，及时调整优化。'],
      ['测试验收', '严格质量把控，全面功能测试，确保交付质量。'],
      ['上线运维', '协助系统上线，提供技术支持，持续优化迭代。'],
    ],
  },
  '/digital-creativity': {
    kind: 'creative',
    order: 7,
    title: '数字创意',
    en: 'DIGITAL CREATIVE',
    heroImage: '/assets/services/creative-hero.jpg',
    mediaImage: '/assets/services/creative-media.jpg',
    mediaAlt: '展览空间中的光影装置',
    capabilityImages: [
      '/assets/services/cards/creative-1.jpg',
      '/assets/services/cards/creative-2.jpg',
      '/assets/services/cards/creative-3.jpg',
      '/assets/services/cards/creative-4.jpg',
    ],
    panelImages: [
      '/assets/services/cards/creative-panel-1.jpg',
      '/assets/services/cards/creative-panel-2.jpg',
      '/assets/services/cards/creative-panel-3.jpg',
    ],
    subtitle: '让技术成为内容表达与品牌体验的一部分。',
    capabilityTitle: '创造值得参与的品牌时刻。',
    statement: '当技术真正服务于内容，体验才会留下记忆。',
    description:
      '面向品牌传播、展览展示与文化内容，提供互动网站、数字展陈、创意 H5 与视觉化体验设计。',
    modules: ['互动体验', '数字展陈', '创意 H5', '数据可视化'],
    capabilities: base([
      [
        '互动品牌体验',
        '通过动效与交互增强内容的参与感和传播力。',
        ['创意 H5', '动效设计', '品牌叙事', '互动装置'],
      ],
      [
        '数字展陈设计',
        '连接空间、屏幕、内容与观众的展示体验。',
        ['沉浸式展厅', '虚拟展厅', '内容编排', '互动屏幕'],
      ],
      [
        '3D 与 VR / AR',
        '三维建模、虚拟现实与增强现实应用开发。',
        ['三维建模', 'VR 应用', 'AR 互动', '数字沙盘'],
      ],
      [
        '信息可视化',
        '将复杂数据转化为清晰、有说服力的视觉表达。',
        ['数据可视化', '动态图形', '大屏设计', '信息图表'],
      ],
    ]),
    /** 交付流程：沿用公司统一六步交付节奏，按创意业务（概念、内容制作、现场联调）改写。 */
    process: [
      ['创意沟通', '明确传播目标、受众与内容主题。'],
      ['概念设计', '输出创意概念、视觉风格与体验脚本。'],
      ['原型验证', '用原型或 Demo 验证交互与关键技术可行性。'],
      ['内容制作', '完成视觉、动效、三维与内容素材制作。'],
      ['开发联调', '完成交互开发与多端适配，配合现场联调。'],
      ['上线运营', '支持活动上线与现场运维，复盘并沉淀内容。'],
    ],
  },
}
const locale = computed(() => (route.path.startsWith('/en/') ? 'en' : 'zh-CN'))
/** 咨询入口：与底部 CTA 按钮同一去向（英文走 /en 前缀）。 */
const consultPath = computed(() => (locale.value === 'en' ? '/en/ai-consultation' : '/ai-consultation'))
const servicePath = computed(() => route.path.replace(/^\/en/, '') || '/web-development')

/** 服务数据按稳定 serviceId（kind）选取，不根据翻译后标题或 URL 包含关系判断。 */
const resolveService = (path, source) => {
  if (locale.value === 'zh-CN') return { ...source, path }
  const t = serviceLandingEnByPath[path]
  return {
    ...source,
    path,
    title: t?.title || source.en,
    subtitle: t?.subtitle || `Build a reliable ${source.en.toLowerCase()} experience for your business.`,
    capabilityTitle: t?.capabilityTitle || 'Capabilities that create lasting value.',
    statement: t?.statement || 'Thoughtful product design, stable engineering and a clear path to growth.',
    description:
      t?.description || 'From strategy to delivery, we turn complex requirements into useful digital products.',
    modules: t?.modules || source.modules,
    capabilities: t?.capabilities || source.capabilities,
    process: t?.process || source.process,
    ...(t?.moduleNotes ? { moduleNotes: t.moduleNotes } : {}),
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
const section = computed(() => {
  const source = locale.value === 'en' ? serviceSectionEn : serviceSectionZh
  return source[page.value.kind] || {}
})
const rootEl = ref(null)
const parallaxHeadEl = ref(null)
const statementEl = ref(null)

const mobileQuery = window.matchMedia('(max-width: 1024px)')
const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
const isMobile = ref(mobileQuery.matches)
const prefersReducedMotion = ref(reducedQuery.matches)

const titleIn = ref(false)
/** 换页重置期间临时关掉 spans 的过渡（见 playTitleEntrance 注释）。 */
const titleReset = ref(false)
const titleEl = ref(null)
const titleChars = computed(() => [...(page.value?.title || '')])
/** SPEC M-10：逐字入场，每字延迟 index*0.08+0.3s，空格字符 min-width: 10px。 */
const titleCharStyle = (index, char) => ({
  transitionDelay: `${index * 0.08 + 0.3}s`,
  ...(char === ' ' ? { minWidth: '10px' } : {}),
})

let frame = 0
const timers = { title: 0 }
let aosPending = []
/** `once` 语义下已显影的节点。换页要整体重来，WeakSet 不能 clear，所以这里是可变引用。 */
let aosDone = new WeakSet()

const scheduleFrame = () => {
  if (frame || document.hidden) return
  frame = window.requestAnimationFrame(runScrollDriven)
}

const collectAosTargets = () => {
  if (!rootEl.value) return
  aosPending = [...rootEl.value.querySelectorAll('[data-aos]')].filter((el) => !aosDone.has(el))
}

/**
 * 路由切换前先把显影状态清零。
 *
 * 7 条服务路由（zh 七条 + en 七条）在 router 里是**同一个组件**，组件实例被复用，
 * 被复用的 DOM 会把上一页的 `.aos-animate` 与 `aosDone` 一起带过来；新页面新增的
 * `[data-aos]` 节点又不在旧表里 —— 两者都会让新页面的节点永远停在 `opacity: 0`
 * （用户实测：点导航栏跳转看不到内容，刷新才出现）。
 */
const resetReveal = () => {
  if (!rootEl.value) return
  rootEl.value.querySelectorAll('[data-aos]').forEach((el) => el.classList.remove('aos-animate'))
  aosDone = new WeakSet()
  aosPending = []
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

/**
 * SPEC M-10：加载后 setTimeout(…, 10) 播放逐字入场。
 *
 * 7 条服务路由共用本组件、实例被复用：换页时 `.on` 摘下 10ms 又挂回去，而
 * `.each_animate span` 基础样式带 `transition: 1s`，这一摘一挂被当成一次 1 → 1 的过渡
 * （没有任何可动画的差值）——用户实测：点导航栏换服务页，hero 文字直接出现、没有渐显。
 * 修法：先加 `.reset` 关掉 spans 的过渡并强制结算样式，让「未入场」的 0 状态真正落地，
 * 再恢复过渡、10ms 后挂回 `.on`。
 */
const playTitleEntrance = async () => {
  window.clearTimeout(timers.title)
  titleReset.value = true
  titleIn.value = false
  await nextTick()
  if (titleEl.value) void titleEl.value.offsetWidth
  titleReset.value = false
  await nextTick()
  timers.title = window.setTimeout(() => {
    titleIn.value = true
  }, 10)
}

const onViewportChange = () => {
  isMobile.value = mobileQuery.matches
  prefersReducedMotion.value = reducedQuery.matches
  if (prefersReducedMotion.value) revealEverything()
  collectAosTargets()
  scheduleFrame()
}

onMounted(() => {
  mobileQuery.addEventListener('change', onViewportChange)
  reducedQuery.addEventListener('change', onViewportChange)
  window.addEventListener('scroll', scheduleFrame, { passive: true })
  window.addEventListener('resize', onViewportChange)
  document.addEventListener('visibilitychange', scheduleFrame)

  collectAosTargets()
  if (prefersReducedMotion.value) revealEverything()
  scheduleFrame()
  playTitleEntrance()
})

onBeforeUnmount(() => {
  mobileQuery.removeEventListener('change', onViewportChange)
  reducedQuery.removeEventListener('change', onViewportChange)
  window.removeEventListener('scroll', scheduleFrame)
  window.removeEventListener('resize', onViewportChange)
  document.removeEventListener('visibilitychange', scheduleFrame)
  if (frame) window.cancelAnimationFrame(frame)
  window.clearTimeout(timers.title)
})

watch(
  () => route.path,
  async () => {
    /** DOM 更新之后再收集：见 resetReveal() 注释。 */
    await nextTick()
    resetReveal()
    collectAosTargets()
    if (prefersReducedMotion.value) revealEverything()
    playTitleEntrance()
    scheduleFrame()
  },
  { flush: 'post' },
)
</script>

<style scoped>
/**
 * 页面调色板（用户 2026-09-14 裁决 4：七条服务路由不再各有主题色，统一到首页那套米色）。
 * 取值来源：首页实测 `Home/index.vue:522-528`
 * （`--home-bg:#F2F1E4` / `--home-ink:#111111` / `--home-ink-soft:#6D6C60` / `--home-line:#ADADAD` / `--home-accent:#184DC4`）。
 * 2026-09-15 起改为引用 `:root` 的 `--color-*`，暗色随全局主题自动切换；
 * 本页继续保留 `--svc-*` 别名，避免 100+ 处使用点重写。
 */
.service-page {
  --svc-bg: var(--color-bg);
  --svc-surface: var(--color-surface);
  --svc-surface-soft: var(--color-surface-soft);
  --svc-ink: var(--color-ink);
  --svc-ink-soft: var(--color-ink-soft);
  --svc-ink-body: var(--color-ink-body);
  --svc-line: var(--color-line);
  --svc-line-soft: var(--color-line-soft);
  --svc-accent: var(--color-accent);
  --svc-on-accent: var(--color-on-accent);
  color: var(--svc-ink);
  background: var(--svc-bg);
  overflow: hidden;
}
.service-shell {
  width: min(calc(100% - 96px), 1320px);
  margin: auto;
}
.service-kicker {
  margin: 0;
  color: var(--svc-accent);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.2em;
}
/* hero：照参考站共享模板页 solution/34.html 的排版＝「左标题 + 右导语 + 通栏图 + 大留白」。
   数值与行号见 evidence/service-pages/reference-solution/NOTES.md，与本页的差异见 handoffs/C.md。 */
.service-hero {
  padding: 208px 0 0;
}
.service-hero__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 24px;
}
.service-hero__title {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 5vw;
  margin: 26px auto 90px;
}
.service-hero h1 {
  margin: 0;
  max-width: 45%;
  color: var(--svc-ink);
  font-size: 67px;
  font-weight: 500;
  letter-spacing: -0.01em;
  line-height: 79px;
}
.service-hero h1.is-en {
  overflow-wrap: anywhere;
}
.service-hero__lead {
  width: 650px;
  max-width: 49%;
  margin: 8px 0 0;
  color: var(--svc-ink-soft);
  font-size: 16px;
  font-weight: 500;
  line-height: 38px;
}
.service-hero__index {
  margin: 0;
  color: var(--svc-ink-soft);
  font-size: 11px;
  letter-spacing: 0.16em;
}
/* 参考站 .h1 字号阶梯（数值与行号见 NOTES.md）：>1666px 67px/79px；≤1666px 49px/61px。 */
@media (max-width: 1666px) {
  .service-hero h1 {
    font-size: 49px;
    line-height: 61px;
  }
}
.service-hero__media {
  display: block;
  overflow: hidden;
}
.service-hero__media img {
  display: block;
  width: 100%;
  aspect-ratio: 3840 / 1070;
  object-fit: cover;
}
/* 卡片配图（用户 2026-09-15 反馈 3）：每个 article 一张图，无 hover、无跳转，
   只跟随所在分区的滚动显影（M-24 / M-25）。 */
.service-card-media {
  display: block;
  margin: 0 0 22px;
  overflow: hidden;
  background: var(--svc-surface-soft);
}
.service-card-media img {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
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
  display: flex;
  flex-direction: column;
  gap: 18px;
  background: var(--svc-surface);
  color: var(--svc-ink);
  border: 10px solid var(--svc-ink);
  border-radius: 26px;
  box-shadow: 12px 14px 0 var(--svc-surface-soft);
}
.mini-phone span {
  color: var(--svc-ink-soft);
  font-size: 10px;
  letter-spacing: 0.14em;
}
.mini-phone__screen {
  display: block;
  flex: 1;
  overflow: hidden;
}
.mini-phone__screen img {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 300px;
  object-fit: cover;
}
.mini-journey ol {
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid var(--svc-line);
}
.mini-journey li {
  padding: 22px 0;
  border-bottom: 1px solid var(--svc-line);
  font-size: 18px;
  font-weight: 700;
}
.mini-journey li::before {
  margin-right: 16px;
  color: var(--svc-accent);
  content: '0' counter(list-item);
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
  display: flex;
  flex-direction: column;
  background: var(--svc-surface);
  color: var(--svc-ink);
  border: 10px solid var(--svc-ink);
  border-radius: 32px;
  box-shadow: 0 0 0 1px var(--svc-line);
  overflow: hidden;
}
.app-device span {
  color: var(--svc-ink-soft);
  font-size: 10px;
  letter-spacing: 0.14em;
}
.app-device__screen {
  display: block;
  flex: 1;
  margin-top: 16px;
  overflow: hidden;
}
.app-device__screen img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.app-device--back {
  width: 205px;
  height: 390px;
  background: var(--svc-surface-soft);
  color: var(--svc-ink-soft);
  transform: translateX(48px);
}
.app-device--back span {
  display: block;
  margin-top: 170px;
}
.app-device--small {
  width: 190px;
  height: 330px;
  background: var(--svc-surface-soft);
  transform: translateX(-48px);
}
.app-device--small b {
  margin-top: 120px;
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
  color: var(--svc-ink-soft);
  line-height: 1.9;
}
.web-browser {
  min-height: 410px;
  padding: 20px 28px;
  display: flex;
  flex-direction: column;
  background: var(--svc-surface);
  box-shadow: 16px 16px 0 var(--svc-surface-soft);
}
.web-browser__bar {
  display: flex;
  gap: 7px;
  padding-bottom: 22px;
}
.web-browser__bar i {
  width: 8px;
  height: 8px;
  background: var(--svc-accent);
  border-radius: 50%;
}
.web-browser__screen {
  display: block;
  flex: 1;
  overflow: hidden;
}
.web-browser__screen img {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 300px;
  object-fit: cover;
}
.custom-system__steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 80px;
  border-top: 1px solid var(--svc-line);
}
.custom-system__steps article {
  min-height: 260px;
  padding: 28px;
  border-right: 1px solid var(--svc-line-soft);
}
.custom-system__steps article:last-child {
  border: 0;
}
.custom-system__steps span {
  color: var(--svc-accent);
  font-size: 11px;
  font-weight: 700;
}
.custom-system__steps h3 {
  margin: 26px 0 10px;
  font-size: 21px;
}
.custom-system__steps p {
  color: var(--svc-ink-soft);
  font-size: 13px;
  line-height: 1.7;
}
.creative-space {
  background: var(--svc-bg);
}
.service-capabilities {
  background: var(--svc-bg);
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
  border-top: 1px solid var(--svc-line);
}
.capability-list article {
  position: relative;
  min-height: 340px;
  padding: 28px;
  border-right: 1px solid var(--svc-line-soft);
}
.capability-list article:last-child {
  border: 0;
}
.capability-list span {
  color: var(--svc-accent);
  font-size: 11px;
  font-weight: 700;
}
.capability-list h3 {
  margin: 26px 0 14px;
  font-size: 23px;
}
.capability-list p {
  max-width: 240px;
  margin: 0;
  color: var(--svc-ink-soft);
  font-size: 14px;
  line-height: 1.8;
}
/* 能力卡关键词标签（技术栈/场景词，取自公司旧官网各服务页） */
.service-card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 18px 0 0;
  padding: 0;
  list-style: none;
}
.service-card-tags li {
  padding: 4px 9px;
  border: 1px solid var(--svc-line-soft);
  border-radius: 999px;
  color: var(--svc-ink-soft);
  font-size: 11px;
  line-height: 1.5;
  white-space: nowrap;
}
.service-approach {
  padding: 125px 0;
  background: var(--svc-bg);
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
  color: var(--svc-ink-body);
  line-height: 1.9;
}
/* 交付流程六步（沿用公司统一交付节奏，逐页按业务改写） */
.service-process {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 42px 40px;
  margin: 92px auto 0;
  padding: 46px 0 0;
  border-top: 1px solid var(--svc-line-soft);
  list-style: none;
}
.service-process span {
  color: var(--svc-accent);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
}
.service-process h3 {
  margin: 14px 0 10px;
  font-size: 19px;
}
.service-process p {
  max-width: 300px;
  margin: 0;
  color: var(--svc-ink-soft);
  font-size: 13px;
  line-height: 1.8;
}
.service-cta {
  padding: 130px 0;
  background: var(--svc-bg);
  color: var(--svc-ink);
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
  color: var(--svc-ink);
  background: transparent;
  border: 0;
  border-bottom: 1px solid var(--svc-line);
  font-size: 13px;
  font-weight: 700;
}
.service-cta button span {
  color: var(--svc-accent);
  font-size: 18px;
}
@media (max-width: 800px) {
  .service-shell {
    width: calc(100% - 40px);
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
    border-bottom: 1px solid var(--svc-line-soft);
  }
  .custom-system__steps h3 {
    margin-top: 36px;
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
.ai-architecture__head {
  align-items: start;
}
.ai-architecture__head > div > p {
  max-width: 520px;
  margin: 25px 0 0;
  color: var(--svc-ink-soft);
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
  background: var(--svc-surface);
  border: 1px solid var(--svc-line-soft);
}
.ai-flow article:nth-of-type(2) {
  background: var(--svc-surface-soft);
}
.ai-flow article:nth-of-type(3) {
  background: var(--svc-surface);
}
.ai-flow article:nth-of-type(4) {
  color: var(--svc-on-accent);
  background: var(--svc-accent);
  border-color: var(--svc-accent);
}
.ai-flow article span {
  color: var(--svc-ink-soft);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.12em;
}
.ai-flow article:nth-of-type(4) span {
  color: rgba(255, 255, 255, 0.85);
}
.ai-flow h3 {
  margin: 24px 0 13px;
  font-size: 22px;
  letter-spacing: -0.03em;
}
.ai-flow p {
  margin: 0;
  color: var(--svc-ink-soft);
  font-size: 13px;
  line-height: 1.75;
}
.ai-flow article:nth-of-type(4) p {
  color: rgba(255, 255, 255, 0.85);
}
.ai-flow > b {
  display: grid;
  place-items: center;
  color: var(--svc-ink-soft);
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
.ai-flow > b {
  color: var(--svc-accent);
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
  background: var(--svc-surface-soft);
  color: var(--svc-ink);
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
  color: var(--svc-ink-soft);
  font-size: 13px;
}
.iot-dashboard__main i {
  position: absolute;
  right: -18px;
  bottom: -40px;
  width: 280px;
  height: 150px;
  border: 20px solid var(--svc-accent);
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
  background: var(--svc-surface);
}
.iot-dashboard__side article:last-child {
  grid-column: span 2;
  background: var(--svc-accent);
}
.iot-dashboard__side b {
  display: block;
  margin-top: 36px;
  color: var(--svc-ink);
  font-size: 44px;
  letter-spacing: -0.05em;
}
.iot-dashboard__side p {
  margin: 8px 0 0;
  color: var(--svc-ink-soft);
}
.iot-dashboard__side article:last-child b {
  color: var(--svc-on-accent);
}
.iot-dashboard__side article:last-child p {
  color: rgba(255, 255, 255, 0.85);
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
  background: var(--svc-surface);
  color: var(--svc-ink);
}
.creative-panels article:nth-child(2) {
  background: var(--svc-surface-soft);
}
.creative-panels article:nth-child(3) {
  color: var(--svc-on-accent);
  background: var(--svc-accent);
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
  color: var(--svc-ink-soft);
  font-size: 14px;
  line-height: 1.8;
}
.creative-panels article:nth-child(3) p {
  color: rgba(255, 255, 255, 0.85);
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
/* 换页时先关掉过渡，让「未入场」状态落地，再由 playTitleEntrance 恢复（见该函数注释） */
.each_animate.reset span {
  transition: none !important;
}
/* SPEC M-24 / M-25：进入视口一次入场；触发阈值（150 / 0）由 JS 逐帧计算 */
[data-aos] {
  transition-duration: 1.5s;
  transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
[data-aos^='fade'] {
  opacity: 0;
  /* 收窄：本组只改 opacity 与 transform（位移见下方 [data-aos='fade-top']）。
     `all` 会被 check:motion 判成「新增 transition-all」（B.md §9.14 申请 3）。 */
  transition-property: opacity, transform;
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
  background: var(--svc-line);
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
.service-cta button {
  cursor: pointer;
  transition:
    transform 0.25s ease,
    border-color 0.25s ease;
}
.service-cta button:hover {
  transform: translateX(8px);
  border-color: var(--svc-accent);
}
/* SPEC 断点速查 ≤1024px：不擦除整段文案，改用静态段落（`.sj_text`）展示 */
@media (max-width: 1024px) {
  .service-shell {
    width: min(calc(100% - 48px), 1320px);
  }
  .service-section,
  .service-approach,
  .service-cta {
    padding: 84px 0;
  }
  /* 2026-09-15 用户允许：配合全站透明页头，≤1024 的 hero 上留白从 SPEC 的 80px 调到 104px。
     其余仍按 SPEC 断点表：标题 23px/1.5、导语 14px/35px、图高 250px。 */
  .service-hero {
    padding: 104px 0 0;
  }
  .service-hero__title {
    flex-direction: column;
    gap: 0;
    margin: 0 auto 42px;
  }
  .service-hero h1 {
    max-width: none;
    margin: 0 0 20px;
    font-size: 23px;
    line-height: 1.5;
  }
  .service-hero__lead {
    width: 100%;
    max-width: none;
    margin: 0;
    font-size: 14px;
    line-height: 35px;
  }
  .service-hero__media img {
    aspect-ratio: auto;
    height: 250px;
  }
  .service-capabilities__head {
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
    border-bottom: 1px solid var(--svc-line-soft);
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
  .service-process {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px 26px;
    margin-top: 62px;
    padding-top: 34px;
  }
  .service-process p {
    max-width: none;
  }
  .public_text {
    display: none !important;
  }
  .public_text.sj_text {
    display: block !important;
  }
  .service-card-media {
    margin-bottom: 18px;
  }
}
@media (max-width: 560px) {
  .service-process {
    grid-template-columns: 1fr;
    gap: 24px;
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

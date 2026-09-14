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
          class="each_animate"
          :class="{ on: titleIn }"
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
            把企业已有资料，<br>变成随时可用的智能助手。
          </h2>
          <p>
            不必从零开始。制度、产品资料、历史案例和业务流程，经过整理后就能成为 AI 的可靠依据。
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
              alt="整理企业资料"
              loading="lazy"
              decoding="async"
            >
          </div>
          <span>第一步</span>
          <h3>整理企业资料</h3>
          <p>制度、文档、产品手册、历史工单</p>
        </article>
        <b>→</b>
        <article>
          <div class="service-card-media">
            <img
              :src="page.flowImages[1]"
              alt="建立专属知识库"
              loading="lazy"
              decoding="async"
            >
          </div>
          <span>第二步</span>
          <h3>建立专属知识库</h3>
          <p>统一归档、持续更新、准确检索</p>
        </article>
        <b>→</b>
        <article>
          <div class="service-card-media">
            <img
              :src="page.flowImages[2]"
              alt="接入 AI 助手"
              loading="lazy"
              decoding="async"
            >
          </div>
          <span>第三步</span>
          <h3>接入 AI 助手</h3>
          <p>问答、写作、分析与任务协同</p>
        </article>
        <b>→</b>
        <article>
          <div class="service-card-media">
            <img
              :src="page.flowImages[3]"
              alt="服务真实岗位"
              loading="lazy"
              decoding="async"
            >
          </div>
          <span>实际使用</span>
          <h3>服务真实岗位</h3>
          <p>客服、销售、运营和内部员工</p>
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
            把服务放进用户<br>最顺手的入口。
          </h2>
        </div>
        <div
          class="mini-phone"
          data-aos="fade-top"
          data-aos-delay="100"
        >
          <span>品牌服务</span>
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
          让每一次触达，<br>都有完整的产品体验。
        </h2>
      </div>
      <div
        class="service-shell app-devices"
        data-aos="fade-top"
        data-aos-delay="100"
      >
        <div class="app-device app-device--back">
          <span>数据总览</span>
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
          <span>消息</span><b>01</b>
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
            让品牌第一眼，<br>就值得被相信。
          </h2>
          <p class="service-lead">
            从内容逻辑到视觉系统，再到稳定、易维护的技术实现，品牌网站应是一项长期资产。
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
          设备有了语言，<br>现场才真正可见。
        </h2>
      </div>
      <div
        class="service-shell iot-dashboard"
        data-aos="fade-top"
        data-aos-delay="100"
      >
        <div class="iot-dashboard__main">
          <span>设备运行总览</span><b>98.6<small>%</small></b>
          <p>今日设备在线率</p>
          <i />
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
          不迁就软件，<br>让软件适配组织。
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
          让内容、空间和技术<br>成为一次完整体验。
        </h2>
      </div>
      <div
        class="service-shell creative-panels"
        data-aos="fade-top"
        data-aos-delay="100"
      >
        <article>
          <span>01 / BRAND</span>
          <div class="service-card-media">
            <img
              :src="page.panelImages[0]"
              alt="互动品牌体验"
              loading="lazy"
              decoding="async"
            >
          </div>
          <h3>互动品牌体验</h3>
          <p>让品牌故事不止被看见，也能被参与。</p>
        </article>
        <article>
          <span>02 / SPACE</span>
          <div class="service-card-media">
            <img
              :src="page.panelImages[1]"
              alt="数字展陈"
              loading="lazy"
              decoding="async"
            >
          </div>
          <h3>数字展陈</h3>
          <p>把空间、屏幕与内容组织成一个现场。</p>
        </article>
        <article>
          <span>03 / MOBILE</span>
          <div class="service-card-media">
            <img
              :src="page.panelImages[2]"
              alt="创意 H5"
              loading="lazy"
              decoding="async"
            >
          </div>
          <h3>创意 H5</h3>
          <p>为一次活动或传播，创造可分享的互动入口。</p>
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
const route = useRoute()
const router = useRouter()
const base = (capabilities) => capabilities.map(([title, text]) => ({ title, text }))
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
      ['互动品牌体验', '通过动效与交互增强内容的参与感和传播力。'],
      ['数字展陈设计', '连接空间、屏幕、内容与观众的展示体验。'],
      ['创意 H5 开发', '适合活动、传播与叙事的移动互动页面。'],
      ['信息可视化', '将复杂数据转化为清晰、有说服力的视觉表达。'],
    ]),
  },
}
const locale = computed(() => (route.path.startsWith('/en/') ? 'en' : 'zh-CN'))
/** 咨询入口：与底部 CTA 按钮同一去向（英文走 /en 前缀）。 */
const consultPath = computed(() => (locale.value === 'en' ? '/en/ai-consultation' : '/ai-consultation'))
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
const rootEl = ref(null)
const parallaxHeadEl = ref(null)
const statementEl = ref(null)

const mobileQuery = window.matchMedia('(max-width: 1024px)')
const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
const isMobile = ref(mobileQuery.matches)
const prefersReducedMotion = ref(reducedQuery.matches)

const titleIn = ref(false)
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

/** SPEC M-10：加载后 setTimeout(…, 10) 播放逐字入场。 */
const playTitleEntrance = () => {
  window.clearTimeout(timers.title)
  titleIn.value = false
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
 * 本页只做页内副本，不改全局 token；A 若把 `--home-*` 提到 `:root`，这里改为引用即可。
 */
.service-page {
  --svc-bg: #f2f1e4;
  --svc-surface: #ffffff;
  --svc-surface-soft: #e7e5da;
  --svc-ink: #111111;
  --svc-ink-soft: #6d6c60;
  --svc-ink-body: #3d3d3d;
  --svc-line: #adadad;
  --svc-line-soft: #d6d3c6;
  --svc-accent: #184dc4;
  --svc-on-accent: #ffffff;
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
  /* SPEC 断点速查 ≤1024px / 参考站 .solution 移动档：hero 上留白 80px、标题 23px/1.5、导语 14px/35px、图高 250px。 */
  .service-hero {
    padding: 80px 0 0;
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

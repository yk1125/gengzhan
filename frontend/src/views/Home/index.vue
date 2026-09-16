<template>
  <div
    class="home"
    :data-locale="locale"
    :data-motion="reducedMotion ? 'reduced' : 'full'"
  >
    <!-- 首屏：SPEC M-07 播放编排 / M-08 视差 / M-10 逐字入场 -->
    <section class="banner">
      <div class="parallax">
        <video
          ref="bannerVideoRef"
          class="back"
          :src="bannerSrc"
          muted
          playsinline
          preload="metadata"
          @ended="onBannerEnded"
        />
      </div>
      <div class="banner-scrim" aria-hidden="true" />

      <div class="banner-wrap">
        <h1 class="each_animate" :class="{ on: titleOn }" :aria-label="heroPlainText">
          <span
            v-for="line in heroChars"
            :key="line.key"
            class="hero-line"
            aria-hidden="true"
          >
            <span v-for="group in line.groups" :key="group.key" class="grp">
              <span
                v-for="char in group.chars"
                :key="char.key"
                class="char"
                :class="{ space: char.isSpace }"
                :style="char.style"
              >{{ char.text }}</span>
            </span>
          </span>
        </h1>
        <p class="banner-desc">{{ c.hero.desc }}</p>
        <div class="banner-actions">
          <router-link class="pill" :to="aiConsultationPath">{{ c.hero.primary }} ↗</router-link>
          <a class="pill ghost" href="#services">{{ c.hero.secondary }} ↓</a>
        </div>
      </div>
    </section>

    <!-- index1：客户墙（SPEC M-11）+ 公司介绍（M-13 / M-26 / M-24） -->
    <section id="customers" class="index1">
      <div class="wrap">
        <small class="eyebrow">{{ c.intro.eyebrow }}</small>

        <div class="headline" data-aos="fade-top">
          <p>{{ c.wall.headline }}</p>
          <div class="line" />
        </div>

        <div class="title public_text" data-aos="fade-top">
          <div class="p">
            <p v-for="(row, index) in c.wall.title" :key="'solid-' + index">{{ row }}</p>
          </div>
          <div class="p" aria-hidden="true">
            <p v-for="(row, index) in c.wall.title" :key="'ghost-' + index">{{ row }}</p>
          </div>
        </div>
        <div class="title public_text sj_text">{{ c.wall.title.join('，') }}</div>

        <div class="text" data-aos="fade-top" data-aos-delay="200">
          <p v-for="(paragraph, index) in c.intro.paragraphs" :key="'p-' + index">{{ paragraph }}</p>
          <router-link class="more" :to="aboutPath" data-aos="fade-top" data-aos-delay="100">
            <p>{{ c.intro.more }}</p>
            <span class="more-icon" aria-hidden="true">↗</span>
          </router-link>
        </div>

        <div class="picture wall-pc" data-aos="fade-top" data-aos-delay="200">
          <div v-for="(slot, slotIndex) in customerSlotsDesktop" :key="'pc-' + slotIndex" class="img">
            <div class="swiper slot">
              <div class="swiper-wrapper">
                <div v-for="logo in slot" :key="logo.key" class="swiper-slide">
                  <img :src="customerSrc(logo)" :style="{ height: logo.height + 'px' }" alt="" loading="lazy">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="picture wall-mobile" data-aos="fade-top" data-aos-delay="200">
          <div v-for="(slot, slotIndex) in customerSlotsMobile" :key="'mb-' + slotIndex" class="img">
            <div class="swiper slot">
              <div class="swiper-wrapper">
                <div v-for="logo in slot" :key="logo.key" class="swiper-slide">
                  <img :src="customerSrc(logo)" :style="{ height: logo.height + 'px' }" alt="" loading="lazy">
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- index2：服务能力与交付能力（SPEC M-12 双列视差 + M-13 + M-24） -->
    <section id="capability" class="index2">
      <div class="wrap">
        <div v-for="(row, rowIndex) in capabilityRows" :key="'fist-' + rowIndex" class="fist public_hover">
          <div v-for="(column, columnIndex) in row" :key="'flex-' + rowIndex + '-' + columnIndex" class="flex">
            <div v-if="column.headline" class="title">
              <div class="blue public_text" data-aos="fade-top">
                <div class="p">
                  <p v-for="(line, index) in column.headline" :key="'hs-' + index">{{ line }}</p>
                </div>
                <div class="p" aria-hidden="true">
                  <p v-for="(line, index) in column.headline" :key="'hg-' + index">{{ line }}</p>
                </div>
              </div>
              <div class="blue public_text sj_text">{{ column.headline.join('，') }}</div>
              <router-link class="more" :to="consultationPath" data-aos="fade-top" data-aos-delay="100">
                <p>{{ c.capability.more }}</p>
                <span class="more-icon" aria-hidden="true">↗</span>
              </router-link>
            </div>

            <div
              v-for="item in column.items"
              :key="item.key"
              class="item"
              data-aos="fade-top"
              data-aos-delay="100"
            >
              <router-link
                v-if="item.path"
                class="img"
                :to="item.path"
              >
                <img :src="item.image" alt="" loading="lazy" decoding="async" />
              </router-link>
              <div v-else class="img">
                <img :src="item.image" alt="" loading="lazy" decoding="async" />
              </div>
              <div class="text">
                <p class="item-name">{{ item.name }}</p>
                <p class="item-desc">{{ item.desc }}</p>
              </div>
              <router-link v-if="item.path" class="item-link" :to="item.path">
                {{ item.linkLabel }} ↗
              </router-link>
              <p v-else class="item-meta">{{ item.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- index4：品牌宣言整屏 scrub（SPEC M-18 高度注入 / M-19 mask / M-20 bg / M-21 fix / M-22 文案插值） -->
    <section id="statement" class="index4">
      <div class="fix">
        <div class="bg" :style="{ backgroundImage: statementBackground }" aria-hidden="true" />
        <div class="mask" aria-hidden="true" />
        <div class="sj_jump">
          <div
            v-for="(group, index) in c.statement.groups"
            :key="'statement-' + index"
            class="text"
          >
            <div
              data-view="auto"
              :data-distance="statementGroups[index].outer.distance"
              :data-animate="statementGroups[index].outer.animate"
              :data-opacity="statementGroups[index].outer.opacity"
            >
              <p
                data-view="auto"
                :data-distance="statementGroups[index].inner.distance"
                :data-animate="statementGroups[index].inner.animate"
                :data-scale="statementGroups[index].inner.scale"
                :data-opacity="statementGroups[index].inner.opacity"
              >{{ group.title }}<span class="statement-sub">{{ group.sub }}</span></p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- index5：项目与动态 + 咨询入口（SPEC M-34 手机横向 Swiper） -->
    <section id="insights" class="index5">
      <div class="wrap">
        <div class="insights-head" data-aos="fade-top">
          <small class="eyebrow">{{ c.insights.eyebrow }}</small>
          <h2 class="insights-title">{{ c.insights.title }}</h2>
        </div>

        <div class="swiper insights-swiper public_hover" data-aos="fade-top" data-aos-delay="100">
          <div class="swiper-wrapper">
            <article v-for="card in insightCards" :key="card.key" class="swiper-slide card">
              <router-link
                class="card-img"
                :to="card.path"
              >
                <img :src="card.image" alt="" loading="lazy" decoding="async" />
              </router-link>
              <p class="card-kicker">
                <span>{{ card.kicker }}</span>
                <span v-if="card.demo" class="card-flag">{{ c.insights.demoLabel }}</span>
              </p>
              <h3 class="card-title">{{ card.title }}</h3>
              <p class="card-desc">{{ card.desc }}</p>
              <router-link class="card-link" :to="card.path">{{ card.linkLabel }} ↗</router-link>
            </article>
          </div>
          <div class="swiper-pagination" />
        </div>

        <div class="cta" data-aos="fade-top" data-aos-delay="200">
          <small class="eyebrow">{{ c.cta.eyebrow }}</small>
          <p class="cta-title">{{ c.cta.title }}</p>
          <div class="cta-actions">
            <router-link class="pill hover_button" :to="aiConsultationPath">{{ c.cta.primary }} ↗</router-link>
            <router-link class="pill ghost" :to="aboutPath">{{ c.cta.secondary }}</router-link>
          </div>
          <p class="cta-contact">{{ c.cta.contact }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
/**
 * 首页样板（Session B）。动效数值全部来自 `docs/frontend-rebuild/evidence/reference-effects/SPEC.md`，
 * 经 `./motion.js` 逐个条目落地；滚动驱动在 `./useHomeScroll.js`，两处 Swiper 在 `./useHomeSwipers.js`。
 * 本页不修改全局样式、router 与公共组件（属 A）；主题切换按钮、页头入场、自定义光标等公共能力见
 * `docs/frontend-rebuild/handoffs/B.md` 的契约变更申请。
 */
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { localizeRoute } from '@/config/routeManifest'
import {
  CUSTOMER_ASSET_BASE,
  CUSTOMER_SLOT_SIZE_MOBILE,
  CUSTOMER_SLOT_SIZE_PC,
  HOME_BANNER_MEDIA,
  HOME_CASE_PLACEHOLDERS,
  HOME_SERVICES,
  HOME_STATEMENT_BG,
  customerSlots,
  homeContent
} from '@/content/home'
import { demoCases, demoNews } from '@/mocks/content'
import { banner as bannerMotion, statement as statementMotion } from './motion'
import { useHomeScroll } from './useHomeScroll'
import { useCustomerWall, useInsightsSwiper } from './useHomeSwipers'

const route = useRoute()
const router = useRouter()
const rootRef = ref(null)
/** 首屏 <video> 模板引用（M-07 需要程序化播放，SPEC 明确不用 autoplay 属性）。 */
const bannerVideoRef = ref(null)

/** 语言由路由前缀决定（`/en` 与 `/en/...` 为英文），与 A 的语言注册一致。 */
const locale = computed(() => (route.path === '/en' || route.path.startsWith('/en/') ? 'en' : 'zh-CN'))
const isEn = computed(() => locale.value === 'en')
const c = computed(() => homeContent[locale.value])

/* 滚动驱动管线（M-08 / M-12 / M-13 / M-18—M-23 / M-24），断点状态与两处 Swiper 共用。 */
const { isDesktop, reducedMotion } = useHomeScroll(rootRef)
useCustomerWall(rootRef, isDesktop, reducedMotion)
useInsightsSwiper(rootRef, isDesktop)

/* ---------------------------------------------------------------- 路由目标 */
const aiConsultationPath = computed(() => router.resolve(localizeRoute({ routeKey: 'ai', locale: locale.value })).path)
const aboutPath = computed(() => (isEn.value ? '/en/about' : '/about'))
const casesPath = computed(() => (isEn.value ? '/en/cases' : '/cases'))
const newsPath = computed(() => (isEn.value ? '/en/news' : '/news'))
/**
 * index2 标题列「更多」的落点。本项目没有服务列表页（导航直接列出 4 个服务页），
 * 因此指向 AI 咨询入口；已在 handoffs/B.md 登记，请 A 决定是否需要 /services 列表页。
 */
const consultationPath = computed(() => aiConsultationPath.value)

/* --------------------------------------------------- M-33 主题（只读跟随） */
const isDark = ref(false)
let themeObserver = null
function readTheme () {
  isDark.value = document.documentElement.dataset.theme === 'dark'
}

/* --------------------------------------- M-07 / M-08 / M-10 首屏 banner */
const bannerSrc = ref(HOME_BANNER_MEDIA.desktop)
const titleOn = ref(false)
let titleTimer = 0

function pickBannerSrc () {
  bannerSrc.value = window.innerWidth <= 1024 ? HOME_BANNER_MEDIA.mobile : HOME_BANNER_MEDIA.desktop
}

/**
 * M-07：参考站 banner 是 Swiper 驱动的多屏，`video.play()` 之后由 `ended` 事件 `slideNext()`
 * 切到下一屏。本项目首屏只有一条自有素材（原因见 home.js 顶部说明），没有可切的下一屏，
 * 因此 `ended` 时把 currentTime 归零再播，等效保留参考站「一屏播完继续下一轮」的观感。
 * 视频元素自身的 `loop` 保持 false、`autoplay` 属性保持缺省，与 SPEC M-07 实测属性一致。
 * 参考站在 `prefers-reduced-motion` 下没有对应分支；本页沿用「不自动播放」的降级（AC07b）。
 */
function playBannerVideo () {
  const video = bannerVideoRef.value
  if (!video || reducedMotion.value) return
  const played = video.play()
  if (played && typeof played.catch === 'function') played.catch(() => {})
}

function onBannerEnded () {
  const video = bannerVideoRef.value
  if (!video) return
  video.currentTime = 0
  playBannerVideo()
}

/* 断点切换会换掉 video 的 src，换源后重新起播。`flush: 'post'` 保证读到的是新元素。 */
watch(bannerSrc, () => playBannerVideo(), { flush: 'post' })

/**
 * M-10：标题拆成单字。延迟 `index * 0.08 + 0.3` 秒、时长 1s、起始 `translateX(10px)`；
 * 空格转 NBSP 并给 `min-width: 10px`。参考站每行重新计数（两行都从 0.30s 起），本实现一致。
 *
 * 与参考站的唯一结构差异：参考站标题是中文，逐字 `inline-block` 换行效果正确；本项目标题含英文，
 * 逐字 `inline-block` 会在任意两字之间断行，手机上实测把 "applications" 拆成 "application / s"。
 * 因此按「分组」渲染——西文连续字母合成一组、组内 `nowrap`（换行只发生在词与词之间），
 * 中文与全角标点每字一组（保持可在任意字间换行）。字符延迟仍按整行连续计数，与 SPEC 一致。
 */
const CJK_CHAR = /[\u2E80-\u303F\u3040-\u9FFF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFF60\uFFE0-\uFFE6]/

const heroChars = computed(() => c.value.hero.lines.map((line, lineIndex) => {
  const groups = []
  let current = null
  let index = 0
  const span = (char) => {
    const charSpan = {
      key: `hero-${lineIndex}-${index}`,
      text: char === ' ' ? '\u00A0' : char,
      isSpace: char === ' ',
      style: {
        transitionDelay: `${(index * bannerMotion.charStaggerS + bannerMotion.charBaseDelayS).toFixed(2)}s`
      }
    }
    index += 1
    return charSpan
  }
  Array.from(line).forEach((char) => {
    if (char !== ' ' && !CJK_CHAR.test(char)) {
      if (!current) {
        current = { key: `hero-${lineIndex}-g${groups.length}`, chars: [] }
        groups.push(current)
      }
      current.chars.push(span(char))
      return
    }
    if (char === ' ' && current) {
      current.chars.push(span(char))
      current = null
      return
    }
    groups.push({ key: `hero-${lineIndex}-g${groups.length}`, chars: [span(char)] })
    current = null
  })
  return { key: `hero-line-${lineIndex}`, groups }
}))
const heroPlainText = computed(() => c.value.hero.lines.join('，'))

/* --------------------------------------------------------------- M-11 客户墙 */
const customerSlotsDesktop = computed(() => customerSlots(CUSTOMER_SLOT_SIZE_PC))
const customerSlotsMobile = computed(() => customerSlots(CUSTOMER_SLOT_SIZE_MOBILE))
function customerSrc (logo) {
  return `${CUSTOMER_ASSET_BASE}/${logo.file}`
}

/* ------------------------------------------- index2 内容（M-12 双列 / M-24 入场） */
const services = computed(() => HOME_SERVICES.map((service) => {
  const text = c.value.capability.services[service.id]
  return {
    id: service.id,
    transitionIndex: service.transitionIndex,
    label: text.label,
    name: text.name,
    desc: text.desc,
    path: service.paths[locale.value]
  }
}))

const capabilityRows = computed(() => {
  const capability = c.value.capability
  const list = services.value
  const asItem = (service) => ({
    key: service.id,
    name: service.name,
    desc: service.desc,
    path: service.path,
    linkLabel: capability.itemLink
  })
  const asFact = (index) => {
    const fact = capability.facts[index]
    return { key: `fact-${index}`, name: fact.value, label: fact.label, desc: fact.desc }
  }
  const rows = [
    [
      { key: 'col-headline', headline: capability.title, items: list.slice(0, 2).map(asItem) },
      { key: 'col-services', items: list.slice(2, 4).map(asItem) }
    ],
    [
      { key: 'col-facts-title', headline: [capability.factsTitle], items: [asFact(0), asFact(1)] },
      { key: 'col-facts', items: [asFact(2), asFact(3)] }
    ]
  ]

  // 占位动图：按槽位循环复用（用户决定「只抓小体积、允许重复、先占位」）。
  let slot = 0
  rows.forEach((row) => row.forEach((column) => column.items.forEach((item) => {
    item.image = HOME_CASE_PLACEHOLDERS[slot % HOME_CASE_PLACEHOLDERS.length]
    slot += 1
  })))
  return rows
})

/* ------------------------------------------------- M-18—M-23 index4 品牌宣言 */
const statementBackground = computed(() => `url(${HOME_STATEMENT_BG})`)
const statementGroups = computed(() => statementMotion.copyGroups.map((group) => ({
  outer: {
    distance: group.outer.distance,
    animate: group.outer.animate,
    opacity: group.outer.opacity.join(',')
  },
  inner: {
    distance: group.inner.distance,
    animate: group.inner.animate,
    scale: group.inner.scale.join(','),
    opacity: group.inner.opacity.join(',')
  }
})))

/* --------------------------------------------- index5 卡片（M-34 手机横向 Swiper） */
const insightCards = computed(() => {
  const content = c.value
  const list = services.value
  return [
    {
      key: 'case-demo',
      image: HOME_CASE_PLACEHOLDERS[0],
      demo: true,
      kicker: 'CASE',
      title: demoCases[0].title[locale.value],
      desc: demoCases[0].excerpt[locale.value],
      path: casesPath.value,
      linkLabel: content.insights.more
    },
    {
      key: 'news-demo',
      image: HOME_CASE_PLACEHOLDERS[0],
      demo: true,
      kicker: 'NEWS',
      title: demoNews[0].title[locale.value],
      desc: demoNews[0].excerpt[locale.value],
      path: newsPath.value,
      linkLabel: content.insights.newsMore
    },
    {
      key: 'service-ai',
      image: HOME_CASE_PLACEHOLDERS[0],
      kicker: 'SERVICE',
      title: list[0].name,
      desc: list[0].desc,
      path: list[0].path,
      linkLabel: content.capability.itemLink
    },
    {
      key: 'service-web',
      image: HOME_CASE_PLACEHOLDERS[0],
      kicker: 'SERVICE',
      title: list[3].name,
      desc: list[3].desc,
      path: list[3].path,
      linkLabel: content.capability.itemLink
    }
  ]
})

/* ------------------------------------------------------------------ 生命周期 */
function onResize () {
  pickBannerSrc()
}

onMounted(() => {
  if (!rootRef.value) rootRef.value = document.querySelector('.home')
  pickBannerSrc()
  playBannerVideo()
  readTheme()
  // A 的主题按钮写的是 <html data-theme>；本页只跟随，不自己建状态。
  themeObserver = new MutationObserver(readTheme)
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  // M-10：与滚动无关，加载后 10ms 直接播放逐字入场。
  titleTimer = window.setTimeout(() => { titleOn.value = true }, 10)
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
  if (bannerVideoRef.value) bannerVideoRef.value.pause()
  if (titleTimer) window.clearTimeout(titleTimer)
  titleTimer = 0
  if (themeObserver) {
    themeObserver.disconnect()
    themeObserver = null
  }
})
</script>

<style scoped>
/* ==========================================================================
   首页样板样式（Session B）
   亮色取值来自 T00A / T00R 对参考站的实测；暗色在 SPEC G-08 里明确「未逐条实测」，
   因此暗色是**实现建议**，最终 palette 由 A 的全局 token 决定（见 handoffs/B.md 契约申请）。
   本文件只作用于本页（scoped），不新增全局样式，也不用 !important 掩盖结构问题。
   ========================================================================== */
.home {
  --home-bg: #F2F1E4;
  --home-ink: #111111;
  --home-ink-soft: #6D6C60;
  --home-line: #ADADAD;
  --home-ghost: rgba(0, 0, 0, 0.2);
  --home-accent: #184DC4;
  --home-cta-bg: var(--home-accent); /* CTA 卡片底色；亮色沿用主色 */
  --home-card: #DDDDCE;
  --home-box-border: rgba(193, 192, 180, 0.97);
  --home-mask: #201D1E;
  --home-logo: #282828;

  position: relative;
  overflow-x: clip;
  /* 2026-09-15 用户授权删除本页 .home 的 background：全局 style.css 的 .home 已改
     transparent 且不再依赖 !important。本页每个 section 自己声明底色，见下面
     .index1 / .index2 / .index5。 */
  color: var(--home-ink);
}

html[data-theme='dark'] .home {
  --home-bg: #14140F;
  --home-ink: #F2F1E4;
  --home-ink-soft: #9A978A;
  --home-line: #45443C;
  --home-ghost: rgba(242, 241, 228, 0.22);
  --home-accent: #4D7CE8;
  --home-cta-bg: #2F55A8; /* 暗色下调：整块铺 #4D7CE8 偏亮（用户反馈 3） */
  --home-card: #1E1E18;
  --home-box-border: rgba(120, 118, 106, 0.6);
  --home-mask: #0B0A09;
  --home-logo: #F2F1E4;
}

.eyebrow {
  display: block;
  margin-bottom: 18px;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--home-ink-soft);
}

/* ---- M-24 通用入场：1.5s / cubic-bezier(.175,.885,.32,1.275) / fade-top 位移 50px ---- */
.home [data-aos] {
  opacity: 0;
  transition:
    opacity 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275),
    transform 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.home [data-aos='fade-top'] { transform: translate(0, 50px); }
.home [data-aos].aos-animate { opacity: 1; transform: translate(0, 0); }
.home [data-aos-delay='100'] { transition-delay: 0.1s; }
.home [data-aos-delay='200'] { transition-delay: 0.2s; }

/* ---- M-07 / M-08 / M-10 首屏 ---- */
.banner {
  position: relative;
  height: 100vh;
  min-height: 560px;
  overflow: hidden;
  background: #111111;
}
.banner .parallax { position: absolute; inset: 0; will-change: transform; }
.banner .back { display: block; width: 100%; height: 100%; object-fit: cover; }
/* 首屏压暗层：参考站首屏自带深色素材，本项目改用自有 hero 视频，视频右上有一块高亮区域，
   实测纯 30% 黑底会让标题末尾字符融进亮部（"交付" 几乎不可辨）。因此改成左侧重的渐变，
   保证标题与正文对比度，同时保留视频观感。属实现取舍，已登记在 handoffs/B.md。 */
.banner-scrim {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(8, 10, 14, 0.82) 0%, rgba(8, 10, 14, 0.6) 38%, rgba(8, 10, 14, 0.12) 72%, rgba(8, 10, 14, 0.3) 100%),
    linear-gradient(180deg, rgba(8, 10, 14, 0.55) 0%, rgba(8, 10, 14, 0) 24%);
}

.banner-wrap {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 22px;
  height: 100%;
  /* 内边距随视口收缩：英文主标是 nowrap，1440 下约 25.3em 宽，
     固定 120px 内边距会让 1025–1100 宽度下的第二行被 .banner 的 overflow 裁掉。 */
  padding: 0 clamp(48px, 8.3vw, 120px);
  color: #FFFFFF;
}
.banner-wrap h1 {
  margin: 0;
  font-size: clamp(26px, 3.1vw, 45px);
  line-height: 1.26;
  letter-spacing: -0.02em;
  color: #FFFFFF;
}
.banner-wrap h1 .hero-line { display: block; white-space: nowrap; }
/* 分组：组内 nowrap（西文不拆词），组与组之间允许换行（中文逐字换行）。 */
.banner-wrap h1 .grp { display: inline-block; white-space: nowrap; }
/* M-10：起始 opacity 0 / translateX(10px)，`.on` 后归位；时长 1s ease；空格 min-width 10px */
.banner-wrap h1 .char {
  display: inline-block;
  opacity: 0;
  transform: translateX(10px);
  transition: opacity 1s ease, transform 1s ease;
}
.banner-wrap h1 .char.space { min-width: 10px; }
.banner-wrap h1.on .char { opacity: 1; transform: translateX(0); }
.banner-desc {
  max-width: 620px;
  margin: 0;
  font-size: 16px;
  line-height: 1.85;
  color: rgba(255, 255, 255, 0.78);
}
.banner-actions { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 8px; }

.pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 13px 26px;
  border: 1px solid transparent;
  border-radius: 999px;
  background: var(--home-accent);
  color: #FFFFFF;
  font-size: 15px;
  text-decoration: none;
}
.pill.ghost { background: transparent; color: var(--home-ink); border-color: var(--home-line); }
.banner .pill.ghost { color: #FFFFFF; border-color: rgba(255, 255, 255, 0.5); }

/* ---- M-11 客户墙 + M-13 / M-24 / M-26 index1 ---- */
.index1 { padding: 120px 0; background: var(--home-bg); }
.index1 .wrap,
.index2 .wrap,
.index5 .wrap {
  width: 100%;
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 80px;
}

.headline { display: flex; align-items: center; gap: 24px; margin-bottom: 26px; }
.headline p { margin: 0; font-size: 15px; letter-spacing: 0.04em; color: var(--home-ink-soft); }
/* M-26：`.line` scaleX(0) → 1，2s ease，随父级 `.aos-animate` 触发 */
.headline .line {
  flex: 1;
  height: 1px;
  background: var(--home-line);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 2s ease;
}
.headline.aos-animate .line { transform: scaleX(1); }

/* M-13：`.public_text` 两个 `.p`，第一层实心（JS 逐帧写 clip-path），第二层 20% 幽灵层覆盖 */
.public_text { position: relative; }
.public_text .p:first-child { position: relative; z-index: 55; }
.public_text .p:not(:first-child) {
  position: absolute;
  top: 0;
  left: 0;
  color: var(--home-ghost);
  z-index: 5;
}
.public_text p { margin: 0; }
.title.public_text,
.blue.public_text {
  font-size: clamp(26px, 3.3vw, 50px);
  line-height: 1.3;
  letter-spacing: -0.02em;
}
.blue.public_text { color: var(--home-accent); }
.blue.public_text .p:not(:first-child) { color: rgba(24, 77, 196, 0.22); }
.public_text.sj_text { display: none; }

.index1 .text { max-width: 760px; margin-top: 36px; }
.index1 .text p { margin: 0 0 16px; font-size: 16px; line-height: 1.9; color: var(--home-ink-soft); }
.more {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
  padding-bottom: 6px;
  border-bottom: 1px solid var(--home-line);
  color: var(--home-ink);
  text-decoration: none;
}
.more p { margin: 0; font-size: 15px; color: inherit; }
.more-icon { font-size: 14px; }

.picture.wall-pc {
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  gap: 28px;
  margin-top: 64px;
}
.picture.wall-mobile { display: none; }
.picture .img { position: relative; height: 96px; overflow: hidden; }
.picture .swiper.slot { height: 100%; }
.picture .swiper-slide { display: flex; align-items: center; justify-content: center; }
.picture .swiper-slide img { display: block; width: auto; max-width: 100%; }

/* ---- M-12 / M-24 index2 双列 ---- */
.index2 { padding: 120px 0; background: var(--home-bg); }
.index2 .fist { display: flex; justify-content: space-between; align-items: flex-start; }
.index2 .fist + .fist { margin-top: 96px; }
.index2 .flex { width: 48%; display: grid; align-content: start; gap: 26px; will-change: transform; }
.index2 .title { display: grid; gap: 16px; justify-items: start; }
.index2 .item { padding: 22px 0; border-top: 1px solid var(--home-line); }
.index2 .item-name { margin: 0 0 8px; font-size: 22px; letter-spacing: -0.01em; }
.index2 .item-desc { margin: 0 0 12px; font-size: 15px; line-height: 1.8; color: var(--home-ink-soft); }
.index2 .item-link { font-size: 14px; color: var(--home-accent); text-decoration: none; }
.index2 .item-meta { margin: 0; font-size: 13px; letter-spacing: 0.06em; color: var(--home-ink-soft); }
/* 占位动图：`<img>` 内自动播放并循环；各自保持原始比例（参考站 index2 的图也是混比例）。
   来源与 SHA256 登记见 evidence/reference-assets/assets-manifest.json，上线前必须替换。 */
.index2 .item .img { display: block; margin: 0 0 16px; }
.index2 .item .img img { display: block; width: 100%; height: auto; }

/* ---- M-18 — M-23 index4 品牌宣言 ---- */
/* M-21：参考站用 JS 逐帧写 `translate` 把整屏钉住；原生滚动跑在合成线程，主线程 rAF 写 transform
   必然差一帧（实测滚轮每一步内容会先滑出 300px 再弹回）。这里改用 `position: sticky` 让合成线程
   自己钉屏，数值行程与参考站一致（sectionHeight - clientHeight = 7000px）。
   `overflow: clip` 不创建滚动容器，因此不会破坏 sticky。 */
.index4 { position: relative; height: 100vh; overflow: clip; background: #000000; }
.index4 .fix { position: sticky; top: 0; width: 100%; height: 100vh; overflow: clip; }
/* G-08：`.fix:after` 亮色 rgba(0,0,0,.3) / 暗色 rgba(0,0,0,.5) */
.index4 .fix::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 4;
  pointer-events: none;
  background: rgba(0, 0, 0, 0.3);
}
.index4 .bg {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 111.8%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  /* 本素材是公司 logo 墙实拍（2048×1536，画面接近纯白），按原始亮度白色宣言文字读不出来。
     统一压暗到 55% + 略降饱和：白字对比度实测见 handoffs/B.md §9.21。属素材驱动的偏离，
     不是参考站实测值（G-08 的 ::after 0.3 压暗层照旧）。 */
  filter: brightness(0.55) saturate(0.9);
}
/*
  M-19：参考站用未抓取到的 mask.svg（G-06）。这里用等效的 SVG data URI 复现实测几何：
  viewBox 1000×1000 + preserveAspectRatio:none ⇒ 下划线数值就是百分比 ×10。
  三条竖缝（中心缝实测 8.9px/1440 ≈ 0.6% 宽；左右缝位置 42.6% / 56.8%）。缝外的遮罩色取实测值 #201D1E。
*/
.index4 .mask {
  position: absolute;
  inset: 0;
  z-index: 3;
  background: var(--home-mask);
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201000%201000'%20preserveAspectRatio='none'%3E%3Cpath%20fill='%23000'%20fill-rule='evenodd'%20d='M0%200h1000v1000H0z%20M426%20478h6v172h-6z%20M497%20346h6v304h-6z%20M568%20478h6v172h-6z'/%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201000%201000'%20preserveAspectRatio='none'%3E%3Cpath%20fill='%23000'%20fill-rule='evenodd'%20d='M0%200h1000v1000H0z%20M426%20478h6v172h-6z%20M497%20346h6v304h-6z%20M568%20478h6v172h-6z'/%3E%3C/svg%3E");
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  transform: scale(1.05);
  animation: home-mask 10s cubic-bezier(0.79, 0.06, 0.33, 0.94) forwards;
  animation-play-state: paused;
}
@keyframes home-mask {
  from { transform: scale(1.05); }
  to { transform: scale(300); }
}
/* M-22 位置：在 `.fix` 内绝对居中；桌面 `white-space: nowrap` */
.index4 .text {
  position: absolute;
  left: 50%;
  /* SPEC M-22 实测位置是 57%；本素材的公司名字样正好在 37–60% 一带，文案压上去会叠字，
     因此整块下移到 76% 的干净墙面。属素材驱动的偏离，见 handoffs/B.md §9.21。 */
  top: 76%;
  z-index: 5;
  width: min(92%, 1180px);
  transform: translate(-50%, -50%);
  text-align: center;
  pointer-events: none;
  color: #FFFFFF;
}
.index4 .text p {
  margin: 0;
  font-size: clamp(26px, 3.4vw, 50px);
  line-height: 1.3;
  letter-spacing: -0.02em;
  color: #FFFFFF;
}
.index4 .statement-sub { display: block; margin-top: 18px; font-size: 16px; color: rgba(255, 255, 255, 0.72); }

/* ---- M-34 index5 项目与动态 + 咨询入口 ---- */
.index5 { padding: 120px 0; background: var(--home-bg); }
/* 桌面不初始化 Swiper（M-34 只在手机存在），因此桌面用栅格铺开 4 张卡片；
   手机由 Swiper 接管（它写内联宽度与 transform，会覆盖这里的规则）。 */
@media (min-width: 1025px) {
  .insights-swiper { overflow: visible; padding-bottom: 0; }
  .insights-swiper .swiper-wrapper { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 24px; }
  .insights-swiper .swiper-slide { width: auto; }
  .insights-swiper .swiper-pagination { display: none; }
}
.insights-title { margin: 0 0 40px; font-size: clamp(24px, 2.9vw, 42px); letter-spacing: -0.02em; }
.insights-swiper { position: relative; overflow: hidden; padding-bottom: 44px; }
.insights-swiper .swiper-slide { height: auto; }
.insights-swiper .card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
  padding: 28px;
  border-radius: 6px;
  background: var(--home-card);
}
.card-img { display: block; margin: -28px -28px 0; border-radius: 6px 6px 0 0; overflow: hidden; }
.card-img img { display: block; width: 100%; height: auto; }
.card-kicker {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin: 0;
  font-size: 12px;
  letter-spacing: 0.1em;
  color: var(--home-ink-soft);
}
.card-flag { color: var(--home-accent); letter-spacing: 0; }
.card-title { margin: 0; font-size: 20px; line-height: 1.4; }
.card-desc { margin: 0; font-size: 15px; line-height: 1.8; color: var(--home-ink-soft); }
.card-link { margin-top: auto; font-size: 14px; color: var(--home-accent); text-decoration: none; }
.insights-swiper .swiper-pagination-bullet { background: var(--home-ink-soft); opacity: 0.4; }
.insights-swiper .swiper-pagination-bullet-active { background: var(--home-accent); opacity: 1; }

.cta { margin-top: 96px; padding: 72px 64px; border-radius: 8px; background: var(--home-cta-bg); }
.cta .eyebrow { color: rgba(255, 255, 255, 0.72); }
.cta-title { margin: 0 0 28px; font-size: clamp(24px, 2.8vw, 40px); line-height: 1.3; letter-spacing: -0.02em; color: #FFFFFF; }
.cta-actions { display: flex; flex-wrap: wrap; gap: 16px; }
.cta .pill { background: #FFFFFF; color: var(--home-cta-bg); }
.cta .pill.ghost { background: transparent; color: #FFFFFF; border-color: rgba(255, 255, 255, 0.5); }
.cta-contact { margin: 26px 0 0; font-size: 14px; color: rgba(255, 255, 255, 0.82); }

/* ---- 暗色补充（G-08 未实测，实现建议）：Logo 反相 + index4 遮罩加深 ---- */
html[data-theme='dark'] .picture .swiper-slide img { filter: invert(1); }
html[data-theme='dark'] .index4 .fix::after { background: rgba(0, 0, 0, 0.5); }

/* ==========================================================================
   ≤1024px 降级（SPEC「断点速查」）。与本项目不变量不同的一处已在 handoffs/B.md 登记：
   参考站 `.index4` 手机用 `.sj_bg` 专用图（素材未抓取），本项目沿用同一张 `.bg` 静态铺底。
   ========================================================================== */
@media (max-width: 1024px) {
  .banner { height: 72vh; min-height: 420px; }
  /* 全局 styles/responsive.css:184 在 ≤768px 写了 `img, video, iframe { height: auto !important }`，
     会把首屏视频退回内在比例高度：390 宽实测只有 195px 高，banner 其余部分露出 #111 底。
     这里只对本页自己的两个 video 收回该声明（特异性高于全局选择器）；已请 A 收窄全局规则。 */
  .banner .back { height: 100% !important; }
  .banner-wrap { gap: 16px; padding: 0 5%; }
  .banner-wrap h1 { font-size: 24px; }
  .banner-wrap h1 .hero-line { white-space: normal; }
  .banner-desc { font-size: 14px; }

  .index1, .index2, .index5 { padding: 72px 0; }
  .index1 .wrap, .index2 .wrap, .index5 .wrap { padding: 0 5%; }

  /* M-13 手机降级：`.public_text` 不擦除，整段改用 `.sj_text` */
  .public_text { display: none; }
  .public_text.sj_text { display: block; font-size: 24px; line-height: 1.45; letter-spacing: -0.02em; }
  .headline { gap: 14px; }
  .headline p { font-size: 13px; }

  .picture.wall-pc { display: none; }
  .picture.wall-mobile {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 20px;
    margin-top: 40px;
  }
  .picture .img { height: 66px; }

  .index2 .fist { flex-wrap: wrap; gap: 24px 0; }
  .index2 .flex { width: 48%; }
  .index2 .fist + .fist { margin-top: 56px; }
  .index2 .item-name { font-size: 18px; }

  /* M-18 — M-23 手机降级 */
  .index4 { height: auto !important; overflow: visible; }
  .index4 .fix { position: static; height: auto; transform: none !important; }
  .index4 .mask { display: none; }
  .index4 .bg { position: relative; height: 440px; transform: none !important; }
  /* M-22 手机降级：参考站是 `.sj_jump { position:absolute; top:55px }`，但本页手机端复用同一张桌面照片，
     照片带内 33–49% 是「北京耘栈科技有限公司」字样、55–58% 是英文名，top:55px 会把宣言压在名字上。
     改为贴住照片带底部：440px 带内文案落在 y292–418，即下半部干净墙面（与桌面 76% 同思路）。
     `z-index:5` 是为复刻桌面的层序（文案 5 > G-08 压暗层 4 > mask 3 > bg 1）——手机端 .bg 是
     position:relative 且从桌面规则残留 z-index:1，.sj_jump 原本 z-index:auto，文案被照片整块盖住
     （实测 390 端完全不可见）。放 5 而不是只把 bg 改 auto，是为了同时避开 .fix::after 的 0.3 压暗层，
     否则白字会被再压一层、对比度掉到 2.85:1。 */
  .index4 .sj_jump { position: absolute; bottom: 22px; left: 50%; width: 100%; transform: translateX(-50%); z-index: 5; }
  .index4 .text { position: static; width: 100%; transform: none !important; }
  .index4 .text p { font-size: 22px; opacity: 1 !important; transform: none !important; }
  .index4 .text > div { opacity: 1 !important; }
  .index4 .statement-sub { font-size: 14px; }

  .insights-title { margin-bottom: 24px; }
  .insights-swiper .card { padding: 20px; }
  .cta { margin-top: 56px; padding: 44px 24px; }
  .cta-actions .pill { width: 100%; justify-content: center; }
}

/* ==========================================================================
   prefers-reduced-motion：全部降级为静态可见（AC07b）。
   滚动驱动的那几条由 useHomeScroll 直接短路，这里只兜住 CSS 动画与过渡。
   ========================================================================== */
@media (prefers-reduced-motion: reduce) {
  .home [data-aos] { opacity: 1; transform: none; transition: none; }
  .banner-wrap h1 .char { opacity: 1; transform: none; transition: none; }
  .headline .line { transform: scaleX(1); transition: none; }
  .public_text .p:first-child p { clip-path: none !important; }
  .banner .parallax { transform: none !important; }
  .index2 .flex { transform: none !important; }
  .index4 { height: auto !important; overflow: visible; }
  .index4 .fix { position: static; height: auto; min-height: 480px; transform: none !important; }
  .index4 .mask { display: none; }
  .index4 .bg { position: absolute; inset: 0; height: 100%; transform: none !important; }
  .index4 .sj_jump { position: relative; z-index: 5; padding: 96px 0; }
  .index4 .text { position: static; width: 100%; padding: 24px 0; transform: none !important; }
  .index4 .text > div,
  .index4 .text p { opacity: 1 !important; transform: none !important; }
}
</style>

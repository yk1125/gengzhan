<template>
  <div ref="root" class="news-page" :style="motionStyle">
    <section ref="heroStage" class="news-hero" aria-labelledby="news-title">
      <div class="news-shell news-hero__wrap">
        <div class="news-hero__title" data-news-reveal>
          <p class="news-eyebrow">YUNZHAN INSIGHTS</p>
          <h1 id="news-title">行业资讯</h1>
          <p class="news-hero__lead">专注软件研发，让技术服务于真实业务。</p>
        </div>
      </div>
      <div class="news-hero__parallax"><img class="news-hero__photo" src="/assets/home/statement-bg.jpg" alt="北京耘栈科技有限公司办公室品牌墙实拍" width="2048" height="1536"></div>
    </section>

    <section id="news-feature" ref="featureStage" class="news-feature" aria-labelledby="feature-title">
      <div class="news-shell news-feature__inner">
        <div class="news-feature__copy" data-news-reveal>
          <p class="news-eyebrow">01 / FEATURED</p>
          <h2 id="feature-title">把模型能力放进真实业务，而不是停在演示里。</h2>
          <p>可验收的场景、清晰的数据边界和可持续的工程，决定 AI 能否真正落地。</p>
          <button type="button" class="news-feature__link" :disabled="!newsItems.length" @click="openItem(newsItems[0])">阅读文章 <ArrowRight aria-hidden="true" /></button>
        </div>
        <div class="news-feature__media" data-news-reveal><img src="/assets/services/ai-media.jpg" alt="AI 应用开发演示图片" loading="lazy"></div>
      </div>
    </section>

    <section ref="listStage" class="news-shell news-list-section" aria-labelledby="list-title">
      <div class="news-section-heading news-wide-heading" data-news-reveal>
        <p class="news-eyebrow">02 / ALL UPDATES</p>
        <h2 id="list-title">耘栈动态<br><em>&amp; 日常</em></h2>
        <p class="news-note">从设计、工程到业务实践，分享那些值得被反复讨论的细节。</p>
      </div>
      <p v-if="loading" class="news-state">资讯加载中...</p>
      <div v-else-if="loadFailed" class="news-state">
        <p>资讯暂时无法加载，请稍后重试。</p>
        <button type="button" @click="loadNews">重新加载</button>
      </div>
      <p v-else-if="!newsItems.length" class="news-state">暂无资讯</p>
      <div v-else class="news-grid public_hover">
        <article v-for="(item, index) in visibleNewsItems" :key="item.id" class="news-card item" data-cursor-cut data-news-reveal @click="openItem(item)">
          <div class="news-card__image img"><img :src="item.image" :alt="item.title" loading="lazy"></div>
          <div class="news-card__copy"><div class="news-card__label">{{ item.category }}</div><h3>{{ item.title }}</h3><p>{{ item.excerpt }}</p><div class="news-card__end"><time :datetime="item.date">{{ item.date }}</time><span>查看详情 <b>↗</b></span></div></div>
          <span class="news-card__index">{{ String((currentPage - 1) * pageSize + index + 1).padStart(2, '0') }}</span>
        </article>
      </div>
      <nav v-if="newsItems.length > pageSize" class="news-pagination" aria-label="资讯分页">
        <button type="button" aria-label="上一页" :disabled="currentPage === 1" @click="goPage(currentPage - 1)">←</button>
        <button v-for="page in pageCount" :key="page" type="button" :class="{ active: page === currentPage }" :aria-current="page === currentPage ? 'page' : undefined" @click="goPage(page)">{{ page }}</button>
        <button type="button" aria-label="下一页" :disabled="currentPage === pageCount" @click="goPage(currentPage + 1)">→</button>
      </nav>
    </section>

    <section class="news-cta" aria-labelledby="news-cta-title">
      <div class="news-shell news-cta__inner" data-news-reveal>
        <div>
          <p class="news-eyebrow">与耘栈合作</p>
          <h2 id="news-cta-title">下一步，<br>聊聊你的业务。</h2>
          <p>从一个问题、一项需求，或一个正在酝酿的想法开始。</p>
        </div>
        <router-link class="news-cta__link hover_button" to="/ai-consultation">
          <span>开始沟通</span><TopRight aria-hidden="true" />
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { ArrowRight, TopRight } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { getNews } from '@/api'

const router = useRouter()
const route = useRoute()
const root = ref(null)
const heroStage = ref(null)
const featureStage = ref(null)
const listStage = ref(null)
const reducedMotion = ref(false)
const currentPage = ref(1)
const loading = ref(false)
const loadFailed = ref(false)
const pageSize = 6
const motionStyle = computed(() => ({ '--news-hero-progress': `${heroProgress.value}px` }))
const heroProgress = ref(0)
let observer
let raf = 0

const mockNewsItems = [
  { id: 1, category: 'AI 技术', title: 'AI 赋能软件开发：趋势与实践', excerpt: '把模型能力放进真实业务流程，让智能工具真正服务于产品与工程。', date: '2025-03-15', image: '/assets/services/ai-media.jpg' },
  { id: 2, category: '小程序', title: '小程序云开发：新一代开发模式', excerpt: '从云函数到数据管理，梳理轻量应用快速落地的工程方法。', date: '2025-03-12', image: '/assets/services/mini-media.jpg' },
  { id: 3, category: 'Web 开发', title: 'React 19 新特性详解与实践', excerpt: '围绕现代前端架构，理解组件、数据流与体验性能的新变化。', date: '2025-03-10', image: '/assets/services/web-media.jpg' },
  { id: 4, category: '移动开发', title: 'Flutter 3.x 跨平台开发实战', excerpt: '在交付效率与原生体验之间，建立可持续演进的移动端方案。', date: '2025-03-08', image: '/assets/services/app-media.jpg' },
  { id: 5, category: 'AI 技术', title: '大语言模型应用开发入门', excerpt: '从提示词、数据安全到成本控制，拆解 AI 应用的关键环节。', date: '2025-03-05', image: '/assets/cases/c61e07c88f465c23dfbdb6ccf8411064.webp' },
  { id: 6, category: 'Web 开发', title: 'Next.js 14 App Router 最佳实践', excerpt: '以路由、渲染和缓存策略为线索，理解现代 Web 应用的工程选择。', date: '2025-03-03', image: '/assets/services/custom-media.jpg' },
  { id: 7, category: '产品设计', title: '从需求梳理到可交付原型', excerpt: '让设计成为沟通业务目标、用户体验与工程边界的共同语言。', date: '2025-02-26', image: '/assets/services/custom-media.jpg' },
  { id: 8, category: '工程实践', title: '前端性能优化的几个关键取舍', excerpt: '从首屏加载、资源拆分到交互反馈，建立可量化的体验指标。', date: '2025-02-21', image: '/assets/services/web-media.jpg' },
  { id: 9, category: '小程序', title: '轻量应用如何保持长期可维护', excerpt: '围绕组件复用、数据边界与发布流程，减少产品持续迭代的成本。', date: '2025-02-18', image: '/assets/services/mini-media.jpg' },
  { id: 10, category: 'AI 技术', title: '企业知识库的落地路径', excerpt: '从资料整理、权限控制到检索体验，逐步搭建可靠的知识服务。', date: '2025-02-12', image: '/assets/services/ai-media.jpg' },
  { id: 11, category: '移动开发', title: '跨端产品的体验一致性', excerpt: '在不同设备与系统之间，找到效率、稳定性和原生感的平衡。', date: '2025-02-08', image: '/assets/services/app-media.jpg' },
  { id: 12, category: 'Web 开发', title: '内容型网站的信息架构', excerpt: '好的内容组织让用户更快找到答案，也让团队更容易持续更新。', date: '2025-02-03', image: '/assets/services/web-media.jpg' },
  { id: 13, category: '工程实践', title: '把复杂流程变成清晰的产品体验', excerpt: '用可理解的界面和稳定的流程，帮助团队减少重复沟通与操作成本。', date: '2025-01-28', image: '/assets/services/custom-media.jpg' },
  { id: 14, category: '产品设计', title: '从用户反馈中找到产品机会', excerpt: '将零散的使用反馈整理成可验证的假设，再回到真实场景快速迭代。', date: '2025-01-22', image: '/assets/services/mini-media.jpg' },
  { id: 15, category: 'AI 技术', title: '智能功能的边界与责任', excerpt: '在效率提升之外，仍然要把数据安全、可解释性和人工判断放在首位。', date: '2025-01-17', image: '/assets/services/ai-media.jpg' },
  { id: 16, category: '移动开发', title: '从原型到上线的协作节奏', excerpt: '设计、研发与业务保持同一张进度表，才能让每一次发布都更稳。', date: '2025-01-10', image: '/assets/services/app-media.jpg' },
  { id: 17, category: 'Web 开发', title: '组件化如何服务于业务增长', excerpt: '复用不是目的，持续交付稳定体验、降低维护成本才是组件化的价值。', date: '2025-01-06', image: '/assets/services/web-media.jpg' },
  { id: 18, category: '工程实践', title: '一次交付之后，如何继续优化', excerpt: '上线只是开始，通过数据、反馈与复盘让产品在真实环境中持续变好。', date: '2024-12-28', image: '/assets/cases/c61e07c88f465c23dfbdb6ccf8411064.webp' },
  { id: 19, category: '产品设计', title: '从信息噪声中提炼产品重点', excerpt: '优先级不是删减需求，而是让团队把注意力放到最重要的用户价值上。', date: '2024-12-20', image: '/assets/services/custom-media.jpg' },
  { id: 20, category: '工程实践', title: '让发布流程变得更可靠', excerpt: '清晰的检查清单和自动化反馈，让每次上线都更接近预期结果。', date: '2024-12-14', image: '/assets/services/web-media.jpg' },
  { id: 21, category: '小程序', title: '小程序体验的细节打磨', excerpt: '从加载状态、空页面到异常反馈，小细节决定轻量应用的使用感受。', date: '2024-12-08', image: '/assets/services/mini-media.jpg' },
  { id: 22, category: 'AI 技术', title: '从实验到稳定的智能能力', excerpt: '把一次成功的模型调用变成可监控、可复盘、可持续演进的产品能力。', date: '2024-12-02', image: '/assets/services/ai-media.jpg' },
  { id: 23, category: '移动开发', title: '移动端交互的连续反馈', excerpt: '让每一步操作都有清晰回应，用户才能放心完成复杂任务。', date: '2024-11-26', image: '/assets/services/app-media.jpg' },
  { id: 24, category: 'Web 开发', title: '响应式布局的真实边界', excerpt: '从设计稿到不同屏幕尺寸，稳定布局需要规则，也需要对内容负责。', date: '2024-11-20', image: '/assets/services/web-media.jpg' },
  { id: 25, category: '工程实践', title: '一次复盘如何变成团队资产', excerpt: '记录背景、判断和结果，让经验从个人记忆变成可复用的方法。', date: '2024-11-14', image: '/assets/cases/c61e07c88f465c23dfbdb6ccf8411064.webp' },
  { id: 26, category: '产品设计', title: '好的页面如何帮助决策', excerpt: '信息层级、节奏和交互反馈共同构成理解产品的路径。', date: '2024-11-08', image: '/assets/services/custom-media.jpg' },
  { id: 27, category: 'AI 技术', title: '把数据边界放在设计之前', excerpt: '智能产品从一开始就要明确什么可以被使用，什么必须被保护。', date: '2024-11-02', image: '/assets/services/ai-media.jpg' },
  { id: 28, category: '小程序', title: '轻量产品也需要长期主义', excerpt: '小规模上线不代表低标准，稳定维护才是产品价值的延续。', date: '2024-10-26', image: '/assets/services/mini-media.jpg' },
  { id: 29, category: '移动开发', title: '用统一规范减少重复沟通', excerpt: '跨团队协作有了共同语言，复杂产品也能保持清晰的推进节奏。', date: '2024-10-20', image: '/assets/services/app-media.jpg' },
  { id: 30, category: 'Web 开发', title: '网站上线后的持续观察', excerpt: '真实访问带来的反馈，是下一轮优化最值得信任的依据。', date: '2024-10-14', image: '/assets/services/web-media.jpg' }
]

const newsItems = ref([])
const pageCount = computed(() => Math.max(1, Math.ceil(newsItems.value.length / pageSize)))
const visibleNewsItems = computed(() => newsItems.value.slice((currentPage.value - 1) * pageSize, currentPage.value * pageSize))
const isNewsMockPreview = () => import.meta.env.MODE === 'mock-preview' && import.meta.env.VITE_ENABLE_MOCK === 'true' && String(import.meta.env.VITE_MOCK_RESOURCES || '').split(',').map((item) => item.trim()).includes('news')

function normalizeNewsItem (item, index) {
  return {
    id: item.id ?? `api-${index + 1}`,
    category: item.categoryLabel || item.category || '资讯',
    title: item.title || `资讯 ${index + 1}`,
    excerpt: item.summary || item.excerpt || '',
    date: item.publishedAt || item.publishTime || item.date || '',
    image: item.cover?.src || item.coverImage || item.image || '/assets/services/custom-media.jpg'
  }
}

async function loadNews () {
  loading.value = true
  loadFailed.value = false
  try {
    const response = await getNews({ page: 1, size: 100 }, { silent: true })
    const records = response.data?.records || response.data?.list || (Array.isArray(response.data) ? response.data : [])
    newsItems.value = records.map(normalizeNewsItem)
  } catch (error) {
    // BACKEND-TODO(B01/B02): verify the production content list and pagination/category semantics.
    // Fixtures are intentionally available only in the explicit mock-preview mode.
    const useMock = isNewsMockPreview()
    newsItems.value = useMock ? mockNewsItems : []
    loadFailed.value = !useMock
  } finally {
    loading.value = false
  }
}

function openItem (item) { if (item?.id != null) router.push({ name: route.path.startsWith('/en/') ? 'NewsDetailEn' : 'NewsDetail', params: { id: item.id } }) }
function goPage (page) {
  if (page < 1 || page > pageCount.value || page === currentPage.value) return
  currentPage.value = page
  nextTick(() => {
    const cards = root.value?.querySelectorAll('.news-card[data-news-reveal]')
    if (reducedMotion.value || !observer) cards?.forEach(card => card.classList.add('is-visible'))
    else cards?.forEach(card => observer.observe(card))
  })
  listStage.value?.scrollIntoView({ behavior: reducedMotion.value ? 'auto' : 'smooth', block: 'start' })
}
function schedule () { if (!raf) raf = window.requestAnimationFrame(updateMotion) }
function updateMotion () {
  raf = 0
  if (!heroStage.value || reducedMotion.value) return
  const rect = heroStage.value.getBoundingClientRect()
  heroProgress.value = Math.max(0, Math.min(window.innerHeight * .55, -rect.top * .45))
}

onMounted(() => {
  loadNews()
  reducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!reducedMotion.value && 'IntersectionObserver' in window) {
    observer = new IntersectionObserver(entries => entries.forEach(({ target, isIntersecting }) => { target.classList.toggle('is-visible', isIntersecting) }), { threshold: .12, rootMargin: '-8% 0px -8% 0px' })
    root.value?.querySelectorAll('[data-news-reveal]').forEach(el => observer.observe(el))
    window.addEventListener('scroll', schedule, { passive: true })
    schedule()
  } else root.value?.querySelectorAll('[data-news-reveal]').forEach(el => el.classList.add('is-visible'))
})
onBeforeUnmount(() => { observer?.disconnect(); window.removeEventListener('scroll', schedule); if (raf) window.cancelAnimationFrame(raf) })
</script>

<style scoped>
.news-page{--news-accent:#184dc4;background:var(--color-bg);color:var(--color-ink);letter-spacing:0}.news-shell{width:min(90%,1440px);margin-inline:auto}.news-page :where(h1,h2,h3,p){margin:0}.news-page h1,.news-page h2,.news-page h3{font-weight:500;letter-spacing:0}.news-page a{color:inherit;text-decoration:none}.news-page button{font:inherit;cursor:pointer}.news-page :is(a,button):focus-visible{outline:3px solid var(--color-accent);outline-offset:6px}.news-eyebrow{font-size:12px;line-height:1.5;font-weight:500}.news-hero{position:relative;background:var(--color-bg);padding:180px 0 0;overflow:hidden}.news-hero__wrap{position:relative;z-index:1}.news-hero__title{max-width:900px}.news-hero__title h1{margin-top:20px;font-size:clamp(54px,8vw,120px);line-height:.98}.news-hero__lead{margin-top:24px;max-width:560px;font-size:20px;line-height:1.7}.news-hero__parallax{height:min(37.2vw,536px);min-height:360px;margin-top:74px;overflow:hidden}.news-hero__photo{position:relative;top:-64%;display:block;width:100%;height:280%;object-fit:cover;object-position:center 38%;transform:translate3d(0,var(--news-hero-progress),0);will-change:transform}.news-explore{display:flex;min-height:48px;gap:32px;align-items:center;border-bottom:1px solid var(--color-line);font-size:13px;white-space:nowrap}.news-explore svg,.news-feature__link svg,.news-cta__link svg{transition:transform .35s ease}.news-explore:hover svg,.news-feature__link:hover svg{transform:translateY(5px)}.news-cta__link:hover svg{transform:rotate(45deg)}.news-section-heading h2{margin-top:24px;font-size:44px;line-height:1.4;text-wrap:balance}.news-section-heading em{color:var(--color-ink-soft);font-style:normal}.news-note{margin-top:24px;color:var(--color-ink-soft);font-size:14px;line-height:1.8}.news-feature{background:var(--color-surface-soft);padding-block:120px;scroll-margin-top:110px}.news-feature__inner{display:grid;grid-template-columns:.9fr 1.1fr;gap:9%;align-items:center}.news-feature__copy h2{margin-top:24px;font-size:clamp(42px,5vw,76px);line-height:1.12}.news-feature__copy>p:not(.news-eyebrow){max-width:480px;margin-top:26px;color:var(--color-ink-body);line-height:1.9}.news-feature__link{display:flex;align-items:center;gap:32px;margin-top:42px;padding:10px 4px;border:0;border-bottom:1px solid var(--color-line);background:none}.news-feature__media{height:min(55vw,620px);overflow:hidden}.news-feature__media img{width:100%;height:100%;object-fit:cover}.news-list-section{display:block;padding-block:140px}.news-wide-heading{max-width:900px;margin-bottom:64px}.news-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:56px 4.8%;border-top:1px solid var(--color-line)}.news-card{position:relative;cursor:pointer;border-bottom:1px solid var(--color-line)}.news-card__image{height:220px;overflow:hidden;background:var(--color-surface-soft)}.news-card__image img{width:100%;height:100%;object-fit:cover;transition:transform .8s ease}.news-card__copy{min-height:265px;padding:16px 18px 22px}.news-card__label{margin-bottom:20px;color:var(--color-ink-soft);font-size:14px}.news-card h3{height:58px;margin-bottom:23px;overflow:hidden;display:-webkit-box;font-size:21px;line-height:29px;-webkit-box-orient:vertical;-webkit-line-clamp:2;transition:color .35s ease}.news-card__copy>p{height:80px;margin:0;padding-top:21px;overflow:hidden;border-top:1px solid var(--color-line);color:var(--color-ink-body);font-size:14px;line-height:29px;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}.news-card__end{display:flex;justify-content:space-between;align-items:center;margin-top:25px;color:var(--color-ink-soft);font-size:12px}.news-card__end span{color:var(--news-accent);font-weight:700}.news-card__end b{margin-left:8px;color:#ff770f;font-size:17px}.news-card__index{position:absolute;top:14px;left:16px;color:rgba(255,255,255,.8);font-size:11px}.news-card:hover{border-color:var(--color-line) !important;box-shadow:none !important;transform:none !important;filter:none !important}.news-card:hover .news-card__image img{transform:scale(1.06)}.news-card:hover h3{color:var(--news-accent)}.news-pagination{display:flex;justify-content:center;gap:10px;margin-top:92px}.news-pagination button{width:40px;height:40px;border:1px solid var(--color-line);border-radius:50%;background:transparent;color:var(--color-ink-body)}.news-pagination button.active{border-color:var(--news-accent);background:var(--news-accent);color:#fff}.news-pagination button:disabled{opacity:.35}.news-cta{background:var(--color-accent);color:var(--color-on-accent);padding-block:84px}.news-cta__inner{display:flex;justify-content:space-between;align-items:center;gap:64px}.news-cta h2{margin-top:22px;font-size:42px;line-height:1.4;white-space:pre-line}.news-cta p:last-child{margin-top:20px;font-size:15px;line-height:1.8}.news-cta__link{display:flex;align-items:center;gap:32px;flex-shrink:0;min-height:60px;padding:10px 4px;border-bottom:1px solid currentColor}.news-cta__link span{white-space:nowrap}.news-cta__link svg{width:24px;height:24px;flex:0 0 auto}.news-cta .news-cta__link:focus-visible{outline-color:currentColor}.news-page [data-news-reveal]{opacity:0;transform:translateY(50px);transition:opacity .9s cubic-bezier(.175,.885,.32,1.275),transform .9s cubic-bezier(.175,.885,.32,1.275)}.news-page [data-news-reveal].is-visible{opacity:1;transform:translateY(0)}.news-card:nth-child(2){transition-delay:80ms}.news-card:nth-child(3){transition-delay:160ms}.news-card:nth-child(4){transition-delay:80ms}.news-card:nth-child(5){transition-delay:160ms}.news-card:nth-child(6){transition-delay:240ms}
@media(max-width:1024px){.news-hero{padding-top:132px}.news-hero__title h1{font-size:48px}.news-hero__parallax{height:360px;min-height:0;margin-top:48px}.news-hero__photo{top:-20%;height:160%}.news-section-heading h2{font-size:34px}.news-feature__inner{gap:5%}.news-feature__copy h2{font-size:40px}.news-grid{grid-template-columns:repeat(2,1fr);gap:30px 3%}.news-cta h2{font-size:34px}}
@media(max-width:600px){.news-hero{padding:104px 0 0}.news-hero__title h1{font-size:36px}.news-hero__lead{font-size:14px;margin-top:12px}.news-hero__parallax{height:310px;margin-top:40px}.news-hero__photo{top:-19%;height:150%;transform:none}.news-feature__inner{grid-template-columns:1fr;gap:36px}.news-section-heading h2{font-size:30px;margin-top:18px}.news-feature{padding-block:64px}.news-feature__copy h2{font-size:40px}.news-feature__media{height:280px}.news-list-section{padding-block:80px}.news-wide-heading{margin-bottom:36px}.news-grid{display:block}.news-card{margin-bottom:36px}.news-card__image{height:auto;aspect-ratio:16/10}.news-card__copy{min-height:0}.news-cta{padding-block:56px}.news-cta__inner{display:block}.news-cta h2{font-size:30px}.news-cta__link{justify-content:space-between;margin-top:30px}.news-page [data-news-reveal]{transition-duration:.65s}}
.news-hero { padding-bottom: 0; }
.news-page .news-card:hover {
  border-color: var(--color-line) !important;
  box-shadow: none !important;
  transform: none !important;
  filter: none !important;
}
.news-cta__link span { white-space: nowrap; }
.news-cta__link svg { width: 24px; height: 24px; flex: 0 0 auto; }
.news-state { min-height: 180px; padding: 56px 0; color: var(--color-ink-soft); text-align: center; }
.news-state button { margin-top: 18px; padding: 10px 18px; border: 1px solid var(--color-line); background: transparent; color: var(--color-ink); }
@media (max-width: 600px) {
  .news-hero { padding-bottom: 0; }
}
</style>

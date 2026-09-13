<template>
  <main class="work-page">
    <header class="work-hero shell">
      <div class="eyebrow">SELECTED WORK / 2026</div>
      <h1>以作品，回应<br><em>真实业务。</em></h1>
      <p>从品牌官网、移动产品到企业数字系统，我们把复杂问题转化为清晰、可靠的产品体验。</p>
    </header>
    <nav class="work-filter shell" aria-label="案例分类">
      <button v-for="cat in categories" :key="cat.id" :class="{ active: activeCategory === cat.id }" @click="activeCategory = cat.id">{{ cat.name }}<sup>{{ categoryCount(cat.id) }}</sup></button>
    </nav>
    <section class="work-list shell">
      <article v-for="(item, index) in filteredCases" :key="item.id" class="work-item" @click="$router.push(`/cases/${item.id}`)">
        <div class="work-media" :class="{ fallback: !getCaseImage(item) }">
          <img v-if="getCaseImage(item)" :src="getCaseImage(item)" :alt="item.title" />
          <span v-else>YUNZHAN / PROJECT {{ String(index + 1).padStart(2, '0') }}</span>
          <div class="work-index">{{ String(index + 1).padStart(2, '0') }}</div>
        </div>
        <div class="work-copy">
          <div><span>{{ categoryDisplay(item.category) }}</span><span>{{ item.date }}</span></div>
          <h2>{{ item.title }}</h2><p>{{ item.description }}</p><b aria-hidden="true">↗</b>
        </div>
      </article>
      <div v-if="!loading && !filteredCases.length" class="work-empty">
        <span>PROJECT ARCHIVE</span><h2>好作品，从一次坦诚的沟通开始。</h2>
        <p>告诉我们您的行业、目标与现状，我们将给出匹配的产品方向和实施建议。</p>
        <router-link to="/ai-consultation">提交项目需求 ↗</router-link>
      </div>
    </section>
    <section class="work-cta"><div class="shell"><span>START A PROJECT</span><h2>下一个出色的项目，<br>也许属于我们。</h2><router-link to="/ai-consultation">开始沟通 ↗</router-link></div></section>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getCases } from '@/api'
const activeCategory = ref('all')
const loading = ref(false)
const categories = [{ id:'all',name:'全部项目' },{ id:'ai',name:'AI 开发' },{ id:'miniprogram',name:'小程序' },{ id:'app',name:'App' },{ id:'web',name:'网站建设' }]
const cases = ref([])
const filteredCases = computed(() => activeCategory.value === 'all' ? cases.value : cases.value.filter(item => String(item.type || '').toLowerCase() === activeCategory.value))
const categoryCount = id => id === 'all' ? cases.value.length : cases.value.filter(item => String(item.type || '').toLowerCase() === id).length
const getCaseImage = item => {
  if (!item) return ''
  if (item.coverImage || item.image) return item.coverImage || item.image
  if (!item.images) return ''
  try { const data = typeof item.images === 'string' ? JSON.parse(item.images) : item.images; return Array.isArray(data) ? data[0] || '' : '' }
  catch { return String(item.images).split(',')[0]?.trim() || '' }
}
const categoryDisplay = value => ({ MINIPROGRAM:'小程序开发',APP:'App 开发',WEB:'网站建设',AI:'AI 开发',SYSTEM:'系统开发',BRAND:'品牌设计' }[String(value || '').toUpperCase()] || '数字产品')
const loadCases = async () => { loading.value = true; try { const response = await getCases({ page:1,size:100 }, { silent:true }); cases.value = response.data?.records || [] } catch (error) { console.error('加载案例失败:', error) } finally { loading.value = false } }
onMounted(loadCases)
</script>

<style scoped>
.work-page{--orange:#f06a21;background:#fff;color:#111}.shell{width:min(calc(100% - 80px),1240px);margin:auto}.work-hero{padding:210px 0 110px}.eyebrow,.work-cta span{color:var(--orange);font-size:10px;font-weight:800;letter-spacing:.2em}.work-hero h1{margin:30px 0 45px;font-size:clamp(64px,8vw,116px);line-height:.92;letter-spacing:-.06em;font-weight:650}.work-hero h1 em{font-style:normal;color:#aaa}.work-hero p{max-width:590px;margin-left:auto;color:#666;font-size:16px;line-height:1.9}.work-filter{display:flex;border-top:1px solid #bbb;border-bottom:1px solid #bbb;overflow:auto}.work-filter button{flex:none;padding:23px 34px 21px 0;margin-right:34px;border:0;background:none;color:#888;font-weight:700;cursor:pointer;white-space:nowrap}.work-filter button.active{color:#111}.work-filter sup{margin-left:7px;color:var(--orange);font-size:9px}.work-list{padding:80px 0 140px}.work-item{display:grid;grid-template-columns:1.7fr 1fr;gap:55px;padding:0 0 70px;margin-bottom:70px;border-bottom:1px solid #ccc;cursor:pointer}.work-item:nth-child(even){grid-template-columns:1fr 1.7fr}.work-item:nth-child(even) .work-media{order:2}.work-media{height:520px;position:relative;overflow:hidden;background:#181818}.work-media img{width:100%;height:100%;object-fit:cover;filter:saturate(.75);transition:.6s}.work-item:hover img{transform:scale(1.025)}.work-media.fallback{display:flex;align-items:center;justify-content:center;color:#666;font-size:11px;letter-spacing:.2em}.work-index{position:absolute;left:18px;top:16px;color:#fff;font-size:11px}.work-copy{position:relative;padding-top:12px}.work-copy>div{display:flex;justify-content:space-between;color:#888;font-size:10px;letter-spacing:.12em}.work-copy h2{margin:70px 0 18px;font-size:clamp(32px,3.2vw,48px);line-height:1.15;letter-spacing:-.04em}.work-copy p{color:#777;line-height:1.8}.work-copy b{position:absolute;right:0;bottom:8px;color:var(--orange);font-size:24px}.work-empty{padding:80px 0 40px;max-width:850px}.work-empty span{color:var(--orange);font-size:10px;letter-spacing:.2em}.work-empty h2{margin:25px 0;font-size:clamp(42px,6vw,76px);line-height:1.08;letter-spacing:-.05em}.work-empty p{max-width:600px;color:#777;line-height:1.8}.work-empty a,.work-cta a{display:inline-block;margin-top:30px;padding-bottom:7px;border-bottom:1px solid currentColor;color:inherit;font-weight:700}.work-cta{padding:115px 0;background:var(--orange)}.work-cta span{color:#111}.work-cta h2{margin:25px 0 10px;font-size:clamp(48px,6vw,82px);line-height:1.04;letter-spacing:-.055em}@media(max-width:800px){.shell{width:calc(100% - 40px)}.work-hero{padding:145px 0 70px}.work-hero h1{font-size:58px;margin:24px 0 34px}.work-filter button{padding-top:18px;padding-bottom:18px}.work-list{padding:45px 0 85px}.work-item,.work-item:nth-child(even){display:flex;flex-direction:column;gap:25px;margin-bottom:48px;padding-bottom:48px}.work-item:nth-child(even) .work-media{order:0}.work-media{height:auto;aspect-ratio:4/3}.work-copy h2{margin:28px 0 14px;font-size:34px}.work-copy b{display:none}.work-cta{padding:80px 0}.work-cta h2{font-size:46px}}
.work-filter{scrollbar-width:none}
.work-filter::-webkit-scrollbar{display:none}
</style>

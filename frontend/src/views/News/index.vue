<template>
  <main class="insights-page">
    <header class="insights-hero shell"><span>INSIGHTS / JOURNAL</span><h1>观点与<br>行业洞察</h1><p>记录技术变革、产品方法与我们对数字世界的持续思考。</p></header>
    <nav class="insights-filter shell">
      <button v-for="cat in categories" :key="cat.id" :class="{ active: activeCategory === cat.id }" @click="activeCategory = cat.id">{{ cat.name }}</button>
    </nav>
    <section class="insights-content shell">
      <p v-if="loading" class="loading">LOADING INSIGHTS...</p>
      <template v-else-if="filteredNews.length">
        <article class="featured" @click="$router.push(`/news/${filteredNews[0].id}`)">
          <img v-if="filteredNews[0].image" :src="filteredNews[0].image" :alt="filteredNews[0].title" />
          <div v-else class="featured-placeholder" aria-hidden="true"></div>
          <div><span>{{ filteredNews[0].category }} / {{ filteredNews[0].date }}</span><h2>{{ filteredNews[0].title }}</h2><p>{{ filteredNews[0].summary }}</p><b>阅读全文 ↗</b></div>
        </article>
        <div class="article-list">
          <article v-for="(item, index) in filteredNews.slice(1)" :key="item.id" @click="$router.push(`/news/${item.id}`)">
            <div class="article-no">{{ String(index + 2).padStart(2, '0') }}</div>
            <div class="article-copy"><span>{{ item.category }} / {{ item.date }}</span><h3>{{ item.title }}</h3><p>{{ item.summary }}</p></div>
            <img v-if="item.image" :src="item.image" :alt="item.title" loading="lazy" /><div v-else class="article-placeholder" aria-hidden="true"></div><b>↗</b>
          </article>
        </div>
      </template>
      <div v-else class="empty"><span>JOURNAL</span><h2>新的观察，正在整理。</h2><p>我们会持续分享关于产品、设计与技术实践的思考。</p></div>
    </section>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getNews } from '@/api'
const activeCategory = ref('all'), loading = ref(false), newsList = ref([])
const categories = ref([{ id:'all',name:'全部' }])
const labels = { TECH:'技术动态',INDUSTRY:'行业资讯',COMPANY:'公司新闻',AI:'AI 技术',MOBILE:'移动开发',WEB:'Web 开发',MINIAPP:'小程序' }
const filteredNews = computed(() => activeCategory.value === 'all' ? newsList.value : newsList.value.filter(item => item.categoryId === activeCategory.value))
const formatItem = item => { const categoryId = String(item.categoryId || 'OTHER').toUpperCase(); return { id:item.id,title:item.title,summary:item.summary || '从实践出发，分享我们对技术与产品的最新观察。',image:item.image || '',date:(item.publishTime || item.createTime || '').slice(0,10) || '2026',category:labels[categoryId] || item.category || '行业洞察',categoryId } }
const loadNews = async () => { loading.value = true; try { const res = await getNews({ page:1,size:100 }, { silent:true }); const records = res.data?.records || res.data || []; newsList.value = records.map(formatItem); const seen = new Map(); newsList.value.forEach(item => seen.set(item.categoryId,{ id:item.categoryId,name:item.category })); categories.value = [{ id:'all',name:'全部' },...seen.values()] } catch (error) { console.error('加载资讯失败:', error) } finally { loading.value = false } }
onMounted(loadNews)
</script>

<style scoped>
.insights-page{--o:#f06a21;background:#f2f2ef;color:#111;min-height:100vh}.shell{width:min(calc(100% - 80px),1240px);margin:auto}.insights-hero{padding:205px 0 105px;display:grid;grid-template-columns:1.5fr .5fr;align-items:end}.insights-hero>span{grid-column:1/-1;color:var(--o);font-size:10px;font-weight:800;letter-spacing:.2em}.insights-hero h1{margin:28px 0 0;font-size:clamp(68px,8vw,112px);line-height:.9;letter-spacing:-.06em}.insights-hero p{color:#666;line-height:1.8}.insights-filter{display:flex;gap:35px;padding:22px 0;border-top:1px solid #aaa;border-bottom:1px solid #aaa;overflow:auto}.insights-filter button{flex:none;border:0;background:none;color:#888;font-weight:700;cursor:pointer}.insights-filter button.active{color:#111}.insights-content{padding:78px 0 130px}.featured{display:grid;grid-template-columns:1.35fr .65fr;background:#111;color:#fff;cursor:pointer}.featured img{width:100%;height:610px;object-fit:cover;filter:saturate(.7)}.featured>div{padding:45px 38px;display:flex;flex-direction:column}.featured span,.article-copy span,.empty span{color:var(--o);font-size:9px;font-weight:800;letter-spacing:.15em}.featured h2{margin:80px 0 20px;font-size:clamp(34px,3.6vw,53px);line-height:1.12;letter-spacing:-.04em}.featured p{color:#999;line-height:1.8}.featured b{margin-top:auto;font-size:12px}.article-list{margin-top:80px;border-top:1px solid #999}.article-list article{display:grid;grid-template-columns:70px 1fr 250px 30px;gap:28px;align-items:center;padding:34px 0;border-bottom:1px solid #bbb;cursor:pointer}.article-no{color:#999;font-size:11px}.article-copy h3{margin:15px 0 10px;font-size:26px}.article-copy p{margin:0;color:#777}.article-list img{width:250px;height:145px;object-fit:cover;filter:saturate(.7)}.article-list article>b{color:var(--o);font-size:22px}.empty{padding:90px 0 140px}.empty h2{margin:25px 0;font-size:clamp(46px,6vw,78px);letter-spacing:-.05em}.empty p,.loading{color:#777}@media(max-width:800px){.shell{width:calc(100% - 40px)}.insights-hero{padding:145px 0 70px;display:block}.insights-hero h1{font-size:59px;margin-bottom:32px}.featured{display:block}.featured img{height:auto;aspect-ratio:4/3}.featured>div{padding:30px 24px;min-height:390px}.featured h2{margin-top:50px}.article-list{margin-top:55px}.article-list article{grid-template-columns:32px 1fr;gap:14px;padding:28px 0}.article-list img{grid-column:2;width:100%;height:auto;aspect-ratio:16/9}.article-list article>b{display:none}.article-copy h3{font-size:23px}.insights-content{padding-bottom:85px}}
.featured-placeholder{height:610px;background:#2a2a2a}.article-placeholder{width:250px;height:145px;background:#292929}@media(max-width:800px){.featured-placeholder{aspect-ratio:4/3;height:auto}.article-placeholder{grid-column:2;width:100%;height:auto;aspect-ratio:16/9}}
</style>

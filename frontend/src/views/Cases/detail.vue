<template>
  <div class="case-detail">
    <ElImageViewer
      v-if="previewVisible"
      :url-list="previewUrls"
      :initial-index="0"
      :teleported="true"
      :hide-on-click-modal="true"
      :close-on-press-escape="true"
      :zoom-rate="1.1"
      @close="closeViewer"
    />
    <el-dialog
      v-model="miniProgramGuideVisible"
      title="打开小程序"
      width="520px"
      :append-to-body="true"
    >
      <div class="mp-guide">
        <div class="mp-guide-title">已为你复制小程序口令</div>
        <div class="mp-guide-sub">请在微信内按以下方式打开：</div>
        <ol class="mp-guide-steps">
          <li>打开微信，进入任意聊天窗口（例如“文件传输助手”）</li>
          <li>长按输入框并粘贴口令</li>
          <li>出现小程序卡片后点击即可进入</li>
        </ol>
        <div class="mp-guide-link-row" v-if="miniProgramLink">
          <div class="mp-guide-link" role="button" tabindex="0" @click="copyLink(miniProgramLink)">
            {{ miniProgramLink }}
          </div>
          <el-button type="primary" plain @click="copyLink(miniProgramLink)">再次复制</el-button>
        </div>
        <div class="mp-guide-tip" v-if="miniProgramLink">点击口令可再次复制</div>
      </div>
      <template #footer>
        <el-button @click="miniProgramGuideVisible = false">我知道了</el-button>
      </template>
    </el-dialog>
    <div class="container">
      <el-button @click="$router.back()" class="back-btn">
        <el-icon><ArrowLeft /></el-icon> 返回
      </el-button>

      <div class="detail-content">
        <div class="detail-hero">
          <div class="hero-text">
            <p class="detail-eyebrow">
              <span class="dot" />
              {{ categoryDisplay || '企业案例' }}
            </p>
            <h1 class="detail-title">{{ caseData.title }}</h1>
            <p class="detail-summary">{{ summaryDisplay }}</p>
          </div>

          <div class="hero-cover" v-if="featuredImage">
            <div class="cover-glow"></div>
            <img :src="featuredImage" :alt="caseData.title">
          </div>
        </div>

        <div class="insight-list" v-if="insightList.length">
          <div
            v-for="(item, index) in insightList"
            :key="item + index"
            class="insight-item"
          >
            <span class="bullet"></span>
            <p>{{ item }}</p>
          </div>
        </div>

        <div class="meta-board">
          <div
            v-for="(item, idx) in metaCards"
            :key="item.label + idx"
            class="meta-row"
            :style="{ '--card-hue': 180 + idx * 25 + 'deg' }"
          >
            <div class="meta-label">{{ item.label }}</div>
            <div class="meta-value" :class="{ 'is-tags': item.type === 'tags' }">
              <template v-if="item.type === 'tags'">
                <span
                  v-for="(tag, tagIndex) in item.value"
                  :key="tag + tagIndex"
                  class="meta-tag"
                >
                  {{ tag }}
                </span>
              </template>
              <template v-else-if="item.label === '使用技术'">
                <div v-html="item.value"></div>
              </template>
              <template v-else-if="item.label === '项目链接'">
                <template v-if="item.isMiniProgram">
                  <div class="meta-link-wrapper">
                    <span
                      class="meta-link-text"
                      :title="item.raw"
                      role="button"
                      tabindex="0"
                      @click.stop.prevent="openMiniProgram(item.raw)"
                      @touchstart.stop.prevent="openMiniProgram(item.raw)"
                    >{{ item.value }}</span>
                    <el-button
                      size="small"
                      type="primary"
                      plain
                      @click.stop.prevent="openMiniProgram(item.raw)"
                      @touchstart.stop.prevent="openMiniProgram(item.raw)"
                    >打开小程序</el-button>
                  </div>
                </template>
                <template v-else-if="item.href">
                  <a class="meta-link" :href="item.href" target="_blank" rel="noopener noreferrer">{{ item.value }}</a>
                </template>
                <template v-else>
                  {{ item.value }}
                </template>
              </template>
              <template v-else>
                {{ item.value }}
              </template>
            </div>
          </div>
        </div>

        <div v-if="galleryImages.length" class="gallery-section">
          <div class="section-header gallery-header">
            <div class="section-title">案例图集</div>
            <span class="gallery-count">共 {{ galleryImages.length }} 张</span>
          </div>
          <div class="gallery-grid">
            <div
              v-for="(img, index) in galleryImages"
              :key="img + index"
              :class="['gallery-card', { feature: index === 0 }]"
            >
              <el-image
                :src="img"
                @click="openViewer(index)"
                fit="cover"
              />
              <div class="gallery-badge">{{ index === 0 ? '主图' : `#${index + 1}` }}</div>
            </div>
          </div>
        </div>

        <div class="content-section" v-if="descriptionParagraphs.length">
          <div class="section-title">项目亮点</div>
          <p v-for="(paragraph, index) in descriptionParagraphs" :key="index">{{ paragraph }}</p>
        </div>

        <section v-if="relatedCases.length" class="related-section">
          <div class="section-title">相关案例</div>
          <div class="related-list">
            <div
              v-for="item in relatedCases"
              :key="item.id"
              class="related-item"
              @click="goToCase(item.id)"
            >
              <div class="related-thumb" v-if="getCaseCover(item)">
                <img :src="getCaseCover(item)" :alt="item.title" />
              </div>
              <div class="related-info">
                <h3>{{ item.title }}</h3>
                <p>{{ item.description }}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft } from '@element-plus/icons-vue'
import { getCaseDetail, getCases, addView } from '@/api'
import { ElMessage, ElImageViewer } from 'element-plus'

const route = useRoute()
const router = useRouter()

const createEmptyCase = () => ({
  id: null,
  title: '',
  category: '',
  images: '',
  description: '',
  duration: '',
  technologies: '',
  link: '',
  publishTime: '',
  createTime: '',
  views: 0
})

const caseData = ref(createEmptyCase())

const relatedCases = ref([])
const hasRecordedView = ref(false)
const previewVisible = ref(false)
const previewUrls = ref([])
const miniProgramGuideVisible = ref(false)
const miniProgramLink = ref('')

const summaryText = computed(() => {
  const text = caseData.value.description || ''
  if (!text) return ''
  return text.length > 120 ? `${text.slice(0, 120)}...` : text
})

const summaryDisplay = computed(() => {
  return summaryText.value || '该案例的详细文字介绍正在补充中，敬请期待，我们会尽快更新完整内容。'
})

const descriptionParagraphs = computed(() => {
  const text = caseData.value.description || ''
  return text
    .split(/\n+/)
    .map(item => item.trim())
    .filter(Boolean)
})

const extractFirstImage = (images) => {
  if (!images) return ''
  if (Array.isArray(images)) {
    return images.find(Boolean) || ''
  }
  if (typeof images === 'string') {
    try {
      const parsed = JSON.parse(images)
      if (Array.isArray(parsed)) {
        return parsed.find(Boolean) || ''
      }
    } catch (e) {
      // ignore parse error
    }
    const parts = images
      .split(/[\n,;]/)
      .map(item => item.trim())
      .filter(Boolean)
    return parts[0] || ''
  }
  return ''
}

const galleryImages = computed(() => {
  const { images } = caseData.value
  if (!images) return []

  if (Array.isArray(images)) {
    return images.filter(Boolean)
  }

  if (typeof images === 'string') {
    try {
      const parsed = JSON.parse(images)
      if (Array.isArray(parsed)) {
        return parsed.filter(Boolean)
      }
    } catch (e) {
      // 非 JSON 字符串时继续按分隔符解析
    }

    return images
      .split(/[\n,;]/)
      .map(item => item.trim())
      .filter(Boolean)
  }

  return []
})

const featuredImage = computed(() => extractFirstImage(caseData.value.images) || caseData.value.coverImage || caseData.value.image || '')

const secondaryImages = computed(() => {
  if (galleryImages.value.length <= 1) return []
  return galleryImages.value.slice(1)
})

const normalizeList = (value) => {
  if (!value) return []
  if (Array.isArray(value)) {
    return value.filter(Boolean)
  }
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value)
      if (Array.isArray(parsed)) {
        return parsed.filter(Boolean)
      }
    } catch (error) {
      // 非 JSON 字符串时回退到分隔符拆分
    }

    return value
      .split(/[\n,，、；;]+/)
      .map(item => item.replace(/[\[\]"]+/g, '').trim())
      .filter(Boolean)
  }
  return []
}

const categoryDisplay = computed(() => {
  const raw = (caseData.value.category || '').trim()
  if (!raw) return ''
  const map = {
    MINIPROGRAM: '小程序开发',
    APP: 'App 开发',
    WEB: 'WEB 网站开发',
    AI: 'AI 开发',
    SYSTEM: '系统开发',
    BRAND: '品牌设计'
  }
  if (map[raw]) return map[raw]
  if (/^[A-Za-z_]+$/.test(raw)) return '其他'
  return raw
})

const formatTechnologiesText = (value) => {
  if (!value) return ''
  if (Array.isArray(value)) {
    return value.filter(Boolean).join('，')
  }
  if (typeof value === 'string') {
    return value
      .replace(/[\r\n]+/g, '<br />')
      .replace(/[\[\]"]+/g, '')
      .replace(/\s*(后端：|数据库：|附加能力：|功能：|部署：)/g, '<br />$1')
      .trim()
  }
  return String(value)
}

const formatDateDisplay = (dateStr) => {
  if (!dateStr) return '待更新'
  const date = new Date(dateStr)
  if (!Number.isNaN(date.getTime())) {
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  }
  return dateStr
}

const stripZeroWidth = (value) => {
  if (!value) return ''
  return String(value)
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .trim()
}

const extractMiniProgramLink = (value) => {
  const text = stripZeroWidth(value)
  if (!text) return ''
  const idx = text.indexOf('#小程序://')
  if (idx >= 0) return text.slice(idx + 1)
  const idx2 = text.indexOf('小程序://')
  if (idx2 >= 0) return text.slice(idx2)
  return ''
}

const normalizeProjectLink = (value) => {
  const text = stripZeroWidth(value)
  const mini = extractMiniProgramLink(text)
  if (mini) {
    return { isMiniProgram: true, display: mini, raw: mini, href: '' }
  }
  if (/^https?:\/\//i.test(text)) {
    return { isMiniProgram: false, display: text, raw: text, href: text }
  }
  return { isMiniProgram: false, display: text, raw: text, href: '' }
}

const copyLink = async (value) => {
  const text = stripZeroWidth(value)
  if (!text) return
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
    } else {
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.setAttribute('readonly', 'true')
      textarea.style.position = 'fixed'
      textarea.style.left = '-9999px'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }
    ElMessage.success('已复制小程序口令')
  } catch (e) {
    console.error('复制失败:', e)
    ElMessage.error('复制失败，请手动复制')
  }
}

const openMiniProgram = async (value) => {
  const text = stripZeroWidth(value)
  if (!text) return
  miniProgramLink.value = text
  miniProgramGuideVisible.value = true
  await copyLink(text)
}

const metaCards = computed(() => {
  const techText = formatTechnologiesText(caseData.value.technologies)
  const cards = [
    { label: '项目分类', value: categoryDisplay.value || '企业案例' },
    { label: '项目周期', value: caseData.value.duration || '按需定制' },
    { label: '发布时间', value: formatDateDisplay(caseData.value.publishTime || caseData.value.createTime) },
    { label: '浏览量', value: caseData.value.views ?? '--' },
    {
      label: '使用技术',
      value: techText || '定制开发方案'
    }
  ]

  if (caseData.value.link) {
    const normalized = normalizeProjectLink(caseData.value.link)
    cards.splice(2, 0, {
      label: '项目链接',
      value: normalized.display,
      raw: normalized.raw,
      href: normalized.href,
      isMiniProgram: normalized.isMiniProgram
    })
  }

  return cards
})

const insightList = computed(() => {
  const sources = [caseData.value.description]
  const list = []
  sources.forEach(source => {
    if (!source) return
    const fragments = source
      .split(/\n|，|,|；|;|。/)
      .map(item => item.trim())
      .filter(Boolean)
    fragments.forEach(fragment => {
      if (list.length < 4 && !list.includes(fragment)) {
        list.push(fragment)
      }
    })
  })
  if (!list.length) {
    list.push('支持定制化功能模块，匹配企业业务流程')
    list.push('响应式设计与性能优化，兼顾多终端体验')
  }
  return list
})

const loadDetail = async () => {
  const id = route.params.id
  if (!id) return
  try {
    hasRecordedView.value = false
    const res = await getCaseDetail(id)
    if (res && res.data) {
      caseData.value = { ...createEmptyCase(), ...res.data }
      await loadRelated()
      await recordView()
    } else {
      caseData.value = createEmptyCase()
      ElMessage.warning('找不到该案例，稍后再试~')
    }
  } catch (e) {
    console.error('加载案例详情失败:', e)
    ElMessage.error('加载案例详情失败，请稍后重试')
    caseData.value = createEmptyCase()
  }
}

const recordView = async () => {
  if (!caseData.value.id || hasRecordedView.value) return
  try {
    const res = await addView('case_view', caseData.value.id)
    const increment = Number(res?.data ?? 0)
    if (!Number.isNaN(increment) && increment > 0) {
      caseData.value.views = (caseData.value.views ?? 0) + increment
    }
    hasRecordedView.value = true
  } catch (error) {
    console.error('记录浏览量失败:', error)
  }
}

const loadRelated = async () => {
  try {
    const params = { page: 1, size: 6 }
    if (caseData.value.category) {
      params.category = caseData.value.category
    }
    const res = await getCases(params)
    const records = res.data && res.data.records ? res.data.records : []
    relatedCases.value = records.filter(item => item.id !== caseData.value.id)
  } catch (e) {
    console.error('加载相关案例失败:', e)
  }
}

const getCaseCover = (record) => {
  if (!record) return ''
  return extractFirstImage(record.images) || record.coverImage || record.image || ''
}

const openViewer = (index) => {
  const target = galleryImages.value[index]
  if (!target) return
  previewUrls.value = [target]
  previewVisible.value = true
}

const closeViewer = () => {
  previewUrls.value = []
  previewVisible.value = false
}

const goToCase = (id) => {
  router.push(`/cases/${id}`)
}

watch(
  () => route.params.id,
  () => {
    loadDetail()
    hasRecordedView.value = false
  }
)

onMounted(() => {
  loadDetail()
})
</script>

<style scoped>
.case-detail {
  padding: 60px 0 80px;
  min-height: calc(100vh - 140px);
  background: radial-gradient(circle at top, rgba(0, 212, 255, 0.12) 0, transparent 55%),
    linear-gradient(180deg, #05091a 0%, #101736 100%);
}

.container {
  max-width: 1400px;
  width: min(94vw, 1400px);
  margin: 0 auto;
  padding: 0 24px;
}

.back-btn {
  margin-bottom: 24px;
  border-radius: 999px;
  padding: 6px 18px;
}

.detail-content {
  background: rgba(9, 15, 45, 0.92);
  border-radius: 22px;
  padding: 40px 44px 48px;
  box-shadow: 0 30px 80px rgba(1, 6, 22, 0.7);
  border: 1px solid rgba(0, 212, 255, 0.12);
  position: relative;
  overflow: hidden;
}

.detail-content::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 20% 20%, rgba(0, 212, 255, 0.08), transparent 55%);
  pointer-events: none;
}

.detail-hero {
  display: flex;
  gap: 40px;
  align-items: stretch;
  margin-bottom: 36px;
  position: relative;
  z-index: 1;
  flex-wrap: wrap;
}

.meta-link-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: 100%;
}

.meta-link-text {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  color: #00d4ff;
  text-decoration: underline;
}

.meta-link {
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mp-guide-title {
  font-weight: 600;
  margin-bottom: 8px;
}

.mp-guide-sub {
  opacity: 0.8;
  margin-bottom: 10px;
}

.mp-guide-steps {
  padding-left: 18px;
  margin: 0 0 12px;
}

.mp-guide-link-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.mp-guide-link {
  flex: 1;
  min-width: 0;
  padding: 12px 14px;
  border-radius: 12px;
  background: rgba(0, 212, 255, 0.14);
  border: 1px solid rgba(0, 212, 255, 0.35);
  box-shadow: 0 10px 26px rgba(0, 212, 255, 0.12);
  color: #00d4ff;
  font-weight: 600;
  word-break: break-all;
  cursor: pointer;
}

.mp-guide-tip {
  margin-top: 8px;
  font-size: 12px;
  opacity: 0.75;
}

.hero-text {
  flex: 1 1 460px;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.detail-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(0, 212, 255, 0.8);
  margin-bottom: 18px;
}

.detail-eyebrow .dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #00d4ff;
  box-shadow: 0 0 12px rgba(0, 212, 255, 0.8);
  display: inline-block;
}

.detail-title {
  font-size: 42px;
  margin-bottom: 16px;
  color: #ffffff;
  font-weight: 700;
  line-height: 1.3;
}

.detail-summary {
  font-size: 16px;
  line-height: 1.9;
  color: rgba(255, 255, 255, 0.78);
  margin-bottom: 24px;
  min-height: 60px;
}

.insight-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 22px;
}

.insight-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  color: rgba(255, 255, 255, 0.78);
  font-size: 14px;
}

.insight-item .bullet {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00d4ff, #9d4edd);
  margin-top: 6px;
  flex-shrink: 0;
  box-shadow: 0 0 10px rgba(0, 212, 255, 0.6);
}

.meta-board {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
}

.meta-row {
  position: relative;
  border-radius: 18px;
  padding: 18px 20px 18px 56px;
  background: linear-gradient(135deg, rgba(6, 14, 40, 0.95), rgba(9, 22, 66, 0.85));
  border: 1px solid rgba(0, 212, 255, 0.18);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 12px 30px rgba(2, 10, 33, 0.45);
  min-height: 96px;
  overflow: hidden;
  transition: transform 0.45s ease, border-color 0.45s ease, box-shadow 0.45s ease;
  animation: floatPulse 6s ease-in-out infinite;
}

.meta-row:nth-child(2n) {
  animation-delay: 1.5s;
}

.meta-row:nth-child(3n) {
  animation-delay: 3s;
}

.meta-row::before {
  content: '';
  position: absolute;
  width: 30px;
  height: 30px;
  left: 18px;
  top: 18px;
  border-radius: 10px;
  background: linear-gradient(135deg, hsl(var(--card-hue, 200deg), 80%, 55%), hsl(calc(var(--card-hue, 200deg) + 40deg), 85%, 60%));
  box-shadow: 0 0 24px rgba(0, 212, 255, 0.5);
  opacity: 0.95;
  animation: glowPulse 3s ease-in-out infinite;
}

.meta-row::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.04);
  pointer-events: none;
  background: radial-gradient(circle at top right, rgba(0, 212, 255, 0.08), transparent 45%);
}

.meta-row:hover {
  transform: translateY(-6px);
  border-color: rgba(0, 212, 255, 0.45);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 20px 45px rgba(0, 212, 255, 0.28);
}

.meta-row:hover::before {
  filter: brightness(1.2);
}

.meta-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.65);
  text-transform: uppercase;
  letter-spacing: 0.18em;
  margin-bottom: 8px;
}

.meta-value {
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  line-height: 1.6;
  word-break: break-word;
}

.meta-value.is-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.meta-tag {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 13px;
  color: #fff;
  background: rgba(0, 212, 255, 0.12);
  border: 1px solid rgba(0, 212, 255, 0.38);
  backdrop-filter: blur(12px);
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.meta-tag:hover {
  transform: translateY(-2px);
  border-color: rgba(0, 212, 255, 0.8);
}

@keyframes glowPulse {
  0%, 100% {
    box-shadow: 0 0 18px rgba(0, 212, 255, 0.35);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 26px rgba(0, 212, 255, 0.6);
    transform: scale(1.05);
  }
}

@keyframes floatPulse {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

.hero-cover {
  flex: 1 1 420px;
  min-height: auto;
  border-radius: 28px;
  background: linear-gradient(160deg, rgba(0, 212, 255, 0.18), rgba(157, 78, 221, 0.22));
  border: 1px solid rgba(0, 212, 255, 0.25);
  padding: 24px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 212, 255, 0.18);
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-cover img {
  width: 100%;
  height: auto;
  max-height: 460px;
  border-radius: 24px;
  display: block;
  object-fit: contain;
  background: radial-gradient(circle at top, rgba(255, 255, 255, 0.08), rgba(0, 0, 0, 0.25));
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

.cover-glow {
  position: absolute;
  inset: 20px;
  background: radial-gradient(circle, rgba(0, 212, 255, 0.35), transparent 65%);
  filter: blur(60px);
  z-index: 0;
}

.hero-cover img {
  position: relative;
  z-index: 1;
}

.content-section {
  margin-bottom: 36px;
  position: relative;
  z-index: 1;
}

.section-title {
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 18px;
  position: relative;
  padding-left: 14px;
}

.section-title::before {
  content: '';
  width: 4px;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 999px;
  background: linear-gradient(180deg, #00d4ff, #9d4edd);
}

.content-section p {
  font-size: 15px;
  line-height: 1.9;
  color: rgba(255, 255, 255, 0.82);
  margin-bottom: 14px;
}

.gallery-section {
  margin-bottom: 36px;
  position: relative;
  z-index: 1;
}

.section-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
}

.gallery-header {
  margin-bottom: 16px;
}

.gallery-count {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.65);
}


.gallery-layout {
  display: grid;
  grid-template-columns: minmax(280px, 1fr) 1fr;
  gap: 24px;
  align-items: start;
}

.gallery-feature {
  height: 100%;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 26px;
}

.gallery-card {
  position: relative;
  border-radius: 18px;
  border: 1px solid rgba(0, 212, 255, 0.15);
  background: rgba(255, 255, 255, 0.03);
  overflow: hidden;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
  min-height: 320px;
}

.gallery-card.large {
  min-height: 460px;
}

.gallery-card :deep(.el-image),
.gallery-card :deep(.el-image__inner) {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  background: rgba(0, 0, 0, 0.18);
}

.gallery-badge {
  position: absolute;
  top: 14px;
  right: 14px;
  background: rgba(5, 10, 35, 0.75);
  border: 1px solid rgba(0, 212, 255, 0.6);
  color: #fff;
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 999px;
  backdrop-filter: blur(8px);
}

.related-section {
  margin-top: 40px;
}

.related-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}

.related-item {
  background: rgba(255, 255, 255, 0.04);
  border-radius: 12px;
  padding: 12px;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: all 0.3s ease;
}

.related-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 24px rgba(0, 212, 255, 0.2);
  border-color: rgba(0, 212, 255, 0.4);
}

.related-thumb {
  width: 100%;
  height: 140px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 10px;
}

.related-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.related-info h3 {
  font-size: 15px;
  color: #ffffff;
  margin-bottom: 6px;
}

.related-info p {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media screen and (max-width: 1280px) {
  .detail-content {
    padding: 28px 26px 36px;
  }

  .detail-hero {
    flex-direction: column;
  }

  .gallery-layout {
    grid-template-columns: 1fr;
  }

  .featured-card {
    flex: 1;
    max-width: 100%;
  }
}

@media screen and (max-width: 768px) {
  .container {
    padding: 0 20px;
  }

  .detail-content {
    padding: 20px 18px 28px;
  }

  .detail-content h1 {
    font-size: 26px;
  }

  .info-pills {
    flex-direction: column;
  }

  .gallery-grid {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 18px;
  }
}
</style>

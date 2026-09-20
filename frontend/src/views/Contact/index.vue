<template>
  <div class="contact-page">
    <section ref="heroStage" class="contact-hero" data-contact-reveal="hero">
      <div class="contact-shell hero-copy" data-contact-reveal>
        <h1>
          <span>{{ copy.heroLine1 }}</span>
          <span>{{ copy.heroLine2 }}</span>
        </h1>

        <div class="hero-side">
          <p>{{ copy.heroBody }}</p>
          <CooperationWheel :label="copy.cooperation" @open="openNotice" />
        </div>
      </div>

      <div ref="heroImageViewport" class="hero-image" aria-hidden="true" data-contact-reveal>
        <img
          ref="heroImage"
          src="/assets/home/statement-bg.jpg"
          alt=""
          :style="{ transform: `translate3d(0, ${parallaxY}px, 0)` }"
          @load="handleScroll"
        />
      </div>
    </section>

    <section class="contact-main contact-shell" data-contact-reveal>
      <div class="contact-details" data-contact-reveal>
        <p class="section-kicker">{{ copy.kicker }}</p>
        <h2>{{ copy.sectionTitle }}</h2>
        <p class="section-intro">{{ copy.sectionBody }}</p>

        <dl class="contact-list">
          <div>
            <dt>{{ copy.wechat }}</dt>
            <dd><button type="button" @click="copyText('YunZhanKk', copy.wechat)">YunZhanKk</button></dd>
          </div>
          <div>
            <dt>{{ copy.email }}</dt>
            <dd><button type="button" @click="copyText('yunzhan1129@163.com', copy.email)">yunzhan1129@163.com</button></dd>
          </div>
          <div>
            <dt>{{ copy.address }}</dt>
            <dd>{{ copy.addressValue }}</dd>
          </div>
        </dl>
      </div>

      <form class="inquiry-form" data-contact-reveal novalidate @submit.prevent="submitForm">
        <div class="field-grid">
          <label class="form-field">
            <span>{{ copy.name }} *</span>
            <input v-model="form.name" type="text" maxlength="80" :placeholder="copy.namePlaceholder" @input="clearError('name')" />
            <small v-if="errors.name">{{ errors.name }}</small>
          </label>

          <label class="form-field">
            <span>{{ copy.contact }} *</span>
            <input v-model="form.contact" type="text" maxlength="120" :placeholder="copy.contactPlaceholder" @input="clearError('contact')" />
            <small v-if="errors.contact">{{ errors.contact }}</small>
          </label>

          <label class="form-field field-all">
            <span>{{ copy.company }}</span>
            <input v-model="form.company" type="text" maxlength="200" :placeholder="copy.companyPlaceholder" />
          </label>

          <label class="form-field field-all">
            <span>{{ copy.requirements }}</span>
            <textarea v-model="form.requirements" maxlength="5000" rows="4" :placeholder="copy.requirementsPlaceholder"></textarea>
          </label>
        </div>

        <fieldset class="service-fieldset">
          <legend>{{ copy.serviceLabel }} *</legend>
          <div class="service-options">
            <label v-for="service in copy.services" :key="service.value" class="service-option">
              <input v-model="form.services" type="checkbox" :value="service.value" @change="clearError('services')" />
              <span aria-hidden="true"></span>
              {{ service.label }}
            </label>
          </div>
          <small v-if="errors.services" class="field-error">{{ errors.services }}</small>
        </fieldset>

        <label class="privacy-option">
          <input v-model="form.privacyConsent" type="checkbox" @change="clearError('privacyConsent')" />
          <span aria-hidden="true"></span>
          <span>{{ copy.privacyPrefix }} <router-link :to="privacyPath">{{ copy.privacyLink }}</router-link></span>
        </label>
        <small v-if="errors.privacyConsent" class="field-error privacy-error">{{ errors.privacyConsent }}</small>

        <button class="submit-button hover_button" type="submit" :disabled="submitting">
          <span>{{ submitting ? copy.submitting : copy.submit }}</span>
          <span aria-hidden="true">↗</span>
        </button>

        <div v-if="submitState" class="submit-state" :class="`state-${submitState}`" role="status">
          <strong>{{ submitState === 'demo' ? copy.demoTitle : copy.unavailableTitle }}</strong>
          <p>{{ submitState === 'demo' ? copy.demoBody : copy.unavailableBody }}</p>
          <div v-if="submitState === 'unavailable'" class="fallback-actions">
            <button type="button" @click="copySummary">{{ copy.copySummary }}</button>
            <button type="button" @click="copyText('YunZhanKk', copy.wechat)">{{ copy.copyWechat }}</button>
            <button type="button" @click="copyText('yunzhan1129@163.com', copy.email)">{{ copy.copyEmail }}</button>
          </div>
        </div>
      </form>
    </section>

    <section class="contact-closing" data-contact-reveal>
      <div class="contact-shell closing-inner">
        <div>
          <p>{{ copy.closingKicker }}</p>
          <h2>{{ copy.closingTitle }}</h2>
        </div>
        <CooperationWheel :label="copy.startConversation" @open="openAiConsultation" />
      </div>
    </section>

    <Teleport to="body">
      <Transition name="notice-modal">
        <div v-if="noticeOpen" class="notice-overlay" role="presentation" @mousedown.self="closeNotice">
          <section class="notice-dialog" role="dialog" aria-modal="true" :aria-labelledby="noticeTitleId">
            <button ref="noticeCloseRef" class="notice-close" type="button" :aria-label="copy.close" @click="closeNotice">
              <span></span><span></span>
            </button>
            <p class="notice-kicker">YUNZHAN / COOPERATION</p>
            <h2 :id="noticeTitleId">{{ copy.noticeTitle }}</h2>
            <ol>
              <li v-for="(item, index) in copy.noticeItems" :key="item.title">
                <span>{{ String(index + 1).padStart(2, '0') }}</span>
                <div><h3>{{ item.title }}</h3><p>{{ item.body }}</p></div>
              </li>
            </ol>
          </section>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { computed, defineComponent, h, nextTick, onMounted, onUnmounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { copyToClipboard } from '@/utils/clipboard'

const route = useRoute()
const router = useRouter()
const isEn = computed(() => route.path === '/en/contact')
const privacyPath = computed(() => (isEn.value ? '/en/privacy-policy' : '/privacy-policy'))
const aiConsultationPath = computed(() => (isEn.value ? '/en/ai-consultation' : '/ai-consultation'))
const noticeTitleId = 'cooperation-notice-title'

const CooperationWheel = defineComponent({
  name: 'CooperationWheel',
  props: { label: { type: String, required: true } },
  emits: ['open'],
  setup (props, { emit }) {
    return () => h('button', {
      class: 'cooperation-wheel',
      type: 'button',
      'aria-label': props.label,
      onClick: () => emit('open')
    }, [
      h('span', { class: 'wheel-ring', 'aria-hidden': 'true' }, [
        h('i'), h('i'), h('i'), h('i'), h('i'), h('i'), h('i'), h('i')
      ]),
      h('span', { class: 'wheel-label' }, props.label),
      h('span', { class: 'wheel-arrow', 'aria-hidden': 'true' }, '↗')
    ])
  }
})

const copy = computed(() => (isEn.value ? {
  heroLine1: 'A good partnership',
  heroLine2: 'starts with a clear conversation.',
  heroBody: 'Tell us what you are building, where the friction is, and what outcome matters. We will respond with an honest assessment and a practical next step.',
  cooperation: 'Cooperation notes',
  startConversation: 'Start a conversation',
  kicker: 'CONTACT / YUNZHAN',
  sectionTitle: 'Let us build something useful.',
  sectionBody: 'Yunzhan Technology provides AI application, mini program, app and web product development for enterprises. Start with an idea, a brief, or a concrete problem.',
  wechat: 'WeChat', email: 'Email', address: 'Address', addressValue: 'Changping District, Beijing',
  name: 'Name', namePlaceholder: 'How should we address you?',
  contact: 'Contact', contactPlaceholder: 'Phone number or email',
  company: 'Company / website', companyPlaceholder: 'Optional',
  requirements: 'Project requirements', requirementsPlaceholder: 'Goals, current situation, scope and preferred timing',
  serviceLabel: 'Services of interest',
  services: [
    { value: 'ai', label: 'AI application' }, { value: 'mini', label: 'Mini program' },
    { value: 'app', label: 'App development' }, { value: 'web', label: 'Web development' },
    { value: 'other', label: 'Other' }
  ],
  privacyPrefix: 'I have read and agree to the', privacyLink: 'Privacy Policy',
  submit: 'Send inquiry', submitting: 'Preparing...',
  demoTitle: 'Preview only', demoBody: 'This is a contact-form interaction preview. No inquiry was sent.',
  unavailableTitle: 'Online submission is not available yet',
  unavailableBody: 'Your form remains on this page. Copy the summary below or contact us directly by WeChat or email.',
  copySummary: 'Copy inquiry summary', copyWechat: 'Copy WeChat', copyEmail: 'Copy email',
  closingKicker: 'BEFORE WE START', closingTitle: 'Good work begins with the same expectations.',
  close: 'Close cooperation notes', noticeTitle: 'How we work together',
  noticeItems: [
    { title: 'No speculative pitches', body: 'We do not enter unpaid competitive pitches. We prefer to understand the problem together, then define a paid and accountable engagement.' },
    { title: 'No “make something first” requests', body: 'A responsible proposal depends on goals, users, constraints and scope. Discovery is part of the work, not a free sample produced before alignment.' },
    { title: 'Transparent commercial relationships', body: 'We win work through capability and delivery. We do not use kickbacks or hidden commissions; project decisions and costs stay clear to both sides.' }
  ],
  errors: { name: 'Please enter your name.', contact: 'Enter a valid phone number or email.', services: 'Select at least one service.', privacy: 'Please agree to the Privacy Policy first.' },
  copied: (label) => `${label} copied`, copyFailed: 'Could not copy automatically. Please select and copy it manually.',
  summaryLabels: ['Name', 'Contact', 'Company / website', 'Services', 'Requirements']
} : {
  heroLine1: '好的合作，',
  heroLine2: '从一次坦诚沟通开始。',
  heroBody: '告诉我们你想做什么、正在遇到什么问题，以及真正重要的目标。我们会给出诚实判断，并一起找到可落地的下一步。',
  cooperation: '合作须知',
  startConversation: '开始沟通',
  kicker: 'CONTACT / YUNZHAN',
  sectionTitle: '一起做些真正有用的事。',
  sectionBody: '耘栈科技面向企业提供 AI 应用、小程序、App 与网站产品研发。无论是一份完整需求，还是一个尚待梳理的想法，都可以从这里开始。',
  wechat: '微信', email: '邮箱', address: '地址', addressValue: '北京市昌平区',
  name: '您的姓名', namePlaceholder: '我们该如何称呼您？',
  contact: '联系方式', contactPlaceholder: '手机号或邮箱',
  company: '公司 / 网址', companyPlaceholder: '选填',
  requirements: '项目需求', requirementsPlaceholder: '可以写下目标、现状、范围和期望时间',
  serviceLabel: '感兴趣的服务',
  services: [
    { value: 'ai', label: 'AI 应用开发' }, { value: 'mini', label: '小程序开发' },
    { value: 'app', label: 'App 开发' }, { value: 'web', label: '网站开发' },
    { value: 'other', label: '其他需求' }
  ],
  privacyPrefix: '我已阅读并同意', privacyLink: '《隐私政策》',
  submit: '提交需求', submitting: '正在准备...',
  demoTitle: '当前为演示预览', demoBody: '表单交互已完成，但本次内容没有发送。',
  unavailableTitle: '在线接收暂未开通',
  unavailableBody: '已填写内容会保留在当前页面。你可以复制需求摘要，或通过微信、邮箱直接联系我们。',
  copySummary: '复制需求摘要', copyWechat: '复制微信号', copyEmail: '复制邮箱',
  closingKicker: 'BEFORE WE START', closingTitle: '彼此认同，才是好项目的开始。',
  close: '关闭合作须知', noticeTitle: '耘栈合作须知',
  noticeItems: [
    { title: '不参与任何形式的无偿比稿', body: '我们更愿意先把业务问题、目标和边界讲清楚，再以正式、可负责的方式进入合作。专业方案来自共同调研，而不是脱离语境的竞稿。' },
    { title: '拒绝“先做一版出来看看”', body: '负责任的方案需要建立在用户、场景、资源和约束之上。前期梳理也是项目工作的一部分，我们不会用未经讨论的免费样稿替代判断。' },
    { title: '坚持透明、健康的商业关系', body: '我们凭专业能力和交付质量获得合作，不以回扣或隐性利益交换项目。范围、费用和关键决策都会对双方保持清晰。' }
  ],
  errors: { name: '请填写姓名。', contact: '请填写有效的手机号或邮箱。', services: '请至少选择一项服务。', privacy: '请先阅读并同意隐私政策。' },
  copied: (label) => `${label}已复制`, copyFailed: '无法自动复制，请手动选择并复制。',
  summaryLabels: ['姓名', '联系方式', '公司 / 网址', '服务', '需求']
}))

const form = reactive({ name: '', contact: '', company: '', requirements: '', services: [], privacyConsent: false })
const errors = reactive({})
const submitting = ref(false)
const submitState = ref('')
const noticeOpen = ref(false)
const noticeCloseRef = ref(null)
const heroStage = ref(null)
const heroImageViewport = ref(null)
const heroImage = ref(null)
const parallaxY = ref(0)
let revealObserver
let previousBodyOverflow = ''

const contactIsValid = (value) => {
  const trimmed = value.trim()
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return true
  if (!/^[+\d\s()-]+$/.test(trimmed)) return false
  const digits = trimmed.replace(/\D/g, '')
  return digits.length >= 7 && digits.length <= 15
}

const clearError = (key) => { delete errors[key]; submitState.value = '' }

const validate = () => {
  Object.keys(errors).forEach((key) => delete errors[key])
  if (!form.name.trim()) errors.name = copy.value.errors.name
  if (!contactIsValid(form.contact)) errors.contact = copy.value.errors.contact
  if (!form.services.length) errors.services = copy.value.errors.services
  if (!form.privacyConsent) errors.privacyConsent = copy.value.errors.privacy
  return Object.keys(errors).length === 0
}

const isContactMockPreview = () => {
  const resources = String(import.meta.env.VITE_MOCK_RESOURCES || '').split(',').map((item) => item.trim())
  return import.meta.env.MODE === 'mock-preview' && import.meta.env.VITE_ENABLE_MOCK === 'true' && resources.includes('contact')
}

const submitForm = async () => {
  submitState.value = ''
  if (!validate()) return
  submitting.value = true
  await new Promise((resolve) => window.setTimeout(resolve, 350))
  // BACKEND-TODO(B03): switch to submitInquiry only after its schema and real receipt semantics are verified.
  submitState.value = isContactMockPreview() ? 'demo' : 'unavailable'
  submitting.value = false
}

const copyText = async (value, label) => {
  try {
    await copyToClipboard(value)
    ElMessage({ type: 'success', message: copy.value.copied(label), customClass: 'app-copy-message' })
  } catch (error) {
    ElMessage({ type: 'info', message: copy.value.copyFailed, customClass: 'app-copy-message' })
  }
}

const openAiConsultation = () => router.push(aiConsultationPath.value)

const copySummary = () => {
  const labels = copy.value.summaryLabels
  const serviceLabels = copy.value.services.filter((item) => form.services.includes(item.value)).map((item) => item.label).join('、')
  const summary = [
    `${labels[0]}：${form.name.trim()}`,
    `${labels[1]}：${form.contact.trim()}`,
    `${labels[2]}：${form.company.trim() || '-'}`,
    `${labels[3]}：${serviceLabels}`,
    `${labels[4]}：${form.requirements.trim() || '-'}`
  ].join('\n')
  copyText(summary, copy.value.copySummary)
}

const openNotice = async () => {
  previousBodyOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  noticeOpen.value = true
  await nextTick()
  noticeCloseRef.value?.focus()
}

const closeNotice = () => {
  noticeOpen.value = false
  document.body.style.overflow = previousBodyOverflow
}

const handleKeydown = (event) => {
  if (event.key === 'Escape' && noticeOpen.value) closeNotice()
}

const handleScroll = () => {
  if (window.matchMedia('(max-width: 600px)').matches) {
    parallaxY.value = 0
    return
  }
  const heroRect = heroStage.value?.getBoundingClientRect()
  const imageTravel = Math.max(0, (heroImage.value?.offsetHeight || 0) - (heroImageViewport.value?.clientHeight || 0))
  // Keep the company name in the first PC viewport while preserving the upward reveal on scroll.
  const initialImageOffset = imageTravel * 0.2
  const scrollTravel = initialImageOffset + (heroRect ? Math.max(0, -heroRect.top * 0.9) : 0)
  parallaxY.value = Math.min(imageTravel, scrollTravel)
}

onMounted(() => {
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => entry.target.classList.toggle('is-visible', entry.isIntersecting))
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' })
  document.querySelectorAll('.contact-page [data-contact-reveal]').forEach((element) => revealObserver.observe(element))
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', handleScroll, { passive: true })
  window.addEventListener('keydown', handleKeydown)
  handleScroll()
})

onUnmounted(() => {
  revealObserver?.disconnect()
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleScroll)
  window.removeEventListener('keydown', handleKeydown)
  if (noticeOpen.value) document.body.style.overflow = previousBodyOverflow
})
</script>

<style scoped>
.contact-page {
  --contact-bg: #f2f1e4;
  --contact-ink: #131313;
  --contact-muted: #6e6c63;
  --contact-line: rgba(19, 19, 19, .2);
  --contact-panel: #ebe9da;
  min-height: 100vh;
  overflow: hidden;
  color: var(--contact-ink);
  background: var(--contact-bg);
}

.contact-page [data-contact-reveal] {
  opacity: 0;
  transform: translate3d(0, 42px, 0);
  transition: opacity .8s cubic-bezier(.22, .61, .36, 1), transform .8s cubic-bezier(.22, .61, .36, 1);
  will-change: opacity, transform;
}
.contact-page [data-contact-reveal].is-visible { opacity: 1; transform: translate3d(0, 0, 0); }
.contact-page [data-contact-reveal='hero'] { transition-delay: 80ms; }

.contact-shell { width: min(1329px, 90%); margin-inline: auto; }
.contact-hero { padding-top: 170px; }
.hero-copy { display: flex; justify-content: space-between; align-items: flex-start; gap: 72px; }
.hero-copy h1 { margin: 0; font-size: clamp(44px, 4.2vw, 60px); font-weight: 500; line-height: 1.67; letter-spacing: 0; }
.hero-copy h1 span { display: block; }
.hero-side { width: min(430px, 34vw); padding-top: 15px; }
.hero-side > p { margin: 0; color: var(--contact-muted); font-size: 16px; line-height: 2; }
.hero-side .cooperation-wheel { margin: 35px 0 0 165px; }

.hero-image { position: relative; height: min(37.2vw, 536px); min-height: 360px; margin-top: 74px; overflow: hidden; background: #d3d1c7; }
.hero-image img { position: absolute; left: 0; bottom: 0; display: block; width: 100%; height: auto; max-width: none; transition: transform .08s linear; will-change: transform; }

:deep(.cooperation-wheel) {
  position: relative;
  display: grid;
  place-items: center;
  width: 134px;
  height: 134px;
  padding: 0;
  color: #ff8000;
  background: #184dc4;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  font: inherit;
  transition: transform .4s ease, background-color .4s ease;
}
:deep(.cooperation-wheel:hover) { transform: scale(.9); }
:deep(.wheel-ring) { position: absolute; inset: 7px; border: 1px solid rgba(255, 255, 255, .8); border-radius: 50%; animation: wheel-spin 10s linear infinite; }
:deep(.wheel-ring i) { position: absolute; left: 50%; top: -3px; width: 4px; height: 4px; background: #fff; border-radius: 50%; transform-origin: 0 61px; }
:deep(.wheel-ring i:nth-child(2)) { transform: rotate(45deg); }
:deep(.wheel-ring i:nth-child(3)) { transform: rotate(90deg); }
:deep(.wheel-ring i:nth-child(4)) { transform: rotate(135deg); }
:deep(.wheel-ring i:nth-child(5)) { transform: rotate(180deg); }
:deep(.wheel-ring i:nth-child(6)) { transform: rotate(225deg); }
:deep(.wheel-ring i:nth-child(7)) { transform: rotate(270deg); }
:deep(.wheel-ring i:nth-child(8)) { transform: rotate(315deg); }
:deep(.wheel-label) { width: 70px; font-size: 15px; font-weight: 700; line-height: 1.3; text-align: center; }
:deep(.wheel-arrow) { position: absolute; right: 31px; bottom: 25px; font-size: 13px; }

.contact-main { display: flex; justify-content: space-between; gap: 90px; padding: 120px 0 300px; scroll-margin-top: 84px; }
.contact-details { width: min(560px, 45%); }
.section-kicker, .closing-inner > div > p, .notice-kicker { margin: 0 0 30px; color: #184dc4; font-size: 12px; font-weight: 700; letter-spacing: .18em; }
.contact-details h2 { max-width: 520px; margin: 0; font-size: clamp(38px, 4vw, 58px); font-weight: 500; line-height: 1.25; letter-spacing: 0; }
.section-intro { max-width: 520px; margin: 42px 0 0; color: var(--contact-muted); font-size: 16px; line-height: 2; }
.contact-list { margin: 84px 0 0; border-top: 1px solid var(--contact-line); }
.contact-list > div { display: grid; grid-template-columns: 130px 1fr; gap: 20px; padding: 22px 0; border-bottom: 1px solid var(--contact-line); }
.contact-list dt { color: var(--contact-muted); font-size: 13px; }
.contact-list dd { margin: 0; font-size: 15px; }
.contact-list button { padding: 0; color: inherit; background: none; border: 0; cursor: pointer; font: inherit; text-align: left; }
.contact-list button:hover { color: #184dc4; }

.inquiry-form { width: 550px; max-width: 100%; }
.field-grid { display: flex; flex-wrap: wrap; justify-content: space-between; }
.form-field { display: block; width: 48%; margin-bottom: 42px; }
.form-field.field-all { width: 100%; }
.form-field > span, .service-fieldset legend { display: block; margin-bottom: 12px; font-size: 13px; font-weight: 600; }
.form-field input, .form-field textarea { width: 100%; padding: 13px 0; color: var(--contact-ink); background: transparent; border: 0; border-bottom: 1px solid var(--contact-line); border-radius: 0; outline: none; font: inherit; font-size: 15px; resize: vertical; transition: border-color .25s ease; }
.form-field textarea { min-height: 100px; line-height: 1.7; }
.form-field input:focus, .form-field textarea:focus { border-color: #184dc4; }
.form-field input::placeholder, .form-field textarea::placeholder { color: #9c998f; }
.form-field small, .field-error { display: block; margin-top: 8px; color: #b33a2b; font-size: 12px; }
.service-fieldset { margin: 0 0 38px; padding: 0; border: 0; }
.service-options { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); border-top: 1px solid var(--contact-line); }
.service-option { display: flex; align-items: center; gap: 11px; min-height: 52px; border-bottom: 1px solid var(--contact-line); cursor: pointer; font-size: 14px; }
.service-option:nth-child(odd) { margin-right: 18px; }
.service-option input, .privacy-option input { position: absolute; opacity: 0; pointer-events: none; }
.service-option > span, .privacy-option > span[aria-hidden='true'] { flex: 0 0 auto; width: 17px; height: 17px; border: 1px solid #8f8d84; transition: background-color .2s ease, border-color .2s ease; }
.service-option input:checked + span, .privacy-option input:checked + span { background: #184dc4; border-color: #184dc4; box-shadow: inset 0 0 0 4px var(--contact-bg); }
.privacy-option { display: flex; align-items: flex-start; gap: 11px; color: var(--contact-muted); cursor: pointer; font-size: 13px; line-height: 1.5; }
.privacy-option > span[aria-hidden='true'] { margin-top: 1px; }
.privacy-option a { color: var(--contact-ink); text-underline-offset: 3px; }
.privacy-error { margin-left: 28px; }
.submit-button { display: flex; align-items: center; justify-content: space-between; width: 100%; min-height: 62px; margin-top: 36px; padding: 0 26px; color: #fff; background: #184dc4; border: 0; border-radius: 0; cursor: pointer; font: inherit; font-size: 15px; transition: background-color .3s ease, color .3s ease; }
.submit-button:hover { color: #ff8000; background: #123d9c; }
.submit-button:disabled { cursor: wait; opacity: .65; }
.submit-state { margin-top: 24px; padding: 22px; border-left: 3px solid #184dc4; background: rgba(24, 77, 196, .08); }
.submit-state strong { display: block; font-size: 14px; }
.submit-state p { margin: 8px 0 0; color: var(--contact-muted); font-size: 13px; line-height: 1.65; }
.fallback-actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
.fallback-actions button { padding: 9px 11px; color: var(--contact-ink); background: transparent; border: 1px solid var(--contact-line); cursor: pointer; font: inherit; font-size: 12px; }
.fallback-actions button:hover { color: #fff; background: #184dc4; border-color: #184dc4; }

.contact-closing { padding: 112px 0 128px; color: var(--contact-ink); background: var(--contact-bg); border-top: 1px solid var(--contact-line); }
.closing-inner { display: grid; grid-template-columns: minmax(0, 1fr) 134px; align-items: start; justify-content: space-between; gap: 60px; }
.closing-inner h2 { max-width: 920px; margin: 0; font-size: clamp(38px, 4.6vw, 68px); font-weight: 500; line-height: 1.28; letter-spacing: 0; }
.closing-inner > div > p { color: #184dc4; }
.closing-inner > .cooperation-wheel { justify-self: end; margin-top: 12px; }

.notice-overlay { position: fixed; inset: 0; z-index: 10000; display: grid; place-items: center; padding: 32px; background: rgba(24, 77, 196, .76); backdrop-filter: blur(5px); }
.notice-dialog { position: relative; width: min(1000px, 92vw); max-height: min(760px, 90vh); overflow-y: auto; padding: 68px 76px 60px; color: #131313; background: rgba(242, 241, 228, .98); }
.notice-close { position: absolute; right: 34px; top: 32px; width: 42px; height: 42px; padding: 0; background: transparent; border: 0; cursor: pointer; transition: transform .4s ease; }
.notice-close:hover { transform: rotate(180deg); }
.notice-close span { position: absolute; left: 7px; top: 20px; width: 28px; height: 1px; background: #131313; transform: rotate(45deg); }
.notice-close span + span { transform: rotate(-45deg); }
.notice-dialog h2 { margin: 0 0 38px; font-size: clamp(34px, 4vw, 52px); font-weight: 500; letter-spacing: 0; }
.notice-dialog ol { margin: 0; padding: 0; list-style: none; border-top: 1px solid rgba(19, 19, 19, .2); }
.notice-dialog li { display: grid; grid-template-columns: 56px 1fr; gap: 28px; padding: 26px 0; border-bottom: 1px solid rgba(19, 19, 19, .2); }
.notice-dialog li > span { color: #184dc4; font-size: 12px; font-weight: 700; }
.notice-dialog h3 { margin: 0; font-size: 19px; font-weight: 600; }
.notice-dialog li p { margin: 10px 0 0; color: #68665e; font-size: 14px; line-height: 1.8; }
.notice-modal-enter-active, .notice-modal-leave-active { transition: opacity .4s ease; }
.notice-modal-enter-active .notice-dialog, .notice-modal-leave-active .notice-dialog { transition: opacity .4s ease, transform .4s ease; }
.notice-modal-enter-from, .notice-modal-leave-to { opacity: 0; }
.notice-modal-enter-from .notice-dialog, .notice-modal-leave-to .notice-dialog { opacity: 0; transform: translateY(30px); }

html[data-theme='dark'] .contact-page {
  --contact-bg: #111;
  --contact-ink: #f2f1e4;
  --contact-muted: #a7a59c;
  --contact-line: rgba(242, 241, 228, .2);
  --contact-panel: #191919;
}
html[data-theme='dark'] .hero-image { background: #202020; }
html[data-theme='dark'] .hero-image img { filter: brightness(.72); }
html[data-theme='dark'] .service-option input:checked + span,
html[data-theme='dark'] .privacy-option input:checked + span { box-shadow: inset 0 0 0 4px #111; }

@keyframes wheel-spin { to { transform: rotate(360deg); } }

@media (max-width: 1024px) {
  .contact-hero { padding-top: 132px; }
  .hero-copy { flex-direction: column; gap: 42px; }
  .hero-side { width: 100%; display: grid; grid-template-columns: minmax(0, 1fr) 134px; gap: 50px; align-items: end; padding-top: 0; }
  .hero-side > p { max-width: 640px; }
  .hero-side .cooperation-wheel { margin: 0; }
  .hero-image { height: auto; aspect-ratio: 16 / 8.2; margin-top: 70px; }
  .contact-main { flex-direction: column; padding: 96px 0 220px; }
  .contact-details { width: 100%; }
  .section-intro { max-width: 680px; }
  .contact-list { max-width: 680px; margin-top: 56px; }
  .inquiry-form { width: 100%; margin-top: 24px; }
}

@media (max-width: 640px) {
  .contact-shell { width: calc(100% - 40px); }
  .contact-hero { padding-top: 108px; }
  .hero-copy h1 { font-size: 38px; line-height: 1.4; }
  .hero-side { display: flex; flex-direction: column; align-items: flex-start; gap: 28px; }
  .hero-side > p { font-size: 14px; line-height: 1.85; }
  .hero-side :deep(.cooperation-wheel) { width: 114px; height: 114px; }
  .hero-side :deep(.wheel-ring) { inset: 7px; }
  .hero-side :deep(.wheel-ring i) { transform-origin: 0 51px; }
  .hero-side :deep(.wheel-ring i:nth-child(2)) { transform: rotate(45deg); }
  .hero-side :deep(.wheel-ring i:nth-child(3)) { transform: rotate(90deg); }
  .hero-side :deep(.wheel-ring i:nth-child(4)) { transform: rotate(135deg); }
  .hero-side :deep(.wheel-ring i:nth-child(5)) { transform: rotate(180deg); }
  .hero-side :deep(.wheel-ring i:nth-child(6)) { transform: rotate(225deg); }
  .hero-side :deep(.wheel-ring i:nth-child(7)) { transform: rotate(270deg); }
  .hero-side :deep(.wheel-ring i:nth-child(8)) { transform: rotate(315deg); }
  .hero-image { height: auto; min-height: 0; aspect-ratio: 4 / 3; margin-top: 40px; }
  .hero-image img { position: static; width: 100%; height: 100%; object-fit: cover; object-position: center; transform: none !important; }
  .contact-main { gap: 68px; padding: 76px 0 150px; }
  .contact-details h2 { font-size: 36px; }
  .section-intro { margin-top: 30px; font-size: 14px; }
  .contact-list { margin-top: 44px; }
  .contact-list > div { grid-template-columns: 84px 1fr; padding: 18px 0; }
  .contact-list dd { min-width: 0; overflow-wrap: anywhere; }
  .form-field { width: 100%; margin-bottom: 30px; }
  .service-options { grid-template-columns: 1fr; }
  .service-option:nth-child(odd) { margin-right: 0; }
  .contact-closing { padding: 80px 0 92px; }
  .closing-inner { display: flex; flex-direction: column; align-items: flex-start; gap: 36px; }
  .closing-inner h2 { font-size: 36px; }
  .closing-inner :deep(.cooperation-wheel) { flex-basis: 104px; width: 104px; height: 104px; }
  .closing-inner :deep(.wheel-label) { font-size: 13px; }
  .closing-inner :deep(.wheel-arrow) { right: 23px; bottom: 18px; }
  .closing-inner :deep(.wheel-ring i) { transform-origin: 0 46px; }
  .notice-overlay { padding: 14px; }
  .notice-dialog { width: 100%; max-height: 92vh; padding: 58px 24px 32px; }
  .notice-close { right: 16px; top: 14px; }
  .notice-dialog li { grid-template-columns: 34px 1fr; gap: 12px; }
}

@media (prefers-reduced-motion: reduce) {
  .contact-page [data-contact-reveal], .contact-page [data-contact-reveal].is-visible { opacity: 1; transform: none; transition: none; }
  .hero-image img { transition: none; transform: none !important; }
  :deep(.wheel-ring) { animation: none; }
  :deep(.cooperation-wheel), .notice-close, .notice-modal-enter-active, .notice-modal-leave-active,
  .notice-modal-enter-active .notice-dialog, .notice-modal-leave-active .notice-dialog { transition: none; }
}
</style>

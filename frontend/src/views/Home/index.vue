<template>
  <main class="yz-home">
    <section class="yz-hero">
      <video class="yz-hero-video" autoplay muted loop playsinline preload="metadata" aria-hidden="true">
        <source src="/yunzhan-hero-mobile-v3.mp4" type="video/mp4" />
      </video>
      <div class="yz-hero-shade"></div>
      <div class="yz-hero-content yz-wrap">
        <p class="yz-eyebrow">YUNZHAN TECHNOLOGY / BEIJING</p>
        <p class="yz-hero-positioning">AI 应用与数字化产品服务商</p>
        <h1>{{ slides[activeSlide].title }}</h1>
        <p class="yz-hero-description">{{ slides[activeSlide].description }}</p>
        <div class="yz-hero-services" aria-label="核心服务">
          <span>AI 应用</span>
          <span>企业软件</span>
          <span>小程序与 App</span>
          <span>品牌网站</span>
        </div>
        <router-link class="yz-hero-link" :to="slides[activeSlide].path">{{ slides[activeSlide].action }} <span>↗</span></router-link>
      </div>
      <div class="yz-slide-nav yz-wrap" aria-label="首屏内容切换">
        <button v-for="(slide, index) in slides" :key="slide.label" :class="{ active: activeSlide === index }" type="button" @click="selectSlide(index)">
          <span>0{{ index + 1 }}</span><b>{{ slide.label }}</b>
        </button>
      </div>
      <span class="yz-scroll-cue">SCROLL TO EXPLORE</span>
    </section>

    <section ref="introSection" class="yz-intro yz-reveal">
      <div class="yz-wrap yz-intro-grid">
        <div class="yz-intro-side"><p class="yz-section-tag">01 / INTRODUCTION</p><span>BUILD WITH<br>PURPOSE</span></div>
        <div>
          <h2>做有分量的<br>数字化产品。</h2>
          <p>耘栈科技专注 AI 应用、企业软件、移动产品与品牌网站建设。我们用策略定义方向，用设计建立体验，用工程把想法长期落地。</p>
          <div class="yz-intro-focus"><span>AI 与业务共建</span><span>产品全链路交付</span><span>长期技术伙伴</span></div>
          <router-link to="/about">认识耘栈 <span>↗</span></router-link>
        </div>
      </div>
      <div class="yz-intro-line yz-wrap"><span>2015 - NOW</span><span>200+ PROJECTS</span><span>LONG-TERM PARTNERSHIP</span></div>
    </section>

    <section ref="workSection" class="yz-work yz-reveal">
      <div class="yz-work-head yz-wrap"><p class="yz-section-tag">02 / SELECTED WORK</p><h2>以真实成果<br>回应每一次托付。</h2><router-link to="/cases">全部案例 ↗</router-link></div>
      <div class="yz-work-grid yz-wrap">
        <router-link v-for="item in workItems" :key="item.title" to="/cases" class="yz-work-card">
          <div><span>{{ item.type }}</span><h3>{{ item.title }}</h3><p>{{ item.text }}</p></div>
        </router-link>
      </div>
    </section>

    <section ref="serviceSection" class="yz-services yz-reveal">
      <div class="yz-wrap yz-services-head"><p class="yz-section-tag">03 / CAPABILITIES</p><h2>从品牌表达，<br>到业务生长。</h2></div>
      <div class="yz-service-list yz-wrap">
        <router-link v-for="(service, index) in services" :key="service.title" :to="service.path">
          <span>0{{ index + 1 }}</span><h3>{{ service.title }}</h3><p>{{ service.text }}</p><b>↗</b>
        </router-link>
      </div>
    </section>

    <section ref="contactSection" class="yz-contact yz-reveal">
      <div class="yz-wrap"><p class="yz-section-tag">04 / START A PROJECT</p><h2>把你的想法，<br>变成真正被使用的产品。</h2><p class="yz-contact-copy">告诉我们您正在面对的业务问题，我们会在理解目标后给出清晰的下一步建议。</p><router-link to="/ai-consultation">开始沟通 <span>↗</span></router-link></div>
    </section>
  </main>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const activeSlide = ref(0)
let slideTimer
let revealObserver
const slides = [
  { label: 'DIGITAL PRODUCT', title: '专注高端数字化产品建设', description: 'AI 应用、企业软件、移动产品与品牌网站，围绕真实业务构建长期价值。', action: '探索服务', path: '/ai-development' },
  { label: 'AI SOLUTIONS', title: '让智能能力，进入真实业务。', description: '从知识库、智能体到工作流应用，帮助组织把 AI 转化为稳定的生产力。', action: '了解 AI 开发', path: '/ai-development' },
  { label: 'BRAND EXPERIENCE', title: '让品牌在数字世界，被清楚地看见。', description: '以体验、内容和技术形成一致的品牌表达，建立值得信任的第一印象。', action: '查看案例', path: '/cases' }
]
const workItems = [
  { type: 'AI PRODUCT', title: '企业智能知识服务', text: '让复杂知识被准确检索、理解与调用。' },
  { type: 'DIGITAL PLATFORM', title: '业务数字化协同平台', text: '贯通流程、数据与组织协作。' },
  { type: 'MOBILE EXPERIENCE', title: '面向用户的移动服务', text: '在每一个关键触点建立顺畅体验。' }
]
const services = [
  { title: 'AI 应用开发', text: '智能体、知识库与业务工作流。', path: '/ai-development' },
  { title: '企业软件定制', text: '系统、数据与组织协同能力。', path: '/custom-development' },
  { title: '移动产品研发', text: '小程序与 App 的完整体验。', path: '/app-development' },
  { title: '品牌网站建设', text: '高端官网与品牌数字表达。', path: '/web-development' }
]
const selectSlide = index => {
  activeSlide.value = index
  restartTimer()
}
const restartTimer = () => {
  window.clearInterval(slideTimer)
  slideTimer = window.setInterval(() => { activeSlide.value = (activeSlide.value + 1) % slides.length }, 7000)
}
onMounted(() => {
  restartTimer()
  revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target) }
  }), { threshold: .16 })
  document.querySelectorAll('.yz-reveal').forEach(node => revealObserver.observe(node))
})
onUnmounted(() => { window.clearInterval(slideTimer); revealObserver?.disconnect() })
</script>

<style scoped>
.yz-home{--orange:#f26b24;--ink:#111;--mist:#f0f0ed;color:var(--ink);background:#fff;overflow:hidden}.yz-wrap{width:min(calc(100% - 96px),1320px);margin:0 auto}.yz-hero{height:100svh;min-height:720px;position:relative;display:flex;align-items:flex-end;isolation:isolate;background:var(--hero-image) center/cover no-repeat;transition:background-image .7s ease}.yz-hero-video{position:absolute;inset:0;z-index:-2;width:100%;height:100%;object-fit:cover;mix-blend-mode:luminosity;opacity:.44;filter:contrast(1.08) saturate(.55)}.yz-hero-shade{position:absolute;inset:0;z-index:-1;background:linear-gradient(90deg,rgba(5,6,7,.76),rgba(5,6,7,.23) 70%),linear-gradient(0deg,rgba(5,6,7,.6),transparent 48%)}.yz-hero-content{padding-bottom:22vh;color:#fff}.yz-eyebrow,.yz-section-tag{font-size:10px;font-weight:800;letter-spacing:.22em}.yz-eyebrow{color:var(--orange)}.yz-hero h1{max-width:960px;margin:30px 0 24px;font-size:clamp(58px,6vw,102px);font-weight:650;letter-spacing:-.055em;line-height:.96}.yz-hero-description{max-width:470px;color:rgba(255,255,255,.78);font-size:15px;line-height:1.9}.yz-hero-link{display:flex;align-items:center;justify-content:space-between;width:210px;margin-top:38px;padding-bottom:10px;color:#fff;border-bottom:1px solid rgba(255,255,255,.75);font-size:13px;font-weight:700;text-decoration:none}.yz-hero-link span{color:var(--orange);font-size:19px}.yz-slide-nav{position:absolute;z-index:1;bottom:38px;left:50%;display:grid;grid-template-columns:repeat(3,1fr);gap:26px;transform:translateX(-50%)}.yz-slide-nav button{padding:12px 0 0;color:rgba(255,255,255,.54);background:transparent;border:0;border-top:1px solid rgba(255,255,255,.3);font:inherit;text-align:left;cursor:pointer}.yz-slide-nav button.active{color:#fff;border-top-color:var(--orange)}.yz-slide-nav span{display:block;color:var(--orange);font-size:10px}.yz-slide-nav b{display:block;margin-top:7px;font-size:10px;letter-spacing:.12em}.yz-scroll-cue{position:absolute;right:34px;bottom:48px;color:rgba(255,255,255,.62);font-size:9px;letter-spacing:.18em;writing-mode:vertical-rl}.yz-intro{padding:150px 0 0;background:#fff}.yz-intro-grid{display:grid;grid-template-columns:.68fr 2.32fr;gap:8vw}.yz-section-tag{color:#777}.yz-intro h2,.yz-work h2,.yz-services h2,.yz-contact h2{margin:0;font-size:clamp(48px,5.6vw,82px);font-weight:620;letter-spacing:-.06em;line-height:1.06}.yz-intro-grid>div>p{max-width:600px;margin:46px 0 0 auto;color:#6a6a6a;line-height:2}.yz-intro-grid a{display:inline-flex;gap:35px;margin:40px 0 0 calc(100% - 600px);padding-bottom:8px;color:#111;border-bottom:1px solid #111;font-size:13px;font-weight:700;text-decoration:none}.yz-intro-grid a span{color:var(--orange)}.yz-intro-line{display:flex;justify-content:space-between;margin-top:120px;padding:23px 0;border-top:1px solid #ccc;color:#777;font-size:10px;letter-spacing:.16em}.yz-work{padding:140px 0;background:#141414;color:#fff}.yz-work-head{display:grid;grid-template-columns:.68fr 1.4fr .6fr;gap:8vw;align-items:end;margin-bottom:68px}.yz-work .yz-section-tag{color:var(--orange)}.yz-work h2{font-size:clamp(48px,5.1vw,76px)}.yz-work-head>a{padding-bottom:9px;color:#fff;border-bottom:1px solid #777;font-size:13px;font-weight:700;text-decoration:none}.yz-work-grid{display:grid;grid-template-columns:1.35fr 1fr 1fr;gap:14px}.yz-work-card{position:relative;min-height:540px;overflow:hidden;background:#292929;color:#fff;text-decoration:none}.yz-work-card:first-child{min-height:620px}.yz-work-card img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:saturate(.65);transition:transform .8s cubic-bezier(.2,.65,.2,1),filter .5s ease}.yz-work-card::after{content:'';position:absolute;inset:0;background:linear-gradient(0deg,rgba(0,0,0,.85),transparent 65%)}.yz-work-card:hover img{transform:scale(1.07);filter:saturate(.95)}.yz-work-card>div{position:absolute;z-index:1;right:30px;bottom:30px;left:30px}.yz-work-card span{color:var(--orange);font-size:9px;font-weight:800;letter-spacing:.16em}.yz-work-card h3{margin:12px 0 10px;font-size:25px}.yz-work-card p{margin:0;color:rgba(255,255,255,.7);font-size:13px;line-height:1.7}.yz-services{padding:135px 0;background:var(--mist)}.yz-services-head{display:grid;grid-template-columns:.68fr 2.32fr;gap:8vw;margin-bottom:72px}.yz-services .yz-section-tag{color:var(--orange)}.yz-service-list{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid #aaa}.yz-service-list a{min-height:330px;padding:28px 28px 24px;display:flex;flex-direction:column;color:#111;border-right:1px solid #bdbdb9;text-decoration:none;transition:color .35s ease,background .35s ease}.yz-service-list a:last-child{border:0}.yz-service-list a:hover{background:var(--orange)}.yz-service-list span{color:var(--orange);font-size:11px;font-weight:700}.yz-service-list a:hover span{color:#111}.yz-service-list h3{margin:105px 0 12px;font-size:22px}.yz-service-list p{color:#777;font-size:14px;line-height:1.8}.yz-service-list a:hover p{color:rgba(0,0,0,.65)}.yz-service-list b{margin-top:auto;font-size:20px}.yz-contact{padding:140px 0;background:var(--orange)}.yz-contact .yz-section-tag{color:#111}.yz-contact h2{max-width:930px;margin-top:27px;font-size:clamp(52px,6vw,92px)}.yz-contact-copy{max-width:580px;margin:36px 0 0 auto;line-height:1.9}.yz-contact a{display:flex;align-items:center;justify-content:space-between;width:210px;margin:42px 0 0 auto;padding-bottom:10px;color:#fff;border-bottom:1px solid #111;font-size:13px;font-weight:700;text-decoration:none}.yz-contact a span{color:#111;font-size:20px}.yz-reveal{opacity:0;transform:translateY(52px);transition:opacity .8s ease,transform .9s cubic-bezier(.2,.65,.2,1)}.yz-reveal.is-visible{opacity:1;transform:none}@media(max-width:800px){.yz-wrap{width:calc(100% - 40px)}.yz-hero{min-height:650px}.yz-hero-content{padding-bottom:145px}.yz-hero h1{margin:22px 0 18px;font-size:49px}.yz-hero-description{font-size:14px}.yz-slide-nav{right:20px;bottom:22px;left:20px;gap:9px;transform:none}.yz-slide-nav b{font-size:8px}.yz-scroll-cue{display:none}.yz-intro{padding-top:86px}.yz-intro-grid,.yz-work-head,.yz-services-head{grid-template-columns:1fr;gap:32px}.yz-intro h2,.yz-work h2,.yz-services h2{font-size:43px}.yz-intro-grid>div>p{margin:32px 0 0}.yz-intro-grid a{margin:32px 0 0}.yz-intro-line{display:grid;gap:17px;margin-top:72px}.yz-work,.yz-services,.yz-contact{padding:85px 0}.yz-work-head{margin-bottom:42px}.yz-work-grid{grid-template-columns:1fr;gap:12px}.yz-work-card,.yz-work-card:first-child{min-height:410px}.yz-service-list{grid-template-columns:1fr}.yz-service-list a{min-height:220px;border-right:0;border-bottom:1px solid #bdbdb9}.yz-service-list h3{margin-top:45px}.yz-contact h2{font-size:48px}.yz-contact-copy{margin:30px 0 0}.yz-contact a{margin:36px 0 0}@media(prefers-reduced-motion:reduce){.yz-work-card img,.yz-reveal{transition:none}.yz-reveal{opacity:1;transform:none}}}
.yz-hero{background:#101010!important;transition:none}.yz-hero-video{z-index:-2;mix-blend-mode:normal;opacity:1;filter:contrast(1.03) saturate(.72)}.yz-hero-shade{background:linear-gradient(90deg,rgba(0,0,0,.7),rgba(0,0,0,.2) 70%),linear-gradient(0deg,rgba(0,0,0,.62),transparent 48%)}.yz-work-card{min-height:360px!important;background:#242424}.yz-work-card:first-child{background:#353535}.yz-work-card:nth-child(2){background:#1c1c1c}.yz-work-card:nth-child(3){background:#2c2c2c}.yz-work-card img,.yz-work-card::after{display:none}.yz-work-card>div{top:30px;bottom:auto}.yz-work-card h3{margin-top:150px;font-size:30px}.yz-work-card p{max-width:250px}.yz-service-list a:hover{color:#111;background:#ddd}.yz-service-list a:hover span{color:#555}.yz-service-list a:hover p{color:#555}.yz-contact{background:#171717;color:#fff}.yz-contact .yz-section-tag,.yz-contact a span{color:#aaa}.yz-contact h2{color:#fff}.yz-contact-copy{color:#aaa}.yz-contact a{color:#fff;border-bottom-color:#888}@media(max-width:800px){.yz-hero-video{object-position:center;opacity:.9}.yz-work-card h3{margin-top:100px}}

.yz-hero-positioning {
  margin: 18px 0 -7px;
  color: rgba(255,255,255,.92);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: .1em;
}

.yz-hero-services {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 18px;
  margin-top: 18px;
  color: rgba(255,255,255,.88);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .08em;
}

.yz-hero-services span {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.yz-hero-services span::before {
  width: 4px;
  height: 4px;
  content: '';
  background: var(--orange);
  border-radius: 50%;
}

.yz-hero-link { margin-top: 28px; }

@media (max-width: 800px) {
  .yz-hero-positioning { margin-top: 15px; font-size: 11px; }
  .yz-hero-services { gap: 7px 13px; margin-top: 14px; font-size: 10px; }
}
.yz-intro{padding:112px 0 0}.yz-intro-grid{grid-template-columns:.76fr 2.24fr;gap:8vw;align-items:start}.yz-intro-side{display:flex;flex-direction:column;justify-content:space-between;min-height:330px}.yz-intro-side>span{color:#111;font-size:21px;font-weight:700;letter-spacing:.03em;line-height:1.15}.yz-intro h2{max-width:760px;font-size:clamp(56px,5.1vw,78px)}.yz-intro-grid>div>p{max-width:570px;margin:34px 0 0;color:#5f5f5f;font-size:15px}.yz-intro-focus{display:flex;flex-wrap:wrap;gap:10px 24px;max-width:600px;margin:30px 0 0;padding-top:17px;border-top:1px solid #c8c8c4}.yz-intro-focus span{color:#222;font-size:12px;font-weight:700}.yz-intro-focus span::before{margin-right:8px;color:var(--orange);content:'+'}.yz-intro-grid a{margin:32px 0 0}.yz-intro-line{margin-top:84px}@media(max-width:800px){.yz-intro{padding-top:84px}.yz-intro-side{min-height:0;gap:22px}.yz-intro h2{font-size:46px}.yz-intro-focus{display:grid;gap:13px;margin-top:26px}.yz-intro-line{margin-top:62px}}
</style>

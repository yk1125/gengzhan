<template>
  <main class="about-page">
    <section class="about-hero">
      <video autoplay muted loop playsinline preload="auto"><source src="/yunzhan-hero.mp4" type="video/mp4" /></video><div class="shade"></div>
      <div class="shell hero-copy"><span>ABOUT YUNZHAN</span><h1>技术有尺度，<br>合作有温度。</h1><p>我们是耘栈科技，一支专注数字产品设计与研发的长期主义团队。</p></div>
    </section>
    <section class="manifesto shell">
      <div class="label">01 / WHO WE ARE</div>
      <div><h2>不追逐短暂的热闹，<br>只打造真正经得起使用的产品。</h2><p>北京耘栈科技成立于 2015 年，为企业提供 AI 应用、小程序、App、品牌官网与业务系统建设。我们从业务本身出发，把策略、设计与工程放在同一张桌上，让每一次交付都清晰、可靠并能够持续生长。</p></div>
    </section>
    <section class="stats"><div class="shell stats-grid"><div v-for="item in stats" :key="item.label"><strong>{{ item.value }}</strong><span>{{ item.label }}</span></div></div></section>
    <section class="beliefs shell">
      <div class="section-head"><span>02 / OUR BELIEFS</span><h2>我们相信的事</h2></div>
      <div class="belief-grid"><article v-for="(item,index) in beliefs" :key="item.title"><b>0{{ index + 1 }}</b><h3>{{ item.title }}</h3><p>{{ item.text }}</p></article></div>
    </section>
    <section class="quality">
      <div class="shell quality-grid"><div class="quality-copy"><span>03 / QUALITY</span><h2>专业，不止体现在最终画面。</h2><p>从需求定义、原型验证到研发、测试和上线维护，每个阶段都有明确标准。CMMI 3 级认证，是成熟研发管理能力的一项证明，也是我们对交付质量的长期要求。</p><div><b>CMMI 3</b><small>软件研发成熟度认证</small></div></div></div>
    </section>
    <section class="contact"><div class="shell"><span>CONTACT US</span><h2>一起做一些<br>值得长期使用的事。</h2><div class="contact-row"><a href="mailto:yunzhan1129@163.com">yunzhan1129@163.com ↗</a><p>微信 YunzhanKk<br>北京市昌平区</p></div></div></section>
  </main>
</template>

<script setup>
const stats = [{ value:'10+',label:'年行业经验' },{ value:'200+',label:'企业客户' },{ value:'98%',label:'客户满意度' },{ value:'24/7',label:'技术支持' }]
const beliefs = [
  { title:'先理解，再创造',text:'先看清业务目标、用户与约束，再定义正确的产品问题。' },
  { title:'设计与技术并行',text:'体验和工程从一开始就共同参与，让创意真正能够落地。' },
  { title:'过程保持透明',text:'明确范围、节奏和决策依据，让合作始终建立在信任之上。' },
  { title:'为长期负责',text:'不止关注上线时刻，也为产品后续运营与迭代留下空间。' }
]
</script>

<style scoped>
.about-page{--o:#f06a21;color:#111;background:#fff}.shell{width:min(calc(100% - 80px),1240px);margin:auto}.about-hero{height:min(800px,90vh);min-height:650px;position:relative;display:flex;align-items:flex-end;color:#fff;overflow:hidden}.about-hero video,.shade{position:absolute;inset:0;width:100%;height:100%}.about-hero video{object-fit:cover}.shade{background:linear-gradient(90deg,rgba(0,0,0,.78),rgba(0,0,0,.12))}.hero-copy{position:relative;padding-bottom:85px}.hero-copy>span,.section-head span,.quality-copy>span,.contact>div>span{color:var(--o);font-size:10px;font-weight:800;letter-spacing:.2em}.hero-copy h1{margin:25px 0 22px;font-size:clamp(62px,7vw,102px);line-height:.94;letter-spacing:-.06em}.hero-copy p{color:#ccc}.manifesto{padding:145px 0;display:grid;grid-template-columns:.65fr 2.35fr;gap:8vw}.label{color:#777;font-size:10px;letter-spacing:.18em}.manifesto h2{margin:0;font-size:clamp(43px,5vw,70px);line-height:1.13;letter-spacing:-.055em}.manifesto p{max-width:650px;margin:45px 0 0 auto;color:#666;font-size:16px;line-height:2}.stats{background:#141414;color:#fff}.stats-grid{display:grid;grid-template-columns:repeat(4,1fr)}.stats-grid>div{height:280px;padding:42px 30px;border-right:1px solid #444;display:flex;flex-direction:column;justify-content:space-between}.stats-grid>div:last-child{border:0}.stats strong{font-size:clamp(48px,5vw,72px);letter-spacing:-.05em}.stats span{color:#999;font-size:12px}.beliefs{padding:135px 0}.section-head{margin-bottom:65px}.section-head h2{margin:20px 0;font-size:clamp(48px,6vw,80px);letter-spacing:-.055em}.belief-grid{display:grid;grid-template-columns:repeat(2,1fr);border-top:1px solid #aaa}.belief-grid article{min-height:280px;padding:30px;border-bottom:1px solid #bbb}.belief-grid article:nth-child(odd){border-right:1px solid #bbb}.belief-grid b{color:var(--o);font-size:11px}.belief-grid h3{margin:70px 0 15px;font-size:26px}.belief-grid p{max-width:470px;color:#777;line-height:1.8}.quality{padding:130px 0;background:#f1f1ee}.quality-grid{display:grid;grid-template-columns:1.2fr .8fr;gap:80px;align-items:center}.quality-image{height:650px}.quality-image img{width:100%;height:100%;object-fit:cover;filter:saturate(.7)}.quality-copy h2{margin:30px 0;font-size:clamp(42px,4.5vw,65px);line-height:1.12;letter-spacing:-.05em}.quality-copy p{color:#666;line-height:1.9}.quality-copy>div{margin-top:65px;padding-top:25px;border-top:1px solid #aaa;display:flex;align-items:end;gap:20px}.quality-copy b{font-size:42px}.quality-copy small{padding-bottom:7px;color:#777}.contact{padding:120px 0;background:var(--o)}.contact>div>span{color:#111}.contact h2{margin:25px 0 60px;font-size:clamp(52px,7vw,92px);line-height:1;letter-spacing:-.06em}.contact-row{display:flex;justify-content:space-between;align-items:end;border-top:1px solid rgba(0,0,0,.45);padding-top:28px}.contact-row a{color:#111;font-weight:800;font-size:18px}.contact-row p{margin:0;line-height:1.8;text-align:right}@media(max-width:800px){.shell{width:calc(100% - 40px)}.about-hero{min-height:560px;height:78vh}.hero-copy{padding-bottom:58px}.hero-copy h1{font-size:56px}.manifesto{padding:85px 0;grid-template-columns:1fr;gap:35px}.manifesto h2{font-size:39px}.manifesto p{margin-top:35px}.stats-grid{grid-template-columns:repeat(2,1fr)}.stats-grid>div{height:190px;border-bottom:1px solid #444}.beliefs{padding:85px 0}.belief-grid{grid-template-columns:1fr}.belief-grid article,.belief-grid article:nth-child(odd){min-height:230px;border-right:0}.belief-grid h3{margin-top:48px}.quality{padding:85px 0}.quality-grid{grid-template-columns:1fr;gap:45px}.quality-image{height:auto;aspect-ratio:4/3}.quality-copy h2{font-size:40px}.contact{padding:85px 0}.contact h2{font-size:48px}.contact-row{display:block}.contact-row p{margin-top:28px;text-align:left}}
@media(max-width:800px){.shade{background:rgba(0,0,0,.5)}}
.quality-grid{grid-template-columns:1fr!important}.quality-copy{max-width:780px;margin-left:auto}.quality-image{display:none}.contact{background:#171717}.contact>div>span{color:#999}.contact h2,.contact-row a,.contact-row p{color:#fff}.contact-row{border-top-color:#555}
</style>

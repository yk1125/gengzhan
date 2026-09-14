<template>
  <footer
    class="footer corporate-footer"
    :class="{ 'footer-home': isHome }"
  >
    <div class="footer-container corporate-footer-container">
      <div class="corporate-footer-main">
        <section class="corporate-footer-brand">
          <div class="corporate-footer-logo">
            <img src="/logo-new.png" alt="北京耘栈科技" />
            <div><strong>耘栈科技</strong><span>YUNZHAN TECHNOLOGY</span></div>
          </div>
          <p>面向企业提供 AI 应用、数字化产品与软件研发服务，以工程化能力支持业务持续增长。</p>
          <button type="button" class="corporate-wechat" @click="copyToClipboard('YunZhanKk', '微信号')">
            <el-icon><ChatDotRound /></el-icon><span>微信咨询：YunZhanKk</span>
          </button>
        </section>

        <div class="corporate-footer-links">
          <nav class="corporate-footer-column" aria-label="产品与服务">
            <h3>产品与服务</h3>
            <router-link to="/ai-development">AI 应用开发</router-link>
            <router-link to="/custom-development">企业软件定制</router-link>
            <router-link to="/miniprogram-development">小程序开发</router-link>
            <router-link to="/app-development">App 开发</router-link>
            <router-link to="/web-development">网站建设</router-link>
          </nav>

          <nav class="corporate-footer-column" aria-label="解决方案">
            <h3>解决方案</h3>
            <router-link to="/ai-development">智能知识服务</router-link>
            <router-link to="/custom-development">业务协同平台</router-link>
            <router-link to="/app-development">移动服务产品</router-link>
            <router-link to="/web-development">企业品牌门户</router-link>
          </nav>

          <nav class="corporate-footer-column corporate-footer-about" aria-label="了解耘栈">
            <h3>了解耘栈</h3>
            <router-link to="/cases">公司案例</router-link>
            <router-link to="/news">行业资讯</router-link>
            <router-link to="/about">关于我们</router-link>
            <router-link to="/custom-development">合作咨询</router-link>
          </nav>
        </div>

        <section class="corporate-footer-column corporate-contact">
          <h3>联系我们</h3>
          <button type="button" @click="copyToClipboard('YunZhanKk', '微信号')"><el-icon><ChatDotRound /></el-icon>YunZhanKk</button>
          <button type="button" @click="copyToClipboard('yunzhan1129@163.com', '邮箱')"><el-icon><Message /></el-icon>yunzhan1129@163.com</button>
          <p><el-icon><Location /></el-icon>北京市昌平区</p>
        </section>
      </div>

      <div class="corporate-footer-bottom">
        <div class="corporate-footer-entries">
          <span>服务入口</span>
          <router-link to="/ai-development">AI 开发</router-link>
          <router-link to="/miniprogram-development">小程序</router-link>
          <router-link to="/app-development">App 开发</router-link>
          <router-link to="/web-development">网站开发</router-link>
        </div>
        <div class="corporate-footer-legal">
          <div class="legal-copyright"><span>版权所有 © 2026 北京耘栈科技</span><span>保留一切权利</span></div>
          <div class="legal-links"><router-link to="/privacy-policy">隐私政策</router-link><router-link to="/legal-statement">法律声明</router-link></div>
          <span class="legal-record">京ICP备2026012678号</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { ChatDotRound, Location, Message } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const route = useRoute()
/** 首页（中英两个路由）走参考站的米色 footer；其余页面沿用深色收尾
    （调色板见 style.css 的 --footer-*）。英文站首页是独立路由 /en，必须一起命中。 */
const isHome = computed(() => route.path === '/' || route.path === '/en')

const copyToClipboard = async (text, type) => {
  try {
    await navigator.clipboard.writeText(text)
    ElMessage.success(`${type}已复制：${text}`)
  } catch (error) {
    ElMessage.error(`复制失败，请手动添加：${text}`)
  }
}
</script>

<style scoped>
.corporate-footer { margin-top: 0; background: #fff; color: #334155; border-top: 1px solid #e4e9ef; }
.corporate-footer-container { width: min(100% - 64px, 1360px); max-width: 1360px; margin: 0 auto; padding: 68px 0 26px; }
.corporate-footer-main { display: grid; grid-template-columns: minmax(250px, 1.2fr) minmax(430px, 2fr) minmax(180px, .8fr); gap: 42px; }
.corporate-footer-links { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 28px; }
.corporate-footer-brand { max-width: 290px; }
.corporate-footer-logo { display: flex; align-items: center; gap: 12px; }
.corporate-footer-logo img { width: 46px; height: 46px; object-fit: contain; }
.corporate-footer-logo strong { display: block; color: #182a46; font-size: 19px; line-height: 1.15; }
.corporate-footer-logo span { display: block; margin-top: 4px; color: #8592a3; font-size: 8px; font-weight: 700; letter-spacing: .12em; }
.corporate-footer-brand > p { margin: 22px 0 20px; color: #6d7b8b; font-size: 14px; line-height: 1.8; }
.corporate-wechat { display: inline-flex; align-items: center; gap: 7px; padding: 0; color: var(--footer-icon, #214c9b); background: transparent; border: 0; font: inherit; font-size: 13px; font-weight: 700; cursor: pointer; }
.corporate-wechat:hover { color: #102c67; }
.corporate-footer-column { display: grid; align-content: start; gap: 15px; }
.corporate-footer-column h3 { margin: 0 0 6px; color: #1e2f48; font-size: 14px; font-weight: 800; }
.corporate-footer-column a, .corporate-contact :is(button, p) { margin: 0; color: #697889; background: transparent; border: 0; text-align: left; text-decoration: none; font: inherit; font-size: 14px; line-height: 1.5; }
.corporate-footer-column a:hover, .corporate-contact button:hover { color: var(--footer-link-hover, #1f55bf); }
.corporate-contact button { display: flex; align-items: center; gap: 7px; padding: 0; cursor: pointer; }
.corporate-contact p { display: flex; align-items: center; gap: 7px; }
.corporate-contact :deep(.el-icon) { color: var(--footer-icon, #315fba); }
.corporate-footer-bottom { margin-top: 58px; padding-top: 22px; border-top: 1px solid #e6ebf1; }
.corporate-footer-entries, .corporate-footer-legal { display: flex; flex-wrap: wrap; align-items: center; gap: 10px 16px; }
.corporate-footer-entries { color: #8090a1; font-size: 12px; }
.corporate-footer-entries span { color: #516174; font-weight: 700; }
.corporate-footer-entries a { color: #718092; text-decoration: none; }
.corporate-footer-entries a:hover { color: var(--footer-link-hover, #1f55bf); }
.corporate-footer-legal { margin-top: 14px; color: #98a3b0; font-size: 12px; }
.legal-copyright, .legal-links { display: inline-flex; flex-wrap: wrap; align-items: center; gap: 10px 16px; }
.legal-links a { color: inherit; text-decoration: none; }
.legal-links a + a::before { content: ''; display: inline-block; width: 1px; height: 11px; margin-right: 16px; vertical-align: -1px; background: var(--footer-line, #dce3eb); }
.legal-record::before { content: ''; display: inline-block; width: 1px; height: 11px; margin-right: 16px; vertical-align: -1px; background: var(--footer-line, #dce3eb); }
/* logo-new.png 是白底方图（无 alpha），落在米色底上会显成一个白方块；
   multiply 让白底融进底色，只作用于首页 footer；暗色模式下 footer 仍是深色，不能 multiply。 */
html:not([data-theme='dark']) .footer-home .corporate-footer-logo img { mix-blend-mode: multiply; }
/* ---- 首页 footer 排版（仅浅色模式；暗色模式与内页一致走深色收尾）：对齐参考站的尺度（参考站 sources/style.css:911-915
   `.footer .wrap { width:1640px; margin:146px auto 111px; max-width:90% }`，
   正文 18/32、tel 19/45、链接 14/28）。只在 >=981px 生效，<=980 / <=640 沿用下面
   既有断点，避免与移动端字号打架。 ---- */
@media (min-width: 981px) {
  html:not([data-theme='dark']) .footer-home .corporate-footer-main { gap: 56px; }
  html:not([data-theme='dark']) .footer-home .corporate-footer-brand { max-width: 330px; }
  html:not([data-theme='dark']) .footer-home .corporate-footer-logo img { width: 56px; height: 56px; }
  html:not([data-theme='dark']) .footer-home .corporate-footer-logo strong { font-size: 30px; line-height: 1.1; letter-spacing: .01em; }
  html:not([data-theme='dark']) .footer-home .corporate-footer-logo span { margin-top: 7px; font-size: 9px; letter-spacing: .3em; }
  html:not([data-theme='dark']) .footer-home .corporate-footer-brand > p { margin: 26px 0 22px; font-size: 15px; line-height: 1.9; }
  html:not([data-theme='dark']) .footer-home .corporate-wechat { font-size: 14px; }
  html:not([data-theme='dark']) .footer-home .corporate-footer-column { gap: 18px; }
  html:not([data-theme='dark']) .footer-home .corporate-footer-column h3 { margin-bottom: 10px; font-size: 13px; letter-spacing: .14em; }
  html:not([data-theme='dark']) .footer-home .corporate-footer-column a,
  html:not([data-theme='dark']) .footer-home .corporate-contact :is(button, p) { font-size: 15px; line-height: 1.6; }
  html:not([data-theme='dark']) .footer-home .corporate-footer-bottom { margin-top: 74px; padding-top: 26px; }
  html:not([data-theme='dark']) .footer-home .corporate-footer-entries { font-size: 13px; }
  html:not([data-theme='dark']) .footer-home .corporate-footer-legal { margin-top: 16px; font-size: 12px; letter-spacing: .02em; }
}
@media (max-width: 980px) {
  .corporate-footer-main { grid-template-columns: minmax(230px, 1fr) minmax(370px, 1.6fr); row-gap: 38px; }
  .corporate-contact { grid-column: 2; }
}
@media (max-width: 640px) {
  .corporate-footer-container { width: min(100% - 40px, 1360px); padding: 34px 0 22px; }
  .corporate-footer-main { grid-template-columns: 1fr; gap: 30px; }
  .corporate-footer-brand { max-width: none; }
  .corporate-footer-brand > p { max-width: 330px; margin: 16px 0; font-size: 13px; line-height: 1.75; }
  .corporate-footer-links { grid-template-columns: 1fr; gap: 22px; }
  .corporate-footer-column { display: block; }
  .corporate-footer-column h3 { margin-bottom: 10px; }
  .corporate-footer-column a { display: inline-block; margin: 0 16px 9px 0; font-size: 13px; }
  .corporate-contact :is(button, p) { font-size: 13px; }
  .corporate-contact { grid-column: auto; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px 14px; padding-top: 24px; border-top: 1px solid #e6ebf1; }
  .corporate-contact h3 { grid-column: 1 / -1; }
  .corporate-contact p { grid-column: 1 / -1; }
  .corporate-footer-bottom { margin-top: 24px; padding-top: 18px; }
  .corporate-footer-entries { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px 4px; font-size: 12px; }
  .corporate-footer-entries span { grid-column: 1 / -1; }
  .corporate-footer-entries a { text-align: center; }
  .corporate-footer-legal { display: grid; gap: 7px; margin-top: 18px; font-size: 12px; line-height: 1.6; }
  .legal-copyright, .legal-links { gap: 8px 12px; }
  .legal-links a + a::before, .legal-record::before { margin-right: 12px; }
  .legal-record::before { display: none; }
}
</style>

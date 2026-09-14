<template>
  <header
    ref="headerRef"
    class="header"
    :class="[{ 'header-transparent': headerTransparent, on: isOn, hide: isHidden }, headerInkClass]"
  >
    <div class="header-container">
      <div class="logo" @click="$router.push(homePath)">
        <span class="brand-simple">{{ brandSimple }}</span>
        <span class="brand-en">YUNZHAN TECHNOLOGY</span>
      </div>

      <span class="mobile-slogan">{{ mobileSlogan }}</span>

      <!-- 桌面端导航 -->
      <nav class="nav-menu desktop-nav">
        <router-link
          v-for="item in menuList"
          :key="item.path"
          :to="item.path"
          class="nav-item"
          :class="{ active: $route.path === item.path || ($route.path.startsWith(item.path) && item.path !== '/') }"
        >
          {{ item.name }}
        </router-link>
      </nav>

      <!-- 桌面端操作 -->
      <div class="desktop-actions">
        <button
          class="theme-toggle"
          type="button"
          :title="themeToggleLabel"
          :aria-label="themeToggleLabel"
          :aria-pressed="themeStore.theme === 'dark'"
          @click="themeStore.toggle()"
        >
          <el-icon :size="18"><Sunny v-if="themeStore.theme === 'light'" /><Moon v-else /></el-icon>
          <span>{{ themeStateLabel }}</span>
        </button>
        <button class="wechat-copy desktop-wechat-copy" type="button" @click="copyToClipboard('YunZhanKk', wechatType)" :title="wechatCopyTitle">
          <el-icon :size="18"><ChatDotRound /></el-icon>
          <span>{{ wechatLabel }}</span>
        </button>
      </div>

      <button class="wechat-copy mobile-wechat-copy" type="button" @click="copyToClipboard('YunZhanKk', wechatType)" :title="wechatCopyTitle">
        <el-icon :size="17"><ChatDotRound /></el-icon>
        <span>{{ wechatLabel }}</span>
      </button>

      <!-- 移动端汉堡菜单按钮 -->
      <button
        class="mobile-menu-btn"
        type="button"
        :aria-label="mobileMenuLabel"
        :aria-expanded="mobileMenuOpen"
        @click="toggleMobileMenu"
        :class="{ 'active': mobileMenuOpen }"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <!-- 移动端菜单 -->
    <transition name="mobile-menu">
      <div v-if="mobileMenuOpen" class="mobile-menu-overlay" @click="closeMobileMenu">
        <nav class="mobile-nav" @click.stop>
          <router-link
            v-for="item in menuList"
            :key="item.path"
            :to="item.path"
            class="mobile-nav-item"
            :class="{ active: $route.path === item.path || ($route.path.startsWith(item.path) && item.path !== '/') }"
            @click="closeMobileMenu"
          >
            {{ item.name }}
          </router-link>

          <button
            class="mobile-theme-toggle"
            type="button"
            :aria-label="themeToggleLabel"
            :aria-pressed="themeStore.theme === 'dark'"
            @click="themeStore.toggle()"
          >
            <el-icon :size="20"><Sunny v-if="themeStore.theme === 'light'" /><Moon v-else /></el-icon>
            <span>{{ themeToggleLabel }}</span>
          </button>

          <div class="mobile-contact" @click="copyToClipboard('YunZhanKk', wechatType)">
            <el-icon :size="20" class="wechat-icon"><ChatDotRound /></el-icon>
            <span>{{ mobileWechatLabel }}</span>
          </div>
        </nav>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { ChatDotRound, Moon, Sunny } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

import { useThemeStore } from '@/stores/theme'

const route = useRoute()
const isEn = computed(() => route.path === '/en' || route.path.startsWith('/en/'))
const homePath = computed(() => (isEn.value ? '/en' : '/'))
const brandSimple = computed(() => (isEn.value ? 'Yunzhan Technology' : '耘栈科技'))
/** 主题（stores/theme.js）：19:00—07:00 按当地时间转暗，两态按钮手动切换、到下个边界到期。 */
const themeStore = useThemeStore()
const themeToggleLabel = computed(() => {
  if (isEn.value) return themeStore.theme === 'dark' ? 'Switch to light' : 'Switch to dark'
  return themeStore.theme === 'dark' ? '切换到亮色' : '切换到暗色'
})
const themeStateLabel = computed(() => {
  if (isEn.value) return themeStore.theme === 'dark' ? 'Dark' : 'Light'
  return themeStore.theme === 'dark' ? '暗色' : '亮色'
})
const mobileSlogan = computed(() => (isEn.value ? 'Software R&D Services' : '软件研发服务'))
const wechatLabel = computed(() => (isEn.value ? 'WeChat: YunZhanKk' : '微信：YunZhanKk'))
const mobileWechatLabel = computed(() => (isEn.value ? 'WeChat: YunZhanKk' : 'WX: YunZhanKk'))
const wechatType = computed(() => (isEn.value ? 'WeChat' : '微信号'))
const wechatCopyTitle = computed(() => (isEn.value ? 'Copy WeChat ID' : '点击复制微信号'))
/** 透明顶：2026-09-15 用户裁定「全站默认透明，导航栏都跟首页一样」。
    由 `route.meta.headerTransparent !== false` 得到；个别要实底的页面才显式关掉。
    M-04/M-05 与皮肤无关，继续全站生效；口径见 specs/FRONTEND.md §7。 */
const headerTransparent = computed(() => route.meta.headerTransparent !== false)
/** 透明顶字色档：`route.meta.headerInk` 显式声明，Header 只负责映射成 CSS 类。
    light = 深色首屏上的白字（首页 / 关于 / 案例详情 / 资讯详情）；
    dark = 浅色首屏上的深字（米色服务页 / 案例列表 / 资讯列表 / 法律 / 404 等）。 */
const headerInkClass = computed(() => (route.meta.headerInk === 'light' ? 'header-ink-light' : 'header-ink-dark'))

const headerRef = ref(null)
/** SPEC M-04：`.on` —— 滚过 `clientHeight - headerHeight / 2` 后页头底色反转（全站生效）。 */
const isOn = ref(false)
/** SPEC M-05：`.hide` —— 滚轮向下收起、向上恢复（全站生效）。 */
const isHidden = ref(false)
const mobileMenuOpen = ref(false)
const mobileMenuLabel = computed(() => {
  if (isEn.value) return mobileMenuOpen.value ? 'Close navigation menu' : 'Open navigation menu'
  return mobileMenuOpen.value ? '关闭导航菜单' : '打开导航菜单'
})

const menuList = computed(() => {
  return isEn.value
    ? [
        { name: 'Home', path: '/en' },
        { name: 'AI Development', path: '/en/ai-development' },
        { name: 'Mini Program', path: '/en/miniprogram-development' },
        { name: 'App Development', path: '/en/app-development' },
        { name: 'Web Development', path: '/en/web-development' },
        { name: 'Cases', path: '/en/cases' },
        { name: 'News', path: '/en/news' },
        { name: 'About', path: '/en/about' }
      ]
    : [
        { name: '首页', path: '/' },
        { name: 'AI开发', path: '/ai-development' },
        { name: '小程序开发', path: '/miniprogram-development' },
        { name: 'App开发', path: '/app-development' },
        { name: 'WEB网站开发', path: '/web-development' },
        { name: '公司案例', path: '/cases' },
        { name: '行业资讯', path: '/news' },
        { name: '关于我们', path: '/about' }
      ]
})

const headerHeight = () => {
  const el = headerRef.value
  return el ? el.getBoundingClientRect().height : 0
}

const handleScroll = () => {
  // M-04：distance = clientHeight - header.height() / 2，scrollTop > distance 时加 `.on`
  isOn.value = window.scrollY > document.documentElement.clientHeight - headerHeight() / 2
}

// M-05：由滚轮方向驱动（不是滚动位置）——deltaY > 0 加 `.hide`，deltaY < 0 移除。
const handleWheel = (event) => {
  if (event.deltaY > 0) isHidden.value = true
  else if (event.deltaY < 0) isHidden.value = false
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
  // 防止背景滚动
  if (mobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
  document.body.style.overflow = ''
}

const copyToClipboard = async (text, type) => {
  try {
    await navigator.clipboard.writeText(text)
    ElMessage.success(isEn.value ? `${type} copied: ${text}` : `${type}已复制：${text}`)
  } catch (err) {
    ElMessage.error(isEn.value ? 'Copy failed. Please copy manually.' : '复制失败，请手动复制')
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('wheel', handleWheel, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('wheel', handleWheel)
  // 清理body样式
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* 页头的「皮肤」（底色 / 高度 / 字标 / 导航 / 移动端菜单骨架）已经收编进
   src/style.css 的「页头（Header）」段 —— 全站唯一一层，界面里不再有第二份
   `.header` 定义，这也是这里能一条 `!important` 都不用的原因。
   本文件只保留这个组件自己特有的交互件：汉堡按钮、移动端菜单面板的几何与过渡、
   以及 M-03 页头入场动画。 */

/* 移动端汉堡菜单按钮 */
.mobile-menu-btn {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001;
  position: relative;
}

.mobile-menu-btn span {
  width: 100%;
  height: 3px;
  background: #00d4ff;
  border-radius: 3px;
  box-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
  transition: transform 0.3s ease, opacity 0.3s ease, height 0.3s ease, background-color 0.3s ease;
}

.mobile-menu-btn.active span:nth-child(1) {
  transform: rotate(45deg) translate(8px, 8px);
}

.mobile-menu-btn.active span:nth-child(2) {
  opacity: 0;
}

.mobile-menu-btn.active span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -7px);
}

/* 移动端菜单遮罩层：默认不显示，≤992px 由 style.css 的页头段打开 */
.mobile-menu-overlay {
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  z-index: 999;
  display: none;
}

/* 移动端导航面板的皮肤：取值 = 首页 390 的实测值（样板就这么定的，收编后全站共用）。
   放在这一层而不是 style.css：`.mobile-nav` / `.mobile-nav-item` 已经没有全局规则，
   写在这里选择器优先级最高、也不必再加 `!important`（收编前这里是两套皮肤互相压制）。
   实测对照见 handoffs/INTEGRATION.md 的 390 表：面板 28px 20px、条目 16px 8px / 18px /
   直角 / 1px #333 分隔线、激活橙色 #f06a21、面板底 #111、min-height `100svh - 64px`。
   ⚠️ 例外（存量，见 INTEGRATION.md「发现、未修」第 7 条）：`.mobile-contact` 与
   `.mobile-menu-overlay` 的底色/圆角和 `.header-container` 的 display/width 在
   ≤768px 仍被 style.css 里那一组 legacy `!important`（`:320` / `:1372` / `:1373` / `:1374`，
   都在 `@media (max-width: 768px)`）盖住 —— 390 实测的 `#173d86` + 直角、遮罩
   `rgba(15,32,62,.26)`、容器 `display:flex` 来自那几条，**不是下面这段**。收编时按
   「不改行为」保留原样，所以 769–992px 与 ≤768px 的这几个值目前不一致。 */
.mobile-nav {
  min-height: calc(100svh - 64px);
  padding: 28px 20px;
  max-width: 100%;
  background: #111;
  border: 0;
  border-radius: 0;
}

.mobile-nav-item {
  display: block;
  margin: 0;
  padding: 16px 8px;
  color: #fff;
  text-decoration: none;
  font-size: 18px;
  font-weight: 600;
  background: transparent;
  border: 0;
  border-bottom: 1px solid #333;
  border-radius: 0;
  transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease,
    transform 0.3s ease, box-shadow 0.3s ease;
}

.mobile-nav-item:hover,
.mobile-nav-item.active {
  transform: translateX(10px);
}

.mobile-nav-item.active {
  color: #f06a21;
}

.mobile-contact {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 15px 20px;
  background: rgba(7, 193, 96, 0.1);
  border-radius: 15px;
  border: 1px solid rgba(7, 193, 96, 0.3);
  margin-top: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
}

.mobile-contact:hover {
  background: rgba(0, 212, 255, 0.15);
  border-color: rgba(0, 212, 255, 0.6);
  transform: scale(1.05);
}

/* 主题两态按钮（桌面在 .desktop-actions 里，手机在汉堡菜单底部）。
   颜色继承页头当前皮肤：透明顶是白字，.on 之后是黑字。 */
.theme-toggle,
.mobile-theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 36px;
  padding: 0 12px;
  color: inherit;
  background: transparent;
  border: 1px solid currentColor;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  opacity: 0.82;
  cursor: pointer;
  transition: opacity 0.3s ease, border-color 0.3s ease, background-color 0.3s ease, color 0.3s ease;
}

.theme-toggle:hover,
.mobile-theme-toggle:hover {
  opacity: 1;
}

.desktop-actions .theme-toggle {
  margin-right: 8px;
}

.mobile-theme-toggle {
  width: 100%;
  margin-top: 20px;
  padding: 15px 20px;
  color: #fff;
  border-color: #333;
  border-radius: 0;
  font-size: 16px;
  opacity: 1;
}

/* 移动端菜单过渡动画 */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.3s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
}

.mobile-menu-enter-active .mobile-nav,
.mobile-menu-leave-active .mobile-nav {
  transition: transform 0.3s ease;
}

.mobile-menu-enter-from .mobile-nav {
  transform: translateY(-20px);
}

.mobile-menu-leave-to .mobile-nav {
  transform: translateY(-20px);
}

/* 移动端标语：只在手机端显示 */
.mobile-slogan {
  display: none;
  color: #bff1ff;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.8px;
  text-shadow:
    0 0 8px rgba(94, 213, 255, 0.75),
    0 0 16px rgba(94, 213, 255, 0.35);
}

@media (max-width: 992px) {
  /* 遮罩层的 display/top 必须留在这一层：基类（`display: none; top: 80px`）就在同一个
     scoped 块里，同选择器同优先级、靠源码顺序压过去才有效。放到 style.css 里写
     `.mobile-menu-overlay { display: block }` 会被这里的基类按 scoped 属性选择器的
     优先级压死 —— 实测：点开汉堡后遮罩仍是 `display: none`，菜单打不开。
     top 取 64px = 同一断点下的页头高度，遮罩紧贴页头下沿。 */
  .mobile-menu-overlay {
    display: block;
    top: 64px;
  }
  .mobile-menu-btn {
    display: flex;
    position: absolute;
    top: 20px;
    right: 0;
    width: 28px;
    height: 22px;
  }
  .mobile-menu-btn span {
    height: 1px;
    background: #fff;
    box-shadow: none;
  }
  .mobile-slogan {
    display: block;
  }
}

@media (max-width: 400px) {
  .mobile-slogan {
    font-size: 11px;
  }
}

/* ==========================================================================
   M-03 页头入场逐项下坠

   SPEC 值（`evidence/reference-effects/SPEC.md` M-03，证据 `sources/function.js:4557-4567`
   `head_animate()` + `sources/main.css:2055-2067` 的 `@keyframes fadeInDown`）：
   起始 `opacity: 0; transform: translate3d(0, -100%, 0)` → 结束 `opacity: 1; transform: none`；
   `animation-duration: 1s`、`animation-fill-mode: both`、`ease`；只播一次、不做 scrub。
   延迟：`.logo` 0ms；第 n 个导航项 `n * 200ms`（参考站 7 项 = 0.2s…1.4s）；
   右侧工具栏 `1300ms`（参考站 `.r .outdated svg` 1300ms / `.r .sun` 1400ms）。

   本项目的两处口径（见 specs/FRONTEND.md §7）：
   1. 触发宽度取 **1025px** 而不是参考站的 `clientWidth > 1365`：本站在 1025–1365px 之间
      仍是完整的桌面页头（桌面导航 992px 才收起），只让 992–1365 的笔记本没有入场动画
      没有依据；统一用 SPEC M-01 的桌面线（>1024）更好解释。
   2. 本页头有 8 个导航项（参考站 7 项）→ 延迟梯度到 1.6s；右侧工具栏只有一个按钮，
      取参考站两个图标里的 **1300ms**。
   keyframes 内联在这里而不是复用 animate.css：名字要跟着 scoped 一起改写，避免和
   全局 animate.css 的同名 keyframes 互相干扰；数值与 animate.css 的 `fadeInDown` 相同。
   ========================================================================== */
@media (min-width: 1025px) {
  .header .logo,
  .header .nav-item,
  .header .desktop-actions {
    animation: headerFadeInDown 1s ease both;
  }
  .header .logo { animation-delay: 0ms; }
  .header .nav-item:nth-child(1) { animation-delay: 200ms; }
  .header .nav-item:nth-child(2) { animation-delay: 400ms; }
  .header .nav-item:nth-child(3) { animation-delay: 600ms; }
  .header .nav-item:nth-child(4) { animation-delay: 800ms; }
  .header .nav-item:nth-child(5) { animation-delay: 1000ms; }
  .header .nav-item:nth-child(6) { animation-delay: 1200ms; }
  .header .nav-item:nth-child(7) { animation-delay: 1400ms; }
  .header .nav-item:nth-child(8) { animation-delay: 1600ms; }
  .header .desktop-actions { animation-delay: 1300ms; }
}

@keyframes headerFadeInDown {
  from {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
</style>

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

      <div class="mobile-actions" aria-label="Quick actions">
        <button
          class="mobile-action-btn mobile-locale-toggle"
          type="button"
          :title="localeSwitchTitle"
          :aria-label="localeSwitchTitle"
          @click="switchLocale"
        >
          <el-icon :size="19"><Switch /></el-icon>
        </button>
        <button
          class="mobile-action-btn mobile-theme-toggle-icon"
          type="button"
          :title="themeToggleLabel"
          :aria-label="themeToggleLabel"
          :aria-pressed="themeStore.theme === 'dark'"
          @click="themeStore.toggle()"
        >
          <el-icon :size="19"><Sunny v-if="themeStore.theme === 'light'" /><Moon v-else /></el-icon>
        </button>
        <button
          class="mobile-action-btn mobile-menu-btn"
          type="button"
          :aria-label="mobileMenuLabel"
          :aria-expanded="mobileMenuOpen"
          @click="toggleMobileMenu"
          :class="{ active: mobileMenuOpen }"
        >
          <el-icon v-if="mobileMenuOpen" :size="25"><Close /></el-icon>
          <span v-else class="mobile-menu-lines" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      <!-- 桌面端导航：主项与参考站一致，解决方案/耘栈服务使用展开面板。 -->
      <nav class="nav-menu desktop-nav" @mouseleave="closeDesktopMenu">
        <div v-for="item in navItems" :key="item.key" class="nav-item-wrap" @mouseenter="openDesktopMenu(item.key)">
          <router-link v-if="item.path" :to="item.path" class="nav-item" :class="{ active: isNavActive(item) }">
            {{ item.label }}
          </router-link>
          <button v-else class="nav-item nav-item-trigger" type="button" :aria-expanded="desktopMenuOpen === item.key" @click="toggleDesktopMenu(item.key)">
            {{ item.label }}<span class="nav-chevron" aria-hidden="true">⌄</span>
          </button>
          <div v-if="item.key === 'solutions'" v-show="desktopMenuOpen === item.key" class="nav-mega nav-mega-solutions">
            <div v-for="group in solutionGroups" :key="group.key" class="nav-mega-group">
              <h3>{{ isEn ? group.en : group.zh }}</h3>
              <a v-for="link in group.links" :key="link.href" :href="link.href" target="_blank" rel="noopener noreferrer">{{ isEn ? link.en : link.zh }} <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <div v-else-if="item.key === 'services'" v-show="desktopMenuOpen === item.key" class="nav-mega nav-mega-services">
            <router-link v-for="service in serviceItems" :key="service.key" :to="isEn ? service.enPath : service.path">
              <span class="nav-service-index">{{ String(serviceItems.indexOf(service) + 1).padStart(2, '0') }}</span>
              <span>{{ isEn ? service.en : service.zh }}</span><span aria-hidden="true">↗</span>
            </router-link>
          </div>
        </div>
      </nav>

      <!-- 桌面端操作：语言靠导航右端、主题只留小圆形图标、微信收成紧凑胶囊。 -->
      <div class="desktop-actions">
        <button
          class="lang-toggle"
          type="button"
          :title="localeSwitchTitle"
          :aria-label="localeSwitchTitle"
          @click="switchLocale"
        >
          <span>{{ localeSwitchLabel }}</span>
        </button>
        <button
          class="theme-toggle theme-toggle-icon"
          type="button"
          :title="themeToggleLabel"
          :aria-label="themeToggleLabel"
          :aria-pressed="themeStore.theme === 'dark'"
          @click="themeStore.toggle()"
        >
          <el-icon :size="16"><Sunny v-if="themeStore.theme === 'light'" /><Moon v-else /></el-icon>
        </button>
        <button class="wechat-copy desktop-wechat-copy" type="button" @click="copyToClipboard('YunZhanKk', wechatType)" :title="wechatCopyTitle">
          <el-icon :size="16"><ChatDotRound /></el-icon>
          <span>{{ desktopWechatLabel }}</span>
        </button>
      </div>

    </div>

    <!-- 移动端菜单 -->
    <transition name="mobile-menu">
      <div v-if="mobileMenuOpen" class="mobile-menu-overlay" @click="closeMobileMenu">
        <nav class="mobile-nav" @click.stop>
          <template v-for="item in navItems" :key="item.key">
            <router-link v-if="item.path" :to="item.path" class="mobile-nav-item" :class="{ active: isNavActive(item) }" @click="closeMobileMenu">{{ item.label }}</router-link>
            <button v-else class="mobile-nav-item mobile-nav-trigger" type="button" :aria-expanded="mobileExpanded === item.key" @click="toggleMobileMenuSection(item.key)">{{ item.label }}<span aria-hidden="true">{{ mobileExpanded === item.key ? '−' : '+' }}</span></button>
            <div v-if="item.key === 'solutions' && mobileExpanded === item.key" class="mobile-nav-submenu">
              <div v-for="group in solutionGroups" :key="group.key" class="mobile-nav-group">
                <strong>{{ isEn ? group.en : group.zh }}</strong>
                <a v-for="link in group.links" :key="link.href" :href="link.href" target="_blank" rel="noopener noreferrer" @click="closeMobileMenu">{{ isEn ? link.en : link.zh }} ↗</a>
              </div>
            </div>
            <div v-if="item.key === 'services' && mobileExpanded === item.key" class="mobile-nav-submenu">
              <router-link v-for="service in serviceItems" :key="service.key" :to="isEn ? service.enPath : service.path" @click="closeMobileMenu">{{ isEn ? service.en : service.zh }} ↗</router-link>
            </div>
          </template>

          <button
            class="mobile-theme-toggle mobile-lang-toggle"
            type="button"
            :aria-label="localeSwitchTitle"
            @click="switchLocale"
          >
            <span>{{ localeSwitchLabel }}</span>
          </button>

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
import { useRoute, useRouter } from 'vue-router'
import { ChatDotRound, Close, Moon, Sunny, Switch } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

import { useThemeStore } from '@/stores/theme'
import { SERVICE_NAV_ITEMS, SOLUTION_GROUPS } from '@/content/navigation'
import { copyToClipboard as writeClipboard } from '@/utils/clipboard'

const route = useRoute()
const router = useRouter()
const isEn = computed(() => route.path === '/en' || route.path.startsWith('/en/'))
const homePath = computed(() => (isEn.value ? '/en' : '/'))
const brandSimple = computed(() => (isEn.value ? 'Yunzhan Technology' : '耘栈科技'))
/** 主题（stores/theme.js）：19:00—07:00 按当地时间转暗，两态按钮手动切换、到下个边界到期。 */
const themeStore = useThemeStore()
const themeToggleLabel = computed(() => {
  if (isEn.value) return themeStore.theme === 'dark' ? 'Switch to light' : 'Switch to dark'
  return themeStore.theme === 'dark' ? '切换到亮色' : '切换到暗色'
})
const mobileSlogan = computed(() => (isEn.value ? 'Software R&D Services' : '软件研发服务'))
/** 桌面按钮只放短文案，完整 ID 放在 title/点击后的 toast 里，给英文 8 项导航腾空间。 */
const desktopWechatLabel = computed(() => (isEn.value ? 'WeChat' : '微信'))
const mobileWechatLabel = computed(() => (isEn.value ? 'WeChat: YunZhanKk' : 'WX: YunZhanKk'))
const wechatType = computed(() => (isEn.value ? 'WeChat' : '微信号'))
const wechatCopyTitle = computed(() => (isEn.value ? 'Copy WeChat ID' : '点击复制微信号'))
const localeSwitchLabel = computed(() => (isEn.value ? '中文' : 'EN'))
const localeSwitchTitle = computed(() => (isEn.value ? '切换中文' : 'Switch to English'))
const localeSwitchPath = computed(() => {
  if (isEn.value) return route.path.replace(/^\/en/, '') || '/'
  return route.path === '/' ? '/en' : `/en${route.path}`
})
/** 透明顶：2026-09-15 用户裁定「全站默认透明，导航栏都跟首页一样」。
    由 `route.meta.headerTransparent !== false` 得到；个别要实底的页面才显式关掉。
    M-04/M-05 与皮肤无关，继续全站生效；口径见 specs/FRONTEND.md §7。 */
const headerTransparent = computed(() => route.meta.headerTransparent !== false)
/** 透明顶字色档：`route.meta.headerInk` 显式声明，Header 只负责映射成 CSS 类。
    light = 深色首屏上的白字（首页 / 关于 / 案例详情 / 资讯详情）；
    dark = 浅色首屏上的深字（米色服务页 / 案例列表 / 资讯列表 / 法律 / 404 等）。 */
const headerInkClass = computed(() => {
  if (themeStore.theme === 'dark') return 'header-ink-light'
  return route.meta.headerInk === 'light' ? 'header-ink-light' : 'header-ink-dark'
})

const headerRef = ref(null)
/** SPEC M-04：`.on` —— 滚过 `clientHeight - headerHeight / 2` 后页头底色反转（全站生效）。 */
const isOn = ref(false)
/** SPEC M-05：`.hide` —— 滚轮向下收起、向上恢复（全站生效）。 */
const isHidden = ref(false)
const mobileMenuOpen = ref(false)
const desktopMenuOpen = ref('')
const mobileExpanded = ref('')
const mobileMenuLabel = computed(() => {
  if (isEn.value) return mobileMenuOpen.value ? 'Close navigation menu' : 'Open navigation menu'
  return mobileMenuOpen.value ? '关闭导航菜单' : '打开导航菜单'
})

const solutionGroups = SOLUTION_GROUPS
const serviceItems = SERVICE_NAV_ITEMS
const navItems = computed(() => [
  { key: 'cases', label: isEn.value ? 'Cases' : '公司案例', path: isEn.value ? '/en/cases' : '/cases' },
  { key: 'solutions', label: isEn.value ? 'Solutions' : '解决方案' },
  { key: 'services', label: isEn.value ? 'Yunzhan Services' : '耘栈服务' },
  { key: 'about', label: isEn.value ? 'About Us' : '关于我们', path: isEn.value ? '/en/about' : '/about' },
  { key: 'news', label: isEn.value ? 'Industry News' : '行业资讯', path: isEn.value ? '/en/news' : '/news' },
  { key: 'contact', label: isEn.value ? 'Contact Us' : '联系我们', path: isEn.value ? '/en/contact' : '/contact' }
])
const isNavActive = (item) => item.path && (route.path === item.path || route.path.startsWith(`${item.path}/`))
const openDesktopMenu = (key) => { if (key === 'solutions' || key === 'services') desktopMenuOpen.value = key }
const closeDesktopMenu = () => { desktopMenuOpen.value = '' }
const toggleDesktopMenu = (key) => { desktopMenuOpen.value = desktopMenuOpen.value === key ? '' : key }
const toggleMobileMenuSection = (key) => { mobileExpanded.value = mobileExpanded.value === key ? '' : key }

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
  mobileExpanded.value = ''
  document.body.style.overflow = ''
}

const switchLocale = () => {
  closeMobileMenu()
  const applyLocale = () => router.push(localeSwitchPath.value)
  // 语言切换是整页文案替换：支持 View Transitions 时做一次原生跨页淡入淡出，
  // 不支持时回退到 layout 里 router-view 的 0.18s 淡入淡出。
  if (typeof document.startViewTransition === 'function') {
    try {
      document.startViewTransition(applyLocale)
      return
    } catch (error) {
      // 极少数实现会在异常状态下抛错，回退普通导航。
    }
  }
  applyLocale()
}

const copyToClipboard = async (text, type) => {
  try {
    await writeClipboard(text)
    ElMessage({
      type: 'success',
      message: isEn.value ? `${type} copied: ${text}` : `${type}已复制：${text}`,
      customClass: 'app-copy-message'
    })
  } catch (err) {
    ElMessage({
      type: 'error',
      message: isEn.value ? 'Copy failed. Please copy manually.' : '复制失败，请手动复制',
      customClass: 'app-copy-message'
    })
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
  desktopMenuOpen.value = ''
  mobileExpanded.value = ''
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
  width: 36px;
  height: 36px;
  color: inherit;
}

.mobile-menu-lines {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 23px;
  gap: 5px;
}

.mobile-menu-lines span {
  display: block;
  width: 100%;
  height: 1.5px;
  background: currentColor;
  transition: transform .25s ease, opacity .25s ease;
}

.mobile-actions { display: none; }

.mobile-action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  color: inherit;
  background: transparent;
  border: 0;
  border-radius: 0;
  cursor: pointer;
  transition: opacity .25s ease, transform .25s ease;
}

.mobile-action-btn:hover { opacity: .72; transform: translateY(-1px); }
.mobile-action-btn:focus-visible { outline: 1px solid currentColor; outline-offset: 3px; }
.mobile-action-btn :deep(.el-icon) { color: currentColor; }

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

.mobile-nav-trigger {
  display: flex;
  width: 100%;
  justify-content: space-between;
  text-align: left;
  font: inherit;
  cursor: pointer;
}
.mobile-nav-trigger span { color: #f06a21; font-size: 22px; font-weight: 400; }
.mobile-nav-submenu { padding: 10px 8px 16px; border-bottom: 1px solid #333; }
.mobile-nav-submenu a { display: block; padding: 8px 0 8px 18px; color: #c8c8c8; font-size: 14px; line-height: 1.45; text-decoration: none; }
.mobile-nav-group { padding: 7px 0; }
.mobile-nav-group strong { display: block; padding: 8px 0 2px 18px; color: #f06a21; font-size: 11px; letter-spacing: .04em; }

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

/* 桌面操作区：语言按钮是贴近导航右端的简洁文本，主题按钮是小圆形图标。 */
.lang-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 34px;
  min-height: 36px;
  padding: 0 6px;
  color: inherit;
  background: transparent;
  border: 0;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.04em;
  opacity: 0.82;
  cursor: pointer;
  transition: opacity 0.3s ease, background-color 0.3s ease, color 0.3s ease;
}

.lang-toggle:hover {
  opacity: 1;
  background: rgba(127, 127, 127, 0.12);
}

/* Reference-style desktop dropdowns: the trigger stays in the six-item bar while
   the panel opens below the header as a quiet, full-width information surface. */
.nav-item-wrap { position: relative; display: flex; align-items: center; height: 100%; }
.nav-item-trigger { appearance: none; cursor: pointer; font: inherit; }
.nav-chevron { margin-left: 7px; color: currentColor; font-size: 14px; line-height: 1; transition: transform .25s ease; }
.nav-item-wrap:hover .nav-chevron,
.nav-item-trigger[aria-expanded='true'] .nav-chevron { transform: rotate(180deg); }
.nav-mega {
  position: fixed;
  top: 76px;
  left: 0;
  right: 0;
  z-index: 2999;
  padding: 30px max(5vw, 32px) 36px;
  color: #111;
  background: rgba(242, 241, 228, .98);
  border-top: 1px solid rgba(17, 17, 17, .14);
  box-shadow: 0 20px 36px rgba(0, 0, 0, .12);
  backdrop-filter: blur(18px);
}
.nav-mega-solutions { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px 44px; max-height: min(66vh, 540px); overflow-y: auto; }
.nav-mega-group { min-width: 0; padding: 0 0 16px; border-bottom: 1px solid rgba(17, 17, 17, .14); }
.nav-mega-group h3 { margin: 0 0 13px; font-size: 13px; font-weight: 700; line-height: 1.5; }
.nav-mega-group a { display: inline-flex; align-items: center; gap: 5px; margin: 0 17px 8px 0; color: #5e5c54; font-size: 12px; line-height: 1.4; text-decoration: none; transition: color .2s ease; }
.nav-mega-group a span { color: #f06a21; font-size: 12px; }
.nav-mega-group a:hover { color: #184dc4; }
.nav-mega-services { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0 26px; padding-top: 10px; padding-bottom: 24px; }
.nav-mega-services a { display: grid; grid-template-columns: 34px 1fr auto; align-items: center; gap: 10px; min-height: 58px; color: #111; border-bottom: 1px solid rgba(17, 17, 17, .16); text-decoration: none; transition: color .2s ease, padding-left .2s ease; }
.nav-mega-services a:hover { padding-left: 8px; color: #184dc4; }
.nav-mega-services a > span:last-child { color: #f06a21; }
.nav-service-index { color: #999; font-size: 11px; letter-spacing: .08em; }

/* 主题两态按钮：桌面只在 .desktop-actions 里放 icon-only 小圆钮，手机菜单仍走整行条目。 */
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

.theme-toggle-icon {
  width: 36px;
  min-width: 36px;
  padding: 0;
  gap: 0;
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
  .nav-mega { display: none !important; }
  .mobile-menu-btn {
    display: flex;
  }
  .mobile-actions {
    display: flex;
    align-items: center;
    justify-self: end;
    margin-left: auto;
    gap: 4px;
    color: inherit;
  }
  .mobile-slogan,
  .mobile-wechat-copy {
    display: none;
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
  .header .nav-item-wrap,
  .header .desktop-actions {
    animation: headerFadeInDown 1s ease both;
  }
  .header .logo { animation-delay: 0ms; }
  .header .nav-item-wrap:nth-child(1) { animation-delay: 200ms; }
  .header .nav-item-wrap:nth-child(2) { animation-delay: 400ms; }
  .header .nav-item-wrap:nth-child(3) { animation-delay: 600ms; }
  .header .nav-item-wrap:nth-child(4) { animation-delay: 800ms; }
  .header .nav-item-wrap:nth-child(5) { animation-delay: 1000ms; }
  .header .nav-item-wrap:nth-child(6) { animation-delay: 1200ms; }
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
/* Dropdowns follow the reference site's compact dark information panel. */
.header .nav-item,
.header .nav-item-trigger {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 1;
}

.header .nav-mega {
  top: 76px;
  left: 50%;
  right: auto;
  width: min(980px, calc(100vw - 64px));
  transform: translateX(-50%);
  padding: 28px 32px 30px;
  color: #171717;
  background: rgba(242, 241, 228, .98);
  border: 1px solid rgba(17, 17, 17, .14);
  box-shadow: 0 20px 48px rgba(0, 0, 0, .16);
  backdrop-filter: blur(16px);
}

.header .nav-mega-solutions {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 26px 38px;
  max-height: min(66vh, 520px);
}

.header .nav-mega-group {
  padding: 0 0 17px;
  border-bottom-color: rgba(17, 17, 17, .14);
}

.header .nav-mega-group h3 {
  margin-bottom: 12px;
  color: #171717;
  font-size: 13px;
  font-weight: 650;
  line-height: 1.45;
}

.header .nav-mega-group a {
  margin: 0 16px 8px 0;
  color: rgba(17, 17, 17, .62);
  font-size: 12px;
  line-height: 1.45;
}

.header .nav-mega-group a span,
.header .nav-mega-services a > span:last-child {
  color: #f06a21;
}

.header .nav-mega-group a:hover,
.header .nav-mega-services a:hover {
  color: #184dc4;
}

.header .nav-mega-services {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0 28px;
  padding-top: 0;
  padding-bottom: 4px;
}

.header .nav-mega-services a {
  min-height: 58px;
  color: rgba(17, 17, 17, .88);
  border-bottom-color: rgba(17, 17, 17, .14);
}

.header .nav-service-index { color: rgba(17, 17, 17, .42); }

.header .mobile-nav {
  color: #171717;
  background: #f2f1e4;
}

.header .mobile-nav-item {
  color: #171717;
  border-bottom-color: rgba(17, 17, 17, .18);
}

.header .mobile-nav-item.active {
  color: #184dc4;
}

.header .mobile-nav-submenu {
  border-bottom-color: rgba(17, 17, 17, .18);
}

.header .mobile-nav-submenu a {
  color: rgba(17, 17, 17, .68);
}

.header .mobile-nav-submenu a:hover {
  color: #184dc4;
}

.header .mobile-theme-toggle {
  color: #171717;
  border-color: rgba(17, 17, 17, .22);
}

html[data-theme='dark'] .header .nav-mega {
  color: #f5f5f0;
  background: rgba(18, 18, 18, .98);
  border-color: rgba(255, 255, 255, .14);
  box-shadow: 0 20px 48px rgba(0, 0, 0, .34);
}

html[data-theme='dark'] .header .nav-mega-group {
  border-bottom-color: rgba(255, 255, 255, .14);
}

html[data-theme='dark'] .header .nav-mega-group h3 {
  color: #fff;
}

html[data-theme='dark'] .header .nav-mega-group a {
  color: rgba(255, 255, 255, .62);
}

html[data-theme='dark'] .header .nav-mega-group a:hover,
html[data-theme='dark'] .header .nav-mega-services a:hover {
  color: #fff;
}

html[data-theme='dark'] .header .nav-mega-services a {
  color: rgba(255, 255, 255, .88);
  border-bottom-color: rgba(255, 255, 255, .14);
}

html[data-theme='dark'] .header .nav-service-index {
  color: rgba(255, 255, 255, .38);
}

html[data-theme='dark'] .header .mobile-nav {
  color: #fff;
  background: #111;
}

html[data-theme='dark'] .header .mobile-nav-item {
  color: #fff;
  border-bottom-color: #333;
}

html[data-theme='dark'] .header .mobile-nav-item.active {
  color: #f06a21;
}

html[data-theme='dark'] .header .mobile-nav-submenu {
  border-bottom-color: #333;
}

html[data-theme='dark'] .header .mobile-nav-submenu a {
  color: #c8c8c8;
}

html[data-theme='dark'] .header .mobile-nav-submenu a:hover {
  color: #fff;
}

html[data-theme='dark'] .header .mobile-theme-toggle {
  color: #fff;
  border-color: #333;
}

@media (max-width: 992px) {
  .header .nav-item,
  .header .nav-item-trigger {
    font-size: 18px;
    line-height: 1.2;
  }
}
</style>

<template>
<header
    ref="headerRef"
    class="header"
    :class="{ 'header-fixed': !isHome && isFixed, 'header-home': isHome, on: isOn, hide: isHidden }"
  >
    <div class="header-container">
      <div class="logo" @click="$router.push('/')">
        <span class="brand-simple">耘栈科技</span>
        <span class="brand-en">YUNZHAN TECHNOLOGY</span>
      </div>

      <span class="mobile-slogan">软件研发服务</span>
      
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
        <button class="wechat-copy desktop-wechat-copy" type="button" @click="copyToClipboard('YunZhanKk', '微信号')" title="点击复制微信号">
          <el-icon :size="18"><ChatDotRound /></el-icon>
          <span>微信：YunZhanKk</span>
        </button>
      </div>

      <button class="wechat-copy mobile-wechat-copy" type="button" @click="copyToClipboard('YunZhanKk', '微信号')" title="点击复制微信号">
        <el-icon :size="17"><ChatDotRound /></el-icon>
        <span>微信：YunZhanKk</span>
      </button>

      <!-- 移动端汉堡菜单按钮 -->
      <button
        class="mobile-menu-btn"
        type="button"
        :aria-label="mobileMenuOpen ? '关闭导航菜单' : '打开导航菜单'"
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
          
          <div class="mobile-contact" @click="copyToClipboard('YunZhanKk', '微信号')">
            <el-icon :size="20" class="wechat-icon"><ChatDotRound /></el-icon>
            <span>WX: YunZhanKk</span>
          </div>
        </nav>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { ChatDotRound } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const route = useRoute()
const isHome = computed(() => route.path === '/' || route.path === '/en')
// 英文站首页是独立路由 /en（router: Home / HomeEn），M-04/M-05 对两者都要生效。

const headerRef = ref(null)
const isFixed = ref(false)
/** SPEC M-04：`.on` —— 滚过 `clientHeight - headerHeight / 2` 后页头底色与配色反转。 */
const isOn = ref(false)
/** SPEC M-05：`.hide` —— 滚轮向下收起、向上恢复。 */
const isHidden = ref(false)
const mobileMenuOpen = ref(false)

const menuList = [
  { name: '首页', path: '/' },
  { name: 'AI开发', path: '/ai-development' },
  { name: '小程序开发', path: '/miniprogram-development' },
  { name: 'App开发', path: '/app-development' },
  { name: 'WEB网站开发', path: '/web-development' },
  { name: '公司案例', path: '/cases' },
  { name: '行业资讯', path: '/news' },
  { name: '关于我们', path: '/about' }
]

const headerHeight = () => {
  const el = headerRef.value
  return el ? el.getBoundingClientRect().height : 0
}

const handleScroll = () => {
  isFixed.value = window.scrollY > 100
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
    ElMessage.success(`${type}已复制：${text}`)
  } catch (err) {
    ElMessage.error('复制失败，请手动复制')
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
.header {
  width: 100%;
  height: 80px;
  background: rgba(10, 14, 39, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 212, 255, 0.2);
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.5),
    0 0 40px rgba(0, 212, 255, 0.1);
  transition: all 0.3s ease;
  position: relative;
  z-index: 1000;
}

.header::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(0, 212, 255, 0.5) 20%, 
    rgba(0, 212, 255, 0.8) 50%, 
    rgba(0, 212, 255, 0.5) 80%, 
    transparent 100%);
  animation: borderFlow 3s ease-in-out infinite;
}

@keyframes borderFlow {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
}

.header-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  animation: slideDown 0.3s ease;
  background: rgba(10, 14, 39, 0.95);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.7),
    0 0 60px rgba(0, 212, 255, 0.2);
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  position: relative;
}

.logo {
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 5px;
  border-radius: 10px;
  background: rgba(10, 14, 39, 0.8);
}

.logo:hover {
  transform: scale(1.05);
}

.logo-img {
  height: 50px;
  width: auto;
  object-fit: contain;
}

.logo-name {
  display: none;
  color: #e8f8ff;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

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

.nav-menu {
  display: flex;
  align-items: center;
  gap: 5px;
}

.nav-item {
  padding: 10px 18px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 15px;
  font-weight: 600;
  border-radius: 10px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  border: 1px solid transparent;
  letter-spacing: 0.5px;
}

.nav-item::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #00d4ff, transparent);
  transform: translateX(-50%);
  transition: width 0.3s ease;
}

.nav-item:hover {
  color: #00d4ff;
  background: rgba(0, 212, 255, 0.25);
  border-color: rgba(0, 212, 255, 1);
  transform: translateY(-2px) scale(1.05);
  box-shadow: 
    0 0 30px rgba(0, 212, 255, 1),
    0 0 60px rgba(0, 212, 255, 0.7),
    0 0 90px rgba(0, 212, 255, 0.5),
    0 4px 15px rgba(0, 0, 0, 0.4);
  text-shadow: 
    0 0 15px rgba(0, 212, 255, 1),
    0 0 30px rgba(0, 212, 255, 0.8),
    0 0 45px rgba(0, 212, 255, 0.6);
}

.nav-item:hover::before {
  width: 80%;
}

.nav-item.active {
  color: #00d4ff;
  background: rgba(0, 212, 255, 0.15);
  border-color: rgba(0, 212, 255, 0.4);
  box-shadow: 
    0 0 15px rgba(0, 212, 255, 0.3),
    0 4px 15px rgba(0, 0, 0, 0.2);
}

.nav-item.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #00d4ff, transparent);
  border-radius: 2px;
  box-shadow: 0 0 10px #00d4ff;
}

.contact-info {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  background: rgba(7, 193, 96, 0.1);
  border-radius: 25px;
  border: 1px solid rgba(7, 193, 96, 0.3);
  transition: all 0.3s ease;
  position: relative;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  backdrop-filter: blur(10px);
  overflow: hidden;
}

.contact-info::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  transition: all 0.4s ease;
}

.contact-info:hover::before {
  width: 200px;
  height: 200px;
}

.contact-info:hover {
  background: rgba(0, 212, 255, 0.15);
  border-color: rgba(0, 212, 255, 0.6);
  transform: scale(1.05);
  box-shadow: 
    0 0 20px rgba(0, 212, 255, 0.4),
    0 4px 15px rgba(0, 0, 0, 0.3);
}

.wechat-icon {
  color: #07c160;
  filter: drop-shadow(0 0 5px rgba(7, 193, 96, 0.8));
  position: relative;
  z-index: 1;
  animation: wechatPulse 2s ease-in-out infinite;
}

@keyframes wechatPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

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
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
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

/* 移动端菜单遮罩层 */
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

/* 移动端导航菜单 */
.mobile-nav {
  background: linear-gradient(180deg, #0a0e27 0%, #1a1f3a 100%);
  border-radius: 0 0 20px 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-top: none;
  padding: 20px;
  max-width: 100%;
}

.mobile-nav-item {
  display: block;
  padding: 15px 20px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 16px;
  font-weight: 600;
  border-radius: 10px;
  transition: all 0.3s ease;
  margin-bottom: 10px;
  border: 1px solid transparent;
}

.mobile-nav-item:hover,
.mobile-nav-item.active {
  color: #00d4ff;
  background: rgba(0, 212, 255, 0.15);
  border-color: rgba(0, 212, 255, 0.4);
  transform: translateX(10px);
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
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
  transition: all 0.3s ease;
}

.mobile-contact:hover {
  background: rgba(0, 212, 255, 0.15);
  border-color: rgba(0, 212, 255, 0.6);
  transform: scale(1.05);
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

/* 响应式媒体查询 */
@media screen and (max-width: 1200px) {
  .header-container {
    padding: 0 30px;
  }

  .nav-item {
    padding: 10px 14px;
    font-size: 14px;
  }

  .contact-info span {
    font-size: 14px;
  }
}

@media screen and (max-width: 992px) {
  .header {
    height: 70px;
  }

  .header-container {
    padding: 0 20px;
  }

  .logo-img {
    display: none;
  }

  .logo-name {
    display: block;
    font-size: 15px;
  }

  .desktop-nav,
  .desktop-contact {
    display: none;
  }

  .mobile-menu-btn {
    display: flex;
  }

  .mobile-slogan {
    display: block;
  }

  .mobile-menu-overlay {
    display: block;
  }
}

@media screen and (max-width: 576px) {
  .header {
    height: 56px;
  }

  .header-container {
    padding: 0 12px;
  }

  .logo {
    padding: 4px 8px;
    border-radius: 8px;
  }

  .logo-name {
    font-size: 14px;
  }

  .mobile-slogan {
    font-size: 12px;
    letter-spacing: 0.4px;
  }

  .mobile-menu-btn {
    width: 28px;
    height: 22px;
  }

  .mobile-menu-btn span {
    height: 2.5px;
  }

  .mobile-menu-overlay {
    top: 56px;
  }

  .mobile-nav {
    padding: 12px;
    border-radius: 0 0 16px 16px;
  }

  .mobile-nav-item {
    padding: 12px 16px;
    font-size: 15px;
    margin-bottom: 6px;
    border-radius: 8px;
  }

  .mobile-contact {
    padding: 12px 16px;
    margin-top: 16px;
    border-radius: 12px;
    font-size: 14px;
  }
}

/* 极小屏幕（<400px） */
@media screen and (max-width: 400px) {
  .header {
    height: 52px;
  }

  .logo-name {
    font-size: 13px;
  }

  .mobile-slogan {
    font-size: 11px;
  }

  .mobile-menu-overlay {
    top: 52px;
  }

  .mobile-nav-item {
    padding: 10px 14px;
    font-size: 14px;
  }
}

/* ==========================================================================
   首页页头 —— SPEC M-04 / M-05
   参考站 sources/style.css：基类 `.header` 不写 background（:213-228，即透明底）；
   `.header.on { background: #F2F1E4 }` + logo / nav / 图标转黑（:586-607）；
   `.header.hide { transform: translateY(-100%) }`（:624-626）；三处时长都是 `transition: .6s`。
   选择器统一加 `.header.header-home` 前缀，避免被 style.css 里那几条
   `.header { … !important }` 按源码顺序压回去。
   ========================================================================== */
.header.header-home {
  height: 76px !important;
  position: fixed !important;
  top: 0;
  left: 0;
  right: 0;
  background: transparent !important;
  border: 0 !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  transition: all .6s ease !important;
}
.header.header-home::before { display: none !important; }
/* M-04：越过 `clientHeight - header.height() / 2` 后转米色 #F2F1E4 */
.header.header-home.on { background: #F2F1E4 !important; }
/* M-05：滚轮向下收起，向上恢复 */
.header.header-home.hide { transform: translateY(-100%) !important; }

.header.header-home .header-container { max-width: 1360px !important; }
.header.header-home .logo { min-width: 190px; padding: 0 !important; background: transparent !important; color: #fff; }
.header.header-home .logo-img { height: 46px !important; }
.header.header-home .brand-simple { color: #fff; }
.header.header-home .brand-en { color: rgba(255,255,255,.68); }
.header.header-home .nav-menu { gap: 8px !important; }
.header.header-home .nav-item { padding: 10px 11px !important; color: rgba(255,255,255,.88) !important; background: transparent !important; border: 0 !important; border-radius: 0 !important; font-size: 12px !important; font-weight: 600 !important; }
.header.header-home .nav-item:hover,
.header.header-home .nav-item.active { color: #fff !important; background: transparent !important; }
.header.header-home .nav-item.active::after { display: block !important; bottom: 1px !important; width: 4px !important; height: 4px !important; background: #f06a21 !important; border-radius: 50% !important; box-shadow: none !important; }
.header.header-home .desktop-wechat-copy { min-height: 38px; color: #fff !important; background: transparent !important; border: 1px solid rgba(255,255,255,.45) !important; border-radius: 999px !important; }
.header.header-home .desktop-wechat-copy:hover { color: #111 !important; background: #fff !important; }

/* M-04 配色反转：参考站写作 `.header.on .l .logo img { filter: invert(1) }` + `color: #000`。 */
.header.header-home.on .logo-img { filter: invert(1); }
.header.header-home.on .brand-simple,
.header.header-home.on .brand-en,
.header.header-home.on .nav-item,
.header.header-home.on .nav-item:hover,
.header.header-home.on .nav-item.active { color: #000 !important; }
.header.header-home.on .desktop-wechat-copy { color: #000 !important; background: transparent !important; border-color: rgba(0, 0, 0, .4) !important; }
.header.header-home.on .desktop-wechat-copy:hover { color: #fff !important; background: #111 !important; }
.header.header-home.on .mobile-menu-btn span { background: #000 !important; }
.brand-simple { color: #16213b; font-size: 22px; font-weight: 800; letter-spacing: .06em; white-space: nowrap; }
.brand-en { margin-left: 10px; color: #738096; font-size: 8px; font-weight: 700; letter-spacing: .18em; white-space: nowrap; }

@media (max-width: 992px) {
  .header.header-home { height: 64px !important; }
  .header.header-home .logo { min-width: 0; padding: 0 !important; }
  .header.header-home .brand-simple { font-size: 18px; }
  .header.header-home .brand-en { display: none; }
  .header.header-home .mobile-wechat-copy { display: none !important; }
  .header.header-home .mobile-menu-btn { display: flex !important; margin-left: auto; }
  .header.header-home .mobile-menu-btn span { height: 1px !important; background: #fff !important; box-shadow: none !important; }
  .header.header-home .mobile-menu-overlay { top: 64px !important; }
  .header.header-home .mobile-nav { min-height: calc(100svh - 64px); padding: 28px 20px; background: #111 !important; border: 0 !important; border-radius: 0 !important; }
  .header.header-home .mobile-nav-item { margin: 0; padding: 16px 8px; color: #fff !important; background: transparent !important; border-bottom: 1px solid #333 !important; border-radius: 0 !important; font-size: 18px; }
  .header.header-home .mobile-nav-item.active { color: #f06a21 !important; }
  .mobile-menu-btn {
    display: flex !important;
    position: absolute !important;
    top: 20px !important;
    right: 0 !important;
    width: 28px !important;
    height: 22px !important;
  }
  .mobile-menu-btn span { height: 1px !important; background: #fff !important; box-shadow: none !important; }
}
</style>

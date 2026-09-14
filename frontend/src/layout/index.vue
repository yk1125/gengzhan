<template>
  <div class="layout">
    <Header />
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <Footer />

    <!-- 全局自定义光标层（SPEC M-27/28/29 + M-30 磁吸）。由 B 临时接管，见 handoffs/B.md §9.4。 -->
    <CustomCursor />
    
    <transition name="fade">
      <aside v-if="showFloatButton" class="studio-float" :aria-label="floatAriaLabel">
        <button
          type="button"
          class="theme-mode"
          :class="{ active: themeStore.theme === 'light' }"
          :aria-label="lightThemeLabel"
          :title="lightThemeLabel"
          :aria-pressed="themeStore.theme === 'light'"
          @click="themeStore.setTheme('light')"
        >
          <el-icon><Sunny /></el-icon>
        </button>
        <button
          type="button"
          class="theme-mode"
          :class="{ active: themeStore.theme === 'dark' }"
          :aria-label="darkThemeLabel"
          :title="darkThemeLabel"
          :aria-pressed="themeStore.theme === 'dark'"
          @click="themeStore.setTheme('dark')"
        >
          <el-icon><Moon /></el-icon>
        </button>
        <span class="studio-float-sep"></span>
        <button type="button" :aria-label="consultLabel" :title="consultLabel" @click="openAiConsultation"><el-icon><ChatDotRound /></el-icon></button>
        <span class="studio-float-label">{{ consultLabel }}</span>
        <button type="button" :aria-label="backTopLabel" :title="backTopLabel" @click="scrollToTop"><el-icon><ArrowUp /></el-icon></button>
      </aside>
    </transition>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowUp, ChatDotRound, Moon, Sunny } from '@element-plus/icons-vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import CustomCursor from '@/components/CustomCursor.vue'
import { useThemeStore } from '@/stores/theme'
import { scrollToTop as smoothScrollToTop, useSmoothScroll } from '@/composables/useSmoothScroll'

const route = useRoute()
const router = useRouter()
const themeStore = useThemeStore()
const showFloatButton = true
const isEn = computed(() => route.path === '/en' || route.path.startsWith('/en/'))

// SPEC M-01：全站滚动惯性（桌面 `clientWidth > 1024` 才启用）。口径与有意偏离见
// composables/useSmoothScroll.js 的文件头与 specs/FRONTEND.md §7。
useSmoothScroll()

const floatAriaLabel = computed(() => (isEn.value ? 'Quick actions' : '快捷操作'))
const consultLabel = computed(() => (isEn.value ? 'Consult' : '咨询'))
const backTopLabel = computed(() => (isEn.value ? 'Back to top' : '返回顶部'))
const lightThemeLabel = computed(() => (isEn.value ? 'Light theme' : '亮色主题'))
const darkThemeLabel = computed(() => (isEn.value ? 'Dark theme' : '暗色主题'))

const openAiConsultation = () => router.push(isEn.value ? '/en/ai-consultation' : '/ai-consultation')
// SPEC M-32：回顶走 M-01 的惯性（1200ms）；没有惯性实例时回退原生平滑滚动。
const scrollToTop = () => smoothScrollToTop()

</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  min-height: calc(100vh - 140px);
}

.fade-enter-active,
.fade-leave-active {
  /* C.md §29.1：原 0.3s + mode="out-in" 让每次 SPA 跳转空等 330-375ms
     （实测 373/355/337/330ms）。降到 0.18s 后旧页淡出更快，观感不空等；
     mode="out-in" 保留，避免新旧两页同时占位造成跳动。 */
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}

.studio-float {
  position: fixed;
  right: 28px;
  top: 50%;
  z-index: 3001;
  display: grid;
  justify-items: center;
  gap: 9px;
  padding: 10px 7px;
  background: var(--color-surface, #fff);
  border: 1px solid var(--color-line-soft, #ddd);
  border-radius: 28px;
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.1);
  transform: translateY(-50%);
  backdrop-filter: blur(10px);
}
.studio-float button {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  color: var(--color-ink, #111);
  background: transparent;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease, opacity 0.2s ease;
}

.studio-float button:hover {
  color: var(--color-bg, #fff);
  background: var(--color-ink, #111);
  transform: scale(1.05);
}

.studio-float button:focus-visible {
  outline: 2px solid #f26b24;
  outline-offset: 2px;
}

/* 侧边栏亮/暗两个模式：当前模式高亮，非当前模式像参考站一样保持安静。 */
.studio-float .theme-mode {
  opacity: 0.55;
}

.studio-float .theme-mode.active {
  color: var(--color-on-accent, #fff);
  background: var(--color-accent, #184dc4);
  opacity: 1;
}

.studio-float .studio-float-sep {
  display: block;
  width: 22px;
  height: 1px;
  margin: 2px auto;
  background: var(--color-line-soft, #ddd);
}

.studio-float .studio-float-label {
  display: block;
  margin: -3px 0 -1px;
  color: var(--color-ink-soft, #6d6c60);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  line-height: 1;
}

@media (max-width: 768px) {
  .studio-float { display: none; }
}

@media (hover: none), (pointer: coarse) {
  .studio-float { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .studio-float button { transition:none; }
}
</style>

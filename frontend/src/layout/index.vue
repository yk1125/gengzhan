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
    
    <transition name="fade">
      <aside v-if="showFloatButton" class="studio-float" aria-label="快捷操作">
        <button type="button" aria-label="在线咨询" title="在线咨询" @click="openAiConsultation"><el-icon><ChatDotRound /></el-icon></button>
        <span></span>
        <button type="button" aria-label="返回顶部" title="返回顶部" @click="scrollToTop"><el-icon><ArrowUp /></el-icon></button>
      </aside>
    </transition>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ArrowUp, ChatDotRound } from '@element-plus/icons-vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

const router = useRouter()
const showFloatButton = true

const openAiConsultation = () => router.push('/ai-consultation')
const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

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
  transition: opacity 0.3s ease, transform 0.3s ease;
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
  gap: 9px;
  padding: 10px 7px;
  background: rgba(255,255,255,.95);
  border: 1px solid #ddd;
  border-radius: 28px;
  box-shadow: 0 10px 26px rgba(0,0,0,.1);
  transform: translateY(-50%);
  backdrop-filter: blur(10px);
}
.studio-float button {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  color: #111;
  background: transparent;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  transition: background .2s ease, color .2s ease, transform .2s ease;
}

.studio-float button:hover {
  color: #fff;
  background: #111;
  transform: scale(1.05);
}

.studio-float button:focus-visible {
  outline: 2px solid #f26b24;
  outline-offset: 2px;
}

.studio-float span {
  display: block;
  width: 22px;
  height: 1px;
  margin: auto;
  background: #ddd;
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

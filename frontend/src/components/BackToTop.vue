<template>
  <transition name="fade">
    <div v-if="isVisible" class="back-to-top" @click="scrollToTop">
      <div class="back-icon neon-border">
        <el-icon><Top /></el-icon>
      </div>
      <div class="progress-ring">
        <svg width="60" height="60">
          <circle
            cx="30"
            cy="30"
            r="26"
            fill="none"
            stroke="rgba(0, 212, 255, 0.2)"
            stroke-width="2"
          />
          <circle
            cx="30"
            cy="30"
            r="26"
            fill="none"
            stroke="url(#gradient)"
            stroke-width="2"
            :stroke-dasharray="circumference"
            :stroke-dashoffset="strokeDashoffset"
            stroke-linecap="round"
            transform="rotate(-90 30 30)"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#00d4ff" />
              <stop offset="100%" stop-color="#9d4edd" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Top } from '@element-plus/icons-vue'

const isVisible = ref(false)
const scrollProgress = ref(0)
const circumference = 2 * Math.PI * 26

const strokeDashoffset = computed(() => {
  return circumference - (scrollProgress.value / 100) * circumference
})

const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
  
  scrollProgress.value = (scrollTop / scrollHeight) * 100
  isVisible.value = scrollTop > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 40px;
  right: 40px;
  z-index: 999;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-to-top:hover {
  transform: translateY(-5px);
}

.back-icon {
  width: 60px;
  height: 60px;
  background: rgba(10, 14, 39, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #00d4ff;
  position: relative;
  z-index: 2;
  box-shadow: 0 4px 20px rgba(0, 212, 255, 0.3);
  transition: all 0.3s ease;
}

.back-icon:hover {
  box-shadow: 0 8px 30px rgba(0, 212, 255, 0.5);
  transform: scale(1.1);
}

.progress-ring {
  position: absolute;
  top: 0;
  left: 0;
  width: 60px;
  height: 60px;
  z-index: 1;
  filter: drop-shadow(0 0 8px rgba(0, 212, 255, 0.6));
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

@media (max-width: 768px) {
  .back-to-top {
    bottom: 20px;
    right: 20px;
  }
  
  .back-icon {
    width: 50px;
    height: 50px;
    font-size: 20px;
  }
  
  .progress-ring {
    width: 50px;
    height: 50px;
  }
  
  .progress-ring svg {
    width: 50px;
    height: 50px;
  }
  
  .progress-ring circle {
    r: 22;
    cx: 25;
    cy: 25;
    transform: rotate(-90deg);
    transform-origin: 25px 25px;
  }
}

@media (max-width: 576px) {
  .back-to-top {
    bottom: 15px;
    right: 15px;
  }
  
  .back-icon {
    width: 45px;
    height: 45px;
    font-size: 18px;
  }
  
  .progress-ring {
    width: 45px;
    height: 45px;
  }
  
  .progress-ring svg {
    width: 45px;
    height: 45px;
  }
  
  .progress-ring circle {
    r: 20;
    cx: 22.5;
    cy: 22.5;
    transform: rotate(-90deg);
    transform-origin: 22.5px 22.5px;
  }
}
</style>

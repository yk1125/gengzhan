<template>
  <transition name="loader-fade">
    <div v-if="isLoading" class="page-loader">
      <div class="loader-content">
        <!-- 科技感logo动画 -->
        <div class="loader-logo">
          <div class="logo-ring ring-1"></div>
          <div class="logo-ring ring-2"></div>
          <div class="logo-ring ring-3"></div>
          <div class="logo-center">
            <div class="logo-icon">
              <Logo />
            </div>
          </div>
        </div>
        
        <!-- 加载文字 -->
        <div class="loader-text">
          <h2 class="gradient-text">北京耘栈科技</h2>
          <p>Loading<span class="dots">...</span></p>
        </div>
        
        <!-- 进度条 -->
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progress + '%' }"></div>
        </div>
      </div>
      
      <!-- 背景粒子效果 -->
      <div class="loader-particles">
        <div v-for="i in 20" :key="i" class="particle" :style="getParticleStyle(i)"></div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Logo from './Logo.vue'

const isLoading = ref(true)
const progress = ref(0)

const getParticleStyle = (index) => {
  const angle = (index / 20) * 360
  const radius = 200 + Math.random() * 100
  const duration = 3 + Math.random() * 2
  
  return {
    left: `${50 + radius * Math.cos(angle * Math.PI / 180)}px`,
    top: `${50 + radius * Math.sin(angle * Math.PI / 180)}px`,
    animationDuration: `${duration}s`,
    animationDelay: `${Math.random() * 2}s`
  }
}

onMounted(() => {
  // 模拟加载进度
  const interval = setInterval(() => {
    progress.value += Math.random() * 15
    if (progress.value >= 100) {
      progress.value = 100
      clearInterval(interval)
      setTimeout(() => {
        isLoading.value = false
      }, 500)
    }
  }, 200)
})
</script>

<style scoped>
.page-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  overflow: hidden;
}

.loader-content {
  text-align: center;
  position: relative;
  z-index: 2;
}

/* Logo动画 */
.loader-logo {
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 auto 40px;
}

.logo-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 2px solid transparent;
}

.ring-1 {
  width: 150px;
  height: 150px;
  border-top-color: #00d4ff;
  border-right-color: #00d4ff;
  animation: rotate 2s linear infinite;
}

.ring-2 {
  width: 120px;
  height: 120px;
  border-bottom-color: #9d4edd;
  border-left-color: #9d4edd;
  animation: rotate 1.5s linear infinite reverse;
}

.ring-3 {
  width: 90px;
  height: 90px;
  border-top-color: #ff006e;
  border-right-color: #ff006e;
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.logo-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70px;
  height: 70px;
  background: rgba(0, 212, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(0, 212, 255, 0.3);
  box-shadow: 
    0 0 30px rgba(0, 212, 255, 0.5),
    inset 0 0 20px rgba(0, 212, 255, 0.2);
  animation: pulse 2s ease-in-out infinite;
}

.logo-icon {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

@keyframes pulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    box-shadow: 
      0 0 30px rgba(0, 212, 255, 0.5),
      inset 0 0 20px rgba(0, 212, 255, 0.2);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.05);
    box-shadow: 
      0 0 40px rgba(0, 212, 255, 0.8),
      inset 0 0 30px rgba(0, 212, 255, 0.3);
  }
}

/* 文字 */
.loader-text h2 {
  font-size: 36px;
  font-weight: 900;
  margin-bottom: 15px;
  letter-spacing: 2px;
}

.loader-text p {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 600;
}

.dots {
  display: inline-block;
  animation: dotPulse 1.5s ease-in-out infinite;
}

@keyframes dotPulse {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
}

/* 进度条 */
.progress-bar {
  width: 300px;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  margin: 30px auto 0;
  overflow: hidden;
  position: relative;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #00d4ff 0%, #9d4edd 50%, #ff006e 100%);
  border-radius: 10px;
  transition: width 0.3s ease;
  box-shadow: 
    0 0 10px rgba(0, 212, 255, 0.8),
    0 0 20px rgba(0, 212, 255, 0.5);
  position: relative;
}

.progress-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
  animation: shimmer 1.5s ease-in-out infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* 背景粒子 */
.loader-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: #00d4ff;
  border-radius: 50%;
  box-shadow: 0 0 10px #00d4ff;
  animation: particleFloat 3s ease-in-out infinite;
}

@keyframes particleFloat {
  0%, 100% {
    opacity: 0.2;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.5);
  }
}

/* 过渡动画 */
.loader-fade-enter-active {
  transition: opacity 0.5s ease;
}

.loader-fade-leave-active {
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.loader-fade-enter-from {
  opacity: 0;
}

.loader-fade-leave-to {
  opacity: 0;
  transform: scale(1.1);
}
</style>

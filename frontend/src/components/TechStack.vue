<template>
  <section class="tech-stack-section">
    <div class="container">
      <div class="section-header">
        <h2>🔥 我们的技术栈</h2>
        <p>不只是开发,更懂技术趋势 · 用最新最稳定的技术为你服务</p>
      </div>

      <!-- 技术雷达图 -->
      <div class="tech-radar">
        <div class="radar-center">
          <div class="pulse-ring"></div>
          <div class="core-tech">
            <span class="tech-icon">⚡</span>
            <span>核心技术</span>
          </div>
        </div>
        
        <!-- 技术点位 -->
        <div
          v-for="(tech, index) in techStack"
          :key="tech.name"
          class="tech-point"
          :style="{
            left: `calc(50% + ${Math.cos((tech.angle - 90) * Math.PI / 180) * pointRadiusPercent}%)`,
            top: `calc(50% + ${Math.sin((tech.angle - 90) * Math.PI / 180) * pointRadiusPercent}%)`,
            '--delay': index * 0.1 + 's'
          }"
          @click="selectTech(tech)"
        >
          <div class="tech-dot" :class="{ active: activeTech === tech }">
            <span class="tech-emoji">{{ tech.emoji }}</span>
          </div>
          <div class="tech-label" v-show="activeTech === tech">{{ tech.name }}</div>
        </div>
      </div>

      <!-- 技术图例 -->
      <div class="tech-legend">
        <div class="legend-title">💡 点击查看详情</div>
        <div class="legend-items">
          <div 
            v-for="tech in techStack" 
            :key="tech.name"
            class="legend-item"
            :class="{ active: activeTech === tech }"
            @click="selectTech(tech)"
          >
            <span class="legend-emoji">{{ tech.emoji }}</span>
            <span class="legend-name">{{ tech.name }}</span>
          </div>
        </div>
      </div>

      <!-- 技术详情卡片 -->
      <transition name="slide-up">
        <div v-if="activeTech" class="tech-detail-card glass-effect">
          <div class="tech-detail-header">
            <span class="tech-detail-emoji">{{ activeTech.emoji }}</span>
            <h3>{{ activeTech.name }}</h3>
            <span class="tech-level" :style="{ background: activeTech.levelColor }">
              {{ activeTech.level }}
            </span>
            <button class="close-inline-btn" @click="activeTech = null">收起</button>
          </div>
          <p class="tech-description">{{ activeTech.description }}</p>
          <div class="tech-projects">
            <strong>实战项目:</strong>
            <span>{{ activeTech.projects }}个项目使用</span>
          </div>
          <div class="tech-tags">
            <el-tag 
              v-for="tag in activeTech.tags" 
              :key="tag" 
              size="small"
              effect="dark"
            >
              {{ tag }}
            </el-tag>
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'

const activeTech = ref(null)

const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1200)

const handleResize = () => {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', handleResize, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

const pointRadiusPercent = computed(() => {
  const w = windowWidth.value
  if (w <= 400) return 24
  if (w <= 576) return 26
  if (w <= 768) return 30
  if (w <= 992) return 34
  return 36
})

// 选择技术
const selectTech = (tech) => {
  if (activeTech.value === tech) {
    activeTech.value = null // 再次点击则关闭
  } else {
    activeTech.value = tech
  }
}

// 技术栈雷达图数据
const techStack = ref([
  { 
    name: 'GPT-4/Claude', 
    emoji: '🤖', 
    angle: 0, 
    distance: 85,
    level: '专家级',
    levelColor: 'linear-gradient(135deg, #ff6b6b, #ee5a6f)',
    description: '深度集成大语言模型，打造智能AI应用，支持私有化部署和API调用',
    projects: 15,
    tags: ['AI对话', '智能客服', 'RAG检索', '提示工程']
  },
  { 
    name: 'Vue 3 + Vite', 
    emoji: '⚡', 
    angle: 45, 
    distance: 90,
    level: '专家级',
    levelColor: 'linear-gradient(135deg, #42b883, #35495e)',
    description: '使用最新Vue3组合式API和Vite构建工具，打造极速开发体验',
    projects: 50,
    tags: ['组合式API', 'TypeScript', 'Pinia状态管理', 'SSR/SSG']
  },
  { 
    name: 'React 18', 
    emoji: '⚛️', 
    angle: 90, 
    distance: 88,
    level: '专家级',
    levelColor: 'linear-gradient(135deg, #61dafb, #21a1c4)',
    description: 'Concurrent特性、Server Components、Next.js 14等前沿技术实践',
    projects: 35,
    tags: ['Hooks', 'Next.js', 'RSC', 'Zustand']
  },
  { 
    name: 'Node.js微服务', 
    emoji: '🚀', 
    angle: 135, 
    distance: 82,
    level: '高级',
    levelColor: 'linear-gradient(135deg, #68a063, #539e48)',
    description: 'Nest.js框架 + 微服务架构，支撑高并发业务场景',
    projects: 28,
    tags: ['Nest.js', 'gRPC', 'Redis', 'MongoDB']
  },
  { 
    name: 'Flutter跨平台', 
    emoji: '📱', 
    angle: 180, 
    distance: 85,
    level: '高级',
    levelColor: 'linear-gradient(135deg, #02569b, #0175c2)',
    description: '一套代码iOS+Android+Web三端运行，性能接近原生',
    projects: 22,
    tags: ['Dart', 'GetX', 'Provider', '原生插件开发']
  },
  { 
    name: '微信生态', 
    emoji: '💬', 
    angle: 225, 
    distance: 92,
    level: '专家级',
    levelColor: 'linear-gradient(135deg, #07c160, #06ad56)',
    description: '小程序云开发、公众号、企业微信、视频号全栈解决方案',
    projects: 60,
    tags: ['云开发', '自定义组件', '性能优化', '支付对接']
  },
  { 
    name: 'Python AI', 
    emoji: '🐍', 
    angle: 270, 
    distance: 80,
    level: '高级',
    levelColor: 'linear-gradient(135deg, #4b8bbe, #ffd43b)',
    description: 'LangChain、FastAPI、数据分析、机器学习模型部署',
    projects: 18,
    tags: ['LangChain', 'FastAPI', 'Pandas', 'PyTorch']
  },
  { 
    name: '云原生DevOps', 
    emoji: '☁️', 
    angle: 315, 
    distance: 78,
    level: '中高级',
    levelColor: 'linear-gradient(135deg, #326ce5, #5c9fd6)',
    description: 'Docker、K8s、CI/CD自动化部署，保障项目稳定上线',
    projects: 25,
    tags: ['Docker', 'GitHub Actions', '阿里云', '腾讯云']
  }
])
</script>

<style scoped>
.tech-stack-section {
  padding: 40px 0 50px 0;
  position: relative;
  overflow: hidden;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  position: relative;
  z-index: 1;
}

.section-header {
  text-align: center;
  margin-bottom: 80px;
}

.section-header h2 {
  font-size: 42px;
  font-weight: 800;
  background: linear-gradient(135deg, #00d4ff 0%, #9d4edd 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 15px;
}

.section-header p {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.7);
}

/* 技术雷达图 */
.tech-radar {
  position: relative;
  width: min(520px, 90vw);
  height: min(520px, 90vw);
  margin: 0 auto 60px;
  border-radius: 50%;
  background: 
    radial-gradient(circle at center, rgba(0, 212, 255, 0.05) 0%, transparent 50%),
    radial-gradient(circle at center, transparent 25%, rgba(157, 78, 221, 0.02) 25%, rgba(157, 78, 221, 0.02) 26%, transparent 26%),
    radial-gradient(circle at center, transparent 45%, rgba(0, 212, 255, 0.03) 45%, rgba(0, 212, 255, 0.03) 46%, transparent 46%),
    radial-gradient(circle at center, transparent 65%, rgba(157, 78, 221, 0.02) 65%, rgba(157, 78, 221, 0.02) 66%, transparent 66%);
  border: 2px solid rgba(0, 212, 255, 0.3);
  box-shadow: 
    inset 0 0 80px rgba(0, 212, 255, 0.15),
    0 0 60px rgba(0, 212, 255, 0.15),
    0 0 100px rgba(157, 78, 221, 0.1);
}

/* 雷达扫描线 */
.tech-radar::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50%;
  height: 2px;
  background: linear-gradient(90deg, rgba(0, 212, 255, 0.8), transparent);
  transform-origin: left center;
  animation: radarScan 4s linear infinite;
}

@keyframes radarScan {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.radar-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.pulse-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid rgba(0, 212, 255, 0.6);
  animation: pulseRing 3s ease-out infinite;
}

.pulse-ring::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid rgba(157, 78, 221, 0.5);
  animation: pulseRing 3s ease-out 1s infinite;
}

@keyframes pulseRing {
  0% {
    width: 100px;
    height: 100px;
    opacity: 1;
  }
  100% {
    width: 200px;
    height: 200px;
    opacity: 0;
  }
}

.core-tech {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #00d4ff 0%, #9d4edd 50%, #ff006e 100%);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 
    0 0 50px rgba(0, 212, 255, 0.8),
    0 0 100px rgba(157, 78, 221, 0.5),
    inset 0 0 30px rgba(255, 255, 255, 0.2);
  border: 3px solid rgba(255, 255, 255, 0.3);
  position: relative;
  overflow: hidden;
  animation: corePulse 3s ease-in-out infinite;
}

.core-tech::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.3) 50%, transparent 70%);
  animation: coreShine 3s linear infinite;
}

@keyframes corePulse {
  0%, 100% {
    box-shadow: 
      0 0 50px rgba(0, 212, 255, 0.8),
      0 0 100px rgba(157, 78, 221, 0.5),
      inset 0 0 30px rgba(255, 255, 255, 0.2);
  }
  50% {
    box-shadow: 
      0 0 70px rgba(0, 212, 255, 1),
      0 0 120px rgba(157, 78, 221, 0.7),
      inset 0 0 40px rgba(255, 255, 255, 0.3);
  }
}

@keyframes coreShine {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.tech-icon {
  font-size: 32px;
  filter: drop-shadow(0 0 15px rgba(255, 255, 255, 1));
  position: relative;
  z-index: 1;
  animation: iconFloat 2s ease-in-out infinite;
}

@keyframes iconFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.core-tech span:last-child {
  font-size: 12px;
  font-weight: 800;
  color: white;
  margin-top: 6px;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  letter-spacing: 1px;
  position: relative;
  z-index: 1;
}

/* 技术点位 */
.tech-point {
  position: absolute;
  transform: translate(-50%, -50%);
  animation: techPointAppear 0.8s ease-out var(--delay) backwards;
  z-index: 5;
}

@keyframes techPointAppear {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.5);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

.tech-point {
  cursor: pointer;
}

.tech-dot {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(157, 78, 221, 0.05));
  border: 3px solid rgba(0, 212, 255, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  backdrop-filter: blur(15px);
  pointer-events: none;
  position: relative;
  box-shadow: 
    0 5px 20px rgba(0, 212, 255, 0.2),
    inset 0 0 20px rgba(0, 212, 255, 0.1);
}

.tech-dot::before {
  content: '';
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00d4ff, #9d4edd);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.tech-point:hover .tech-dot {
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.25), rgba(157, 78, 221, 0.15));
  border-color: rgba(0, 212, 255, 0.8);
  transform: scale(1.15);
  box-shadow: 
    0 8px 30px rgba(0, 212, 255, 0.4),
    0 0 50px rgba(0, 212, 255, 0.3),
    inset 0 0 30px rgba(0, 212, 255, 0.2);
}

.tech-point:hover .tech-dot::before {
  opacity: 0.3;
  animation: borderRotate 3s linear infinite;
}

@keyframes borderRotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.tech-dot.active {
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.3), rgba(157, 78, 221, 0.2));
  border-color: rgba(0, 212, 255, 1);
  box-shadow: 
    0 0 40px rgba(0, 212, 255, 1),
    0 0 80px rgba(0, 212, 255, 0.6),
    0 10px 40px rgba(0, 212, 255, 0.4),
    inset 0 0 30px rgba(0, 212, 255, 0.3);
  transform: scale(1.25);
}

.tech-dot.active::before {
  opacity: 0.5;
  animation: borderRotate 2s linear infinite;
}

.tech-emoji {
  font-size: 28px;
  filter: drop-shadow(0 0 8px rgba(0, 212, 255, 0.8));
  transition: all 0.3s ease;
}

@media (max-width: 992px) {
  .tech-radar {
    margin-bottom: 50px;
  }
}

@media (max-width: 768px) {
  .tech-radar {
    margin-bottom: 40px;
  }

  .pulse-ring {
    width: 84px;
    height: 84px;
  }

  @keyframes pulseRing {
    0% {
      width: 84px;
      height: 84px;
      opacity: 1;
    }
    100% {
      width: 168px;
      height: 168px;
      opacity: 0;
    }
  }

  .core-tech {
    width: 84px;
    height: 84px;
  }

  .tech-dot {
    width: 54px;
    height: 54px;
  }

  .tech-emoji {
    font-size: 24px;
  }
}

@media (max-width: 576px) {
  .pulse-ring {
    width: 72px;
    height: 72px;
  }

  @keyframes pulseRing {
    0% {
      width: 72px;
      height: 72px;
      opacity: 1;
    }
    100% {
      width: 144px;
      height: 144px;
      opacity: 0;
    }
  }

  .core-tech {
    width: 72px;
    height: 72px;
  }

  .tech-dot {
    width: 48px;
    height: 48px;
  }

  .tech-emoji {
    font-size: 22px;
  }
}

.tech-point:hover .tech-emoji {
  filter: drop-shadow(0 0 15px rgba(0, 212, 255, 1));
  transform: scale(1.1) rotate(5deg);
}

.tech-dot.active .tech-emoji {
  filter: drop-shadow(0 0 20px rgba(0, 212, 255, 1));
  transform: scale(1.15);
  animation: emojiPulse 1.5s ease-in-out infinite;
}

@keyframes emojiPulse {
  0%, 100% {
    transform: scale(1.15);
  }
  50% {
    transform: scale(1.25);
  }
}

.tech-label {
  position: absolute;
  white-space: nowrap;
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
  pointer-events: none;
  padding: 6px 12px;
  background: rgba(10, 14, 39, 0.8);
  border-radius: 8px;
  border: 1px solid rgba(0, 212, 255, 0.3);
  backdrop-filter: blur(10px);
  /* 根据角度动态定位标签 */
  top: 50%;
  left: 50%;
  transform: 
    translateX(-50%) 
    translateY(-50%)
    rotate(calc(-1 * var(--angle)))
    translateY(-50px);
}

/* 技术图例 */
.tech-legend {
  max-width: 900px;
  margin: 0 auto 40px;
  text-align: center;
}

.legend-title {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 20px;
  font-weight: 600;
}

.legend-items {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.legend-item:hover,
.legend-item.active {
  background: rgba(0, 212, 255, 0.15);
  border-color: rgba(0, 212, 255, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 212, 255, 0.3);
}

.legend-emoji {
  font-size: 18px;
  filter: drop-shadow(0 0 5px rgba(0, 212, 255, 0.4));
}

.legend-name {
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
}

.legend-item.active .legend-name {
  color: #00d4ff;
}

/* 技术详情卡片 */
.tech-detail-card {
  max-width: 700px;
  margin: 40px auto;
  padding: 35px;
  border-radius: 20px;
  border: 1px solid rgba(0, 212, 255, 0.3);
  box-shadow: 0 10px 40px rgba(0, 212, 255, 0.2);
  position: relative;
}

.close-inline-btn {
  border: 1px solid rgba(93, 188, 255, 0.35);
  background: rgba(7, 18, 50, 0.55);
  color: rgba(222, 242, 255, 0.9);
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 12px;
  line-height: 1;
  cursor: pointer;
  transition: all 0.2s ease;
}

.close-inline-btn:hover {
  border-color: rgba(93, 188, 255, 0.62);
  background: rgba(25, 120, 255, 0.2);
}

.tech-detail-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.tech-detail-emoji {
  font-size: 40px;
  filter: drop-shadow(0 0 10px rgba(0, 212, 255, 0.6));
}

.tech-detail-header h3 {
  font-size: 28px;
  font-weight: 700;
  color: #fff;
  flex: 1;
}

.tech-level {
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  color: white;
  box-shadow: 0 0 15px rgba(0, 212, 255, 0.4);
}

.tech-description {
  font-size: 16px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 20px;
}

.tech-projects {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  padding: 12px 20px;
  background: rgba(0, 212, 255, 0.1);
  border-radius: 10px;
  border: 1px solid rgba(0, 212, 255, 0.2);
}

.tech-projects strong {
  color: #00d4ff;
  font-size: 14px;
}

.tech-projects span {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
}

.tech-tags {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.tech-tags :deep(.el-tag) {
  background: rgba(157, 78, 221, 0.2);
  border-color: rgba(157, 78, 221, 0.4);
  color: #9d4edd;
}

/* 过渡动画 */
.slide-up-enter-active, .slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* 通用样式 */
.glass-effect {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@media (max-width: 768px) {
  .tech-stack-section {
    padding-top: 46px;
  }

  .tech-radar {
    width: min(336px, 92vw);
    height: min(336px, 92vw);
    margin: 12px auto 20px;
    border-width: 1px;
    border-color: rgba(93, 188, 255, 0.45);
    box-shadow:
      inset 0 0 36px rgba(0, 212, 255, 0.12),
      0 0 26px rgba(0, 212, 255, 0.14);
    background:
      radial-gradient(circle at center, rgba(0, 212, 255, 0.09) 0%, transparent 56%),
      radial-gradient(circle at center, transparent 28%, rgba(93, 188, 255, 0.1) 28%, rgba(93, 188, 255, 0.1) 29%, transparent 29%),
      radial-gradient(circle at center, transparent 48%, rgba(93, 188, 255, 0.09) 48%, rgba(93, 188, 255, 0.09) 49%, transparent 49%),
      radial-gradient(circle at center, transparent 68%, rgba(93, 188, 255, 0.08) 68%, rgba(93, 188, 255, 0.08) 69%, transparent 69%);
  }

  .tech-radar::before {
    display: none;
  }

  .radar-center {
    transform: translate(-50%, -50%) scale(0.92);
  }

  .tech-point {
    transform: translate(-50%, -50%) scale(0.86);
  }

  .tech-dot {
    width: 44px;
    height: 44px;
    border-width: 2px;
    box-shadow:
      0 3px 14px rgba(0, 212, 255, 0.18),
      inset 0 0 14px rgba(0, 212, 255, 0.08);
  }

  .tech-emoji {
    font-size: 20px;
  }

  .tech-label {
    font-size: 10px;
    padding: 3px 6px;
    display: none;
  }

  .tech-legend {
    margin: 15px auto 25px;
  }

  .legend-title {
    font-size: 12px;
    margin-bottom: 12px;
  }

  .legend-items {
    gap: 6px;
  }

  .legend-item {
    padding: 6px 10px;
    border-radius: 8px;
  }

  .legend-emoji {
    font-size: 14px;
  }

  .legend-name {
    font-size: 11px;
  }

  .tech-detail-card {
    padding: 20px;
    margin: 15px auto;
    max-width: 90%;
  }

  .tech-detail-header h3 {
    font-size: 18px;
  }

  .tech-detail-emoji {
    font-size: 24px;
  }

  .tech-description {
    font-size: 14px;
  }

  .section-header h2 {
    font-size: 22px;
  }

  .section-header p {
    font-size: 13px;
  }
}

@media (max-width: 576px) {
  .tech-radar {
    width: min(310px, 92vw);
    height: min(310px, 92vw);
    margin: 10px auto 16px;
  }

  .radar-center {
    transform: translate(-50%, -50%) scale(0.88);
  }

  .tech-point {
    transform: translate(-50%, -50%) scale(0.82);
  }

  .tech-dot {
    width: 42px;
    height: 42px;
  }

  .tech-emoji {
    font-size: 18px;
  }

  .legend-item {
    padding: 5px 8px;
  }

  .legend-name {
    font-size: 10px;
  }

  .tech-detail-card {
    padding: 16px;
    border-radius: 16px;
    margin: 10px auto;
  }

  .close-inline-btn {
    padding: 4px 9px;
    font-size: 11px;
  }

  .tech-detail-header h3 {
    font-size: 16px;
  }

  .tech-level {
    font-size: 10px;
    padding: 3px 8px;
  }

  .tech-tags {
    gap: 5px;
  }

  .tech-tags :deep(.el-tag) {
    font-size: 10px;
    padding: 2px 6px;
  }
}

/* Mobile readability overrides */
@media (max-width: 768px) {
  .tech-stack-section {
    padding-top: 54px;
  }

  .section-header {
    margin-bottom: 36px;
  }

  .section-header h2 {
    font-size: 28px !important;
    line-height: 1.3;
  }

  .section-header p {
    font-size: 15px !important;
    line-height: 1.6;
    padding: 0 10px;
  }

  .tech-radar {
    width: min(360px, 94vw) !important;
    height: min(360px, 94vw) !important;
    margin: 16px auto 24px !important;
  }

  .radar-center {
    transform: translate(-50%, -50%) scale(0.98) !important;
  }

  .core-tech {
    width: 88px !important;
    height: 88px !important;
  }

  .core-tech span:last-child {
    font-size: 11px !important;
    line-height: 1.1;
    letter-spacing: 0;
    white-space: nowrap;
    margin-top: 4px;
  }

  .tech-point {
    transform: translate(-50%, -50%) scale(0.95) !important;
  }

  .tech-dot {
    width: 52px !important;
    height: 52px !important;
  }

  .tech-emoji {
    font-size: 22px !important;
  }

  .legend-title {
    font-size: 13px !important;
  }

  .legend-items {
    gap: 8px !important;
    padding: 0 8px;
  }

  .legend-item {
    padding: 8px 11px !important;
  }

  .legend-name {
    font-size: 12px !important;
    white-space: nowrap;
  }

  .tech-detail-card {
    max-width: calc(100% - 20px) !important;
    margin: 18px auto !important;
    padding: 20px !important;
  }

  .tech-description {
    font-size: 14px !important;
    line-height: 1.7 !important;
  }
}

@media (max-width: 576px) {
  .radar-center {
    transform: translate(-50%, -50%) scale(0.95) !important;
  }

  .core-tech {
    width: 82px !important;
    height: 82px !important;
  }

  .core-tech span:last-child {
    font-size: 10px !important;
  }
}
</style>

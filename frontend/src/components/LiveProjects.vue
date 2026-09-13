<template>
  <section class="live-projects-section">
    <div class="container">
      <div class="section-header">
        <h2>🔴 实时项目动态</h2>
        <p>透明化展示 · 正在进行的项目 · 实时更新</p>
        <div class="live-indicator">
          <span class="live-dot"></span>
          <span class="live-text">LIVE</span>
        </div>
      </div>

      <!-- 项目进度卡片 -->
      <div class="projects-grid">
        <div 
          v-for="project in liveProjects" 
          :key="project.id"
          class="project-card glass-effect"
          :class="{ 'project-active': project.status === 'active' }"
        >
          <!-- 项目状态标签 -->
          <div class="project-status" :class="project.status">
            <span class="status-dot"></span>
            <span class="status-text">{{ statusMap[project.status] }}</span>
            <span class="project-days">D+{{ project.days }}</span>
          </div>

          <!-- 项目信息 -->
          <div class="project-info">
            <div class="project-icon">{{ project.icon }}</div>
            <h3>{{ project.name }}</h3>
            <p class="project-type">{{ project.type }}</p>
          </div>

          <!-- 进度条 -->
          <div class="progress-wrapper">
            <div class="progress-header">
              <span class="progress-label">开发进度</span>
              <span class="progress-value">{{ project.progress }}%</span>
            </div>
            <div class="progress-bar">
              <div 
                class="progress-fill" 
                :style="{ 
                  width: project.progress + '%',
                  background: project.progressColor 
                }"
              >
                <div class="progress-glow"></div>
              </div>
            </div>
          </div>

          <!-- 阶段信息 -->
          <div class="project-stage">
            <div class="stage-item" 
              v-for="stage in project.stages" 
              :key="stage.name"
              :class="{ completed: stage.completed, active: stage.active }"
            >
              <div class="stage-icon">
                <el-icon v-if="stage.completed"><Check /></el-icon>
                <span v-else-if="stage.active" class="spinner"></span>
              </div>
              <span class="stage-name">{{ stage.name }}</span>
            </div>
          </div>

          <!-- 最新动态 -->
          <div class="project-update">
            <el-icon class="update-icon"><Clock /></el-icon>
            <span class="update-time">{{ project.lastUpdate }}</span>
            <span class="update-text">{{ project.updateText }}</span>
          </div>
        </div>
      </div>

      <!-- 项目统计 -->
      <div class="project-stats">
        <div class="stat-item">
          <div class="stat-number">{{ stats.active }}</div>
          <div class="stat-label">进行中</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">{{ stats.completed }}</div>
          <div class="stat-label">本月完成</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">{{ stats.onTime }}%</div>
          <div class="stat-label">按时交付率</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">{{ stats.satisfaction }}%</div>
          <div class="stat-label">客户满意度</div>
        </div>
      </div>

      <!-- 提示信息 -->
      <div class="transparency-note">
        <el-icon><InfoFilled /></el-icon>
        <span>我们相信透明化展示才能赢得信任。以上是真实进行中的项目(已脱敏处理)</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Check, Clock, InfoFilled } from '@element-plus/icons-vue'

const statusMap = {
  active: '🔥 进行中',
  testing: '🧪 测试中',
  deploy: '🚀 部署中',
  completed: '✅ 已完成'
}

const liveProjects = ref([
  {
    id: 1,
    name: '某教育平台AI助教系统',
    type: 'AI开发 + 小程序',
    icon: '🎓',
    status: 'active',
    days: 23,
    progress: 68,
    progressColor: 'linear-gradient(90deg, #00d4ff, #0099cc)',
    lastUpdate: '2小时前',
    updateText: '完成GPT-4接口集成，正在优化提示词',
    stages: [
      { name: '需求', completed: true },
      { name: '设计', completed: true },
      { name: '开发', active: true },
      { name: '测试', completed: false },
      { name: '上线', completed: false }
    ]
  },
  {
    id: 2,
    name: '某零售企业智能库存管理系统',
    type: 'WEB系统 + 数据分析',
    icon: '📦',
    status: 'testing',
    days: 45,
    progress: 85,
    progressColor: 'linear-gradient(90deg, #9d4edd, #7b2cbf)',
    lastUpdate: '30分钟前',
    updateText: '完成第二轮测试，Bug修复率92%',
    stages: [
      { name: '需求', completed: true },
      { name: '设计', completed: true },
      { name: '开发', completed: true },
      { name: '测试', active: true },
      { name: '上线', completed: false }
    ]
  },
  {
    id: 3,
    name: '某品牌电商小程序',
    type: '小程序 + 后端',
    icon: '🛍️',
    status: 'deploy',
    days: 38,
    progress: 95,
    progressColor: 'linear-gradient(90deg, #ff006e, #d90066)',
    lastUpdate: '1小时前',
    updateText: '正在进行生产环境部署和压力测试',
    stages: [
      { name: '需求', completed: true },
      { name: '设计', completed: true },
      { name: '开发', completed: true },
      { name: '测试', completed: true },
      { name: '上线', active: true }
    ]
  },
  {
    id: 4,
    name: '某物流App运输追踪功能',
    type: 'App开发 + IoT',
    icon: '🚚',
    status: 'active',
    days: 12,
    progress: 42,
    progressColor: 'linear-gradient(90deg, #06ffa5, #00cc83)',
    lastUpdate: '5小时前',
    updateText: '完成地图SDK集成，开始实时定位功能开发',
    stages: [
      { name: '需求', completed: true },
      { name: '设计', completed: true },
      { name: '开发', active: true },
      { name: '测试', completed: false },
      { name: '上线', completed: false }
    ]
  }
])

const stats = ref({
  active: 7,
  completed: 12,
  onTime: 96,
  satisfaction: 98
})

// 模拟实时更新
let updateInterval = null

onMounted(() => {
  updateInterval = setInterval(() => {
    // 随机更新某个项目的进度
    const randomProject = liveProjects.value[Math.floor(Math.random() * liveProjects.value.length)]
    if (randomProject.progress < 95) {
      randomProject.progress = Math.min(randomProject.progress + Math.random() * 2, 95)
    }
  }, 10000) // 每10秒更新一次
})

onUnmounted(() => {
  if (updateInterval) {
    clearInterval(updateInterval)
  }
})
</script>

<style scoped>
.live-projects-section {
  padding: 60px 0;
  position: relative;
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
  margin-bottom: 60px;
  position: relative;
}

.section-header h2 {
  font-size: 42px;
  font-weight: 800;
  background: linear-gradient(135deg, #ff006e 0%, #00d4ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 15px;
}

.section-header p {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.7);
}

.live-indicator {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 15px;
  padding: 8px 20px;
  background: rgba(255, 0, 110, 0.1);
  border: 1px solid rgba(255, 0, 110, 0.3);
  border-radius: 20px;
}

.live-dot {
  width: 10px;
  height: 10px;
  background: #ff006e;
  border-radius: 50%;
  animation: livePulse 2s ease-in-out infinite;
  box-shadow: 0 0 15px rgba(255, 0, 110, 0.8);
}

@keyframes livePulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.3);
    opacity: 0.7;
  }
}

.live-text {
  font-size: 14px;
  font-weight: 700;
  color: #ff006e;
  letter-spacing: 2px;
}

/* 项目卡片 */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
}

.project-card {
  padding: 30px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}

.project-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, transparent, #00d4ff, transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover::before,
.project-active::before {
  opacity: 1;
}

.project-card:hover {
  transform: translateY(-5px);
  border-color: rgba(0, 212, 255, 0.4);
  box-shadow: 0 15px 40px rgba(0, 212, 255, 0.2);
}

/* 项目状态 */
.project-status {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  font-size: 13px;
  font-weight: 600;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  animation: statusPulse 2s ease-in-out infinite;
}

.project-status.active .status-dot {
  background: #00d4ff;
  box-shadow: 0 0 10px rgba(0, 212, 255, 0.8);
}

.project-status.testing .status-dot {
  background: #9d4edd;
  box-shadow: 0 0 10px rgba(157, 78, 221, 0.8);
}

.project-status.deploy .status-dot {
  background: #ff006e;
  box-shadow: 0 0 10px rgba(255, 0, 110, 0.8);
}

@keyframes statusPulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.status-text {
  color: rgba(255, 255, 255, 0.9);
}

.project-days {
  margin-left: auto;
  padding: 4px 12px;
  background: rgba(0, 212, 255, 0.1);
  border-radius: 10px;
  color: #00d4ff;
  font-size: 12px;
}

/* 项目信息 */
.project-info {
  margin-bottom: 25px;
}

.project-icon {
  font-size: 40px;
  margin-bottom: 15px;
  filter: drop-shadow(0 0 10px rgba(0, 212, 255, 0.3));
}

.project-info h3 {
  font-size: 20px;
  color: #fff;
  margin-bottom: 8px;
  font-weight: 700;
}

.project-type {
  font-size: 14px;
  color: rgba(0, 212, 255, 0.8);
  font-weight: 500;
}

/* 进度条 */
.progress-wrapper {
  margin-bottom: 25px;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.progress-label {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
}

.progress-value {
  font-size: 15px;
  font-weight: 700;
  color: #00d4ff;
}

.progress-bar {
  height: 8px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

.progress-fill {
  height: 100%;
  border-radius: 10px;
  position: relative;
  transition: width 1s ease;
}

.progress-glow {
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3));
  animation: progressShine 2s ease-in-out infinite;
}

@keyframes progressShine {
  0% {
    transform: translateX(-50px);
  }
  100% {
    transform: translateX(50px);
  }
}

/* 阶段信息 */
.project-stage {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  padding: 15px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.stage-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex: 1;
  opacity: 0.4;
  transition: opacity 0.3s ease;
}

.stage-item.completed,
.stage-item.active {
  opacity: 1;
}

.stage-icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
}

.stage-item.completed .stage-icon {
  background: rgba(0, 212, 255, 0.2);
  border-color: #00d4ff;
  color: #00d4ff;
}

.stage-item.active .stage-icon {
  background: rgba(157, 78, 221, 0.2);
  border-color: #9d4edd;
  color: #9d4edd;
  animation: stagePulse 1.5s ease-in-out infinite;
}

@keyframes stagePulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(157, 78, 221, 0.7);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(157, 78, 221, 0);
  }
}

.spinner {
  width: 12px;
  height: 12px;
  border: 2px solid rgba(157, 78, 221, 0.3);
  border-top-color: #9d4edd;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.stage-name {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 600;
}

.stage-item.completed .stage-name,
.stage-item.active .stage-name {
  color: rgba(255, 255, 255, 0.9);
}

/* 最新动态 */
.project-update {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 15px;
  background: rgba(0, 212, 255, 0.05);
  border-radius: 10px;
  border-left: 3px solid rgba(0, 212, 255, 0.5);
}

.update-icon {
  font-size: 16px;
  color: #00d4ff;
  flex-shrink: 0;
}

.update-time {
  font-size: 12px;
  color: rgba(0, 212, 255, 0.8);
  font-weight: 600;
  flex-shrink: 0;
}

.update-text {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
}

/* 项目统计 */
.project-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
}

.stat-item {
  text-align: center;
  padding: 30px 20px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-5px);
  border-color: rgba(0, 212, 255, 0.3);
  box-shadow: 0 10px 30px rgba(0, 212, 255, 0.15);
}

.stat-number {
  font-size: 36px;
  font-weight: 900;
  background: linear-gradient(135deg, #00d4ff, #9d4edd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 10px;
}

.stat-label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 600;
}

/* 透明提示 */
.transparency-note {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 15px 25px;
  background: rgba(0, 212, 255, 0.05);
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 12px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
}

.transparency-note :deep(.el-icon) {
  font-size: 18px;
  color: #00d4ff;
}

.glass-effect {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
  
  .project-stage {
    gap: 8px;
  }
  
  .stage-name {
    font-size: 10px;
  }
}
</style>

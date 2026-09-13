<template>
  <div class="custom-development">
    <!-- 粒子背景 -->
    <ParticleBackground />
    
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="container">
        <h1 class="gradient-text animate__animated animate__fadeInDown">定制开发</h1>
        <p class="animate__animated animate__fadeInUp">量身定制 · 精准匹配需求 · 专属解决方案</p>
        <div class="header-decoration">
          <div class="deco-line"></div>
          <div class="deco-dot"></div>
          <div class="deco-line"></div>
        </div>
      </div>
    </div>

    <!-- 服务介绍 -->
    <section class="intro-section">
      <div class="container">
        <div class="intro-content">
          <div class="intro-text">
            <h2>专业的定制开发服务</h2>
            <p>
              我们提供全方位的软件定制开发服务，从需求分析、方案设计到开发实施、
              上线运维，全程跟踪服务。无论是企业内部管理系统、行业解决方案，
              还是创新产品研发，我们都能提供专业的定制化服务。
            </p>
            <ul class="feature-list">
              <li><el-icon><Check /></el-icon>深度需求分析，精准把握痛点</li>
              <li><el-icon><Check /></el-icon>灵活技术选型，量身定制方案</li>
              <li><el-icon><Check /></el-icon>敏捷开发流程，快速响应变化</li>
              <li><el-icon><Check /></el-icon>全程技术支持，持续优化迭代</li>
            </ul>
          </div>
          <div class="intro-image">
            <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=600" alt="定制开发">
          </div>
        </div>
      </div>
    </section>

    <!-- 服务类型 -->
    <section class="types-section">
      <div class="container">
        <div class="section-header">
          <h2>定制服务类型</h2>
          <p>覆盖多个业务场景</p>
        </div>
        
        <div class="types-grid">
          <div v-for="type in serviceTypes" :key="type.id" class="type-card">
            <div class="type-icon">
              <component :is="type.icon" :size="40" />
            </div>
            <h3>{{ type.title }}</h3>
            <p>{{ type.description }}</p>
            <div class="type-features">
              <span v-for="feature in type.features" :key="feature">{{ feature }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 开发流程 -->
    <section class="process-section">
      <div class="container">
        <div class="section-header">
          <h2>定制开发流程</h2>
          <p>专业流程，品质保障</p>
        </div>
        
        <div class="process-timeline">
          <div v-for="(step, index) in developmentSteps" :key="step.id" class="process-item">
            <div class="process-number">{{ index + 1 }}</div>
            <div class="process-content">
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 技术优势 -->
    <section class="advantages-section">
      <div class="container">
        <div class="section-header">
          <h2>我们的优势</h2>
          <p>为什么选择我们</p>
        </div>
        
        <div class="advantages-grid">
          <div v-for="advantage in advantages" :key="advantage.id" class="advantage-card">
            <div class="advantage-icon">
              <component :is="advantage.icon" :size="35" />
            </div>
            <h3>{{ advantage.title }}</h3>
            <p>{{ advantage.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ParticleBackground from '@/components/ParticleBackground.vue'
import { Check, Monitor, Setting, DataAnalysis, Trophy, Timer, Compass } from '@element-plus/icons-vue'

const serviceTypes = ref([
  {
    id: 1,
    title: '企业管理系统',
    icon: Setting,
    description: 'ERP、CRM、OA等企业内部管理系统定制开发',
    features: ['流程自动化', '数据集成', '权限管理']
  },
  {
    id: 2,
    title: '行业解决方案',
    icon: Compass,
    description: '针对特定行业的专业化解决方案定制',
    features: ['行业深耕', '专业团队', '成功案例']
  },
  {
    id: 3,
    title: '数据分析平台',
    icon: DataAnalysis,
    description: '大数据采集、分析、可视化平台定制开发',
    features: ['数据治理', '智能分析', '可视化']
  },
  {
    id: 4,
    title: '创新产品研发',
    icon: Monitor,
    description: '创新型产品的从0到1研发与技术实现',
    features: ['技术创新', '快速验证', 'MVP开发']
  }
])

const developmentSteps = ref([
  {
    id: 1,
    title: '需求调研',
    description: '深入了解业务场景，梳理功能需求，明确项目目标'
  },
  {
    id: 2,
    title: '方案设计',
    description: '制定技术方案，设计系统架构，规划开发路线'
  },
  {
    id: 3,
    title: '原型确认',
    description: '设计交互原型，确认业务流程，验证需求理解'
  },
  {
    id: 4,
    title: '开发实施',
    description: '敏捷迭代开发，定期汇报进度，及时调整优化'
  },
  {
    id: 5,
    title: '测试验收',
    description: '严格质量把控，全面功能测试，确保交付质量'
  },
  {
    id: 6,
    title: '上线运维',
    description: '协助系统上线，提供技术支持，持续优化迭代'
  }
])

const advantages = ref([
  {
    id: 1,
    icon: Trophy,
    title: '专业团队',
    description: '10年+行业经验，技术全栈覆盖'
  },
  {
    id: 2,
    icon: Timer,
    title: '高效交付',
    description: '敏捷开发模式，快速响应需求'
  },
  {
    id: 3,
    icon: Setting,
    title: '灵活定制',
    description: '深度定制开发，完美适配业务'
  },
  {
    id: 4,
    icon: DataAnalysis,
    title: '持续支持',
    description: '全程技术支持，长期优化服务'
  }
])
</script>

<style scoped>
.custom-development {
  min-height: 100vh;
  background: linear-gradient(180deg, #0a0e27 0%, #1a1f3a 100%);
  position: relative;
  overflow-x: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 30px;
  position: relative;
  z-index: 1;
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-header h2 {
  font-size: 40px;
  font-weight: 800;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #00d4ff 0%, #9d4edd 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-header p {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.6);
}

/* Page Header */
.page-header {
  position: relative;
  padding: 150px 0 100px;
  text-align: center;
  overflow: hidden;
}

.page-header::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%);
  animation: rotate 20s linear infinite;
}

.page-header h1 {
  font-size: 56px;
  font-weight: 900;
  margin-bottom: 24px;
  position: relative;
  z-index: 2;
}

.page-header p {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 40px;
  position: relative;
  z-index: 2;
}

.header-decoration {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-top: 30px;
  position: relative;
  z-index: 2;
}

.deco-line {
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #00d4ff, transparent);
  box-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
}

.deco-dot {
  width: 8px;
  height: 8px;
  background: #00d4ff;
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.8);
  animation: pulse 2s ease-in-out infinite;
}

/* Intro Section */
.intro-section {
  padding: 80px 0;
  position: relative;
  z-index: 1;
}

.intro-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.intro-text h2 {
  font-size: 32px;
  color: #fff;
  margin-bottom: 25px;
  background: linear-gradient(135deg, #00d4ff 0%, #9d4edd 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.intro-text p {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.8;
  margin-bottom: 30px;
}

.feature-list {
  list-style: none;
  padding: 0;
}

.feature-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 0;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
}

.feature-list .el-icon {
  color: #00d4ff;
  font-size: 20px;
}

.intro-image img {
  width: 100%;
  border-radius: 20px;
  border: 1px solid rgba(0, 212, 255, 0.3);
  box-shadow: 0 10px 40px rgba(0, 212, 255, 0.2),
              0 0 60px rgba(0, 212, 255, 0.1);
}

/* Types Section */
.types-section {
  padding: 80px 0;
  background: transparent;
  position: relative;
}

.types-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  z-index: 0;
}

.types-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  position: relative;
  z-index: 1;
}

.type-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  padding: 35px 28px;
  border-radius: 20px;
  border: 1px solid rgba(0, 212, 255, 0.2);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.4s ease;
}

.type-card:hover {
  transform: translateY(-10px);
  border-color: rgba(0, 212, 255, 0.5);
  box-shadow: 0 20px 50px rgba(0, 212, 255, 0.3),
              0 0 30px rgba(0, 212, 255, 0.2);
}

.type-icon {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00d4ff 0%, #9d4edd 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: 25px;
  box-shadow: 0 0 30px rgba(0, 212, 255, 0.5);
}

.type-card h3 {
  font-size: 22px;
  color: #fff;
  margin-bottom: 15px;
  font-weight: 700;
}

.type-card p {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.8;
  margin-bottom: 20px;
}

.type-features {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.type-features span {
  padding: 4px 12px;
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 12px;
  font-size: 13px;
  color: rgba(0, 212, 255, 0.9);
}

/* Process Section */
.process-section {
  padding: 80px 0;
  background: transparent;
}

.process-timeline {
  max-width: 900px;
  margin: 0 auto;
  position: relative;
}

.process-timeline::before {
  content: '';
  position: absolute;
  left: 30px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, #00d4ff 0%, #9d4edd 100%);
  box-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
}

.process-item {
  display: flex;
  gap: 30px;
  margin-bottom: 40px;
  position: relative;
}

.process-number {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00d4ff 0%, #9d4edd 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  flex-shrink: 0;
  z-index: 1;
  box-shadow: 0 0 30px rgba(0, 212, 255, 0.6);
}

.process-content {
  flex: 1;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  padding: 25px;
  border-radius: 16px;
  border: 1px solid rgba(0, 212, 255, 0.2);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.process-content h3 {
  font-size: 20px;
  color: #fff;
  margin-bottom: 10px;
  font-weight: 700;
}

.process-content p {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.8;
}

/* Advantages Section */
.advantages-section {
  padding: 80px 0;
  background: transparent;
}

.advantages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 30px;
}

.advantage-card {
  text-align: center;
  padding: 35px 25px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(157, 78, 221, 0.2);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.4s ease;
}

.advantage-card:hover {
  transform: translateY(-10px);
  border-color: rgba(157, 78, 221, 0.5);
  box-shadow: 0 20px 50px rgba(157, 78, 221, 0.3);
}

.advantage-icon {
  width: 70px;
  height: 70px;
  margin: 0 auto 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #9d4edd 0%, #ff006e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 0 30px rgba(157, 78, 221, 0.5);
}

.advantage-card h3 {
  font-size: 20px;
  color: #fff;
  margin-bottom: 12px;
  font-weight: 700;
}

.advantage-card p {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.8;
}

/* Animations */
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
}

/* 响应式 */
@media (max-width: 768px) {
  .intro-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .page-header h1 {
    font-size: 36px;
  }
  
  .types-grid,
  .advantages-grid {
    grid-template-columns: 1fr;
  }
}
</style>

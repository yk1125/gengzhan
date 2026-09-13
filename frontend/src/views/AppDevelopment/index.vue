<template>
  <div class="app-development">
    <!-- 粒子背景 -->
    <ParticleBackground />
    
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="container">
        <h1 class="gradient-text animate__animated animate__fadeInDown">APP开发</h1>
        <p class="animate__animated animate__fadeInUp">专业的移动应用开发服务 · 助力企业移动化转型 · 打造爆款App</p>
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
            <h2>专业的APP开发服务</h2>
            <p>
              我们提供iOS、Android原生开发及跨平台开发服务，拥有丰富的移动应用开发经验。
              无论是企业级应用还是消费类应用，我们都能为您提供专业的解决方案。
            </p>
            <ul class="feature-list">
              <li><el-icon><Check /></el-icon>原生开发，性能优异</li>
              <li><el-icon><Check /></el-icon>跨平台方案，降低成本</li>
              <li><el-icon><Check /></el-icon>完善的测试流程</li>
              <li><el-icon><Check /></el-icon>持续的技术支持</li>
            </ul>
          </div>
          <div class="intro-image">
            <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600" alt="APP开发">
          </div>
        </div>
      </div>
    </section>

    <!-- 开发类型 -->
    <section class="types-section">
      <div class="container">
        <div class="section-header">
          <h2>开发类型</h2>
          <p>支持多种开发方式，满足不同需求</p>
        </div>
        
        <div class="types-grid">
          <div v-for="type in devTypes" :key="type.id" class="type-card">
            <div class="type-icon">
              <component :is="type.icon" :size="40" />
            </div>
            <h3>{{ type.title }}</h3>
            <p>{{ type.description }}</p>
            <div class="type-tech">
              <el-tag v-for="tech in type.technologies" :key="tech" size="small">{{ tech }}</el-tag>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 应用场景 -->
    <section class="scenarios-section">
      <div class="container">
        <div class="section-header">
          <h2>应用场景</h2>
          <p>覆盖多个行业领域</p>
        </div>
        
        <div class="scenarios-grid">
          <div v-for="scenario in scenarios" :key="scenario.id" class="scenario-card">
            <div class="scenario-image">
              <img :src="scenario.image" :alt="scenario.title">
            </div>
            <div class="scenario-info">
              <h3>{{ scenario.title }}</h3>
              <p>{{ scenario.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 开发流程 -->
    <section id="delivery-process" class="process-section">
      <div class="container">
        <div class="section-header">
          <h2>开发流程</h2>
          <p>专业规范的开发流程，保证项目质量</p>
        </div>
        
        <div class="process-timeline">
          <div v-for="(step, index) in processSteps" :key="step.id" class="process-item">
            <div class="process-number">{{ index + 1 }}</div>
            <div class="process-content">
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
      <div class="container">
        <h2>开始您的APP开发项目</h2>
        <p>专业团队为您提供一站式服务</p>
        <el-button type="primary" size="large" @click="$router.push('/ai-consultation')">
          发起项目咨询
        </el-button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Iphone, Monitor, Connection, Check } from '@element-plus/icons-vue'
import ParticleBackground from '@/components/ParticleBackground.vue'

const devTypes = ref([
  {
    id: 1,
    icon: Iphone,
    title: 'iOS开发',
    description: '采用Swift/Objective-C进行原生开发，充分发挥iOS平台特性',
    technologies: ['Swift', 'SwiftUI', 'UIKit', 'Core Data']
  },
  {
    id: 2,
    icon: Monitor,
    title: 'Android开发',
    description: '使用Kotlin/Java进行原生开发，兼容各类Android设备',
    technologies: ['Kotlin', 'Jetpack', 'Material Design', 'Room']
  },
  {
    id: 3,
    icon: Connection,
    title: '跨平台开发',
    description: '一套代码多端运行，降低开发成本，提高开发效率',
    technologies: ['Flutter', 'React Native', 'Uni-app']
  }
])

const scenarios = ref([
  {
    id: 1,
    title: '电商购物',
    description: '打造完整的电商生态，提供流畅的购物体验',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400'
  },
  {
    id: 2,
    title: '社交网络',
    description: '构建社交平台，连接用户，分享生活',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400'
  },
  {
    id: 3,
    title: '在线教育',
    description: '提供在线学习平台，实现知识传播',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400'
  },
  {
    id: 4,
    title: '企业办公',
    description: '提升企业办公效率，实现移动化管理',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400'
  }
])

const processSteps = ref([
  {
    id: 1,
    title: '需求分析',
    description: '深入了解客户需求，制定产品规划方案'
  },
  {
    id: 2,
    title: 'UI设计',
    description: '设计精美的用户界面，提供优质的用户体验'
  },
  {
    id: 3,
    title: '功能开发',
    description: '按照设计稿进行功能开发，保证代码质量'
  },
  {
    id: 4,
    title: '测试优化',
    description: '全面测试应用功能，优化性能和用户体验'
  },
  {
    id: 5,
    title: '上线发布',
    description: '协助应用上架，提供运营指导'
  },
  {
    id: 6,
    title: '维护升级',
    description: '持续提供技术支持和功能迭代'
  }
])
</script>

<style scoped>
.app-development {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(180deg, #0a0e27 0%, #1a1f3a 100%);
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
}

.section-header h2 {
  font-size: 40px;
  font-weight: 800;
  color: white;
  margin-bottom: 16px;
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
  padding: 100px 0;
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
  font-size: 36px;
  font-weight: 800;
  color: white;
  margin-bottom: 24px;
}

.intro-text p {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.8;
  margin-bottom: 32px;
}

.feature-list {
  list-style: none;
  padding: 0;
}

.feature-list li {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 16px;
}

.feature-list li .el-icon {
  color: #00d4ff;
  font-size: 20px;
}

.intro-image {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.intro-image img {
  width: 100%;
  display: block;
}

/* Types Section */
.types-section {
  padding: 80px 0;
  background: rgba(255, 255, 255, 0.02);
  position: relative;
  z-index: 1;
}

.types-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
}

.type-card {
  background: rgba(255, 255, 255, 0.05);
  padding: 40px 30px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.type-card:hover {
  transform: translateY(-8px);
  border-color: rgba(0, 212, 255, 0.5);
  box-shadow: 0 15px 40px rgba(0, 212, 255, 0.2);
}

.type-icon {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.2) 0%, rgba(157, 78, 221, 0.2) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00d4ff;
  margin-bottom: 25px;
}

.type-card h3 {
  font-size: 22px;
  font-weight: 700;
  color: white;
  margin-bottom: 15px;
}

.type-card p {
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.8;
  margin-bottom: 20px;
}

.type-tech {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

/* Scenarios Section */
.scenarios-section {
  padding: 80px 0;
  position: relative;
  z-index: 1;
}

.scenarios-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
}

.scenario-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.scenario-card:hover {
  transform: translateY(-8px);
  border-color: rgba(0, 212, 255, 0.3);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}

.scenario-image {
  height: 200px;
  overflow: hidden;
}

.scenario-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.scenario-card:hover .scenario-image img {
  transform: scale(1.1);
}

.scenario-info {
  padding: 25px;
}

.scenario-info h3 {
  font-size: 20px;
  font-weight: 700;
  color: white;
  margin-bottom: 10px;
}

.scenario-info p {
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.8;
}

/* Process Section */
.process-section {
  padding: 80px 0;
  background: rgba(255, 255, 255, 0.02);
  position: relative;
  z-index: 1;
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
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
}

.process-content {
  flex: 1;
  background: rgba(255, 255, 255, 0.05);
  padding: 25px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.process-content h3 {
  font-size: 20px;
  font-weight: 700;
  color: white;
  margin-bottom: 10px;
}

.process-content p {
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.8;
}

/* CTA Section */
.cta-section {
  padding: 100px 0;
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.1) 0%, rgba(157, 78, 221, 0.1) 100%);
  color: white;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 1;
}

.cta-section h2 {
  font-size: 40px;
  font-weight: 800;
  margin-bottom: 20px;
}

.cta-section p {
  font-size: 18px;
  margin-bottom: 40px;
  color: rgba(255, 255, 255, 0.8);
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
    box-shadow: 0 0 20px rgba(0, 212, 255, 0.8);
  }
  50% {
    transform: scale(1.2);
    box-shadow: 0 0 30px rgba(0, 212, 255, 1);
  }
}

@media (max-width: 968px) {
  .intro-content {
    grid-template-columns: 1fr;
  }
  
  .page-header h1 {
    font-size: 40px;
  }
}
</style>

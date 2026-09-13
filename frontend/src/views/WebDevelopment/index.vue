<template>
  <div class="web-development">
    <!-- 粒子背景 -->
    <ParticleBackground />
    
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="container">
        <h1 class="gradient-text animate__animated animate__fadeInDown">WEB网站开发</h1>
        <p class="animate__animated animate__fadeInUp">专业的网站建设服务 · 打造企业数字化门户 · 提升品牌形象</p>
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
            <h2>专业的WEB网站开发服务</h2>
            <p>
              我们提供企业官网、电商平台、管理系统等多种类型的网站开发服务。
              采用现代化技术栈，确保网站性能优异、用户体验流畅、SEO友好。
            </p>
            <ul class="feature-list">
              <li><el-icon><Check /></el-icon>响应式设计，适配各种设备</li>
              <li><el-icon><Check /></el-icon>SEO优化，提升搜索排名</li>
              <li><el-icon><Check /></el-icon>高性能架构，快速加载</li>
              <li><el-icon><Check /></el-icon>安全可靠，数据保护</li>
            </ul>
          </div>
          <div class="intro-image">
            <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600" alt="WEB开发">
          </div>
        </div>
      </div>
    </section>

    <!-- 网站类型 -->
    <section class="types-section">
      <div class="container">
        <div class="section-header">
          <h2>网站类型</h2>
          <p>满足不同场景的建站需求</p>
        </div>
        
        <div class="types-grid">
          <div v-for="type in siteTypes" :key="type.id" class="type-card">
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

    <!-- 技术优势 -->
    <section class="advantages-section">
      <div class="container">
        <div class="section-header">
          <h2>技术优势</h2>
          <p>采用业界领先的技术栈</p>
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
    <section class="process-section">
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
        <h2>开始您的网站建设项目</h2>
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
import { Monitor, ShoppingCart, Management, Check, TrendCharts, Lock, Odometer } from '@element-plus/icons-vue'
import ParticleBackground from '@/components/ParticleBackground.vue'

const siteTypes = ref([
  {
    id: 1,
    icon: Monitor,
    title: '企业官网',
    description: '展示企业形象，宣传品牌文化，提升企业知名度',
    technologies: ['Vue3', 'React', 'TailwindCSS', 'SEO优化']
  },
  {
    id: 2,
    icon: ShoppingCart,
    title: '电商平台',
    description: '打造完整的在线商城系统，支持多种支付方式',
    technologies: ['Next.js', 'Node.js', 'MySQL', '支付集成']
  },
  {
    id: 3,
    icon: Management,
    title: '管理系统',
    description: '企业内部管理系统，提升办公效率和管理水平',
    technologies: ['Vue3', 'Element Plus', 'Spring Boot', 'MySQL']
  }
])

const advantages = ref([
  {
    id: 1,
    icon: Odometer,
    title: '高性能',
    description: '采用CDN加速、代码优化等技术，确保网站快速加载'
  },
  {
    id: 2,
    icon: Lock,
    title: '安全可靠',
    description: 'HTTPS加密、SQL注入防护、XSS防护等多重安全保障'
  },
  {
    id: 3,
    icon: TrendCharts,
    title: 'SEO优化',
    description: '专业的SEO优化方案，提升搜索引擎排名'
  },
  {
    id: 4,
    icon: Monitor,
    title: '响应式设计',
    description: '完美适配PC、平板、手机等各种设备'
  }
])

const scenarios = ref([
  {
    id: 1,
    title: '企业品牌展示',
    description: '打造专业的企业形象网站，提升品牌影响力',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400'
  },
  {
    id: 2,
    title: '电商零售',
    description: '构建功能完善的在线商城，提升销售业绩',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400'
  },
  {
    id: 3,
    title: '教育培训',
    description: '在线课程平台，实现知识变现',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400'
  },
  {
    id: 4,
    title: '企业内部系统',
    description: 'OA、ERP、CRM等企业管理系统开发',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400'
  }
])

const processSteps = ref([
  {
    id: 1,
    title: '需求沟通',
    description: '深入了解客户需求，明确网站定位和功能需求'
  },
  {
    id: 2,
    title: '方案设计',
    description: '制定技术方案，设计网站架构和页面原型'
  },
  {
    id: 3,
    title: 'UI设计',
    description: '设计符合品牌形象的视觉界面，提供优质用户体验'
  },
  {
    id: 4,
    title: '前端开发',
    description: '采用现代化框架进行前端开发，确保性能和兼容性'
  },
  {
    id: 5,
    title: '后端开发',
    description: '开发稳定可靠的后端服务，保障数据安全'
  },
  {
    id: 6,
    title: '测试上线',
    description: '全面测试网站功能，确保质量后部署上线'
  }
])
</script>

<style scoped>
.web-development {
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
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 30px;
}

.type-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  padding: 35px 28px;
  border-radius: 20px;
  border: 1px solid rgba(0, 212, 255, 0.2);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.4s ease;
  position: relative;
  z-index: 1;
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

.type-tech {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

/* Advantages Section */
.advantages-section {
  padding: 80px 0;
  background: transparent;
}

.advantages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
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

/* Scenarios Section */
.scenarios-section {
  padding: 80px 0;
  background: transparent;
}

.scenarios-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.scenario-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(0, 212, 255, 0.2);
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.scenario-card:hover {
  transform: translateY(-10px);
  border-color: rgba(0, 212, 255, 0.5);
  box-shadow: 0 20px 50px rgba(0, 212, 255, 0.3),
              0 0 30px rgba(0, 212, 255, 0.2);
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
  color: #fff;
  margin-bottom: 10px;
  font-weight: 700;
}

.scenario-info p {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.8;
}

/* Process Section */
.process-section {
  padding: 80px 0;
  position: relative;
  z-index: 1;
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

/* CTA Section */
.cta-section {
  padding: 80px 0;
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.1) 0%, rgba(157, 78, 221, 0.1) 100%);
  color: white;
  text-align: center;
  position: relative;
  z-index: 1;
  border-top: 1px solid rgba(0, 212, 255, 0.2);
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

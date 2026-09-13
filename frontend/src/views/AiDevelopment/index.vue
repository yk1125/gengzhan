<template>
  <div class="ai-development">
    <!-- 粒子背景 -->
    <ParticleBackground />
    
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="container">
        <h1 class="gradient-text animate__animated animate__fadeInDown">AI开发</h1>
        <p class="animate__animated animate__fadeInUp">人工智能解决方案 · 赋能企业智能化转型</p>
        <div class="ai-hero-visual" aria-hidden="true">
          <video autoplay muted loop playsinline preload="auto">
            <source src="/yunzhan-hero.mp4" type="video/mp4" />
          </video>
          <span>AI SOLUTION</span>
        </div>
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
            <h2>专业的AI开发服务</h2>
            <p>
              我们提供全方位的人工智能开发服务，包括大语言模型应用开发、智能对话系统、
              AI图像识别、自然语言处理等。帮助企业快速构建智能化应用，提升业务效率。
            </p>
            <ul class="feature-list">
              <li><el-icon><Check /></el-icon>大语言模型集成与应用</li>
              <li><el-icon><Check /></el-icon>智能客服与对话系统</li>
              <li><el-icon><Check /></el-icon>AI图像识别与处理</li>
              <li><el-icon><Check /></el-icon>自然语言处理NLP</li>
            </ul>
          </div>
          <div class="intro-image">
            <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600" alt="AI开发">
          </div>
        </div>
      </div>
    </section>

    <!-- AI服务类型 -->
    <section id="ai-capabilities" class="types-section">
      <div class="container">
        <div class="section-header">
          <h2>AI服务类型</h2>
          <p>从模型接入到业务闭环，按场景构建可运营的智能能力。</p>
        </div>
        
        <div class="types-grid">
          <div v-for="type in aiTypes" :key="type.id" class="type-card">
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

    <!-- AI应用场景 -->
    <section class="scenarios-section">
      <div class="container">
        <div class="section-header">
          <h2>AI应用场景</h2>
          <p>多领域AI解决方案</p>
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

    <!-- 技术优势 -->
    <section class="advantages-section">
      <div class="container">
        <div class="section-header">
          <h2>技术优势</h2>
          <p>强大的AI技术支持</p>
        </div>
        
        <div class="advantages-grid">
          <div v-for="item in advantages" :key="item.id" class="advantage-item">
            <div class="advantage-icon">
              <component :is="item.icon" :size="36" />
            </div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 开发流程 -->
    <section class="process-section">
      <div class="container">
        <div class="section-header">
          <h2>开发流程</h2>
          <p>专业规范的AI开发流程</p>
        </div>
        
        <div class="process-flow">
          <article v-for="(step, index) in processSteps" :key="step.id" class="process-flow-item">
            <span class="process-flow-index">0{{ index + 1 }}</span>
            <div>
              <span class="process-flow-label">DELIVERY STEP</span>
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
      <div class="container">
        <h2>开启您的AI智能化之旅</h2>
        <p>专业AI团队为您提供一站式服务</p>
        <el-button type="primary" size="large" @click="$router.push('/ai-consultation')">
          发起项目咨询
        </el-button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ChatDotRound, DataAnalysis, Monitor, Check, Star, TrendCharts, Setting } from '@element-plus/icons-vue'
import ParticleBackground from '@/components/ParticleBackground.vue'

const aiTypes = ref([
  {
    id: 1,
    icon: ChatDotRound,
    title: '大语言模型应用',
    description: '基于GPT、文心一言等大模型，开发智能对话、内容生成等应用',
    technologies: ['ChatGPT', '文心一言', '通义千问', 'Claude']
  },
  {
    id: 2,
    icon: Monitor,
    title: '智能客服系统',
    description: '7x24小时智能客服，自动回答客户问题，提升服务效率',
    technologies: ['智能问答', '意图识别', '多轮对话', '知识库']
  },
  {
    id: 3,
    icon: DataAnalysis,
    title: 'AI图像识别',
    description: '图像分类、目标检测、人脸识别、OCR文字识别等',
    technologies: ['计算机视觉', 'OCR', '人脸识别', '目标检测']
  },
  {
    id: 4,
    icon: Setting,
    title: '企业知识智能体',
    description: '连接企业文档、制度与业务数据，构建可追溯、可持续运营的知识服务能力',
    technologies: ['RAG检索增强', '文档解析', '权限体系', '知识运营']
  }
])

const scenarios = ref([
  {
    id: 1,
    title: '智能客服',
    description: '构建智能客服系统，自动处理客户咨询',
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400'
  },
  {
    id: 2,
    title: '内容生成',
    description: 'AI辅助内容创作，提升创作效率',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400'
  },
  {
    id: 3,
    title: '数据分析',
    description: '智能数据分析，挖掘商业洞察',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400'
  },
  {
    id: 4,
    title: '智能推荐',
    description: '个性化推荐系统，提升用户体验',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400'
  }
])

const advantages = ref([
  {
    id: 1,
    icon: Star,
    title: '前沿技术',
    description: '紧跟AI技术前沿，应用最新模型和算法'
  },
  {
    id: 2,
    icon: TrendCharts,
    title: '丰富经验',
    description: '多个AI项目成功交付经验'
  },
  {
    id: 3,
    icon: Setting,
    title: '定制开发',
    description: '根据业务需求定制AI解决方案'
  },
  {
    id: 4,
    icon: Check,
    title: '持续优化',
    description: '模型持续训练和优化，不断提升效果'
  }
])

const processSteps = ref([
  {
    id: 1,
    title: '需求分析',
    description: '深入了解业务场景，确定AI应用方向'
  },
  {
    id: 2,
    title: '方案设计',
    description: '制定AI技术方案，选择合适的模型和算法'
  },
  {
    id: 3,
    title: '模型开发',
    description: '开发AI模型，进行训练和调优'
  },
  {
    id: 4,
    title: '系统集成',
    description: '将AI能力集成到业务系统中'
  },
  {
    id: 5,
    title: '测试上线',
    description: '全面测试AI效果，确保稳定上线'
  },
  {
    id: 6,
    title: '持续优化',
    description: '监控运行效果，持续优化改进'
  }
])
</script>

<style scoped>
.ai-development {
  width: 100%;
  position: relative;
  min-height: 100vh;
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
  margin-bottom: 50px;
}

.section-header h2 {
  font-size: 36px;
  font-weight: 800;
  background: linear-gradient(135deg, #00d4ff 0%, #9d4edd 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 15px;
  letter-spacing: 1px;
}

.section-header p {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
}

/* Page Header */
.page-header {
  background: transparent;
  color: white;
  padding: 100px 0 60px;
  text-align: center;
  position: relative;
  z-index: 1;
}

.page-header h1 {
  font-size: 32px;
  font-weight: 900;
  margin-bottom: 12px;
  background: linear-gradient(135deg, #fff 0%, #00d4ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 1px;
}

.page-header p {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  max-width: 450px;
  margin: 0 auto;
}

.header-decoration {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.deco-line {
  width: 50px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #00d4ff, transparent);
}

.deco-dot {
  width: 6px;
  height: 6px;
  background: #00d4ff;
  border-radius: 50%;
  box-shadow: 0 0 10px #00d4ff;
  animation: pulse 2s ease-in-out infinite;
}

/* Intro Section */
.intro-section {
  padding: 40px 0;
  position: relative;
  z-index: 1;
}

.intro-content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 20px;
}

.intro-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(15px);
  padding: 20px;
  border-radius: 12px;
  border: 1px solid rgba(0, 212, 255, 0.2);
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  position: relative;
  overflow: hidden;
}

.intro-card h3 {
  font-size: 16px;
  color: #fff;
  margin-bottom: 10px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
}

.intro-card p {
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.6;
  font-size: 12px;
}

.feature-list {
  list-style: none;
  padding: 0;
}

.feature-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 15px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
  background: rgba(0, 212, 255, 0.05);
  border-left: 2px solid #00d4ff;
  border-radius: 6px;
  margin-bottom: 10px;
  transition: all 0.3s ease;
}

.feature-list li:hover {
  background: rgba(0, 212, 255, 0.1);
  transform: translateX(3px);
  box-shadow: 0 5px 10px rgba(0, 212, 255, 0.2);
}

.feature-list .el-icon {
  color: #00d4ff;
  font-size: 18px;
  filter: drop-shadow(0 0 4px rgba(0, 212, 255, 0.6));
}

.intro-image img {
  width: 100%;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 212, 255, 0.3);
  border: 1px solid rgba(0, 212, 255, 0.2);
  transition: all 0.4s ease;
}

.intro-image img:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 40px rgba(0, 212, 255, 0.4);
}

/* Types Section */
.types-section {
  padding: 60px 0;
  background: transparent;
}

.types-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
}

.type-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(15px);
  padding: 35px 25px;
  border-radius: 18px;
  border: 1px solid rgba(0, 212, 255, 0.2);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  position: relative;
  overflow: hidden;
}

.type-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 50% 0%, rgba(0, 212, 255, 0.1) 0%, transparent 60%);
  opacity: 0;
  transition: opacity 0.5s ease;
}

.type-card:hover {
  transform: translateY(-10px) scale(1.01);
  border-color: rgba(0, 212, 255, 0.5);
  box-shadow: 0 15px 40px rgba(0, 212, 255, 0.3);
}

.type-card:hover::before {
  opacity: 1;
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
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
  animation: float 3s ease-in-out infinite;
}

.type-card h3 {
  font-size: 20px;
  color: #fff;
  margin-bottom: 15px;
  font-weight: 700;
}

.type-card p {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.7;
  margin-bottom: 20px;
  font-size: 13px;
}

.type-tech {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.type-tech :deep(.el-tag) {
  background: rgba(0, 212, 255, 0.1);
  border-color: rgba(0, 212, 255, 0.3);
  color: #00d4ff;
}

/* Scenarios Section */
.scenarios-section {
  padding: 60px 0;
}

.scenarios-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 25px;
}

.scenario-card {
  background: rgba(255, 255, 255, 0.02);
  border-radius: 15px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  transform-style: preserve-3d;
}

.scenario-card:hover {
  transform: translateY(-9px) rotateX(1.5deg);
  border-color: rgba(0, 212, 255, 0.5);
  box-shadow: 0 15px 40px rgba(0, 212, 255, 0.3);
}

.scenario-image {
  height: 180px;
  overflow: hidden;
  position: relative;
}

.scenario-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  filter: brightness(0.9);
}

.scenario-card:hover .scenario-image img {
  transform: scale(1.1);
  filter: brightness(1.05);
}

.scenario-info {
  padding: 25px;
  background: rgba(10, 14, 39, 0.6);
  backdrop-filter: blur(10px);
}

.scenario-info h3 {
  font-size: 18px;
  color: #fff;
  margin-bottom: 10px;
  font-weight: 700;
}

.scenario-info p {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.7;
  font-size: 12px;
}

/* Advantages Section */
.advantages-section {
  padding: 60px 0;
  background: transparent;
}

.advantages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 35px;
}

.advantage-item {
  text-align: center;
  padding: 30px 20px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 15px;
  border: 1px solid rgba(157, 78, 221, 0.2);
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}

.advantage-item::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: radial-gradient(circle, rgba(157, 78, 221, 0.15) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  transition: all 0.5s ease;
}

.advantage-item:hover::before {
  width: 250px;
  height: 250px;
}

.advantage-item:hover {
  transform: translateY(-6px);
  border-color: rgba(157, 78, 221, 0.5);
  box-shadow: 0 10px 30px rgba(157, 78, 221, 0.2);
}

.advantage-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #9d4edd 0%, #ff006e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 0 15px rgba(157, 78, 221, 0.4);
  position: relative;
  z-index: 1;
}

.advantage-item h3 {
  font-size: 18px;
  margin-bottom: 10px;
  color: #fff;
  font-weight: 700;
  position: relative;
  z-index: 1;
}

.advantage-item p {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.7;
  font-size: 12px;
  position: relative;
  z-index: 1;
}

/* Process Section */
.process-section {
  padding: 50px 0;
  position: relative;
  overflow: hidden;
}

.process-timeline {
  max-width: 900px;
  margin: 0 auto;
  padding: 30px 0;
}

/* 闭环网格 */
.loop-grid {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

/* 网格行 */
.grid-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.top-row, .bottom-row {
  justify-content: center;
}

.middle-row {
  justify-content: space-between;
  padding: 0 40px;
}

/* 流程步骤 */
.process-step {
  display: flex;
  align-items: center;
  gap: 12px;
  opacity: 0;
  animation: fadeInUp 0.8s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 步骤圆圈 */
.step-circle {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00d4ff, #9d4edd);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 900;
  color: white;
  position: relative;
  flex-shrink: 0;
  box-shadow: 0 0 15px rgba(0, 212, 255, 0.6);
  border: 2px solid rgba(10, 14, 39, 0.9);
  animation: numberPop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
  animation-delay: inherit;
}

@keyframes numberPop {
  0% {
    transform: scale(0) rotate(-180deg);
  }
  70% {
    transform: scale(1.05) rotate(10deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
}

/* 圆圈光环 */
.circle-ring {
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  border: 1.5px solid rgba(0, 212, 255, 0.4);
  border-radius: 50%;
  animation: ringRotate 3s linear infinite;
}

@keyframes ringRotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 步骤卡片 */
.step-card {
  max-width: 220px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(15px);
  padding: 16px 18px;
  border-radius: 12px;
  border: 1px solid rgba(0, 212, 255, 0.2);
  transition: all 0.4s ease;
}

.step-card:hover {
  transform: translateY(-4px);
  border-color: rgba(0, 212, 255, 0.5);
  box-shadow: 0 8px 20px rgba(0, 212, 255, 0.3);
}

.step-card h3 {
  font-size: 16px;
  color: #fff;
  margin-bottom: 8px;
  font-weight: 700;
}

.step-card p {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
}

/* 连接路径线 */
.path-line {
  position: relative;
  background: linear-gradient(90deg, #00d4ff, #9d4edd, #ff006e);
  box-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
}

.path-line.horizontal {
  width: 100px;
  height: 1.5px;
}

.path-line.vertical {
  width: 1.5px;
  height: 100px;
}

/* 水平线箭头 - 向右 */
.path-line.horizontal::after {
  content: '';
  position: absolute;
  right: -1.5px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 8px solid #ff006e;
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  filter: drop-shadow(0 0 4px rgba(255, 0, 110, 0.8));
}

/* 水平线箭头 - 向左（反向）*/
.path-line.horizontal.reverse::after {
  right: auto;
  left: -1.5px;
  border-left: none;
  border-right: 8px solid #00d4ff;
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  filter: drop-shadow(0 0 4px rgba(0, 212, 255, 0.8));
}

/* 垂直线箭头 - 向下 */
.path-line.vertical::after {
  content: '';
  position: absolute;
  bottom: -1.5px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-top: 8px solid #ff006e;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  filter: drop-shadow(0 0 4px rgba(255, 0, 110, 0.8));
}

/* 左侧垂直线 - 向上 */
.path-line.vertical.left::after {
  bottom: auto;
  top: -1.5px;
  border-top: none;
  border-bottom: 8px solid #00d4ff;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  filter: drop-shadow(0 0 4px rgba(0, 212, 255, 0.8));
}

.center-space {
  display: flex;
  gap: 150px;
}

.path-line.vertical.left,
.path-line.vertical.right {
  align-self: stretch;
}

/* 循环运动的光点 */
.moving-dot {
  position: absolute;
  width: 10px;
  height: 10px;
  background: #00d4ff;
  border-radius: 50%;
  box-shadow: 0 0 15px rgba(0, 212, 255, 1);
  animation: moveDot 8s linear infinite;
}

@keyframes moveDot {
  0%, 100% { left: 0; }
  50% { left: calc(100% - 10px); }
}

/* 侧边步骤 */
.left-side {
  flex-direction: row;
}

.right-side {
  flex-direction: row-reverse;
}

/* CTA Section */
.cta-section {
  padding: 50px 0;
  background: transparent;
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.cta-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 50% 50%, rgba(0, 212, 255, 0.15) 0%, transparent 70%);
  z-index: 0;
}

.cta-section .container {
  position: relative;
  z-index: 1;
}

.cta-section h2 {
  font-size: 24px;
  font-weight: 900;
  margin-bottom: 15px;
  background: linear-gradient(135deg, #fff 0%, #00d4ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.cta-section p {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 25px;
  max-width: 450px;
  margin-left: auto;
  margin-right: auto;
}

.cta-section :deep(.el-button) {
  padding: 15px 40px;
  font-size: 16px;
  padding: 18px 50px;
  font-size: 18px;
  font-weight: 700;
  background: linear-gradient(135deg, #00d4ff, #9d4edd);
  border: none;
  box-shadow: 0 10px 30px rgba(0, 212, 255, 0.4);
  transition: all 0.3s ease;
}

.cta-section :deep(.el-button:hover) {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(0, 212, 255, 0.6);
}

@media (max-width: 968px) {
  .intro-content {
    grid-template-columns: 1fr;
  }
  
  .page-header h1 {
    font-size: 36px;
  }
  
  /* 移动端流程时间线 */
  .process-timeline {
    padding: 40px 20px;
  }
  
  .loop-grid {
    gap: 40px;
  }
  
  .grid-row {
    flex-direction: column;
    gap: 30px;
  }
  
  .middle-row {
    padding: 0;
  }
  
  .process-step {
    flex-direction: column;
    text-align: center;
  }
  
  .path-line {
    display: none;
  }
  
  .center-space {
    display: none;
  }
  
  .step-card {
    max-width: 100%;
  }
}
</style>

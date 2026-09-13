<template>
  <div class="miniprogram-development">
    <!-- 粒子背景 -->
    <ParticleBackground />
    
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="container">
        <h1 class="gradient-text animate__animated animate__fadeInDown">小程序开发</h1>
        <p class="animate__animated animate__fadeInUp">全平台小程序开发 · 触达亿万用户 · 助力商业增长</p>
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
            <h2>专业的小程序开发服务</h2>
            <p>
              我们提供微信、支付宝、抖音、百度等全平台小程序开发服务，拥有丰富的小程序开发经验。
              从需求分析到UI设计、开发测试、上线运营，提供一站式解决方案。
            </p>
            <ul class="feature-list">
              <li><el-icon><Check /></el-icon>全平台支持，一键多端发布</li>
              <li><el-icon><Check /></el-icon>云开发能力，快速搭建后端</li>
              <li><el-icon><Check /></el-icon>丰富的组件库，提升开发效率</li>
              <li><el-icon><Check /></el-icon>完善的运营数据分析</li>
            </ul>
          </div>
          <div class="intro-image">
            <img src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600" alt="小程序开发">
          </div>
        </div>
      </div>
    </section>

    <!-- 平台类型 -->
    <section class="platforms-section">
      <div class="container">
        <div class="section-header">
          <h2>全平台覆盖</h2>
          <p>支持主流小程序平台开发</p>
        </div>
        
        <div class="platforms-grid">
          <div v-for="platform in platforms" :key="platform.id" class="platform-card glass-effect">
            <div class="platform-icon" :style="{ background: platform.color }">
              {{ platform.icon }}
            </div>
            <h3>{{ platform.name }}</h3>
            <p>{{ platform.description }}</p>
            <div class="platform-stats">
              <div class="stat-item">
                <span class="stat-value">{{ platform.users }}</span>
                <span class="stat-label">用户规模</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">{{ platform.apps }}</span>
                <span class="stat-label">小程序数量</span>
              </div>
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
              <div class="scenario-overlay">
                <div class="overlay-content">
                  <div class="scenario-icon">{{ scenario.icon }}</div>
                  <div class="scenario-title">{{ scenario.title }}</div>
                  <p class="scenario-desc">{{ scenario.description }}</p>
                </div>
              </div>
            </div>
            <div class="scenario-tags-wrapper">
              <el-tag v-for="tag in scenario.tags" :key="tag" size="small" effect="plain">{{ tag }}</el-tag>
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
          <p>专业的技术团队，成熟的开发流程</p>
        </div>
        
        <div class="advantages-grid">
          <div v-for="item in advantages" :key="item.id" class="advantage-item glass-effect">
            <div class="advantage-icon">
              <el-icon :size="36"><component :is="item.icon" /></el-icon>
            </div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Check, Lightning, Star, TrendCharts, DataAnalysis } from '@element-plus/icons-vue'
import ParticleBackground from '@/components/ParticleBackground.vue'

const platforms = ref([
  {
    id: 1,
    name: '微信小程序',
    icon: '💬',
    description: '基于微信生态，触达12亿+月活用户，打造社交电商新模式',
    color: 'linear-gradient(135deg, #07C160 0%, #00D976 100%)',
    users: '12亿+',
    apps: '450万+'
  },
  {
    id: 2,
    name: '支付宝小程序',
    icon: '💳',
    description: '依托支付宝场景，专注商业服务，助力企业数字化转型',
    color: 'linear-gradient(135deg, #1677FF 0%, #00A0E9 100%)',
    users: '10亿+',
    apps: '300万+'
  },
  {
    id: 3,
    name: '抖音小程序',
    icon: '🎵',
    description: '结合短视频流量，实现内容营销，提升品牌曝光度',
    color: 'linear-gradient(135deg, #FE2C55 0%, #FF0050 100%)',
    users: '6亿+',
    apps: '100万+'
  },
  {
    id: 4,
    name: '百度小程序',
    icon: '🔍',
    description: '搜索场景流量入口，提升SEO效果，获取精准用户',
    color: 'linear-gradient(135deg, #4E6EF2 0%, #667eea 100%)',
    users: '5亿+',
    apps: '50万+'
  }
])

const scenarios = ref([
  {
    id: 1,
    title: '电商零售',
    icon: '🛍️',
    description: '在线商城、拼团秒杀、会员系统、订单管理等完整电商解决方案',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=600',
    tags: ['商品管理', '支付系统', '订单跟踪', '营销工具']
  },
  {
    id: 2,
    title: '餐饮外卖',
    icon: '🍔',
    description: '点餐下单、外卖配送、会员积分、优惠券等餐饮行业全流程管理',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600',
    tags: ['在线点餐', '配送管理', '会员系统', '数据统计']
  },
  {
    id: 3,
    title: '教育培训',
    icon: '📚',
    description: '在线课程、直播授课、作业打卡、学习社区等教育场景应用',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600',
    tags: ['课程管理', '在线学习', '互动直播', '学习社区']
  },
  {
    id: 4,
    title: '本地生活',
    icon: '🏪',
    description: '预约服务、团购优惠、到店核销、用户评价等本地服务平台',
    image: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=600',
    tags: ['预约系统', '团购活动', '到店核销', '用户评价']
  }
])

const advantages = ref([
  {
    id: 1,
    title: '快速开发',
    icon: Lightning,
    description: '采用组件化开发模式，丰富的UI组件库，大幅提升开发效率，快速迭代上线'
  },
  {
    id: 2,
    title: '云端一体',
    icon: DataAnalysis,
    description: '云开发能力支持，无需搭建服务器，云函数、云数据库开箱即用'
  },
  {
    id: 3,
    title: '性能优异',
    icon: TrendCharts,
    description: '原生渲染机制，流畅的用户体验，优化加载速度，提升用户留存'
  },
  {
    id: 4,
    title: '数据驱动',
    icon: Star,
    description: '完善的数据分析工具，实时监控运营数据，助力精准营销决策'
  }
])
</script>

<style scoped>
/* 小程序开发页面样式 */
.miniprogram-development {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(180deg, #0a0e27 0%, #1a1f3a 100%);
}

/* 页面头部 */
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

/* 服务介绍 */
.intro-section {
  padding: 100px 0;
  position: relative;
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
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.7);
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

.feature-list li :deep(.el-icon) {
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

/* 平台卡片 */
.platforms-section {
  padding: 80px 0;
  background: rgba(255, 255, 255, 0.02);
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

.platforms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
}

.platform-card {
  padding: 32px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.platform-card:hover {
  transform: translateY(-8px);
  border-color: rgba(0, 212, 255, 0.5);
  box-shadow: 0 15px 40px rgba(0, 212, 255, 0.2);
}

.platform-icon {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  margin-bottom: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.platform-card h3 {
  font-size: 22px;
  font-weight: 700;
  color: white;
  margin-bottom: 12px;
}

.platform-card p {
  font-size: 14px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 24px;
}

.platform-stats {
  display: flex;
  gap: 24px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-value {
  font-size: 20px;
  font-weight: 700;
  color: #00d4ff;
}

.stat-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}

/* 应用场景 */
.scenarios-section {
  padding: 80px 0;
}

.scenarios-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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
  box-shadow: 0 15px 40px rgba(0, 212, 255, 0.2);
}

.scenario-image {
  position: relative;
  height: 240px;
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

.scenario-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.85) 100%);
  display: flex;
  align-items: flex-end;
  padding: 0;
}

.overlay-content {
  padding: 20px;
  width: 100%;
}

.scenario-icon {
  font-size: 40px;
  margin-bottom: 12px;
}

.scenario-title {
  font-size: 20px;
  font-weight: 700;
  color: white;
  margin-bottom: 8px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

.scenario-desc {
  font-size: 14px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
}

.scenario-tags-wrapper {
  padding: 16px 20px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  background: rgba(0, 0, 0, 0.3);
}

/* 技术优势 */
.advantages-section {
  padding: 80px 0 100px;
  background: rgba(255, 255, 255, 0.02);
}

.advantages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 32px;
}

.advantage-item {
  padding: 32px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  transition: all 0.3s ease;
}

.advantage-item:hover {
  transform: translateY(-8px);
  border-color: rgba(0, 212, 255, 0.5);
  box-shadow: 0 15px 40px rgba(0, 212, 255, 0.2);
}

.advantage-icon {
  width: 72px;
  height: 72px;
  margin: 0 auto 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.2) 0%, rgba(157, 78, 221, 0.2) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00d4ff;
}

.advantage-item h3 {
  font-size: 20px;
  font-weight: 700;
  color: white;
  margin-bottom: 12px;
}

.advantage-item p {
  font-size: 14px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.6);
}

/* 通用容器 */
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
}

/* 动画 */
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

/* 响应式媒体查询 */
@media screen and (max-width: 1200px) {
  .container {
    padding: 0 30px;
  }

  .platforms-grid,
  .scenarios-grid,
  .advantages-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }
}

@media screen and (max-width: 992px) {
  .container {
    padding: 0 25px;
  }

  .page-header {
    padding: 80px 0 60px;
  }

  .page-header h1 {
    font-size: 42px;
  }

  .page-header p {
    font-size: 17px;
  }

  .intro-section,
  .platforms-section,
  .scenarios-section,
  .advantages-section {
    padding: 50px 0;
  }

  .intro-text h2 {
    font-size: 32px;
  }

  .intro-text p {
    font-size: 15px;
  }

  .section-header h2 {
    font-size: 34px;
  }

  .section-header p {
    font-size: 16px;
  }

  .platform-card,
  .scenario-card,
  .advantage-card {
    padding: 25px 20px;
  }
}

@media screen and (max-width: 768px) {
  .container {
    padding: 0 20px;
  }

  .page-header {
    padding: 60px 0 50px;
  }

  .page-header h1 {
    font-size: 36px;
    margin-bottom: 15px;
  }

  .page-header p {
    font-size: 16px;
    margin-bottom: 25px;
  }

  .header-decoration {
    width: 200px;
  }

  .deco-line {
    width: 50px;
  }

  .deco-dot {
    width: 10px;
    height: 10px;
  }

  .intro-section,
  .platforms-section,
  .scenarios-section,
  .advantages-section {
    padding: 40px 0;
  }

  .intro-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .intro-text h2 {
    font-size: 28px;
    margin-bottom: 18px;
  }

  .intro-text p {
    font-size: 14px;
    line-height: 1.7;
  }

  .feature-list li {
    font-size: 14px;
    padding: 10px 0;
  }

  .intro-image {
    order: -1;
    height: 250px;
  }

  .section-header {
    margin-bottom: 35px;
  }

  .section-header h2 {
    font-size: 28px;
    margin-bottom: 12px;
  }

  .section-header p {
    font-size: 15px;
  }

  .platforms-grid,
  .scenarios-grid,
  .advantages-grid {
    grid-template-columns: 1fr;
    gap: 25px;
  }

  .scenario-image {
    height: 200px;
  }

  .platform-card,
  .scenario-card,
  .advantage-card {
    padding: 22px 18px;
  }

  .platform-card:hover,
  .scenario-card:hover,
  .advantage-card:hover {
    transform: translateY(-8px) scale(1.02);
  }

  .platform-icon,
  .scenario-icon,
  .advantage-icon {
    width: 60px;
    height: 60px;
    margin-bottom: 15px;
  }

  .platform-icon :deep(.el-icon),
  .scenario-icon :deep(.el-icon),
  .advantage-icon :deep(.el-icon) {
    font-size: 30px;
  }

  .platform-card h3,
  .scenario-card h3,
  .advantage-card h3 {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .platform-card p,
  .scenario-card p,
  .advantage-card p {
    font-size: 14px;
  }

  .platform-stats {
    gap: 15px;
  }

  .stat-item {
    padding: 10px 15px;
  }

  .stat-number {
    font-size: 20px;
  }

  .stat-label {
    font-size: 11px;
  }
}

@media screen and (max-width: 576px) {
  .container {
    padding: 0 15px;
  }

  .page-header {
    padding: 50px 0 40px;
  }

  .page-header h1 {
    font-size: 28px;
    margin-bottom: 12px;
  }

  .page-header p {
    font-size: 14px;
    margin-bottom: 20px;
    line-height: 1.5;
  }

  .header-decoration {
    width: 160px;
  }

  .deco-line {
    width: 50px;
  }

  .deco-dot {
    width: 10px;
    height: 10px;
  }

  .intro-section,
  .platforms-section,
  .scenarios-section,
  .advantages-section {
    padding: 30px 0;
  }

  .intro-text h2 {
    font-size: 24px;
    margin-bottom: 15px;
  }

  .intro-text p {
    font-size: 13px;
    line-height: 1.6;
    margin-bottom: 20px;
  }

  .feature-list li {
    font-size: 13px;
    padding: 8px 0;
  }

  .feature-list li :deep(.el-icon) {
    font-size: 16px;
  }

  .intro-image {
    height: 220px;
    border-radius: 15px;
  }

  .section-header {
    margin-bottom: 30px;
  }

  .section-header h2 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  .section-header p {
    font-size: 14px;
  }

  .platforms-grid,
  .scenarios-grid,
  .advantages-grid {
    gap: 20px;
  }

  .platform-card,
  .scenario-card,
  .advantage-card {
    padding: 20px 16px;
    border-radius: 18px;
  }

  .platform-icon,
  .scenario-icon,
  .advantage-icon {
    width: 55px;
    height: 55px;
    margin-bottom: 12px;
  }

  .platform-icon :deep(.el-icon),
  .scenario-icon :deep(.el-icon),
  .advantage-icon :deep(.el-icon) {
    font-size: 28px;
  }

  .platform-card h3,
  .scenario-card h3,
  .advantage-card h3 {
    font-size: 17px;
    margin-bottom: 8px;
  }

  .platform-card p,
  .scenario-card p,
  .advantage-card p {
    font-size: 13px;
    line-height: 1.5;
  }

  .platform-stats {
    gap: 12px;
    flex-wrap: wrap;
  }

  .stat-item {
    padding: 8px 12px;
    flex: 1 1 calc(50% - 6px);
    min-width: 0;
  }

  .stat-number {
    font-size: 18px;
  }

  .stat-label {
    font-size: 10px;
  }

  .platform-tags,
  .scenario-tags,
  .advantage-tags {
    gap: 6px;
  }

  .platform-tags :deep(.el-tag),
  .scenario-tags :deep(.el-tag),
  .advantage-tags :deep(.el-tag) {
    font-size: 11px;
    padding: 2px 8px;
  }
}

@media screen and (max-width: 400px) {
  .page-header h1 {
    font-size: 24px;
  }

  .page-header p {
    font-size: 13px;
  }

  .intro-text h2,
  .section-header h2 {
    font-size: 22px;
  }

  .platform-card,
  .scenario-card,
  .advantage-card {
    padding: 18px 14px;
  }
}
</style>

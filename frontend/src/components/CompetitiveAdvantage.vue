<template>
  <section class="competitive-section">
    <div class="container">
      <div class="section-header">
        <h2>🎯 我们的核心竞争力</h2>
        <p>不是最便宜，但一定是性价比最高 · 用数据说话</p>
      </div>

      <!-- 核心差异点 -->
      <div class="difference-cards">
        <div 
          v-for="(item, index) in differences" 
          :key="index"
          class="difference-card glass-effect"
          :style="{ '--delay': index * 0.1 + 's' }"
        >
          <div class="card-header">
            <span class="card-emoji">{{ item.emoji }}</span>
            <h3>{{ item.title }}</h3>
          </div>
          
          <div class="comparison-row">
            <div class="comparison-col other">
              <div class="col-label">❌ 其他公司</div>
              <ul>
                <li v-for="(point, i) in item.others" :key="i">{{ point }}</li>
              </ul>
            </div>
            
            <div class="divider"></div>
            
            <div class="comparison-col us">
              <div class="col-label">✅ 耘栈科技</div>
              <ul>
                <li v-for="(point, i) in item.us" :key="i">{{ point }}</li>
              </ul>
            </div>
          </div>

          <div class="card-highlight">
            <el-icon><Trophy /></el-icon>
            <span>{{ item.highlight }}</span>
          </div>
        </div>
      </div>

      <!-- 数据对比 -->
      <div class="metrics-comparison">
        <h3>📊 真实数据对比</h3>
        <div class="metrics-grid">
          <div 
            v-for="metric in metrics" 
            :key="metric.label"
            class="metric-item"
          >
            <div class="metric-label">{{ metric.label }}</div>
            <div class="metric-bars">
              <div class="metric-bar">
                <div class="bar-label">行业平均</div>
                <div class="bar-track">
                  <div 
                    class="bar-fill industry" 
                    :style="{ width: metric.industry + '%' }"
                  >
                    <span class="bar-value">{{ metric.industry }}%</span>
                  </div>
                </div>
              </div>
              <div class="metric-bar">
                <div class="bar-label">耘栈科技</div>
                <div class="bar-track">
                  <div 
                    class="bar-fill ours" 
                    :style="{ width: metric.ours + '%' }"
                  >
                    <span class="bar-value">{{ metric.ours }}%</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="metric-diff">
              <el-icon><TrendCharts /></el-icon>
              <span>领先 {{ metric.ours - metric.industry }}%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 客户见证 -->
      <div class="testimonial-highlight">
        <div class="testimonial-quote">
          <div class="quote-mark">"</div>
          <p>选择耘栈最大的感受就是<strong>放心</strong>。项目进度实时可查，遇到问题秒回，技术实力确实强。最关键的是，他们会主动提供优化建议，而不是客户说什么就做什么。这才是真正专业的团队。</p>
          <div class="quote-author">
            <div class="author-avatar">李</div>
            <div class="author-info">
              <div class="author-name">李经理</div>
              <div class="author-company">某智能科技公司 CTO</div>
              <div class="author-project">合作项目：AI客服系统 + 小程序</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Trophy, TrendCharts, Promotion, ChatDotRound } from '@element-plus/icons-vue'

// 处理联系咨询
const handleContact = () => {
  // 触发滚动到页面顶部并打开在线咨询
  window.scrollTo({ top: 0, behavior: 'smooth' })
  
  // 延迟触发点击在线咨询按钮
  setTimeout(() => {
    const contactBtn = document.querySelector('.float-contact')
    if (contactBtn) {
      contactBtn.click()
    } else {
      ElMessage.info('请点击右下角的在线咨询按钮')
    }
  }, 500)
}

const differences = ref([
  {
    emoji: '🔍',
    title: '项目透明度',
    others: [
      '项目黑盒，进度靠问',
      '遇到问题才通知',
      '阶段性汇报',
      '验收才能看代码'
    ],
    us: [
      '实时项目看板，随时查看',
      '每日自动推送进度',
      'Git提交记录公开',
      '开发过程代码可查'
    ],
    highlight: '客户随时掌握项目进度，心里有数'
  },
  {
    emoji: '💰',
    title: '价格透明度',
    others: [
      '报价模糊，后期加价',
      '隐藏收费项目',
      '维护费用另算',
      '源码需额外付费'
    ],
    us: [
      '在线计算器，明码标价',
      '所见即所得，无隐藏费用',
      '3个月免费维护',
      '源码100%交付'
    ],
    highlight: '客户知道每一分钱花在哪里'
  },
  {
    emoji: '⚡',
    title: '响应速度',
    others: [
      '工作日才回复',
      '问题反馈慢',
      '需要层层上报',
      '平均响应4-8小时'
    ],
    us: [
      '7x24小时在线',
      '30分钟内响应',
      '直接对接技术',
      '紧急问题10分钟内处理'
    ],
    highlight: '时间就是金钱，我们珍惜客户的每一秒'
  },
  {
    emoji: '🎯',
    title: '技术能力',
    others: [
      '外包转包，层层分包',
      '初级开发为主',
      '技术栈陈旧',
      '缺乏前沿经验'
    ],
    us: [
      '核心团队直接开发',
      '10年+技术专家',
      'GPT-4、Vue3等最新技术',
      '200+项目实战经验'
    ],
    highlight: '用最新最稳定的技术，为你打造精品'
  }
])

const metrics = ref([
  { label: '按时交付率', industry: 65, ours: 96 },
  { label: '客户满意度', industry: 78, ours: 98 },
  { label: '复购率', industry: 45, ours: 85 },
  { label: '推荐率', industry: 52, ours: 92 },
  { label: 'Bug修复速度', industry: 60, ours: 95 },
  { label: '代码质量', industry: 70, ours: 93 }
])
</script>

<style scoped>
.competitive-section {
  padding: 40px 0;
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

/* 差异卡片 */
.difference-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(550px, 1fr));
  gap: 30px;
  margin-bottom: 80px;
}

.difference-card {
  padding: 35px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.4s ease;
  animation: slideInUp 0.6s ease-out var(--delay) backwards;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.difference-card:hover {
  transform: translateY(-8px);
  border-color: rgba(0, 212, 255, 0.4);
  box-shadow: 0 20px 50px rgba(0, 212, 255, 0.2);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 25px;
}

.card-emoji {
  font-size: 36px;
  filter: drop-shadow(0 0 10px rgba(0, 212, 255, 0.3));
}

.card-header h3 {
  font-size: 24px;
  color: #fff;
  font-weight: 700;
}

.comparison-row {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.comparison-col ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.comparison-col li {
  padding: 10px 0;
  font-size: 14px;
  line-height: 1.6;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.comparison-col li:last-child {
  border-bottom: none;
}

.col-label {
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 15px;
  padding: 8px 12px;
  border-radius: 10px;
  text-align: center;
}

.comparison-col.other .col-label {
  background: rgba(255, 0, 110, 0.1);
  color: rgba(255, 0, 110, 0.9);
  border: 1px solid rgba(255, 0, 110, 0.2);
}

.comparison-col.other li {
  color: rgba(255, 255, 255, 0.5);
}

.comparison-col.us .col-label {
  background: rgba(0, 212, 255, 0.1);
  color: rgba(0, 212, 255, 0.9);
  border: 1px solid rgba(0, 212, 255, 0.2);
}

.comparison-col.us li {
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}

.divider {
  width: 2px;
  background: linear-gradient(180deg, transparent, rgba(0, 212, 255, 0.3), transparent);
}

.card-highlight {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px 20px;
  background: rgba(0, 212, 255, 0.08);
  border-radius: 12px;
  border: 1px solid rgba(0, 212, 255, 0.2);
  font-size: 14px;
  color: rgba(0, 212, 255, 0.95);
  font-weight: 600;
}

.card-highlight :deep(.el-icon) {
  font-size: 20px;
}

/* 数据对比 */
.metrics-comparison {
  margin-bottom: 80px;
}

.metrics-comparison h3 {
  font-size: 32px;
  font-weight: 700;
  color: #fff;
  text-align: center;
  margin-bottom: 50px;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 35px;
}

.metric-item {
  padding: 30px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  transition: all 0.3s ease;
}

.metric-item:hover {
  transform: translateY(-5px);
  border-color: rgba(0, 212, 255, 0.3);
  box-shadow: 0 15px 40px rgba(0, 212, 255, 0.15);
}

.metric-label {
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 20px;
}

.metric-bars {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 15px;
}

.metric-bar {
  display: grid;
  grid-template-columns: 90px 1fr;
  gap: 15px;
  align-items: center;
}

.bar-label {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 600;
}

.bar-track {
  height: 32px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  overflow: hidden;
  position: relative;
}

.bar-fill {
  height: 100%;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 15px;
  transition: width 1s ease;
  position: relative;
}

.bar-fill.industry {
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.15));
}

.bar-fill.ours {
  background: linear-gradient(90deg, #00d4ff, #0099cc);
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.4);
}

.bar-value {
  font-size: 13px;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}

.metric-diff {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 15px;
  background: rgba(0, 212, 255, 0.1);
  border-radius: 10px;
  border: 1px solid rgba(0, 212, 255, 0.2);
  font-size: 14px;
  color: #00d4ff;
  font-weight: 600;
}

/* 客户见证 */
.testimonial-highlight {
  margin-bottom: 80px;
}

.testimonial-quote {
  max-width: 900px;
  margin: 0 auto;
  padding: 50px;
  background: rgba(255, 255, 255, 0.03);
  border: 2px solid rgba(0, 212, 255, 0.2);
  border-radius: 25px;
  position: relative;
}

.quote-mark {
  position: absolute;
  top: 20px;
  left: 30px;
  font-size: 80px;
  color: rgba(0, 212, 255, 0.2);
  font-family: Georgia, serif;
  line-height: 1;
}

.testimonial-quote p {
  font-size: 18px;
  line-height: 1.9;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 30px;
  position: relative;
  z-index: 1;
}

.testimonial-quote strong {
  color: #00d4ff;
  font-weight: 700;
}

.quote-author {
  display: flex;
  align-items: center;
  gap: 20px;
  padding-top: 25px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.author-avatar {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #00d4ff, #9d4edd);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
  color: white;
  box-shadow: 0 0 25px rgba(0, 212, 255, 0.5);
}

.author-name {
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 5px;
}

.author-company {
  font-size: 14px;
  color: rgba(0, 212, 255, 0.8);
  margin-bottom: 5px;
}

.author-project {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
}

/* CTA区域 */
.cta-section {
  text-align: center;
  padding: 40px;
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.05), rgba(157, 78, 221, 0.05));
  border: 2px solid rgba(0, 212, 255, 0.2);
  border-radius: 25px;
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
  background: radial-gradient(circle at 30% 50%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 70% 50%, rgba(157, 78, 221, 0.1) 0%, transparent 50%);
  z-index: 0;
}

.cta-section h3 {
  font-size: 32px;
  font-weight: 800;
  color: #fff;
  margin-bottom: 15px;
  position: relative;
  z-index: 1;
}

.cta-section > p {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 35px;
  position: relative;
  z-index: 1;
}

.cta-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 25px;
  position: relative;
  z-index: 1;
}

.cta-btn,
.cta-btn-outline {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 55px;
  padding: 0 35px;
  font-size: 16px;
  font-weight: 600;
}

.cta-note {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.8);
  position: relative;
  z-index: 1;
}

.highlight-text {
  display: inline-block;
  padding: 4px 12px;
  background: linear-gradient(135deg, #ff006e, #d90066);
  border-radius: 8px;
  color: white;
  font-weight: 700;
  font-size: 18px;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.glass-effect {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
}

@media (max-width: 768px) {
  .difference-cards {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .difference-card {
    padding: 20px;
    border-radius: 16px;
  }

  .card-header h3 {
    font-size: 18px;
  }

  .comparison-row {
    flex-direction: column;
    gap: 15px;
  }

  .divider {
    width: 100%;
    height: 1px;
  }

  .comparison-col ul {
    font-size: 13px;
  }

  .card-highlight {
    font-size: 13px;
    padding: 10px 15px;
  }

  .metrics-comparison {
    padding: 25px 20px;
  }

  .metrics-comparison h3 {
    font-size: 20px;
    margin-bottom: 25px;
  }

  .metrics-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .metric-item {
    padding: 15px;
  }

  .metric-label {
    font-size: 16px;
    margin-bottom: 15px;
  }

  .bar-track {
    height: 28px;
  }

  .bar-value {
    font-size: 11px;
  }

  .testimonial-quote {
    padding: 25px 20px;
  }

  .quote-mark {
    font-size: 50px;
    top: 10px;
    left: 20px;
  }

  .testimonial-quote p {
    font-size: 15px;
    line-height: 1.7;
  }

  .quote-author {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }

  .cta-section {
    padding: 30px 20px;
  }

  .cta-section h3 {
    font-size: 24px;
  }

  .cta-section > p {
    font-size: 15px;
  }

  .cta-buttons {
    flex-direction: column;
    gap: 12px;
  }

  .cta-btn,
  .cta-btn-outline {
    width: 100%;
    justify-content: center;
    height: 48px;
    font-size: 14px;
  }
}

@media (max-width: 576px) {
  .difference-card {
    padding: 18px 15px;
  }

  .card-emoji {
    font-size: 24px;
  }

  .card-header h3 {
    font-size: 16px;
  }

  .comparison-col .col-label {
    font-size: 12px;
  }

  .comparison-col ul {
    font-size: 12px;
  }

  .metrics-comparison h3 {
    font-size: 18px;
  }

  .metric-label {
    font-size: 14px;
  }

  .bar-label {
    font-size: 11px;
  }

  .testimonial-quote {
    padding: 20px 15px;
    border-radius: 16px;
  }

  .testimonial-quote p {
    font-size: 14px;
  }

  .author-avatar {
    width: 50px;
    height: 50px;
    font-size: 20px;
  }

  .author-name {
    font-size: 16px;
  }

  .cta-section {
    padding: 25px 15px;
    border-radius: 16px;
  }

  .cta-section h3 {
    font-size: 20px;
  }
}
</style>

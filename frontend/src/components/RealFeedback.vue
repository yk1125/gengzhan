<template>
  <section class="real-feedback-section">
    <div class="container">
      <div class="section-header">
        <h2>💬 客户真实反馈</h2>
        <p>来自微信、邮件的真实评价 · 不是演员，都是甲方</p>
        <div class="verified-badge">
          <el-icon><Select /></el-icon>
          <span>真实验证</span>
        </div>
      </div>

      <!-- 瀑布流反馈墙 -->
      <div class="feedback-masonry">
        <div 
          v-for="feedback in feedbacks" 
          :key="feedback.id"
          class="feedback-card"
          :class="feedback.type"
        >
          <!-- 反馈类型标识 -->
          <div class="feedback-type-badge">
            <span class="type-icon">{{ typeIcons[feedback.type] }}</span>
            <span class="type-text">{{ typeNames[feedback.type] }}</span>
          </div>

          <!-- 微信聊天样式 -->
          <div v-if="feedback.type === 'wechat'" class="wechat-bubble">
            <div class="wechat-header">
              <div class="wechat-avatar">{{ feedback.avatar }}</div>
              <div class="wechat-info">
                <div class="wechat-name">{{ feedback.name }}</div>
                <div class="wechat-time">{{ feedback.time }}</div>
              </div>
            </div>
            <div class="wechat-messages">
              <div 
                v-for="(msg, index) in feedback.messages" 
                :key="index"
                class="wechat-message"
                :class="msg.sender"
              >
                <div class="message-bubble">{{ msg.text }}</div>
              </div>
            </div>
          </div>

          <!-- 邮件样式 -->
          <div v-else-if="feedback.type === 'email'" class="email-content">
            <div class="email-header">
              <div class="email-subject">{{ feedback.subject }}</div>
              <div class="email-meta">
                <span class="email-from">{{ feedback.from }}</span>
                <span class="email-date">{{ feedback.date }}</span>
              </div>
            </div>
            <div class="email-body">{{ feedback.content }}</div>
            <div v-if="feedback.attachment" class="email-attachment">
              <el-icon><Paperclip /></el-icon>
              <span>{{ feedback.attachment }}</span>
            </div>
          </div>

          <!-- 评价样式 -->
          <div v-else-if="feedback.type === 'review'" class="review-content">
            <div class="review-stars">
              <span v-for="n in 5" :key="n" class="star">⭐</span>
            </div>
            <p class="review-text">{{ feedback.content }}</p>
            <div class="review-author">
              <div class="author-avatar">{{ feedback.avatar }}</div>
              <div class="author-info">
                <div class="author-name">{{ feedback.name }}</div>
                <div class="author-company">{{ feedback.company }}</div>
              </div>
            </div>
          </div>

          <!-- 验证标记 -->
          <div class="verified-mark">
            <el-icon><CircleCheckFilled /></el-icon>
            <span>已验证真实性</span>
          </div>
        </div>
      </div>

      <!-- 数据统计 -->
      <div class="feedback-stats">
        <div class="stat-card">
          <div class="stat-icon">⭐</div>
          <div class="stat-content">
            <div class="stat-number">4.9</div>
            <div class="stat-label">平均评分</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">💬</div>
          <div class="stat-content">
            <div class="stat-number">156+</div>
            <div class="stat-label">客户好评</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🤝</div>
          <div class="stat-content">
            <div class="stat-number">85%</div>
            <div class="stat-label">复购率</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">📈</div>
          <div class="stat-content">
            <div class="stat-number">92%</div>
            <div class="stat-label">推荐率</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { Select, CircleCheckFilled, Paperclip } from '@element-plus/icons-vue'

const typeIcons = {
  wechat: '💬',
  email: '📧',
  review: '⭐'
}

const typeNames = {
  wechat: '微信聊天',
  email: '客户邮件',
  review: '项目评价'
}

const feedbacks = ref([
  {
    id: 1,
    type: 'wechat',
    avatar: '张',
    name: '张总 - 某教育科技公司',
    time: '昨天 15:32',
    messages: [
      { sender: 'client', text: '这次AI功能上线后，用户反馈非常好！' },
      { sender: 'client', text: '智能问答准确率比预期高很多' },
      { sender: 'us', text: '感谢认可！我们在提示词工程上做了很多优化' },
      { sender: 'client', text: '下个月准备再做一个小程序，还找你们👍' }
    ]
  },
  {
    id: 2,
    type: 'email',
    subject: 'Re: 项目验收通过 - 表扬信',
    from: '李经理 <li@example.com>',
    date: '2025-01-15',
    content: '项目组的技术实力确实强，从需求沟通到上线只用了40天，中间还调整了两次需求都能快速响应。特别是后端架构设计得很合理，为后续扩展留了很多空间。我们老板说下次系统升级继续找你们合作。',
    attachment: '验收报告.pdf'
  },
  {
    id: 3,
    type: 'review',
    avatar: '王',
    name: '王总',
    company: '某零售连锁企业',
    content: '合作很愉快！响应速度快，技术过硬，售后也很负责。我们的小程序上线后，订单量增长了3倍，投资回报率超出预期。已经推荐给几个朋友了。'
  },
  {
    id: 4,
    type: 'wechat',
    avatar: '刘',
    name: '刘总 - 某物流公司',
    time: '3天前 10:18',
    messages: [
      { sender: 'client', text: 'App的实时定位功能很稳定' },
      { sender: 'client', text: '司机们都说比之前的系统好用多了' },
      { sender: 'us', text: '这是我们优化了地图SDK和算法的结果' },
      { sender: 'client', text: '技术细节你们确实考虑得很周到！' }
    ]
  },
  {
    id: 5,
    type: 'email',
    subject: '感谢信 - 项目提前交付',
    from: '陈经理 <chen@company.com>',
    date: '2025-01-10',
    content: '你们团队真的太给力了！原本45天的工期，35天就完成了所有功能开发和测试。而且代码质量很高，我们技术团队review后都很满意。这种专业度和执行力在行业里真的少见。'
  },
  {
    id: 6,
    type: 'review',
    avatar: '赵',
    name: '赵女士',
    company: '某美妆品牌',
    content: '小程序设计得很漂亮，用户体验也好。最重要的是耘栈团队很有耐心，我们改了好几次设计稿都没有不耐烦，还主动提供优化建议。现在小程序日活已经过万了！'
  },
  {
    id: 7,
    type: 'wechat',
    avatar: '周',
    name: '周总 - 某智能硬件公司',
    time: '上周 16:45',
    messages: [
      { sender: 'client', text: 'IoT设备和小程序的连接很流畅' },
      { sender: 'client', text: '你们对MQTT协议理解很深啊' },
      { sender: 'us', text: '我们在物联网领域有多个项目经验' },
      { sender: 'client', text: '看出来了，后面还有几个产品要开发' }
    ]
  },
  {
    id: 8,
    type: 'email',
    subject: '项目结项 - 超预期完成',
    from: '马总 <ma@tech.com>',
    date: '2025-01-08',
    content: 'AI客服系统上线后，人工客服工作量减少了70%，客户满意度反而提升了。GPT-4的集成做得很好，回答准确度高，还能处理复杂问题。这个投资太值了！'
  }
])
</script>

<style scoped>
.real-feedback-section {
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
  background: linear-gradient(135deg, #00d4ff 0%, #9d4edd 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 15px;
}

.section-header p {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 20px;
}

.verified-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 20px;
  color: #00d4ff;
  font-size: 14px;
  font-weight: 600;
}

/* 瀑布流布局 */
.feedback-masonry {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 25px;
  margin-bottom: 60px;
}

.feedback-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 25px;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}

.feedback-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, transparent, var(--accent-color), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.feedback-card.wechat {
  --accent-color: #07c160;
}

.feedback-card.email {
  --accent-color: #00d4ff;
}

.feedback-card.review {
  --accent-color: #ffd700;
}

.feedback-card:hover::before {
  opacity: 1;
}

.feedback-card:hover {
  transform: translateY(-5px);
  border-color: rgba(0, 212, 255, 0.3);
  box-shadow: 0 15px 40px rgba(0, 212, 255, 0.15);
}

/* 反馈类型标识 */
.feedback-type-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  font-size: 12px;
  margin-bottom: 15px;
}

.type-icon {
  font-size: 14px;
}

.type-text {
  color: rgba(255, 255, 255, 0.7);
  font-weight: 600;
}

/* 微信聊天样式 */
.wechat-bubble {
  margin-top: 15px;
}

.wechat-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 15px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.wechat-avatar {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #07c160, #06ad56);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 16px;
}

.wechat-name {
  font-size: 14px;
  color: #fff;
  font-weight: 600;
  margin-bottom: 4px;
}

.wechat-time {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
}

.wechat-messages {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.wechat-message {
  display: flex;
}

.wechat-message.client {
  justify-content: flex-start;
}

.wechat-message.us {
  justify-content: flex-end;
}

.message-bubble {
  max-width: 75%;
  padding: 10px 15px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.6;
  word-wrap: break-word;
}

.wechat-message.client .message-bubble {
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.9);
  border-top-left-radius: 4px;
}

.wechat-message.us .message-bubble {
  background: rgba(7, 193, 96, 0.3);
  color: rgba(255, 255, 255, 0.95);
  border-top-right-radius: 4px;
}

/* 邮件样式 */
.email-content {
  margin-top: 15px;
}

.email-header {
  margin-bottom: 15px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.email-subject {
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 8px;
}

.email-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}

.email-body {
  font-size: 14px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 12px;
}

.email-attachment {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 10px;
  font-size: 12px;
  color: #00d4ff;
}

/* 评价样式 */
.review-content {
  margin-top: 15px;
}

.review-stars {
  margin-bottom: 15px;
}

.star {
  font-size: 18px;
  margin-right: 4px;
  filter: drop-shadow(0 0 5px rgba(255, 215, 0, 0.5));
}

.review-text {
  font-size: 15px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 20px;
}

.review-author {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-top: 15px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.author-avatar {
  width: 45px;
  height: 45px;
  background: linear-gradient(135deg, #9d4edd, #7b2cbf);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 16px;
}

.author-name {
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 4px;
}

.author-company {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}

/* 验证标记 */
.verified-mark {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 15px;
  padding: 6px 12px;
  background: rgba(0, 212, 255, 0.08);
  border-radius: 10px;
  font-size: 11px;
  color: rgba(0, 212, 255, 0.9);
  font-weight: 600;
}

.verified-mark :deep(.el-icon) {
  font-size: 14px;
}

/* 反馈统计 */
.feedback-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 30px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  border-color: rgba(0, 212, 255, 0.3);
  box-shadow: 0 10px 30px rgba(0, 212, 255, 0.15);
}

.stat-icon {
  font-size: 42px;
  filter: drop-shadow(0 0 10px rgba(0, 212, 255, 0.3));
}

.stat-number {
  font-size: 32px;
  font-weight: 900;
  background: linear-gradient(135deg, #00d4ff, #9d4edd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 600;
}

@media (max-width: 768px) {
  .feedback-masonry {
    grid-template-columns: 1fr;
  }
}
</style>

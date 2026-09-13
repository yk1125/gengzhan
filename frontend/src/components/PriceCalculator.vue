<template>
  <section class="price-calculator-section">
    <div class="container">
      <div class="section-header">
        <h2>💰 价格透明计算器</h2>
        <p>不玩套路 · 明码标价 · 在线估算你的项目预算</p>
        <div class="trust-badge">
          <el-icon><Lock /></el-icon>
          <span>无需留电话，直接看报价</span>
        </div>
      </div>

      <div class="calculator-layout">
        <!-- 左侧：选项配置 -->
        <div class="calculator-config glass-effect">
          <h3>📋 选择你的项目需求</h3>
          
          <!-- 项目类型 -->
          <div class="config-group">
            <label class="config-label">
              <span class="label-icon">🎯</span>
              <span>项目类型</span>
            </label>
            <div class="option-grid">
              <div 
                v-for="type in projectTypes" 
                :key="type.id"
                class="option-card"
                :class="{ active: selectedType === type.id }"
                @click="selectType(type.id)"
              >
                <span class="option-icon">{{ type.icon }}</span>
                <span class="option-name">{{ type.name }}</span>
                <span class="option-base">¥{{ type.basePrice }}</span>
              </div>
            </div>
          </div>

          <!-- 功能模块 -->
          <div class="config-group">
            <label class="config-label">
              <span class="label-icon">🧩</span>
              <span>功能模块 (多选)</span>
            </label>
            <div class="feature-list">
              <div 
                v-for="feature in features" 
                :key="feature.id"
                class="feature-item"
                :class="{ active: selectedFeatures.includes(feature.id) }"
                @click="toggleFeature(feature.id)"
              >
                <div class="feature-checkbox">
                  <el-icon v-if="selectedFeatures.includes(feature.id)"><Check /></el-icon>
                </div>
                <div class="feature-info">
                  <div class="feature-name">{{ feature.name }}</div>
                  <div class="feature-desc">{{ feature.description }}</div>
                </div>
                <div class="feature-price">+¥{{ feature.price }}</div>
              </div>
            </div>
          </div>

          <!-- 开发周期 -->
          <div class="config-group">
            <label class="config-label">
              <span class="label-icon">⏱️</span>
              <span>期望交付时间</span>
            </label>
            <el-radio-group v-model="urgency" class="urgency-group">
              <el-radio-button label="normal">
                <span class="urgency-option">
                  <span>正常交付</span>
                  <span class="urgency-note">45-60天</span>
                </span>
              </el-radio-button>
              <el-radio-button label="urgent">
                <span class="urgency-option">
                  <span>加急交付</span>
                  <span class="urgency-note">30天 (+20%)</span>
                </span>
              </el-radio-button>
            </el-radio-group>
          </div>

          <!-- 设计要求 -->
          <div class="config-group">
            <label class="config-label">
              <span class="label-icon">🎨</span>
              <span>UI设计要求</span>
            </label>
            <el-radio-group v-model="designLevel" class="design-group">
              <el-radio-button label="basic">基础设计</el-radio-button>
              <el-radio-button label="advanced">高级定制 (+¥5000)</el-radio-button>
              <el-radio-button label="premium">品牌级设计 (+¥12000)</el-radio-button>
            </el-radio-group>
          </div>
        </div>

        <!-- 右侧：价格预览 -->
        <div class="price-preview glass-effect">
          <h3>💎 项目预算估算</h3>
          
          <div class="price-breakdown">
            <div class="price-item">
              <span class="item-label">基础开发</span>
              <span class="item-price">¥{{ basePrice.toLocaleString() }}</span>
            </div>
            
            <div v-if="featuresPrice > 0" class="price-item">
              <span class="item-label">功能模块 ({{ selectedFeatures.length }}项)</span>
              <span class="item-price">¥{{ featuresPrice.toLocaleString() }}</span>
            </div>
            
            <div v-if="urgency === 'urgent'" class="price-item">
              <span class="item-label">加急费用</span>
              <span class="item-price">¥{{ urgencyPrice.toLocaleString() }}</span>
            </div>
            
            <div v-if="designPrice > 0" class="price-item">
              <span class="item-label">设计费用</span>
              <span class="item-price">¥{{ designPrice.toLocaleString() }}</span>
            </div>

            <div class="price-divider"></div>

            <div class="price-total">
              <span class="total-label">预估总价</span>
              <span class="total-price">¥{{ totalPrice.toLocaleString() }}</span>
            </div>

            <div class="price-range">
              <el-icon><InfoFilled /></el-icon>
              <span>实际报价区间: ¥{{ (totalPrice * 0.9).toLocaleString() }} - ¥{{ (totalPrice * 1.1).toLocaleString() }}</span>
            </div>
          </div>

          <div class="price-features">
            <h4>✅ 包含服务</h4>
            <ul>
              <li><el-icon><Check /></el-icon> 源代码交付</li>
              <li><el-icon><Check /></el-icon> 3个月免费维护</li>
              <li><el-icon><Check /></el-icon> 技术文档</li>
              <li><el-icon><Check /></el-icon> 部署协助</li>
              <li><el-icon><Check /></el-icon> 人员培训</li>
            </ul>
          </div>

          <div class="price-actions">
            <el-button type="primary" size="large" class="contact-btn" @click="handleContact">
              <el-icon><ChatDotRound /></el-icon>
              <span>获取详细报价</span>
            </el-button>
            <el-button size="large" class="download-btn" @click="downloadQuote">
              <el-icon><Download /></el-icon>
              <span>下载报价单</span>
            </el-button>
          </div>

          <div class="price-note">
            <p>💡 此价格为系统自动估算，最终报价需根据详细需求调整</p>
            <p>🎁 首次合作客户享9折优惠</p>
          </div>
        </div>
      </div>

      <!-- 价格对比 -->
      <div class="price-comparison">
        <h3>🔍 为什么我们的价格更有优势？</h3>
        <div class="comparison-grid">
          <div class="comparison-item">
            <div class="comparison-icon">❌</div>
            <h4>传统外包公司</h4>
            <ul>
              <li>报价不透明，后期加价</li>
              <li>中间商赚差价30-40%</li>
              <li>交付周期长，沟通成本高</li>
              <li>售后响应慢，维护费用高</li>
            </ul>
          </div>
          <div class="comparison-item highlight">
            <div class="comparison-icon">✅</div>
            <h4>耘栈科技</h4>
            <ul>
              <li>价格透明，在线估算</li>
              <li>直接对接技术团队</li>
              <li>敏捷开发，快速迭代</li>
              <li>3个月免费维护</li>
            </ul>
          </div>
          <div class="comparison-item">
            <div class="comparison-icon">💸</div>
            <h4>招聘自建团队</h4>
            <ul>
              <li>月成本5-8万人民币</li>
              <li>招聘周期1-3个月</li>
              <li>管理成本高</li>
              <li>技术储备不足</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Check, Lock, InfoFilled, ChatDotRound, Download } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const projectTypes = ref([
  { id: 'miniprogram', name: '小程序', icon: '📱', basePrice: 15000 },
  { id: 'app', name: 'App开发', icon: '📲', basePrice: 35000 },
  { id: 'web', name: 'Web网站', icon: '💻', basePrice: 20000 },
  { id: 'ai', name: 'AI应用', icon: '🤖', basePrice: 30000 }
])

const features = ref([
  { id: 1, name: '用户系统', description: '注册登录、个人中心、权限管理', price: 3000 },
  { id: 2, name: '支付功能', description: '微信/支付宝支付对接', price: 5000 },
  { id: 3, name: '数据统计', description: '可视化报表、数据分析', price: 6000 },
  { id: 4, name: '消息推送', description: '模板消息、短信通知', price: 2000 },
  { id: 5, name: '地图定位', description: 'LBS服务、导航功能', price: 4000 },
  { id: 6, name: '直播功能', description: '音视频直播、连麦互动', price: 15000 },
  { id: 7, name: '社交功能', description: '评论点赞、关注粉丝', price: 4000 },
  { id: 8, name: '客服系统', description: '在线客服、智能机器人', price: 8000 }
])

const selectedType = ref('miniprogram')
const selectedFeatures = ref([1, 2])
const urgency = ref('normal')
const designLevel = ref('basic')

const basePrice = computed(() => {
  const type = projectTypes.value.find(t => t.id === selectedType.value)
  return type ? type.basePrice : 0
})

const featuresPrice = computed(() => {
  return selectedFeatures.value.reduce((sum, id) => {
    const feature = features.value.find(f => f.id === id)
    return sum + (feature ? feature.price : 0)
  }, 0)
})

const urgencyPrice = computed(() => {
  return urgency.value === 'urgent' ? Math.round((basePrice.value + featuresPrice.value) * 0.2) : 0
})

const designPrice = computed(() => {
  if (designLevel.value === 'advanced') return 5000
  if (designLevel.value === 'premium') return 12000
  return 0
})

const totalPrice = computed(() => {
  return basePrice.value + featuresPrice.value + urgencyPrice.value + designPrice.value
})

const selectType = (typeId) => {
  selectedType.value = typeId
}

const toggleFeature = (featureId) => {
  const index = selectedFeatures.value.indexOf(featureId)
  if (index > -1) {
    selectedFeatures.value.splice(index, 1)
  } else {
    selectedFeatures.value.push(featureId)
  }
}

const handleContact = () => {
  ElMessage.success('正在为您生成详细报价方案...')
  // 实际应该跳转到联系页面或弹出表单
}

const downloadQuote = () => {
  ElMessage.success('报价单下载功能开发中...')
  // 实际应该生成PDF下载
}
</script>

<style scoped>
.price-calculator-section {
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
}

.section-header h2 {
  font-size: 42px;
  font-weight: 800;
  background: linear-gradient(135deg, #ffd700 0%, #ff8c00 100%);
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

.trust-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 20px;
  color: #ffd700;
  font-size: 14px;
  font-weight: 600;
}

/* 计算器布局 */
.calculator-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 60px;
}

.glass-effect {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 35px;
}

.glass-effect h3 {
  font-size: 24px;
  color: #fff;
  margin-bottom: 30px;
  font-weight: 700;
}

/* 配置区域 */
.config-group {
  margin-bottom: 35px;
}

.config-label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 15px;
}

.label-icon {
  font-size: 20px;
}

/* 项目类型选项 */
.option-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.option-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 18px;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.option-card:hover {
  transform: translateY(-3px);
  border-color: rgba(255, 215, 0, 0.3);
}

.option-card.active {
  background: rgba(255, 215, 0, 0.1);
  border-color: #ffd700;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
}

.option-icon {
  font-size: 32px;
}

.option-name {
  font-size: 14px;
  font-weight: 600;
  color: #fff;
}

.option-base {
  font-size: 12px;
  color: rgba(255, 215, 0, 0.8);
}

/* 功能列表 */
.feature-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.feature-item:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(0, 212, 255, 0.3);
}

.feature-item.active {
  background: rgba(0, 212, 255, 0.1);
  border-color: #00d4ff;
}

.feature-checkbox {
  width: 24px;
  height: 24px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.feature-item.active .feature-checkbox {
  background: #00d4ff;
  border-color: #00d4ff;
}

.feature-info {
  flex: 1;
}

.feature-name {
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 4px;
}

.feature-desc {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}

.feature-price {
  font-size: 14px;
  font-weight: 700;
  color: #00d4ff;
  flex-shrink: 0;
}

/* 紧急程度和设计级别 */
.urgency-group,
.design-group {
  width: 100%;
}

.urgency-group :deep(.el-radio-button),
.design-group :deep(.el-radio-button) {
  flex: 1;
}

.urgency-option {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.urgency-note {
  font-size: 11px;
  opacity: 0.7;
}

/* 价格预览 */
.price-breakdown {
  margin-bottom: 30px;
}

.price-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.item-label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
}

.item-price {
  font-size: 16px;
  font-weight: 600;
  color: #fff;
}

.price-divider {
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.3), transparent);
  margin: 20px 0;
}

.price-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
}

.total-label {
  font-size: 18px;
  font-weight: 700;
  color: #fff;
}

.total-price {
  font-size: 36px;
  font-weight: 900;
  background: linear-gradient(135deg, #ffd700, #ff8c00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.price-range {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 15px;
  background: rgba(0, 212, 255, 0.1);
  border-radius: 10px;
  font-size: 13px;
  color: rgba(0, 212, 255, 0.9);
  margin-bottom: 25px;
}

/* 包含服务 */
.price-features h4 {
  font-size: 16px;
  color: #fff;
  margin-bottom: 15px;
  font-weight: 700;
}

.price-features ul {
  list-style: none;
  padding: 0;
  margin: 0 0 25px 0;
}

.price-features li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
}

.price-features li :deep(.el-icon) {
  color: #00d4ff;
  font-size: 16px;
}

/* 操作按钮 */
.price-actions {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.contact-btn,
.download-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 50px;
  font-size: 15px;
  font-weight: 600;
}

.price-note {
  padding: 15px;
  background: rgba(255, 215, 0, 0.05);
  border-radius: 10px;
  border: 1px solid rgba(255, 215, 0, 0.2);
}

.price-note p {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  margin: 5px 0;
}

/* 价格对比 */
.price-comparison {
  margin-top: 80px;
}

.price-comparison h3 {
  font-size: 28px;
  font-weight: 700;
  color: #fff;
  text-align: center;
  margin-bottom: 40px;
}

.comparison-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
}

.comparison-item {
  padding: 30px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  transition: all 0.3s ease;
}

.comparison-item.highlight {
  background: rgba(0, 212, 255, 0.05);
  border-color: rgba(0, 212, 255, 0.3);
  box-shadow: 0 10px 40px rgba(0, 212, 255, 0.2);
  transform: scale(1.05);
}

.comparison-icon {
  font-size: 48px;
  text-align: center;
  margin-bottom: 20px;
}

.comparison-item h4 {
  font-size: 20px;
  color: #fff;
  text-align: center;
  margin-bottom: 20px;
  font-weight: 700;
}

.comparison-item ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.comparison-item li {
  padding: 10px 0;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.comparison-item li:last-child {
  border-bottom: none;
}

@media (max-width: 1024px) {
  .calculator-layout {
    grid-template-columns: 1fr;
  }
  
  .comparison-grid {
    grid-template-columns: 1fr;
  }
  
  .comparison-item.highlight {
    transform: scale(1);
  }
}
</style>

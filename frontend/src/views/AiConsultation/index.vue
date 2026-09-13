<template>
  <section class="ai-consultation-page">
    <div class="consultation-shell">
      <header class="consultation-header">
        <div class="consultation-title">
          <span class="consultation-mark"><el-icon><Connection /></el-icon></span>
          <div>
            <strong>耘栈 AI 咨询</strong>
            <span>需求梳理与解决方案建议</span>
          </div>
        </div>
        <router-link to="/" class="consultation-close" aria-label="返回首页" title="返回首页"><el-icon><Close /></el-icon></router-link>
      </header>

      <main ref="messagePanel" class="consultation-messages" aria-live="polite">
        <div v-for="item in messages" :key="item.id" class="chat-row" :class="item.role">
          <span v-if="item.role === 'assistant'" class="chat-avatar"><el-icon><Connection /></el-icon></span>
          <div class="chat-bubble">
            <span v-if="item.role === 'assistant'" class="chat-name">耘栈 AI 咨询</span>
            <p>{{ item.content }}</p>
            <button v-if="item.fallback" type="button" class="fallback-contact" @click="copyWechat">
              复制微信号 YunZhanKk
            </button>
          </div>
        </div>
        <div v-if="isSending" class="chat-row assistant">
          <span class="chat-avatar"><el-icon><Connection /></el-icon></span>
          <div class="chat-bubble typing-bubble"><i></i><i></i><i></i></div>
        </div>
        <div v-if="messages.length === 1 && !isSending" class="suggestion-list">
          <button v-for="item in suggestions" :key="item" type="button" @click="sendMessage(item)">{{ item }}</button>
        </div>
      </main>

      <form class="consultation-composer" @submit.prevent="sendMessage(draft)">
        <textarea
          v-model="draft"
          aria-label="咨询内容"
          :disabled="isSending"
          placeholder="描述您想了解的产品、服务或业务场景"
          rows="1"
          @keydown.enter.exact.prevent="sendMessage(draft)"
        ></textarea>
        <button type="submit" :disabled="!draft.trim() || isSending" aria-label="发送咨询"><el-icon><Promotion /></el-icon></button>
        <p>AI 仅提供方案建议；报价与合作细节请添加微信 <button type="button" @click="copyWechat">YunZhanKk</button>。</p>
      </form>
    </div>
  </section>
</template>

<script setup>
import { nextTick, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Close, Connection, Promotion } from '@element-plus/icons-vue'
import { chatWithAssistant } from '@/api'

const route = useRoute()
const draft = ref('')
const isSending = ref(false)
const messagePanel = ref(null)
const suggestions = ['我想做一套企业管理系统，应该从哪里开始？', 'AI 客服适合哪些业务场景？', '小程序和 App 应该如何选择？']
const messages = ref([
  {
    id: 1,
    role: 'assistant',
    content: '您好，我是耘栈 AI 咨询助手。请告诉我您希望解决的业务问题、服务对象或已有的产品设想，我会先帮您梳理方向。'
  }
])

const scrollToLatest = async () => {
  await nextTick()
  if (messagePanel.value) {
    messagePanel.value.scrollTop = messagePanel.value.scrollHeight
  }
}

const copyWechat = async () => {
  try {
    await navigator.clipboard.writeText('YunZhanKk')
    ElMessage.success('微信号已复制：YunZhanKk')
  } catch (error) {
    ElMessage.error('复制失败，请手动添加 YunZhanKk')
  }
}

const sendMessage = async (content) => {
  const question = String(content || '').trim()
  if (!question || isSending.value) return

  const history = messages.value
    .filter(item => item.role === 'user' || item.role === 'assistant')
    .slice(-12)
    .map(item => ({ role: item.role, content: item.content }))

  messages.value.push({ id: Date.now(), role: 'user', content: question })
  draft.value = ''
  isSending.value = true
  await scrollToLatest()

  try {
    const response = await chatWithAssistant({ message: question, history })
    messages.value.push({
      id: Date.now() + 1,
      role: 'assistant',
      content: response.data.message,
      fallback: response.data.fallback === true
    })
  } catch (error) {
    messages.value.push({
      id: Date.now() + 1,
      role: 'assistant',
      content: 'AI 服务暂时无法响应，您可添加微信 YunZhanKk，人工顾问为您梳理需求。',
      fallback: true
    })
  } finally {
    isSending.value = false
    await scrollToLatest()
  }
}

onMounted(() => {
  const initialQuestion = typeof route.query.q === 'string' ? route.query.q.trim() : ''
  if (initialQuestion) sendMessage(initialQuestion)
})
</script>

<style scoped>
.ai-consultation-page { min-height: calc(100svh - 78px); padding: 48px 24px; background: #eef3f9; }
.consultation-shell { display: grid; grid-template-rows: auto minmax(0, 1fr) auto; width: min(100%, 1120px); height: min(760px, calc(100svh - 174px)); min-height: 570px; margin: 0 auto; overflow: hidden; background: #f7f9fc; border: 1px solid #dce4ef; box-shadow: 0 18px 42px rgba(25, 53, 98, .12); }
.consultation-header { display: flex; align-items: center; justify-content: space-between; min-height: 78px; padding: 0 28px; background: #fff; border-bottom: 1px solid #e0e6ee; }
.consultation-title { display: flex; align-items: center; gap: 13px; color: #172b46; }
.consultation-mark, .chat-avatar { display: grid; place-items: center; flex: 0 0 auto; color: #fff; background: #1c4aa0; }
.consultation-mark { width: 36px; height: 36px; font-size: 19px; }
.consultation-title strong { display: block; font-size: 18px; letter-spacing: 0; }
.consultation-title span:not(.consultation-mark) { display: block; margin-top: 4px; color: #77889a; font-size: 12px; }
.consultation-close { display: grid; place-items: center; width: 36px; height: 36px; color: #526579; border: 1px solid #dae3ef; text-decoration: none; }
.consultation-close:hover { color: #fff; background: #173d86; border-color: #173d86; }
.consultation-messages { min-height: 0; padding: 32px; overflow-y: auto; }
.chat-row { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 22px; }
.chat-row.user { justify-content: flex-end; }
.chat-avatar { width: 32px; height: 32px; margin-top: 2px; font-size: 16px; }
.chat-bubble { max-width: min(80%, 760px); padding: 17px 19px; color: #304255; background: #fff; border: 1px solid #e0e7f0; box-shadow: 0 4px 13px rgba(31, 57, 94, .05); }
.chat-row.user .chat-bubble { color: #fff; background: #173d86; border-color: #173d86; }
.chat-name { display: block; margin-bottom: 9px; color: #1f55bf; font-size: 12px; font-weight: 800; }
.chat-bubble p { margin: 0; white-space: pre-wrap; font-size: 15px; line-height: 1.85; }
.fallback-contact { min-height: 38px; margin-top: 14px; padding: 0 14px; color: #fff; background: #173d86; border: 1px solid #173d86; border-radius: 4px; cursor: pointer; font: inherit; font-size: 12px; font-weight: 800; }
.fallback-contact:hover { background: #102c67; border-color: #102c67; }
.typing-bubble { display: flex; align-items: center; gap: 5px; min-width: 78px; }
.typing-bubble i { width: 6px; height: 6px; background: #6580ac; border-radius: 50%; animation: typing 1.1s ease-in-out infinite; }
.typing-bubble i:nth-child(2) { animation-delay: .15s; }
.typing-bubble i:nth-child(3) { animation-delay: .3s; }
.suggestion-list { display: flex; flex-wrap: wrap; gap: 9px; margin: -4px 0 0 44px; }
.suggestion-list button { min-height: 34px; padding: 0 12px; color: #385276; background: #fff; border: 1px solid #dce5f0; cursor: pointer; font: inherit; font-size: 12px; }
.suggestion-list button:hover { color: #173d86; border-color: #7394ca; background: #f3f7ff; }
.consultation-composer { padding: 18px 24px 15px; background: #fff; border-top: 1px solid #e0e6ee; }
.consultation-composer textarea { display: block; width: 100%; min-height: 66px; max-height: 150px; padding: 18px 58px 18px 18px; resize: vertical; color: #243648; background: #f6f8fb; border: 1px solid #dae4f1; border-radius: 0; font: inherit; font-size: 15px; line-height: 1.5; outline: none; }
.consultation-composer textarea:focus { background: #fff; border-color: #1f55bf; box-shadow: 0 0 0 3px rgba(31, 85, 191, .10); }
.consultation-composer { position: relative; }
.consultation-composer > button { position: absolute; top: 34px; right: 42px; display: grid; place-items: center; width: 36px; height: 36px; color: #fff; background: #173d86; border: 0; border-radius: 50%; cursor: pointer; }
.consultation-composer > button:disabled { color: #9aa9b9; background: #e7ecf3; cursor: not-allowed; }
.consultation-composer p { margin: 10px 0 0; color: #8190a0; font-size: 11px; }
.consultation-composer p button { padding: 0; color: #1f55bf; background: transparent; border: 0; cursor: pointer; font: inherit; font-weight: 700; }
@keyframes typing { 0%, 100% { transform: translateY(0); opacity: .45; } 50% { transform: translateY(-4px); opacity: 1; } }
@media (max-width: 768px) {
  .ai-consultation-page { min-height: calc(100svh - 66px); padding: 0; }
  .consultation-shell { width: 100%; height: calc(100svh - 66px); min-height: 0; border: 0; box-shadow: none; }
  .consultation-header { min-height: 66px; padding: 0 16px; }
  .consultation-title strong { font-size: 16px; }
  .consultation-title span:not(.consultation-mark) { display: none; }
  .consultation-messages { padding: 20px 16px; }
  .chat-bubble { max-width: 86%; padding: 14px 15px; }
  .chat-bubble p { font-size: 14px; line-height: 1.75; }
  .suggestion-list { margin-left: 0; }
  .consultation-composer { padding: 14px 16px 12px; }
  .consultation-composer > button { top: 29px; right: 30px; }
}
</style>

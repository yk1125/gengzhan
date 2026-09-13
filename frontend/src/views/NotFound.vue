<template>
  <main class="not-found">
    <div class="not-found__inner">
      <p class="not-found__code">
        404
      </p>
      <h1 class="not-found__title">
        {{ copy.title }}
      </h1>
      <p class="not-found__text">
        {{ copy.text }}
      </p>
      <div class="not-found__actions">
        <router-link
          class="not-found__link"
          :to="homePath"
        >
          {{ copy.home }}
        </router-link>
        <router-link
          class="not-found__link not-found__link--primary"
          :to="consultPath"
        >
          {{ copy.consult }}
        </router-link>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isEn = computed(() => String(route.path).startsWith('/en'))
const homePath = computed(() => (isEn.value ? '/en' : '/'))
const consultPath = computed(() => (isEn.value ? '/en/ai-consultation' : '/ai-consultation'))

const copy = computed(() => (isEn.value
  ? {
      title: 'This page does not exist.',
      text: 'The address may be out of date, or the content has not been published yet. Use the links below to continue browsing.',
      home: 'Back to home',
      consult: 'Start a conversation'
    }
  : {
      title: '这个页面不存在。',
      text: '地址可能已经失效，或者内容还没有发布。可以通过下面的入口继续浏览。',
      home: '返回首页',
      consult: '开始沟通'
    }))
</script>

<style scoped>
.not-found {
  display: flex;
  align-items: center;
  min-height: 70vh;
  padding: 120px 24px;
  background: var(--yz-offwhite, #f3f3f0);
  color: var(--yz-black, #111);
}

.not-found__inner {
  width: min(100%, 720px);
  margin: 0 auto;
}

.not-found__code {
  margin: 0;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.24em;
  color: var(--yz-orange, #f26b24);
}

.not-found__title {
  margin: 22px 0 0;
  font-size: clamp(34px, 5vw, 60px);
  line-height: 1.05;
  letter-spacing: -0.04em;
}

.not-found__text {
  max-width: 520px;
  margin: 22px 0 0;
  font-size: 15px;
  line-height: 1.9;
  color: var(--yz-copy, #666);
}

.not-found__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 38px;
}

.not-found__link {
  display: inline-block;
  padding: 13px 24px;
  border: 1px solid var(--yz-line, #c7c7c0);
  text-decoration: none;
  font-size: 14px;
  font-weight: 700;
  color: inherit;
}

.not-found__link--primary {
  border-color: var(--yz-orange, #f26b24);
  background: var(--yz-orange, #f26b24);
  color: #fff;
}

@media (max-width: 700px) {
  .not-found {
    padding: 80px 20px;
  }
}
</style>

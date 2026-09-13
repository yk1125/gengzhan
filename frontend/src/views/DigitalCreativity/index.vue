<template>
  <div class="digital-creativity">
    <div class="page-header">
      <div class="container">
        <h1>数字文创</h1>
        <p>数字化内容创作，助力文化产业升级</p>
      </div>
    </div>

    <section class="content-section">
      <div class="container">
        <h2>数字文创服务</h2>
        <div class="services-grid">
          <div v-for="service in services" :key="service.id" class="service-item">
            <h3>{{ service.title }}</h3>
            <p>{{ service.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const services = ref([
  { id: 1, title: '数字藏品', description: 'NFT数字藏品开发与发行平台' },
  { id: 2, title: '虚拟展厅', description: '3D虚拟展厅，沉浸式展览体验' },
  { id: 3, title: '3D建模', description: '文物、建筑等3D数字化建模' },
  { id: 4, title: 'VR/AR应用', description: '虚拟现实和增强现实应用开发' }
])
</script>

<style scoped>
.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 100px 0;
  text-align: center;
}

.page-header h1 {
  font-size: 48px;
  margin-bottom: 20px;
}

.content-section {
  padding: 80px 0;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  margin-top: 50px;
}

.service-item {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}
</style>

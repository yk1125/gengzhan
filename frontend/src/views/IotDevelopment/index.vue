<template>
  <div class="iot-development">
    <div class="page-header">
      <div class="container">
        <h1 class="animate__animated animate__fadeInDown">物联网开发</h1>
        <p class="animate__animated animate__fadeInUp">智能硬件+云平台，打造完整的物联网解决方案</p>
      </div>
    </div>

    <section class="content-section">
      <div class="container">
        <h2>物联网开发服务</h2>
        <p class="lead">提供从硬件到云平台的完整物联网解决方案，包括智能硬件开发、数据采集、云平台搭建、数据分析等服务。</p>
        
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
  { id: 1, title: '智能硬件开发', description: '支持各类传感器、控制器的硬件方案设计与开发' },
  { id: 2, title: '数据采集与传输', description: '实时采集设备数据，稳定传输至云平台' },
  { id: 3, title: '云平台搭建', description: '构建物联网云平台，实现设备管理和数据存储' },
  { id: 4, title: '数据分析与可视化', description: '对采集数据进行分析，提供可视化展示' }
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

.lead {
  font-size: 18px;
  color: #666;
  margin-bottom: 50px;
  text-align: center;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.service-item {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.service-item h3 {
  font-size: 20px;
  margin-bottom: 15px;
  color: #333;
}
</style>

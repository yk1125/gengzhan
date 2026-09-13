<template>
  <div class="logo-wrapper">
    <!-- 根据实际logo格式选择：logo.png、logo.svg、logo.jpg 等 -->
    <img src="/logo-v2.png" alt="北京耘栈科技" class="logo-img" />
  </div>
</template>

<script setup>
// Logo组件 - 北京耘栈科技
</script>

<style scoped>
.logo-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.logo-img {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 0 8px rgba(0, 212, 255, 0.3));
}
</style>

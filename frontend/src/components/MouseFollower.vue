<template>
  <div class="mouse-follower">
    <div 
      class="cursor-dot" 
      :style="{ 
        left: cursorX + 'px', 
        top: cursorY + 'px' 
      }"
    ></div>
    <div 
      class="cursor-ring" 
      :class="{ active: isClicking }"
      :style="{ 
        left: ringX + 'px', 
        top: ringY + 'px' 
      }"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const cursorX = ref(0)
const cursorY = ref(0)
const ringX = ref(0)
const ringY = ref(0)
const isClicking = ref(false)

let rafId = null

const updateCursorPosition = (e) => {
  cursorX.value = e.clientX
  cursorY.value = e.clientY
}

const animateRing = () => {
  ringX.value += (cursorX.value - ringX.value) * 0.2
  ringY.value += (cursorY.value - ringY.value) * 0.2
  
  rafId = requestAnimationFrame(animateRing)
}

const handleMouseDown = () => {
  isClicking.value = true
}

const handleMouseUp = () => {
  isClicking.value = false
}

onMounted(() => {
  document.addEventListener('mousemove', updateCursorPosition)
  document.addEventListener('mousedown', handleMouseDown)
  document.addEventListener('mouseup', handleMouseUp)
  animateRing()
})

onUnmounted(() => {
  document.removeEventListener('mousemove', updateCursorPosition)
  document.removeEventListener('mousedown', handleMouseDown)
  document.removeEventListener('mouseup', handleMouseUp)
  if (rafId) {
    cancelAnimationFrame(rafId)
  }
})
</script>

<style scoped>
.mouse-follower {
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
}

.cursor-dot {
  position: fixed;
  width: 10px;
  height: 10px;
  background: #00d4ff;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 11;
  box-shadow: 0 0 20px rgba(0, 212, 255, 1),
              0 0 40px rgba(0, 212, 255, 0.6);
  opacity: 1;
}

.cursor-ring {
  position: fixed;
  width: 48px;
  height: 48px;
  border: 2.5px solid rgba(0, 212, 255, 0.6);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  transition: all 0.15s ease;
  z-index: 10;
  box-shadow: 0 0 25px rgba(0, 212, 255, 0.5),
              inset 0 0 10px rgba(0, 212, 255, 0.2);
  opacity: 0.9;
}

.cursor-ring.active {
  width: 36px;
  height: 36px;
  border-color: rgba(157, 78, 221, 0.8);
  box-shadow: 0 0 30px rgba(157, 78, 221, 0.7),
              inset 0 0 15px rgba(157, 78, 221, 0.3);
  opacity: 1;
}

/* 隐藏在移动设备上 */
@media (max-width: 1024px) or (hover: none) {
  .mouse-follower {
    display: none;
  }
}
</style>

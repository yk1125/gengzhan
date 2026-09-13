<template>
  <div class="particle-background">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref(null)
let animationId = null
let particles = []

class Particle {
  constructor(canvas) {
    this.canvas = canvas
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height
    this.vx = (Math.random() - 0.5) * 0.2
    this.vy = (Math.random() - 0.5) * 0.2
    this.radius = Math.random() * 2 + 1
  }

  update() {
    this.x += this.vx
    this.y += this.vy

    if (this.x < 0 || this.x > this.canvas.width) this.vx *= -1
    if (this.y < 0 || this.y > this.canvas.height) this.vy *= -1
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(0, 212, 255, 0.4)'
    ctx.fill()
    
    // 添加光晕效果
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2)
    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 2)
    gradient.addColorStop(0, 'rgba(0, 212, 255, 0.2)')
    gradient.addColorStop(1, 'rgba(0, 212, 255, 0)')
    ctx.fillStyle = gradient
    ctx.fill()
  }
}

const initCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  const resizeCanvas = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)

  // 创建粒子
  const particleCount = Math.floor((canvas.width * canvas.height) / 25000)
  particles = []
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle(canvas))
  }

  // 动画循环
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // 绘制连接线
    for (let i = 0; i < particles.length; i++) {
      particles[i].update()
      particles[i].draw(ctx)
      
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 120) {
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.strokeStyle = `rgba(0, 212, 255, ${0.2 * (1 - distance / 120)})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }
    }
    
    animationId = requestAnimationFrame(animate)
  }

  animate()

  return () => {
    window.removeEventListener('resize', resizeCanvas)
  }
}

onMounted(() => {
  const cleanup = initCanvas()
  
  onUnmounted(() => {
    if (animationId) {
      cancelAnimationFrame(animationId)
    }
    if (cleanup) cleanup()
  })
})
</script>

<style scoped>
.particle-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  background: linear-gradient(180deg, #0a0e27 0%, #1a1f3a 100%);
}

canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>

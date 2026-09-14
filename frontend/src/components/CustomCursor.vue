<template>
  <div ref="layerRef" class="fixed_cursor" :class="{ cut: isCut }" aria-hidden="true">
    <div class="cursor">
      <div ref="wholeRef" class="whole" />
      <div class="content_pro">
        <span class="cir" />
        <span class="text">
          <p>{{ label }}</p>
          <span class="end"><span class="arrow">↗</span></span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * 全局自定义光标（SPEC M-27 跟随 / M-28 点击波纹 / M-29 `.cut` 蓝盘）。
 *
 * 数值全部来自 docs/frontend-rebuild/evidence/reference-effects/SPEC.md：
 * - M-27：逐帧 `e = 1 - Math.pow(speed, deltaRatio)`、`r += (o - r) * e`；
 *   首页 `data-speed="8"` → speed = 8/10 = 0.8；位移用 `translate(-50%,-50%) translate(x,y)`
 *   （等同参考站 `gsap.set(..., {xPercent:-50, yPercent:-50})` + `quickSetter`）；
 *   初始位置 = 视口中心；≤1024px 整层 `display:none` 且不注册监听。
 * - M-28：`mousedown` → `.whole` 加 `.on` 并生成 `.bor`；+10ms 加 `.on`、+250ms 加 `.hide`、
 *   +300ms `remove()`；`mouseup` 移除 `.on`，按住 > 300ms 再补一次。
 * - M-29：悬停 `.public_hover .item .img` / `.public_hover .card-img` / `.item_hover` 时整层加 `.cut`，
 *   `.whole` 缩到 0、蓝盘 `#184DC4`（`blur(10px)` + `scale(1.1)`）展开；`transition: ease .3s`。
 *
 * 与参考站的三处有意差异（均登记在 handoffs/B.md §9.4）：
 * 1. 参考站用 gsap 的 `ticker` + `quickSetter`；本项目 node_modules 里 **gsap/lenis 未安装**
 *    （package.json 与 lock 已登记，见 handoffs/B.md 的环境缺口），因此这里用等价的 rAF +
 *    `deltaRatio = dt / (1000/60)` 复现同一收敛曲线，不引入依赖、也不动 A 的 package/lock。
 * 2. 参考站用两个层（`.fixed_cursor` 走 `mix-blend-mode: exclusion`，`.fixed_cursor2` 为
 *    `unset` 承载蓝盘）。这里用一层，在 `.cut` 时把 blend 切回 `normal`，避免蓝盘被反相。
 * 3. 参考站 `.content_pro` 尺寸 = `.cursor` 的 100%（其 `.fixed_cursor2 .cursor` 是 134px）；
 *    这里直接把蓝盘定为 114px（用户验收时点名的尺寸）。
 */
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useMagnetic } from '@/composables/useMagnetic'

/** 参考站断点：≤1024px 整层 display:none。 */
const DESKTOP_MIN_WIDTH = 1025
/** M-27 系数：`data-speed` 缺省 0.9，首页是 8 → 0.8。 */
const FOLLOW_SPEED = 0.8
/** M-27 单帧最大步进（切标签页回来时不要瞬移）。 */
const MAX_FRAME_MS = 100
/** M-29 触发选择器（`public_hover` 由页面挂在容器上）。 */
const CUT_SELECTOR = '.public_hover .item .img, .public_hover .card-img, .item_hover, [data-cursor-cut]'
/** M-28 按住多久算长按（再补一次波纹）。 */
const LONG_PRESS_MS = 300

const route = useRoute()
const layerRef = ref(null)
const wholeRef = ref(null)
const isCut = ref(false)
const label = ref('探索更多')

// M-30：磁吸（`.hover_button`）也在这个全局层里绑定，页面只需加类名。
const { attach: attachMagnetic } = useMagnetic(() => document)

const point = { x: 0, y: 0 }
const target = { x: 0, y: 0 }
let downAt = 0
let rafId = 0
let lastFrame = 0
let desktop = false
let bound = false

function isDesktop () {
  return window.innerWidth >= DESKTOP_MIN_WIDTH
}

function onMouseMove (event) {
  target.x = event.clientX
  target.y = event.clientY
}

function spawnRipple () {
  const whole = wholeRef.value
  if (!whole) return
  const bor = document.createElement('span')
  bor.className = 'bor'
  whole.appendChild(bor)
  window.setTimeout(() => bor.classList.add('on'), 10)
  window.setTimeout(() => bor.classList.add('hide'), 250)
  window.setTimeout(() => bor.remove(), 300)
}

function onMouseDown () {
  downAt = Date.now()
  if (wholeRef.value) wholeRef.value.classList.add('on')
  spawnRipple()
}

function onMouseUp () {
  if (wholeRef.value) wholeRef.value.classList.remove('on')
  if (Date.now() - downAt > LONG_PRESS_MS) spawnRipple()
}

/** 事件委托：页面是懒加载的，按 closest 判断比逐个元素绑定稳。 */
function onPointerOver (event) {
  const hit = event.target instanceof Element ? event.target.closest(CUT_SELECTOR) : null
  if (hit) isCut.value = true
}

function onPointerOut (event) {
  const hit = event.target instanceof Element ? event.target.closest(CUT_SELECTOR) : null
  if (!hit) return
  const to = event.relatedTarget instanceof Element ? event.relatedTarget.closest(CUT_SELECTOR) : null
  if (to !== hit) isCut.value = false
}

function bind () {
  if (bound) return
  bound = true
  document.addEventListener('mousemove', onMouseMove, { passive: true })
  document.addEventListener('mousedown', onMouseDown)
  document.addEventListener('mouseup', onMouseUp)
  document.addEventListener('mouseover', onPointerOver, { passive: true })
  document.addEventListener('mouseout', onPointerOut, { passive: true })
}

function unbind () {
  if (!bound) return
  bound = false
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mousedown', onMouseDown)
  document.removeEventListener('mouseup', onMouseUp)
  document.removeEventListener('mouseover', onPointerOver)
  document.removeEventListener('mouseout', onPointerOut)
}

function paint () {
  if (!layerRef.value) return
  layerRef.value.style.transform =
    'translate(-50%, -50%) translate(' + point.x.toFixed(2) + 'px, ' + point.y.toFixed(2) + 'px)'
}

/** M-27 主循环：`e = 1 - speed^deltaRatio`，deltaRatio 以 60fps 为 1。 */
function frame (now) {
  const dt = lastFrame ? Math.min(now - lastFrame, MAX_FRAME_MS) : 1000 / 60
  lastFrame = now
  const e = 1 - Math.pow(FOLLOW_SPEED, dt / (1000 / 60))
  point.x += (target.x - point.x) * e
  point.y += (target.y - point.y) * e
  paint()
  rafId = window.requestAnimationFrame(frame)
}

function start () {
  if (rafId) return
  point.x = window.innerWidth / 2
  point.y = window.innerHeight / 2
  target.x = point.x
  target.y = point.y
  paint()
  lastFrame = 0
  rafId = window.requestAnimationFrame(frame)
}

function stop () {
  if (rafId) window.cancelAnimationFrame(rafId)
  rafId = 0
}

function syncViewport () {
  const want = isDesktop()
  if (want === desktop) return
  desktop = want
  if (desktop) {
    start()
    bind()
    attachMagnetic()
  } else {
    stop()
    unbind()
    isCut.value = false
  }
}

onMounted(() => {
  label.value = route.path.startsWith('/en') ? 'Explore' : '探索更多'
  desktop = isDesktop()
  if (!desktop) return
  start()
  bind()
  attachMagnetic()
  window.addEventListener('resize', syncViewport)
})

// 路由切换后重新绑定磁吸元素，并跟随语言切换光标文案。
watch(() => route.fullPath, () => {
  label.value = route.path.startsWith('/en') ? 'Explore' : '探索更多'
  if (desktop) attachMagnetic()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', syncViewport)
  stop()
  unbind()
})
</script>

<!-- 非 scoped：这是全局光标层，必须作用于页面本身的元素（不是本组件内部）。 -->
<style>
.fixed_cursor {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  pointer-events: none;
  mix-blend-mode: exclusion;
}

/* M-29 简化：蓝盘不能被 exclusion 反相，`.cut` 时切回 normal。 */
.fixed_cursor.cut { mix-blend-mode: normal; }

.cursor {
  position: relative;
  width: 20px;
  height: 20px;
  opacity: 0;
  transition: opacity 0.3s;
}

body:hover .cursor { opacity: 1; }

/* M-28：本体 20×20；::after 白点、::before 120% 圆环 */
.whole {
  position: relative;
  width: 20px;
  height: 20px;
  transition: 0.3s;
}

.whole::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: #fff;
  transition: all 0.25s ease-out;
}

.whole::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  width: 120%;
  height: 120%;
  border: 1px solid #ece9e8;
  border-radius: 50%;
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.5);
  transition: all 0.3s;
}

.whole.on::after { transform: scale(0.5); }
.whole.on::before { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }

/* M-28：点击扩散环（200% 圆环，ease .5s） */
.bor {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 200%;
  height: 200%;
  border: 1px solid #ece9e8;
  border-radius: 50%;
  opacity: 0.3;
  transform: translate(-50%, -50%) scale(0.2);
  transition: ease 0.5s;
}

.bor.on { transform: translate(-50%, -50%) scale(1); }
.bor.hide { opacity: 0; }

/* M-29：蓝盘（用户验收尺寸 114px，蓝色 #184DC4 + blur(10px) + scale(1.1)） */
.content_pro {
  position: absolute;
  left: 50%;
  top: 50%;
  display: grid;
  place-items: center;
  width: 114px;
  height: 114px;
  border-radius: 50%;
  opacity: 0;
  transform: translate(-50%, -50%) scale(0);
  transition: ease 0.3s;
}

.content_pro::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: 50%;
  background: #184dc4;
  filter: blur(10px);
  transform: scale(1.1);
}

.cut .whole { opacity: 0; transform: scale(0); }
.cut .content_pro { opacity: 1; transform: translate(-50%, -50%) scale(1); }

.content_pro .cir {
  position: absolute;
  inset: 0;
  border: 1px dashed rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  animation: cursor-ants 10s linear infinite;
}

.content_pro .text {
  display: grid;
  place-items: center;
  gap: 2px;
  color: #fff;
  font-size: 13px;
  letter-spacing: 0.08em;
  white-space: nowrap;
}

.content_pro .text p { margin: 0; }

.content_pro .arrow {
  display: inline-block;
  animation: cursor-arrow-run 5s infinite;
}

@keyframes cursor-ants {
  to { transform: rotate(360deg); }
}

/* SPEC M-29 / M-31：0%、14% 归位，7% 跑出右上，7.1% 从左下进来 */
@keyframes cursor-arrow-run {
  0%, 14% { transform: translate3d(0, 0, 0); opacity: 1; }
  7% { transform: translate3d(150%, -150%, 0); opacity: 0; }
  7.1% { transform: translate3d(-150%, 150%, 0); opacity: 0; }
}

/* M-27：≤1024px 整层隐藏 */
@media (max-width: 1024px) {
  .fixed_cursor { display: none; }
}
</style>
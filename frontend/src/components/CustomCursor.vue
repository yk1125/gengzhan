<template>
  <div class="fixed_cursor" :class="{ cut: isCut, hidden: isDetailRoute }" aria-hidden="true">
    <div ref="cursorRef" class="cursor">
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
 * M-27 按 SPEC 字面用 gsap 驱动（参考站 `sources/function.js:4757-4785` `MouseFollow()`）：
 *   `gsap.set(el, { xPercent: -50, yPercent: -50 })`
 *   `setX = gsap.quickSetter(el, 'x', 'px')` / `setY = gsap.quickSetter(el, 'y', 'px')`
 *   `gsap.ticker.add(() => { const e = 1 - Math.pow(speed, gsap.ticker.deltaRatio()); r.x += (o.x - r.x) * e; ... })`
 * 系数来自 `.cursor` 的 `data-speed`：`8` → 0.8（缺失 → 0.9）；初始位置 = 视口中心。
 * ≤1024px 整层 `display: none`，既不注册监听也不启动 ticker（`stop()` 里 `gsap.ticker.remove`）。
 * 切标签页回来的跳变由 gsap 自带的 lagSmoothing 处理，不再需要自建的单帧上限。
 *
 * M-28 参考站该段本身就是 DOM + `setTimeout`（无 gsap），故这里照旧不引入 gsap：
 * `mousedown` → `.whole` 加 `.on` 并生成 `.bor`；+10ms 加 `.on`、+250ms 加 `.hide`、再 +300ms `remove()`；
 * `mouseup` 移除 `.on`，按住 > 300ms 再补一次。
 *
 * M-29 悬停 `.public_hover .item .img` / `.public_hover .card-img` / `.item_hover` 时整层加 `.cut`，
 * `.whole` 缩到 0、蓝盘 `#184DC4`（`filter: blur(10px)` + `scale(1.1)`）展开，`transition: ease .3s`。
 *
 * 与参考站的两处有意差异（登记在 handoffs/B.md §9.4 / §9.9）：
 * 1. 参考站是两层：`.fixed_cursor`（`mix-blend-mode: exclusion`，只放 `.whole`）与
 *    `.fixed_cursor.fixed_cursor2`（`mix-blend-mode: unset`，只放 `.content_pro`）。这里合成一层，
 *    在 `.cut` 时把 blend 切回 `normal`，避免蓝盘被反相。两层共享同一组 lerp 状态、位移逐帧一致，
 *    单层在视觉上等价；也因此不加参考站外层那句 `transition: .6s`（单层下切 blend 会被补间）。
 * 2. 蓝盘尺寸保留用户验收的 114px。参考站蓝底实为 `.fixed_cursor2 .cursor` 的 134px，
 *    其中 `cir.png` 环才是 114px（`sources/style.css:1133-1175`、`1228-1235`），差异已登记待用户裁决。
 */
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import gsap from 'gsap'
import { useMagnetic } from '@/composables/useMagnetic'

/** 参考站断点：≤1024px 整层 display:none。 */
const DESKTOP_MIN_WIDTH = 1025
/** M-27 系数：`data-speed` 缺省 0.9，首页是 8 → 0.8。 */
const FOLLOW_SPEED = 0.8
/** M-29 触发选择器（`public_hover` 由页面挂在容器上）。 */
const CUT_SELECTOR = '.public_hover .item .img, .public_hover .card-img, .item_hover, [data-cursor-cut]'
/** M-28 按住多久算长按（再补一次波纹）。 */
const LONG_PRESS_MS = 300

const route = useRoute()
const cursorRef = ref(null)
const wholeRef = ref(null)
const isCut = ref(false)
const label = ref('探索更多')
const isDetailRoute = ref(false)

// M-30：磁吸（`.hover_button`）也挂在这个全局层上，页面只需加类名。
const { attach: attachMagnetic } = useMagnetic(() => document)

/** M-27 已收敛到的位置（指数逼近的当前值）。 */
const point = { x: 0, y: 0 }
/** M-27 鼠标原始坐标；`mousemove` 只写这里。 */
const target = { x: 0, y: 0 }

/** gsap.quickSetter 得到的两个 setter（`x` / `y`，单位 px）。 */
let setX = null
let setY = null
/** gsap.ticker 回调句柄，用于 `remove`。 */
let tick = null
let downAt = 0
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

/** M-27 启动：设初始位置、建 setter、把逐帧逼近挂到 gsap.ticker。 */
function start () {
  const el = cursorRef.value
  if (!el || tick) return
  gsap.set(el, { xPercent: -50, yPercent: -50 })
  setX = gsap.quickSetter(el, 'x', 'px')
  setY = gsap.quickSetter(el, 'y', 'px')
  point.x = window.innerWidth / 2
  point.y = window.innerHeight / 2
  target.x = point.x
  target.y = point.y
  setX(point.x)
  setY(point.y)
  tick = () => {
    const e = 1 - Math.pow(FOLLOW_SPEED, gsap.ticker.deltaRatio())
    point.x += (target.x - point.x) * e
    point.y += (target.y - point.y) * e
    setX(point.x)
    setY(point.y)
  }
  gsap.ticker.add(tick)
}

function stop () {
  if (!tick) return
  gsap.ticker.remove(tick)
  tick = null
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
  isDetailRoute.value = /^\/(en\/)?(cases|news)\/[^/]+$/.test(route.path)
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
  isDetailRoute.value = /^\/(en\/)?(cases|news)\/[^/]+$/.test(route.path)
  isCut.value = false
  wholeRef.value?.classList.remove('on')
  wholeRef.value?.querySelectorAll('.bor').forEach(node => node.remove())
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
.fixed_cursor.hidden { opacity: 0 !important; visibility: hidden; }

/* M-27：位移由 gsap 写在 `.cursor` 上（等同参考站 quickSetter 的落点）。 */
.cursor {
  position: relative;
  width: 20px;
  height: 20px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
}

body:hover .cursor { opacity: 1; }

/* M-28：本体 20×20；::after 白点、::before 120% 圆环 */
.whole {
  position: relative;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
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
  transform: translate(-50%, -50%) scale(0);
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
  z-index: 1;
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

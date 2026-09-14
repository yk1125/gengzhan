/**
 * SPEC M-01：全局滚动惯性（B.md §9.20 A4 交给 A 的那一项）。
 *
 * 参考站规格（`evidence/reference-effects/SPEC.md` M-01，证据 `sources/function.js:1475`、
 * `:5-8`、`:4290-4291`）：smooth-scrollbar，桌面 `clientWidth > 1024` 才启用、
 * `damping = 0.08`、逐帧指数衰减 `momentum *= (1 - damping)`、`|momentum| ≤ 0.1` 归零、
 * 总行程 Σ = 初始 momentum；≤1024 直接 `destroyAll()` 回原生滚动。
 *
 * 本项目用已经 pin 好的 `lenis@1.3.26` 承载同一条规格：
 * - `lerp: 0.08` —— lenis 的 lerp 分支就是 `value = damp(value, to, lerp * 60, deltaTime)`
 *   （`node_modules/lenis/dist/lenis.mjs:86`），即「每帧衰减 `1 - lerp`」，与
 *   `momentum *= 1 - damping` 同一条指数衰减。用 lerp 而不用 duration + easing，
 *   就是为了不把它换成一条人造缓动曲线。
 * - 归零阈值：参考站是 `|momentum| ≤ 0.1`，lenis 是「四舍五入到同一像素即停」
 *   （`dist/lenis.mjs:87` 的 `Math.round` 比较，等价 ≲0.5px）。**有意偏离**：停得早小半帧，
 *   肉眼无差；换来的是不自建 rAF 循环，也就不和 gsap ticker / 页面自己的 rAF 抢帧。
 * - 移动端（`clientWidth ≤ 1024`）不创建实例，回原生滚动、无惯性 —— 与 SPEC 的降级一致。
 * - 不开 `virtualScroll`（默认 false）：lenis 用 `window.scrollTo` 每帧推进**真实**
 *   scrollTop（`dist/lenis.mjs:532 setScroll`），所以 `window.scrollY` 与 `scroll` 事件
 *   仍是唯一真源。这条是本文件存在的全部意义：B 的接口要求只有一句「每帧拿到一个
 *   scrollTop」，据此定下下面 5 条口径，页面代码一行都不用改。
 *
 * 定下的口径（写进 `specs/FRONTEND.md` §7）：
 * 1. M-04（`.on`）/ M-05（`.hide`）继续挂在 `window` 的 `scroll` / `wheel` 上，**不**改挂
 *    lenis 的 `scroll` 事件。
 * 2. `views/Home/useHomeScroll.js` 的 `[data-view]` / `[data-aos]` 触发点同样不改挂 ——
 *    它读的就是真实 `window.scrollY`，逐帧形态没变。
 * 3. `.studio-float` 的「返回顶部」在 lenis 可用时走 `lenis.scrollTo(0, { duration: 1.2 })`，
 *    对齐 SPEC M-32 的 `scrollbar.scrollTo(0, 0, 1200)`。
 * 4. 其它原生 `window.scrollTo({ behavior: 'smooth' })` 在空闲态由 lenis 的
 *    `onNativeScroll` 自动重同步（`dist/lenis.mjs` 的 `onNativeScroll`），不必逐处改。
 * 5. 路由切换时 `router` 的 `scrollBehavior` 会瞬时改 scrollTop；若此刻 lenis 还停在上一页的
 *    惯性里，两边会互相打架（惯性目标会把人拉回去）。所以 `router.afterEach` 里
 *    `reset()`：停惯性 + 重新对齐，且不主动写 scrollTop（避免和 scrollBehavior 抢）。
 */
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

/** SPEC M-01：`all_mobile = 1024`，只有 `clientWidth > 1024` 才启用惯性。 */
export const SMOOTH_SCROLL_MIN_WIDTH = 1025
/** SPEC M-01：桌面 `damp = 0.08`（移动端 0.25，本项目移动端直接回原生滚动，用不到）。 */
export const SMOOTH_SCROLL_DAMPING = 0.08
/** SPEC M-32：`.item.ClickTop` 回顶 `scrollTo(0, 0, 1200)` → 1.2s。 */
export const BACK_TO_TOP_DURATION = 1.2

/** 当前实例。没有实例（移动端 / 降级 / 未挂载）时是 null，调用方回退原生滚动。 */
let current = null

/** 取当前 lenis 实例；没有就返回 null。 */
export function getSmoothScroll () {
  return current
}

/** 回顶：有惯性实例走它（1200ms 与 SPEC M-32 一致），否则回退原生平滑滚动。 */
export function scrollToTop () {
  if (current) {
    current.scrollTo(0, { duration: BACK_TO_TOP_DURATION })
    return
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export function useSmoothScroll () {
  const router = useRouter()
  /** @type {import('vue').Ref<Lenis|null>} */
  const lenis = ref(null)

  function shouldEnable () {
    if (typeof window === 'undefined') return false
    if (document.documentElement.clientWidth < SMOOTH_SCROLL_MIN_WIDTH) return false
    // 降级策略与全局一致：`prefers-reduced-motion: reduce` 不做滚动惯性。
    // （lenis 自己的 `respectReducedMotion` 也会把 lerp 压成 1，这里直接不创建更干净。）
    return !(typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }

  function enable () {
    if (lenis.value || !shouldEnable()) return
    lenis.value = new Lenis({
      // SPEC M-01 的 damping 0.08（逐帧指数衰减，见文件头注释）。
      lerp: SMOOTH_SCROLL_DAMPING,
      // 自己不做 rAF 循环，交给 lenis 自带的（与 gsap ticker 各跑各的，互不抢帧）。
      autoRaf: true,
      // 表头导航项是站内链接；交给 vue-router 处理，lenis 不接管锚点。
      anchors: false
    })
    current = lenis.value
  }

  function disable () {
    if (!lenis.value) return
    lenis.value.destroy()
    lenis.value = null
    current = null
  }

  /** 跨到 1024 两侧时按 SPEC 的降级口径切换（`> 1024` 启用，否则销毁）。 */
  function sync () {
    if (shouldEnable()) enable()
    else disable()
  }

  const stopAfterEach = router.afterEach(() => {
    // 口径 5：停掉上一页留下的惯性并重新对齐到真实位置。
    lenis.value?.reset()
  })

  onMounted(() => {
    sync()
    window.addEventListener('resize', sync)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', sync)
    stopAfterEach()
    disable()
  })

  return { lenis, sync }
}

export default useSmoothScroll
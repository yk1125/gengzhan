/**
 * SPEC M-30：`.hover_button` 磁吸（参考站 `moveMagnet()`）。
 *
 * 公式照抄参考站（`sources/function.js:4341-4367`）：
 *   x = ((clientX - rect.left) / offsetWidth - 0.5) * strength
 *   y = ((clientY - rect.top) / offsetHeight - 0.5) * strength
 * 参考站唯一实例是 `footer .circle.hover_button`，没有 `data-speed` → strength = 50；
 * 动画是 `TweenMax.to(el, 1, { x, y, ease: Power4.easeOut })`，`mouseout` 回 0,0 同一缓动。
 *
 * 实测参考值（`captures/magnetic-verify.json`）：把光标推到相对中心偏移 0.5 时，
 * t+150ms ≈ 11.41px、t+500ms ≈ 19.29px、t+1200ms ≈ 19.96px（理论极值 25px）；
 * 反向 `translate(-20.1351px,-20.1648px)`；`mouseout` 后 t+1500ms 回到 `translate(0px,0px)`。
 *
 * 与参考站的唯一差异：参考站用 gsap 的 `TweenMax`；本项目 `node_modules` 里 **gsap/lenis 未安装**
 * （package.json 与 package-lock.json 已登记该依赖，属环境缺口，见 handoffs/B.md §9.8），
 * 所以这里用等价的 1s rAF 补间 + `Power4.easeOut(t) = 1 - (1-t)^5`（GSAP Power4 是 quintic），
 * 不引入依赖、也不动 A 的 package/lock。
 */
import { onBeforeUnmount } from 'vue'

/** SPEC M-30：无 `data-speed` 时的强度。 */
const DEFAULT_STRENGTH = 50
/** SPEC M-30：`TweenMax.to(el, 1, …)`。 */
const DURATION_MS = 1000

/** GSAP `Power4.easeOut`。 */
function easePower4Out (t) {
  return 1 - Math.pow(1 - t, 5)
}

export function useMagnetic (resolveRoot, selector = '.hover_button') {
  const states = new WeakMap()
  let elements = []

  function stateOf (el) {
    let state = states.get(el)
    if (!state) {
      state = { x: 0, y: 0, rafId: 0 }
      states.set(el, state)
    }
    return state
  }

  /** 从当前偏移补间到目标偏移（重新触发时从当前位置接着走，等同 gsap 的覆盖行为）。 */
  function tween (el, toX, toY) {
    const state = stateOf(el)
    if (state.rafId) cancelAnimationFrame(state.rafId)
    const fromX = state.x
    const fromY = state.y
    const startedAt = performance.now()
    const step = (now) => {
      const progress = Math.min(1, (now - startedAt) / DURATION_MS)
      const k = easePower4Out(progress)
      state.x = fromX + (toX - fromX) * k
      state.y = fromY + (toY - fromY) * k
      el.style.transform = 'translate(' + state.x.toFixed(2) + 'px, ' + state.y.toFixed(2) + 'px)'
      state.rafId = progress < 1 ? requestAnimationFrame(step) : 0
    }
    state.rafId = requestAnimationFrame(step)
  }

  function onMove (event) {
    const el = event.currentTarget
    const rect = el.getBoundingClientRect()
    const strength = Number(el.dataset.magneticStrength) || DEFAULT_STRENGTH
    tween(
      el,
      ((event.clientX - rect.left) / el.offsetWidth - 0.5) * strength,
      ((event.clientY - rect.top) / el.offsetHeight - 0.5) * strength
    )
  }

  function onOut (event) {
    tween(event.currentTarget, 0, 0)
  }

  function detach () {
    elements.forEach((el) => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseout', onOut)
      const state = states.get(el)
      if (state) {
        if (state.rafId) cancelAnimationFrame(state.rafId)
        state.x = 0
        state.y = 0
        state.rafId = 0
      }
      el.style.transform = ''
    })
    elements = []
  }

  /** 每次路由切换后重新绑定（页面是懒加载的，元素会换）。 */
  function attach () {
    detach()
    const root = (typeof resolveRoot === 'function' ? resolveRoot() : resolveRoot) || document
    elements = Array.from(root.querySelectorAll(selector))
    elements.forEach((el) => {
      el.addEventListener('mousemove', onMove)
      el.addEventListener('mouseout', onOut)
    })
    return elements.length
  }

  onBeforeUnmount(detach)

  return { attach, detach }
}
/**
 * SPEC M-30：`.hover_button` 磁吸（参考站 `moveMagnet()`，`sources/function.js:4341-4367`）。
 *
 * 公式与动画照抄参考站：
 *   x = ((clientX - rect.left) / offsetWidth - 0.5) * strength
 *   y = ((clientY - rect.top) / offsetHeight - 0.5) * strength
 *   `TweenMax.to(el, 1, { x, y, ease: Power4.easeOut })`，`mouseout` 以同一缓动回 `0, 0`
 *   → 本项目用 gsap 3 的 `gsap.to(el, { duration: 1, ease: 'power4.out' })` 等价表达。
 * 参考站唯一实例是 `footer .circle.hover_button`，没有 `data-speed` → strength = 50。
 * （参考站那段 for 循环把 `strength2` 写在循环外，实际是「最后一个元素的 data-speed 通吃」；
 *  这里按元素各自读取，单实例下结果相同。）
 *
 * 实测参考值（`frames/capture-cursor.json` / `captures/magnetic-verify.json`）：把光标推到
 * 相对中心偏移 0.5 时，t+150ms ≈ 11.41px、t+500ms ≈ 19.29px、t+1200ms ≈ 19.96px
 * （理论极值 25px）；反向 `translate(-20.1351px,-20.1648px)`；`mouseout` 后 t+1500ms 回 `translate(0px,0px)`。
 *
 * 必须摘掉元素自身的 CSS `transform` 过渡，否则 gsap 写不进去（B.md §9.10）：
 * 参考站那个 `.circle.hover_button` 是 `<div>`，自身没有 `transition`；本项目全局
 * `style.css:917-921` 给 `a, button, .el-button, [role="button"], .clickable` 都加了
 * `transition: all .3s cubic-bezier(...)`，而首页的磁吸实例恰恰是个 `<a class="pill hover_button">`。
 * 两者抢同一个 `transform` 时过渡会每帧重新计时，把位移拖成「先停滞、后追赶」——实测
 * t+306ms 时 gsap 的 inline 已写到 `translate3d(19.75px, 19.05px, 0)`，屏幕上的 computed
 * 只有 `matrix(1,0,0,1,1.14,1.1)`。绑定期间把 `transition-property` 置为 `none`
 * （inline，不依赖选择器、也不吃类的优先级），解绑时还原元素原本的 inline 值。
 */
import { onBeforeUnmount } from 'vue'
import gsap from 'gsap'

/** SPEC M-30：无 `data-speed` 时的强度。 */
const DEFAULT_STRENGTH = 50
/** SPEC M-30：`TweenMax.to(el, 1, …)` → 1 s。 */
const DURATION = 1
/** SPEC M-30：`Power4.easeOut` → gsap 3 的 `power4.out`。 */
const EASE = 'power4.out'

export function useMagnetic (resolveRoot, selector = '.hover_button') {
  /** @type {{ el: Element, prevTransitionProperty: string }[]} */
  let bound = []

  function onMove (event) {
    const el = event.currentTarget
    const rect = el.getBoundingClientRect()
    const strength = Number(el.dataset.speed) || DEFAULT_STRENGTH
    gsap.to(el, {
      duration: DURATION,
      x: ((event.clientX - rect.left) / el.offsetWidth - 0.5) * strength,
      y: ((event.clientY - rect.top) / el.offsetHeight - 0.5) * strength,
      ease: EASE
    })
  }

  function onOut (event) {
    gsap.to(event.currentTarget, { duration: DURATION, x: 0, y: 0, ease: EASE })
  }

  function detach () {
    bound.forEach(({ el, prevTransitionProperty }) => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseout', onOut)
      gsap.killTweensOf(el)
      gsap.set(el, { clearProps: 'transform' })
      el.style.transitionProperty = prevTransitionProperty
    })
    bound = []
  }

  /** 每次路由切换后重新绑定（页面是懒加载的，元素会换）。 */
  function attach () {
    detach()
    const root = (typeof resolveRoot === 'function' ? resolveRoot() : resolveRoot) || document
    bound = Array.from(root.querySelectorAll(selector)).map((el) => {
      const prevTransitionProperty = el.style.transitionProperty
      el.style.transitionProperty = 'none'
      el.addEventListener('mousemove', onMove)
      el.addEventListener('mouseout', onOut)
      return { el, prevTransitionProperty }
    })
    return bound.length
  }

  onBeforeUnmount(detach)

  return { attach, detach }
}
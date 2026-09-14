/**
 * JS 驱动的 transform 守卫（B.md §9.14 申请 2）。
 *
 * 为什么需要：全局那份可点击元素过渡（`style.css` 的 `--ui-transition`）已经不含
 * `transform`，但元素**自身**的规则仍可能声明 `transition: transform …`。凡是由
 * gsap / rAF **逐帧**写 `transform` 的元素（磁吸、自定义光标、滚动惯性、将来 C/D 的
 * 动效），只要同时还有 CSS transform 过渡，浏览器就会每帧对同一属性重新计时，位移被
 * 拖成「先停滞、后追赶」——动画写完 0.3s 之后屏幕上的位移才走完（逐帧实测见
 * handoffs/B.md §9.10）。
 *
 * 用法（命令式，可在 setup 内外调用）：
 *   const release = useJsTransformGuard(el, true)   // 进入：inline transition-property 置 none
 *   release()                                       // 退出：还原进入前的 inline 值
 *
 * `el`：Element / `Ref<Element>` / 返回元素的函数（空值安全）。
 * `on`：布尔 / `Ref<boolean>` / 返回布尔的函数；`false` 表示还原而不守卫。
 *
 * 幂等性：同一元素被守卫多次时只有第一次记录原始 inline 值，后续是叠加；`release()`
 * 只有真正持有守卫的那一次会还原，避免把 `none` 当成原始值写回去（磁吸在每次路由
 * 切换后都会 re-attach，这是必须的）。
 */

/** 元素 → 进入守卫前的 inline `transition-property` 原值。 */
const original = new WeakMap()

function resolveValue (input) {
  if (typeof input === 'function') return input()
  if (input && typeof input === 'object' && 'value' in input) return input.value
  return input
}

export function useJsTransformGuard (el, on = true) {
  const target = resolveValue(el)
  if (!target || typeof target.style === 'undefined') return () => {}

  if (!resolveValue(on)) {
    return () => {}
  }

  if (!original.has(target)) {
    original.set(target, target.style.transitionProperty)
  }
  target.style.transitionProperty = 'none'

  let released = false
  return () => {
    if (released) return
    released = true
    if (!original.has(target)) return
    target.style.transitionProperty = original.get(target)
    original.delete(target)
  }
}

export default useJsTransformGuard

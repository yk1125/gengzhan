/**
 * 动效 token 骨架（归属 Session A）
 *
 * 状态：字段已建好，数值全部是 `MOTION_TODO`。数值由 T00R 的动效 SPEC.md 定稿后填入，
 * 在拿到 SPEC.md 之前不要在项目里编造具体数值，也不要在页面里临时写裸数值绕过这里。
 *
 * 约定：
 * - 只用语义名（duration/ease/distance）引用，页面与组件不直接写 `0.8s`、`cubic-bezier(...)`、`40px`。
 * - 需要给 CSS 使用时，由本文件映射成 CSS 自定义属性（T00R 定稿时一并落地到 styles 层）。
 * - 值还是 `MOTION_TODO` 时，表示「尚未定稿」而不是「无动画」；`prefers-reduced-motion` 的降级策略另行定义。
 * - 引入 gsap + lenis 的原因、版本与影响范围见 specs/FRONTEND.md §1 第 10 行条目。
 */

export const MOTION_TODO = 'TODO'

export const motion = {
  /** 时长档位；单位与写法（ms 还是 s、CSS 还是 gsap 时间轴）随 SPEC.md 定稿 */
  duration: {
    instant: MOTION_TODO,   // 微反馈：hover、按钮按压、焦点提示
    fast: MOTION_TODO,      // 小范围位移、遮罩收起、菜单开合
    base: MOTION_TODO,      // 常规入场、卡片显影
    slow: MOTION_TODO,      // 首屏标题、整屏转场
    scroll: MOTION_TODO     // 滚动驱动（lenis + gsap）进度的时间尺度
  },

  /** 缓动曲线；具体是 cubic-bezier、关键字还是 gsap ease 字符串随 SPEC.md 定稿 */
  ease: {
    standard: MOTION_TODO,  // 默认过渡
    enter: MOTION_TODO,     // 入场
    exit: MOTION_TODO,      // 离场
    inOut: MOTION_TODO,     // 需要往返对称的位移
    scroll: MOTION_TODO     // 滚动联动
  },

  /** 位移与缩放幅度；单位随 SPEC.md 定稿（px / rem / vh / 百分比） */
  distance: {
    reveal: MOTION_TODO,    // 常规显影位移
    hero: MOTION_TODO,      // 首屏大位移
    micro: MOTION_TODO,     // hover/按压级位移
    scaleIn: MOTION_TODO,   // 缩放入场
    maskOverflow: MOTION_TODO // clip-path/遮罩溢出量
  }
}

/** 判断某个动效 token 是否已定稿，供后续 check 脚本或运行时守卫使用。 */
export function isMotionTokenReady (value) {
  return value !== MOTION_TODO
}

export default motion

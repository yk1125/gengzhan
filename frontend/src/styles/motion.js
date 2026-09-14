/**
 * 动效 token 骨架（归属 Session A）
 *
 * 状态：SPEC 已有明确条目的字段已填入；没有直接对应条目的字段保持 `MOTION_TODO`。
 * 数值来源全部标注 T00R `docs/frontend-rebuild/evidence/reference-effects/SPEC.md`。
 *
 * 约定：
 * - 只用语义名（duration/ease/distance）引用，页面与组件不直接写 `0.8s`、`cubic-bezier(...)`、`40px`。
 * - 需要给 CSS 使用时，由本文件映射成 CSS 自定义属性（T00R 定稿时一并落地到 styles 层）。
 * - 值还是 `MOTION_TODO` 时，表示「尚未定稿」而不是「无动画」；`prefers-reduced-motion` 的降级策略另行定义。
 * - 引入 gsap + lenis 的原因、版本与影响范围见 specs/FRONTEND.md §1 第 10 行条目。
 */

export const MOTION_TODO = 'TODO'

export const motion = {
  /** 时长档位；单位：秒。来源见各字段注释。 */
  duration: {
    instant: MOTION_TODO,   // 微反馈：SPEC 未提供单一对应值，保持未定稿
    fast: 0.6,              // M-04 / M-05 / M-06 / M-14 指示条 / M-15 / M-32
    base: 1,                // M-03 / M-10 / M-30 / M-34
    slow: 2,                // M-25 / M-26（首屏标题与整屏转场级）
    scroll: 1.83            // M-01：60Hz 屏等效 ≈1.83s 收敛
  },

  /** 缓动曲线；统一为 CSS 关键字或 gsap 字符串。 */
  ease: {
    standard: 'ease',       // M-03 / M-04 / M-05 / M-06 / M-10 / M-14 / M-15 等
    enter: 'ease',          // M-03 / M-10 / M-14 / M-15
    exit: MOTION_TODO,      // SPEC 无直接对应条目
    inOut: MOTION_TODO,     // SPEC 无直接对应条目（用户确认暂不臆造）
    scroll: 'linear'        // M-08 / M-12 / M-13 / M-20—M-23 逐帧线性
  },

  /** 位移与缩放幅度；单位随字段语义而定（px / %）。 */
  distance: {
    reveal: 50,             // M-24 fade-top 实际位移（px）
    hero: -100,             // M-03 / M-05 页头整段移出（%）
    micro: MOTION_TODO,     // SPEC 无直接对应条目
    scaleIn: MOTION_TODO,   // SPEC 无直接对应条目
    maskOverflow: 100       // M-13 clip-path 起始 `inset(0 100% 0 0)`（%）
  }
}

/** 判断某个动效 token 是否已定稿，供后续 check 脚本或运行时守卫使用。 */
export function isMotionTokenReady (value) {
  return value !== MOTION_TODO
}

export default motion

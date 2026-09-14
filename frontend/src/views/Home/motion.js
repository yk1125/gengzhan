/**
 * 首页动效数值（归属 Session B · 仅供 `views/Home` 使用）
 *
 * 每条数值逐字来自 T00R 取证规格
 * `docs/frontend-rebuild/evidence/reference-effects/SPEC.md`（下称 SPEC），注释里标出条目号，
 * 便于逐条对照。页面与样式只引用这里的语义名，不在模板/CSS 里散写时长、曲线与位移。
 *
 * 与共享 token 的关系（已写入 handoffs/B.md 的契约变更申请）：
 * 共享 token 文件 `src/styles/motion.js`（归属 Session A）当前字段值仍是 `MOTION_TODO`，
 * 数值定稿前页面无法引用。本文件是本页面临时落地：字段名刻意与共享 token 的三组
 * （duration / ease / distance）保持同名，A 把 SPEC 数值填入共享 token 后，本文件可整份删除。
 *
 * 参考站依赖真实素材尺寸的派生值（`.index4 .bg` 位移上限、各 section 锚点等）一律在运行时
 * 由真实 DOM 计算，不照抄 SPEC 附录里的绝对值（GAPS「换素材后派生值必须重算」）。
 */

/** 参考站断点：> 1024px 为桌面（SPEC 附「断点速查」）。 */
export const DESKTOP_MIN_WIDTH = 1025

/** SPEC M-07 / M-08 / M-10：首屏 banner。 */
export const banner = {
  /** M-07 `new Swiper('.banner .swiper', { speed:1000, effect:'fade', allowTouchMove:false })` */
  slideSpeedMs: 1000,
  /** M-07 初始 `autoplay.delay` */
  autoplayDelayMs: 4000,
  /** M-07 `realIndex > 0` 时改写为 3000ms */
  autoplayDelayAfterFirstMs: 3000,
  /** M-07 slideChange 后重置 currentTime 的等待 */
  resetCurrentTimeMs: 500,
  /** M-08 `speed = scrollTop * 0.9` */
  parallaxFactor: 0.9,
  /** M-10 每字延迟 `index * 0.08 + 0.3` 秒 */
  charStaggerS: 0.08,
  charBaseDelayS: 0.3,
  /** M-10 `.each_animate div { transition: 1s }` */
  charDurationS: 1,
  /** M-10 起始位移 `translateX(10px)`、空格 `min-width: 10px` */
  charOffsetPx: 10,
  charSpaceMinWidthPx: 10
}

/** SPEC M-11：客户墙纵向轮播（12 个独立实例的参数，实测 12 例一致）。 */
export const wall = {
  speedMs: 800,
  autoplayDelayMs: 3500,
  direction: 'vertical',
  loop: true,
  allowTouchMove: false
}

/**
 * SPEC M-24 通用入场（`.aos-animate`）。
 * 参考站阈值 `rect.top - clientHeight + all_num < 0`：桌面 all_num = 150，手机 = 0。
 */
export const reveal = {
  durationMs: 1500,
  ease: 'cubic-bezier(.175, .885, .32, 1.275)',
  offsetPx: { desktop: 150, mobile: 0 },
  /** M-24 变体位移（首页实际只用到 fade-top = 50px） */
  distance: { 'fade-top': 50, 'fade-top_': 150, 'fade-left': -50, 'fade-right': 50 },
  delayMs: { 100: 100, 200: 200 }
}

/** SPEC M-26：`.headline .line` 横线展开（父级 `.aos-animate` 触发）。 */
export const line = { durationMs: 2000, ease: 'ease' }

/** SPEC M-12：index2 双列视差系数（左列 −0.02、右列 +0.1）。 */
export const columns = { left: -0.02, right: 0.1 }

/** SPEC M-13：`.public_text` 逐行 clip-path 擦除。 */
export const publicText = {
  /** `dis = data-speed || 200` */
  distance: 200,
  /** `start = $(p_i).offset().top - clientHeight / 1.2` */
  viewportDivisor: 1.2
}

/** SPEC M-14 / M-15：index3 服务切换。 */
export const serviceSwitch = {
  /** M-14 `.move { transition: all 0.4s }`，尺寸 `width:800px; height:189px`（高度按本页实测 item 高度） */
  boxTransitionMs: 400,
  boxWidthPx: 800,
  boxBorder: '1px solid rgba(193, 192, 180, 0.97)',
  boxRadiusPx: 5,
  /** M-14 `:after` 左侧指示条 */
  indicator: { widthPx: 5, heightPx: 61, leftPx: -5, color: '#184DC4', shadow: '10px 0 17px 0 rgba(24, 77, 196, 0.8)', transitionMs: 600 },
  /** M-15 `.item { transition: .6s }` */
  itemTransitionMs: 600,
  /** 文字翻动：`translateY(-100%)` */
  textFlipPercent: -100
}

/**
 * SPEC M-18 — M-23：index4 品牌宣言整屏 scrub。
 * 动画参数是常量（照抄）；锚点与位移上限在运行时按真实 DOM 计算。
 */
export const statement = {
  /** M-18 `.index4` 内联高度 = clientHeight + 7000 */
  heightOffsetPx: 7000,
  /** M-19 `animation: 10s mask_ cubic-bezier(0.79, 0.06, 0.33, 0.94) forwards` + 暂停 + 负 delay 定位 */
  mask: { durationS: 10, ease: 'cubic-bezier(0.79, 0.06, 0.33, 0.94)', scaleStart: 1.05, scaleEnd: 300, scrubRangePx: 5000, scrubSeconds: 8 },
  /** M-20 `.bg` 位移：`y = (scrollTop - start) / (index4_h - clientHeight) * -px`，`px = bg.height - clientHeight` */
  bgFactor: -1,
  /** M-22 / M-23 两组文案的 `data-*`（照抄 home.html:2955-2966） */
  copyGroups: [
    { outer: { distance: 4000, animate: 1000, opacity: [1, 0] }, inner: { distance: 3000, animate: 1000, scale: [0.9, 1], opacity: [0, 1] } },
    { outer: { distance: 6000, animate: 1000, opacity: [1, 0] }, inner: { distance: 5000, animate: 1000, scale: [0.9, 1], opacity: [0, 1] } }
  ]
}

/** SPEC M-34：index5 手机横向 Swiper。 */
export const insights = { speedMs: 1000, spaceBetweenPx: 20, slidesPerView: 2, loop: true }

export const homeMotion = { banner, wall, reveal, line, columns, publicText, serviceSwitch, statement, insights }

export default homeMotion

/**
 * 首页滚动流水线（归属 Session B · 仅供 `views/Home` 使用）
 *
 * 实现 SPEC 里「滚动驱动」的那几条：M-08 首屏视差、M-12 双列位移、M-13 `.public_text` 擦除、
 * M-18—M-23 index4 整屏 scrub（含 `[data-view]` 插值引擎）、M-24 通用入场。
 * 每条公式与数值都来自 `./motion.js`（其注释标出 SPEC 条目号）。
 *
 * 与参考站的两处有意差异（都写在 handoffs/B.md 的对照表里）：
 * 1. 锚点用「布局位置」计算（offsetTop 链）并在 resize / 高度注入后重算，不做参考站的逐帧
 *    `$(el).offset()` 读取 —— 参考站因此有 GAPS G-05 记录的 50px 相位漂移与每帧抖动。
 * 2. `.index4` 的高度在挂载时即写入（参考站要等一次真实滚轮），避免初次加载的可滚动高度跳变。
 *
 * 生命周期：所有监听在 onBeforeUnmount 里注销；`prefers-reduced-motion: reduce` 时不做滚动驱动，
 * 只把内容显影到可见态（降级要求见 ACCEPTANCE AC07b）。
 */
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { DESKTOP_MIN_WIDTH, banner, columns, publicText, reveal, statement } from './motion'

/** 布局位置（不含 transform，offsetParent 链求和）。 */
function layoutTop (el) {
  let top = 0
  let node = el
  while (node) {
    top += node.offsetTop || 0
    node = node.offsetParent
  }
  return top
}

function lerp (from, to, t) {
  return from + (to - from) * t
}

/** M-23：单节点的 `[data-view]` 线性插值（本页只用到 opacity / scale / x / y）。 */
function applyDataView (el, scrollTop, sectionTop, sectionHeight, clientHeight) {
  const dataset = el.dataset
  const distance = Number(dataset.distance || 0)
  const animate = Number(dataset.animate || 0)
  const startDistance = sectionTop + distance

  let endValue = sectionHeight - clientHeight
  if (dataset.distanceEnd) {
    const vh = clientHeight / 10 * (Number(dataset.distanceEnd) / 10)
    endValue += vh
  }

  let t = 0
  if (animate > 0) {
    t = (scrollTop - startDistance) / animate
  } else {
    t = scrollTop >= startDistance ? 1 : 0
  }
  t = Math.min(1, Math.max(0, t))

  const scale = dataset.scale ? dataset.scale.split(',').map(Number) : [1, 1]
  const opacity = dataset.opacity ? dataset.opacity.split(',').map(Number) : null
  const x = dataset.x ? dataset.x.split(',').map(Number) : [0, 0]
  const y = dataset.y ? dataset.y.split(',').map(Number) : [0, 0]

  const parts = []
  if (x[0] !== 0 || x[1] !== 0) parts.push(`translateX(${lerp(x[0], x[1], t)}px)`)
  if (y[0] !== 0 || y[1] !== 0) parts.push(`translateY(${lerp(y[0], y[1], t)}px)`)
  if (scale[0] !== 1 || scale[1] !== 1) parts.push(`scale(${lerp(scale[0], scale[1], t)})`)
  el.style.transform = parts.length ? parts.join(' ') : ''
  if (opacity) el.style.opacity = String(lerp(opacity[0], opacity[1], t))

  // endValue 在本页只用于钳位记录，保留供后续扩展（见 SPEC M-23 三分支）。
  return endValue
}

export function useHomeScroll (rootRef) {
  const isDesktop = ref(typeof window === 'undefined' ? true : window.innerWidth >= DESKTOP_MIN_WIDTH)
  const reducedMotion = ref(false)

  /** M-24：尚未显影的 `[data-aos]` 节点，触发后移出，避免逐帧重复测量。 */
  let pendingReveal = []
  const state = {
    anchors: null,
    frame: 0
  }

  function collectPublicText (root, clientHeight) {
    const list = []
    root.querySelectorAll('.public_text').forEach((node) => {
      const rows = node.querySelectorAll('.p:first-child p')
      if (!rows.length) return
      const perLine = Number(node.dataset.speed) || publicText.distance
      const total = perLine * rows.length
      const rowAnchors = []
      rows.forEach((row, index) => {
        const start = layoutTop(row) - clientHeight / publicText.viewportDivisor
        rowAnchors.push({ el: row, from: start + index * perLine, end: start + total })
      })
      list.push({ node, rows: rowAnchors, ban: perLine })
    })
    return list
  }

  function measure () {
    const root = rootRef.value
    if (!root) return
    const clientHeight = window.innerHeight
    const index2 = root.querySelector('.index2')
    const fists = index2 ? index2.querySelectorAll('.wrap .fist') : []
    const index4 = root.querySelector('.index4')
    const bg = index4 ? index4.querySelector('.bg') : null

    const anchors = {
      clientHeight,
      publicText: collectPublicText(root, clientHeight),
      columns: [],
      index4: null,
      bannerParallax: root.querySelector('.banner .parallax')
    }

    if (index2 && fists.length) {
      const sectionTop = layoutTop(index2)
      anchors.columns.push({ fists: fists[0].querySelectorAll('.flex'), anchor: sectionTop - clientHeight / 3 })
      anchors.columns.push({ fists: fists[1] ? fists[1].querySelectorAll('.flex') : [], anchor: sectionTop + fists[0].offsetHeight })
    }

    if (index4) {
      const sectionTop = layoutTop(index4)
      const sectionHeight = clientHeight + statement.heightOffsetPx
      anchors.index4 = {
        node: index4,
        mask: index4.querySelector('.mask'),
        bg,
        copy: Array.from(index4.querySelectorAll('.text [data-view]')),
        sectionTop,
        sectionHeight,
        bgRange: bg ? Math.max(0, bg.offsetHeight - clientHeight) : 0,
        nextTop: index4.nextElementSibling ? layoutTop(index4.nextElementSibling) : sectionTop + sectionHeight
      }
    }

    state.anchors = anchors
  }

  /** M-02：`scroll_content(scrollTop)` 每帧同步段。 */
  function scrollContent (scrollTop) {
    const a = state.anchors
    const root = rootRef.value
    if (!a || !root) return
    const clientHeight = a.clientHeight

    // M-24 通用入场：与参考站一致，跟着每一帧的滚动位置推进。
    revealCheck(clientHeight)

    // M-08 首屏视差：translate3d(0, scrollTop*0.9, 0)，滚过一屏后整块隐藏。
    // 节点引用在 measure() 里缓存，避免逐帧 querySelector（§9.18）。
    const bannerParallax = a.bannerParallax
    if (bannerParallax) {
      bannerParallax.style.transform = `translate3d(0px, ${scrollTop * banner.parallaxFactor}px, 0px)`
      bannerParallax.style.display = scrollTop >= clientHeight ? 'none' : ''
    }

    // M-12 index2 双列视差（未达锚点时不写值，与参考站一致）。
    a.columns.forEach((group) => {
      if (!group.fists.length || scrollTop < group.anchor) return
      group.fists.forEach((flex, index) => {
        const factor = index === 0 ? columns.left : columns.right
        flex.style.transform = `translate3d(0px, ${(scrollTop - group.anchor) * factor}px, 0px)`
      })
    })

    // M-13 `.public_text` 逐行 clip-path 擦除。
    a.publicText.forEach((block) => {
      block.rows.forEach((row) => {
        const el = row.el
        if (!el) return
        if (scrollTop <= row.from) {
          el.style.clipPath = 'inset(0 100% 0 0)'
        } else if (scrollTop >= row.end) {
          el.style.clipPath = 'inset(0 0 0 0)'
        } else {
          const percent = 100 + (scrollTop - row.from) / block.ban * -100
          el.style.clipPath = `inset(0 ${percent}% 0 0)`
        }
      })
    })

    // M-18/M-19/M-20：index4 高度注入、mask 负 delay、bg 位移。
    // M-21 的「整屏钉住」已改由 CSS `position: sticky` 承担（见 index.vue 的 .index4 .fix），
    // 因为 JS 逐帧写 transform 会与合成线程的原生滚动差一帧，导致整屏抖动。
    const i4 = a.index4
    if (i4) {
      i4.node.style.height = `${i4.sectionHeight}px`
      const clamped = scrollTop >= i4.nextTop - clientHeight

      if (i4.mask) {
        if (scrollTop <= i4.sectionTop) {
          i4.mask.style.animationDelay = '0s'
        } else if (clamped) {
          i4.mask.style.animationDelay = `-${statement.mask.scrubSeconds}s`
        } else {
          const seconds = (scrollTop - i4.sectionTop) / statement.mask.scrubRangePx * statement.mask.scrubSeconds
          i4.mask.style.animationDelay = `-${seconds}s`
        }
      }

      if (i4.bg) {
        if (scrollTop <= i4.sectionTop) {
          i4.bg.style.transform = 'translateY(0px)'
        } else if (clamped) {
          i4.bg.style.transform = `translateY(${-i4.bgRange}px)`
        } else {
          const ratio = (scrollTop - i4.sectionTop) / (i4.sectionHeight - clientHeight)
          i4.bg.style.transform = `translateY(${ratio * -i4.bgRange}px)`
        }
      }

      // M-22 / M-23：两组文案的 data-view 逐帧插值（见 applyIndex4Text 的注释）。
      applyIndex4Text(scrollTop)

    }
  }

  /**
   * SPEC M-23：`[data-view]` 插值引擎，只在桌面跑（手机端由 CSS 兜底，不写内联位移）。
   *
   * 逐帧调用，与参考站一致：`sources/function.js:1480-1481` 在 smooth-scrollbar 的每帧回调里
   * 同步调 `scroll_content()` + `scrollTop_start()`；`:4580-4585` 那个 `setTimeout(…, 100)`
   * 只包 `AOS.init()`，**不包** `scrollTop_start`。
   *
   * 修前实现把它塞进 `onScroll` 的 100ms 去抖里（clearTimeout + setTimeout），于是 7000px 行程
   * 中插值只在停手后跑一次：实测连续滚动 1440px 期间两组 opacity 冻结在 1.000 / 0.747 不动，
   * 停手后直接跳到 0.000 / 1.000 —— 就是用户反馈的「一卡一卡」。
   */
  function applyIndex4Text (scrollTop) {
    const a = state.anchors
    if (!a || !a.index4 || !isDesktop.value) return
    const i4 = a.index4
    i4.copy.forEach((el) => {
      applyDataView(el, scrollTop, i4.sectionTop, i4.sectionHeight, a.clientHeight)
    })
  }

  /** `scroll` 的每帧入口：滚动位置驱动的效果都在同一个 rAF 里同步写完（同参考站 M-02）。 */
  function onScroll () {
    const scrollTop = window.scrollY || document.documentElement.scrollTop || 0
    if (state.frame) cancelAnimationFrame(state.frame)
    state.frame = requestAnimationFrame(() => {
      state.frame = 0
      scrollContent(scrollTop)
    })
  }

  function revealAll () {
    const root = rootRef.value
    if (!root) return
    root.querySelectorAll('[data-aos]').forEach((el) => el.classList.add('aos-animate'))
    pendingReveal = []
  }

  /**
   * M-24：参考站的触发判定是纯位置比较 `rect.top - clientHeight + all_num < 0`
   * （桌面 all_num = 150、手机 0；`function.js:9-33`），不是 IntersectionObserver 的相交判定。
   * 这里照抄该判定：逐帧只检查尚未显影的节点，命中就加 `.aos-animate` 并移出待办表（once: true）。
   * 用位置比较而不是 IO，滚动条直接跨段拖动时，被跳过的节点也会因为已位于视口上方而正确显影
   * （对照：参考站 y=0 → 16/54、y=5210 → 39/54 的推进同样是位置驱动）。
   */
  function revealCheck (clientHeight) {
    if (!pendingReveal.length) return
    const limit = clientHeight - (isDesktop.value ? reveal.offsetPx.desktop : reveal.offsetPx.mobile)
    pendingReveal = pendingReveal.filter((el) => {
      if (el.getBoundingClientRect().top >= limit) return true
      el.classList.add('aos-animate')
      return false
    })
  }

  function setupReveal () {
    const root = rootRef.value
    if (!root) return
    pendingReveal = Array.from(root.querySelectorAll('[data-aos]'))
    if (reducedMotion.value) {
      revealAll()
      return
    }
    revealCheck(window.innerHeight)
  }

  function onResize () {
    isDesktop.value = window.innerWidth >= DESKTOP_MIN_WIDTH
    measure()
    onScroll()
  }

  onMounted(() => {
    isDesktop.value = window.innerWidth >= DESKTOP_MIN_WIDTH
    reducedMotion.value = typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion.value) {
      revealAll()
      return
    }
    // 先注入 .index4 的高度，再用注入后的布局重算下游锚点（参考站要等一次真实滚轮，
    // 会让首次加载的可滚动高度跳变；本实现挂载即稳定，已记为有意差异）。
    if (!rootRef.value) rootRef.value = document.querySelector('.home')
    measure()
    scrollContent(window.scrollY || 0)
    measure()
    onScroll()
    setupReveal()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onResize)
    if (state.frame) cancelAnimationFrame(state.frame)
    state.frame = 0
  })

  return { isDesktop, reducedMotion, measure, revealAll }
}

export default useHomeScroll

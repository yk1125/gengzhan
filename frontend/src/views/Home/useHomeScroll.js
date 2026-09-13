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
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'
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

  const handles = reactive({ observer: null })
  const state = {
    anchors: null,
    frame: 0,
    delayed: 0
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
        rowAnchors.push({ from: start + index * perLine, end: start + total })
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
      index4: null
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
        fix: index4.querySelector('.fix'),
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

    // M-08 首屏视差：translate3d(0, scrollTop*0.9, 0)，滚过一屏后整块隐藏。
    const bannerParallax = root.querySelector('.banner .parallax')
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
      block.rows.forEach((row, index) => {
        const el = block.node.querySelectorAll('.p:first-child p')[index]
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

    // M-18 — M-21 index4 高度注入、mask 负 delay、bg 位移、fix 位移。
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

      if (i4.fix) {
        const offset = Math.min(Math.max(scrollTop - i4.sectionTop, 0), i4.sectionHeight - clientHeight)
        i4.fix.style.transform = `translate(0px, ${offset}px)`
      }
    }
  }

  /** M-02：`setTimeout(…, 100)` 后才跑的 `AOS.init()` + `scrollTop_start()`。 */
  function scrollDelayed (scrollTop) {
    const a = state.anchors
    // SPEC M-23：data-view 引擎只在桌面跑，手机端由 CSS 兜底（不写内联位移）。
    if (!a || !a.index4 || !isDesktop.value) return
    const i4 = a.index4
    i4.copy.forEach((el) => {
      applyDataView(el, scrollTop, i4.sectionTop, i4.sectionHeight, a.clientHeight)
    })
  }

  function onScroll () {
    const scrollTop = window.scrollY || document.documentElement.scrollTop || 0
    if (state.frame) cancelAnimationFrame(state.frame)
    state.frame = requestAnimationFrame(() => {
      state.frame = 0
      scrollContent(scrollTop)
    })
    if (state.delayed) clearTimeout(state.delayed)
    state.delayed = setTimeout(() => {
      state.delayed = 0
      scrollDelayed(scrollTop)
    }, 100)
  }

  function revealAll () {
    const root = rootRef.value
    if (!root) return
    root.querySelectorAll('[data-aos]').forEach((el) => el.classList.add('aos-animate'))
  }

  function setupReveal () {
    const root = rootRef.value
    if (!root) return
    const nodes = Array.from(root.querySelectorAll('[data-aos]'))
    if (reducedMotion.value || typeof IntersectionObserver === 'undefined') {
      nodes.forEach((el) => el.classList.add('aos-animate'))
      return
    }
    const offset = isDesktop.value ? reveal.offsetPx.desktop : reveal.offsetPx.mobile
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('aos-animate')
        observer.unobserve(entry.target)
      })
    }, { rootMargin: `0px 0px -${offset}px 0px`, threshold: 0 })
    nodes.forEach((el) => observer.observe(el))
    handles.observer = observer
  }

  function destroyObserver () {
    if (handles.observer) {
      handles.observer.disconnect()
      handles.observer = null
    }
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
    if (state.delayed) clearTimeout(state.delayed)
    state.frame = 0
    state.delayed = 0
    destroyObserver()
  })

  return { isDesktop, reducedMotion, measure, revealAll }
}

export default useHomeScroll

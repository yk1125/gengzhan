/**
 * 首页的两处 Swiper（归属 Session B · 仅供 `views/Home` 使用）
 *
 * - M-11 客户墙纵向轮播：PC 8 槽 × 每槽 3 张、移动 4 槽 × 每槽 6 张，参数照抄 SPEC
 *   （`speed:800 / loop:true / direction:'vertical' / allowTouchMove:false / autoplay.delay:3500`）。
 * - M-34 index5 手机横向 Swiper：`speed:1000 / spaceBetween:20 / slidesPerView:2 / loop:true / pagination 可点`。
 *
 * 与参考站的两处差异：
 * 1. 参考站把两套客户墙同时初始化，隐藏的那套容器尺寸为 0（T00A 记为 D-05 的实测缺陷）；
 *    本实现只初始化当前断点可见的那一套，断点切换时销毁重建。
 * 2. `prefers-reduced-motion: reduce` 时不初始化 autoplay（停在第 1 张），避免强制滚动。
 */
import { nextTick, onBeforeUnmount, onMounted, watch } from 'vue'
import { Swiper } from 'swiper'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { insights as insightsMotion, wall as wallMotion } from './motion'

/** 客户墙：只初始化当前断点可见的那一套。 */
export function useCustomerWall (rootRef, isDesktop, reducedMotion) {
  let instances = []

  function destroy () {
    instances.forEach((instance) => instance.destroy(true, true))
    instances = []
  }

  function build () {
    const root = rootRef.value
    if (!root) return
    destroy()
    const selector = isDesktop.value
      ? '.picture.wall-pc .slot'
      : '.picture.wall-mobile .slot'
    root.querySelectorAll(selector).forEach((el) => {
      instances.push(new Swiper(el, {
        speed: wallMotion.speedMs,
        loop: wallMotion.loop,
        direction: wallMotion.direction,
        allowTouchMove: wallMotion.allowTouchMove,
        modules: [Autoplay],
        autoplay: reducedMotion.value
          ? false
          : { delay: wallMotion.autoplayDelayMs, disableOnInteraction: false }
      }))
    })
  }

  onMounted(async () => {
    await nextTick()
    build()
  })

  watch(isDesktop, async () => {
    await nextTick()
    build()
  })

  onBeforeUnmount(destroy)

  return { rebuild: build }
}

/** index5：手机横向 Swiper（M-34）。桌面不初始化，避免多一份实例。 */
export function useInsightsSwiper (rootRef, isDesktop) {
  let instance = null

  function destroy () {
    if (instance) {
      instance.destroy(true, true)
      instance = null
    }
  }

  function build () {
    destroy()
    const root = rootRef.value
    if (!root || isDesktop.value) return
    const el = root.querySelector('.insights-swiper')
    if (!el) return
    instance = new Swiper(el, {
      speed: insightsMotion.speedMs,
      spaceBetween: insightsMotion.spaceBetweenPx,
      slidesPerView: insightsMotion.slidesPerView,
      loop: insightsMotion.loop,
      modules: [Pagination],
      pagination: { el: el.querySelector('.swiper-pagination'), clickable: true }
    })
  }

  onMounted(async () => {
    await nextTick()
    build()
  })

  watch(isDesktop, async () => {
    await nextTick()
    build()
  })

  onBeforeUnmount(destroy)

  return { rebuild: build }
}

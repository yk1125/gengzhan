import { onBeforeUnmount, onMounted } from 'vue'
import { useMagnetic } from '@/composables/useMagnetic'
import { motion } from '@/styles/motion'

// Private About lifecycle. Shared motion values and magnetic interaction stay owned by A.
export function useAboutMotion (root, stages = {}) {
  const magnetic = useMagnetic(() => root.value)
  const animations = new Set()
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
  const desktop = window.matchMedia('(min-width: 1025px) and (pointer: fine)')
  let observer
  let frame = 0
  const motionStyle = {
    '--company-duration': `${motion.duration.fast}s`,
    '--company-ease': motion.ease.standard,
    '--quality-progress': '0',
    '--customer-progress': '0'
  }

  function sync () {
    observer?.disconnect()
    animations.forEach(animation => animation.cancel())
    animations.clear()
    magnetic.detach()
    if (reduced.matches) return
    if (desktop.matches) magnetic.attach()
    if (!('IntersectionObserver' in window)) return
    observer = new IntersectionObserver(entries => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return
        observer.unobserve(target)
        if (target.dataset.companyRevealed) return
        target.dataset.companyRevealed = 'true'
        // No hidden resting state: content remains readable if animation is unavailable.
        const animation = target.animate([
          { opacity: 0, transform: `translateY(${motion.distance.reveal}px)` },
          { opacity: 1, transform: 'translateY(0)' }
        ], { duration: motion.duration.base * 1000, easing: motion.ease.enter })
        animations.add(animation)
        animation.onfinish = () => animations.delete(animation)
      })
    }, { threshold: 0.12 })
    root.value.querySelectorAll('[data-company-reveal]').forEach(el => observer.observe(el))
    window.addEventListener('scroll', schedule, { passive: true })
    schedule()
  }

  function schedule () {
    if (frame) return
    frame = window.requestAnimationFrame(updateTimeline)
  }

  function progressFor (element) {
    if (!element) return 0
    const rect = element.getBoundingClientRect()
    return Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height - window.innerHeight)))
  }

  function updateTimeline () {
    frame = 0
    const qualityProgress = progressFor(stages.qualityStage?.value)
    const customerProgress = progressFor(stages.customersStage?.value)
    root.value?.style.setProperty('--quality-progress', qualityProgress.toFixed(4))
    root.value?.style.setProperty('--customer-progress', customerProgress.toFixed(4))
  }

  onMounted(() => {
    sync()
    reduced.addEventListener('change', sync)
    desktop.addEventListener('change', sync)
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    animations.forEach(animation => animation.cancel())
    reduced.removeEventListener('change', sync)
    desktop.removeEventListener('change', sync)
    window.removeEventListener('scroll', schedule)
    if (frame) window.cancelAnimationFrame(frame)
  })

  return { motionStyle }
}

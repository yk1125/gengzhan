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
  let factsObserver
  let valuesObserver
  let frame = 0
  let countFrame = 0
  let counted = false
  let scrollBound = false
  const motionStyle = {
    '--company-duration': `${motion.duration.fast}s`,
    '--company-ease': motion.ease.standard,
    '--hero-parallax': '0px',
    '--quality-progress': '0',
    '--customer-progress': '0',
    '--values-progress': '0'
  }

  function sync () {
    observer?.disconnect()
    factsObserver?.disconnect()
    valuesObserver?.disconnect()
    if (scrollBound) window.removeEventListener('scroll', schedule)
    scrollBound = false
    animations.forEach(animation => animation.cancel())
    animations.clear()
    magnetic.detach()
    const valueCards = [...(root.value?.querySelectorAll('[data-mobile-value-card]') || [])]
    root.value?.classList.remove('company-values--mobile-motion')
    valueCards.forEach(card => card.classList.remove('is-mobile-visible'))
    if (reduced.matches) return
    if (desktop.matches) magnetic.attach()
    if (!('IntersectionObserver' in window)) return
    observer = new IntersectionObserver(entries => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) {
          animations.forEach(animation => {
            if (animation.effect?.target === target) {
              animation.cancel()
              animations.delete(animation)
            }
          })
          const animation = target.animate([
            { opacity: 0, transform: `translateY(${motion.distance.reveal}px)` },
            { opacity: 1, transform: 'translateY(0)' }
          ], { duration: motion.duration.base * 1000, easing: motion.ease.enter })
          animations.add(animation)
          animation.onfinish = () => animations.delete(animation)
        }
      })
    }, { threshold: 0.12 })
    root.value.querySelectorAll('[data-company-reveal]').forEach(el => observer.observe(el))
    if (!desktop.matches) {
      updateValueCards(0)
      root.value.classList.add('company-values--mobile-motion')
      valuesObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-mobile-visible')
          valuesObserver.unobserve(entry.target)
        })
      }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' })
      valueCards.forEach(card => valuesObserver.observe(card))
    }
    if (stages.overviewStage?.value) {
      factsObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !counted) animateFacts()
          if (!entry.isIntersecting && entry.boundingClientRect.top > window.innerHeight * .5) {
            counted = false
            if (countFrame) window.cancelAnimationFrame(countFrame)
            stages.displayFacts.value = {}
          }
        })
      }, { threshold: 0.32 })
      factsObserver.observe(stages.overviewStage.value)
    }
    window.addEventListener('scroll', schedule, { passive: true })
    scrollBound = true
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
    const heroRect = stages.heroStage?.value?.getBoundingClientRect()
    const heroTravel = heroRect ? Math.max(0, Math.min(window.innerHeight * 1.15, -heroRect.top)) * 0.9 : 0
    root.value?.style.setProperty('--hero-parallax', `${heroTravel.toFixed(1)}px`)
    const qualityProgress = progressFor(stages.qualityStage?.value)
    const customerRect = stages.customersStage?.value?.getBoundingClientRect()
    const customerProgress = customerRect ? Math.max(0, Math.min(1, (window.innerHeight - customerRect.top) / Math.max(1, window.innerHeight * 1.8))) : 0
    const valuesProgress = progressFor(stages.valuesStage?.value)
    root.value?.style.setProperty('--quality-progress', qualityProgress.toFixed(4))
    root.value?.style.setProperty('--customer-progress', customerProgress.toFixed(4))
    root.value?.style.setProperty('--values-progress', valuesProgress.toFixed(4))
    updateValueCards(valuesProgress)
  }

  function updateValueCards (progress) {
    const cards = root.value?.querySelectorAll('[data-value-card]') || []
    if (!desktop.matches) {
      cards.forEach(card => { card.style.transform = '' })
      return
    }
    const steps = Math.max(1, cards.length - 1)
    cards.forEach((card, index) => {
      if (index === 0) {
        card.style.transform = 'translate3d(0, 0, 0)'
        return
      }
      const start = (index - 1) / steps
      const local = Math.max(0, Math.min(1, (progress - start) * steps))
      const settledOffset = index * 20
      const eased = 1 - Math.pow(1 - local, 3)
      const travel = Math.max(0, window.innerHeight - settledOffset)
      const offset = settledOffset + (1 - eased) * travel
      card.style.transform = `translate3d(0, ${offset}px, 0)`
    })
  }

  function animateFacts () {
    if (countFrame) window.cancelAnimationFrame(countFrame)
    counted = true
    const facts = stages.facts?.value || []
    const starts = { '公司成立': 2008, '企业客户': 60, '客户满意度': 72, '技术支持': 8, Founded: 2008, 'Enterprise clients': 60, 'Client satisfaction': 72, 'Technical support': 8 }
    const start = performance.now()
    const tick = now => {
      const progress = Math.min(1, (now - start) / 2400)
      const eased = 1 - Math.pow(1 - progress, 3)
      const next = {}
      facts.forEach(fact => {
        const match = String(fact.value).match(/^(\d+)(.*)$/)
        if (!match) { next[fact.label] = fact.value; return }
        const end = Number(match[1]); const from = Math.min(end, starts[fact.label] ?? 0)
        next[fact.label] = `${Math.round(from + (end - from) * eased)}${match[2]}`
      })
      if (stages.displayFacts?.value) stages.displayFacts.value = next
      if (progress < 1) countFrame = window.requestAnimationFrame(tick)
    }
    countFrame = window.requestAnimationFrame(tick)
  }

  onMounted(() => {
    sync()
    reduced.addEventListener('change', sync)
    desktop.addEventListener('change', sync)
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    factsObserver?.disconnect()
    valuesObserver?.disconnect()
    animations.forEach(animation => animation.cancel())
    reduced.removeEventListener('change', sync)
    desktop.removeEventListener('change', sync)
    if (scrollBound) window.removeEventListener('scroll', schedule)
    if (frame) window.cancelAnimationFrame(frame)
    if (countFrame) window.cancelAnimationFrame(countFrame)
  })

  return { motionStyle }
}

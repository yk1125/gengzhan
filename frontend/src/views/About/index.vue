<template>
  <div
    ref="root"
    class="company-page"
    :style="motionStyle"
  >
    <section
      ref="heroStage"
      class="company-hero"
      aria-labelledby="company-title"
    >
      <div class="company-shell company-hero__wrap">
        <div class="company-hero__title">
          <p class="company-eyebrow">{{ copy.since }}</p>
          <h1 id="company-title">{{ copy.name }}</h1>
          <p class="company-hero__lead">{{ copy.tagline }}</p>
        </div>
      </div>
      <div class="company-hero__parallax">
        <img
          class="company-hero__photo"
          :src="companyMedia.office"
          :alt="copy.photoAlt"
          width="2048"
          height="1536"
          fetchpriority="high"
        >
      </div>
      <div class="company-shell company-hero__bottom">
        <div class="company-hero__statement" data-company-reveal>
          <p>{{ copy.intro.title }}</p>
        </div>
        <a
          class="company-explore"
          href="#company-intro"
          @click.prevent="explore"
        >
          <span>{{ copy.explore }}</span><Bottom aria-hidden="true" />
        </a>
      </div>
    </section>

    <section
      id="company-intro"
      ref="overviewStage"
      class="company-shell company-section company-overview"
      aria-labelledby="company-intro-title"
    >
      <div
        class="company-section-heading"
        data-company-reveal
      >
        <p class="company-eyebrow">
          {{ copy.intro.eyebrow }}
        </p>
        <h2 id="company-intro-title">
          {{ copy.intro.title }}
        </h2>
        <p class="company-note">
          {{ copy.fullName }}
        </p>
      </div>
      <div>
        <div
          class="company-prose"
          data-company-reveal
        >
          <p
            v-for="paragraph in copy.intro.paragraphs"
            :key="paragraph"
          >
            {{ paragraph }}
          </p>
        </div>
        <dl class="company-facts">
          <div
            v-for="fact in copy.facts"
            :key="fact.label"
            data-company-reveal
          >
            <dt>{{ fact.label }}</dt><dd>{{ displayFacts[fact.label] || fact.value }}</dd>
          </div>
        </dl>
      </div>
    </section>

    <section
      class="company-capabilities company-section"
      aria-labelledby="company-services-title"
    >
      <div class="company-shell">
        <div
          class="company-section-heading company-wide-heading"
          data-company-reveal
        >
          <p class="company-eyebrow">
            {{ copy.services.eyebrow }}
          </p>
          <h2 id="company-services-title">
            {{ copy.services.title }}
          </h2>
          <p class="company-note">
            {{ copy.services.description }}
          </p>
        </div>
        <div class="company-service-list">
          <router-link
            v-for="(service, index) in copy.services.items"
            :key="service.routeKey"
            :to="localized(service.routeKey)"
            class="company-service"
            data-company-reveal
          >
            <span class="company-service__number">0{{ index + 1 }}</span>
            <h3>{{ service.title }}</h3><p>{{ service.description }}</p>
            <TopRight
              class="company-service__arrow"
              aria-hidden="true"
            />
          </router-link>
        </div>
      </div>
    </section>

    <section ref="qualityStage" class="company-stage" aria-labelledby="company-stage-title">
      <div class="company-stage__sticky">
        <div class="company-shell company-stage__inner">
          <div class="company-stage__copy">
            <p class="company-eyebrow">{{ copy.quality.eyebrow }}</p>
            <h2 id="company-stage-title">{{ copy.quality.title }}</h2>
            <p>{{ copy.quality.description }}</p>
            <strong>CMMI <span>3</span></strong>
          </div>
          <div class="company-stage__media" aria-hidden="true">
            <figure class="company-stage__certificate company-stage__certificate--cmmi"><img :src="companyMedia.certificate" :alt="copy.quality.alt" width="1280" height="914"></figure>
            <figure class="company-stage__certificate company-stage__certificate--enterprise"><img :src="companyMedia.enterpriseCertificate" :alt="copy.quality.enterpriseAlt" width="2048" height="1536"></figure>
            <span class="company-stage__marker">03 / ENGINEERING QUALITY</span>
          </div>
        </div>
      </div>
    </section>

    <section
      ref="customersStage"
      class="company-customers company-section"
      aria-labelledby="company-customers-title"
    >
      <div class="company-shell">
        <div
          class="company-section-heading company-wide-heading"
          data-company-reveal
        >
          <p class="company-eyebrow">
            {{ copy.customers.eyebrow }}
          </p>
          <h2 id="company-customers-title">
            {{ copy.customers.title }}
          </h2>
        </div>
        <div class="company-logo-rows" :aria-label="copy.customers.label">
          <div v-for="(row, rowIndex) in logoRows" :key="rowIndex" class="company-logo-track" :class="`company-logo-track--${rowIndex % 2 ? 'reverse' : 'forward'}`">
            <div class="company-logo-grid">
              <span v-for="(logo, logoIndex) in [...row, ...row]" :key="`${rowIndex}-${logo.key}-${logoIndex}`" class="company-logo-grid__item">
                <img :src="`${CUSTOMER_ASSET_BASE}/${logo.file}`" alt="" :style="{ height: `${logo.height}px` }" loading="lazy">
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section
      ref="valuesStage"
      class="company-values"
      aria-labelledby="company-values-title"
    >
      <div class="company-values__sticky">
        <div class="company-shell company-values__inner">
          <div
            class="company-section-heading"
            data-company-reveal
          >
            <p class="company-eyebrow">
              {{ copy.values.eyebrow }}
            </p>
            <h2 id="company-values-title">
              {{ copy.values.title }}
            </h2>
          </div>
          <div class="company-values__visual">
            <div v-for="(value, index) in copy.values.items" :key="value.title" class="company-values__card" :style="{ '--value-index': index }" data-value-card>
              <div class="company-values__card-media"><img :src="companyMedia.office" :alt="`${value.title} visual`"></div>
              <div class="company-values__card-copy">
                <span class="company-value-number">0{{ index + 1 }}</span>
                <div><h3>{{ value.title }}</h3><p>{{ value.description }}</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section
      class="company-cta"
      aria-labelledby="company-cta-title"
    >
      <div
        class="company-shell company-cta__inner"
        data-company-reveal
      >
        <div>
          <p class="company-eyebrow">
            {{ copy.cta.eyebrow }}
          </p>
          <h2 id="company-cta-title">
            {{ copy.cta.title }}
          </h2>
          <p>{{ copy.cta.description }}</p>
        </div>
        <router-link
          class="company-cta__link hover_button"
          :to="localized('ai')"
        >
          <span>{{ copy.cta.action }}</span><TopRight aria-hidden="true" />
        </router-link>
      </div>
    </section>

    <dialog
      ref="certificateDialog"
      class="company-certificate-dialog"
      :aria-label="copy.quality.open"
      @click="closeOnBackdrop"
      @close="certificateButton?.focus()"
    >
      <button
        type="button"
        class="company-dialog-close"
        :aria-label="copy.quality.close"
        autofocus
        @click="certificateDialog.close()"
      >
        <Close aria-hidden="true" />
      </button>
      <img
        :src="companyMedia.certificate"
        :alt="copy.quality.alt"
        width="1280"
        height="914"
      >
    </dialog>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Bottom, Close, TopRight } from '@element-plus/icons-vue'
import { localizeRoute } from '@/config/routeManifest'
import { companyContent, companyMedia } from '@/content/company'
import { customerLogos, CUSTOMER_ASSET_BASE } from '@/content/home'
import { useAboutMotion } from './useAboutMotion'

const route = useRoute()
const root = ref(null)
const heroStage = ref(null)
const overviewStage = ref(null)
const qualityStage = ref(null)
const customersStage = ref(null)
const valuesStage = ref(null)
const certificateDialog = ref(null)
const certificateButton = ref(null)
const locale = computed(() => route.name === 'AboutEn' ? 'en' : 'zh-CN')
const copy = computed(() => companyContent[locale.value])
const logos = customerLogos()
const logoRows = computed(() => [logos.slice(0, 8), logos.slice(8, 16), logos.slice(16)])
const displayFacts = ref({})
const facts = computed(() => copy.value.facts)
const { motionStyle } = useAboutMotion(root, { heroStage, overviewStage, qualityStage, customersStage, valuesStage, displayFacts, facts })
const localized = routeKey => localizeRoute({ routeKey, locale: locale.value })

function explore () {
  const target = root.value.querySelector('#company-intro')
  target.scrollIntoView({ behavior: 'instant', block: 'start' })
  target.setAttribute('tabindex', '-1')
  target.focus({ preventScroll: true })
}

function closeOnBackdrop (event) {
  if (event.target !== certificateDialog.value) return
  const rect = certificateDialog.value.getBoundingClientRect()
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) {
    certificateDialog.value.close()
  }
}
</script>

<style scoped>
.company-page { background: var(--color-bg); color: var(--color-ink); letter-spacing: 0; }
.company-shell { width: min(90%, 1440px); margin-inline: auto; }
.company-page :where(h1, h2, h3, p, dl, dd, figure) { margin: 0; }
.company-page h1, .company-page h2, .company-page h3 { font-weight: 500; letter-spacing: 0; }
.company-page a { color: inherit; text-decoration: none; }
.company-page button { font: inherit; cursor: pointer; }
.company-page svg { width: 24px; height: 24px; flex: 0 0 auto; }
.company-page :is(a, button):focus-visible { outline: 3px solid var(--color-accent); outline-offset: 6px; }
.company-hero { position: relative; background: var(--color-bg); color: var(--color-ink); padding: 180px 0 116px; overflow: hidden; }
.company-hero__wrap { position: relative; z-index: 1; }
.company-hero__title { max-width: 900px; }
.company-hero__title h1 { margin-top: 20px; font-size: clamp(54px, 8vw, 120px); line-height: .98; }
.company-hero__lead { margin-top: 24px; max-width: 560px; font-size: 20px; line-height: 1.7; }
.company-hero__parallax { height: min(37.2vw, 536px); min-height: 360px; margin-top: 74px; overflow: hidden; }
.company-hero__photo { position: relative; top: -64%; display: block; width: 100%; height: 280%; object-fit: cover; object-position: center 38%; transform: translate3d(0, var(--hero-parallax), 0); will-change: transform; }
.company-hero__bottom { display: flex; align-items: flex-end; justify-content: space-between; gap: 48px; margin-top: 58px; }
.company-hero__statement { max-width: 560px; font-size: clamp(24px, 3vw, 42px); line-height: 1.35; }
.company-eyebrow { font-size: 12px; line-height: 1.5; font-weight: 500; }
.company-hero h1 { margin-top: 8px; font-size: 64px; line-height: 1.15; }
.company-hero__lead { margin-top: 16px; font-size: 18px; line-height: 1.7; }
.company-explore { display: flex; min-height: 48px; gap: 32px; align-items: center; border-bottom: 1px solid var(--color-line); font-size: 13px; white-space: nowrap; }
.company-explore svg { transition: transform var(--company-duration) var(--company-ease); }
.company-explore:hover svg { transform: translateY(5px); }
.company-section { padding-block: 120px; }
.company-overview { display: grid; grid-template-columns: 1fr 1.3fr; gap: 10%; padding-top: 80px; scroll-margin-top: 110px; }
.company-section-heading h2 { margin-top: 24px; font-size: 44px; line-height: 1.4; white-space: pre-line; text-wrap: balance; }
.company-note { margin-top: 24px; color: var(--color-ink-soft); font-size: 14px; line-height: 1.8; }
.company-prose { color: var(--color-ink-body); font-size: 16px; line-height: 2; }
.company-prose p + p { margin-top: 22px; }
.company-facts { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 36px 32px; padding-top: 52px; }
.company-facts > div { display: flex; flex-direction: column-reverse; gap: 12px; border-bottom: 1px solid var(--color-line); padding-bottom: 22px; }
.company-facts dt { font-size: 14px; color: var(--color-ink-soft); }
.company-facts dd { font-size: 56px; line-height: 1.15; font-variant-numeric: tabular-nums; }
.company-capabilities { background: var(--color-surface); }
.company-wide-heading { max-width: 900px; margin-bottom: 64px; }
.company-service-list { border-top: 1px solid var(--color-line); }
.company-service { display: grid; grid-template-columns: 55px 1fr 1.3fr 32px; gap: 32px; align-items: center; padding: 38px 12px; border-bottom: 1px solid var(--color-line); transition: background-color var(--company-duration) var(--company-ease), color var(--company-duration) var(--company-ease); }
.company-service__number { color: var(--color-ink-soft); font-size: 13px; }
.company-service h3 { font-size: 28px; line-height: 1.35; }
.company-service p { color: var(--color-ink-body); font-size: 15px; line-height: 1.8; }
.company-service__arrow { transition: transform var(--company-duration) var(--company-ease); }
.company-service:hover, .company-service:focus-visible { background: var(--color-bg); }
.company-service:hover .company-service__arrow { transform: rotate(45deg); color: var(--color-accent); }
.company-service:nth-child(2) { transition-delay: 40ms; }
.company-service:nth-child(3) { transition-delay: 80ms; }
.company-service:nth-child(4) { transition-delay: 120ms; }
.company-quality { display: grid; grid-template-columns: 1fr 1.15fr; gap: 9%; align-items: center; }
.company-stage { position: relative; height: 260vh; background: var(--color-surface-soft); }
.company-stage__sticky { position: sticky; top: 0; height: 100svh; overflow: hidden; }
.company-stage__inner { display: grid; grid-template-columns: .8fr 1.2fr; gap: 8%; align-items: center; height: 100%; }
.company-stage__copy h2 { margin-top: 20px; font-size: clamp(42px, 5vw, 76px); line-height: 1.12; white-space: pre-line; }
.company-stage__copy > p:not(.company-eyebrow) { max-width: 430px; margin-top: 26px; color: var(--color-ink-body); line-height: 1.9; }
.company-stage__copy strong { display: block; margin-top: 52px; font-size: 64px; font-weight: 500; }
.company-stage__copy strong span { color: var(--color-accent); }
.company-stage__media { position: relative; height: min(72vh, 760px); perspective: 1200px; }
.company-stage__certificate { position: absolute; inset: 8% 0 auto auto; width: 78%; margin: 0; overflow: hidden; background: #fff; box-shadow: 0 30px 80px rgb(0 0 0 / 18%); transform-origin: 70% 50%; }
.company-stage__certificate img { display: block; width: 100%; height: auto; }
.company-stage__certificate--cmmi { z-index: 2; transform: translate3d(calc(var(--quality-progress) * -22%), calc(var(--quality-progress) * -12%), 0) rotate(calc(var(--quality-progress) * -5deg)) scale(calc(1.02 - var(--quality-progress) * .27)); }
.company-stage__certificate--enterprise { z-index: 1; transform: translate3d(calc(28% - var(--quality-progress) * 10%), calc(18% - var(--quality-progress) * 30%), 0) rotate(calc(7deg - var(--quality-progress) * 3deg)) scale(calc(.7 + var(--quality-progress) * .34)); opacity: calc(.25 + var(--quality-progress) * .75); }
.company-stage__marker { position: absolute; right: 0; bottom: 3%; color: var(--color-ink-soft); font-size: 11px; letter-spacing: .12em; }
.company-quality .company-prose { margin-top: 26px; }
.company-credential { margin-top: 36px; font-size: 44px !important; line-height: 1.15; }
.company-credential span { color: var(--color-accent); }
.company-quality .company-note { margin-top: 8px; }
.company-certificate button { position: relative; display: block; width: 100%; padding: 0; border: 0; background: #fff; }
.company-certificate img { display: block; width: 100%; height: auto; }
.company-certificate__zoom { position: absolute; right: 12px; bottom: 12px; width: 44px; height: 44px; display: grid; place-items: center; background: #fff; color: #111; border: 1px solid #aaa; border-radius: 50%; }
.company-certificate figcaption { margin-top: 16px; font-size: 12px; line-height: 1.7; color: var(--color-ink-soft); }
.company-customers { background: var(--color-surface-soft); }
.company-logo-rows { overflow: hidden; background: #fff; }
.company-logo-track { overflow: hidden; }
.company-logo-grid { display: flex; width: max-content; padding: 0; margin: 0; list-style: none; background: #fff; transform: translateX(calc((.5 - var(--customer-progress)) * 18vw)); }
.company-logo-track--reverse .company-logo-grid { transform: translateX(calc((var(--customer-progress) - .5) * 18vw)); }
.company-logo-grid__item { display: grid; place-items: center; width: 12.5vw; min-width: 150px; height: 112px; padding: 24px 16px; border: 1px solid #ededed; }
.company-logo-grid img { display: block; width: auto; max-width: 100%; object-fit: contain; }
.company-values { position: relative; height: 400vh; background: var(--color-bg); }
.company-values__sticky { position: sticky; top: 0; height: 100svh; overflow: hidden; }
.company-values__inner { position: relative; height: 100%; }
.company-values__inner > .company-section-heading { position: absolute; z-index: 6; top: 9vh; left: 5%; max-width: 520px; }
.company-values__visual { position: absolute; inset: 0; }
.company-values__card { position: absolute; z-index: calc(2 + var(--value-index)); top: 31vh; left: 5%; width: 90%; height: min(50vh, 420px); display: grid; grid-template-columns: minmax(280px, .95fr) 1.05fr; gap: 0; align-items: stretch; background: var(--color-surface); box-shadow: 0 24px 60px rgb(0 0 0 / 16%); transform: translateY(100vh); will-change: transform; }
.company-values__card:first-child { transform: translateY(0); }
.company-values__card-media { height: 100%; overflow: hidden; }
.company-values__card-media img { width: 100%; height: 100%; object-fit: cover; }
.company-values__card-copy { display: grid; grid-template-columns: 52px 1fr; gap: 26px; align-content: center; padding: 42px 8% 36px 10%; border: 1px solid var(--color-line); border-left: 0; }
.company-values__card-copy h3 { font-size: clamp(28px, 3vw, 52px); }
.company-values__card-copy p { margin-top: 22px; color: var(--color-ink-body); line-height: 1.9; }
.company-value-list { list-style: none; padding: 0; margin: 0; border-top: 1px solid var(--color-line); }
.company-value-list li { display: grid; grid-template-columns: 36px 1fr; gap: 20px; padding-block: 32px; border-bottom: 1px solid var(--color-line); }
.company-value-number { padding-top: 6px; font-size: 12px; color: var(--color-accent); }
.company-value-list h3 { font-size: 25px; line-height: 1.5; }
.company-value-list p { margin-top: 16px; color: var(--color-ink-body); font-size: 15px; line-height: 1.9; }
.company-cta { background: #254a45; color: #fff; padding-block: 84px; }
.company-cta__inner { display: flex; justify-content: space-between; align-items: center; gap: 64px; }
.company-cta h2 { margin-top: 22px; font-size: 42px; line-height: 1.4; white-space: pre-line; }
.company-cta p:last-child { margin-top: 20px; font-size: 15px; line-height: 1.8; }
.company-cta__link { display: flex; align-items: center; gap: 32px; flex-shrink: 0; min-height: 60px; padding: 10px 4px; border-bottom: 1px solid currentColor; }
.company-cta .company-cta__link:focus-visible { outline-color: currentColor; }
.company-certificate-dialog { margin: auto; padding: 56px 20px 20px; width: min(1040px, calc(100% - 32px)); max-height: calc(100svh - 32px); overscroll-behavior: contain; background: var(--color-surface); color: var(--color-ink); border: 1px solid var(--color-line); }
.company-certificate-dialog::backdrop { background: rgb(0 0 0 / 80%); }
.company-certificate-dialog > img { display: block; width: 100%; height: auto; max-height: calc(100svh - 120px); object-fit: contain; }
.company-dialog-close { position: absolute; right: 8px; top: 6px; display: grid; place-items: center; width: 44px; height: 44px; padding: 0; border: 0; background: transparent; color: inherit; }
@media (min-width: 1600px) {
  .company-hero h1 { font-size: 76px; }
  .company-section-heading h2 { font-size: 50px; }
}
@media (max-width: 1024px) {
  .company-hero { min-height: 0; height: auto; max-height: none; padding-top: 132px; }
  .company-hero h1 { font-size: 48px; }
  .company-hero__top { height: 100px; }
  .company-section { padding-block: 80px; }
  .company-overview { grid-template-columns: 1fr 1.2fr; gap: 6%; }
  .company-section-heading h2 { font-size: 34px; }
  .company-facts dd { font-size: 44px; }
  .company-service { grid-template-columns: 32px 1fr 1.2fr 24px; gap: 22px; }
  .company-service h3 { font-size: 24px; }
  .company-quality { gap: 5%; }
  .company-logo-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .company-cta h2 { font-size: 34px; }
  .company-stage { height: 180vh; }
  .company-stage__inner { grid-template-columns: 1fr; gap: 20px; padding-block: 72px; }
  .company-stage__copy h2 { font-size: 40px; }
  .company-stage__copy strong { margin-top: 28px; font-size: 48px; }
  .company-stage__media { height: 52vh; }
}
@media (max-width: 600px) {
  .company-hero { padding: 104px 0 64px; }
  .company-hero__parallax { height: 310px; min-height: 0; margin-top: 40px; }
  .company-hero__photo { top: -19%; height: 150%; transform: none; }
  .company-hero__bottom { display: block; margin-top: 36px; }
  .company-hero h1 { font-size: 36px; }
  .company-hero__lead { font-size: 14px; margin-top: 12px; }
  .company-explore { justify-content: space-between; margin-top: 22px; width: 100%; }
  .company-section { padding-block: 64px; }
  .company-overview, .company-quality { grid-template-columns: 1fr; gap: 36px; }
  .company-section-heading h2 { font-size: 30px; margin-top: 18px; }
  .company-prose { font-size: 15px; line-height: 1.9; }
  .company-facts { padding-top: 36px; gap: 28px 20px; }
  .company-facts dd { font-size: 42px !important; }
  .company-wide-heading { margin-bottom: 36px; }
  .company-service { grid-template-columns: 26px 1fr 24px; gap: 12px; padding: 24px 0; }
  .company-service h3 { font-size: 23px; }
  .company-service p { grid-column: 2; grid-row: 2; font-size: 14px; }
  .company-service__arrow { grid-column: 3; grid-row: 1; }
  .company-logo-grid__item { width: 33vw; min-width: 112px; height: 86px; padding: 18px 12px; }
  .company-logo-grid img { max-height: 28px; }
  .company-value-list h3 { font-size: 23px; }
  .company-value-list li { grid-template-columns: 26px 1fr; gap: 12px; }
  .company-cta { padding-block: 56px; }
  .company-cta__inner { display: block; }
  .company-cta h2 { font-size: 30px; }
  .company-cta__link { justify-content: space-between; margin-top: 30px; }
  .company-stage { height: auto; }
  .company-stage__sticky { position: relative; height: auto; min-height: 820px; }
  .company-stage__inner { display: block; padding-block: 64px; }
  .company-stage__media { height: 370px; margin-top: 38px; }
  .company-stage__certificate { width: 88%; }
  .company-stage__certificate--cmmi { transform: translate3d(-12%, -8%, 0) rotate(-4deg) scale(.9); }
  .company-stage__certificate--enterprise { transform: translate3d(8%, 18%, 0) rotate(5deg) scale(.75); opacity: .75; }
  .company-hero__fold { display: none; }
  .company-hero__photo { transform: none; }
  .company-values { height: auto; padding: 64px 0; }
  .company-values__sticky { position: static; height: auto; overflow: visible; }
  .company-values__inner { height: auto; }
  .company-values__inner > .company-section-heading { position: static; max-width: none; margin-bottom: 36px; }
  .company-values__visual { position: static; display: grid; gap: 18px; }
  .company-values__card { position: static; width: auto; height: auto; min-height: 0; grid-template-columns: 1fr; }
  .company-values__card-media { height: 210px; }
  .company-values__card-copy { grid-template-columns: 28px 1fr; gap: 12px; padding: 24px 20px; border-left: 1px solid var(--color-line); }
}
@media (prefers-reduced-motion: reduce) {
  .company-explore svg, .company-service, .company-service__arrow { transition: none; }
}
</style>

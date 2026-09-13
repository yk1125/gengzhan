const { chromium } = require("playwright-core");
const CHROME = "C:/Users/yk/AppData/Local/Google/Chrome/Application/chrome.exe";
(async () => {
  const b = await chromium.launch({ executablePath: CHROME, headless: true });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, locale: "zh-CN" });
  await ctx.addInitScript(() => { try { sessionStorage.setItem('ifTime','false'); sessionStorage.removeItem('Pattern'); } catch(e){} });
  const p = await ctx.newPage();
  await p.goto("https://www.seniorweb.cn/", { waitUntil: "load", timeout: 90000 });
  await p.waitForTimeout(2000);
  const res = await p.evaluate(async () => {
    const inlineEl = document.querySelector('.index1 .inline .swiper');
    const bannerEl = document.querySelector('.banner .swiper');
    const ie = inlineEl && inlineEl.swiper, be = bannerEl && bannerEl.swiper;
    const log = [];
    const t0 = performance.now();
    let prevI = null, prevB = null;
    while (performance.now() - t0 < 75000) {
      const i = ie ? { real: ie.realIndex, active: ie.activeIndex, tr: ie.translate, run: ie.autoplay.running, paused: ie.autoplay.paused, enabled: ie.autoplay.enabled, slides: ie.slides.length, scr: ie.slidesGrid.length } : null;
      const bn = be ? { real: be.realIndex, delay: be.params.autoplay.delay, run: be.autoplay.running, paused: be.autoplay.paused, vid: (v => v ? Math.round(v.currentTime * 100) / 100 : null)(bannerEl.querySelector('.swiper-slide:first-child video')), vidPaused: (v => v ? v.paused : null)(bannerEl.querySelector('.swiper-slide:first-child video')), ops: [...bannerEl.querySelectorAll('.swiper-slide')].map(s => getComputedStyle(s).opacity), classes: [...bannerEl.querySelectorAll('.swiper-slide')].map(s => s.className) } : null;
      const key = JSON.stringify(i) + '||' + (bn ? bn.real + '|' + bn.delay + '|' + bn.run + '|' + bn.classes.join(',') : '');
      if (key !== prevI + '||' + (prevB || '')) { log.push({ t: Math.round(performance.now() - t0), i, bn }); prevI = JSON.stringify(i); prevB = bn ? bn.real + '|' + bn.delay + '|' + bn.run + '|' + bn.classes.join(',') : ''; }
      await new Promise(r => setTimeout(r, 250));
    }
    return { log, inlineEl: !!ie, bannerEl: !!be, inlineSlides: ie ? ie.slides.length : null, docHidden: document.hidden };
  });
  console.log("inline=" + res.inlineEl + " banner=" + res.bannerEl + " inlineSlides=" + res.inlineSlides + " hidden=" + res.docHidden);
  for (const r of res.log) console.log("t=" + String(r.t).padStart(6) + " inline=" + JSON.stringify(r.i) + "\n        banner=" + JSON.stringify(r.bn));
  await b.close();
})().catch(e => { console.error("FATAL", e && e.stack || e); process.exit(1); });

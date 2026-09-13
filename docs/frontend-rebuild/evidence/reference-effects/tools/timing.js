const { chromium } = require("playwright-core");
const CHROME = "C:/Users/yk/AppData/Local/Google/Chrome/Application/chrome.exe";
(async () => {
  const b = await chromium.launch({ executablePath: CHROME, headless: true });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, locale: "zh-CN" });
  await ctx.addInitScript(() => { try { sessionStorage.setItem('ifTime','false'); sessionStorage.removeItem('Pattern'); } catch(e){} });
  const p = await ctx.newPage();
  await p.goto("https://www.seniorweb.cn/", { waitUntil: "load", timeout: 90000 });
  await p.waitForTimeout(2500);
  const res = await p.evaluate(async () => {
    const out = [];
    const S = () => {
      const g = (sel, idx) => { const e = document.querySelectorAll(sel)[idx||0]; return e && e.swiper ? e.swiper : null; };
      const inline = g('.index1 .inline .swiper');
      const banner = g('.banner .swiper');
      const walls = [...document.querySelectorAll('.index1 .content .picture .img .swiper')].map(e => e.swiper ? { i: e.swiper.realIndex, t: e.swiper.translate, dur: e.swiper.params.speed, delay: e.swiper.params.autoplay && e.swiper.params.autoplay.delay } : null);
      return {
        t: Math.round(performance.now()),
        inline: inline ? { real: inline.realIndex, tr: Math.round(inline.translate), speed: inline.params.speed, delay: inline.params.autoplay.delay, loop: inline.params.loop, dir: inline.params.direction } : null,
        banner: banner ? { real: banner.realIndex, speed: banner.params.speed, delay: banner.params.autoplay.delay, effect: banner.params.effect, running: !!(banner.autoplay && banner.autoplay.running), slides: banner.slides.length, vidT: (x => x ? Math.round(x.currentTime*100)/100 : null)(document.querySelector('.banner .swiper .swiper-slide:first-child video')) } : null,
        walls: walls.slice(0, 8),
      };
    };
    const t0 = performance.now();
    while (performance.now() - t0 < 15000) { out.push(S()); await new Promise(r => setTimeout(r, 200)); }
    return { out, header: { w: document.body.clientWidth }, wallCount: document.querySelectorAll('.index1 .content .picture .img .swiper').length };
  });
  const seen = new Set();
  console.log("wallCount=" + res.wallCount + " clientWidth=" + res.header.w);
  for (const s of res.out) {
    const key = (s.inline? s.inline.real : -1) + '|' + (s.banner? s.banner.real : -1) + '|' + s.walls.map(w=>w&&w.i).join(',');
    if (!seen.has(key)) { seen.add(key); console.log(JSON.stringify(s)); }
  }
  console.log("--- inline transitions ---");
  let prev = null;
  for (const s of res.out) { if (!prev || s.inline.real !== prev) { console.log(" t=" + s.t + " inlineReal=" + s.inline.real + " tr=" + s.inline.tr); prev = s.inline.real; } }
  console.log("--- banner transitions ---");
  prev = null;
  for (const s of res.out) { if (!prev || s.banner.real !== prev || s.banner.delay !== undefined) { if (!prev || s.banner.real !== prev) console.log(" t=" + s.t + " bannerReal=" + s.banner.real + " delay=" + s.banner.delay + " running=" + s.banner.running + " vidT=" + s.banner.vidT); prev = s.banner.real; } }
  console.log("--- wall transitions (slot0) ---");
  prev = null;
  for (const s of res.out) { const i = s.walls[0] && s.walls[0].i; if (i !== prev) { console.log(" t=" + s.t + " wall0.real=" + i + " tr=" + Math.round(s.walls[0].t) + " speed=" + s.walls[0].dur + " delay=" + s.walls[0].delay); prev = i; } }
  await b.close();
})().catch(e => { console.error("FATAL", e && e.stack || e); process.exit(1); });

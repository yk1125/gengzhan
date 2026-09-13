const { chromium } = require("playwright-core");
const fs = require("fs");
const path = require("path");
const CHROME = "C:/Users/yk/AppData/Local/Google/Chrome/Application/chrome.exe";
const URL = "https://www.seniorweb.cn/";
const H = `
window.__sb = () => (window.Scrollbar ? window.Scrollbar.get(document.querySelector('#my-scrollbar')) : null);
window.__setY = (y) => { const s = window.__sb(); if (s) { s.scrollTo(0, y, 0); } else { window.scrollTo(0, y); } };
window.__y = () => { const s = window.__sb(); return Math.round(s ? s.scrollTop : window.scrollY); };
window.__limit = () => { const s = window.__sb(); return s ? s.limit.y : Math.max(0, document.documentElement.scrollHeight - document.documentElement.clientHeight); };
window.__H = () => document.documentElement.clientHeight;
`;
async function setup(browser, W, Hh, DPR) {
  const ctx = await browser.newContext({ viewport: { width: W, height: Hh }, deviceScaleFactor: DPR, locale: "zh-CN" });
  await ctx.addInitScript(() => { try { sessionStorage.setItem('ifTime','false'); sessionStorage.removeItem('Pattern'); } catch(e){} });
  const page = await ctx.newPage();
  const logs = [];
  page.on("console", m => { if (m.type()==="error"||m.type()==="warning") logs.push(m.type()+": "+m.text()); });
  page.on("pageerror", e => logs.push("pageerror: "+(e&&e.message)));
  await page.goto(URL, { waitUntil: "load", timeout: 90000 });
  await page.waitForTimeout(4000);
  return { page, logs };
}
async function kick(page) {
  await page.mouse.move(720, 450);
  await page.mouse.wheel(0, 900); await page.waitForTimeout(1500);
  await page.evaluate(H); await page.evaluate(() => { const s = window.__sb(); if (s) s.update(); }); await page.waitForTimeout(600);
  await page.mouse.move(720, 450);
  await page.mouse.wheel(0, -700); await page.waitForTimeout(1500);
}
(async () => {
  const mode = process.argv[2];
  const outFile = process.argv[3];
  const browser = await chromium.launch({ executablePath: CHROME, headless: true });
  const out = { mode, meta: {} };
  if (mode === "ptdetail") {
    const { page, logs } = await setup(browser, 1440, 900, 1);
    await page.evaluate(H); await kick(page);
    out.meta = { viewport:{w:1440,h:900}, dpr:1, logs };
    out.items = await page.evaluate(() => {
      return [...document.querySelectorAll('.public_text')].map(c => {
        const ps = [...c.querySelectorAll('.p:first-child p')];
        return { cls: c.className, section: c.closest('section').className,
          dataSpeed: c.getAttribute('data-speed'),
          containerOffsetTop: window.jQuery(c).offset().top,
          paras: ps.map((p,i) => ({ i, text: p.textContent.trim().slice(0,10), jqOffsetTop: window.jQuery(p).offset().top, offsetTop: p.offsetTop, position: getComputedStyle(p).position, cssTop: getComputedStyle(p).top, clip: getComputedStyle(p).clipPath })),
          pCountAll: c.querySelectorAll('p').length, len: ps.length };
      });
    });
    out.sweep = [];
    const base = Math.round(out.items[0].containerOffsetTop - 750);
    for (const dy of [0,50,100,150,200,250,300,350,400,450,500,550,600,700,800]) {
      const y = base + dy;
      const st = await page.evaluate(async (yy) => { window.__setY(yy); await new Promise(r=>setTimeout(r,700)); return [...document.querySelectorAll('.public_text')].map(c => [...c.querySelectorAll('.p:first-child p')].map(p => getComputedStyle(p).clipPath)); }, y);
      out.sweep.push({ y, dy, clips: st });
    }
  }
  if (mode === "mobile") {
    for (const vp of [{w:390,h:844,dpr:3,name:'390'},{w:1024,h:900,dpr:1,name:'1024'},{w:1025,h:900,dpr:1,name:'1025'}]) {
      const { page, logs } = await setup(browser, vp.w, vp.h, vp.dpr);
      await page.evaluate(H);
      const rec = { viewport: vp, logs, states: [] };
      await kick(page);
      rec.limit = await page.evaluate(() => window.__limit());
      rec.probe = await page.evaluate(() => {
        const g = (s) => { const e = document.querySelector(s); if (!e) return null; const c = getComputedStyle(e); const r = e.getBoundingClientRect(); return { display:c.display, opacity:c.opacity, visibility:c.visibility, w:Math.round(r.width), h:Math.round(r.height), pe:c.pointerEvents, pos:c.position, transform:c.transform, anim:c.animationName, animDur:c.animationDuration, bg:c.backgroundColor, color:c.color, overflow:c.overflow }; };
        const cnt = (s) => document.querySelectorAll(s).length;
        const sb = window.Scrollbar.get(document.querySelector('#my-scrollbar'));
        return {
          scrollbarPresent: !!sb,
          damping: sb ? { damping: sb.damping, renderByPixels: sb.renderByPixels, alwaysShowTracks: sb.alwaysShowTracks } : null,
          docScrollable: document.documentElement.scrollHeight,
          counts: { orbCanvas: cnt('.orb-canvas'), fixedCursor: cnt('.fixed_cursor'), fixedSide: cnt('.fixed_side'), hoverButton: cnt('.hover_button'), magnetic: cnt('.magnetic'), publicText: cnt('.public_text'), sjText: cnt('.public_text.sj_text'), index3wrap: cnt('.index3 .wrap'), index3sj: cnt('.index3 .wrap .sj_content'), bannerSlides: cnt('.banner .swiper .swiper-slide'), sjBannerVideo: cnt('.sj_banner_video'), navLi: cnt('.header .nav li'), menu: cnt('.header .menu'), linkTransition: cnt('.link_transition'), aos: cnt('[aos]'), dataView: cnt('[data-view]'), index3item: cnt('.index3 .wrap .content .item'), index2flex: cnt('.index2 .wrap .fist .flex') },
          css: { header: g('.header'), headerMenu: g('.header .menu'), nav: g('.header .nav'), fixedCursor: g('.fixed_cursor'), fixedSide: g('.fixed_side'), publicText: g('.public_text'), publicTextSj: g('.public_text.sj_text'), index3wrap: g('.index3 .wrap'), index3sj: g('.index3 .wrap .sj_content'), index3: g('.index3'), index4mask: g('.index4 .mask'), index4sjbg: g('.index4 .sj_bg'), index4bg: g('.index4 .bg'), sjBannerVideo: g('.sj_banner_video'), move: g('.index3 .wrap .content .move'), headline: g('.index1 .wrap .content .headline .line'), orb: g('.orb-canvas') }
        };
      });
      const dir = path.dirname(outFile);
      fs.mkdirSync(dir, { recursive: true });
      await page.screenshot({ path: path.join(dir, `mobile-${vp.name}-top.png`) });
      for (const pct of [30,50,70,100]) {
        const y = Math.round(rec.limit * pct/100);
        await page.evaluate(async (yy) => { window.__setY(yy); await new Promise(r=>setTimeout(r,1200)); }, y);
        rec.states.push(await page.evaluate((yy) => {
          const g = (s) => { const e=document.querySelector(s); if(!e) return null; const c=getComputedStyle(e); const r=e.getBoundingClientRect(); return { display:c.display, opacity:c.opacity, transform:c.transform, h:Math.round(r.height), top:Math.round(r.top) }; };
          const sj = [...document.querySelectorAll('.index3 .wrap .sj_content li')].map(e=>({tf:getComputedStyle(e).transform, o:getComputedStyle(e).opacity}));
          return { y: yy, headerCls: document.querySelector('.header') ? document.querySelector('.header').className : null, fixedSide: g('.fixed_side'), scrollContentH: (()=>{const e=document.querySelector('.scroll-content'); return e?Math.round(e.getBoundingClientRect().height):null;})(), docScrollH: document.documentElement.scrollHeight, bodyH: document.body.getBoundingClientRect().height, index3: g('.index3'), index3sj: g('.index3 .wrap .sj_content'), index4mask: g('.index4 .mask'), sjList: sj, aos: [...document.querySelectorAll('[aos]')].filter(e=>e.classList.contains('aos-animate')).length + '/' + document.querySelectorAll('[aos]').length, dataView: [...document.querySelectorAll('[data-view]')].map(e=>({tf:getComputedStyle(e).transform,o:getComputedStyle(e).opacity})).slice(0,6) };
        }, y));
        await page.screenshot({ path: path.join(dir, `mobile-${vp.name}-${pct}.png`) });
      }
      out.vp = out.vp || {}; out.vp[vp.name] = rec;
      await page.context().close();
    }
  }
  if (mode === "entry") {
    const { page, logs } = await setup(browser, 1440, 900, 1);
    out.meta = { logs };
    out.t = [];
    const t0 = Date.now();
    for (const w of [0, 100, 200, 400, 800, 1600]) {
      const dt = w - (Date.now()-t0); if (dt>0) await page.waitForTimeout(dt);
      out.t.push({ want:w, actual: Date.now()-t0, state: await page.evaluate(() => {
        const g=(s)=>{const e=document.querySelector(s); if(!e) return null; const c=getComputedStyle(e); return {display:c.display,opacity:c.opacity,z:c.zIndex,transition:c.transition};};
        return { bodyOpacity: getComputedStyle(document.body).opacity, startMask: g('.start_mask'), bodyCanvasMask: g('.body_canvas_mask'), scrollContent: g('.scroll-content'), header: g('.header'), eachAnimateOn: [...document.querySelectorAll('.each_animate')].map(e=>e.className) };
      })});
    }
  }
  if (mode === "customers") {
    const { page, logs } = await setup(browser, 1440, 900, 1);
    await page.evaluate(H); await kick(page);
    out.meta = { logs };
    out.config = await page.evaluate(() => {
      const els = [...document.querySelectorAll('.index1 .content .picture .img .swiper')];
      return els.map((e,i)=>{ const s = e.swiper; return { i, slides: s ? s.slides.length : null, real: s ? s.realIndex : null, params: s ? { speed: s.params.speed, delay: s.params.autoplay && s.params.autoplay.delay, dir: s.params.direction, loop: s.params.loop, touch: s.params.allowTouchMove } : null, dupes: e.querySelectorAll('.swiper-slide-duplicate').length, slots: e.querySelectorAll('.swiper-slide:not(.swiper-slide-duplicate)').length }; });
    });
    out.ticks = [];
    const t0 = Date.now();
    for (let k=0;k<7;k++){
      const dt = k*1500 - (Date.now()-t0); if (dt>0) await page.waitForTimeout(dt);
      out.ticks.push({ ms: Date.now()-t0, real: await page.evaluate(() => [...document.querySelectorAll('.index1 .content .picture .img .swiper')].map(e=>e.swiper?e.swiper.realIndex:null)), tf: await page.evaluate(() => [...document.querySelectorAll('.index1 .content .picture .img .swiper')].map(e=>{const w=e.querySelector('.swiper-wrapper'); return w?getComputedStyle(w).transform:null;})) });
    }
  }
  if (mode === "index1text") {
    const { page, logs } = await setup(browser, 1440, 900, 1);
    await page.evaluate(H); await kick(page);
    out.meta = { logs };
    out.config = await page.evaluate(() => {
      const el = document.querySelector('.index1 .inline .swiper');
      if (!el) return null; const s = el.swiper;
      const wrap = document.querySelector('.index1 .inline');
      return { found: true, slides: s.slides.length, real: s.realIndex, activeIndex: s.activeIndex, params: { speed:s.params.speed, delay: s.params.autoplay&&s.params.autoplay.delay, dir:s.params.direction, loop:s.params.loop, touch:s.params.allowTouchMove, disableOnInteraction: s.params.autoplay&&s.params.autoplay.disableOnInteraction }, autoplayRunning: s.autoplay.running, autoplayPaused: s.autoplay.paused, wrapRect: (()=>{const r=el.getBoundingClientRect(); return {w:r.width,h:r.height,top:r.top};})(), inlineDisplay: wrap? getComputedStyle(wrap).display:null, inlineOffsetH: wrap? wrap.getBoundingClientRect().height: null, slidesHTML: el.querySelectorAll('.swiper-slide').length };
    });
    out.t = [];
    const t0 = Date.now();
    for (let k=0;k<6;k++){
      const dt = k*2000 - (Date.now()-t0); if (dt>0) await page.waitForTimeout(dt);
      out.t.push({ ms: Date.now()-t0, real: await page.evaluate(()=>{const s=document.querySelector('.index1 .inline .swiper').swiper; return s?s.realIndex:null;}), tf: await page.evaluate(()=>{const w=document.querySelector('.index1 .inline .swiper .swiper-wrapper'); return w?getComputedStyle(w).transform:null;}) });
    }
  }
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, JSON.stringify(out, null, 1));
  console.log("WROTE " + outFile);
  try { await browser.close(); } catch(e) {}
})();



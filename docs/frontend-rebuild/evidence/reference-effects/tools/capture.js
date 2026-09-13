const { chromium } = require("playwright-core");
const fs = require("fs");
const path = require("path");
const CHROME = "C:/Users/yk/AppData/Local/Google/Chrome/Application/chrome.exe";
const URL = "https://www.seniorweb.cn/";

const HELPERS = `
window.__sb = () => window.Scrollbar.get(document.querySelector('#my-scrollbar'));
window.__setY = (y) => { window.__sb().scrollTo(0, y, 0); };
window.__y = () => Math.round(window.__sb().scrollTop);
window.__limit = () => window.__sb().limit.y;
window.__H = () => document.documentElement.clientHeight;
window.__docTop = (e) => Math.round(e.getBoundingClientRect().top + window.__y());
window.__ranges = () => {
  const ch = window.__H(); const y = window.__y();
  const q = s => document.querySelector(s);
  const i2 = q('.index2'), i4 = q('.index4'), i3 = q('.index3'), i1 = q('.index1'), i5 = q('.index5');
  const dt = e => Math.round(e.getBoundingClientRect().top + y);
  const out = { global: { start: 0, end: window.__limit() }, clientHeight: ch,
                index1: { start: dt(i1), end: dt(i1) + Math.round(i1.getBoundingClientRect().height) },
                index2: { start: dt(i2), end: dt(i2) + Math.round(i2.getBoundingClientRect().height) },
                index3: { start: dt(i3), end: dt(i3) + Math.round(i3.getBoundingClientRect().height) },
                index4: { start: dt(i4), end: dt(i4) + Math.round(i4.getBoundingClientRect().height) - ch, sectionTop: dt(i4), sectionH: Math.round(i4.getBoundingClientRect().height), nextTop: dt(i4.nextElementSibling) },
                index5: { start: dt(i5), end: dt(i5) + Math.round(i5.getBoundingClientRect().height) },
                headerOnThreshold: ch - q('.header').getBoundingClientRect().height / 2,
                headerHeight: q('.header').getBoundingClientRect().height };
  out.index2.anchor1 = dt(i2) - ch / 3;
  out.index2.anchor2 = dt(i2) + Math.round(q('.index2 .wrap .fist:first-child').getBoundingClientRect().height);
  out.publicText = [...document.querySelectorAll('.public_text')].filter(e => e.offsetParent !== null && getComputedStyle(e).display !== 'none').map(e => {
    const ps = [...e.querySelectorAll('.p:first-child p')]; const len = ps.length;
    const speed = e.getAttribute('data-speed'); const dis = speed ? speed * 1 : 200; const all = dis * len;
    const oj = window.jQuery ? window.jQuery(e).offset().top : dt(e);
    const start = oj - (ch / 1.2);
    return { cls: e.className, section: e.closest('section') ? e.closest('section').className : null, len, dis, all, jqOffsetTop: Math.round(oj), start: Math.round(start), end: Math.round(start + all), ban: Math.round(all / len) };
  });
  return out;
};
window.__probe = () => {
  const q = s => document.querySelector(s);
  const g = (s, props) => { const e = q(s); if (!e) return null; const c = getComputedStyle(e); const o = {}; props.forEach(k => o[k] = c.getPropertyValue(k)); return o; };
  const cs = (e, props) => { const c = getComputedStyle(e); const o = {}; props.forEach(k => o[k] = c.getPropertyValue(k)); return o; };
  return {
    y: window.__y(), theme: document.body.id || '(light)',
    headerCls: q('.header').className, headerInline: q('.header').getAttribute('style'),
    fixedSideCls: q('.fixed_side') ? q('.fixed_side').className : null,
    bannerParallax: q('.banner .parallax') ? getComputedStyle(q('.banner .parallax')).display : null,
    entrance: { logo: q('.header .logo').className, nav: [...document.querySelectorAll('.header .nav li')].map(e => ({ n: getComputedStyle(e).animationName, d: getComputedStyle(e).animationDelay, dur: getComputedStyle(e).animationDuration })), sun: { cls: q('.header .r .sun').className, d: getComputedStyle(q('.header .r .sun')).animationDelay }, out: { cls: q('.header .r .outdated svg').className, d: getComputedStyle(q('.header .r .outdated svg')).animationDelay }, logoD: getComputedStyle(q('.header .logo')).animationDelay },
    eachAnimate: [...document.querySelectorAll('.each_animate')].map(e => ({ cls: e.className, chars: [...e.children].map(c => ({ t: c.textContent, o: getComputedStyle(c).opacity, tr: getComputedStyle(c).transform, d: getComputedStyle(c).transitionDelay, dur: getComputedStyle(c).transitionDuration, tf: getComputedStyle(c).transitionTimingFunction, mnw: getComputedStyle(c).minWidth })) })),
    publicText: [...document.querySelectorAll('.public_text')].filter(e => e.offsetParent !== null).map(e => ({ cls: e.className, section: e.closest('section').className, ps: [...e.querySelectorAll('.p:first-child p')].map(p => ({ clip: getComputedStyle(p).clipPath, txt: p.textContent.trim().slice(0, 16) })), containerClip: getComputedStyle(e.querySelector('.p:first-child')).clipPath })),
    index1: { inline: [...document.querySelectorAll('.index1 .inline .swiper .swiper-slide')].map(s => ({ cls: s.className, t: s.innerText.replace(/\s+/g, ' ').trim().slice(0, 18) })), wallWrapper0: cs(q('.index1 .content .picture .img .swiper .swiper-wrapper'), ['transform','transitionDuration']), wallCount: document.querySelectorAll('.index1 .content .picture .img .swiper .swiper-slide').length },
    index2: { parallaxPosImg: cs(q('.index2 .position_img.position_img1'), ['transform']), f1: cs(q('.index2 .wrap .fist:first-child .flex:first-child'), ['transform']), f2: cs(q('.index2 .wrap .fist:first-child .flex:nth-child(2)'), ['transform']), f3: cs(q('.index2 .wrap .fist:last-child .flex:first-child'), ['transform']), f4: cs(q('.index2 .wrap .fist:last-child .flex:nth-child(2)'), ['transform']) },
    index3: { wrapDisplay: getComputedStyle(q('.index3 .wrap')).display, pictureDisplay: q('.index3 .wrap .content .picture') ? getComputedStyle(q('.index3 .wrap .content .picture')).display : null, canvasChildren: q('#canvas') ? q('#canvas').children.length : null, canvasTag: q('#canvas') ? q('#canvas').firstElementChild ? q('#canvas').firstElementChild.tagName : '(empty)' : null, canvasSideCls: q('.canvasSide') ? q('.canvasSide').className : null, canvasSideDisplay: q('.canvasSide') ? getComputedStyle(q('.canvasSide')).display : null, itemClasses: [...document.querySelectorAll('.index3 .wrap .content .item')].map(e => e.className), moveTransform: q('.index3 .wrap .content .move') ? getComputedStyle(q('.index3 .wrap .content .move')).transform : null, moveTransition: q('.index3 .wrap .content .move') ? getComputedStyle(q('.index3 .wrap .content .move')).transition : null, moveH: q('.index3 .wrap .content .move') ? Math.round(q('.index3 .wrap .content .move').getBoundingClientRect().height) : null, itemH: q('.index3 .wrap .content .item') ? Math.round(q('.index3 .wrap .content .item').getBoundingClientRect().height) : null, videos: [...document.querySelectorAll('.index3 .wrap .content .picture video')].map(v => ({ c: v.className, paused: v.paused, t: Math.round(v.currentTime * 100) / 100, o: getComputedStyle(v).opacity, tr: getComputedStyle(v).transitionDuration, d: Math.round((v.duration || 0) * 100) / 100, muted: v.muted })), attrColors: [...document.querySelectorAll('.index3 .wrap .content .item')].map(it => ({ blue: getComputedStyle(it.querySelector('.blue') || it).color, h1: getComputedStyle(it.querySelector('.h1') || it).color, textO: getComputedStyle(it.querySelector('.text') || it).opacity, attrP: getComputedStyle(it.querySelector('.attr p')).transform, attrAfter: getComputedStyle(it.querySelector('.attr'), '::after').transform })), canvasAlertCls: q('.canvas_alert') ? q('.canvas_alert').className : null, canvasAlertOpacity: q('.canvas_alert') ? getComputedStyle(q('.canvas_alert')).opacity : null, canvasMatterOn: [...document.querySelectorAll('.canvas_alert .matter')].map(m => ({ cls: m.className, o: getComputedStyle(m).opacity, tf: getComputedStyle(m).transform })) },
    index4: { sectionH: Math.round(q('.index4').getBoundingClientRect().height), sectionInline: q('.index4').getAttribute('style'), maskDelay: getComputedStyle(q('.index4 .mask')).animationDelay, maskTf: getComputedStyle(q('.index4 .mask')).transform, maskPlay: getComputedStyle(q('.index4 .mask')).animationPlayState, bgTf: getComputedStyle(q('.index4 .bg')).transform, bgH: Math.round(q('.index4 .bg').getBoundingClientRect().height), fixInline: q('.index4 .fix').getAttribute('style'), fixTf: getComputedStyle(q('.index4 .fix')).transform, fixVpTop: Math.round(q('.index4 .fix').getBoundingClientRect().top), t1: { o: getComputedStyle(q('.index4 .text:nth-child(1) > div')).opacity, sc: getComputedStyle(q('.index4 .text:nth-child(1) p')).transform, vpTop: Math.round(q('.index4 .text:nth-child(1) > div').getBoundingClientRect().top) }, t2: { o: getComputedStyle(q('.index4 .text:nth-child(2) > div')).opacity, sc: getComputedStyle(q('.index4 .text:nth-child(2) p')).transform, vpTop: Math.round(q('.index4 .text:nth-child(2) > div').getBoundingClientRect().top) }, fixAfterOpacity: getComputedStyle(q('.index4 .fix'), '::after').opacity },
    index5: { dataViews: [...q('.index5').querySelectorAll('[data-view]')].map(e => ({ v: e.getAttribute('data-view'), inline: e.getAttribute('style'), o: getComputedStyle(e).opacity, tf: getComputedStyle(e).transform })) },
    aos: { total: document.querySelectorAll('[aos]').length, anim: [...document.querySelectorAll('[aos]')].filter(e => e.classList.contains('aos-animate')).length, rows: [...document.querySelectorAll('[aos]')].map(e => ({ cls: e.className.slice(0, 40), ao: e.getAttribute('aos'), dl: e.getAttribute('aos-delay'), an: e.classList.contains('aos-animate'), o: getComputedStyle(e).opacity, tf: getComputedStyle(e).transform, dur: getComputedStyle(e).transitionDuration, tf2: getComputedStyle(e).transitionTimingFunction, td: getComputedStyle(e).transitionDelay })) },
    cursor: { t: cs(q('.fixed_cursor .cursor'), ['transform']), style: q('.fixed_cursor .cursor').getAttribute('style'), blendOuter: getComputedStyle(q('.fixed_cursor')).mixBlendMode, outerZ: getComputedStyle(q('.fixed_cursor')).zIndex, opacity: getComputedStyle(q('.fixed_cursor .cursor')).opacity, dotO: getComputedStyle(q('.fixed_cursor .cursor .whole'), '::after').opacity, ringTf: getComputedStyle(q('.fixed_cursor .cursor .whole'), '::before').transform, bors: [...document.querySelectorAll('.fixed_cursor .cursor .whole .bor')].map(b => ({ cls: b.className, tf: getComputedStyle(b).transform, o: getComputedStyle(b).opacity })) },
    vars: { gsap: window.gsap ? window.gsap.version : null, jquery: window.jQuery ? window.jQuery.fn.jquery : null, swiper: window.Swiper ? window.Swiper.version : null, scale: typeof window.anime },
  };
};
`;

async function setup(browser, W, H, DPR, forceLight) {
  const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: DPR, locale: "zh-CN" });
  if (forceLight) {
    await ctx.addInitScript(() => { try { sessionStorage.setItem('ifTime', 'false'); sessionStorage.removeItem('Pattern'); } catch (e) {} });
  }
  const page = await ctx.newPage();
  const logs = [];
  page.on("console", m => { if (m.type() === "error" || m.type() === "warning") logs.push(m.type() + ": " + m.text()); });
  page.on("pageerror", e => logs.push("pageerror: " + (e && e.message)));
  await page.goto(URL, { waitUntil: "load", timeout: 90000 });
  await page.waitForTimeout(4000);
  return { page, logs };
}

async function kick(page) {
  await page.mouse.move(720, 450);
  await page.mouse.wheel(0, 900);
  await page.waitForTimeout(1500);
  await page.evaluate(HELPERS);
  await page.evaluate(() => window.__sb().update());
  await page.waitForTimeout(600);
  await page.mouse.move(720, 450);
  await page.mouse.wheel(0, -700);
  await page.waitForTimeout(1500);
}

(async () => {
  const mode = process.argv[2];
  const outDir = process.argv[3];
  const forceLight = process.argv[4] !== "dark";
  const browser = await chromium.launch({ executablePath: CHROME, headless: true });
  const W = 1440, H = 900, DPR = 1;
  const { page, logs } = await setup(browser, W, H, DPR, forceLight);
  await page.evaluate(HELPERS);
  await kick(page);
  const ranges = await page.evaluate(() => window.__ranges());
  fs.mkdirSync(outDir, { recursive: true });
  const result = { meta: { url: URL, viewport: { w: W, h: H }, dpr: DPR, mode, forceLight, theme: await page.evaluate(() => document.body.id || '(light)'), limit: await page.evaluate(() => window.__limit()), logs }, ranges, samples: [] };

  const snap = async (label, y) => {
    if (y !== null && y !== undefined) { await page.evaluate(async (yy) => { window.__setY(yy); await new Promise(r => setTimeout(r, 1300)); }, y); }
    const st = await page.evaluate(() => window.__probe());
    const f = path.join(outDir, label + ".png");
    await page.screenshot({ path: f });
    result.samples.push({ label, requestedY: y, state: st });
    return st;
  };

  if (mode === "global") {
    const L = result.meta.limit;
    for (const pct of [0, 30, 50, 70, 100]) await snap(`global-${String(pct).padStart(3, '0')}`, Math.round(L * pct / 100));
  }

  if (mode === "publictext") {
    // index1 title (live), index2 blue (live), index3 title (hidden on homepage, forced visible)
    for (let i = 0; i < ranges.publicText.length; i++) {
      const r = ranges.publicText[i];
      for (const pct of [0, 30, 50, 70, 100]) await snap(`pt${i + 1}-${String(pct).padStart(3, '0')}`, Math.round(r.start + (r.end - r.start) * pct / 100));
    }
  }

  if (mode === "index2") {
    const r = ranges.index2;
    for (const pct of [0, 30, 50, 70, 100]) await snap(`index2-${String(pct).padStart(3, '0')}`, Math.round(r.start + (r.end - r.start) * pct / 100));
  }

  if (mode === "index4") {
    const r = ranges.index4;
    for (const pct of [0, 30, 50, 70, 100]) await snap(`index4-${String(pct).padStart(3, '0')}`, Math.round(r.start + (r.end - r.start) * pct / 100));
  }

  if (mode === "index5") {
    const r = ranges.index5;
    for (const pct of [0, 30, 50, 70, 100]) await snap(`index5-${String(pct).padStart(3, '0')}`, Math.round(Math.max(0, r.start - 400) + (r.end - r.start) * pct / 100));
  }

  if (mode === "header") {
    await snap("hdr-00-load", 0);
    const t = ranges.headerOnThreshold;
    await snap("hdr-01-below-" + Math.round(t - 100), Math.round(t - 100));
    await snap("hdr-02-above-" + Math.round(t + 1), Math.round(t + 1));
    await snap("hdr-03-deep-3000", 3000);
    await page.mouse.move(720, 450);
    await page.mouse.wheel(0, -700); await page.waitForTimeout(1400);
    await snap("hdr-04-wheelup", null);
    await page.mouse.wheel(0, 700); await page.waitForTimeout(1400);
    await snap("hdr-05-wheeldown", null);
  }

  if (mode === "cursor") {
    await snap("cur-00-rest", 0);
    await page.mouse.move(300, 300); await page.waitForTimeout(250); await snap("cur-01-moveA-250ms", null);
    await page.waitForTimeout(1000); await snap("cur-02-moveA-settled", null);
    await page.mouse.move(1100, 700); await page.waitForTimeout(250); await snap("cur-03-moveB-250ms", null);
    await page.waitForTimeout(1200); await snap("cur-04-moveB-settled", null);
    await page.mouse.down(); await page.waitForTimeout(80); await snap("cur-05-mousedown", null);
    await page.mouse.up(); await page.waitForTimeout(20); await snap("cur-06-mouseup-ripple", null);
    await page.waitForTimeout(260); await snap("cur-07-ripple-hide", null);
    await page.waitForTimeout(600); await snap("cur-08-ripple-removed", null);
    // hover_button (magnetic) — the .circle.hover_button
    await page.evaluate(() => { const e = document.querySelector('.hover_button'); if (e) e.scrollIntoView(); });
    await page.waitForTimeout(600);
    const bb = await page.evaluate(() => { const e = document.querySelector('.hover_button'); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width, h: r.height, ds: e.getAttribute('data-speed') }; });
    result.hoverButton = bb;
    await page.mouse.move(bb.x - 30, bb.y - 20); await page.waitForTimeout(1200);
    await snap("hb-00-enter", null);
    await page.mouse.move(bb.x + 30, bb.y + 20); await page.waitForTimeout(1000);
    await snap("hb-01-inside", null);
    const hbState = await page.evaluate(() => { const e = document.querySelector('.hover_button'); return { tf: getComputedStyle(e).transform, style: e.getAttribute('style') }; });
    result.hoverButtonInside = hbState;
  }

  if (mode === "entrance") {
    await page.evaluate(() => window.__setY(0));
    await page.reload({ waitUntil: "load" });
    const t0 = Date.now();
    await page.evaluate(HELPERS);
    let last = 0;
    for (const wait of [200, 400, 700, 1000, 1600, 2200, 3200, 4500]) {
      const dt = wait - (Date.now() - t0); if (dt > 0) await page.waitForTimeout(dt);
      if (!(await page.evaluate(() => !!window.__probe))) await page.evaluate(HELPERS);
      const st = await page.evaluate(() => { const p = window.__probe(); return { entrance: p.entrance, eachAnimate: p.eachAnimate, theme: p.theme }; });
      const f = path.join(outDir, `ent-${String(wait).padStart(4, '0')}ms.png`);
      await page.screenshot({ path: f });
      result.samples.push({ label: `t${wait}ms`, actualMs: Date.now() - t0, state: st });
      last = wait;
    }
  }

  if (mode === "banner") {
    await page.evaluate(HELPERS);
    const t0 = Date.now();
    for (const wait of [300, 2000, 4000, 5000, 9000, 30000, 60000]) {
      const dt = wait - (Date.now() - t0); if (dt > 0) await page.waitForTimeout(dt);
      const st = await page.evaluate(() => {
        const q = s => document.querySelector(s);
        const v = q('.banner .swiper .swiper-slide:first-child video');
        return { slides: [...document.querySelectorAll('.banner .swiper .swiper-slide')].map(s => ({ cls: s.className, o: getComputedStyle(s).opacity, tr: getComputedStyle(s).transitionDuration, tf: getComputedStyle(s).transform })), swiperCls: q('.banner .swiper').className, video: v ? { t: Math.round(v.currentTime * 100) / 100, d: Math.round(v.duration * 100) / 100, paused: v.paused, muted: v.muted, loop: v.loop, autoplay: v.autoplay } : null, autoplayDelay: window.jQuery ? null : null };
      });
      const f = path.join(outDir, `banner-${String(wait).padStart(5, '0')}ms.png`);
      await page.screenshot({ path: f });
      result.samples.push({ label: `t${wait}ms`, actualMs: Date.now() - t0, state: st });
    }
  }

  if (mode === "index1swiper") {
    await page.evaluate(async (y) => { window.__setY(y); await new Promise(r => setTimeout(r, 800)); }, ranges.index1.start + 150);
    const t0 = Date.now();
    for (const w of [0, 1200, 2400, 3600, 4800, 6000, 7200, 8400]) {
      const dt = w - (Date.now() - t0); if (dt > 0) await page.waitForTimeout(dt);
      const st = await page.evaluate(() => window.__probe().index1);
      const f = path.join(outDir, `index1-${String(w).padStart(4, '0')}ms.png`);
      await page.screenshot({ path: f });
      result.samples.push({ label: `t${w}ms`, actualMs: Date.now() - t0, state: st });
    }
  }

  if (mode === "index3") {
    // live as-is: canvas + canvasSide + canvas_alert
    await page.evaluate(async (y) => { window.__setY(y); await new Promise(r => setTimeout(r, 1300)); }, ranges.index3.start + 50);
    await snap("i3-00-asLoaded", null);
    await page.evaluate(() => { const e = document.querySelector('.canvasSide .flex .item'); if (e) e.click(); });
    await page.waitForTimeout(700); await snap("i3-01-click-item1-700ms", null);
    await page.waitForTimeout(1300); await snap("i3-02-click-item1-2000ms", null);
    await page.evaluate(() => { document.querySelectorAll('.canvasSide .flex .item')[1].click(); });
    await page.waitForTimeout(2000); await snap("i3-03-click-item2-2000ms", null);
    await page.evaluate(() => { document.querySelectorAll('.canvasSide .flex .item')[2].click(); });
    await page.waitForTimeout(2000); await snap("i3-04-click-item3-2000ms", null);
    await page.evaluate(() => { document.querySelector('.canvas_alert .content .matter .close').click(); });
    await page.waitForTimeout(700); await snap("i3-05-close-700ms", null);
    await page.waitForTimeout(1400); await snap("i3-06-close-2100ms", null);
    // experiment: force the hidden .wrap switcher visible and drive it
    await page.addStyleTag({ content: '.index3 .wrap{display:block !important} .index3 .wrap .content .picture{display:block !important}' });
    await page.waitForTimeout(500);
    result.forcedWrap = await page.evaluate(() => window.__probe().index3);
    await page.evaluate(() => { document.querySelector('#canvas').style.display = 'none'; });
    await page.waitForTimeout(300);
    await snap("i3-10-wrap-forced-item1", null);
    const nItems = await page.evaluate(() => document.querySelectorAll('.index3 .wrap .content .item').length);
    result.forcedItemCount = nItems;
    const nVideos = await page.evaluate(() => document.querySelectorAll('.index3 .wrap .content .picture video').length);
    result.forcedVideoCount = nVideos;
    for (let i = 1; i < nItems; i++) {
      await page.evaluate((idx) => { document.querySelectorAll('.index3 .wrap .content .item')[idx].click(); }, i);
      await page.waitForTimeout(900);
      await snap(`i3-1${i + 1}-wrap-click-item${i + 1}`, null);
    }
  }

  fs.writeFileSync(path.join(outDir, "..", `capture-${mode}.json`), JSON.stringify(result, null, 2), "utf8");
  await browser.close();
  console.log("DONE " + mode + " theme=" + result.meta.theme + " limit=" + result.meta.limit);
})().catch(e => { console.error("FATAL", e && e.stack || e); process.exit(1); });

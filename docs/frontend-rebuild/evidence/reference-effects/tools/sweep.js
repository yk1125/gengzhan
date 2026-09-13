const { chromium } = require("playwright-core");
const fs = require("fs");
const path = require("path");
const CHROME = "C:/Users/yk/AppData/Local/Google/Chrome/Application/chrome.exe";
const URL = "https://www.seniorweb.cn/";

const HELPERS = `
window.__sb = () => window.Scrollbar && window.Scrollbar.get(document.querySelector('#my-scrollbar'));
window.__setY = (y) => { const s = window.__sb(); if (!s) { window.scrollTo(0,y); return; } s.scrollTo(0, y, 0); };
window.__y = () => { const s = window.__sb(); return s ? s.scrollTop : window.scrollY; };
window.__limit = () => { const s = window.__sb(); return s ? s.limit.y : (document.documentElement.scrollHeight - window.innerHeight); };
window.__snap = () => {
  const q = s => document.querySelector(s);
  const g = (s, props) => { const e = q(s); if (!e) return null; const c = getComputedStyle(e); const o = {}; props.forEach(k => o[k] = c.getPropertyValue(k)); const r = e.getBoundingClientRect(); o._vpTop = Math.round(r.top); o._h = Math.round(r.height); o._w = Math.round(r.width); o._inline = e.getAttribute('style') || ''; return o; };
  const box = s => { const e = q(s); if (!e) return null; const r = e.getBoundingClientRect(); return { docTop: Math.round(r.top + window.__y()), vpTop: Math.round(r.top), h: Math.round(r.height), w: Math.round(r.width), inline: e.getAttribute('style') || '' }; };
  return {
    y: window.__y(), limit: window.__limit(),
    header: q('.header') ? { cls: q('.header').className, top: Math.round(q('.header').getBoundingClientRect().top), h: q('.header').getBoundingClientRect().height } : null,
    fixedSide: q('.fixed_side') ? q('.fixed_side').className : null,
    index4: {
      section: box('.index4'), fix: box('.index4 .fix'),
      fixStyle: g('.index4 .fix', ['transform','filter','position','top']),
      mask: g('.index4 .mask', ['animationDelay','transform','display','opacity']),
      bg: g('.index4 .bg', ['transform','height']),
      textDiv: g('.index4 .text > div', ['opacity','transform']),
      textP: g('.index4 .text p', ['opacity','transform','fontSize']),
    },
    index2: {
      f1: g('.index2 .wrap .fist:first-child .flex:first-child', ['transform']),
      f2: g('.index2 .wrap .fist:first-child .flex:nth-child(2)', ['transform']),
      f3: g('.index2 .wrap .fist:last-child .flex:first-child', ['transform']),
      f4: g('.index2 .wrap .fist:last-child .flex:nth-child(2)', ['transform']),
      right: g('.index2 .wrap .fist:first-child .flex:first-child .item .right', ['transform']),
    },
    index3: {
      move: g('.index3 .wrap .content .move', ['transform','transition']),
      moveInline: q('.index3 .wrap .content .move') ? q('.index3 .wrap .content .move').getAttribute('style') : null,
      itemTop: box('.index3 .wrap .content .item'),
      videoOn: [...document.querySelectorAll('.picture .animate_video video')].map(v => v.className).join('|'),
      videoStates: [...document.querySelectorAll('.picture .animate_video video')].map(v => ({ c: v.className, paused: v.paused, t: Math.round(v.currentTime*100)/100 })),
      itemOn: [...document.querySelectorAll('.index3 .wrap .content .item')].map(e => e.className),
      attrText: [...document.querySelectorAll('.index3 .wrap .content .item .attr')].map(e => e.getAttribute('data-text')),
    },
    publicText: [...document.querySelectorAll('.public_text')].filter(e => getComputedStyle(e).display !== 'none').map(e => {
      const ps = [...e.querySelectorAll('.p:first-child p')];
      return { cls: e.className, speed: e.getAttribute('data-speed'), count: ps.length, clips: ps.map(p => getComputedStyle(p).clipPath), offsetTop: Math.round(e.getBoundingClientRect().top + window.__y()), containerClip: getComputedStyle(e.querySelector('.p:first-child') || e).clipPath };
    }),
    aos: { total: document.querySelectorAll('[aos]').length, animated: [...document.querySelectorAll('[aos]')].filter(e => e.classList.contains('aos-animate')).map(e => ({ cls: e.className, transform: getComputedStyle(e).transform, opacity: getComputedStyle(e).opacity, top: Math.round(e.getBoundingClientRect().top) })) },
    sections: [...document.querySelectorAll('section')].map(s => ({ cls: s.className, docTop: Math.round(s.getBoundingClientRect().top + window.__y()), h: Math.round(s.getBoundingClientRect().height) })),
    banner: {
      slideClasses: [...document.querySelectorAll('.banner .swiper .swiper-slide')].map(s => s.className),
      video: (v => v ? { paused: v.paused, t: Math.round(v.currentTime*100)/100, d: Math.round(v.duration*100)/100, readyState: v.readyState } : null)(q('.banner .swiper .swiper-slide:first-child video')),
      parallaxDisplay: q('.banner .parallax') ? getComputedStyle(q('.banner .parallax')).display : null,
      slidesOpacity: [...document.querySelectorAll('.banner .swiper .swiper-slide')].map(s => getComputedStyle(s).opacity),
    },
    index1: { inlineSlides: [...document.querySelectorAll('.index1 .inline .swiper .swiper-slide')].map(s => ({ cls: s.className, t: s.innerText.replace(/\s+/g,' ').trim().slice(0,20) })), wallTransforms: [...document.querySelectorAll('.index1 .content .picture .img .swiper')].slice(0,3).map(s => getComputedStyle(s.querySelector('.swiper-wrapper')||s).transform) },
  };
};
`;

(async () => {
  const outFile = process.argv[2];
  const shotDir = process.argv[3];
  const W = Number(process.argv[4] || 1440), H = Number(process.argv[5] || 900), DPR = Number(process.argv[6] || 1);
  const ys = JSON.parse(process.argv[7] || "[]");
  const browser = await chromium.launch({ executablePath: CHROME, headless: true });
  const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: DPR, locale: "zh-CN" });
  const page = await ctx.newPage();
  const logs = [];
  page.on("console", m => { if (m.type() === "error") logs.push(m.text()); });
  await page.goto(URL, { waitUntil: "load", timeout: 90000 });
  await page.waitForTimeout(7000);
  await page.evaluate(HELPERS);

  // kick layout (index4 height applies only after first scroll)
  await page.evaluate(async () => { window.__setY(1); await new Promise(r => setTimeout(r, 1200)); });
  const limit = await page.evaluate(() => window.__limit());
  const out = { meta: { viewport: { w: W, h: H }, dpr: DPR, limitAfterKick: limit, logs }, samples: [] };
  fs.mkdirSync(shotDir, { recursive: true });

  const targetYs = ys.length ? ys : [0, Math.round(limit*0.3), Math.round(limit*0.5), Math.round(limit*0.7), limit];
  let prev = null;
  for (let i = 0; i < targetYs.length; i++) {
    const target = targetYs[i];
    if (prev !== null && target < prev) { await page.evaluate(async () => { window.__setY(0); await new Promise(r => setTimeout(r, 900)); }); }
    await page.evaluate(async (yy) => { window.__setY(yy); await new Promise(r => setTimeout(r, 1800)); }, target);
    const snap = await page.evaluate(() => window.__snap());
    snap.target = target;
    const f = path.join(shotDir, `y${String(target).padStart(6,'0')}.png`);
    await page.screenshot({ path: f });
    snap.shot = f;
    out.samples.push(snap);
    prev = target;
  }
  const l2 = await page.evaluate(() => window.__limit());
  out.meta.limitAtEnd = l2;
  fs.writeFileSync(outFile, JSON.stringify(out, null, 2), "utf8");
  await browser.close();
  console.log("DONE " + outFile + " limit=" + limit);
})().catch(e => { console.error("FATAL", e && e.stack || e); process.exit(1); });

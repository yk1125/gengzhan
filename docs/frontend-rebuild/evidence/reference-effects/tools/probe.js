const { chromium } = require("playwright-core");
const fs = require("fs");
const CHROME = "C:/Users/yk/AppData/Local/Google/Chrome/Application/chrome.exe";
const URL = "https://www.seniorweb.cn/";

async function newPage(browser, w, h, dpr) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: dpr, locale: "zh-CN" });
  const page = await ctx.newPage();
  const logs = [];
  page.on("console", m => { if (m.type() === "error" || m.type() === "warning") logs.push(m.type() + ": " + m.text()); });
  page.on("pageerror", e => logs.push("pageerror: " + (e && e.message)));
  await page.goto(URL, { waitUntil: "load", timeout: 90000 });
  await page.waitForTimeout(7000);
  return { ctx, page, logs };
}

const HELPERS = `
window.__sb = () => window.Scrollbar && window.Scrollbar.get(document.querySelector('#my-scrollbar'));
window.__setY = (y) => { const s = window.__sb(); if (!s) { window.scrollTo(0,y); return; } s.scrollTo(0, y, 0); };
window.__y = () => { const s = window.__sb(); return s ? s.scrollTop : window.scrollY; };
window.__limit = () => { const s = window.__sb(); return s ? s.limit.y : (document.documentElement.scrollHeight - window.innerHeight); };
window.__cs = (sel, props) => { const e = document.querySelector(sel); if (!e) return null; const c = getComputedStyle(e); const o = {}; props.forEach(p => o[p] = c.getPropertyValue(p)); o.__rect = (r => ({top: Math.round(r.top), left: Math.round(r.left), w: Math.round(r.width), h: Math.round(r.height)}))(e.getBoundingClientRect()); o.__offsetTop = e.getBoundingClientRect().top + window.__y(); o.__style = e.getAttribute('style') || ''; return o; };
window.__box = (sel) => { const e = document.querySelector(sel); if (!e) return null; const r = e.getBoundingClientRect(); return { top: Math.round(r.top + window.__y()), viewportTop: Math.round(r.top), h: Math.round(r.height), w: Math.round(r.width), inline: e.getAttribute('style')||'' }; };
`;

(async () => {
  const mode = process.argv[2];
  const outFile = process.argv[3];
  const browser = await chromium.launch({ executablePath: CHROME, headless: true });
  const W = Number(process.argv[4] || 1440), H = Number(process.argv[5] || 900), DPR = Number(process.argv[6] || 1);
  const { ctx, page, logs } = await newPage(browser, W, H, DPR);
  await page.addInitScript(""); // noop
  await page.evaluate(HELPERS);

  const result = { meta: { url: URL, viewport: { w: W, h: H }, dpr: DPR, mode }, logs };

  if (mode === "static") {
    result.static = await page.evaluate(() => {
      const q = s => document.querySelector(s);
      const num = v => Math.round(v * 1000) / 1000;
      const r = {};
      r.limitY = window.__limit();
      r.docScrollHeight = document.documentElement.scrollHeight;
      r.innerHeight = window.innerHeight;
      r.headerHeight = q('.header') ? num(q('.header').getBoundingClientRect().height) : null;
      r.headerClass = q('.header') ? q('.header').className : null;
      r.hasIndexId = !!q('#index');
      r.indexSections = [...document.querySelectorAll('section')].map(s => ({ cls: s.className, top: Math.round(s.getBoundingClientRect().top + window.__y()), h: Math.round(s.getBoundingClientRect().height) }));

      // each_animate
      r.eachAnimate = [...document.querySelectorAll('.each_animate')].map(e => ({
        text: e.textContent.slice(0, 24),
        cls: e.className,
        childCount: e.children.length,
        childTags: [...new Set([...e.children].map(c => c.tagName))],
        firstChildren: [...e.children].slice(0, 3).map(c => ({ style: c.getAttribute('style') || '', tag: c.tagName, txt: c.textContent })),
        delay3: e.children[3] ? getComputedStyle(e.children[3]).transitionDelay : null,
        trans: e.children[1] ? getComputedStyle(e.children[1]).transition : null,
        onOpacity: e.children[1] ? getComputedStyle(e.children[1]).opacity : null,
        onTransform: e.children[1] ? getComputedStyle(e.children[1]).transform : null,
      }));

      // public_text
      r.publicText = [...document.querySelectorAll('.public_text')].map(e => ({
        cls: e.className, speed: e.getAttribute('data-speed'),
        visible: getComputedStyle(e).display !== 'none',
        pContainer: e.querySelector('.p:first-child') ? { count: e.querySelectorAll('.p:first-child p').length, clip: getComputedStyle(e.querySelector('.p:first-child')).clipPath } : null,
        firstP: e.querySelector('.p:first-child p') ? { clip: getComputedStyle(e.querySelector('.p:first-child p')).clipPath, text: e.querySelector('.p:first-child p').textContent.trim().slice(0,30) } : null,
      }));

      // magnetic / hover_button
      r.magnets = [...document.querySelectorAll('.magnetic')].map(e => ({ cls: e.className, speed: e.getAttribute('data-speed') }));
      r.hoverButtons = [...document.querySelectorAll('.hover_button')].map(e => ({ cls: e.className, speed: e.getAttribute('data-speed') }));

      // cursor
      r.cursor = [...document.querySelectorAll('.cursor')].map(e => ({ cls: e.className, speed: e.getAttribute('data-speed'), parent: e.parentElement.className, display: getComputedStyle(e.parentElement).display, mixBlend: getComputedStyle(e).mixBlendMode, transform: getComputedStyle(e).transform, style: e.getAttribute('style')||'' }));

      // index4
      r.index4 = {
        section: window.__box('.index4'),
        fix: window.__box('.index4 .fix'),
        fixStyle: q('.index4 .fix') ? q('.index4 .fix').getAttribute('style') : null,
        fixTransform: q('.index4 .fix') ? getComputedStyle(q('.index4 .fix')).transform : null,
        mask: window.__cs('.index4 .mask', ['animation-name','animation-duration','animation-timing-function','animation-delay','animation-play-state','animation-fill-mode','transform','display']),
        bg: window.__cs('.index4 .bg', ['height','transform','object-fit','position']),
        textWrapper: window.__cs('.index4 .text > div', ['opacity','transform']),
        textP: window.__cs('.index4 .text p', ['opacity','transform','font-size']),
        scene: window.__cs('.index4 .scene', ['display','transform']),
      };

      // videos
      r.videos = [...document.querySelectorAll('video')].map(v => ({
        cls: v.className, parent: v.parentElement.className, src: (v.currentSrc || v.src || '').split('/').slice(-1)[0],
        muted: v.muted, autoplay: v.autoplay, loop: v.loop, paused: v.paused, readyState: v.readyState,
        networkState: v.networkState, duration: v.duration, currentTime: Math.round(v.currentTime * 100) / 100,
        display: getComputedStyle(v.parentElement).display, playsinline: v.playsInline,
        complete: v.readyState >= 3,
      }));
      r.bannerSwiper = q('.banner .swiper') ? { cls: q('.banner .swiper').className, slides: document.querySelectorAll('.banner .swiper .swiper-slide').length, activeIndexClass: [...document.querySelectorAll('.banner .swiper .swiper-slide')].map(s => s.className) } : null;
      r.inlineSwiperSlides = document.querySelectorAll('.index1 .inline .swiper .swiper-slide').length;
      r.pictureSwipers = document.querySelectorAll('.index1 .content .picture .img .swiper').length;
      r.pictureSlidesPerSwiper = [...document.querySelectorAll('.index1 .content .picture .img .swiper')].map(s => s.querySelectorAll('.swiper-slide').length);
      r.sjPicture = !!q('.index1 .content .picture.sj_picture');
      r.orbCanvas = !!q('.orb-canvas');
      r.canvasAlert = q('.canvas_alert') ? { display: getComputedStyle(q('.canvas_alert')).display, html: q('.canvas_alert').innerHTML.slice(0, 200) } : null;
      r.dataViewCount = document.querySelectorAll('[data-view]').length;
      r.dataViewNodes = [...document.querySelectorAll('[data-view]')].map(e => ({ view: e.getAttribute('data-view'), distance: e.getAttribute('data-distance'), animate: e.getAttribute('data-animate'), scale: e.getAttribute('data-scale'), opacity: e.getAttribute('data-opacity'), x: e.getAttribute('data-x'), y: e.getAttribute('data-y'), blur: e.getAttribute('data-blur'), unit: e.getAttribute('data-unit'), parentSection: e.closest('section') ? e.closest('section').className : null, style: e.getAttribute('style')||'' }));
      r.aosNodes = [...document.querySelectorAll('[aos]')].map(e => ({ aos: e.getAttribute('aos'), delay: e.getAttribute('aos-delay'), cls: e.className })).slice(0, 40);
      r.index3 = { items: document.querySelectorAll('.index3 .wrap .content .item').length, itemH: q('.index3 .wrap .content .item') ? Math.round(q('.index3 .wrap .content .item').getBoundingClientRect().height) : null, moveTransform: q('.index3 .wrap .content .move') ? getComputedStyle(q('.index3 .wrap .content .move')).transform : null, moveStyle: q('.index3 .wrap .content .move') ? q('.index3 .wrap .content .move').getAttribute('style') : null, videoCount: document.querySelectorAll('.picture .animate_video video').length, videoClasses: [...document.querySelectorAll('.picture .animate_video video')].map(v => v.className) };
      r.index2 = { flexCount: document.querySelectorAll('.index2 .wrap .fist .flex').length, fistCount: document.querySelectorAll('.index2 .wrap .fist').length, firstFlexTransform: q('.index2 .wrap .fist:first-child .flex:first-child') ? getComputedStyle(q('.index2 .wrap .fist:first-child .flex:first-child')).transform : null, secondFlexTransform: q('.index2 .wrap .fist:first-child .flex:nth-child(2)') ? getComputedStyle(q('.index2 .wrap .fist:first-child .flex:nth-child(2)')).transform : null, itemCount: document.querySelectorAll('.index2 .wrap .fist .flex .item').length };
      r.index1 = { inlineTexts: q('.index1 .inline') ? q('.index1 .inline').innerText.slice(0,80) : null, centerTitle: q('.index1 .wrap .center .r .title') ? q('.index1 .wrap .center .r .title').innerText.slice(0,80) : null };
      r.linkTransition = q('.link_transition') ? { cls: q('.link_transition').className, circles: document.querySelectorAll('.link_transition .circle').length, display: getComputedStyle(q('.link_transition')).display, opacities: [...document.querySelectorAll('.link_transition .circle')].map(c => getComputedStyle(c).opacity) } : null;
      r.bodyCursorStyle = getComputedStyle(document.body).cursor;
      r.gsapVersion = window.gsap ? window.gsap.version : null;
      r.jqueryVersion = window.jQuery ? window.jQuery.fn.jquery : null;
      r.swiperVersion = window.Swiper && window.Swiper.version ? window.Swiper.version : null;
      r.bodyOpacity = getComputedStyle(document.body).opacity;
      r.bodyClass = document.body.className;
      return r;
    });
  }

  if (mode === "scroll") {
    const yStart = await page.evaluate(() => window.__y());
    result.yBeforeScroll = yStart;
    result.afterFirstScroll = await page.evaluate(async () => {
      window.__setY(1);
      await new Promise(r => setTimeout(r, 1200));
      const q = s => document.querySelector(s);
      return {
        y: window.__y(),
        limitY: window.__limit(),
        index4H: q('.index4') ? Math.round(q('.index4').getBoundingClientRect().height) : null,
        index4Inline: q('.index4') ? q('.index4').getAttribute('style') : null,
        maskDelay: q('.index4 .mask') ? getComputedStyle(q('.index4 .mask')).animationDelay : null,
        headerCls: q('.header') ? q('.header').className : null,
        aosAnimated: document.querySelectorAll('.aos-animate').length,
        aosInit: document.querySelectorAll('.aos-init').length,
        sectionTops: [...document.querySelectorAll('section')].map(s => ({ cls: s.className, top: Math.round(s.getBoundingClientRect().top + window.__y()), h: Math.round(s.getBoundingClientRect().height) })),
        bgH: q('.index4 .bg') ? Math.round(q('.index4 .bg').getBoundingClientRect().height) : null,
        fixStyle: q('.index4 .fix') ? q('.index4 .fix').getAttribute('style') : null,
      };
    });
  }

  if (mode === "at") {
    const y = Number(process.argv[7]);
    result.at = await page.evaluate(async (yy) => {
      window.__setY(0);
      await new Promise(r => setTimeout(r, 400));
      window.__setY(yy);
      await new Promise(r => setTimeout(r, 1600));
      const q = s => document.querySelector(s);
      const g = (s, p) => { const e = q(s); if (!e) return null; const c = getComputedStyle(e); const o = {}; p.forEach(k => o[k] = c.getPropertyValue(k)); return o; };
      return {
        actualY: window.__y(), limitY: window.__limit(),
        headerCls: q('.header') ? q('.header').className : null,
        fixedSide: q('.fixed_side') ? q('.fixed_side').className : null,
        index4: { h: Math.round(q('.index4').getBoundingClientRect().height), inline: q('.index4').getAttribute('style'), maskDelay: getComputedStyle(q('.index4 .mask')).animationDelay, maskTransform: getComputedStyle(q('.index4 .mask')).transform, bgTransform: getComputedStyle(q('.index4 .bg')).transform, fixTransform: q('.index4 .fix') ? getComputedStyle(q('.index4 .fix')).transform : null, fixInline: q('.index4 .fix') ? q('.index4 .fix').getAttribute('style') : null, textOpacity: q('.index4 .text > div') ? getComputedStyle(q('.index4 .text > div')).opacity : null, textScale: q('.index4 .text p') ? getComputedStyle(q('.index4 .text p')).transform : null },
        publicText: [...document.querySelectorAll('.public_text')].map(e => { const p = e.querySelector('.p:first-child p'); return { cls: e.className, clip: p ? getComputedStyle(p).clipPath : null, containerClip: getComputedStyle(e.querySelector('.p:first-child') || e).clipPath, display: getComputedStyle(e).display }; }),
        index2: { f1: q('.index2 .wrap .fist:first-child .flex:first-child') ? getComputedStyle(q('.index2 .wrap .fist:first-child .flex:first-child')).transform : null, f2: q('.index2 .wrap .fist:first-child .flex:nth-child(2)') ? getComputedStyle(q('.index2 .wrap .fist:first-child .flex:nth-child(2)')).transform : null, f3: q('.index2 .wrap .fist:last-child .flex:first-child') ? getComputedStyle(q('.index2 .wrap .fist:last-child .flex:first-child')).transform : null, f4: q('.index2 .wrap .fist:last-child .flex:nth-child(2)') ? getComputedStyle(q('.index2 .wrap .fist:last-child .flex:nth-child(2)')).transform : null },
        aosAnimatedCount: document.querySelectorAll('.aos-animate').length,
        aosTotal: document.querySelectorAll('[aos]').length,
        aosAnim: [...document.querySelectorAll('[aos]')].map(e => ({ aos: e.getAttribute('aos'), animated: e.classList.contains('aos-animate'), cls: e.className })),
        dataViewStates: [...document.querySelectorAll('[data-view]')].map(e => ({ view: e.getAttribute('data-view') || (e.closest('[data-view]') ? 'nested' : ''), style: e.getAttribute('style') || '', opacity: getComputedStyle(e).opacity, transform: getComputedStyle(e).transform, filter: getComputedStyle(e).filter })),
        cursorTransform: q('.fixed_cursor .cursor') ? getComputedStyle(q('.fixed_cursor .cursor')).transform : null,
      };
    }, y);
  }

  if (mode === "shots") {
    // scroll to percentages and screenshot
    const shots = [];
    const content = await page.evaluate(() => ({ limitY: window.__limit() }));
    result.limitY = content.limitY;
    await page.evaluate(() => window.__setY(0));
    for (const pct of [0, 30, 50, 70, 100]) {
      const y = Math.round(content.limitY * pct / 100);
      await page.evaluate(async (yy) => { window.__setY(yy); await new Promise(r => setTimeout(r, 1500)); }, y);
      const f = `${process.argv[7]}/scroll-${String(pct).padStart(3,'0')}.png`;
      await page.screenshot({ path: f });
      shots.push({ pct, y, file: f, actualY: await page.evaluate(() => window.__y()) });
    }
    result.shots = shots;
  }

  fs.writeFileSync(outFile, JSON.stringify(result, null, 2), "utf8");
  await browser.close();
  console.log("DONE " + outFile);
})().catch(e => { console.error("FATAL", e && e.stack || e); process.exit(1); });

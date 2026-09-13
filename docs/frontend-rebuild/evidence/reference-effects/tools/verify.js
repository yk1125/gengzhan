const { chromium } = require("playwright-core");
const CHROME = "C:/Users/yk/AppData/Local/Google/Chrome/Application/chrome.exe";
(async () => {
  const b = await chromium.launch({ executablePath: CHROME, headless: true });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, locale: "zh-CN" });
  await ctx.addInitScript(() => { try { sessionStorage.setItem('ifTime','false'); sessionStorage.removeItem('Pattern'); } catch(e){} });
  const p = await ctx.newPage();
  await p.goto("https://www.seniorweb.cn/", { waitUntil: "load", timeout: 90000 });
  await p.waitForTimeout(4000);
  const out = {};
  out.counts = await p.evaluate(() => ({ magnetic: document.querySelectorAll('.magnetic').length, hoverButton: document.querySelectorAll('.hover_button').length, orbCanvas: document.querySelectorAll('.orb-canvas').length, linkTransition: !!document.querySelector('.link_transition'), fixedCursor: document.querySelectorAll('.fixed_cursor').length, dataView: document.querySelectorAll('[data-view]').length, aos: document.querySelectorAll('[aos]').length }));
  out.footer = await p.evaluate(() => {
    const e = document.querySelector('.hover_button');
    const r = e.getBoundingClientRect(); const y = window.Scrollbar.get(document.querySelector('#my-scrollbar')).scrollTop;
    return { docTop: Math.round(r.top + y), w: Math.round(r.width), h: Math.round(r.height), offsetW: e.offsetWidth, offsetH: e.offsetHeight, ds: e.getAttribute('data-speed'), cls: e.className, transform: getComputedStyle(e).transform, transition: getComputedStyle(e).transition, willChange: getComputedStyle(e).willChange, cirAnim: (c => c ? { name: getComputedStyle(c).animationName, dur: getComputedStyle(c).animationDuration, tf: getComputedStyle(c).animationTimingFunction, iter: getComputedStyle(c).animationIterationCount } : null)(e.querySelector('.cir')) };
  });
  out.container = await p.evaluate(() => {
    const c = document.querySelector('.index1 .wrap .center #container');
    if (!c) return null;
    return { tag: c.tagName, cls: c.className, children: c.children.length, html: c.innerHTML.slice(0, 200), w: Math.round(c.getBoundingClientRect().width), h: Math.round(c.getBoundingClientRect().height), hasCanvas: !!c.querySelector('canvas') };
  });
  // scroll to footer and hover the button
  await p.evaluate(() => { const y = window.Scrollbar.get(document.querySelector('#my-scrollbar')); y.update(); y.scrollTo(0, y.limit.y, 0); });
  await p.waitForTimeout(2000);
  const bb = await p.evaluate(() => { const r = document.querySelector('.hover_button').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; });
  out.buttonViewportPos = bb;
  const samples = [];
  await p.mouse.move(bb.x, bb.y); await p.waitForTimeout(200);
  samples.push({ at: 'center', tf: await p.evaluate(() => document.querySelector('.hover_button').getAttribute('style')) });
  await p.mouse.move(bb.x + 60, bb.y + 60); await p.waitForTimeout(150);
  samples.push({ at: 'br+150ms', tf: await p.evaluate(() => document.querySelector('.hover_button').getAttribute('style')) });
  await p.waitForTimeout(1200);
  samples.push({ at: 'br+1350ms', tf: await p.evaluate(() => document.querySelector('.hover_button').getAttribute('style')) });
  await p.mouse.move(bb.x - 60, bb.y - 60); await p.waitForTimeout(1500);
  samples.push({ at: 'tl+1500ms', tf: await p.evaluate(() => document.querySelector('.hover_button').getAttribute('style')) });
  out.samples = samples;
  // mouseout reset
  await p.mouse.move(10, 10); await p.waitForTimeout(200);
  out.afterOut = await p.evaluate(() => document.querySelector('.hover_button').getAttribute('style'));
  await p.waitForTimeout(1200);
  out.afterOutSettled = await p.evaluate(() => document.querySelector('.hover_button').getAttribute('style'));
  // reduced motion
  out.reducedMotionCSS = await p.evaluate(() => {
    let found = [];
    for (const ss of document.styleSheets) { try { for (const r of ss.cssRules) { if (r.conditionText && r.conditionText.includes('prefers-reduced-motion')) found.push(r.conditionText + ' => ' + (r.cssText||'').slice(0,200)); } } catch(e){} }
    return found;
  });
  console.log(JSON.stringify(out, null, 2));
  await b.close();
})().catch(e => { console.error("FATAL", e && e.stack || e); process.exit(1); });

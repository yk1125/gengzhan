const { chromium } = require("playwright-core");
const CHROME = "C:/Users/yk/AppData/Local/Google/Chrome/Application/chrome.exe";
(async () => {
  const b = await chromium.launch({ executablePath: CHROME, headless: true });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, locale: "zh-CN" });
  const p = await ctx.newPage();
  await p.goto("https://www.seniorweb.cn/", { waitUntil: "load", timeout: 90000 });
  await p.waitForTimeout(6000);
  const out = await p.evaluate(() => {
    const el = [...document.querySelectorAll('.public_text')].find(e => e.closest('section') && e.closest('section').className === 'index3');
    const chain = [];
    let n = el;
    while (n && n !== document.documentElement) {
      const c = getComputedStyle(n);
      const r = n.getBoundingClientRect();
      chain.push({ tag: n.tagName, cls: (n.className||'').toString().slice(0,60), display: c.display, visibility: c.visibility, position: c.position, overflow: c.overflow, h: Math.round(r.height), w: Math.round(r.width), inline: n.getAttribute('style') });
      n = n.parentElement;
    }
    return { chain, html: el ? el.outerHTML.slice(0, 300) : null, index3Display: getComputedStyle(document.querySelector('.index3')).display, index3Rect: (r => ({top: Math.round(r.top), h: Math.round(r.height)}))(document.querySelector('.index3').getBoundingClientRect()) };
  });
  console.log(JSON.stringify(out, null, 2));
  await b.close();
})().catch(e => { console.error("FATAL", e && e.stack || e); process.exit(1); });

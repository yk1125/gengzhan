const { chromium } = require("playwright-core");
const CHROME = "C:/Users/yk/AppData/Local/Google/Chrome/Application/chrome.exe";
(async () => {
  const b = await chromium.launch({ executablePath: CHROME, headless: true });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, locale: "zh-CN" });
  const p = await ctx.newPage();
  await p.goto("https://www.seniorweb.cn/", { waitUntil: "load", timeout: 90000 });
  await p.waitForTimeout(5000);
  await p.mouse.move(720, 450); await p.mouse.wheel(0, 900); await p.waitForTimeout(1500);
  await p.evaluate(() => window.Scrollbar.get(document.querySelector('#my-scrollbar')).update());
  await p.waitForTimeout(500);
  const r = await p.evaluate(() => {
    const s = window.Scrollbar.get(document.querySelector('#my-scrollbar'));
    s.scrollTo(0, 0, 0);
    return null;
  });
  await p.waitForTimeout(1200);
  const out = await p.evaluate(() => {
    const s = window.Scrollbar.get(document.querySelector('#my-scrollbar'));
    const y = s.scrollTop;
    return {
      y,
      items: [...document.querySelectorAll('.public_text')].map(e => {
        const r = e.getBoundingClientRect();
        const sec = e.closest('section');
        return {
          cls: e.className, display: getComputedStyle(e).display,
          section: sec ? sec.className : null,
          rectTop: Math.round(r.top), docTop: Math.round(r.top + y),
          jqOffset: window.jQuery ? Math.round(window.jQuery(e).offset().top) : null,
          startCalc: (window.jQuery ? Math.round(window.jQuery(e).offset().top) : Math.round(r.top + y)) - Math.round(document.documentElement.clientHeight / 1.2),
          len: e.querySelectorAll('.p:first-child p').length,
          speed: e.getAttribute('data-speed'),
          pTexts: [...e.querySelectorAll('.p:first-child p')].map(x => x.textContent.trim().slice(0,20)),
          pOffsetTops: [...e.querySelectorAll('.p:first-child p')].map(x => Math.round(x.getBoundingClientRect().top + y)),
        };
      }),
      sectionTops: [...document.querySelectorAll('section')].map(x => ({ cls: x.className, top: Math.round(x.getBoundingClientRect().top + y), h: Math.round(x.getBoundingClientRect().height) })),
      pageYOffset: window.pageYOffset,
    };
  });
  console.log(JSON.stringify(out, null, 2));
  await b.close();
})().catch(e => { console.error("FATAL", e && e.stack || e); process.exit(1); });

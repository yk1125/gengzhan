const { chromium } = require("playwright-core");
const CHROME = "C:/Users/yk/AppData/Local/Google/Chrome/Application/chrome.exe";
(async () => {
  const b = await chromium.launch({ executablePath: CHROME, headless: true });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, locale: "zh-CN" });
  const p = await ctx.newPage();
  await p.goto("https://www.seniorweb.cn/", { waitUntil: "load", timeout: 90000 });
  await p.waitForTimeout(7000);
  const r = await p.evaluate(async () => {
    const s = window.Scrollbar.get(document.querySelector('#my-scrollbar'));
    const out = {};
    const dump = () => ({
      limitY: s.limit.y, limitX: s.limit.x,
      sizeContent: s.size.content.height, sizeContainer: s.size.container.height,
      offsetY: s.offset.y,
      scAttr: document.querySelector('[data-scrollbar]') ? document.querySelector('[data-scrollbar]').getAttribute('style') : null,
      contentEl: (e => e ? { cls: e.className, offsetH: e.offsetHeight, scrollH: e.scrollHeight, h: Math.round(e.getBoundingClientRect().height) } : null)(document.querySelector('.scroll-content')),
      heroH: (e => e ? { offsetH: e.offsetHeight, h: Math.round(e.getBoundingClientRect().height) } : null)(document.querySelector('.scroll-content > *')),
      bodyH: document.body.offsetHeight, docElH: document.documentElement.scrollHeight,
      index4H: Math.round(document.querySelector('.index4').getBoundingClientRect().height),
    });
    out.before = dump();
    s.scrollTo(0, 1, 0);
    await new Promise(r => setTimeout(r, 1500));
    out.afterKick = dump();
    s.update();
    await new Promise(r => setTimeout(r, 500));
    out.afterUpdate = dump();
    s.scrollTo(0, 999999, 0);
    await new Promise(r => setTimeout(r, 2500));
    out.afterMaxScroll = dump();
    s.update();
    await new Promise(r => setTimeout(r, 800));
    out.afterMaxScrollThenUpdate = dump();
    // try scrolling more after update
    s.scrollTo(0, 999999, 0);
    await new Promise(r => setTimeout(r, 2500));
    out.afterMaxScroll2 = dump();
    return out;
  });
  console.log(JSON.stringify(r, null, 2));
  await b.close();
})().catch(e => { console.error("FATAL", e && e.stack || e); process.exit(1); });

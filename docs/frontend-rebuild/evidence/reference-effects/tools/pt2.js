const { chromium } = require("playwright-core");
const fs = require("fs");
const path = require("path");
const CHROME = "C:/Users/yk/AppData/Local/Google/Chrome/Application/chrome.exe";
const URL = "https://www.seniorweb.cn/";
const H = `
window.__sb = () => window.Scrollbar.get(document.querySelector('#my-scrollbar'));
window.__setY = (y) => { window.__sb().scrollTo(0, y, 0); };
window.__y = () => Math.round(window.__sb().scrollTop);
`;
(async () => {
  const outFile = process.argv[2];
  const b = await chromium.launch({ executablePath: CHROME, headless: true });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, locale: "zh-CN" });
  await ctx.addInitScript(function () { try { sessionStorage.setItem("ifTime", "false"); sessionStorage.removeItem("Pattern"); } catch (e) {} });
  const p = await ctx.newPage();
  await p.goto(URL, { waitUntil: "load", timeout: 90000 });
  await p.waitForTimeout(4000);
  await p.evaluate(H);
  await p.mouse.move(720, 450); await p.mouse.wheel(0, 900); await p.waitForTimeout(1500);
  await p.evaluate(() => window.__sb().update()); await p.waitForTimeout(600);
  await p.mouse.wheel(0, -700); await p.waitForTimeout(1500);
  const out = { url: URL, rows: [] };
  out.initial = await p.evaluate(() => [...document.querySelectorAll('.public_text')].filter(e => e.offsetParent).map(c => ({ cls: c.className, containerOffsetTop: window.jQuery(c).offset().top })));
  const ys = [];
  for (let y = 200; y <= 2000; y += 100) ys.push(y);
  for (const y of ys) {
    const row = await p.evaluate(async (yy) => {
      window.__setY(yy);
      await new Promise(r => setTimeout(r, 650));
      const res = [];
      for (const c of document.querySelectorAll('.public_text')) {
        if (!c.offsetParent) continue;
        const ps = [...c.querySelectorAll('.p:first-child p')];
        res.push({
          cls: c.className,
          aosState: c.classList.contains('aos-animate') ? 'animate' : 'init',
          containerOffsetTop: Math.round(window.jQuery(c).offset().top * 100) / 100,
          containerRectTop: Math.round(c.getBoundingClientRect().top),
          containerInline: c.getAttribute('style'),
          paras: ps.map((e, i) => ({
            i,
            offsetTop: Math.round(window.jQuery(e).offset().top * 100) / 100,
            rectTop: Math.round(e.getBoundingClientRect().top),
            inline: e.getAttribute('style'),
            clip: getComputedStyle(e).clipPath
          }))
        });
      }
      return { y: window.__y(), res };
    }, y);
    out.rows.push(row);
  }
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, JSON.stringify(out, null, 1));
  console.log("WROTE " + outFile);
  try { await b.close(); } catch (e) {}
})();

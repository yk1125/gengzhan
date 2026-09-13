const { chromium } = require("playwright-core");
const fs = require("fs");
const path = require("path");
const CHROME = "C:/Users/yk/AppData/Local/Google/Chrome/Application/chrome.exe";
const URL = "https://www.seniorweb.cn/";
(async () => {
  const outFile = process.argv[2];
  const b = await chromium.launch({ executablePath: CHROME, headless: true });
  const out = { url: URL, runs: [] };
  for (const vp of [{ w: 1440, h: 900, dpr: 1, name: "desktop-1440" }, { w: 1024, h: 900, dpr: 1, name: "mobile-1024" }]) {
    const ctx = await b.newContext({ viewport: { width: vp.w, height: vp.h }, deviceScaleFactor: vp.dpr, locale: "zh-CN" });
    await ctx.addInitScript(function () { try { sessionStorage.setItem("ifTime", "false"); sessionStorage.removeItem("Pattern"); } catch (e) {} });
    const p = await ctx.newPage();
    await p.goto(URL, { waitUntil: "load", timeout: 90000 });
    await p.waitForTimeout(4000);
    // reset to 0
    await p.evaluate(function () { const s = window.Scrollbar ? window.Scrollbar.get(document.querySelector("#my-scrollbar")) : null; if (s) { s.scrollTo(0, 0, 0); } else { window.scrollTo(0, 0); } });
    await p.waitForTimeout(1200);
    const samples = [];
    await p.evaluate(() => { window.__samples = []; window.__t0 = performance.now();
      const s = window.Scrollbar ? window.Scrollbar.get(document.querySelector("#my-scrollbar")) : null;
      const read = () => { window.__samples.push({ t: Math.round((performance.now() - window.__t0) * 10) / 10, y: Math.round(((s ? s.scrollTop : window.scrollY)) * 1000) / 1000 }); window.__raf = requestAnimationFrame(read); };
      window.__raf = requestAnimationFrame(read);
    });
    await p.mouse.move(vp.w / 2, vp.h / 2);
    await p.mouse.wheel(0, 900);
    await p.waitForTimeout(3000);
    const res = await p.evaluate(function () { cancelAnimationFrame(window.__raf); const s = window.Scrollbar ? window.Scrollbar.get(document.querySelector("#my-scrollbar")) : null; return { samples: window.__samples, sbPresent: !!s, damping: s ? s.options.damping : null, renderByPixels: s ? s.options.renderByPixels : null, momentum: s ? { x: s._momentum.x, y: s._momentum.y } : null, finalY: s ? s.scrollTop : window.scrollY, limitY: s ? s.limit.y : null }; });
    const first = res.samples[0], last = res.samples[res.samples.length - 1];
    // find time to within 1px of final and to first stall
    let t1px = null, frames = res.samples.length;
    for (const s2 of res.samples) { if (Math.abs(s2.y - last.y) <= 1) { t1px = s2.t; break; } }
    out.runs.push({ viewport: vp, sbPresent: res.sbPresent, damping: res.damping, renderByPixels: res.renderByPixels, finalY: Math.round(res.finalY), limitY: res.limitY, rafFrames: frames, tTo1px: t1px, tTotal: last.t, peakY: Math.max.apply(null, res.samples.map(s2 => s2.y)), samplesHead: res.samples.slice(0, 12), samples: res.samples.filter((s2, i) => i % 6 === 0).slice(0, 40) });
    await ctx.close();
  }
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, JSON.stringify(out, null, 1));
  console.log("WROTE " + outFile);
  try { await b.close(); } catch (e) {}
})();

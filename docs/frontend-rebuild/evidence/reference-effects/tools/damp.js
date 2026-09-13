const { chromium } = require("playwright-core");
const CHROME = "C:/Users/yk/AppData/Local/Google/Chrome/Application/chrome.exe";
(async () => {
  const b = await chromium.launch({ executablePath: CHROME, headless: true });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, locale: "zh-CN" });
  await ctx.addInitScript(function () { try { sessionStorage.setItem("ifTime", "false"); sessionStorage.removeItem("Pattern"); } catch (e) {} });
  const p = await ctx.newPage();
  await p.goto("https://www.seniorweb.cn/", { waitUntil: "load", timeout: 90000 });
  await p.waitForTimeout(4000);
  const out = await p.evaluate(async function () {
    const s = window.Scrollbar.get(document.querySelector("#my-scrollbar"));
    const content = document.querySelector(".scroll-content");
    const samples = [];
    const seen = [];
    s.scrollTo(0, 0, 0);
    await new Promise(r => setTimeout(r, 800));
    const base = { transform: content.style.transform, damping: s.options.damping, renderByPixels: s.options.renderByPixels, alwaysShowTracks: s.options.alwaysShowTracks, continuousScrolling: s.options.continuousScrolling };
    // single wheel impulse
    const t0 = performance.now();
    window.dispatchEvent(new WheelEvent("wheel", { deltaY: 900, bubbles: true, cancelable: true }));
    // also try on container
    document.querySelector("#my-scrollbar").dispatchEvent(new WheelEvent("wheel", { deltaY: 900, bubbles: true, cancelable: true }));
    let prev = -1;
    while (performance.now() - t0 < 2200) {
      const y = s.scrollTop;
      if (y !== prev) { samples.push({ t: Math.round(performance.now() - t0), y: Math.round(y * 1000) / 1000 }); prev = y; }
      await new Promise(r => requestAnimationFrame(r));
    }
    return { base, samples, targetY: s.target ? s.target.y : null, offsetY: s.offset ? s.offset.y : null, finalTransform: content.style.transform, sizeContent: s.size.content.height };
  });
  console.log(JSON.stringify(out.base, null, 1));
  console.log("targetY=" + out.targetY + " offsetY=" + out.offsetY + " sizeContent=" + out.sizeContent);
  console.log("finalTransform=" + out.finalTransform);
  console.log("samples=" + out.samples.length);
  console.log(JSON.stringify(out.samples.slice(0, 70)));
  await b.close();
})().catch(e => { console.error("FATAL", e && e.stack || e); process.exit(1); });

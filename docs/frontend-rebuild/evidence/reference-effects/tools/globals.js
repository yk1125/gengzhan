const { chromium } = require("playwright-core");
const CHROME = "C:/Users/yk/AppData/Local/Google/Chrome/Application/chrome.exe";
(async () => {
  const b = await chromium.launch({ executablePath: CHROME, headless: true });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, locale: "zh-CN" });
  await ctx.addInitScript(function () { try { sessionStorage.setItem("ifTime", "false"); sessionStorage.removeItem("Pattern"); } catch (e) {} });
  const p = await ctx.newPage();
  const errs = [];
  p.on("pageerror", e => errs.push("pageerror: " + e.message));
  p.on("console", m => { if (m.type() === "error") errs.push("console: " + m.text()); });
  await p.goto("https://www.seniorweb.cn/", { waitUntil: "load", timeout: 90000 });
  await p.waitForTimeout(5000);
  const globals = await p.evaluate(function () {
    return { TweenMax: typeof window.TweenMax, TweenLite: typeof window.TweenLite, gsap: typeof window.gsap, gsapVersion: window.gsap ? window.gsap.version : null, Power4: typeof window.Power4, ScrollTrigger: typeof window.ScrollTrigger, anime: typeof window.anime, Swiper: typeof window.Swiper, $: typeof window.jQuery, Scrollbar: typeof window.Scrollbar, JSMpeg: typeof window.JSMpeg, THREE: typeof window.THREE };
  });
  console.log("globals=" + JSON.stringify(globals));
  // count listeners by probing a synthetic mousemove on the button
  const probe = await p.evaluate(function () {
    const e = document.querySelector(".hover_button");
    let fired = 0;
    e.addEventListener("mousemove", function () { fired++; });
    const r = e.getBoundingClientRect();
    const ev = new MouseEvent("mousemove", { bubbles: true, clientX: r.left + r.width * 0.9, clientY: r.top + r.height * 0.9 });
    try { e.dispatchEvent(ev); } catch (err) { return { error: String(err), fired: fired }; }
    return { fired: fired, style: e.getAttribute("style"), tf: getComputedStyle(e).transform };
  });
  console.log("synthetic=" + JSON.stringify(probe));
  await p.waitForTimeout(300);
  console.log("after300=" + JSON.stringify(await p.evaluate(function () { const e = document.querySelector(".hover_button"); return { style: e.getAttribute("style"), tf: getComputedStyle(e).transform }; })));
  console.log("errs=" + JSON.stringify(errs.slice(0, 12), null, 1));
  await b.close();
})().catch(e => { console.error("FATAL", e && e.stack || e); process.exit(1); });

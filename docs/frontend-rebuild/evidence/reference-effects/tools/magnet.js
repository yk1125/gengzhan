const { chromium } = require("playwright-core");
const CHROME = "C:/Users/yk/AppData/Local/Google/Chrome/Application/chrome.exe";
const OUT = "D:/桌面/gengzhan-worktrees/session-t00r/docs/frontend-rebuild/evidence/reference-effects/frames/magnetic/";

(async () => {
  const b = await chromium.launch({ executablePath: CHROME, headless: true });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, locale: "zh-CN" });
  await ctx.addInitScript(function () { try { sessionStorage.setItem("ifTime", "false"); sessionStorage.removeItem("Pattern"); } catch (e) {} });
  const p = await ctx.newPage();
  await p.goto("https://www.seniorweb.cn/", { waitUntil: "load", timeout: 90000 });
  await p.waitForTimeout(3000);
  await p.mouse.move(720, 450);
  await p.mouse.wheel(0, 900);
  await p.waitForTimeout(1500);
  await p.evaluate(function () { window.Scrollbar.get(document.querySelector("#my-scrollbar")).update(); });
  await p.waitForTimeout(500);
  const L = await p.evaluate(function () { return window.Scrollbar.get(document.querySelector("#my-scrollbar")).limit.y; });
  await p.evaluate(function (y) { window.Scrollbar.get(document.querySelector("#my-scrollbar")).scrollTo(0, y, 0); }, L);
  await p.waitForTimeout(2500);

  const read = function () {
    const e = document.querySelector(".hover_button");
    const r = e.getBoundingClientRect();
    const img = e.querySelector(".cir img");
    const ic = e.querySelector(".text .iconfont");
    return {
      style: e.getAttribute("style"),
      tf: getComputedStyle(e).transform,
      vp: { left: Math.round(r.left), top: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height) },
      off: { w: e.offsetWidth, h: e.offsetHeight },
      cir: getComputedStyle(img).animationName + " " + getComputedStyle(img).animationDuration + " " + getComputedStyle(img).animationTimingFunction + " " + getComputedStyle(img).animationIterationCount,
      ico: getComputedStyle(ic).animationName + " " + getComputedStyle(ic).animationDuration,
      before: getComputedStyle(e, "::before").transform + " | " + getComputedStyle(e, "::before").filter,
    };
  };
  const base = await p.evaluate(read);
  console.log("limit=" + L);
  console.log("base=" + JSON.stringify(base));

  const cx = base.vp.left + base.vp.w / 2, cy = base.vp.top + base.vp.h / 2;
  const log = [];
  const rec = async function (tag) { log.push({ tag: tag, s: await p.evaluate(read) }); };

  await rec("init");
  await p.mouse.move(cx - 60, cy - 60);
  await p.waitForTimeout(60); await rec("move-60ms");
  await p.waitForTimeout(120); await rec("move-180ms");
  await p.waitForTimeout(400); await rec("move-580ms");
  await p.waitForTimeout(900); await rec("move-1480ms");
  await p.mouse.move(cx + 60, cy + 60);
  await p.waitForTimeout(1500); await rec("opposite-1500ms");
  await p.screenshot({ path: OUT + "footer-hover-inside.png" });
  await p.mouse.move(5, 5);
  await p.waitForTimeout(300); await rec("out-300ms");
  await p.waitForTimeout(1200); await rec("out-1500ms");
  await p.screenshot({ path: OUT + "footer-hover-out.png" });
  for (const l of log) console.log(l.tag.padEnd(18) + " tf=" + String(l.s.tf).padEnd(34) + " style=" + l.s.style);
  await b.close();
})().catch(e => { console.error("FATAL", e && e.stack || e); process.exit(1); });

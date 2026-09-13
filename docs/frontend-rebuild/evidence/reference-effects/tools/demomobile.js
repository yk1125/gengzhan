const { chromium } = require("playwright-core");
const fs = require("fs");
const path = require("path");
const CHROME = "C:/Users/yk/AppData/Local/Google/Chrome/Application/chrome.exe";
const FILE = process.argv[2];
const OUT = process.argv[3];
(async () => {
  const b = await chromium.launch({ executablePath: CHROME, headless: true });
  const out = { file: FILE, errors: [], rows: [] };
  for (const w of [390, 1024, 1025, 1440]) {
    const ctx = await b.newContext({ viewport: { width: w, height: 900 }, deviceScaleFactor: 1, locale: "zh-CN" });
    const p = await ctx.newPage();
    p.on("pageerror", e => out.errors.push(w + " pageerror: " + (e && e.message)));
    p.on("console", m => { if (m.type() === "error") out.errors.push(w + " console: " + m.text()); });
    await p.goto(FILE, { waitUntil: "load", timeout: 30000 });
    await p.waitForTimeout(2200);
    out.rows.push(await p.evaluate(vw => {
      const g = s => { const e = document.querySelector(s); return e ? getComputedStyle(e) : null; };
      return {
        vw,
        nativeScroll: document.body.classList.contains("native-scroll"),
        scrollerPos: g("#scroller").position,
        limit: window.__t00r.limit,
        contentTf: getComputedStyle(document.getElementById("content")).transform,
        docScrollH: document.documentElement.scrollHeight,
        cursorDisplay: g(".fixed_cursor").display,
        fixedSideDisplay: g(".fixed_side").display,
        publicTextDisplay: g(".public_text").display,
        index3Display: g(".index3").display,
        maskDisplay: g(".index4 .mask").display,
        index4H: document.querySelector(".index4").style.height || "(unset)",
        navDisplay: g(".header .nav").display,
        eachAnimateChars: document.querySelectorAll(".each_animate div").length,
        canvasAlertDisplay: g(".canvas_alert").display,
        twoSlots: document.querySelector(".index3 .animate_video")
          ? document.querySelector(".index3 .animate_video").children.length : null
      };
    }, w));
    await p.screenshot({ path: path.join(OUT, "demo-mobile-" + w + ".png") });
    await ctx.close();
  }
  fs.writeFileSync(path.join(path.dirname(OUT), "demo-mobile.json"), JSON.stringify(out, null, 1));
  console.log(JSON.stringify(out.rows, null, 1));
  console.log("errors=" + JSON.stringify(out.errors));
  try { await b.close(); } catch (e) {}
})();

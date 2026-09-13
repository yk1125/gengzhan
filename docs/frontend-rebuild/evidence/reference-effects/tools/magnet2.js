const { chromium } = require("playwright-core");
const fs = require("fs");
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
  await p.waitForTimeout(400);
  await p.evaluate(function () { const s = window.Scrollbar.get(document.querySelector("#my-scrollbar")); s.scrollTo(0, s.limit.y, 0); });
  await p.waitForTimeout(2500);

  const res = {};
  res.counts = await p.evaluate(function () {
    return {
      public_hover: document.querySelectorAll(".public_hover").length,
      item_hover: document.querySelectorAll(".item_hover").length,
      public_hover_img: document.querySelectorAll(".public_hover .item .img").length,
      magnetic: document.querySelectorAll(".magnetic").length,
      hover_button: document.querySelectorAll(".hover_button").length,
      headline: document.querySelectorAll(".index1 .wrap .content .headline").length,
      aos_in_index5: [...document.querySelectorAll(".index5 [aos]")].length,
      aos_attr_values: [...new Set([...document.querySelectorAll("[aos]")].map(function (e) { return e.getAttribute("aos"); }))],
      aos_delay_values: [...new Set([...document.querySelectorAll("[aos]")].map(function (e) { return e.getAttribute("aos-delay"); }))],
    };
  });
  res.headline = await p.evaluate(function () {
    const h = document.querySelector(".index1 .wrap .content .headline");
    const l = document.querySelector(".index1 .wrap .content .headline .line");
    return { cls: h.className, lineTf: getComputedStyle(l).transform, lineDur: getComputedStyle(l).transitionDuration, lineOrigin: getComputedStyle(l).transformOrigin, lineBg: getComputedStyle(l).backgroundColor, lineH: getComputedStyle(l).height };
  });
  res.parallaxBanner = await p.evaluate(function () { const e = document.querySelector(".banner .parallax"); return e ? getComputedStyle(e).display : "absent"; });
  res.fixAfter = await p.evaluate(function () { const f = document.querySelector(".index4 .fix"); return { opacity: getComputedStyle(f, "::after").opacity, bg: getComputedStyle(f, "::after").backgroundColor }; });

  // magnetic displacement frames
  const shoot = async function (tag) {
    const s = await p.evaluate(function () { const e = document.querySelector(".hover_button"); return { style: e.getAttribute("style"), tf: getComputedStyle(e).transform }; });
    await p.screenshot({ path: OUT + tag + ".png" });
    return s;
  };
  res.magnetic = [];
  res.magnetic.push({ tag: "magnetic-rest", s: await shoot("magnetic-rest") });
  const disp = async function (fx, fy, tag, waitMs) {
    await p.evaluate(function (a) {
      const e = document.querySelector(".hover_button");
      const r = e.getBoundingClientRect();
      const ev = new MouseEvent("mousemove", { bubbles: true, clientX: r.left + r.width * a[0], clientY: r.top + r.height * a[1] });
      e.dispatchEvent(ev);
    }, [fx, fy]);
    await p.waitForTimeout(waitMs);
    res.magnetic.push({ tag: tag, s: await shoot(tag) });
  };
  await disp(0.9, 0.9, "magnetic-br-150ms", 150);
  await disp(0.9, 0.9, "magnetic-br-500ms", 350);
  await disp(0.9, 0.9, "magnetic-br-1200ms", 700);
  await disp(0.1, 0.1, "magnetic-tl-1200ms", 1200);
  await p.evaluate(function () {
    const e = document.querySelector(".hover_button");
    const r = e.getBoundingClientRect();
    e.dispatchEvent(new MouseEvent("mouseout", { bubbles: true, clientX: r.left, clientY: r.top }));
  });
  await p.waitForTimeout(200);
  res.magnetic.push({ tag: "magnetic-out-200ms", s: await shoot("magnetic-out-200ms") });
  await p.waitForTimeout(1300);
  res.magnetic.push({ tag: "magnetic-out-1500ms", s: await shoot("magnetic-out-1500ms") });

  fs.writeFileSync("C:/Users/yk/AppData/Local/Temp/t00r-verify.json", JSON.stringify(res, null, 2), "utf8");
  console.log(JSON.stringify(res, null, 2));
  await b.close();
})().catch(e => { console.error("FATAL", e && e.stack || e); process.exit(1); });

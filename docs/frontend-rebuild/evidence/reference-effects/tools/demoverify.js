const { chromium } = require("playwright-core");
const fs = require("fs");
const path = require("path");
const CHROME = "C:/Users/yk/AppData/Local/Google/Chrome/Application/chrome.exe";
const FILE = process.argv[2];
const OUT = process.argv[3];
const FRACS = [0, 0.3, 0.5, 0.7, 1];
(async () => {
  const b = await chromium.launch({ executablePath: CHROME, headless: true });
  const out = { file: FILE, errors: [], wheel: {}, shots: [], magnetic: {}, index3: {}, cut: {}, circle: {}, alert: {} };
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, locale: "zh-CN" });
  const p = await ctx.newPage();
  p.on("pageerror", e => out.errors.push("pageerror: " + (e && e.message)));
  p.on("console", m => { if (m.type() === "error") out.errors.push("console: " + m.text()); });
  await p.goto(FILE, { waitUntil: "load", timeout: 30000 });
  await p.waitForTimeout(2600);
  fs.mkdirSync(OUT, { recursive: true });

  out.env = await p.evaluate(() => ({
    hook: typeof window.__t00r, limit: window.__t00r && window.__t00r.limit,
    contentH: document.getElementById("content").offsetHeight, clientH: innerHeight,
    scrollH_doc: document.documentElement.scrollHeight,
    nativeScroll: document.body.classList.contains("native-scroll"),
    mediaMobile: matchMedia("(max-width:1024px)").matches
  }));

  const state = () => p.evaluate(() => {
    const g = s => { const e = document.querySelector(s); return e ? getComputedStyle(e) : null; };
    const mask = g(".index4 .mask"), bg = g(".index4 .bg");
    return {
      y: Math.round(window.__t00r.y * 100) / 100,
      contentTf: getComputedStyle(document.getElementById("content")).transform,
      headerCls: document.querySelector(".header").className, headerBg: g(".header").backgroundColor,
      fixedSideCls: document.getElementById("fixedSide").className,
      bannerDisplay: getComputedStyle(document.querySelector(".banner .parallax")).display,
      bannerTf: getComputedStyle(document.querySelector(".banner .parallax")).transform,
      publicTextClips: [...document.querySelectorAll(".public_text")].filter(e => e.offsetParent)
        .map(e => e.querySelector(".p:first-child p").style.clipPath || "(unset)"),
      maskDelay: mask.animationDelay, maskTf: mask.transform.slice(0, 40), bgTf: bg.transform,
      index2: [...document.querySelectorAll(".index2 .fist .flex")].map(e => getComputedStyle(e).transform),
      dataViews: [...document.querySelectorAll("[data-view]")].map(e =>
        ({ v: e.getAttribute("data-view"), tf: getComputedStyle(e).transform, o: getComputedStyle(e).opacity })),
      aos: document.querySelectorAll("[data-aos].aos-animate").length + "/" + document.querySelectorAll("[data-aos]").length,
      eachAnimate: [...document.querySelectorAll(".each_animate")].map(e => {
        const ds = e.querySelectorAll("div"); const cs = ds[0] ? getComputedStyle(ds[0]) : null;
        return { cls: e.className, chars: ds.length, char0: cs ? cs.opacity + " / " + cs.transform : null,
          delay1: ds[1] ? ds[1].style.transitionDelay : null };
      }),
      lineTf: getComputedStyle(document.querySelector(".headline .line")).transform,
      lineDur: getComputedStyle(document.querySelector(".headline .line")).transitionDuration,
      headlineCls: document.querySelector(".headline").className
    };
  });

  const before = await p.evaluate(() => ({ w: window.__t00r.wheelCount, y: window.__t00r.y }));
  await p.mouse.move(720, 450);
  await p.mouse.wheel(0, 900);
  await p.waitForTimeout(120);
  const justAfter = await p.evaluate(() => ({ w: window.__t00r.wheelCount, y: window.__t00r.y, m: window.__t00r.momentum }));
  await p.waitForTimeout(2500);
  const settled = await p.evaluate(() => ({ y: window.__t00r.y, m: window.__t00r.momentum }));
  out.wheel = { before, justAfter, settled, incremented: justAfter.w > before.w, moved: settled.y > before.y };

  for (const f of FRACS) {
    const label = "demo-" + String(Math.round(f * 100)).padStart(3, "0");
    await p.evaluate(fr => { window.__t00r.setY(window.__t00r.limit * fr); }, f);
    await p.waitForTimeout(1600);
    const st = await state();
    await p.screenshot({ path: path.join(OUT, label + ".png") });
    out.shots.push({ label, frac: f, state: st });
  }

  // --- M-05 .hide：滚轮方向驱动（真实滚轮，向上应移除 .hide） ---
  await p.evaluate(() => window.__t00r.setY(4000));
  await p.waitForTimeout(400);
  out.hide = { before: await p.evaluate(() => document.querySelector(".header").className) };
  await p.mouse.move(720, 450);
  await p.mouse.wheel(0, 120); await p.waitForTimeout(400);
  out.hide.afterWheelDown = await p.evaluate(() => document.querySelector(".header").className);
  out.hide.afterWheelUp = null;
  await p.mouse.wheel(0, -120); await p.waitForTimeout(400);
  out.hide.afterWheelUp = await p.evaluate(() => document.querySelector(".header").className);
  // 页头可见态静帧（参考站 y=0 时含入场后的页头）
  await p.evaluate(() => window.__t00r.setY(0));
  await p.waitForTimeout(600);
  out.headerAt0 = await p.evaluate(() => document.querySelector(".header").className);
  await p.screenshot({ path: path.join(OUT, "demo-header-visible.png") });

  // M-08 banner 视差只在 0<scrollTop<900 区间成立，补一个 450 采样点
  await p.evaluate(() => window.__t00r.setY(450));
  await p.waitForTimeout(500);
  out.banner450 = await p.evaluate(() => {
    const bp = document.querySelector(".banner .parallax"), cs = getComputedStyle(bp);
    return { y: window.__t00r.y, transform: cs.transform, display: cs.display, expected: 450 * 0.9 };
  });
  await p.screenshot({ path: path.join(OUT, "demo-banner-450.png") });

  // --- M-29 `.cut`：真实鼠标移入 .public_hover .item .img ---
  await p.evaluate(() => document.querySelector(".public_hover").scrollIntoView({ block: "center" }));
  await p.waitForTimeout(700);
  const cutRest = await p.evaluate(() => ({
    fixedCls: document.querySelector(".fixed_cursor").className,
    pro: getComputedStyle(document.querySelector(".fixed_cursor .content_pro")).transform + " / " +
         getComputedStyle(document.querySelector(".fixed_cursor .content_pro")).opacity,
    whole: getComputedStyle(document.querySelector(".fixed_cursor .cursor .whole")).opacity
  }));
  const imgBox = await p.locator(".public_hover .item .img").first().boundingBox();
  await p.mouse.move(imgBox.x + imgBox.width / 2, imgBox.y + imgBox.height / 2);
  await p.waitForTimeout(600);
  const cutOn = await p.evaluate(() => ({
    fixedCls: document.querySelector(".fixed_cursor").className,
    pro: getComputedStyle(document.querySelector(".fixed_cursor .content_pro")).transform + " / " +
         getComputedStyle(document.querySelector(".fixed_cursor .content_pro")).opacity,
    whole: getComputedStyle(document.querySelector(".fixed_cursor .cursor .whole")).opacity,
    cirAnim: getComputedStyle(document.querySelector(".fixed_cursor .content_pro .cir")).animation,
    arrowAnim: getComputedStyle(document.querySelector(".fixed_cursor .content_pro .text .end .iconfont")).animation
  }));
  await p.screenshot({ path: path.join(OUT, "demo-cut-on.png") });
  await p.mouse.move(20, 300);
  await p.waitForTimeout(600);
  const cutOff = await p.evaluate(() => document.querySelector(".fixed_cursor").className);
  out.cut = { rest: cutRest, on: cutOn, afterLeave: cutOff };

  // --- M-31 footer 圆按钮 hover 发光 ---
  await p.evaluate(() => document.querySelector(".position_circle").scrollIntoView({ block: "center" }));
  await p.waitForTimeout(600);
  const circleOff = await p.evaluate(() => {
    const cs = getComputedStyle(document.querySelector("#circleBtn"), "::before");
    return { filter: cs.filter, transform: cs.transform, bg: cs.backgroundColor, transition: cs.transitionDuration,
      ants: getComputedStyle(document.querySelector("footer .cir")).animation,
      arrowRun: getComputedStyle(document.querySelector("footer .iconfont")).animation };
  });
  await p.hover("#circleBtn");
  await p.waitForTimeout(300);
  const circleHover300 = await p.evaluate(() => {
    const cs = getComputedStyle(document.querySelector("#circleBtn"), "::before");
    return { filter: cs.filter, transform: cs.transform };
  });
  await p.waitForTimeout(400);
  const circleOn = await p.evaluate(() => {
    const cs = getComputedStyle(document.querySelector("#circleBtn"), "::before");
    return { filter: cs.filter, transform: cs.transform };
  });
  await p.screenshot({ path: path.join(OUT, "demo-circle-hover.png") });
  out.circle = { off: circleOff, at300ms: circleHover300, settled: circleOn };

  // --- M-17 .canvas_alert 弹层链 + index3 切换（同一次点击触发） ---
  await p.evaluate(() => document.querySelector(".index3").scrollIntoView());
  await p.waitForTimeout(600);
  await p.evaluate(() => { window.__alertT0 = performance.now(); document.querySelectorAll(".index3 .l .item")[2].click(); });
  const snap = () => p.evaluate(() => {
    const a = document.querySelector(".canvas_alert");
    const m = a.querySelector(".matter.on") || a.querySelector(".matter");
    return { t: Math.round(performance.now() - window.__alertT0),
      display: getComputedStyle(a).display, alertOp: getComputedStyle(a).opacity, cls: a.className,
      maskOp: getComputedStyle(a.querySelector(".mask")).opacity,
      maskDelay: getComputedStyle(a.querySelector(".mask")).transitionDelay,
      matterIdx: m.getAttribute("data-i"), matterOp: getComputedStyle(m).opacity,
      matterTf: getComputedStyle(m).transform };
  });
  await p.waitForTimeout(120); const t120 = await snap();
  await p.waitForTimeout(580); const t700 = await snap();
  await p.waitForTimeout(600); const t1300 = await snap();
  await p.waitForTimeout(850); const t2150 = await snap();
  await p.screenshot({ path: path.join(OUT, "demo-index3-click3.png") });
  out.index3 = await p.evaluate(() => {
    const mv = document.querySelector(".index3 .move"), items = document.querySelectorAll(".index3 .l .item"), it = items[2];
    return { itemClientHeight: items[0].clientHeight, clickedIndex: 2, expectedTranslateY: 2 * items[0].clientHeight,
      moveTf: getComputedStyle(mv).transform, itemCls: it.className,
      itemTextOp: getComputedStyle(it.querySelector(".text")).opacity,
      slots: [...document.querySelectorAll(".index3 .animate_video .slot")].map(e => e.className) };
  });
  out.alert.open = { t120, t700, t1300, t2150 };
  // 关闭：点 .close
  await p.evaluate(() => { window.__alertT1 = performance.now(); document.querySelectorAll(".canvas_alert .matter")[2].querySelector(".close").click(); });
  await p.waitForTimeout(150);
  out.alert.closed150 = await p.evaluate(() => ({
    t: Math.round(performance.now() - window.__alertT1),
    cls: document.querySelector(".canvas_alert").className,
    alertOp: getComputedStyle(document.querySelector(".canvas_alert")).opacity,
    anyMatterOn: document.querySelectorAll(".canvas_alert .matter.on").length }));
  await p.waitForTimeout(1200);
  out.alert.closed1350 = await p.evaluate(() => ({
    t: Math.round(performance.now() - window.__alertT1),
    cls: document.querySelector(".canvas_alert").className,
    alertOp: getComputedStyle(document.querySelector(".canvas_alert")).opacity,
    anyMatterOn: document.querySelectorAll(".canvas_alert .matter.on").length }));

  // --- M-27 光标 ---
  await p.mouse.move(300, 300); await p.waitForTimeout(900);
  const curA = await p.evaluate(() => getComputedStyle(document.querySelector(".fixed_cursor .cursor")).transform);
  await p.mouse.move(1100, 700); await p.waitForTimeout(120);
  const curMid = await p.evaluate(() => getComputedStyle(document.querySelector(".fixed_cursor .cursor")).transform);
  await p.waitForTimeout(1500);
  const curB = await p.evaluate(() => getComputedStyle(document.querySelector(".fixed_cursor .cursor")).transform);

  // --- M-30 磁吸 ---
  out.magnetic = await p.evaluate(async () => {
    const btn = document.querySelector(".hover_button");
    const wait = ms => new Promise(r => setTimeout(r, ms));
    const r = btn.getBoundingClientRect(); const tf = () => getComputedStyle(btn).transform;
    const rest = tf();
    btn.dispatchEvent(new MouseEvent("mousemove", { clientX: r.left + r.width * 0.9, clientY: r.top + r.height * 0.9, bubbles: true }));
    await wait(150); const at150 = tf();
    await wait(350); const at500 = tf();
    await wait(700); const at1200 = tf();
    btn.dispatchEvent(new MouseEvent("mouseout", { bubbles: true }));
    await wait(1500); const afterOut = tf();
    return { btnRect: { w: Math.round(r.width), h: Math.round(r.height) }, strengthExpected: 50,
      coordUsed: "0.9,0.9 → 理论值 20,20", rest, at150, at500, at1200, afterOut };
  });

  out.cursor = { path: "300,300 → 1100,700", curA, curMid, curB,
    blend: await p.evaluate(() => getComputedStyle(document.querySelector(".fixed_cursor")).mixBlendMode),
    speed: await p.evaluate(() => document.querySelector(".fixed_cursor .cursor").getAttribute("data-speed")) };
  out.headerHeight = await p.evaluate(() => document.querySelector(".header").offsetHeight);
  fs.writeFileSync(path.join(path.dirname(OUT), "demo-verify.json"), JSON.stringify(out, null, 1));
  console.log("WROTE demo-verify.json");
  console.log("errors=" + JSON.stringify(out.errors));
  console.log("wheel=" + JSON.stringify(out.wheel));
  console.log("env=" + JSON.stringify(out.env));
  try { await b.close(); } catch (e) {}
})();

const { chromium } = require("playwright-core");
const fs = require("fs");
const CHROME = "C:/Users/yk/AppData/Local/Google/Chrome/Application/chrome.exe";
(async () => {
  const b = await chromium.launch({ executablePath: CHROME, headless: true });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, locale: "zh-CN" });
  await ctx.addInitScript(function () { try { sessionStorage.setItem("ifTime","false"); sessionStorage.removeItem("Pattern"); } catch(e){} });
  const p = await ctx.newPage();
  const logs = []; p.on("console", m => logs.push(m.type()+": "+m.text())); p.on("pageerror", e => logs.push("pageerror: "+(e&&e.message)));
  await p.goto("https://www.seniorweb.cn/", { waitUntil: "load", timeout: 90000 });
  await p.waitForTimeout(5000);
  const r = await p.evaluate(() => {
    const orb = [...document.querySelectorAll('.orb-canvas')];
    const q = s => document.querySelector(s);
    const cv = q('.index3 #canvas');
    return {
      threeGlobal: typeof window.THREE,
      gsap: window.gsap && window.gsap.version, jq: window.jQuery && window.jQuery.fn.jquery, swiper: window.Swiper && window.Swiper.version, anime: typeof window.anime, tweenMax: typeof window.TweenMax, pgsap: typeof window.Power4, scrollbar: typeof window.Scrollbar, jsmpeg: typeof window.JSMpeg,
      orbs: orb.map(e => { const c = getComputedStyle(e); const r2 = e.getBoundingClientRect(); return { tag:e.tagName, w:Math.round(r2.width), h:Math.round(r2.height), display:c.display, filter:c.filter, opacity:c.opacity, z:c.zIndex, ctx: (()=>{try{return e.getContext('2d')? 'has2d':'no2d'}catch(err){return 'err'}})(), painted: (()=>{ const c2=e.getContext('2d'); if(!c2) return null; const d=c2.getImageData(Math.max(0,Math.floor(e.width/2))||0,Math.max(0,Math.floor(e.height/2))||0,1,1).data; return [d[0],d[1],d[2],d[3]]; })() }; }),
      canvas: cv ? { children: cv.children.length, child: cv.children[0] ? cv.children[0].tagName + ' ' + (cv.children[0].getAttribute('data-engine')||'') + ' w='+cv.children[0].width+' h='+cv.children[0].height : null, bg: getComputedStyle(cv).backgroundColor, pe: getComputedStyle(cv).pointerEvents } : null,
      styleRules: [...document.styleSheets].reduce((n,s)=>{try{return n+(s.cssRules?s.cssRules.length:0)}catch(e){return n}},0),
      rmQuery: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      htmlFontSize: getComputedStyle(document.documentElement).fontSize
    };
  });
  console.log(JSON.stringify(r, null, 1));
  console.log("LOGS", JSON.stringify(logs.slice(0, 12), null, 1));
  try { await b.close(); } catch(e){}
})();

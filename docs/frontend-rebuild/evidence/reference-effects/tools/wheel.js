const { chromium } = require("playwright-core");
const CHROME = "C:/Users/yk/AppData/Local/Google/Chrome/Application/chrome.exe";
(async () => {
  const b = await chromium.launch({ executablePath: CHROME, headless: true });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, locale: "zh-CN" });
  const p = await ctx.newPage();
  await p.goto("https://www.seniorweb.cn/", { waitUntil: "load", timeout: 90000 });
  await p.waitForTimeout(7000);
  const st = () => p.evaluate(() => {
    const s = window.Scrollbar.get(document.querySelector('#my-scrollbar'));
    return { y: Math.round(s.scrollTop), limit: s.limit.y, content: s.size.content.height, index4: Math.round(document.querySelector('.index4').getBoundingClientRect().height) };
  });
  console.log("initial", JSON.stringify(await st()));
  await p.mouse.move(720, 450);
  for (let i = 0; i < 12; i++) {
    await p.mouse.wheel(0, 1200);
    await p.waitForTimeout(300);
  }
  console.log("after 12 wheel", JSON.stringify(await st()));
  for (let i = 0; i < 40; i++) {
    await p.mouse.wheel(0, 1500);
    await p.waitForTimeout(120);
  }
  console.log("after 52 wheel", JSON.stringify(await st()));
  await p.waitForTimeout(2500);
  console.log("settled", JSON.stringify(await st()));
  // keep going
  for (let i = 0; i < 60; i++) { await p.mouse.wheel(0, 2000); await p.waitForTimeout(100); }
  await p.waitForTimeout(3000);
  console.log("after 112 wheel", JSON.stringify(await st()));
  await b.close();
})().catch(e => { console.error("FATAL", e && e.stack || e); process.exit(1); });

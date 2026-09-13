const { chromium } = require("playwright-core");
const fs = require("fs");

(async () => {
  const out = process.argv[2];
  const browser = await chromium.launch({
    executablePath: "C:/Users/yk/AppData/Local/Google/Chrome/Application/chrome.exe",
    headless: true,
  });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, locale: "zh-CN" });
  const page = await ctx.newPage();
  const logs = [], reqs = [];
  page.on("console", m => logs.push({ type: m.type(), text: m.text() }));
  page.on("pageerror", e => logs.push({ type: "pageerror", text: String(e && e.message || e) }));
  page.on("requestfailed", r => reqs.push({ url: r.url(), failure: r.failure() && r.failure().errorText, type: r.resourceType() }));
  page.on("response", r => { if (r.status() >= 400) reqs.push({ url: r.url(), status: r.status(), type: r.resourceType() }); });

  await page.goto("https://www.seniorweb.cn/", { waitUntil: "load", timeout: 90000 });
  await page.waitForTimeout(6000);

  const info = await page.evaluate(() => {
    const secs = [...document.querySelectorAll("[class*=index],[class*=banner]")].map(e => {
      const r = e.getBoundingClientRect();
      return { cls: e.className, top: Math.round(r.top + window.scrollY), h: Math.round(r.height) };
    });
    return {
      title: document.title,
      docH: document.documentElement.scrollHeight,
      innerH: window.innerHeight,
      hasScrollbar: !!window.Scrollbar,
      scrollbarInited: !!(window.Scrollbar && window.Scrollbar.getAll && window.Scrollbar.getAll().length),
      htmlClass: document.documentElement.className,
      bodyId: document.body.id,
      scripts: [...document.querySelectorAll("script[src]")].map(s => s.src),
      orbCanvas: !!document.querySelector(".orb-canvas"),
      sections: secs.slice(0, 20),
    };
  });

  fs.writeFileSync(out, JSON.stringify({ info, logs, reqs }, null, 2), "utf8");
  await browser.close();
})().catch(e => { console.error("FATAL", e); process.exit(1); });

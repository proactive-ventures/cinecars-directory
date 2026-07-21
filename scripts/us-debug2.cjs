const { chromium } = require("playwright");
const slugMake = (m) => m.replace(/\s+/g, "-").replace(/\./g, "");
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.setExtraHTTPHeaders({ "User-Agent": "Mozilla/5.0 (compatible; CineCarsBot/1.0)" });
  const make = "DeLorean";
  await p.goto(`https://www.ultimatespecs.com/car-specs/${slugMake(make)}-models`, { timeout: 30000, waitUntil: "domcontentloaded" });
  await p.waitForTimeout(500);
  const all = await p.$$eval("a[href*='/car-specs/']", (els) => els.map((e) => ({ href: e.getAttribute("href"), text: (e.textContent || "").trim() })));
  const slug = `/car-specs/${slugMake(make)}/`;
  const own = all.filter((l) => (l.href || "").includes(slug) && /\/\d+\//.test(l.href || ""));
  console.log("DeLorean own-model links:", own.length);
  own.slice(0, 10).forEach((l) => console.log("  ", l.text));
  console.log("contains DMC?", own.some((l) => /DMC/i.test(l.text)));
  await b.close();
})();

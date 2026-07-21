const { chromium } = require("playwright");
const slugMake = (m) => m.replace(/\s+/g, "-").replace(/\./g, "");
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.setExtraHTTPHeaders({ "User-Agent": "Mozilla/5.0 (compatible; CineCarsBot/1.0)" });
  for (const make of ["DeLorean", "Aston Martin", "Dodge"]) {
    const base = `https://www.ultimatespecs.com/car-specs/${slugMake(make)}-models`;
    const resp = await p.goto(base, { timeout: 30000, waitUntil: "domcontentloaded" });
    await p.waitForTimeout(500);
    console.log(`\n=== ${make} ===`);
    console.log("  final url:", p.url());
    console.log("  status:", resp && resp.status());
    const links = await p.$$eval("a[href*='/car-specs/']", (els) =>
      els.map((e) => ({ href: e.getAttribute("href"), text: (e.textContent || "").trim() })).filter((l) => /\/\d+\//.test(l.href || ""))
    );
    console.log("  model links:", links.length);
    links.slice(0, 3).forEach((l) => console.log("    ", l.text));
  }
  await b.close();
})();

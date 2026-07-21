const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.setExtraHTTPHeaders({ "User-Agent": "Mozilla/5.0 (compatible; CineCarsBot/1.0)" });
  await p.goto("https://www.ultimatespecs.com/car-specs/Aston-Martin-models", { timeout: 30000, waitUntil: "domcontentloaded" });
  await p.waitForTimeout(800);
  const links = await p.$$eval("a[href*='/car-specs/Aston-Martin/']", (els) =>
    els.map((e) => ({ href: e.getAttribute("href"), text: (e.textContent || "").trim() })).filter((l) => /Aston-Martin\/\d+\//.test(l.href))
  );
  console.log("Aston Martin MODEL links (first 25):");
  links.slice(0, 25).forEach((l) => console.log("  ", l.text, "->", l.href));
  // now test finding DB5 and extracting
  const db5 = links.find((l) => /DB5/i.test(l.text));
  console.log("\nDB5 link:", db5 ? db5.href : "NOT FOUND");
  if (db5) {
    await p.goto(db5.href.startsWith("http") ? db5.href : "https://www.ultimatespecs.com" + db5.href, { timeout: 30000, waitUntil: "domcontentloaded" });
    await p.waitForTimeout(600);
    const versions = await p.$$eval("a[href*='/car-specs/']", (els) =>
      els.map((e) => ({ href: e.getAttribute("href"), text: (e.textContent || "").trim() })).filter((l) => /\d{4}/.test(l.text))
    );
    console.log("\nDB5 versions (first 10):");
    versions.slice(0, 10).forEach((l) => console.log("  ", l.text, "->", l.href));
  }
  await b.close();
})();

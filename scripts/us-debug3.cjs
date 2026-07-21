const { chromium } = require("playwright");
const slugMake = (m) => m.replace(/\s+/g, "-").replace(/\./g, "");
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.setExtraHTTPHeaders({ "User-Agent": "Mozilla/5.0 (compatible; CineCarsBot/1.0)" });
  // Aston Martin: search for DB5 across model links
  await p.goto(`https://www.ultimatespecs.com/car-specs/Aston-Martin-models`, { timeout: 30000, waitUntil: "domcontentloaded" });
  await p.waitForTimeout(500);
  const am = await p.$$eval("a[href*='/car-specs/Aston-Martin/']", (els) => els.map((e) => ({ href: e.getAttribute("href"), text: (e.textContent || "").trim() })).filter((l) => /\/\d+\//.test(l.href || "")));
  console.log("Aston Martin models containing 'DB':", am.filter((l) => /DB/i.test(l.text)).map((l) => l.text).slice(0, 10));

  // Dodge Charger 1969 version page
  await p.goto(`https://www.ultimatespecs.com/car-specs/Dodge-models`, { timeout: 30000, waitUntil: "domcontentloaded" });
  await p.waitForTimeout(500);
  const dodge = await p.$$eval("a[href*='/car-specs/Dodge/']", (els) => els.map((e) => ({ href: e.getAttribute("href"), text: (e.textContent || "").trim() })).filter((l) => /\/\d+\//.test(l.href || "") && /Charger/i.test(l.text)));
  console.log("\nDodge Charger model links (first 5):");
  dodge.slice(0, 5).forEach((l) => console.log("  ", l.text, l.href));
  const tgt = dodge.find((l) => l.text.includes("1969")) || dodge[0];
  if (tgt) {
    await p.goto(tgt.href.startsWith("http") ? tgt.href : "https://www.ultimatespecs.com" + tgt.href, { timeout: 30000, waitUntil: "domcontentloaded" });
    await p.waitForTimeout(500);
    const versions = await p.$$eval("a[href*='/car-specs/']", (els) => els.map((e) => ({ href: e.getAttribute("href"), text: (e.textContent || "").trim() })).filter((l) => /\d{4}/.test(l.text)));
    console.log("\nCharger versions (first 8):");
    versions.slice(0, 8).forEach((l) => console.log("  ", l.text));
    const v = versions.find((l) => l.text.includes("1969")) || versions[0];
    if (v) {
      await p.goto(v.href.startsWith("http") ? v.href : "https://www.ultimatespecs.com" + v.href, { timeout: 30000, waitUntil: "domcontentloaded" });
      await p.waitForTimeout(500);
      const txt = await p.evaluate(() => document.body.innerText.slice(0, 1500));
      console.log("\n=== 1969 Charger spec page text (first 1500 chars) ===\n", txt);
    }
  }
  await b.close();
})();

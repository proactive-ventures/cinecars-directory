const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.setExtraHTTPHeaders({ "User-Agent": "Mozilla/5.0 (compatible; CineCarsBot/1.0)" });
  await p.goto("https://www.ultimatespecs.com/car-specs/Dodge/115655/Dodge-Charger-R-T-XS29-1969-440-V8-Magnum-4-speed.html", { timeout: 30000, waitUntil: "domcontentloaded" });
  await p.waitForTimeout(600);
  const body = await p.evaluate(() => document.body.innerText);
  console.log("contains 'Horsepower'?", /Horsepower/i.test(body));
  console.log("contains '7206'?", body.includes("7206"));
  console.log("contains 'Engine displacement'?", /Engine displacement/i.test(body));
  const m1 = body.match(/Horsepower\s*:\s*([0-9.]+)/i);
  const m2 = body.match(/Engine displacement\s*:\s*([0-9.]+)\s*cm3/i);
  console.log("hp match:", m1 && m1[1]);
  console.log("disp match:", m2 && m2[1]);
  console.log("loose PS:", (body.match(/\b(\d+)\s*PS\b/) || [])[1]);
  console.log("loose cm3:", (body.match(/\b(\d{3,5})\s*cm3\b/) || [])[1]);
  console.log("KEY SPECS present?", /KEY SPECS/i.test(body));
  // show snippet around Horsepower
  const idx = body.indexOf("Horsepower");
  if (idx >= 0) console.log("SNIPPET:", JSON.stringify(body.slice(idx, idx + 40)));
  await b.close();
})();

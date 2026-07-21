const { chromium } = require("playwright");

async function findModelPage(browser, make, model) {
  const page = await browser.newPage();
  const q = `${make} ${model}`;
  try {
    await page.goto("https://www.ultimatespecs.com/search?q=" + encodeURIComponent(q), { timeout: 30000 });
  } catch (e) { await page.close(); return null; }
  // try to find a link to a model page
  const link = await page.$("a[href*='/car-specs/']");
  let url = null;
  if (link) {
    const href = await link.getAttribute("href");
    url = href.startsWith("http") ? href : "https://www.ultimatespecs.com" + href;
  }
  await page.close();
  return url;
}

async function extractSpecs(browser, modelUrl, year) {
  const page = await browser.newPage();
  try {
    await page.goto(modelUrl, { timeout: 30000 });
    // find the version row matching the year, click into it
    const rows = await page.$$eval("a[href*='/car-specs/']", (els) =>
      els.map((e) => ({ href: e.getAttribute("href"), text: e.textContent.trim() }))
    );
    // pick a row whose text includes the year (or first if none)
    let target = rows.find((r) => r.text.includes(String(year)));
    if (!target && rows.length) target = rows[0];
    if (!target) { await page.close(); return null; }
    const vurl = target.href.startsWith("http") ? target.href : "https://www.ultimatespecs.com" + target.href;
    await page.goto(vurl, { timeout: 30000 });
    const data = await page.evaluate(() => {
      const out = {};
      const tables = document.querySelectorAll("table");
      const text = document.body.innerText;
      const grab = (re) => { const m = text.match(re); return m ? m[1].trim() : null; };
      out.horsepower = grab(/Horsepower\s*:\s*([0-9.]+)\s*(PS|HP|kW)/i);
      out.engine = grab(/Engine displacement\s*:\s*([0-9.]+)\s*cm3\s*\/\s*([0-9.]+)\s*cu-in/i);
      out.zeroToSixty = grab(/Acceleration 0 to 100 km\/h[^:]*:\s*([0-9.]+)\s*s/i);
      out.topSpeed = grab(/Top Speed\s*:\s*([0-9.]+)\s*km\/h/i);
      out.drivetrain = grab(/Drive wheels[^:]*:\s*([A-Za-z0-9\s\-]+)/i);
      out.transmission = grab(/Transmission Gearbox[^:]*:\s*([0-9]+)/i);
      out.weight = grab(/Curb Weight\s*:\s*([0-9.]+)\s*kg/i);
      out.fuelType = grab(/Fuel type\s*:\s*([A-Za-z]+)/i);
      return out;
    });
    await page.close();
    return data;
  } catch (e) {
    await page.close();
    return { error: e.message };
  }
}

(async () => {
  const browser = await chromium.launch();
  const modelUrl = await findModelPage(browser, "Nissan", "GT-R");
  console.log("MODEL URL:", modelUrl);
  if (modelUrl) {
    const specs = await extractSpecs(browser, modelUrl, 2015);
    console.log("SPECS:", JSON.stringify(specs, null, 1));
  }
  await browser.close();
})();

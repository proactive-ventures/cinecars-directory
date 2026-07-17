const { chromium } = require("playwright");
const fs = require("fs");

const CACHE = "data/ultimatespecs-cache.json";
const cache = fs.existsSync(CACHE) ? JSON.parse(fs.readFileSync(CACHE, "utf8")) : {};
const key = (make, model, year) => `${make}|${model}|${year}`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const slugMake = (m) => m.replace(/\s+/g, "-").replace(/\./g, "");

async function collectModelLinks(page, make) {
  const base = `https://www.ultimatespecs.com/car-specs/${slugMake(make)}-models`;
  let links = [];
  for (let pageNum = 1; pageNum <= 12; pageNum++) {
    const url = pageNum === 1 ? base : `${base}?page=${pageNum}`;
    try {
      await page.goto(url, { timeout: 30000, waitUntil: "domcontentloaded" });
    } catch (e) { break; }
    await sleep(400);
      const found = await page.$$eval(
      `a[href*='/car-specs/${slugMake(make)}/']`,
      (els) =>
        els
          .map((e) => ({ href: e.getAttribute("href"), text: (e.textContent || "").trim() }))
          .filter((l) => /\/\d+\//.test(l.href || ""))
    );
    if (!found.length) break;
    links.push(...found);
    // stop early if we've collected a lot
    if (links.length > 400) break;
  }
  return links;
}

async function extractSpecs(page, vurl) {
  await page.goto(vurl, { timeout: 30000, waitUntil: "domcontentloaded" });
  try { await page.waitForSelector("text=KEY SPECS", { timeout: 8000 }); } catch (e) {}
  await sleep(500);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await sleep(400);
  const body = await page.evaluate(() => document.body.innerText);
  // If this is a version-list page (no KEY SPECS), pick the year-matched version and recurse.
  if (!/KEY SPECS/i.test(body)) {
    const versions = await page.$$eval("a[href*='/car-specs/']", (els) =>
      els.map((e) => ({ href: e.getAttribute("href"), text: (e.textContent || "").trim() })).filter((l) => /\d{4}/.test(l.text))
    );
    if (versions.length) {
      // year is captured by caller via closure; pass through
      return { __needVersion: true, versions };
    }
    return { error: "no key specs" };
  }
  const out = {};
  // Horsepower: prefer "X PS" or "Horsepower : X"
  let m = body.match(/Horsepower\s*:\s*([0-9.]+)/i) || body.match(/([0-9.]+)\s*PS\s*\/\s*[0-9.]+\s*HP/i);
  out.horsepower = m ? Math.round(parseFloat(m[1])) : null;
  m = body.match(/Engine displacement\s*:\s*([0-9.]+)\s*cm3/i);
  out.displacement = m ? parseFloat(m[1]) : null;
  m = body.match(/Acceleration 0(?:-| to )?100(?: km\/h)?[^:\n]*?:\s*([0-9.]+)\s*s/i) || body.match(/0\s*-\s*100[^:\n]*?([0-9.]+)\s*s/i);
  out.zeroToSixty = m ? parseFloat(m[1]) : null;
  m = body.match(/Top Speed\s*:\s*([0-9.]+)\s*km\/h/i);
  out.topSpeed = m ? Math.round(parseFloat(m[1])) : null;
  m = body.match(/Drive wheels[^:]*:\s*([A-Za-z0-9\- ]+)/i);
  out.drivetrain = m ? m[1].replace(/\s+/g, " ").trim().split(/\s{2,}/)[0].trim() : null;
  m = body.match(/Transmission Gearbox[^:]*:\s*([0-9]+)/i);
  out.transmissionSpeeds = m ? parseInt(m[1]) : null;
  m = body.match(/Curb Weight\s*:\s*(?:from\s*)?([0-9.]+)\s*kg/i);
  out.weight = m ? Math.round(parseFloat(m[1])) : null;
  m = body.match(/Fuel type\s*:\s*([A-Za-z ]+)/i);
  out.fuelType = m ? m[1].replace(/\s+/g, " ").trim() : null;
  m = body.match(/Engine type - Number of cylinders\s*:\s*([A-Za-z0-9 ]+)/i);
  out.engine = m ? m[1].replace(/\s+/g, " ").trim() : null;
  return out;
}

(async () => {
  const jobs = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setExtraHTTPHeaders({ "User-Agent": "Mozilla/5.0 (compatible; CineCarsBot/1.0)" });
  let done = 0, hit = 0, miss = 0;
  // cache model links per make to avoid re-fetching
  const modelLinksCache = {};
  for (const job of jobs) {
    const k = key(job.make, job.model, job.year);
    if (cache[k]) { hit++; continue; }
    try {
      if (!modelLinksCache[job.make]) modelLinksCache[job.make] = await collectModelLinks(page, job.make);
      const links = modelLinksCache[job.make];
      // match model name (first token of model)
      const modelToken = job.model.split(" ")[0].toLowerCase();
      const cand = links.filter((l) => l.text.toLowerCase().includes(modelToken.toLowerCase()));
      const target = cand.find((l) => l.text.includes(String(job.year))) || cand[0];
      if (!target) { cache[k] = { error: "no model match" }; miss++; }
      else {
        const modelUrl = target.href.startsWith("http") ? target.href : "https://www.ultimatespecs.com" + target.href;
        let specs = await extractSpecs(page, modelUrl);
        if (specs && specs.__needVersion) {
          const ver = (specs.versions || []).find((l) => l.text.includes(String(job.year))) || specs.versions[0];
          if (!ver) { cache[k] = { error: "no version" }; miss++; continue; }
          const vurl = ver.href.startsWith("http") ? ver.href : "https://www.ultimatespecs.com" + ver.href;
          specs = await extractSpecs(page, vurl);
        }
        cache[k] = specs && !specs.error && !specs.__needVersion ? specs : { error: "extract failed" };
        if (cache[k].error) miss++; else done++;
      }
    } catch (e) {
      cache[k] = { error: e.message };
      miss++;
    }
    if ((done + miss) % 25 === 0) {
      fs.writeFileSync(CACHE, JSON.stringify(cache, null, 0));
      console.log(`progress: done=${done} hit=${hit} miss=${miss}`);
    }
    await sleep(600);
  }
  fs.writeFileSync(CACHE, JSON.stringify(cache, null, 0));
  console.log(`FINAL: done=${done} hit=${hit} miss=${miss}`);
  await browser.close();
})();

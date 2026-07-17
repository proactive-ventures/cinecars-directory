// Wikipedia specs enrichment - OUTPUTS cache JSON only (safe)
// Usage: node scripts/wikipedia-specs.cjs [mode]
//   mode: test (3 models) | full (all models)

const fs = require('fs');
const path = require('path');

const CARS_TS = path.join(process.cwd(), 'src', 'data', 'cars.ts');
const CACHE_FILE = path.join(process.cwd(), 'data', 'wikipedia-specs-cache.json');

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);
      const resp = await fetch(url, {
        headers: { 'User-Agent': 'CineCarsDirectory/1.0 (contact@cinecars.example)' },
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (resp.status === 429) {
        await sleep(2000 * (i + 1));
        continue;
      }
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      return await resp.json();
    } catch (e) {
      if (i === retries - 1) throw e;
      await sleep(1000 * (i + 1));
    }
  }
}

async function searchWikipedia(query) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&srlimit=5&srprop=title`;
  const data = await fetchWithRetry(url);
  return (data.query && data.query.search) || [];
}

async function getPageSections(pageid) {
  const url = `https://en.wikipedia.org/w/api.php?action=parse&pageid=${pageid}&prop=sections&format=json`;
  const data = await fetchWithRetry(url);
  return (data.parse && data.parse.sections) || [];
}

async function getSectionText(pageid, sectionIndex) {
  const url = `https://en.wikipedia.org/w/api.php?action=parse&pageid=${pageid}&prop=text&section=${sectionIndex}&format=json`;
  const data = await fetchWithRetry(url);
  return (data.parse && data.parse.text && data.parse.text['*']) || '';
}

function cleanHtml(html) {
  if (!html) return '';
  let text = html
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<sup[\s\S]*?<\/sup>/gi, '')
    .replace(/<ref[\s\S]*?<\/ref>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&ndash;/g, '-')
    .replace(/&mdash;/g, '-')
    .replace(/&times;/g, 'x')
    .replace(/\s+/g, ' ')
    .trim();
  return text;
}

function extractSpecsFromInfobox(html) {
  const specs = {};
  const infoboxMatch = html.match(/<table class="infobox[\s\S]*?<\/table>/);
  if (!infoboxMatch) return specs;
  const infobox = infoboxMatch[0];

  const rows = infobox.match(/<tr[\s\S]*?<\/tr>/g) || [];
  for (const row of rows) {
    const thMatch = row.match(/<th[^>]*>([\s\S]*?)<\/th>/);
    const tdMatch = row.match(/<td[^>]*>([\s\S]*?)<\/td>/);
    if (!thMatch || !tdMatch) continue;
    const label = cleanHtml(thMatch[1]).toLowerCase();
    const value = cleanHtml(tdMatch[1]);

    if (label.includes('engine')) {
      specs.engine = value.substring(0, 200);
    } else if (label.includes('power') || label.includes('horsepower') || label.includes('hp')) {
      const hp = value.match(/(\d{2,4})/);
      specs.horsepower = hp ? parseInt(hp[1]) : value.substring(0, 100);
    } else if (label.includes('top speed') || label.includes('maximum speed')) {
      const speed = value.match(/(\d{2,4})/);
      specs.topSpeed = speed ? parseInt(speed[1]) : undefined;
    } else if (label.includes('0') && (label.includes('60') || label.includes('100') || label.includes('0-62'))) {
      const accel = value.match(/(\d+\.?\d*)/);
      specs.zeroToSixty = accel ? parseFloat(accel[1]) : undefined;
    } else if (label.includes('transmission') || label.includes('gearbox')) {
      specs.transmission = value.substring(0, 100);
    } else if (label.includes('drivetrain') || label.includes('drive') || label.includes('layout')) {
      specs.drivetrain = value.substring(0, 100);
    } else if (label.includes('weight') || label.includes('curb') || label.includes('kerb')) {
      const weight = value.replace(/[^\d,]/g, '').replace(/,/g, '');
      const w = parseInt(weight);
      specs.weight = isNaN(w) ? undefined : w;
    }
  }
  return specs;
}

function main() {
  const mode = process.argv[2] || 'full';

  const content = fs.readFileSync(CARS_TS, 'utf8');
  const entries = content.match(/slug:\s*"([^"]+)"[\s\S]*?make:\s*"([^"]+)"[\s\S]*?model:\s*"([^"]+)"/g) || [];

  // Collect unique (make, model) pairs
  const models = new Map();
  for (const e of entries) {
    const slug = e.match(/slug:\s*"([^"]+)"/)[1];
    const make = e.match(/make:\s*"([^"]+)"/)[1];
    const model = e.match(/model:\s*"([^"]+)"/)[1];
    const key = `${make}|${model}`;
    if (!models.has(key)) models.set(key, { make, model, count: 0 });
    models.get(key).count++;
  }

  let uniqueModels = [...models.values()].sort((a, b) => b.count - a.count);

  if (mode === 'test') uniqueModels = uniqueModels.slice(0, 3);

  console.log(`Processing ${uniqueModels.length} unique (make, model) pairs`);

  // Load existing cache
  let cache = {};
  if (fs.existsSync(CACHE_FILE)) {
    try { cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8')); }
    catch (e) { console.log('Cache corrupted, starting fresh'); }
  }

  const results = { ...cache };
  let processed = 0;

  (async () => {
    for (const m of uniqueModels) {
      const key = `${m.make}|${m.model}`;
      if (results[key]) {
        processed++;
        continue;
      }

      try {
        const searchResults = await searchWikipedia(`${m.make} ${m.model} car`);
        let pageFound = null;
        for (const sr of searchResults) {
          const titleLower = sr.title.toLowerCase();
          if (titleLower.includes(m.make.toLowerCase()) && titleLower.includes(m.model.toLowerCase().split(' ')[0])) {
            pageFound = sr;
            break;
          }
        }
        if (!pageFound && searchResults.length > 0) {
          pageFound = searchResults[0];
        }

        if (pageFound) {
          const pageidMatch = pageFound.title.match(/\((\d+)\)/);
          // Get pageid from search result if available
          if (pageFound.pageid) {
            const sections = await getPageSections(pageFound.pageid);
            let infoboxHtml = '';
            if (sections.length > 0) {
              // Get first section (infobox is usually there)
              infoboxHtml = await getSectionText(pageFound.pageid, 0);
            }
            const specs = extractSpecsFromInfobox(infoboxHtml);
            if (Object.keys(specs).length > 0) {
              results[key] = specs;
            } else {
              results[key] = null;
            }
          } else {
            results[key] = null;
          }
        } else {
          results[key] = null;
        }
      } catch (e) {
        console.error(`Error for ${key}: ${e.message}`);
        results[key] = null;
      }

      processed++;
      if (processed % 10 === 0) {
        fs.writeFileSync(CACHE_FILE, JSON.stringify(results, null, 2));
        console.log(`[${processed}/${uniqueModels.length}] Saved cache (${Object.keys(results).length} entries)`);
      }
      await sleep(300);
    }

    fs.writeFileSync(CACHE_FILE, JSON.stringify(results, null, 2));
    console.log(`\n✅ Complete! ${processed} models processed. ${Object.keys(results).filter(k => results[k]).length} had specs.`);
    process.exit(0);
  })();
}

main();

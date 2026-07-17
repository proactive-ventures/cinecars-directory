// IMCDb.org Production Browser Scraper v3
// Pipeline: search movie -> visit movie page -> extract vehicles from URLs + images
// No need to visit vehicle pages (name/image extracted from URL/ID)
// Usage: node scripts/imcdb-scraper.cjs [mode]
//   Modes: test (default, 3 movies), full (60+ movies)

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const TARGETS = [
  { title: 'The Fast and the Furious', year: 2001 },
  { title: '2 Fast 2 Furious', year: 2003 },
  { title: 'The Fast and the Furious: Tokyo Drift', year: 2006, search: 'Tokyo Drift' },
  { title: 'Fast and Furious', year: 2009 },
  { title: 'Fast Five', year: 2011 },
  { title: 'Furious 6', year: 2013, imcdbUrl: 'https://www.imcdb.org/movie_1905041-Furious-6.html' },
  { title: 'Furious 7', year: 2015 },
  { title: 'The Fate of the Furious', year: 2017 },
  { title: 'F9', year: 2021, imcdbUrl: 'https://www.imcdb.org/movie_5433138-F9.html' },
  { title: 'Fast X', year: 2023 },
  { title: 'Goldfinger', year: 1964 },
  { title: 'Thunderball', year: 1965 },
  { title: 'The Spy Who Loved Me', year: 1977 },
  { title: 'For Your Eyes Only', year: 1981 },
  { title: 'GoldenEye', year: 1995 },
  { title: 'Tomorrow Never Dies', year: 1997 },
  { title: 'Casino Royale', year: 2006 },
  { title: 'Quantum of Solace', year: 2008 },
  { title: 'Skyfall', year: 2012 },
  { title: 'Spectre', year: 2015 },
  { title: 'No Time to Die', year: 2021 },
  { title: 'Batman', year: 1989 },
  { title: 'Batman Forever', year: 1995 },
  { title: 'Batman Begins', year: 2005 },
  { title: 'The Dark Knight', year: 2008 },
  { title: 'The Dark Knight Rises', year: 2012 },
  { title: 'The Batman', year: 2022 },
  { title: 'Bullitt', year: 1968 },
  { title: 'Gone in 60 Seconds', year: 2000 },
  { title: 'The Italian Job', year: 1969 },
  { title: 'Vanishing Point', year: 1971 },
  { title: 'Smokey and the Bandit', year: 1977 },
  { title: 'American Graffiti', year: 1973 },
  { title: 'Death Proof', year: 2007 },
  { title: 'Drive', year: 2011 },
  { title: 'Baby Driver', year: 2017 },
  { title: 'Ford v Ferrari', year: 2019 },
  { title: 'Rush', year: 2013 },
  { title: 'Knight Rider', year: 1982, imcdbUrl: 'https://www.imcdb.org/movie_83437-Knight-Rider.html' },
  { title: 'The Dukes of Hazzard', year: 2005 },
  { title: 'Miami Vice', year: 2006 },
  { title: 'Supernatural', year: 2005, imcdbUrl: 'https://www.imcdb.org/movie_460681-Supernatural.html' },
  { title: 'The A-Team', year: 2010 },
  { title: 'Back to the Future', year: 1985 },
  { title: 'Ghostbusters', year: 1984 },
  { title: 'The Blues Brothers', year: 1980 },
  { title: 'Jurassic Park', year: 1993 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Christine', year: 1983 },
  { title: 'The Love Bug', year: 1968 },
  { title: 'Ferris Bueller Day Off', year: 1986 },
  { title: 'Iron Man', year: 2008 },
  { title: 'The Avengers', year: 2012 },
  { title: 'John Wick', year: 2014 },
  { title: 'Mad Max Fury Road', year: 2015 },
  { title: 'Mad Max Beyond Thunderdome', year: 1985 },
  { title: 'Transformers', year: 2007 },
  { title: 'Need for Speed', year: 2014 },
  { title: 'The Walking Dead', imcdbUrl: 'https://www.imcdb.org/movie_1520211-The-Walking-Dead.html' },
  { title: 'Breaking Bad', imcdbUrl: 'https://www.imcdb.org/movie_903747-Breaking-Bad.html' },
  { title: 'The French Connection', year: 1971 },
  { title: 'Ronin', year: 1998 },
  { title: 'Heat', year: 1995 },
  { title: 'Dazed and Confused', year: 1993 },
  { title: 'The Italian Job', year: 2003 },
  // Expanded coverage - iconic franchises & series
  { title: 'Star Wars', year: 1977, search: 'Star Wars Episode' },
  { title: 'The Empire Strikes Back', year: 1980 },
  { title: 'Return of the Jedi', year: 1983 },
  { title: 'Harry Potter and the Philosopher Stone', year: 2001 },
  { title: 'Harry Potter and the Chamber of Secrets', year: 2002 },
  { title: 'Harry Potter and the Prisoner of Azkaban', year: 2004 },
  { title: 'Mission: Impossible', year: 1996 },
  { title: 'Mission: Impossible II', year: 2000 },
  { title: 'Mission: Impossible III', year: 2006 },
  { title: 'Mission: Impossible Fallout', year: 2018 },
  { title: 'Mad Max', year: 1979 },
  { title: 'Mad Max 2', year: 1981, search: 'Mad Max 2 The Road Warrior' },
  { title: 'The Fast and the Furious Tokyo Drift', year: 2006, search: 'Tokyo Drift' },
  { title: 'Initial D', year: 2005, search: 'Initial D First Stage' },
  { title: 'The Fast and the Furious', year: 2009 },
  { title: 'Cobra', year: 1986 },
  { title: 'The Cannonball Run', year: 1981 },
  { title: 'Smokey and the Bandit II', year: 1980 },
  { title: 'Repo Man', year: 1984 },
  { title: 'The Lost Boys', year: 1987 },
  { title: 'The Terminator', year: 1984 },
  { title: 'Terminator 2 Judgment Day', year: 1991 },
  { title: 'RoboCop', year: 1987 },
  { title: 'Die Hard', year: 1988 },
  { title: 'The Bourne Identity', year: 2002 },
  { title: 'The Transporter', year: 2002 },
  { title: 'The Mule', year: 2018 },
  { title: 'The Driver', year: 1978 },
  { title: 'Gone in 60 Seconds', year: 1974 },
  { title: 'The Gumball Rally', year: 1976 },
  { title: 'The Wraith', year: 1986 },
  { title: 'Pacific Rim', year: 2013 },
  { title: 'The Rock', year: 1996 },
  { title: 'Con Air', year: 1997 },
  { title: 'The Matrix Reloaded', year: 2003 },
  { title: 'The Matrix Revolutions', year: 2003 },
  { title: 'Speed', year: 1994 },
  { title: 'The Italian Job', year: 1969 },
  { title: 'The Getaway', year: 1972 },
  { title: 'The Seven Ups', year: 1973 },
  { title: 'To Live and Die in L.A.', year: 1985 },
  { title: 'The French Connection II', year: 1975 },
  { title: 'The Driver', year: 1978 },
];

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// Construct image URL from vehicle ID
function imageUrlFromId(id) {
  const padded = String(id).padStart(6, '0');
  return `https://www.imcdb.org/i${padded}.jpg`;
}

const MAX_RETRIES = 3;

async function navigateWithRetry(page, url, retries = MAX_RETRIES) {
  for (let i = 0; i < retries; i++) {
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
      await page.waitForTimeout(1500);
      return;
    } catch (e) {
      if (i === retries - 1) throw e;
      console.log(`  [retry ${i + 1}/${retries}]`);
      await sleep(3000);
    }
  }
}

async function searchMovie(page, target) {
  const searchTerm = target.search || target.title;
  const q = encodeURIComponent(searchTerm);
  await navigateWithRetry(page, `https://www.imcdb.org/movies.php?title=${q}`);

  const rows = await page.$$eval('table tr', (trs, t) => {
    const targetTitle = t.title.toLowerCase();
    const targetYear = t.year;
    return trs.map(tr => {
      const link = tr.querySelector('a[href*="movie_"]');
      if (!link) return null;
      const cells = tr.querySelectorAll('td');
      const name = link.textContent.trim();
      const type = cells[2] ? cells[2].textContent.trim() : '';
      const yearStr = cells[3] ? cells[3].textContent.trim() : '';
      const year = parseInt(yearStr) || null;
      return { url: link.href, name, type, year, yearStr };
    }).filter(r => r !== null);
  }, { title: target.title, year: target.year });

  const targetLower = target.title.toLowerCase();
  const targetWords = targetLower.split(/\s+/).filter(w => w.length > 2);

  // Helper: count matching words
  const wordOverlap = (a, b) => {
    const wordsA = a.toLowerCase().split(/\s+/);
    const wordsB = b.toLowerCase().split(/\s+/);
    const setB = new Set(wordsB);
    return wordsA.filter(w => setB.has(w)).length;
  };

  // Prefer exact name + year match
  let match = rows.find(r =>
    r.name.toLowerCase() === targetLower &&
    r.type === 'Movie' &&
    r.year === target.year
  );

  // Fallback: name includes target (word-level), same year
  if (!match) {
    match = rows.find(r => {
      if (r.type !== 'Movie') return false;
      if (target.year && r.year !== target.year) return false;
      const overlap = wordOverlap(targetLower, r.name);
      return overlap >= targetWords.length * 0.7;
    });
  }

  // Fallback: name includes target, any year
  if (!match) {
    match = rows.find(r => {
      if (r.type !== 'Movie') return false;
      const overlap = wordOverlap(targetLower, r.name);
      return overlap >= targetWords.length * 0.5;
    });
  }

  return match;
}

function parseVehicleFromUrl(url) {
  const match = url.match(/vehicle_(\d+)-(.+)\.html$/);
  if (!match) return null;
  const id = match[1];
  const pathSegments = decodeURIComponent(match[2]);
  const yearMatch = pathSegments.match(/(\d{4})$/);
  let year = null;
  let nameWithoutYear = pathSegments;
  if (yearMatch) {
    year = parseInt(yearMatch[1]);
    nameWithoutYear = pathSegments.slice(0, -yearMatch[1].length).replace(/[-]+$/, '');
  }
  const fullName = nameWithoutYear.replace(/[-]/g, ' ').trim();
  const parts = fullName.split(' ');
  const make = parts[0] || '';
  const model = parts.slice(1).join(' ');
  return {
    imcdbId: id, fullName, make, model, year, url,
    imageUrl: imageUrlFromId(id)
  };
}

async function scrapeMovieVehicles(page, movieUrl) {
  await navigateWithRetry(page, movieUrl);
  await page.waitForTimeout(2000);

  const vehicleUrls = await page.$$eval('a[href*="vehicle_"]', links =>
    links.map(a => a.href).filter(h => h && h.match(/vehicle_\d+-.+\.html$/))
  );

  const seen = new Set();
  const unique = [];
  for (const url of vehicleUrls) {
    const parsed = parseVehicleFromUrl(url);
    if (parsed && !seen.has(parsed.imcdbId)) {
      seen.add(parsed.imcdbId);
      unique.push(parsed);
    }
  }
  return unique;
}

async function main() {
  const args = process.argv.slice(2);
  const mode = args[0] || 'test';
  const CONCURRENCY = 6;

  console.log('╔══════════════════════════════════════════════╗');
  console.log('║   IMCDb.org Browser Scraper v3              ║');
  console.log('╚══════════════════════════════════════════════╝');

  const targets = mode === 'full' ? TARGETS : mode === 'fix' ? TARGETS.filter(t => t.imcdbUrl) : TARGETS.slice(0, 3);
  console.log(`Mode: ${mode === 'full' ? `FULL (${targets.length} movies)` : `TEST (${targets.length} movies)`}\n`);

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const ctx = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  });
  const page = await ctx.newPage();

  const foundMovies = [];
  let totalVehicles = 0;

  console.log('── Phase 1: Search movies ──');
  for (let i = 0; i < targets.length; i++) {
    const t = targets[i];
    process.stdout.write(`  [${i + 1}/${targets.length}] "${t.title}" (${t.year || '?'})... `);
    if (t.imcdbUrl) {
      console.log(`✓ (explicit URL)`);
      foundMovies.push({ url: t.imcdbUrl, name: t.title, year: t.year, type: 'Movie', searchTarget: t });
    } else {
      const movie = await searchMovie(page, t);
      if (movie) {
        console.log(`✓ → "${movie.name}" (${movie.year})`);
        foundMovies.push({ ...movie, searchTarget: t });
      } else {
        console.log('✗ not found');
      }
      await sleep(1500);
    }
  }

  console.log(`\n── Phase 2: Extract vehicles (${foundMovies.length} movies, ${CONCURRENCY} parallel) ──`);
  const allVehicles = [];
  const outDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const runId = Date.now();

  // Process movies in parallel batches
  const pages = await Promise.all(Array.from({ length: CONCURRENCY }, () => ctx.newPage()));

  let completed = 0;
  let nextIndex = 0;
  const movieStatus = new Map();

  async function worker(pageIdx) {
    while (nextIndex < foundMovies.length) {
      const i = nextIndex++;
      const m = foundMovies[i];
      try {
        const vehicles = await scrapeMovieVehicles(pages[pageIdx], m.url);
        for (const v of vehicles) {
          v.movieName = m.name;
          v.movieYear = m.year;
        }
        allVehicles.push(...vehicles);
        totalVehicles += vehicles.length;
        movieStatus.set(i, `${vehicles.length} vehicles`);
        completed++;
        console.log(`  [${i + 1}/${foundMovies.length}] "${m.name}"... ${vehicles.length} vehicles`);

        // Incremental save every 10 movies
        if (completed % 10 === 0) {
          const partialFile = path.join(outDir, `imcdb-partial-${runId}.json`);
          fs.writeFileSync(partialFile, JSON.stringify({
            runId, progress: `${completed}/${foundMovies.length}`, totalVehicles, vehicles: allVehicles
          }, null, 2));
        }
      } catch (e) {
        movieStatus.set(i, `ERROR: ${e.message}`);
        console.log(`  [${i + 1}/${foundMovies.length}] "${m.name}"... ERROR: ${e.message}`);
        completed++;
      }
    }
  }

  await Promise.all(pages.map((_, idx) => worker(idx)));

  await browser.close();

  // === OUTPUT ===
  const timestamp = Date.now();

  // Full JSON
  const jsonFile = path.join(outDir, `imcdb-${timestamp}.json`);
  fs.writeFileSync(jsonFile, JSON.stringify({
    timestamp: new Date().toISOString(),
    moviesFound: foundMovies.length,
    totalVehicles,
    movies: foundMovies,
    vehicles: allVehicles,
  }, null, 2));
  console.log(`\n💾 JSON: ${jsonFile}`);

  // CSV
  const csvFile = path.join(outDir, `imcdb-${timestamp}.csv`);
  const csvLines = ['movie,movieYear,imcdbId,make,model,year,fullName,imageUrl'];
  for (const v of allVehicles) {
    csvLines.push([
      JSON.stringify(v.movieName || ''),
      v.movieYear || '',
      v.imcdbId || '',
      JSON.stringify(v.make || ''),
      JSON.stringify(v.model || ''),
      v.year || '',
      JSON.stringify(v.fullName || ''),
      v.imageUrl || ''
    ].join(','));
  }
  fs.writeFileSync(csvFile, csvLines.join('\n'));
  console.log(`💾 CSV: ${csvFile}`);

  // Summary
  console.log('\n' + '═'.repeat(50));
  console.log(`📊 Results:`);
  console.log(`  Movies found: ${foundMovies.length}/${targets.length}`);
  console.log(`  Total vehicles: ${totalVehicles}`);
  console.log(`  Unique makes: ${new Set(allVehicles.map(v => v.make)).size}`);
  console.log(`  With images: ${allVehicles.filter(v => v.imageUrl).length}`);

  if (foundMovies.length > 0) {
    const notFound = targets.filter(t => !foundMovies.find(m => m.searchTarget === t));
    if (notFound.length > 0) {
      console.log('\n❌ Not found:');
      notFound.forEach(t => console.log(`  ${t.title} (${t.year || '?'})`));
    }
  }

  process.exit(0);
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});

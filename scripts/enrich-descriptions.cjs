// Enrich generic descriptions in cars.ts (SAFE, line-based, no network)
// Replaces "seen in N movie(s): X." style descriptions with richer ones.
// Usage: node scripts/enrich-descriptions.cjs

const fs = require('fs');
const path = require('path');
const CARS_TS = path.join(process.cwd(), 'src', 'data', 'cars.ts');

function main() {
  const raw = fs.readFileSync(CARS_TS, 'utf8');
  const lines = raw.split(/\r\n|\n/);
  let modified = 0;
  const out = [];
  let i = 0;
  let cur = null;

  function flush() {
    if (!cur || cur.descriptionLineIdx === undefined) return;
    if (!/seen in \d+ (movie|tv|TV|film)/.test(cur.descriptionOrig)) return;
    const titles = cur.appearances.map(a => `${a.title} (${a.year})`);
    const n = cur.appearances.length;
    let desc;
    if (n === 0) {
      desc = `The ${cur.year} ${cur.make} ${cur.model} is a notable vehicle featured in film and television.`;
    } else if (n === 1) {
      desc = `The ${cur.year} ${cur.make} ${cur.model} appears in ${titles[0]}.${cur.funFact ? ' ' + cur.funFact : ''}`;
    } else {
      const rest = n - 1;
      desc = `The ${cur.year} ${cur.make} ${cur.model} made its mark in ${titles[0]} and ${rest} other film${rest > 1 ? 's' : ''} and TV appearances.${cur.funFact ? ' ' + cur.funFact : ''}`;
    }
    out[cur.descriptionLineIdx] = `    description: ${JSON.stringify(desc)},`;
    modified++;
  }

  while (i < lines.length) {
    const line = lines[i];
    const slugM = line.match(/^\s{4}slug:\s+"([^"]+)"/);
    if (slugM) { flush(); cur = { slug: slugM[1], appearances: [], descriptionLineIdx: undefined, descriptionOrig: '', funFact: '' }; out.push(line); i++; continue; }
    const makeM = line.match(/^\s{4}make:\s+"([^"]+)"/); if (makeM && cur) { cur.make = makeM[1]; out.push(line); i++; continue; }
    const modelM = line.match(/^\s{4}model:\s+"([^"]+)"/); if (modelM && cur) { cur.model = modelM[1]; out.push(line); i++; continue; }
    const yearM = line.match(/^\s{4}year:\s+(-?\d+)/); if (yearM && cur) { cur.year = parseInt(yearM[1], 10); out.push(line); i++; continue; }
    const descM = line.match(/^\s{4}description:\s*(.*)$/); if (descM && cur) { cur.descriptionLineIdx = out.length; cur.descriptionOrig = descM[1]; out.push(line); i++; continue; }
    const ffM = line.match(/^\s{4}funFact:\s*(.*)$/); if (ffM && cur) { cur.funFact = ffM[1].replace(/^"|"$/g, ''); out.push(line); i++; continue; }
    const appM = line.match(/^\s{4}appearances:\s*\[/);
    if (appM && cur) {
      let k = i, d = 0, collecting = true, block = '';
      while (k < lines.length && collecting) {
        const l = lines[k];
        block += l + '\n';
        for (const ch of l) { if (ch === '[') d++; else if (ch === ']') { d--; if (d === 0) collecting = false; } }
        k++;
      }
      const titleRe = /title:\s*"([^"]+)"/g;
      const yearRe = /year:\s*(-?\d+)/g;
      const titles = [];
      let tm; while ((tm = titleRe.exec(block))) titles.push(tm[1]);
      const years = [];
      let ym; while ((ym = yearRe.exec(block))) years.push(parseInt(ym[1], 10));
      cur.appearances = titles.map((t, idx) => ({ title: t, year: years[idx] }));
      for (let x = i; x < k; x++) out.push(lines[x]);
      i = k;
      continue;
    }
    out.push(line);
    i++;
  }
  flush();

  fs.writeFileSync(CARS_TS, out.join('\n') + '\n', 'utf8');
  console.log(`\n✅ Enriched ${modified} descriptions in cars.ts`);
}

main();

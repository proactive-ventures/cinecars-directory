// Apply Wikipedia specs cache to cars.ts (SAFE, LINE-BASED)
// No brace counting. Finds "specs:" then replaces lines until the 4-space "}," close.
// Usage: node scripts/apply-wikipedia-specs.cjs

const fs = require('fs');
const path = require('path');

const CARS_TS = path.join(process.cwd(), 'src', 'data', 'cars.ts');
const CACHE_FILE = path.join(process.cwd(), 'data', 'wikipedia-specs-cache.json');

function main() {
  if (!fs.existsSync(CACHE_FILE)) {
    console.error('No cache file found. Run wikipedia-specs.cjs first.');
    process.exit(1);
  }
  const cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
  let withSpecs = 0;
  for (const k of Object.keys(cache)) {
    if (cache[k] && Object.keys(cache[k]).length > 0) withSpecs++;
  }
  console.log(`Cache has ${withSpecs} models with specs to apply`);

  const raw = fs.readFileSync(CARS_TS, 'utf8');
  const lines = raw.split(/\r\n|\n/);

  // First pass: map slug -> make|model
  const slugToKey = {};
  let curSlug = null, curMake = null, curModel = null;
  for (const line of lines) {
    const sm = line.match(/^\s{4}slug:\s+"([^"]+)"/);
    if (sm) { curSlug = sm[1]; continue; }
    const mm = line.match(/^\s{4}make:\s+"([^"]+)"/);
    if (mm) { curMake = mm[1]; continue; }
    const mmod = line.match(/^\s{4}model:\s+"([^"]+)"/);
    if (mmod) {
      curModel = mmod[1];
      if (curSlug && curMake && curModel) slugToKey[curSlug] = `${curMake}|${curModel}`;
    }
  }

  // Second pass: rewrite specs blocks
  let modified = 0;
  const out = [];
  let i = 0;
  let curKey = null;
  let inSpecs = false;
  let specsDone = false;

  // We track current car slug as we go
  let activeSlug = null;

  while (i < lines.length) {
    const line = lines[i];

    const sm = line.match(/^\s{4}slug:\s+"([^"]+)"/);
    if (sm) {
      activeSlug = sm[1];
      out.push(line);
      i++;
      continue;
    }

    // Detect specs block start: a line "    specs: {"  (or "    specs: {},")
    const specsStart = line.match(/^(\s{4})specs:\s*\{/);
    if (specsStart) {
      const key = activeSlug ? slugToKey[activeSlug] : null;
      const specs = key ? cache[key] : null;
      if (specs && Object.keys(specs).length > 0) {
        const indent = '      ';
        const newLines = [];
        if (specs.engine !== undefined) newLines.push(`${indent}engine: ${JSON.stringify(String(specs.engine).substring(0, 150))},`);
        if (specs.horsepower !== undefined) {
          const hp = specs.horsepower;
          if (typeof hp === 'number' && !isNaN(hp)) newLines.push(`${indent}horsepower: ${hp},`);
          else {
            const num = parseInt(String(hp).replace(/[^\d]/g, ''), 10);
            if (!isNaN(num) && num > 0) newLines.push(`${indent}horsepower: ${num},`);
          }
        }
        if (specs.topSpeed !== undefined && typeof specs.topSpeed === 'number' && !isNaN(specs.topSpeed)) newLines.push(`${indent}topSpeed: ${specs.topSpeed},`);
        if (specs.zeroToSixty !== undefined && typeof specs.zeroToSixty === 'number' && !isNaN(specs.zeroToSixty)) newLines.push(`${indent}zeroToSixty: ${specs.zeroToSixty},`);
        if (specs.transmission !== undefined) newLines.push(`${indent}transmission: ${JSON.stringify(String(specs.transmission).substring(0, 80))},`);
        if (specs.drivetrain !== undefined) newLines.push(`${indent}drivetrain: ${JSON.stringify(String(specs.drivetrain).substring(0, 80))},`);
        if (specs.weight !== undefined && typeof specs.weight === 'number') newLines.push(`${indent}weight: ${specs.weight},`);

        if (newLines.length > 0) {
          // Single-line empty specs "    specs: {},"
          if (/^\s{4}specs:\s*\{\},?\s*$/.test(line)) {
            out.push(`${indent.replace(/ {2}$/, '')}specs: {`);
            for (const nl of newLines) out.push(nl);
            out.push('    },');
            modified++;
            i++;
            continue;
          }
          // Multi-line specs block
          out.push(line.replace(/\{\s*$/, '{'));
          for (const nl of newLines) out.push(nl);
          let j = i + 1;
          while (j < lines.length && !/^\s{4}\},?\s*$/.test(lines[j])) j++;
          if (j < lines.length) {
            out.push(lines[j]);
            i = j + 1;
            modified++;
            continue;
          } else {
            i++;
            continue;
          }
        }
      }
      out.push(line);
      i++;
      continue;
    }

    out.push(line);
    i++;
  }

  fs.writeFileSync(CARS_TS, out.join('\n') + '\n', 'utf8');
  console.log(`\n✅ Applied specs to ${modified} cars in cars.ts`);
}

main();

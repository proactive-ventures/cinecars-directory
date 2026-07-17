const fs = require('fs');
const path = require('path');

const CARS_TS = path.join(process.cwd(), 'src', 'data', 'cars.ts');

const FUN_FACT_TEMPLATES = [
  (car, stats) => `This ${car.make} ${car.model} (${car.year}) appears in ${car.appearances.length} movie${car.appearances.length !== 1 ? 's' : ''} and TV show${car.appearances.length !== 1 ? 's' : ''} in our database.`,
  (car, stats) => `One of ${stats.makeCount[car.make] || '?'} ${car.make} vehicles featured in film and television history.`,
  (car, stats) => `This ${car.bodyType.toLowerCase()} was built in ${car.year} and later became a screen icon through its appearances on the big and small screen.`,
  (car, stats) => `Part of our collection of ${stats.totalCars} iconic vehicles from cinema and television worldwide.`,
  (car, stats) => `The ${car.year} ${car.make} ${car.model} is one of ${stats.makeCount[car.make] || '?'} ${car.make} models in the CineCars directory.`,
  (car, stats) => `This ${car.make} ${car.model} has been featured in ${car.appearances.length} different production${car.appearances.length !== 1 ? 's' : ''}, spanning movies and television series.`,
  (car, stats) => `From the ${car.year} model year, this ${car.make} ${car.model} represents automotive design of its era.`,
  (car, stats) => `This ${car.bodyType.toLowerCase()} appears in ${car.appearances.map(a => a.title).slice(0, 2).join(' and ')}${car.appearances.length > 2 ? ` and ${car.appearances.length - 2} more` : ''}.`,
];

function main() {
  let content = fs.readFileSync(CARS_TS, 'utf8');

  // Count makes
  const makeCount = {};
  const makeRegex = /make:\s*"([^"]+)"/g;
  let m;
  while ((m = makeRegex.exec(content))) {
    makeCount[m[1]] = (makeCount[m[1]] || 0) + 1;
  }
  const totalCars = Object.values(makeCount).reduce((a, b) => a + b, 0);
  const stats = { makeCount, totalCars };

  // Process line by line with brace-depth tracking
  const lines = content.split('\n');
  const output = [];
  let inEntry = false;
  let braceDepth = 0;
  let entryLines = [];
  let updated = 0;
  let alreadyHad = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trimEnd();

    // Detect entry start: line starting with "  {" (after trimming is just "{")
    const trimmedStart = trimmed.trimStart();
    if (trimmedStart === '{' && !inEntry) {
      inEntry = true;
      braceDepth = 1;
      entryLines = [{ raw: line, indent: line.length - line.trimStart().length }];
      continue;
    }

    if (inEntry) {
      // Count braces in this line
      let added = 0;
      for (const ch of line) {
        if (ch === '{') added++;
        if (ch === '}') added--;
      }
      braceDepth += added;

      entryLines.push({ raw: line, indent: line.length - line.trimStart().length });

      // Entry ends when braceDepth returns to 0
      if (braceDepth === 0) {
        // Process this entry
        const processed = processEntry(entryLines, stats);
        if (processed.changed) updated++;
        if (processed.skipped) alreadyHad++;
        for (const l of processed.lines) {
          output.push(l);
        }
        inEntry = false;
        entryLines = [];
      }
    } else {
      output.push(line);
    }
  }

  fs.writeFileSync(CARS_TS, output.join('\n'));
  console.log(`Done! Updated: ${updated}, Already had: ${alreadyHad}, Total: ${totalCars}`);
}

function processEntry(entryLines, stats) {
  const rawText = entryLines.map(l => l.raw).join('\n');

  // Extract car data
  const slug = extract(rawText, /slug:\s*"([^"]+)"/);
  const name = extract(rawText, /name:\s*"([^"]+)"/);
  const make = extract(rawText, /make:\s*"([^"]+)"/);
  const model = extract(rawText, /model:\s*"([^"]+)"/);
  const year = parseInt(extract(rawText, /year:\s*(\d+)/)) || 0;
  const bodyType = extract(rawText, /bodyType:\s*"([^"]+)"/) || 'Car';

  if (!slug || !make || !model) {
    return { lines: entryLines.map(l => l.raw), changed: false, skipped: false };
  }

  // Parse appearances
  const appearances = [];
  const appRegex = /title:\s*"([^"]+)",\s*year:\s*(\d+)/g;
  let am;
  while ((am = appRegex.exec(rawText))) {
    appearances.push({ title: am[1], year: parseInt(am[2]) });
  }

  const car = { slug, name, make, model, year, bodyType, appearances };

  // Check existing funFact and iconicScene
  const hasFunFact = rawText.includes('funFact:');
  const hasIconicScene = rawText.includes('iconicScene:');
  const funFactFilled = rawText.includes('funFact: "') || rawText.includes("funFact: '");

  if (funFactFilled && hasIconicScene) {
    return { lines: entryLines.map(l => l.raw), changed: false, skipped: true };
  }

  // Generate fun fact
  const templateIndex = (appearances.length + year) % FUN_FACT_TEMPLATES.length;
  const funFactText = FUN_FACT_TEMPLATES[templateIndex](car, stats);
  const escapedFact = funFactText.replace(/"/g, '\\"');

  // Generate iconic scene
  let iconicSceneText = null;
  if (appearances[0]) {
    iconicSceneText = `Featured in "${appearances[0].title}" (${appearances[0].year})`;
  }

  // Build output lines
  const resultLines = [];
  let funFactAdded = false;
  let iconicSceneAdded = false;

  for (const entry of entryLines) {
    let line = entry.raw;
    const indent = ' '.repeat(entry.indent);

    // Insert both funFact and iconicScene before isFeatured if needed
    if (line.includes('isFeatured')) {
      let needsFunFact = !hasFunFact && !funFactAdded;
      let needsScene = !hasIconicScene && !iconicSceneAdded && iconicSceneText;

      if (needsFunFact) {
        resultLines.push(indent + `funFact: "${escapedFact}",`);
        funFactAdded = true;
      }
      if (needsScene) {
        resultLines.push(indent + `iconicScene: "${iconicSceneText.replace(/"/g, '\\"')}",`);
        iconicSceneAdded = true;
      }
      resultLines.push(line);
      continue;
    }

    // Insert funFact before iconicScene if needed
    if (!hasFunFact && !funFactAdded && line.includes('iconicScene')) {
      resultLines.push(indent + `funFact: "${escapedFact}",`);
      resultLines.push(line);
      funFactAdded = true;
      continue;
    }

    // Replace undefined funFact
    if (hasFunFact && line.includes('funFact: undefined')) {
      resultLines.push(indent + `funFact: "${escapedFact}",`);
      funFactAdded = true;
      continue;
    }

    resultLines.push(line);
  }

  const changed = funFactAdded || iconicSceneAdded;
  return { lines: resultLines, changed, skipped: false };
}

function extract(text, regex) {
  const m = text.match(regex);
  return m ? m[1] : null;
}

main();

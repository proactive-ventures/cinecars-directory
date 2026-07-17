// Merge IMCDb scraped data into cars.ts
// Deduplicates by (make, model, year) and merges movie appearances
// Usage: node scripts/merge-imcdb.cjs [imcdb-json-path]

const fs = require('fs');
const path = require('path');

// Paths
const CARS_TS = path.join(process.cwd(), 'src', 'data', 'cars.ts');
const DATA_DIR = path.join(process.cwd(), 'data');

// Find latest IMCDb JSON
function findLatestImcdbJson() {
  const files = fs.readdirSync(DATA_DIR)
    .filter(f => f.startsWith('imcdb-') && f.endsWith('.json') && !f.includes('partial') && !f.includes('scrape'))
    .sort()
    .reverse();
  if (files.length === 0) {
    console.error('No IMCDb JSON files found in data/');
    process.exit(1);
  }
  return path.join(DATA_DIR, files[0]);
}

// Slugify a string
function slugify(s) {
  return s.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Normalize make name
function normalizeMake(make) {
  const map = {
    'Mercedes-Benz': 'Mercedes-Benz',
    'Mercedes': 'Mercedes-Benz',
    'Land Rover': 'Land Rover',
    'Land-Rover': 'Land Rover',
    'Range Rover': 'Range Rover',
    'Alfa Romeo': 'Alfa Romeo',
    'Alfa-Romeo': 'Alfa Romeo',
    'Aston Martin': 'Aston Martin',
    'Aston-Martin': 'Aston Martin',
  };
  return map[make] || make;
}

// Generate a car entry from IMCDb data
function imcdbToCar(entries) {
  // entries is an array of IMCDb records for the same vehicle across movies
  const first = entries[0];
  const make = normalizeMake(first.make);
  const model = first.model || 'Unknown';
  const year = first.year || 0;
  const fullName = first.fullName || `${make} ${model}`;

  const slug = slugify(`${make}-${model}-${year || 'unknown'}`);
  const id = slug;

  // Collect unique movie appearances
  const movieMap = new Map();
  for (const e of entries) {
    const key = `${e.movieName}|${e.movieYear}`;
    if (!movieMap.has(key)) {
      movieMap.set(key, {
        mediaType: 'movie',
        title: e.movieName,
        year: e.movieYear,
        role: 'Featured vehicle',
      });
    }
  }

  // Determine body type from keywords
  let bodyType = 'Unknown';
  const lower = fullName.toLowerCase();
  if (lower.includes('sedan') || lower.includes('saloon')) bodyType = 'Sedan';
  else if (lower.includes('suv') || lower.includes('sport utility')) bodyType = 'SUV';
  else if (lower.includes('coupe') || lower.includes('coupé') || lower.includes('fastback')) bodyType = 'Coupe';
  else if (lower.includes('convertible') || lower.includes('cabrio') || lower.includes('spider') || lower.includes('roadster')) bodyType = 'Convertible';
  else if (lower.includes('hatchback')) bodyType = 'Hatchback';
  else if (lower.includes('wagon') || lower.includes('estate') || lower.includes('touring')) bodyType = 'Wagon';
  else if (lower.includes('pickup') || lower.includes('truck') || lower.includes('ute') || lower.includes('van')) bodyType = 'Truck';
  else if (lower.includes('motorcycle') || lower.includes('bike') || lower.includes('cbr') || lower.includes('gsxr') || lower.includes('harley') || lower.includes('yamaha')) bodyType = 'Motorcycle';
  else bodyType = 'Coupe'; // default to coupe for most cars

  return {
    id,
    slug,
    name: fullName,
    year,
    make,
    model,
    bodyType,
    image: `/images/cars/${slug}.jpg`,
    imageUrl: first.imageUrl || '',
    description: `${year} ${make} ${model} seen in ${entries.length} movie${entries.length !== 1 ? 's' : ''}: ${[...movieMap.values()].map(m => m.title).join(', ')}.`,
    specs: {},
    appearances: [...movieMap.values()].slice(0, 5), // limit to 5 appearances to keep it reasonable
    isFeatured: false,
  };
}

async function main() {
  const inputPath = process.argv[2] || findLatestImcdbJson();
  console.log(`Loading IMCDb data from: ${inputPath}`);

  const raw = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
  const imcdbVehicles = raw.vehicles || [];
  console.log(`Loaded ${imcdbVehicles.length} IMCDb vehicle records`);

  // Group by (make, model, year)
  const groups = new Map();
  for (const v of imcdbVehicles) {
    if (!v.make || !v.fullName) continue;
    const make = normalizeMake(v.make);
    const key = `${make}|${v.model || ''}|${v.year || 0}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(v);
  }
  console.log(`Unique vehicles after grouping: ${groups.size}`);

  // Convert groups to Car entries
  const newCars = [];
  for (const [key, entries] of groups) {
    try {
      const car = imcdbToCar(entries);
      newCars.push(car);
    } catch (e) {
      console.error(`Error processing ${key}: ${e.message}`);
    }
  }

  // Sort by make, then name
  newCars.sort((a, b) => {
    if (a.make !== b.make) return a.make.localeCompare(b.make);
    return a.name.localeCompare(b.name);
  });

  console.log(`Generated ${newCars.length} Car entries`);

  // Read existing cars.ts
  let carsts = fs.readFileSync(CARS_TS, 'utf8');

  // Extract existing slugs to avoid duplicates
  const existingSlugs = new Set();
  const slugPattern = /slug:\s*"([^"]+)"/g;
  let m;
  while ((m = slugPattern.exec(carsts)) !== null) {
    existingSlugs.add(m[1]);
  }
  console.log(`Existing cars in cars.ts: ${existingSlugs.size}`);

  // Filter out duplicates
  const uniqueNewCars = newCars.filter(c => !existingSlugs.has(c.slug));
  console.log(`New cars after dedup: ${uniqueNewCars.length}`);

  // Find the last PART_N number
  const partMatch = carsts.match(/const PART_(\d+):/g);
  const nextPart = partMatch ? Math.max(...partMatch.map(p => parseInt(p.match(/\d+/)[0]))) + 1 : 1;
  const partName = `PART_${nextPart}`;

  // Generate the new PART section
  let partContent = `\nconst ${partName}: Car[] = [\n`;
  for (const car of uniqueNewCars) {
    partContent += `  {\n`;
    partContent += `    id: ${JSON.stringify(car.id)},\n`;
    partContent += `    slug: ${JSON.stringify(car.slug)},\n`;
    partContent += `    name: ${JSON.stringify(car.name)},\n`;
    partContent += `    year: ${car.year},\n`;
    partContent += `    make: ${JSON.stringify(car.make)},\n`;
    partContent += `    model: ${JSON.stringify(car.model)},\n`;
    partContent += `    bodyType: ${JSON.stringify(car.bodyType)},\n`;
    partContent += `    image: ${JSON.stringify(car.image)},\n`;
    partContent += `    imageUrl: ${JSON.stringify(car.imageUrl)},\n`;
    partContent += `    description: ${JSON.stringify(car.description)},\n`;
    partContent += `    specs: {},\n`;
    partContent += `    appearances: [\n`;
    for (const a of car.appearances) {
      partContent += `      { mediaType: "movie", title: ${JSON.stringify(a.title)}, year: ${a.year || 0}, role: "Featured vehicle" },\n`;
    }
    partContent += `    ],\n`;
    partContent += `    isFeatured: false,\n`;
    partContent += `  },\n`;
  }
  partContent += `];\n`;

  // Insert before the export line
  const exportLine = carsts.lastIndexOf('export const cars');
  const beforeExport = carsts.slice(0, exportLine);
  const afterExport = carsts.slice(exportLine);

  const newContent = beforeExport + partContent + '\n' + afterExport.replace(
    /export const cars: Car\[\] = \[/,
    `export const cars: Car[] = [`
  );

  // Update the spread to include the new PART
  const exportRegex = /export const cars: Car\[\] = \[\.\.\.PART_\d+(, \.\.\.PART_\d+)*\]/;
  const newExport = `export const cars: Car[] = [...PART_1, ...PART_2, ...PART_4, ...${partName}]`;
  const finalContent = newContent.replace(exportRegex, newExport);

  fs.writeFileSync(CARS_TS, finalContent);
  console.log(`\n✅ Added ${uniqueNewCars.length} cars as ${partName}`);
  console.log(`   Expected total: ${existingSlugs.size + uniqueNewCars.length}`);
  console.log(`   File: ${CARS_TS}`);

  // Summary stats
  const makes = new Set(uniqueNewCars.map(c => c.make));
  const bodyTypes = new Set(uniqueNewCars.map(c => c.bodyType));
  console.log(`\n📊 Stats:`);
  console.log(`   Makes: ${makes.size}`);
  console.log(`   Body types: ${[...bodyTypes].join(', ')}`);
  console.log(`   With images: ${uniqueNewCars.filter(c => c.imageUrl).length}`);
  console.log(`   Multiple movies: ${uniqueNewCars.filter(c => c.appearances.length > 1).length}`);
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});

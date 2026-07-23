const fs = require('fs');
const content = fs.readFileSync('src/data/cars.ts', 'utf8');
const lines = content.split('\n');

const results = [];

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('imageUrl') && lines[i].includes('wikimedia')) {
    let slug = '', name = '', make = '', model = '', year = '';
    for (let j = Math.max(0, i - 15); j < i; j++) {
      const s = lines[j].match(/slug: "([^"]+)"/);
      const n = lines[j].match(/name: "([^"]+)"/);
      const mk = lines[j].match(/make: "([^"]+)"/);
      const md = lines[j].match(/model: "([^"]+)"/);
      const y = lines[j].match(/year: (\d+)/);
      if (s) slug = s[1];
      if (n) name = n[1];
      if (mk) make = mk[1];
      if (md) model = md[1];
      if (y) year = y[1];
    }
    const urlMatch = lines[i].match(/https:\/\/upload\.wikimedia\.org\/[^"]+/);
    const url = urlMatch ? urlMatch[0] : '';
    const filename = url.split('/').pop() || '';
    
    const lower = (name + ' ' + make + ' ' + model).toLowerCase();
    const lowerFile = filename.toLowerCase();
    
    const hasMake = lowerFile.includes(make.toLowerCase());
    const hasModel = model ? lowerFile.includes(model.toLowerCase().replace(/[^a-z0-9]/g,'')) : false;
    const suspected = !hasMake && !hasModel;
    
    results.push({
      line: i + 1,
      slug, name, make, model, year,
      filename: filename.substring(0, 60),
      suspected
    });
  }
}

console.log('=== WIKIMEDIA IMAGE AUDIT ===');
console.log('Total: ' + results.length + '\n');

results.forEach(r => {
  const tag = r.suspected ? '⚠ SUSPICIOUS' : '✓ OK';
  console.log(tag + ' | ' + r.name + ' (' + r.year + ') | ' + r.make + ' ' + r.model);
  console.log('  File: ' + r.filename);
  console.log('  Line: ' + r.line);
});

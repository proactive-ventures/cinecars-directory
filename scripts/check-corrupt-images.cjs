const fs = require('fs');
const path = require('path');
const dir = 'public/images/cars';

const files = fs.readdirSync(dir);
let corrupt = 0;
let total = files.length;
let htmlErrors = [];

for (const f of files) {
  const fp = path.join(dir, f);
  const buf = fs.readFileSync(fp);
  // HTML files start with <!DOCTYPE or <html
  const firstBytes = buf.slice(0, 100).toString().toLowerCase();
  if (firstBytes.includes('<!doctype') || firstBytes.includes('<html') || firstBytes.includes('<head')) {
    corrupt++;
    htmlErrors.push({ file: f, size: buf.length, snippet: firstBytes.substring(0, 60) });
  }
}

console.log('Total files: ' + total);
console.log('Corrupt (HTML): ' + corrupt);
console.log('');
htmlErrors.forEach(h => {
  console.log('CORRUPT: ' + h.file + ' (' + h.size + ' bytes) - ' + h.snippet);
});

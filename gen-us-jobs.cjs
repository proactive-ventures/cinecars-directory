const fs = require("fs");
const c = fs.readFileSync("src/data/cars.ts", "utf8");
const lines = c.split("\n");
let cur = null;
const cars = [];
for (const l of lines) {
  if (l.match(/^\s{2}\{\s*$/)) { cur = { make: null, model: null, year: null }; cars.push(cur); }
  if (!cur) continue;
  let m;
  if ((m = l.match(/^\s{4}make:\s+"([^"]+)"/))) cur.make = m[1];
  if ((m = l.match(/^\s{4}model:\s+"([^"]+)"/))) cur.model = m[1];
  if ((m = l.match(/^\s{4}year:\s+(\d+)/))) cur.year = parseInt(m[1]);
}
// dedupe by make|model|year
const seen = new Set();
const jobs = [];
for (const car of cars) {
  if (!car.make || !car.model || !car.year) continue;
  const k = `${car.make}|${car.model}|${car.year}`;
  if (seen.has(k)) continue;
  seen.add(k);
  jobs.push({ make: car.make, model: car.model, year: car.year });
}
fs.writeFileSync("data/us-jobs.json", JSON.stringify(jobs, null, 0));
console.log("Unique (make,model,year) jobs:", jobs.length, "of", cars.length, "cars");

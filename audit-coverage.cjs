const fs = require("fs");
const c = fs.readFileSync("src/data/cars.ts", "utf8");
const lines = c.split("\n");
let cur = null;
const cars = [];
for (const l of lines) {
  if (l.match(/^\s{2}\{\s*$/)) { cur = { slug: null, hasSpecsBlock: false, specFields: [], desc: null }; cars.push(cur); }
  if (!cur) continue;
  let m;
  if ((m = l.match(/^\s{4}slug:\s+"([^"]+)"/))) cur.slug = m[1];
  if (l.match(/^\s{4}specs:\s*\{/)) cur.hasSpecsBlock = true;
  if (cur.hasSpecsBlock && (m = l.match(/^\s{6}(horsepower|engine|topSpeed|zeroToSixty|transmission|drivetrain|weight|fuelType|displacement):/))) {
    cur.specFields.push(m[1]);
  }
  if (l.match(/^\s{4}\},?\s*$/) && cur.hasSpecsBlock) cur.hasSpecsBlock = false; // close
}
const total = cars.length;
const withSpecs = cars.filter((c) => c.specFields.length > 0).length;
const specFieldCounts = {};
for (const car of cars) for (const f of car.specFields) specFieldCounts[f] = (specFieldCounts[f] || 0) + 1;
console.log("TOTAL cars:", total);
console.log("With >=1 spec field:", withSpecs, `(${Math.round((withSpecs/total)*100)}%)`);
console.log("Spec field counts:", JSON.stringify(specFieldCounts, null, 0));
// cars with zero specs
const zero = cars.filter((c) => c.specFields.length === 0).length;
console.log("Cars with ZERO specs:", zero);

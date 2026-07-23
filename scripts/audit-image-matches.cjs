const fs = require("fs")
const content = fs.readFileSync("E:\\Sovereign_Vault\\cinecars-directory\\src\\data\\cars.ts", "utf8")

// Split into entries more carefully
const lines = content.split("\n")
const entries = []
let currentEntry = []
for (const line of lines) {
  currentEntry.push(line)
  if (line.trim() === "}," || line.trim() === "}") {
    if (currentEntry.some(l => l.includes("slug:"))) entries.push(currentEntry.join("\n"))
    currentEntry = []
  }
}

let commons = [], imcdb = [], other = []

for (const entry of entries) {
  const slugM = entry.match(/slug:\s*["']([\w-]+)["']/)
  const nameM = entry.match(/name:\s*["']([^"']+)["']/)
  const makeM = entry.match(/make:\s*["']([^"']+)["']/)
  const urlM = entry.match(/imageUrl:\s*["']([^"']+)["']/)
  if (!slugM || !nameM || !urlM) continue
  const url = urlM[1]
  if (url.includes("wikimedia") || url.includes("commons")) {
    commons.push({ slug: slugM[1], name: nameM[1], make: makeM ? makeM[1] : "", url })
  } else if (url.includes("imcdb") || url.match(/\/i\d+\.jpg/)) {
    imcdb.push({ slug: slugM[1], name: nameM[1], make: makeM ? makeM[1] : "", url })
  } else {
    other.push({ slug: slugM[1], name: nameM[1], make: makeM ? makeM[1] : "", url })
  }
}

console.log("=== URL SOURCES ===")
console.log("Total entries with imageUrl:", commons.length + imcdb.length + other.length)
console.log("Wikimedia Commons:", commons.length)
console.log("IMCDb:", imcdb.length)
console.log("Other:", other.length)

// Sample first 10 of each "Other"
if (other.length > 0) {
  console.log("\n=== OTHER URL SAMPLES ===")
  other.slice(0, 10).forEach(s => console.log("  " + s.slug + ": " + s.url.slice(0, 90)))
}

// Check Commons filenames for obvious mismatches
console.log("\n=== COMMONS FILENAME AUDIT (sample 200) ===")
let mismatches = []
for (const s of commons.slice(0, 200)) {
  const fn = decodeURIComponent(s.url.split("/").pop() || "").replace(/_/g, " ")
  const fnLower = fn.toLowerCase()
  const nameWords = s.name.toLowerCase().split(/[\s-]+/).filter(w => w.length > 2)
  const makeWords = s.make.toLowerCase().split(/[\s-]+/).filter(w => w.length > 2)
  const allWords = [...new Set([...nameWords, ...makeWords])]
  const hasMatch = allWords.some(w => fnLower.includes(w))
  const hasYear = fn.match(/(19|20)\d{2}/)
  if (!hasMatch && !hasYear) {
    mismatches.push({ slug: s.slug, name: s.name, fn: fn.slice(0, 60) })
  }
}
if (mismatches.length > 0) {
  console.log("Potentially bad Commons images (" + mismatches.length + "):")
  mismatches.slice(0, 15).forEach(s => console.log("  " + s.slug + " | " + s.name + " | file: " + s.fn))
} else {
  console.log("All sampled Commons filenames look plausible.")
}

// Find IMCDb entries with strange IDs
console.log("\n=== IMCDb SAMPLE (first 30) ===")
imcdb.slice(0, 30).forEach(s => {
  const idM = s.url.match(/(\d{4,6})\.jpg/)
  const id = idM ? idM[1] : "no-id"
  console.log("  " + s.slug + " | " + s.name + " | IMCDb ID: " + id)
})

// Check for any cars where name doesn't match make well
console.log("\n=== POTENTIALLY MISNAMED CARS ===")
for (const entry of entries) {
  const nameM = entry.match(/name:\s*["']([^"']+)["']/)
  const makeM = entry.match(/make:\s*["']([^"']+)["']/)
  if (!nameM || !makeM) continue
  const name = nameM[1].toLowerCase()
  const make = makeM[1].toLowerCase()
  // If make isn't in the name at all for known makes, flag it
  // Skip generic entries like "Custom" make
  if (make !== "custom" && make !== "other" && make !== "various" && !name.includes(make)) {
    // Only flag if the make is a known brand
    const knownBrands = ["ford", "chevrolet", "dodge", "pontiac", "toyota", "nissan", "honda", "subaru", "ferrari", "porsche", "lamborghini", "aston martin", "bmw", "mercedes", "audi", "volkswagen", "jeep", "plymouth", "oldsmobile", "buick", "cadillac", "mazda", "mitsubishi", "hyundai", "acura", "lexus", "jaguar", "land rover", "fiat", "alfa romeo", "lincoln", "chrysler", "tesla", "mclaren", "lotus", "maserati", "bentley", "rolls-royce", "mini", "volvo", "saab", "suzuki", "isuzu", "peugeot", "renault", "citroen"]
    if (knownBrands.includes(make)) {
      // Only show if truly weird - e.g. "Ford" not in "Ford Mustang"
      if (name !== make + " " + make && name !== make) {
        console.log("  " + nameM[1] + " (make: " + makeM[1] + ")")
      }
    }
  }
}

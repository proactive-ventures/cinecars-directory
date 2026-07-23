const fs = require("fs")
const path = require("path")

// Audit cars
const carContent = fs.readFileSync("E:\\Sovereign_Vault\\cinecars-directory\\src\\data\\cars.ts", "utf8")
const carEntries = carContent.split("},")
let totalCars = 0, missingLocal = 0, withFallback = 0, noImageAtAll = 0

for (const entry of carEntries) {
  const slugMatch = entry.match(/slug:\s*["']([\w-]+)["']/)
  if (!slugMatch) continue
  totalCars++
  const imgMatch = entry.match(/image:\s*["']([^"']*)["']/)
  const urlMatch = entry.match(/imageUrl:\s*["']([^"']*)["']/)
  const img = imgMatch ? imgMatch[1] : ""
  const url = urlMatch ? urlMatch[1] : ""
  const localPath = img.startsWith("/") ? "E:\\Sovereign_Vault\\cinecars-directory\\public" + img : ""
  const exists = localPath ? fs.existsSync(localPath) : false
  if (!exists && img) missingLocal++
  if (!exists && url) withFallback++
  if (!exists && !url) { noImageAtAll++; if (noImageAtAll <= 15) console.log("  BROKEN:", slugMatch[1], img || "(no local)", url ? url.slice(0, 60) : "(no URL)") }
}

console.log("=== CARS ===")
console.log("Total:", totalCars)
console.log("Missing local file:", missingLocal)
console.log("With remote fallback:", withFallback)
console.log("NO image at all:", noImageAtAll)

// Audit movies
const movieContent = fs.readFileSync("E:\\Sovereign_Vault\\cinecars-directory\\src\\data\\movies.ts", "utf8")
const movieEntries = movieContent.split("},")
let totalMovies = 0, movieMissing = []
for (const entry of movieEntries) {
  const slugMatch = entry.match(/slug:\s*["']([\w-]+)["']/)
  if (!slugMatch) continue
  totalMovies++
  const imgMatch = entry.match(/image:\s*["']([^"']*)["']/)
  const img = imgMatch ? imgMatch[1] : ""
  if (img) {
    const localPath = "E:\\Sovereign_Vault\\cinecars-directory\\public" + img
    if (!fs.existsSync(localPath)) movieMissing.push(slugMatch[1] + " -> " + img)
  } else movieMissing.push(slugMatch[1] + " (no image field)")
}

console.log("\n=== MOVIES ===")
console.log("Total:", totalMovies)
console.log("Missing on disk:", movieMissing.length)
movieMissing.forEach(m => console.log("  ", m))

// Audit TV series
const tvContent = fs.readFileSync("E:\\Sovereign_Vault\\cinecars-directory\\src\\data\\tv-series.ts", "utf8")
const tvEntries = tvContent.split("},")
let totalTV = 0, tvMissing = []
for (const entry of tvEntries) {
  const slugMatch = entry.match(/slug:\s*["']([\w-]+)["']/)
  if (!slugMatch) continue
  totalTV++
  const imgMatch = entry.match(/image:\s*["']([^"']*)["']/)
  const img = imgMatch ? imgMatch[1] : ""
  if (img) {
    const localPath = "E:\\Sovereign_Vault\\cinecars-directory\\public" + img
    if (!fs.existsSync(localPath)) tvMissing.push(slugMatch[1] + " -> " + img)
  } else tvMissing.push(slugMatch[1] + " (no image field)")
}

console.log("\n=== TV SERIES ===")
console.log("Total:", totalTV)
console.log("Missing on disk:", tvMissing.length)
tvMissing.forEach(m => console.log("  ", m))

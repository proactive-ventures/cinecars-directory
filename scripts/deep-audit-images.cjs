const fs = require("fs")
const content = fs.readFileSync("E:\\Sovereign_Vault\\cinecars-directory\\src\\data\\cars.ts", "utf8")

// Extract all entries with image + imageUrl
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

let flagged = []
let localOk = 0
let localMissing = 0

for (const entry of entries) {
  const slugM = entry.match(/slug:\s*["']([\w-]+)["']/)
  const nameM = entry.match(/name:\s*["']([^"']+)["']/)
  const makeM = entry.match(/make:\s*["']([^"']+)["']/)
  const modelM = entry.match(/model:\s*["']([^"']+)["']/)
  const imageM = entry.match(/image:\s*["']([^"']+)["']/)
  const urlM = entry.match(/imageUrl:\s*["']([^"']+)["']/)
  if (!slugM || !nameM) continue

  const slug = slugM[1]
  const name = nameM[1]
  const make = makeM ? makeM[1] : ""
  const model = modelM ? modelM[1] : ""
  const image = imageM ? imageM[1] : ""
  const url = urlM ? urlM[1] : ""

  // Check local file existence
  if (image && image.startsWith("/")) {
    const localPath = "E:\\Sovereign_Vault\\cinecars-directory\\public" + image
    if (!fs.existsSync(localPath)) {
      localMissing++
      // Check if imageUrl exists as fallback
      if (!url) {
        flagged.push({ slug, name, issue: "NO local file AND NO imageUrl" })
      }
    } else {
      localOk++
    }
  }

  // Check for IMCDb URLs with potentially wrong IDs
  if (url && url.includes("imcdb")) {
    // Extract IMCDb ID
    const idM = url.match(/(\d{4,6})\.jpg/)
    const id = idM ? idM[1] : ""

    // Check if this is a zero-padded ID (5-digit IDs used for some makes)
    // Known issue: some IMCDb IDs might correspond to different makes
    // Flag cars where the IMCDb ID seems suspicious (e.g., very low numbers)
    if (id && parseInt(id) < 10000 && !make.includes("Custom") && !make.includes("Various")) {
      // Low IDs might be wrong
      // But many valid cars have low IDs, so just log for review
      flagged.push({ slug, name, make, issue: "Low IMCDb ID: " + id, url: url.slice(0, 60) })
    }
  }

  // Check for mystery machine - we know it has a wrong imageUrl
  if (slug === "mystery-machine" && url) {
    flagged.push({ slug, name, issue: "Mystery Machine imageUrl should point to Scooby van", url: url.slice(0, 70) })
  }

  // Flag entries where local image exists but is tiny/broken
  if (image && image.startsWith("/")) {
    const localPath = "E:\\Sovereign_Vault\\cinecars-directory\\public" + image
    if (fs.existsSync(localPath)) {
      const size = fs.statSync(localPath).size
      if (size < 1000) {
        flagged.push({ slug, name, issue: "Suspiciously small local image: " + size + " bytes" })
      }
    }
  }
}

console.log("=== CAR IMAGE AUDIT ===")
console.log("Total entries:", entries.length)
console.log("Local files existing:", localOk)
console.log("Local files missing:", localMissing)
console.log("")

console.log("=== FLAGGED ENTRIES ===")
for (const f of flagged) {
  console.log(f.slug + " | " + f.name + " | " + f.issue + (f.url ? " | " + f.url : ""))
}
console.log("")
console.log("Total flagged:", flagged.length)

// Also check specific famous cars for correctness
console.log("\n=== FAMOUS CAR CHECK ===")
const famous = ["kitt", "general-lee-1969", "herbie-1963", "ecto-1-1959", "batmobile-tumbler", "batmobile-1966", "bluesmobile-1974", "bumblebee-camaro", "delorean-dmc-12", "ferrari-testarossa-1986", "mr-bean-mini-1977", "jurassic-park-jeep-1997", "mystery-machine", "bandit-trans-am-1977"]
for (const entry of entries) {
  const slugM = entry.match(/slug:\s*["']([\w-]+)["']/)
  if (!slugM || !famous.includes(slugM[1])) continue
  const nameM = entry.match(/name:\s*["']([^"']+)["']/)
  const makeM = entry.match(/make:\s*["']([^"']+)["']/)
  const modelM = entry.match(/model:\s*["']([^"']+)["']/)
  const imageM = entry.match(/image:\s*["']([^"']+)["']/)
  const urlM = entry.match(/imageUrl:\s*["']([^"']+)["']/)
  const image = imageM ? imageM[1] : ""
  const url = urlM ? urlM[1] : ""
  const localExists = image && image.startsWith("/") ? fs.existsSync("E:\\Sovereign_Vault\\cinecars-directory\\public" + image) : false
  console.log(slugM[1])
  console.log("  Name:", nameM ? nameM[1] : "N/A")
  console.log("  Make:", makeM ? makeM[1] : "N/A")
  console.log("  Model:", modelM ? modelM[1] : "N/A")
  console.log("  Local image exists:", localExists)
  console.log("  imageUrl:", url ? url.slice(0, 80) : "NONE")
  console.log("")
}

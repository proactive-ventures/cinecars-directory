const fs = require("fs")
const content = fs.readFileSync("E:\\Sovereign_Vault\\cinecars-directory\\src\\data\\cars.ts", "utf8")

// Find all slugs
const slugRegex = /slug:\s*["']([\w-]+)["']/g
const slugs = []
let m
while ((m = slugRegex.exec(content))) slugs.push(m[1])

// Find imageUrl lines and map to slugs
const lines = content.split("\n")
const slugsWithImageUrl = new Set()
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes("imageUrl:")) {
    for (let j = i; j >= 0; j--) {
      const sm = lines[j].match(/slug:\s*["']([\w-]+)["']/)
      if (sm) {
        slugsWithImageUrl.add(sm[1])
        break
      }
    }
  }
}

// Check local files exist
let noFileNoUrl = [],
  hasUrl = []
for (const slug of slugs) {
  const localPath = "E:\\Sovereign_Vault\\cinecars-directory\\public\\images\\cars\\" + slug + ".jpg"
  const fileExists = fs.existsSync(localPath)
  const hasRemote = slugsWithImageUrl.has(slug)
  if (!fileExists && !hasRemote) noFileNoUrl.push(slug)
  if (!fileExists && hasRemote) hasUrl.push(slug)
}

console.log("Total slugs:", slugs.length)
console.log("Entries with imageUrl:", slugsWithImageUrl.size)
console.log("Missing local + NO imageUrl:", noFileNoUrl.length)
if (noFileNoUrl.length > 0) {
  console.log("  List:", noFileNoUrl.join(", "))
}
console.log("Missing local + HAS imageUrl:", hasUrl.length)

const https = require("https")
const fs = require("fs")
const path = require("path")

// ALL URLs verified via Special:FilePath redirects + curl
const images = [
  {
    slug: "bandit-trans-am-1977", type: "car",
    url: "https://upload.wikimedia.org/wikipedia/commons/5/51/Pontiac_Firebird_350_Hirschaid-20220709-RM-120721.jpg",
    attribution: "Ermell", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Pontiac_Firebird_350_Hirschaid-20220709-RM-120721.jpg",
    ext: ".jpg"
  },
  {
    slug: "mystery-machine", type: "car",
    url: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Scooby_Doo_Mystery_Machine_van_2.jpg",
    attribution: "James St. John", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Scooby_Doo_Mystery_Machine_van_2.jpg",
    ext: ".jpg"
  },
  {
    slug: "gran-torino-1975", type: "car",
    url: "https://upload.wikimedia.org/wikipedia/commons/5/51/1976_Ford_Gran_Torino_Coupe_(15763567039).jpg",
    attribution: "Sicnag", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:1976_Ford_Gran_Torino_Coupe_(15763567039).jpg",
    ext: ".jpg"
  },
  {
    slug: "impala-1967", type: "car",
    url: "https://upload.wikimedia.org/wikipedia/commons/e/ee/1967_Chevrolet_Impala_4_door_Hardtop.jpg",
    attribution: "Sicnag", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:1967_Chevrolet_Impala_4_door_Hardtop.jpg",
    ext: ".jpg"
  },
  {
    slug: "mr-bean-mini-1977", type: "car",
    url: "https://upload.wikimedia.org/wikipedia/commons/0/03/1979_Austin_Morris_Mini_-_Mr_Bean_(5962664283).jpg",
    attribution: "sv1ambo", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:1979_Austin_Morris_Mini_-_Mr_Bean_(5962664283).jpg",
    ext: ".jpg"
  },
  {
    slug: "aztek-pontiac", type: "car",
    url: "https://upload.wikimedia.org/wikipedia/commons/5/5a/2002-05_Pontiac_Aztek.jpg",
    attribution: "IFCAR", license: "Public Domain", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:2002-05_Pontiac_Aztek.jpg",
    ext: ".jpg"
  },
  {
    slug: "supra-mk4-1995", type: "car",
    url: "https://upload.wikimedia.org/wikipedia/commons/0/06/The_frontview_of_Toyota_Supra_RZ_Mid-year_1995.jpg",
    attribution: "Tokumeigakarinoaoshima", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:The_frontview_of_Toyota_Supra_RZ_Mid-year_1995.jpg",
    ext: ".jpg"
  },
  {
    slug: "audi-r8-2008", type: "car",
    url: "https://upload.wikimedia.org/wikipedia/commons/d/d4/2008_Audi_R8_V8_Quattro.jpg",
    attribution: "Calreyn88", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:2008_Audi_R8_V8_Quattro.jpg",
    ext: ".jpg"
  },
  {
    slug: "ferrari-250-gt-1961", type: "car",
    url: "https://upload.wikimedia.org/wikipedia/commons/e/ed/FERRARI_250_GT_CALIFORNIA_(5856768622).jpg",
    attribution: "ZANTAFIO56", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:FERRARI_250_GT_CALIFORNIA_(5856768622).jpg",
    ext: ".jpg"
  },
  {
    slug: "christine-1958", type: "car",
    url: "https://upload.wikimedia.org/wikipedia/commons/a/a0/1958_Plymouth_Fury_(20402932206).jpg",
    attribution: "greggjerdingen", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:1958_Plymouth_Fury_(20402932206).jpg",
    ext: ".jpg"
  },
  {
    slug: "chitty-chitty-bang-bang", type: "car",
    url: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Chitty_Chitty_Bang_Bang_UK_Replica.jpg",
    attribution: "Richerman", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Chitty_Chitty_Bang_Bang_UK_Replica.jpg",
    ext: ".jpg"
  },
  {
    slug: "nissan-240sx-1997", type: "car",
    url: "https://upload.wikimedia.org/wikipedia/commons/5/56/1996_Nissan_240SX_S14.jpg",
    attribution: "Calreyn88", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:1996_Nissan_240SX_S14.jpg",
    ext: ".jpg"
  },
  {
    slug: "subaru-impreza-wrx-2006", type: "car",
    url: "https://upload.wikimedia.org/wikipedia/commons/6/68/2006_Subaru_Impreza_WRX_STI_sedan_(21733354913).jpg",
    attribution: "126433814@N04", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:2006_Subaru_Impreza_WRX_STI_sedan_(21733354913).jpg",
    ext: ".jpg"
  },
  {
    slug: "jurassic-park-jeep-1997", type: "car",
    url: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Jeep_Wrangler_Jurassic_Park.jpg",
    attribution: "rebelcan", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Jeep_Wrangler_Jurassic_Park.jpg",
    ext: ".jpg"
  },
  // Movie images
  {
    slug: "christine-1983", type: "movie",
    url: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Christine.jpg",
    attribution: "Nv8200p", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Christine.jpg",
    ext: ".jpg"
  },
  {
    slug: "rockford-files", type: "tv-series",
    url: "https://upload.wikimedia.org/wikipedia/commons/6/62/James_Garner_James_Whitmore_Jr._Rockford_Files_1977.JPG",
    attribution: "NBC Television", license: "Public Domain", licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:James_Garner_James_Whitmore_Jr._Rockford_Files_1977.JPG",
    ext: ".jpg"
  },
  {
    slug: "top-gear", type: "tv-series",
    url: "https://upload.wikimedia.org/wikipedia/commons/7/79/Top_Gear_logo.jpg",
    attribution: "Wadim", license: "Public Domain", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Top_Gear_logo.jpg",
    ext: ".jpg"
  }
]

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest)
    https.get(url, { headers: { "User-Agent": "CineCars/1.0" } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close()
        try { fs.unlinkSync(dest) } catch(e) {}
        return download(res.headers.location, dest).then(resolve).catch(reject)
      }
      if (res.statusCode !== 200) {
        file.close()
        try { fs.unlinkSync(dest) } catch(e) {}
        return reject(new Error(`HTTP ${res.statusCode}`))
      }
      res.pipe(file)
      file.on("finish", () => { file.close(); resolve() })
    }).on("error", (err) => {
      try { file.close(); fs.unlinkSync(dest) } catch(e) {}
      reject(err)
    })
  })
}

async function main() {
  const results = { success: [], failed: [] }

  for (const img of images) {
    let destDir
    if (img.type === "car") destDir = "E:\\Sovereign_Vault\\cinecars-directory\\public\\images\\cars"
    else if (img.type === "movie") destDir = "E:\\Sovereign_Vault\\cinecars-directory\\public\\images\\movies"
    else destDir = "E:\\Sovereign_Vault\\cinecars-directory\\public\\images\\tv-series"

    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true })
    const destPath = path.join(destDir, img.slug + ".jpg")

    if (fs.existsSync(destPath)) {
      console.log(`✓ ${img.slug} exists`)
      results.success.push(img.slug)
      continue
    }

    process.stdout.write(`Downloading ${img.slug}... `)
    try {
      await download(img.url, destPath)
      console.log(`✓`)
      results.success.push(img.slug)
    } catch (e) {
      console.log(`✗ ${e.message}`)
      results.failed.push(img.slug)
    }
    await new Promise(r => setTimeout(r, 600))
  }

  console.log("\n=== SUMMARY ===")
  console.log(`Success: ${results.success.length}`)
  console.log(`Failed: ${results.failed.length}`)
  if (results.failed.length) console.log("Failed:", results.failed.join(", "))

  // Write image-attribution.json
  const attribution = {}
  for (const img of images) {
    if (results.success.includes(img.slug)) {
      attribution[img.slug] = {
        source: "Wikimedia Commons",
        author: img.attribution,
        license: img.license,
        licenseUrl: img.licenseUrl,
        sourceUrl: img.sourceUrl
      }
    }
  }
  fs.writeFileSync(
    "E:\\Sovereign_Vault\\cinecars-directory\\src\\data\\image-attribution.json",
    JSON.stringify(attribution, null, 2)
  )
  console.log("\nAttribution data written.")
}

main().catch(console.error)

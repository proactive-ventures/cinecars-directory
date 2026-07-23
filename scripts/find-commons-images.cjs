const https = require("https")
const fs = require("fs")
const path = require("path")

const CARS = [
  { slug: "bandit-trans-am-1977", query: "Pontiac Firebird Trans Am 1977" },
  { slug: "mystery-machine", query: "Mystery Machine Scooby-Doo van" },
  { slug: "gran-torino-1975", query: "Ford Gran Torino 1975" },
  { slug: "impala-1967", query: "Chevrolet Impala 1967" },
  { slug: "mr-bean-mini-1977", query: "Mini Mr Bean 1977" },
  { slug: "aztek-pontiac", query: "Pontiac Aztek" },
  { slug: "supra-mk4-1995", query: "Toyota Supra MKIV 1995" },
  { slug: "audi-r8-2008", query: "Audi R8 2008" },
  { slug: "ferrari-250-gt-1961", query: "Ferrari 250 GT 1961" },
  { slug: "christine-1958", query: "Plymouth Fury 1958" },
  { slug: "chitty-chitty-bang-bang", query: "Chitty Chitty Bang Bang car" },
  { slug: "nissan-240sx-1997", query: "Nissan 240SX 1997" },
  { slug: "subaru-impreza-wrx-2006", query: "Subaru Impreza WRX 2006" },
  { slug: "jurassic-park-jeep-1997", query: "Jurassic Park Jeep Wrangler" },
]

const MEDIA = [
  { slug: "christine-1983", query: "Christine 1983 Plymouth Fury film", type: "movies" },
  { slug: "rockford-files", query: "The Rockford Files Firebird", type: "tv-series" },
  { slug: "top-gear", query: "Top Gear presenters Stig", type: "tv-series" },
]

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": "CineCars/1.0" } }, (res) => {
      let data = ""
      res.on("data", (c) => (data += c))
      res.on("end", () => { try { resolve(JSON.parse(data)) } catch (e) { reject(e) } })
    }).on("error", reject)
  })
}

async function searchCommons(query) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}+filetype:bitmap&srnamespace=6&format=json&srlimit=5&origin=*`
  return fetchJSON(url)
}

async function getImageInfo(title) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url|extmetadata|size|mime&format=json&origin=*`
  return fetchJSON(url)
}

async function main() {
  console.log("=== SEARCHING COMMONS FOR BROKEN CAR IMAGES ===\n")
  const results = []
  for (const car of CARS) {
    process.stdout.write(`Searching: ${car.slug}... `)
    try {
      const search = await searchCommons(car.query)
      const pages = search.query.search
      if (pages && pages.length > 0) {
        const candidates = []
        for (const page of pages.slice(0, 3)) {
          const info = await getImageInfo(page.title)
          const pages2 = info.query.pages
          for (const id of Object.keys(pages2)) {
            const p = pages2[id]
            if (p.imageinfo && p.imageinfo.length > 0) {
              const ii = p.imageinfo[0]
              const extmeta = ii.extmetadata || {}
              const license = (extmeta.License && extmeta.License.value) || ""
              const artist = (extmeta.Artist && extmeta.Artist.value.replace(/<[^>]+>/g, "").trim()) || ""
              // Only accept free licenses
              const freeLicenses = ["cc0", "cc-by", "cc-by-sa", "public domain", "gfdl"]
              const isFree = freeLicenses.some(l => license.toLowerCase().includes(l)) || license === ""
              candidates.push({
                title: page.title,
                url: ii.url,
                thumb: ii.thumburl || ii.url,
                license,
                artist,
                pageUrl: `https://commons.wikimedia.org/wiki/${encodeURIComponent(page.title)}`,
                isFree,
                width: ii.width,
                height: ii.height,
                mime: ii.mime,
              })
            }
          }
        }
        // Prefer free-licensed images
        const free = candidates.filter(c => c.isFree)
        const best = free.length > 0 ? free[0] : candidates[0]
        if (best) {
          results.push({ slug: car.slug, ...best })
          console.log(`✓ ${best.title} (${best.license || "unknown"} | ${best.artist || "no artist"})`)
        } else {
          console.log(`✗ no images found`)
        }
      } else {
        console.log(`✗ no results`)
      }
    } catch (e) {
      console.log(`✗ error: ${e.message}`)
    }
    // Delay
    await new Promise(r => setTimeout(r, 500))
  }

  console.log("\n=== RESULTS ===\n")
  for (const r of results) {
    console.log(`${r.slug}:`)
    console.log(`  URL: ${r.url}`)
    console.log(`  License: ${r.license}`)
    console.log(`  Artist: ${r.artist}`)
    console.log(`  Page: ${r.pageUrl}`)
    console.log(`  Width: ${r.width}, Height: ${r.height}`)
    console.log()
  }
}

main().catch(console.error)

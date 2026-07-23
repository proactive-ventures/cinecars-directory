const https = require("https");

const urls = [
  {name: "Chitty Chitty", path: "Chitty_Chitty_Bang_Bang_UK_Replica.jpg"},
  {name: "Nissan 240SX", path: "1996_Nissan_240SX_S14.jpg"},
  {name: "Subaru WRX", path: "2006_Subaru_Impreza_WRX_STI_sedan_(21733354913).jpg"},
  {name: "Jurassic Jeep", path: "Jeep_Wrangler_Jurassic_Park.jpg"},
  {name: "Christine movie", path: "Christine.jpg"},
  {name: "Rockford Files", path: "James_Garner_James_Whitmore_Jr._Rockford_Files_1977.JPG"},
  {name: "Top Gear", path: "Top_Gear_logo.jpg"},
  {name: "Mr Bean Mini", path: "1979_Austin_Morris_Mini_-_Mr_Bean_(5962664283).jpg"},
  {name: "Gran Torino", path: "1976_Ford_Gran_Torino_Coupe_(15763567039).jpg"},
  {name: "Impala 1967", path: "1967_Chevrolet_Impala_4_door_Hardtop.jpg"},
  {name: "Aztek", path: "2002-05_Pontiac_Aztek.jpg"},
  {name: "Supra MK4", path: "The_frontview_of_Toyota_Supra_RZ_Mid-year_1995.jpg"},
  {name: "Audi R8", path: "2008_Audi_R8_V8_Quattro.jpg"},
  {name: "Ferrari 250 GT", path: "FERRARI_250_GT_CALIFORNIA_(5856768622).jpg"},
  {name: "Christine 1958", path: "1958_Plymouth_Fury_(20402932206).jpg"},
  {name: "Bandit Trans Am (broken)", path: "1977_Pontiac_Firebird_Trans_Am_(Smokey_and_the_Bandit).jpg"},
  {name: "Mystery Machine (broken)", path: "The_Mystery_Machine_(SDCC_2013).jpg"}
];

function check(name, path) {
  return new Promise(resolve => {
    const url = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(path)}`;
    https.get(url, {headers: {"User-Agent": "Mozilla/5.0"}}, res => {
      let code = res.statusCode;
      let loc = res.headers.location || "";
      if (code === 302 && loc) {
        // Follow redirect
        https.get(loc, {headers: {"User-Agent": "Mozilla/5.0"}}, res2 => {
          resolve({name, status: res2.statusCode, finalUrl: res2.headers.location || loc});
        });
      } else {
        resolve({name, status: code, finalUrl: loc});
      }
    }).on("error", e => resolve({name, status: "ERR", finalUrl: e.message}));
  });
}

async function main() {
  for (const u of urls) {
    const r = await check(u.name, u.path);
    const ok = r.status === 200 || r.status === 302;
    console.log(`${ok ? "✓" : "✗"} ${r.name}: HTTP ${r.status}${r.finalUrl ? " → " + r.finalUrl.slice(0, 70) : ""}`);
    await new Promise(r => setTimeout(r, 600));
  }
}

main();

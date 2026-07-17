const { chromium } = require('playwright');

const QUERIES = [
  'Fast and Furious 6',
  'Knight Rider TV',
  'Knight Rider 1982',
  'Supernatural TV',
  'Supernatural 2005',
  'The Walking Dead TV',
  'Breaking Bad',
  'F9 2021',
  'F9 Fast Saga',
  'Taxi 1998 French',
  'Duel 1971',
];

async function main() {
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
  const ctx = await browser.newContext({ userAgent: 'Mozilla/5.0' });
  const page = await ctx.newPage();

  for (const q of QUERIES) {
    console.log(`\n=== "${q}" ===`);
    await page.goto(`https://www.imcdb.org/movies.php?title=${encodeURIComponent(q)}`, { waitUntil: 'domcontentloaded', timeout: 20000 }).catch(() => {});
    await page.waitForTimeout(1500);

    const results = await page.$$eval('table tr', trs =>
      trs.map(tr => {
        const link = tr.querySelector('a[href*="movie_"]');
        if (!link) return null;
        const cells = tr.querySelectorAll('td');
        return {
          url: link.href,
          name: link.textContent.trim(),
          type: cells[2] ? cells[2].textContent.trim() : '',
          year: cells[3] ? cells[3].textContent.trim() : '',
        };
      }).filter(r => r !== null)
    );

    for (const r of results) {
      console.log(`  ${r.type} ${r.year}: "${r.name}"`);
      console.log(`    ${r.url}`);
    }
  }

  await browser.close();
}

main().catch(console.error);

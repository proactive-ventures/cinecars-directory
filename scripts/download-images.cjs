const fs = require("fs");
const path = require("path");

const CARS_FILE = path.join(process.cwd(), "src", "data", "cars.ts");
const OUTPUT_DIR = path.join(process.cwd(), "public", "images", "cars");
const CONCURRENCY = 10;
const TIMEOUT_MS = 30000;

function parseCarEntries(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n");

  const slugs = [];
  const imageUrls = [];

  const slugRe = /^\s{4}slug:\s+"([^"]+)",?\r?$/;
  const imageUrlRe = /^\s{4}imageUrl:\s+"(https?:\/\/[^"]+)",?\r?$/;

  for (const line of lines) {
    const slugMatch = line.match(slugRe);
    if (slugMatch) slugs.push(slugMatch[1]);

    const urlMatch = line.match(imageUrlRe);
    if (urlMatch) imageUrls.push(urlMatch[1]);
  }

  if (slugs.length !== imageUrls.length) {
    console.warn(
      `Warning: slug count (${slugs.length}) != imageUrl count (${imageUrls.length}). Using minimum.`
    );
  }

  const count = Math.min(slugs.length, imageUrls.length);
  const entries = [];
  for (let i = 0; i < count; i++) {
    entries.push({ slug: slugs[i], imageUrl: imageUrls[i] });
  }
  return entries;
}

async function fetchWithTimeout(url, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const buffer = Buffer.from(await response.arrayBuffer());
    return buffer;
  } finally {
    clearTimeout(timer);
  }
}

async function downloadWorker(entries, results) {
  for (const entry of entries) {
    const { slug, imageUrl } = entry;
    const outputPath = path.join(OUTPUT_DIR, `${slug}.jpg`);

    if (fs.existsSync(outputPath)) {
      results.skipped++;
      console.log(`[${results.downloaded + results.skipped + results.failed}/${results.total}] ${slug} (SKIP)`);
      continue;
    }

    try {
      const buffer = await fetchWithTimeout(imageUrl, TIMEOUT_MS);
      fs.writeFileSync(outputPath, buffer);
      results.downloaded++;
      console.log(`[${results.downloaded + results.skipped + results.failed}/${results.total}] ${slug} (OK)`);
    } catch (err) {
      results.failed++;
      console.log(`[${results.downloaded + results.skipped + results.failed}/${results.total}] ${slug} (FAIL) — ${err.message}`);
    }
  }
}

async function main() {
  console.log("Parsing car entries from cars.ts...");
  const entries = parseCarEntries(CARS_FILE);
  const total = entries.length;
  console.log(`Found ${total} cars with imageUrl.`);

  if (total === 0) {
    console.log("No images to download.");
    return;
  }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const results = { downloaded: 0, skipped: 0, failed: 0, total };

  // Shuffle entries to distribute load
  const shuffled = [...entries].sort(() => Math.random() - 0.5);

  // Split into chunks for workers
  const chunks = [];
  for (let i = 0; i < shuffled.length; i += CONCURRENCY) {
    chunks.push(shuffled.slice(i, i + CONCURRENCY));
  }

  console.log(`Downloading with concurrency ${CONCURRENCY}...\n`);

  // Run all chunks sequentially, each chunk is a batch of concurrent downloads
  for (const chunk of chunks) {
    const workers = chunk.map((entry) =>
      downloadWorker([entry], results)
    );
    await Promise.all(workers);
  }

  console.log(`\nDone. Downloaded ${results.downloaded}, Skipped ${results.skipped}, Failed ${results.failed}`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

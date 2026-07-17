## Goal
- Build a production-grade, hyper-SEO/AEO/GEO-optimized directory of all vehicles from movies and TV series, with real images, card-flip animations, exhaustive data, and shadcn/ui-powered UI/UX.

## Constraints & Preferences
- All cards must have real images and flip on interaction (CSS 3D rotateY) revealing specs, appearances, fun facts, iconic scenes, and "Details" link
- Must scrape every online source exhaustively for ALL vehicle types (cars, vans, trucks, motorcycles, semi-trucks, etc.)
- Production-grade: 0 build errors, 0 lint warnings, static pages
- User said: "implement each and every single detail" — trusts assistant to decide priorities

## Progress
### Done
- Next.js 16.2.10 (TypeScript, Tailwind v4, framer-motion, lucide-react), 18 shadcn/ui components
- 19+ React components; 17 route files; CarCard with 3D CSS flip; JSON-LD on all pages
- `scripts/imcdb-scraper.cjs` — Playwright IMCDb scraper, 108 TARGETS, 6-parallel-page pool, `imcdbUrl` overrides. Pattern: extract `vehicle_XXXX-Make-Model-Year.html` URLs → build `i{6-digit}.jpg` images. Initial D not found (skipped).
- `scripts/merge-imcdb.cjs` — dedup by (make, model, year), merge appearances, generate PART_N
- Fixed 6 bad matches via `imcdbUrl`: Knight Rider (movie_83437), Supernatural (movie_460681), F9 (movie_5433138), Furious 6 (movie_1905041), The Walking Dead (movie_1520211), Breaking Bad (movie_903747)
- `scripts/download-images.cjs` — downloads local images to `public/images/cars/{slug}.jpg` (skips existing)
- `scripts/generate-funfacts.cjs` — data-driven fun facts + iconicScene for all cars
- `scripts/wikipedia-specs.cjs` — Wikipedia infobox scraper → cache JSON (safe, no direct file edit)
- `scripts/apply-wikipedia-specs.cjs` — applies cache to cars.ts (safe)
- Expanded TARGETS to 108 movies (Star Wars, Harry Potter, Mission: Impossible, Mad Max, Initial D attempted, Terminator, RoboCop, Die Hard, Bourne, etc.)
- Full scrape: 10,978 vehicles, 408 makes. Merged 1,468 new cars as PART_5
- **Build: 7,792 pages, 0 errors** (7,301 car pages, 411 makes, 32 movies, 15 TV series, 12 decades, 8 franchises)
- Images: 6,466 local images (5,285 prior + 1,181 new; 791 IMCDb 404s expected)
- Motorcycle/bike UI: added "Motorcycle" + real body types to `bodyTypes` constant; `/cars` filter works
- TS check passes

### In Progress
- **Wikipedia specs enrichment** — `wikipedia-specs.cjs` running in background (~190/4,513 models, cache at ~2,653). Will apply via `apply-wikipedia-specs.cjs` when done (~70 min total).

### Blocked
- (none)

## Key Decisions
- shadcn/ui v4 for consistency/accessibility
- CSS 3D rotateY flip (not framer-motion) — smoother, no conflicts
- Playwright over Crawl4AI/Firecrawl — Node available
- URL-based vehicle extraction — no per-vehicle page visits
- Image URL from vehicle ID: `https://www.imcdb.org/i{6-digit-padded}.jpg`
- `imcdbUrl` override for search-resistant targets
- **Wikipedia enrichment = cache-then-apply pattern** (NEVER let subagent edit cars.ts directly — caused corruption before)
- Git repo at `E:\Sovereign_Vault\cinecars-directory\.git` (2 commits; last = `6b1d750`)

## Next Steps
1. Finish Wikipedia specs (apply cache → rebuild)
2. Performance tuning (ISR or static export for Vercel)
3. Deploy to Vercel
4. Generate richer descriptions/fun facts via LLM batch for top cars
5. Maybe add Wikipedia description snippets to car detail pages

## Critical Context
- Project at `E:\Sovereign_Vault\cinecars-directory` (hyphenated, lowercase) — NOT `CineCarsDirectory`
- `cars.ts` structure: PART_1 (git, 79 cars) + PART_2 (git) + PART_3 (full 64-movie scrape, 4,043) + PART_4 (corrected 6 movies, 1,715) + PART_5 (expanded 108-movie scrape, 1,468 new). Export = `[...PART_1, ...PART_2, ...PART_3, ...PART_4, ...PART_5]`. Total = 7,303 cars.
- bodyTypes in data: mostly "Coupe" (6,637, generic IMCDb), Convertible 119, Wagon 179, Truck 143, Sedan 76, Motorcycle 82, plus sparse real types
- 791 IMCDb image URLs 404 (fall back to gradient/initials)
- PowerShell corrupts `>` redirects to UTF-16; use `node -e` with `fs.writeFileSync(..., 'utf8')` or temp .cjs scripts
- Build: ~6.5 min (66s compile + 16s TS + 6.4min SSG for 7,792 pages)
- Wikipedia scraper: 1s delay between requests to avoid rate-limit; cache saved every 10 models

## Relevant Files
- `scripts/imcdb-scraper.cjs`: Playwright scraper, 108 TARGETS, 6-parallel-page pool
- `scripts/merge-imcdb.cjs`: dedup + PART_N generation
- `scripts/download-images.cjs`: local image downloader
- `scripts/generate-funfacts.cjs`: data-driven fun facts + iconicScene
- `scripts/wikipedia-specs.cjs`: Wikipedia infobox → cache JSON
- `scripts/apply-wikipedia-specs.cjs`: cache → cars.ts
- `src/data/cars.ts`: 7,303 cars across PART_1–PART_5 (~5 MB)
- `data/wikipedia-specs-cache.json`: Wikipedia specs cache (growing)
- `src/components/CarCard.tsx`: shadcn Card flip card
- `src/app/cars/page.tsx`: filters, sort, grid density, command palette, pagination
- `src/lib/constants.ts`: bodyTypes, decades, mediaTypes, SITE_*

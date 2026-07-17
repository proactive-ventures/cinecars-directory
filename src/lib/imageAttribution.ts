export interface ImageAttribution {
  source: string
  sourceUrl?: string
  license: string
  author?: string
  note?: string
}

/**
 * Derives copyright/attribution info for an image from its URL.
 * - Wikimedia Commons images are freely licensed (CC BY-SA / CC0 / Public Domain)
 *   but REQUIRE attribution to the author + license.
 * - IMCDb (Internet Movie Cars Database) images are copyrighted by their respective
 *   owners and are used here for vehicle identification under fair-use / factual-reference.
 * - Local-only images are owned by CineCars Directory.
 */
export function getImageAttribution(imageUrl?: string): ImageAttribution {
  if (!imageUrl) {
    return {
      source: "CineCars Directory",
      license: "© CineCars Directory",
      note: "Original asset",
    }
  }

  if (imageUrl.includes("upload.wikimedia.org") || imageUrl.includes("commons.wikimedia.org")) {
    // Try to recover the file page + author from the commons filename
    const m = imageUrl.match(/commons\/(?:thumb\/)?[0-9]\/[0-9a-f]{2}\/([^/]+?)(?:\.\w+)?(?:\/[\dpx-]+)?$/)
    const file = m ? decodeURIComponent(m[1]).replace(/_/g, " ") : "Wikimedia Commons file"
    const filePage = `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.replace(/\s+/g, "_"))}`
    return {
      source: "Wikimedia Commons",
      sourceUrl: filePage,
      license: "CC BY-SA / CC0 / Public Domain (see file page)",
      author: "See file page for author",
      note: "Free media; attribution required",
    }
  }

  if (imageUrl.includes("imcdb.org")) {
    return {
      source: "IMCDb (Internet Movie Cars Database)",
      sourceUrl: "https://www.imcdb.org/",
      license: "© Copyright respective owners",
      note: "Used for vehicle identification",
    }
  }

  return {
    source: "CineCars Directory",
    license: "© CineCars Directory",
  }
}

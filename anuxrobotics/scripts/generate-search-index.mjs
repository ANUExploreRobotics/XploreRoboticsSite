import fs from "node:fs";
import path from "node:path";

const OUT_DIR = path.join(process.cwd(), ".next", "server", "app");
const OUTPUT_FILE = path.join(process.cwd(), "public", "search-index.json");

const SKIP_FILES = new Set(["_global-error.html", "_not-found.html"]);

function findHtmlFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const results = [];

  for (const entry of entries) {
    if (!entry.isFile()) continue;
    if (!entry.name.endsWith(".html")) continue;
    if (SKIP_FILES.has(entry.name)) continue;
    if (entry.name.startsWith("api")) continue;

    const route =
      entry.name === "index.html"
        ? "/"
        : "/" + entry.name.replace(/\.html$/, "");

    results.push({ file: path.join(dir, entry.name), route });
  }

  return results;
}

function decodeEntities(str) {
  return str
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

const NAV_LABELS = new Set([
  "about", "team", "mission", "partners", "vehicle", "updates",
  "contact", "search", "home", "anu exploration robotics",
  "anu exploration robotics - robosub team",
]);

function htmlToChunks(html) {
  let clean = html.replace(/<script[\s\S]*?<\/script>/gi, " ");
  clean = clean.replace(/<style[\s\S]*?<\/style>/gi, " ");
  clean = clean.replace(/<[^>]+>/g, "\n");

  return clean
    .split("\n")
    .map((s) => decodeEntities(s).replace(/\s+/g, " ").trim())
    .filter((s) => s.length > 3)
    .filter((s) => !NAV_LABELS.has(s.toLowerCase()))
    .filter((s) => {
      // drop chunks that are just several nav-label words strung together
      // (e.g. "About Team Mission Partners Vehicle Updates Contact Search")
      const words = s.toLowerCase().split(" ");
      const navWordCount = words.filter((w) => NAV_LABELS.has(w)).length;
      return navWordCount < words.length * 0.6;
    });
}

const PAGE_TITLES = {
  "/": "Home",
  "/team": "Team",
  "/mission": "Mission",
  "/vehicle": "Vehicle",
  "/updates": "Updates",
  "/sponsors": "Partners",
  "/contact": "Contact",
};

function main() {
  const pages = findHtmlFiles(OUT_DIR);
  const index = [];

  for (const { file, route } of pages) {
    const html = fs.readFileSync(file, "utf8");
    const chunks = htmlToChunks(html);
    const pageTitle = PAGE_TITLES[route] || route.replace("/", "").replace(/-/g, " ");

    for (const chunk of chunks) {
      index.push({ page: pageTitle, url: route, text: chunk });
    }
  }

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(index, null, 2));
  console.log(`Search index generated: ${index.length} chunks from ${pages.length} pages`);
}

main();
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const APP_DIR = path.join(process.cwd(), "app");
const OUTPUT_FILE = path.join(process.cwd(), "public", "search-index.json");

const SKIP_DIRS = new Set(["api", "search"]);

// Attribute/property names whose string values aren't visible page content
const IGNORE_KEYS = new Set([
  "className", "href", "src", "alt", "type", "id", "key", "placeholder",
  "aria-label", "rel", "target", "viewBox", "fill", "stroke", "strokeWidth",
  "strokeLinecap", "strokeLinejoin", "d", "width", "height", "cx", "cy", "r",
  "points", "x1", "y1", "x2", "y2", "name",
]);

function findPageFiles(dir, routePrefix = "") {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let results = [];

  for (const entry of entries) {
    if (entry.name.startsWith("_") || entry.name.startsWith(".")) continue;

    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      results = results.concat(
        findPageFiles(path.join(dir, entry.name), `${routePrefix}/${entry.name}`)
      );
    } else if (entry.name === "page.tsx" || entry.name === "page.jsx") {
      results.push({ file: path.join(dir, entry.name), route: routePrefix || "/" });
    }
  }

  return results;
}

function isLikelyContent(str) {
  const trimmed = str.trim();
  if (trimmed.length < 4) return false;
  if (trimmed.startsWith("/")) return false;
  if (trimmed.startsWith("#")) return false;
  if (/^https?:\/\//.test(trimmed)) return false;
  if (/^[0-9.]+$/.test(trimmed)) return false;
  return true;
}

function extractText(filePath) {
  const source = fs.readFileSync(filePath, "utf8");
  const sourceFile = ts.createSourceFile(
    filePath,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX
  );

  const chunks = [];

  function visit(node) {
    if (ts.isJsxText(node)) {
      const text = node.getText(sourceFile).replace(/\s+/g, " ").trim();
      if (isLikelyContent(text)) chunks.push(text);
    }

    if (ts.isPropertyAssignment(node) && ts.isStringLiteral(node.initializer)) {
      const key = node.name.getText(sourceFile).replace(/["']/g, "");
      if (!IGNORE_KEYS.has(key)) {
        const text = node.initializer.text.trim();
        if (isLikelyContent(text)) chunks.push(text);
      }
    }

    if (ts.isJsxAttribute(node) && node.initializer && ts.isStringLiteral(node.initializer)) {
      const key = node.name.getText(sourceFile);
      if (!IGNORE_KEYS.has(key)) {
        const text = node.initializer.text.trim();
        if (isLikelyContent(text)) chunks.push(text);
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return [...new Set(chunks)];
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

function guessPageTitle(chunks, route) {
  return PAGE_TITLES[route] || route.replace("/", "").replace(/-/g, " ");
}

function main() {
  const pages = findPageFiles(APP_DIR);
  const index = [];

  for (const { file, route } of pages) {
    const chunks = extractText(file);
    const pageTitle = guessPageTitle(chunks, route);
    for (const text of chunks) {
      index.push({ page: pageTitle, url: route, text });
    }
  }

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(index, null, 2));
  console.log(`Search index generated: ${index.length} chunks from ${pages.length} pages`);
}

main();
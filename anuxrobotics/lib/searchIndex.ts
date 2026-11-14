export type SearchResult = {
  page: string;
  url: string;
  snippet: string;
  matchStart: number;
  matchLength: number;
};

type IndexEntry = { page: string; url: string; text: string };

let cachedEntries: IndexEntry[] | null = null;

async function getEntries(): Promise<IndexEntry[]> {
  if (cachedEntries) return cachedEntries;
  const res = await fetch("/search-index.json");
  cachedEntries = await res.json();
  return cachedEntries!;
}

export async function searchSite(query: string): Promise<SearchResult[]> {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const entries = await getEntries();
  const results: SearchResult[] = [];

  for (const entry of entries) {
    const lower = entry.text.toLowerCase();
    const idx = lower.indexOf(q);
    if (idx === -1) continue;

    const contextRadius = 40;
    const start = Math.max(0, idx - contextRadius);
    const end = Math.min(entry.text.length, idx + q.length + contextRadius);

    let snippet = entry.text.slice(start, end);
    if (start > 0) snippet = "…" + snippet;
    if (end < entry.text.length) snippet = snippet + "…";

    const prefixLength = start > 0 ? 1 : 0;
    const matchStart = idx - start + prefixLength;

    results.push({
      page: entry.page,
      url: entry.url,
      snippet,
      matchStart,
      matchLength: q.length,
    });
  }

  return results;
}
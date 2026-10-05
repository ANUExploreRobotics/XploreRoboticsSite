export type ScrollTarget = {
  before: string;
  match: string;
  after: string;
};

type NodeSpan = { node: Text; start: number; end: number };

const collapse = (s: string) => s.replace(/\s+/g, " ").trim();

// Flattens every text node on the page into one string joined by single spaces
// (the same way the search indexer builds its text) and remembers which node
// each character range came from.
function buildPageText(): { text: string; spans: NodeSpan[] } {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      const tag = parent.tagName;
      if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT") {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  let text = "";
  const spans: NodeSpan[] = [];
  let node: Node | null;
  while ((node = walker.nextNode())) {
    const piece = collapse(node.textContent ?? "");
    if (!piece) continue;
    if (text) text += " ";
    const start = text.length;
    text += piece;
    spans.push({ node: node as Text, start, end: text.length });
  }
  return { text, spans };
}

function elementAt(spans: NodeSpan[], position: number): HTMLElement | null {
  const hit = spans.find((s) => position >= s.start && position < s.end);
  return hit?.node.parentElement ?? null;
}

function locate(target: ScrollTarget): HTMLElement | null {
  const { text, spans } = buildPageText();
  const hay = text.toLowerCase();
  const before = target.before.toLowerCase();
  const match = target.match.toLowerCase();
  const after = target.after.toLowerCase();

  // Try the full snippet first, then progressively less surrounding context
  const attempts: [string, string][] = [
    [before, after],
    [before.slice(-20), after.slice(0, 20)],
    [before.slice(-8), after.slice(0, 8)],
  ];
  for (const [b, a] of attempts) {
    const idx = hay.indexOf(b + match + a);
    if (idx !== -1) return elementAt(spans, idx + b.length);
  }

  // Last resort: first occurrence of the word itself, outside the nav/header
  let from = 0;
  for (;;) {
    const idx = hay.indexOf(match, from);
    if (idx === -1) return null;
    const el = elementAt(spans, idx);
    if (el && !el.closest("nav, header")) return el;
    from = idx + match.length;
  }
}

export function scrollToTextOnPage(target: ScrollTarget) {
  if (!target.match) return;
  const el = locate(target);
  if (!el) return;

  el.scrollIntoView({ behavior: "smooth", block: "center" });
  el.classList.add("search-highlight-flash");
  setTimeout(() => el.classList.remove("search-highlight-flash"), 5000);
}
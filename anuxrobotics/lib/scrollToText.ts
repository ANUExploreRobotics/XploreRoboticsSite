function findTextNode(root: Node, text: string): Text | null {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const target = text.toLowerCase();
  let node: Node | null;
  while ((node = walker.nextNode())) {
    if (node.textContent && node.textContent.toLowerCase().includes(target)) {
      return node as Text;
    }
  }
  return null;
}

export function scrollToTextOnPage(text: string) {
  if (!text) return;
  const node = findTextNode(document.body, text);
  const el = node?.parentElement;
  if (!el) return;

  el.scrollIntoView({ behavior: "smooth", block: "center" });
  el.classList.add("search-highlight-flash");
  setTimeout(() => el.classList.remove("search-highlight-flash"), 5000);
}
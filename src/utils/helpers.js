export function flattenTree(node, prefix = "") {
  const path = prefix ? `${prefix}/${node.name}` : node.name;
  if (node.type === "file") return [{ path, name: node.name }];
  let out = [];
  (node.children || []).forEach((c) => { out = out.concat(flattenTree(c, path)); });
  return out;
}

export function extOf(name) {
  const i = name.lastIndexOf(".");
  return i === -1 ? "" : name.slice(i + 1);
}

export function highlightJs(code) {
  const escaped = code
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const tokenRe = /(\/\/.*$)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\b(?:import|from|export|default|function|return|const|let|var|if|else|for|while|new|class|extends|useState|useEffect|type|interface)\b)|(\b\d+\b)|(<\/?[A-Za-z][\w.]*)/gm;
  return escaped.replace(tokenRe, (m, cmt, str, kw, num, tag) => {
    if (cmt) return `<span class="text-zinc-500">${cmt}</span>`;
    if (str) return `<span class="text-emerald-400">${str}</span>`;
    if (kw) return `<span class="text-violet-400">${kw}</span>`;
    if (num) return `<span class="text-amber-400">${num}</span>`;
    if (tag) return `<span class="text-sky-400">${tag}</span>`;
    return m;
  });
}

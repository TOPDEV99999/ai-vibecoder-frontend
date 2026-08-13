import { useState } from "react";
import { ChevronDown, ChevronRight, Folder, FolderOpen, FileCode } from "lucide-react";
import { FILE_TREE } from "../../data/mockData";

function FileTreeNode({ node, depth, path, selected, onSelect, expanded, toggleExpand }) {
  const fullPath = path ? `${path}/${node.name}` : node.name;
  if (node.type === "folder") {
    const isOpen = expanded[fullPath] ?? node.open;
    return (
      <div>
        <button
          onClick={() => toggleExpand(fullPath)}
          className="w-full flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-zinc-800/70 text-zinc-400 text-[13px]"
          style={{ paddingLeft: 8 + depth * 14 }}
        >
          {isOpen ? <ChevronDown size={13} className="shrink-0" /> : <ChevronRight size={13} className="shrink-0" />}
          {isOpen ? <FolderOpen size={14} className="shrink-0 text-violet-400" /> : <Folder size={14} className="shrink-0 text-violet-400" />}
          <span className="truncate">{node.name}</span>
        </button>
        {isOpen && (
          <div>
            {(node.children || []).map((c) => (
              <FileTreeNode
                key={c.name} node={c} depth={depth + 1} path={fullPath}
                selected={selected} onSelect={onSelect} expanded={expanded} toggleExpand={toggleExpand}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
  const isSelected = selected === fullPath;
  return (
    <button
      onClick={() => onSelect(fullPath)}
      className={`w-full flex items-center gap-1.5 px-2 py-1 rounded-md text-[13px] font-mono ${
        isSelected ? "bg-violet-500/10 text-violet-300" : "text-zinc-400 hover:bg-zinc-800/70 hover:text-zinc-200"
      }`}
      style={{ paddingLeft: 8 + depth * 14 }}
    >
      <FileCode size={13} className="shrink-0" />
      <span className="truncate">{node.name}</span>
    </button>
  );
}

export default function FileExplorer({ selected, onSelect }) {
  const [expanded, setExpanded] = useState({});
  const toggleExpand = (p) => setExpanded((e) => ({ ...e, [p]: !(e[p] ?? true) }));
  return (
    <div className="h-full flex flex-col bg-zinc-950">
      <div className="flex items-center justify-between px-3 h-10 border-b border-zinc-800/80 shrink-0">
        <span className="text-[11px] font-semibold tracking-wider text-zinc-500 uppercase">Explorer</span>
      </div>
      <div className="flex-1 overflow-y-auto py-1.5 px-1">
        <FileTreeNode node={FILE_TREE} depth={0} path="" selected={selected} onSelect={onSelect} expanded={expanded} toggleExpand={toggleExpand} />
      </div>
    </div>
  );
}

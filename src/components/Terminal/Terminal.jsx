import { Terminal as TerminalIcon, PanelBottomClose } from "lucide-react";

export default function TerminalPanel({ open, onClose, lines }) {
  if (!open) return null;
  return (
    <div className="h-44 border-t border-zinc-800 bg-black/80 flex flex-col shrink-0">
      <div className="flex items-center justify-between px-3 h-8 border-b border-zinc-800/80 shrink-0">
        <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
          <TerminalIcon size={12} /> Terminal
        </div>
        <button onClick={onClose} className="text-zinc-500 hover:text-zinc-300"><PanelBottomClose size={14} /></button>
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-2 font-mono text-[12.5px] leading-6">
        {lines.map((l, i) => (
          <div key={i} className={
            l.startsWith("✓") ? "text-emerald-400" :
            l.startsWith("$") ? "text-zinc-100" :
            l.startsWith("➜") ? "text-violet-400" : "text-zinc-500"
          }>{l}</div>
        ))}
        <div className="flex items-center text-zinc-100">
          <span className="text-emerald-400 mr-1.5">$</span>
          <span className="w-1.5 h-3.5 bg-zinc-300 animate-pulse inline-block" />
        </div>
      </div>
    </div>
  );
}

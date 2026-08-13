import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";

export default function CommandPalette({ open, onClose, commands, onRun }) {
  const [q, setQ] = useState("");
  const inputRef = useRef(null);
  useEffect(() => { if (open) { setQ(""); setTimeout(() => inputRef.current?.focus(), 10); } }, [open]);
  if (!open) return null;
  const filtered = commands.filter((c) => c.label.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="fixed inset-0 z-[150] bg-black/60 flex items-start justify-center pt-[12vh] px-4" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl shadow-black/60 overflow-hidden">
        <div className="flex items-center gap-2 px-3.5 h-11 border-b border-zinc-800">
          <Search size={15} className="text-zinc-500" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Type a command or search…"
            className="flex-1 bg-transparent outline-none text-[13.5px] text-zinc-200 placeholder-zinc-600"
          />
          <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-500">ESC</kbd>
        </div>
        <div className="max-h-80 overflow-y-auto py-1.5">
          {filtered.length === 0 && <div className="px-4 py-6 text-center text-zinc-600 text-[13px]">No matching commands</div>}
          {filtered.map((c) => (
            <button
              key={c.label}
              onClick={() => { onRun(c); onClose(); }}
              className="w-full flex items-center gap-2.5 px-3.5 py-2 hover:bg-zinc-800/70 text-left"
            >
              <c.icon size={14} className="text-zinc-500 shrink-0" />
              <span className="text-[13px] text-zinc-200">{c.label}</span>
              {c.hint && <span className="ml-auto text-[10.5px] text-zinc-600 font-mono">{c.hint}</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

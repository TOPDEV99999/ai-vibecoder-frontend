import { FileCode, X, SlidersHorizontal, Copy, Check } from "lucide-react";
import { highlightJs } from "../../utils/helpers";

export default function CodeEditor({ openTabs, activeTab, onTabClick, onTabClose, content, fontSize, wordWrap, onToast }) {
  const lines = (content || "").split("\n");
  const handleCopy = () => {
    onToast("Copied to clipboard", <Copy size={15} className="text-violet-400" />);
  };
  return (
    <div className="h-full flex flex-col bg-zinc-950 min-w-0">
      <div className="flex items-center border-b border-zinc-800/80 shrink-0 overflow-x-auto">
        {openTabs.map((t) => (
          <div
            key={t}
            onClick={() => onTabClick(t)}
            className={`group flex items-center gap-2 px-3.5 h-10 text-[13px] font-mono border-r border-zinc-800/80 cursor-pointer shrink-0 ${
              activeTab === t ? "bg-zinc-900 text-zinc-100" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <FileCode size={13} className={activeTab === t ? "text-violet-400" : ""} />
            <span>{t.split("/").pop()}</span>
            <X
              size={13}
              className="opacity-0 group-hover:opacity-100 hover:text-red-400"
              onClick={(e) => { e.stopPropagation(); onTabClose(t); }}
            />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between px-3 h-9 border-b border-zinc-800/80 shrink-0 bg-zinc-950">
        <span className="text-[12px] text-zinc-500 font-mono truncate">{activeTab}</span>
        <div className="flex items-center gap-1">
          <button onClick={() => onToast("Formatted file", <Check size={15} className="text-emerald-400" />)} className="text-[12px] px-2 py-1 rounded-md text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 flex items-center gap-1">
            <SlidersHorizontal size={12} /> Format
          </button>
          <button onClick={handleCopy} className="text-[12px] px-2 py-1 rounded-md text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 flex items-center gap-1">
            <Copy size={12} /> Copy
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto font-mono" style={{ fontSize }}>
        <div className="flex min-w-full">
          <div className="select-none text-right pr-3 pl-4 py-3 text-zinc-600 bg-zinc-950/60 border-r border-zinc-800/60 shrink-0">
            {lines.map((_, i) => (
              <div key={i} className={`leading-6 ${i === 2 ? "text-violet-400" : ""}`}>{i + 1}</div>
            ))}
          </div>
          <pre className={`py-3 pl-4 pr-6 text-zinc-300 leading-6 flex-1 ${wordWrap ? "whitespace-pre-wrap break-words" : "whitespace-pre"}`}>
            {lines.map((line, i) => (
              <div
                key={i}
                className={`leading-6 ${i === 2 ? "bg-violet-500/[0.06] -mx-4 px-4 border-l-2 border-violet-500" : ""}`}
                dangerouslySetInnerHTML={{ __html: highlightJs(line) + (i === 2 ? '<span class="inline-block w-[2px] h-[15px] bg-violet-400 align-middle ml-0.5 animate-pulse"></span>' : "") || "&nbsp;" }}
              />
            ))}
          </pre>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect, useRef } from "react";
import { Bot, Sparkles, User, FileCode, Check, RotateCcw, Zap, Paperclip, Send } from "lucide-react";
import { SUGGESTED_PROMPTS } from "../../data/mockData";

export default function AIAssistant({ messages, onSend, thinking, onApply, onUndo, appliedIds }) {
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  const submit = (text) => {
    const val = (text ?? input).trim();
    if (!val) return;
    onSend(val);
    setInput("");
  };

  return (
    <div className="h-full flex flex-col bg-zinc-950 min-w-0">
      <div className="flex items-center gap-2 px-3.5 h-10 border-b border-zinc-800/80 shrink-0">
        <Bot size={15} className="text-violet-400" />
        <span className="text-[13px] font-medium text-zinc-200">AI Assistant</span>
        <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-300 font-medium">GPT-Forge</span>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-3.5 py-4 space-y-4">
        {messages.map((m) => (
          <div key={m.id} className={`flex gap-2.5 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
            <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${
              m.role === "user" ? "bg-zinc-800" : "bg-violet-500/15"
            }`}>
              {m.role === "user" ? <User size={12} className="text-zinc-300" /> : <Sparkles size={12} className="text-violet-400" />}
            </div>
            <div className={`max-w-[85%] ${m.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1.5`}>
              <div className={`text-[13px] leading-relaxed px-3 py-2 rounded-xl ${
                m.role === "user" ? "bg-violet-600 text-white rounded-tr-sm" : "bg-zinc-900 text-zinc-200 rounded-tl-sm border border-zinc-800"
              }`}>
                {m.text}
              </div>
              {m.file && (
                <div className="w-full border border-zinc-800 bg-zinc-900/60 rounded-lg overflow-hidden">
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 border-b border-zinc-800 text-[11px] text-zinc-400 font-mono">
                    <FileCode size={11} className="text-violet-400" /> {m.file}
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-2">
                    {appliedIds.includes(m.id) ? (
                      <>
                        <span className="text-[11px] text-emerald-400 flex items-center gap-1"><Check size={12} /> Applied</span>
                        <button onClick={() => onUndo(m.id)} className="ml-auto text-[11px] px-2 py-1 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 flex items-center gap-1">
                          <RotateCcw size={11} /> Undo
                        </button>
                      </>
                    ) : (
                      <button onClick={() => onApply(m.id, m.file)} className="text-[11px] px-2.5 py-1 rounded-md bg-violet-600 hover:bg-violet-500 text-white flex items-center gap-1 font-medium">
                        <Zap size={11} /> Apply changes
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        {thinking && (
          <div className="flex gap-2.5">
            <div className="w-6 h-6 rounded-md flex items-center justify-center shrink-0 bg-violet-500/15">
              <Sparkles size={12} className="text-violet-400" />
            </div>
            <div className="px-3 py-2.5 rounded-xl rounded-tl-sm bg-zinc-900 border border-zinc-800 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce" />
            </div>
          </div>
        )}
      </div>

      <div className="px-3.5 py-2 border-t border-zinc-800/80 shrink-0">
        <div className="flex gap-1.5 overflow-x-auto pb-2 -mx-0.5 px-0.5">
          {SUGGESTED_PROMPTS.map((p) => (
            <button
              key={p}
              onClick={() => submit(p)}
              className="shrink-0 text-[11.5px] px-2.5 py-1.5 rounded-full border border-zinc-800 text-zinc-400 hover:text-violet-300 hover:border-violet-500/40 hover:bg-violet-500/5 whitespace-nowrap"
            >
              {p}
            </button>
          ))}
        </div>
        <div className="flex items-end gap-1.5 bg-zinc-900 border border-zinc-800 rounded-xl px-2 py-1.5 focus-within:border-violet-500/50 transition-colors">
          <button className="p-1.5 text-zinc-500 hover:text-zinc-300"><Paperclip size={16} /></button>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); } }}
            placeholder="Ask AI to build or change something…"
            rows={1}
            className="flex-1 bg-transparent resize-none outline-none text-[13px] text-zinc-200 placeholder-zinc-600 py-1.5 max-h-24"
          />
          <button
            onClick={() => submit()}
            className="p-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white disabled:opacity-40"
            disabled={!input.trim()}
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

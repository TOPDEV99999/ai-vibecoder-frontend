import { Sparkles, LayoutGrid, Wand2, Star, Clock, Code2 } from "lucide-react";
import { TEMPLATES, ACCENT_BG, ACCENT_TEXT } from "../data/mockData";

export default function Home({ projects, onOpenProject, onNewProject, onOpenTemplate, promptDraft, setPromptDraft, onGenerate }) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto px-6 py-16 sm:py-24 text-center">
        <div className="inline-flex items-center gap-1.5 text-[11.5px] px-3 py-1 rounded-full border border-zinc-800 text-zinc-400 mb-6">
          <Sparkles size={12} className="text-violet-400" /> Now with streaming multi-file generation
        </div>
        <h1 className="text-4xl sm:text-5xl font-semibold text-zinc-50 tracking-tight">
          Build anything with <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">AI.</span>
        </h1>
        <p className="text-zinc-400 mt-4 text-[15px] sm:text-base max-w-lg mx-auto">
          Describe your idea. Let AI turn it into production-ready code.
        </p>

        <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-2xl p-2 max-w-xl mx-auto text-left focus-within:border-violet-500/50 transition-colors">
          <textarea
            value={promptDraft}
            onChange={(e) => setPromptDraft(e.target.value)}
            placeholder="Describe what you want to build…"
            rows={2}
            className="w-full bg-transparent outline-none resize-none px-3 py-2 text-[14px] text-zinc-200 placeholder-zinc-600"
          />
          <div className="flex items-center justify-between px-2 pb-1">
            <button onClick={onNewProject} className="text-[12.5px] text-zinc-400 hover:text-zinc-200 flex items-center gap-1.5">
              <LayoutGrid size={13} /> Start from template
            </button>
            <button
              onClick={onGenerate}
              className="flex items-center gap-1.5 bg-violet-600 hover:bg-violet-500 text-white text-[13px] font-medium px-4 py-1.5 rounded-xl"
            >
              <Wand2 size={13} /> Generate
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-10">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[13px] font-semibold text-zinc-300">Start from a template</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => onOpenTemplate(t)}
              className="group text-left bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 hover:bg-zinc-900 transition-colors"
            >
              <div className={`w-8 h-8 rounded-lg ${ACCENT_BG[t.accent]}/15 flex items-center justify-center mb-3`}>
                <div className={`w-3.5 h-3.5 rounded-sm ${ACCENT_BG[t.accent]}`} />
              </div>
              <div className="text-[13.5px] font-medium text-zinc-100">{t.name}</div>
              <div className="text-[12px] text-zinc-500 mt-0.5">{t.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-20">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[13px] font-semibold text-zinc-300">Recent projects</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => onOpenProject(p)}
              className="group text-left bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 hover:bg-zinc-900 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-7 h-7 rounded-md ${ACCENT_BG[p.accent]}/15 flex items-center justify-center`}>
                  <Code2 size={13} className={ACCENT_TEXT[p.accent]} />
                </div>
                <Star size={13} className="text-zinc-700 group-hover:text-zinc-500" />
              </div>
              <div className="text-[13.5px] font-mono font-medium text-zinc-100 truncate">{p.name}</div>
              <div className="text-[12px] text-zinc-500 mt-0.5 truncate">{p.desc}</div>
              <div className="flex items-center gap-1.5 mt-3 text-[11px] text-zinc-600">
                <Clock size={11} /> {p.updated} <span className="mx-0.5">·</span> {p.framework}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

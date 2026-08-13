import { useState, useEffect } from "react";
import { X, Wand2 } from "lucide-react";

export default function NewProjectModal({ open, onClose, onCreate }) {
  const [name, setName] = useState("");
  const [framework, setFramework] = useState("React");
  const [template, setTemplate] = useState("Blank");
  const [prompt, setPrompt] = useState("");

  useEffect(() => { if (open) { setName(""); setFramework("React"); setTemplate("Blank"); setPrompt(""); } }, [open]);
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[150] bg-black/60 flex items-center justify-center px-4" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden">
        <div className="flex items-center justify-between px-5 h-13 py-3.5 border-b border-zinc-800">
          <h3 className="text-[14.5px] font-medium text-zinc-100">New project</h3>
          <button onClick={onClose} className="text-zinc-500 hover:text-zinc-300"><X size={16} /></button>
        </div>
        <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <label className="text-[12px] text-zinc-400 mb-1.5 block">Project name</label>
            <input
              value={name} onChange={(e) => setName(e.target.value)}
              placeholder="my-ai-project"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-[13.5px] text-zinc-100 outline-none focus:border-violet-500/60 font-mono placeholder-zinc-600"
            />
          </div>
          <div>
            <label className="text-[12px] text-zinc-400 mb-1.5 block">Framework</label>
            <div className="flex gap-1.5">
              {["React", "Vue", "Vanilla"].map((f) => (
                <button key={f} onClick={() => setFramework(f)}
                  className={`px-3 py-1.5 rounded-lg text-[12.5px] border ${framework === f ? "bg-violet-600 border-violet-600 text-white" : "border-zinc-800 text-zinc-400 hover:text-zinc-200"}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-[12px] text-zinc-400 mb-1.5 block">Template</label>
            <div className="flex flex-wrap gap-1.5">
              {["Blank", "SaaS", "Dashboard", "E-commerce", "Landing Page"].map((t) => (
                <button key={t} onClick={() => setTemplate(t)}
                  className={`px-3 py-1.5 rounded-lg text-[12.5px] border ${template === t ? "bg-violet-600 border-violet-600 text-white" : "border-zinc-800 text-zinc-400 hover:text-zinc-200"}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-[12px] text-zinc-400 mb-1.5 block">What do you want to build?</label>
            <textarea
              value={prompt} onChange={(e) => setPrompt(e.target.value)}
              rows={3} placeholder="Describe your idea…"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-[13px] text-zinc-100 outline-none focus:border-violet-500/60 resize-none placeholder-zinc-600"
            />
          </div>
        </div>
        <div className="px-5 py-3.5 border-t border-zinc-800 flex justify-end">
          <button
            disabled={!name.trim()}
            onClick={() => onCreate({ name: name.trim(), framework, template, prompt })}
            className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:hover:bg-violet-600 text-white text-[13px] font-medium flex items-center gap-1.5"
          >
            <Wand2 size={14} /> Create Project
          </button>
        </div>
      </div>
    </div>
  );
}

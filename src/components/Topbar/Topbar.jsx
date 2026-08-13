import {
  Menu, Home as HomeIcon, GitBranch, Check, Code2, Eye, Terminal as TerminalIcon,
  Play, Share2, Rocket, Loader2, Bot, Settings as SettingsIcon,
} from "lucide-react";

export default function Topbar({ project, onDeploy, deployState, onShare, onSettings, onToggleMobileSidebar, onToggleMobileAI, onHome, previewMode, setPreviewMode, onToggleTerminal }) {
  return (
    <div className="h-14 border-b border-zinc-800/80 flex items-center px-3 gap-2 shrink-0">
      <button onClick={onToggleMobileSidebar} className="sm:hidden text-zinc-400 p-1.5"><Menu size={18} /></button>
      <button onClick={onHome} className="p-1.5 text-zinc-500 hover:text-zinc-300 hidden sm:block"><HomeIcon size={15} /></button>

      <div className="flex items-center gap-1.5 min-w-0">
        <span className="text-[13.5px] font-medium text-zinc-100 font-mono truncate">{project?.name || "untitled"}</span>
        <span className="flex items-center gap-1 text-[11.5px] text-zinc-500 border border-zinc-800 rounded-full px-2 py-0.5 shrink-0">
          <GitBranch size={11} /> main
        </span>
        <span className="hidden sm:flex items-center gap-1 text-[11.5px] text-emerald-400 shrink-0">
          <Check size={11} /> Saved
        </span>
      </div>

      <div className="hidden md:flex items-center gap-0.5 ml-4 bg-zinc-900 border border-zinc-800 rounded-lg p-0.5">
        <button onClick={() => setPreviewMode("code")} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[12px] ${previewMode === "code" ? "bg-zinc-800 text-zinc-100" : "text-zinc-500"}`}>
          <Code2 size={12} /> Code
        </button>
        <button onClick={() => setPreviewMode("preview")} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[12px] ${previewMode === "preview" ? "bg-zinc-800 text-zinc-100" : "text-zinc-500"}`}>
          <Eye size={12} /> Preview
        </button>
      </div>

      <div className="ml-auto flex items-center gap-1.5">
        <button onClick={onToggleTerminal} className="hidden md:flex p-1.5 text-zinc-500 hover:text-zinc-300"><TerminalIcon size={15} /></button>
        <button onClick={() => setPreviewMode("preview")} className="hidden sm:flex items-center gap-1.5 text-[12.5px] px-2.5 py-1.5 rounded-lg text-zinc-300 hover:bg-zinc-900 border border-zinc-800">
          <Play size={12} /> Preview
        </button>
        <button onClick={onShare} className="hidden sm:flex items-center gap-1.5 text-[12.5px] px-2.5 py-1.5 rounded-lg text-zinc-300 hover:bg-zinc-900 border border-zinc-800">
          <Share2 size={12} /> Share
        </button>
        <button
          onClick={onDeploy}
          className="flex items-center gap-1.5 text-[12.5px] px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-medium disabled:opacity-60"
          disabled={deployState === "deploying"}
        >
          {deployState === "deploying" ? <Loader2 size={13} className="animate-spin" /> : <Rocket size={13} />}
          {deployState === "deploying" ? "Deploying…" : deployState === "done" ? "Deployed" : "Deploy"}
        </button>
        <button onClick={onToggleMobileAI} className="lg:hidden p-1.5 text-zinc-500 hover:text-zinc-300"><Bot size={17} /></button>
        <button onClick={onSettings} className="p-1.5 text-zinc-500 hover:text-zinc-300 hidden sm:block"><SettingsIcon size={15} /></button>
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-[10px] text-white font-medium">JD</div>
      </div>
    </div>
  );
}

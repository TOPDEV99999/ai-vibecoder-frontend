import { useState } from "react";
import {
  Plus, Search, Settings as SettingsIcon, X, ChevronRight, ChevronLeft,
} from "lucide-react";
import Logo from "../UI/Logo";
import { TEMPLATES, ACCENT_BG } from "../../data/mockData";

export default function AppSidebar({ collapsed, setCollapsed, projects, onNewProject, onOpenProject, onSettings, activeProjectId, mobileOpen, setMobileOpen }) {
  const [tab, setTab] = useState("recent");
  const content = (
    <div className="h-full flex flex-col bg-zinc-950 border-r border-zinc-800/80">
      <div className="flex items-center gap-2 px-3.5 h-14 shrink-0">
        <Logo size={24} />
        {!collapsed && <span className="font-semibold text-[14px] text-zinc-100 tracking-tight">VibeForge</span>}
        <button onClick={() => setMobileOpen(false)} className="ml-auto sm:hidden text-zinc-500"><X size={16} /></button>
      </div>

      <div className="px-3">
        <button
          onClick={onNewProject}
          className={`w-full flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg py-2 text-[13px] font-medium ${collapsed ? "justify-center px-0" : "px-3"}`}
        >
          <Plus size={14} /> {!collapsed && "New Project"}
        </button>
      </div>

      {!collapsed && (
        <div className="px-3 mt-3">
          <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5">
            <Search size={13} className="text-zinc-500" />
            <input placeholder="Search projects…" className="bg-transparent outline-none text-[12.5px] text-zinc-300 placeholder-zinc-600 w-full" />
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto mt-3 px-2">
        {!collapsed && (
          <div className="flex items-center gap-3 px-2 mb-1.5 text-[11px] font-semibold tracking-wide text-zinc-600 uppercase">
            <button onClick={() => setTab("recent")} className={tab === "recent" ? "text-zinc-300" : "hover:text-zinc-400"}>Recent</button>
            <button onClick={() => setTab("templates")} className={tab === "templates" ? "text-zinc-300" : "hover:text-zinc-400"}>Templates</button>
          </div>
        )}
        {tab === "recent" ? projects.map((p) => (
          <button
            key={p.id}
            onClick={() => onOpenProject(p)}
            title={p.name}
            className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-[12.5px] mb-0.5 ${
              activeProjectId === p.id ? "bg-violet-500/10 text-violet-300" : "text-zinc-400 hover:bg-zinc-900"
            } ${collapsed ? "justify-center" : ""}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${ACCENT_BG[p.accent]}`} />
            {!collapsed && <span className="truncate font-mono">{p.name}</span>}
          </button>
        )) : TEMPLATES.map((t) => (
          <button key={t.id} className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-[12.5px] mb-0.5 text-zinc-400 hover:bg-zinc-900 ${collapsed ? "justify-center" : ""}`}>
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${ACCENT_BG[t.accent]}`} />
            {!collapsed && <span className="truncate">{t.name}</span>}
          </button>
        ))}
      </div>

      <div className="p-2 border-t border-zinc-800/80 shrink-0">
        <button onClick={onSettings} className={`w-full flex items-center gap-2.5 px-2 py-2 rounded-lg text-[12.5px] text-zinc-400 hover:bg-zinc-900 ${collapsed ? "justify-center" : ""}`}>
          <SettingsIcon size={14} /> {!collapsed && "Settings"}
        </button>
        <div className={`flex items-center gap-2.5 px-2 py-2 ${collapsed ? "justify-center" : ""}`}>
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-[10px] text-white font-medium shrink-0">JD</div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="text-[12px] text-zinc-300 truncate">Jordan Diaz</div>
              <div className="text-[10.5px] text-zinc-600 truncate">Pro plan</div>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="hidden sm:flex items-center justify-center h-7 border-t border-zinc-800/80 text-zinc-600 hover:text-zinc-300 shrink-0"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </div>
  );

  return (
    <>
      <div className={`hidden sm:block shrink-0 transition-all duration-200 ${collapsed ? "w-16" : "w-64"}`}>{content}</div>
      {mobileOpen && (
        <div className="fixed inset-0 z-[120] sm:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72">{content}</div>
        </div>
      )}
    </>
  );
}

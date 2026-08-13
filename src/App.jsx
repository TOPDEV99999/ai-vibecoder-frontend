import { useState, useEffect, useCallback } from "react";
import {
  Search, Plus, Folder, Terminal as TerminalIcon, Eye, Bot,
  Settings as SettingsIcon, ArrowLeft, Loader2,
} from "lucide-react";
import Logo from "./components/UI/Logo";
import ToastStack from "./components/UI/Toast";
import AppSidebar from "./components/Sidebar/Sidebar";
import CommandPalette from "./components/CommandPalette/CommandPalette";
import NewProjectModal from "./components/NewProjectModal/NewProjectModal";
import SettingsPage from "./components/Settings/Settings";
import Home from "./pages/Home";
import Workspace from "./pages/Workspace";
import { TEMPLATES, INITIAL_PROJECTS } from "./data/mockData";

export default function App() {
  const [view, setView] = useState("home");
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [activeProject, setActiveProject] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [promptDraft, setPromptDraft] = useState("");
  const [settings, setSettings] = useState({
    fontSize: 13, tabSize: 2, wordWrap: false, autoSave: true, notifications: true,
    theme: "Dark", accent: "violet", aiModel: "GPT-Forge", streaming: true, autoApply: false,
  });

  const pushToast = useCallback((text, icon) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, text, icon }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  }, []);

  const openProject = (p) => { setActiveProject(p); setView("workspace"); };

  const openTemplate = (t) => {
    const p = { id: `t${Date.now()}`, name: t.name.toLowerCase().replace(/\s+/g, "-"), desc: t.desc, framework: "React", updated: "just now", accent: t.accent };
    setProjects((ps) => [p, ...ps]);
    openProject(p);
    pushToast(`Created from ${t.name} template`);
  };

  const createProject = ({ name, framework, template, prompt }) => {
    const p = { id: `n${Date.now()}`, name: name.toLowerCase().replace(/\s+/g, "-"), desc: prompt || `${template} project`, framework, updated: "just now", accent: "violet" };
    setProjects((ps) => [p, ...ps]);
    setModalOpen(false);
    openProject(p);
    pushToast("Project created");
  };

  const generateFromPrompt = () => {
    if (!promptDraft.trim()) { setModalOpen(true); return; }
    const p = { id: `g${Date.now()}`, name: "ai-generated-app", desc: promptDraft.slice(0, 60), framework: "React", updated: "just now", accent: "violet" };
    setProjects((ps) => [p, ...ps]);
    openProject(p);
    pushToast("Generating your project…", <Loader2 size={15} className="text-violet-400 animate-spin" />);
    setPromptDraft("");
  };

  const commands = [
    { label: "Search files", icon: Search, hint: "Explorer" },
    { label: "New project", icon: Plus, hint: "⌘N", action: () => setModalOpen(true) },
    { label: "Open project", icon: Folder, hint: "", action: () => setView("home") },
    { label: "Toggle terminal", icon: TerminalIcon, hint: "⌃J" },
    { label: "Toggle preview", icon: Eye, hint: "" },
    { label: "Ask AI", icon: Bot, hint: "⌘I" },
    { label: "Settings", icon: SettingsIcon, hint: "⌘,", action: () => setView("settings") },
  ];

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault(); setPaletteOpen((v) => !v);
      }
      if (e.key === "Escape") { setPaletteOpen(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="w-full h-full min-h-screen bg-zinc-950 text-zinc-200 flex overflow-hidden">
      {view !== "home" && (
        <AppSidebar
          collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed}
          projects={projects} onNewProject={() => setModalOpen(true)} onOpenProject={openProject}
          onSettings={() => setView("settings")} activeProjectId={activeProject?.id}
          mobileOpen={mobileSidebarOpen} setMobileOpen={setMobileSidebarOpen}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0 min-h-0">
        {view === "home" && (
          <>
            <div className="h-14 border-b border-zinc-800/80 flex items-center px-4 gap-3 shrink-0">
              <Logo size={24} />
              <span className="font-semibold text-[14px] text-zinc-100 tracking-tight">VibeForge</span>
              <div className="ml-auto flex items-center gap-2">
                <button onClick={() => setPaletteOpen(true)} className="hidden sm:flex items-center gap-2 text-[12px] text-zinc-500 border border-zinc-800 rounded-lg px-2.5 py-1.5 hover:border-zinc-700">
                  <Search size={13} /> Search <kbd className="text-[10px] ml-2 px-1.5 py-0.5 bg-zinc-800 rounded">⌘K</kbd>
                </button>
                <button onClick={() => setView("settings")} className="p-2 text-zinc-500 hover:text-zinc-300"><SettingsIcon size={16} /></button>
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-[10px] text-white font-medium">JD</div>
              </div>
            </div>
            <Home
              projects={projects} onOpenProject={openProject} onNewProject={() => setModalOpen(true)}
              onOpenTemplate={openTemplate} promptDraft={promptDraft} setPromptDraft={setPromptDraft}
              onGenerate={generateFromPrompt}
            />
          </>
        )}

        {view === "workspace" && (
          <Workspace
            project={activeProject} settings={settings}
            onHome={() => setView("home")} onSettings={() => setView("settings")}
            onToast={pushToast}
          />
        )}

        {view === "settings" && (
          <>
            <div className="h-14 border-b border-zinc-800/80 flex items-center px-4 gap-3 shrink-0">
              <button onClick={() => setView(activeProject ? "workspace" : "home")} className="sm:hidden text-zinc-400"><ArrowLeft size={18} /></button>
              <Logo size={24} />
              <span className="font-semibold text-[14px] text-zinc-100 tracking-tight">Settings</span>
            </div>
            <SettingsPage settings={settings} setSettings={setSettings} onBack={() => setView(activeProject ? "workspace" : "home")} />
          </>
        )}
      </div>

      <CommandPalette
        open={paletteOpen} onClose={() => setPaletteOpen(false)} commands={commands}
        onRun={(c) => c.action && c.action()}
      />
      <NewProjectModal open={modalOpen} onClose={() => setModalOpen(false)} onCreate={createProject} />
      <ToastStack toasts={toasts} />
    </div>
  );
}

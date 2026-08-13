import { useState } from "react";
import { Folder, Bot, X, Zap, RotateCcw, Share2, Rocket, Loader2 } from "lucide-react";
import Topbar from "../components/Topbar/Topbar";
import FileExplorer from "../components/FileExplorer/FileExplorer";
import CodeEditor from "../components/CodeEditor/CodeEditor";
import AIAssistant from "../components/AIAssistant/AIAssistant";
import PreviewPanel from "../components/Preview/Preview";
import TerminalPanel from "../components/Terminal/Terminal";
import { FILE_TREE, FILE_CONTENTS, INITIAL_CHAT } from "../data/mockData";
import { flattenTree } from "../utils/helpers";

export default function Workspace({ project, settings, onHome, onSettings, onToast }) {
  flattenTree(FILE_TREE);
  const [selectedFile, setSelectedFile] = useState("src/components/Dashboard.jsx");
  const [openTabs, setOpenTabs] = useState(["src/App.jsx", "src/components/Dashboard.jsx"]);
  const [activeTab, setActiveTab] = useState("src/components/Dashboard.jsx");
  const [fileContents, setFileContents] = useState(FILE_CONTENTS);
  const [chat, setChat] = useState(INITIAL_CHAT);
  const [thinking, setThinking] = useState(false);
  const [appliedIds, setAppliedIds] = useState([]);
  const [terminalOpen, setTerminalOpen] = useState(true);
  const [terminalLines, setTerminalLines] = useState([
    "$ npm run dev", "", "VITE v5.3.1  ready in 420ms", "",
    "➜  Local:   http://localhost:5173/", "✓ compiled successfully", "✓ 24 modules transformed",
  ]);
  const [previewMode, setPreviewMode] = useState("code");
  const [device, setDevice] = useState("desktop");
  const [deployState, setDeployState] = useState("idle");
  const [mobileAIOpen, setMobileAIOpen] = useState(false);
  const [mobileFilesOpen, setMobileFilesOpen] = useState(false);

  const openFile = (path) => {
    setSelectedFile(path);
    setActiveTab(path);
    if (!openTabs.includes(path)) setOpenTabs((t) => [...t, path]);
    setMobileFilesOpen(false);
  };

  const closeTab = (path) => {
    const next = openTabs.filter((t) => t !== path);
    setOpenTabs(next);
    if (activeTab === path) {
      const fallback = next[next.length - 1] || "src/App.jsx";
      setActiveTab(fallback);
      setSelectedFile(fallback);
    }
  };

  const sendChat = (text) => {
    const userMsg = { id: `u${Date.now()}`, role: "user", text };
    setChat((c) => [...c, userMsg]);
    setThinking(true);
    setTimeout(() => {
      const target = selectedFile;
      const aiMsg = {
        id: `a${Date.now()}`, role: "ai",
        text: `Done — I updated ${target.split("/").pop()} based on "${text}". Review the diff and apply when ready.`,
        file: target,
      };
      setChat((c) => [...c, aiMsg]);
      setThinking(false);
    }, 1400);
  };

  const applyChange = (id, file) => {
    setFileContents((fc) => ({
      ...fc,
      [file]: (fc[file] || "") + `\n\n// AI: applied update — ${new Date().toLocaleTimeString()}`,
    }));
    setAppliedIds((a) => [...a, id]);
    setTerminalLines((l) => [...l, "$ vibeforge apply-patch", "✓ patch applied", "✓ hot reload complete"]);
    onToast("Applied AI changes", <Zap size={15} className="text-violet-400" />);
  };

  const undoChange = (id) => {
    setAppliedIds((a) => a.filter((x) => x !== id));
    onToast("Change reverted", <RotateCcw size={15} className="text-zinc-400" />);
  };

  const handleDeploy = () => {
    setDeployState("deploying");
    setTerminalLines((l) => [...l, "$ vibeforge deploy", "Building for production…"]);
    setTimeout(() => {
      setDeployState("done");
      setTerminalLines((l) => [...l, "✓ build complete", "✓ deployed to vibeforge.app/" + project.name]);
      onToast("Deployed successfully", <Rocket size={15} className="text-violet-400" />);
      setTimeout(() => setDeployState("idle"), 3000);
    }, 1800);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 min-h-0">
      <Topbar
        project={project}
        onDeploy={handleDeploy}
        deployState={deployState}
        onShare={() => onToast("Share link copied", <Share2 size={15} className="text-violet-400" />)}
        onSettings={onSettings}
        onHome={onHome}
        onToggleMobileSidebar={() => {}}
        onToggleMobileAI={() => setMobileAIOpen(true)}
        previewMode={previewMode}
        setPreviewMode={setPreviewMode}
        onToggleTerminal={() => setTerminalOpen((v) => !v)}
      />

      <div className="flex-1 flex min-h-0">
        <div className="w-52 border-r border-zinc-800/80 shrink-0 hidden md:block">
          <FileExplorer selected={selectedFile} onSelect={openFile} />
        </div>

        <div className="flex-1 flex flex-col min-w-0 min-h-0">
          <div className="flex-1 min-h-0">
            {previewMode === "code" ? (
              <CodeEditor
                openTabs={openTabs} activeTab={activeTab}
                onTabClick={(t) => { setActiveTab(t); setSelectedFile(t); }}
                onTabClose={closeTab}
                content={fileContents[activeTab] || ""}
                fontSize={settings.fontSize}
                wordWrap={settings.wordWrap}
                onToast={onToast}
              />
            ) : (
              <PreviewPanel device={device} setDevice={setDevice} projectName={project?.name} />
            )}
          </div>
          <TerminalPanel open={terminalOpen} onClose={() => setTerminalOpen(false)} lines={terminalLines} />
        </div>

        <div className="w-[340px] border-l border-zinc-800/80 shrink-0 hidden lg:block">
          <AIAssistant messages={chat} onSend={sendChat} thinking={thinking} onApply={applyChange} onUndo={undoChange} appliedIds={appliedIds} />
        </div>
      </div>

      {mobileFilesOpen && (
        <div className="fixed inset-0 z-[130] md:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileFilesOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-64"><FileExplorer selected={selectedFile} onSelect={openFile} /></div>
        </div>
      )}
      {mobileAIOpen && (
        <div className="fixed inset-0 z-[130] lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileAIOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-[88%] max-w-sm">
            <div className="h-full flex flex-col">
              <div className="flex justify-end p-2 bg-zinc-950 border-b border-zinc-800/80">
                <button onClick={() => setMobileAIOpen(false)} className="text-zinc-500"><X size={16} /></button>
              </div>
              <div className="flex-1 min-h-0">
                <AIAssistant messages={chat} onSend={sendChat} thinking={thinking} onApply={applyChange} onUndo={undoChange} appliedIds={appliedIds} />
              </div>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={() => setMobileFilesOpen(true)}
        className="md:hidden fixed bottom-5 left-5 z-[90] bg-zinc-900 border border-zinc-800 text-zinc-300 p-3 rounded-full shadow-xl"
      >
        <Folder size={16} />
      </button>
      <button
        onClick={() => setMobileAIOpen(true)}
        className="lg:hidden fixed bottom-5 right-5 z-[90] bg-violet-600 text-white p-3.5 rounded-full shadow-xl shadow-violet-950/50"
      >
        <Bot size={18} />
      </button>
    </div>
  );
}

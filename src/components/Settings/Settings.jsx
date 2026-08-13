import { useState } from "react";
import {
  Settings as SettingsIcon, Palette, Code2, Bot, Keyboard, CreditCard,
  ArrowLeft, LogOut,
} from "lucide-react";
import { Toggle, Row } from "../UI/Toggle";
import { ACCENT_BG, ACCENT_RING } from "../../data/mockData";

export default function SettingsPage({ settings, setSettings, onBack }) {
  const [section, setSection] = useState("General");
  const sections = [
    ["General", SettingsIcon], ["Appearance", Palette], ["Editor", Code2],
    ["AI", Bot], ["Keyboard Shortcuts", Keyboard], ["Account", CreditCard],
  ];
  const set = (k) => (v) => setSettings((s) => ({ ...s, [k]: v }));

  return (
    <div className="flex-1 flex min-h-0">
      <div className="w-56 border-r border-zinc-800/80 shrink-0 py-4 px-3 hidden sm:block">
        <button onClick={onBack} className="flex items-center gap-1.5 text-[12.5px] text-zinc-500 hover:text-zinc-300 mb-4 px-1">
          <ArrowLeft size={13} /> Back
        </button>
        {sections.map(([s, Icon]) => (
          <button
            key={s}
            onClick={() => setSection(s)}
            className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] mb-0.5 ${
              section === s ? "bg-violet-500/10 text-violet-300" : "text-zinc-400 hover:bg-zinc-900"
            }`}
          >
            <Icon size={14} /> {s}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-xl mx-auto px-6 py-8">
          <h2 className="text-lg font-semibold text-zinc-100 mb-1">{section}</h2>
          <p className="text-[13px] text-zinc-500 mb-6">Manage your {section.toLowerCase()} preferences.</p>

          {section === "General" && (
            <div>
              <Row label="Workspace name" desc="Shown across your dashboard"><span className="text-[13px] text-zinc-400 font-mono">vibeforge-workspace</span></Row>
              <Row label="Auto save" desc="Save files as you type"><Toggle checked={settings.autoSave} onChange={set("autoSave")} /></Row>
              <Row label="Desktop notifications" desc="Get notified when builds finish"><Toggle checked={settings.notifications} onChange={set("notifications")} /></Row>
            </div>
          )}

          {section === "Appearance" && (
            <div>
              <Row label="Theme" desc="VibeForge is dark-first">
                <div className="flex gap-1.5">
                  {["Dark", "Midnight", "Contrast"].map((t) => (
                    <button key={t} onClick={() => set("theme")(t)} className={`px-2.5 py-1 rounded-md text-[12px] border ${settings.theme === t ? "bg-violet-600 border-violet-600 text-white" : "border-zinc-800 text-zinc-400"}`}>{t}</button>
                  ))}
                </div>
              </Row>
              <Row label="Accent color" desc="Used for highlights & actions">
                <div className="flex gap-1.5">
                  {["violet", "sky", "emerald", "amber"].map((c) => (
                    <button key={c} onClick={() => set("accent")(c)} className={`w-5 h-5 rounded-full ${ACCENT_BG[c]} ${settings.accent === c ? "ring-2 ring-offset-2 ring-offset-zinc-950 " + ACCENT_RING[c] : ""}`} />
                  ))}
                </div>
              </Row>
            </div>
          )}

          {section === "Editor" && (
            <div>
              <Row label="Font size" desc="Editor & terminal text size">
                <div className="flex items-center gap-2">
                  <input type="range" min="12" max="20" value={settings.fontSize} onChange={(e) => set("fontSize")(Number(e.target.value))} className="accent-violet-500" />
                  <span className="text-[12px] text-zinc-400 w-8">{settings.fontSize}px</span>
                </div>
              </Row>
              <Row label="Tab size" desc="Number of spaces per indent">
                <div className="flex gap-1.5">
                  {[2, 4].map((n) => (
                    <button key={n} onClick={() => set("tabSize")(n)} className={`w-8 h-7 rounded-md text-[12px] border ${settings.tabSize === n ? "bg-violet-600 border-violet-600 text-white" : "border-zinc-800 text-zinc-400"}`}>{n}</button>
                  ))}
                </div>
              </Row>
              <Row label="Word wrap" desc="Wrap long lines in the editor"><Toggle checked={settings.wordWrap} onChange={set("wordWrap")} /></Row>
            </div>
          )}

          {section === "AI" && (
            <div>
              <Row label="Model" desc="Used for code generation">
                <select value={settings.aiModel} onChange={(e) => set("aiModel")(e.target.value)} className="bg-zinc-900 border border-zinc-800 rounded-md px-2 py-1 text-[12.5px] text-zinc-300 outline-none">
                  <option>GPT-Forge</option>
                  <option>GPT-Forge Mini</option>
                  <option>Forge Reasoning</option>
                </select>
              </Row>
              <Row label="Streaming responses" desc="Show AI output as it's generated"><Toggle checked={settings.streaming} onChange={set("streaming")} /></Row>
              <Row label="Auto-apply changes" desc="Apply AI edits without confirmation"><Toggle checked={settings.autoApply} onChange={set("autoApply")} /></Row>
            </div>
          )}

          {section === "Keyboard Shortcuts" && (
            <div>
              {[["Command palette", "Ctrl K"], ["Toggle terminal", "Ctrl J"], ["Ask AI", "Ctrl I"], ["Save file", "Ctrl S"], ["Toggle sidebar", "Ctrl B"]].map(([l, k]) => (
                <Row key={l} label={l}><kbd className="text-[11px] px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono">{k}</kbd></Row>
              ))}
            </div>
          )}

          {section === "Account" && (
            <div>
              <Row label="Email" desc="you@vibeforge.dev"><span /></Row>
              <Row label="Plan" desc="Pro — unlimited AI generations"><span className="text-[11px] px-2 py-1 rounded-full bg-violet-500/10 text-violet-300">Pro</span></Row>
              <Row label="Sign out" desc="End your VibeForge session">
                <button className="flex items-center gap-1.5 text-[12.5px] text-red-400 hover:text-red-300"><LogOut size={13} /> Sign out</button>
              </Row>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

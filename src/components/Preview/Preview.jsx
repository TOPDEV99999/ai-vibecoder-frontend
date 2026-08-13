import { ArrowLeft, ArrowRight, RefreshCw, Monitor, Tablet, Smartphone } from "lucide-react";

export default function PreviewPanel({ device, setDevice, projectName }) {
  const widths = { desktop: "100%", tablet: "768px", mobile: "375px" };
  return (
    <div className="h-full flex flex-col bg-zinc-950">
      <div className="flex items-center gap-2 px-3 h-10 border-b border-zinc-800/80 shrink-0">
        <button className="p-1 rounded text-zinc-500 hover:text-zinc-300"><ArrowLeft size={14} /></button>
        <button className="p-1 rounded text-zinc-500 hover:text-zinc-300"><ArrowRight size={14} /></button>
        <button className="p-1 rounded text-zinc-500 hover:text-zinc-300"><RefreshCw size={12} /></button>
        <div className="flex-1 mx-2 bg-zinc-900 border border-zinc-800 rounded-md px-2.5 py-1 text-[11.5px] text-zinc-500 font-mono truncate">
          localhost:5173 / {projectName}
        </div>
        <div className="flex items-center gap-0.5 bg-zinc-900 border border-zinc-800 rounded-md p-0.5">
          {[["desktop", Monitor], ["tablet", Tablet], ["mobile", Smartphone]].map(([d, Icon]) => (
            <button
              key={d}
              onClick={() => setDevice(d)}
              className={`p-1.5 rounded ${device === d ? "bg-violet-600 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
            >
              <Icon size={13} />
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-auto bg-zinc-900/40 flex justify-center py-6 px-4">
        <div
          className="bg-white rounded-lg overflow-hidden shadow-2xl shadow-black/40 transition-all duration-300 h-fit"
          style={{ width: widths[device], maxWidth: "100%" }}
        >
          <div className="bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-4 flex items-center justify-between text-white">
            <span className="font-semibold text-sm">Northwind</span>
            <div className="hidden sm:flex gap-4 text-[12px] text-white/80">
              <span>Overview</span><span>Billing</span><span>Team</span>
            </div>
            <button className="text-[11px] bg-white/15 px-2.5 py-1 rounded-md">Sign in</button>
          </div>
          <div className="p-6">
            <h2 className="text-lg font-semibold text-zinc-900">Welcome back</h2>
            <p className="text-zinc-500 text-sm mt-1">Your AI workspace is ready.</p>
            <div className="grid grid-cols-3 gap-3 mt-5">
              {["Revenue", "Active users", "Conversion"].map((c, i) => (
                <div key={c} className="border border-zinc-100 rounded-lg p-3 bg-zinc-50">
                  <div className="text-[10.5px] text-zinc-500">{c}</div>
                  <div className="text-base font-semibold text-zinc-800 mt-0.5">{["$48.2k", "12,904", "3.8%"][i]}</div>
                  <div className="h-8 mt-2 flex items-end gap-0.5">
                    {[4,7,5,9,6,10,8].map((h, j) => (
                      <div key={j} className="flex-1 bg-violet-400/70 rounded-sm" style={{ height: `${h * 3}px` }} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

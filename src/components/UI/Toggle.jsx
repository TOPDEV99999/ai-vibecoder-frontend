export function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`w-9 h-5 rounded-full transition-colors relative shrink-0 ${checked ? "bg-violet-600" : "bg-zinc-700"}`}
    >
      <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${checked ? "translate-x-4" : "translate-x-0.5"}`} />
    </button>
  );
}

export function Row({ label, desc, children }) {
  return (
    <div className="flex items-center justify-between py-3.5 border-b border-zinc-800/70 last:border-b-0">
      <div className="pr-4">
        <div className="text-[13.5px] text-zinc-200">{label}</div>
        {desc && <div className="text-[12px] text-zinc-500 mt-0.5">{desc}</div>}
      </div>
      {children}
    </div>
  );
}

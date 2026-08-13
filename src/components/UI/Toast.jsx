import { Check } from "lucide-react";

export default function ToastStack({ toasts }) {
  return (
    <div className="fixed bottom-5 right-5 z-[200] flex flex-col gap-2 items-end">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm px-4 py-2.5 rounded-lg shadow-2xl shadow-black/50"
          style={{ animation: "toastIn 0.2s ease-out" }}
        >
          {t.icon || <Check size={15} className="text-emerald-400 shrink-0" />}
          <span>{t.text}</span>
        </div>
      ))}
    </div>
  );
}

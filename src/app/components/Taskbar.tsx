"use client";

import { useEffect, useState } from "react";
import type { AppDefinition, AppId, WindowState } from "@/src/types";
import { Shell } from "lucide-react";

type Props = {
  windows: WindowState[];
  apps: AppDefinition[];
  onToggleMinimize: (id: string) => void;
  onOpenApp: (id: AppId) => void;
};

export default function Taskbar({ windows, apps, onToggleMinimize, onOpenApp }: Props) {
  const [time, setTime] = useState(new Date());
  const [startOpen, setStartOpen] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-14 bg-slate-900/90 backdrop-blur border-t border-slate-700 flex items-center justify-between px-3 text-slate-100 z-999">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setStartOpen((v) => !v)}
          className="h-9 w-9 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-600 flex items-center justify-center"
          aria-label="Start menu"
        >
          <Shell size={18} />
        </button>

        {apps.map((app) => {
          const w = windows.find((x) => x.appId === app.id);
          const isOpen = !!w && !w.minimized;
          const isMinimized = !!w && w.minimized;

          return (
            <button
              key={app.id}
              onClick={() => {
                if (!w) onOpenApp(app.id);
                else onToggleMinimize(w.id);
              }}
              className={
                "h-9 rounded-md border border-slate-600 flex items-center gap-2 transition px-3 " +
                (isOpen
                  ? "bg-sky-600 hover:bg-sky-500"
                  : "bg-slate-800 hover:bg-slate-700")
              }
            >
              <span>{app.icon}</span>
              {(isOpen || isMinimized) && <span className="text-sm">{app.title}</span>}
            </button>
          );
        })}
      </div>

      {startOpen && (
        <div className="fixed bottom-16 left-3 w-72 rounded-xl border border-slate-700 bg-slate-900/95 shadow-2xl p-3 z-1000">
          <div className="text-sm text-slate-200 font-medium mb-2">Sander OS</div> 
          <div className="text-xs text-slate-400">Start menu placeholder</div>
        </div>
      )}

      <div className="text-sm text-slate-300">
        {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </div>
    </div>
  );
}
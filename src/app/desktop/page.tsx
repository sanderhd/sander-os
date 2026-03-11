"use client";

import { useMemo, useState } from "react";
import TimeBar from "../components/TimeBar";
import Taskbar from "../components/Taskbar";
import AppWindow from "../components/AppWindow";
import { APP_REGISTRY } from "@/src/apps";
import type { AppId, WindowState } from "@/src/types";

export default function DesktopPage() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [zCounter, setZCounter] = useState(20);

  const appMap = useMemo(
    () => Object.fromEntries(APP_REGISTRY.map((a) => [a.id, a])),
    []
  );

  const openApp = (appId: AppId) => {
    const existing = windows.find((w) => w.appId === appId);
    if (existing) {
      setWindows((prev) =>
        prev.map((w) =>
          w.id === existing.id ? { ...w, minimized: false, z: zCounter + 1 } : w
        )
      );
      setZCounter((z) => z + 1);
      return;
    }

    const app = appMap[appId];
    if (!app) return;

    const id = crypto.randomUUID();
    const nextZ = zCounter + 1;

    setWindows((prev) => [
      ...prev,
      {
        id,
        appId,
        title: app.title,
        x: 120 + prev.length * 30,
        y: 100 + prev.length * 20,
        width: app.defaultWidth,
        height: app.defaultHeight,
        z: nextZ,
        minimized: false,
      },
    ]);
    setZCounter(nextZ);
  };

  const closeWindow = (id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  };

  const focusWindow = (id: string) => {
    const nextZ = zCounter + 1;
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, z: nextZ } : w)));
    setZCounter(nextZ);
  };

  const moveWindow = (id: string, x: number, y: number) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, x, y } : w)));
  };

  const toggleMinimize = (id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, minimized: !w.minimized } : w))
    );
  };

  return (
    <div
      className="min-h-screen text-white relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/wallpaper.png')" }}
    >
      <div className="absolute inset-0 bg-slate-900/30" />
      <TimeBar />

      <div className="relative z-10 p-6 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6 max-w-3xl">
        {APP_REGISTRY.map((app) => (
          <button
            key={app.id}
            onDoubleClick={() => openApp(app.id)}
            className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/10 focus:outline-none"
          >
            <div className="h-14 w-14 rounded-xl bg-slate-800/80 border border-slate-600 flex items-center justify-center">
              {app.icon}
            </div>
            <span className="text-sm">{app.title}</span>
          </button>
        ))}
      </div>

      {windows.map((w) => (
        <AppWindow
          key={w.id}
          window={w}
          onClose={closeWindow}
          onMinimize={toggleMinimize}
          onFocus={focusWindow}
          onMove={moveWindow}
        >
          {appMap[w.appId]?.content}
        </AppWindow>
      ))}

      <Taskbar 
        windows={windows} 
        apps={APP_REGISTRY} 
        onToggleMinimize={toggleMinimize}
        onOpenApp={openApp}  
      />
    </div>
  );
}
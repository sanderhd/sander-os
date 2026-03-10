"use client";

import React, { useEffect, useState } from "react";
import { Menu, Folder, Globe, Terminal } from "lucide-react";

export default function Taskbar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-14 bg-slate-900/90 backdrop-blur border-t border-slate-700 flex items-center justify-between px-3 text-slate-100">
      <div className="flex items-center gap-2">
        <button className="h-9 w-9 rounded-md bg-sky-500 hover:bg-sky-600 flex items-center justify-center">
          <Menu size={18} />
        </button>

        <button className="h-9 w-9 rounded-md bg-slate-800 hover:bg-slate-700 flex items-center justify-center">
          <Folder size={18} />
        </button>

        <button className="h-9 w-9 rounded-md bg-slate-800 hover:bg-slate-700 flex items-center justify-center">
          <Globe size={18} />
        </button>

        <button className="h-9 w-9 rounded-md bg-slate-800 hover:bg-slate-700 flex items-center justify-center">
          <Terminal size={18} />
        </button>
      </div>

      <div className="text-sm text-slate-300">
        {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </div>
    </div>
  );
}
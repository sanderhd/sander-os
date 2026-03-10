"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Shell } from "lucide-react";
import TimeBar from "./components/TimeBar";

export default function LockScreen() {
  const router = useRouter()
  const [time, setTime] = useState(new Date());  

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
      <TimeBar />
      
      <div className="flex flex-col items-center gap-6">
        <div className="w-28 h-28 rounded-full bg-slate-800/50 flex items-center justify-center shadow-inner">
          <User size={50} />
        </div>

        <div className="text-center">
          <div className="text-xl font-semibold">Sander</div>
        </div>

        <button
          onClick={() => router.push("/login")}
          className="mt-4 px-6 py-2 rounded-md bg-sky-500 hover:bg-sky-600 text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
        >
          Login
        </button>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-slate-300 flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center">
          <Shell />
        </div>
          <div className="text-sm font-medium">Sander OS</div>
      </div>
    </div>
  )
}
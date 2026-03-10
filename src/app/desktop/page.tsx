"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TimeBar from "../components/TimeBar";
import Taskbar from "../components/Taskbar";

export default function LockScreen() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-slate-900 text-white relative">
      <TimeBar />
      
      <Taskbar />
    </div>
  )
}
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Shell, User } from "lucide-react";
import TimeBar from "../components/TimeBar";

export default function Login() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [time, setTime] = useState(new Date());
  const [error, setError] = useState("");

  const hardcodedPassword = "SuperDevSanderOS";

  console.log("SuperDevSanderOS");

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const handleLogin = () => {
    if (password === hardcodedPassword) {
      router.push(`/desktop`);
    } else {
      setError("Incorrect password");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white relative overflow-hidden">
      <TimeBar />

      <div className="flex flex-col items-center gap-6">
        <div className="w-28 h-28 rounded-full bg-slate-800/50 flex items-center justify-center shadow-inner">
          <User size={50} />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          className="flex flex-col items-center gap-3"
          style={{ minWidth: 360 }}
        >
          <div className="w-full mb-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => router.push("/")}
              aria-label="Back"
              className="h-10 w-10 rounded-full bg-slate-800/70 border border-slate-600 flex items-center justify-center hover:bg-slate-700/70"
            >
              <ChevronLeft size={18} />
            </button>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              type="password"
              placeholder="Password"
              className="flex-1 px-3 py-2 rounded-md bg-slate-700/40 border border-slate-600 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {error && <div className="text-red-400 text-sm mb-2">{error}</div>}

          <div className="flex w-full justify-center items-center">
            <button
              type="submit"
              className="mt-4 px-6 py-2 rounded-md bg-sky-500 hover:bg-sky-600 text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
            >
              Log In
            </button>
          </div>
        </form>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-slate-300 flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center">
          <Shell />
        </div>
        <div className="text-sm font-medium">Sander OS</div>
      </div>
    </div>
  );
}
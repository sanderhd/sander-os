"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (guest = false) => {
    const user = guest ? "guest" : username || "guest"
    router.push(`/desktop?user=${encodeURIComponent(user)}`)
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 to-sky-900 flex items-center justify-center text-white">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleLogin()
        }}
        className="w-96 bg-slate-800/60 backdrop-blur-sm rounded-lg p-8 shadow-lg"
      >
        <h1 className="text-2xl font-semibold mb-4 text-center">Sander OS</h1>

        <label className="block text-sm mb-1">Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full mb-3 px-3 py-2 rounded bg-slate-700/40 border border-slate-600 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />

        <label className="block text-sm mb-1">Password</label>
        <input
          value={password}
          onChange={(e) => setUsername(e.target.value)}
          type="password"
          placeholder="••••••" 
          className="w-full mb-3 px-3 py-2 rounded bg-slate-700/40 border border-slate-600 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />

        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="px-4 py-2 rounded bg-sky-500 hover:bg-sky-600 text-white"
          >
            Log in
          </button>

          <button
            type="button"
            onClick={() => handleLogin(true)}
            className="px-3 py-2 rounded border border-slate-600 text-slate-200 hover:bg-slate-700/30"
          >
            Guest
          </button>
        </div>
      </form>
    </div>
  )
}
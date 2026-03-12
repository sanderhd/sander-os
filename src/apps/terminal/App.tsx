"use client";

import { useMemo, useRef, useState, useEffect } from "react";

type Line = {
  type: "input" | "output" | "error" | "system";
  text: string;
};

const AVAILABLE_COMMANDS = [
  "help",
  "clear",
  "date",
  "whoami",
  "echo <text>",
  "ls",
  "pwd",
  "about",
];

export default function TerminalApp() {
  const [cwd] = useState("/home/sander");
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<Line[]>([
    { type: "system", text: "SanderOS Terminal v0.1" },
    { type: "system", text: 'Typ "help" for commands\'s.' },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const prompt = useMemo(() => `sander@os:${cwd}$`, [cwd]);

  const runCommand = (raw: string) => {
    const value = raw.trim();
    if (!value) return;

    setLines((prev) => [...prev, { type: "input", text: `${prompt} ${value}` }]);

    const [cmd, ...rest] = value.split(" ");
    const arg = rest.join(" ");

    if (cmd === "help") {
      setLines((prev) => [
        ...prev,
        { type: "output", text: "Available commands:" },
        ...AVAILABLE_COMMANDS.map((c) => ({ type: "output" as const, text: `- ${c}` })),
      ]);
      return;
    }

    if (cmd === "clear") {
      setLines([]);
      return;
    }

    if (cmd === "date") {
      setLines((prev) => [...prev, { type: "output", text: new Date().toString() }]);
      return;
    }

    if (cmd === "whoami") {
      setLines((prev) => [...prev, { type: "output", text: "sander" }]);
      return;
    }

    if (cmd === "echo") {
      setLines((prev) => [...prev, { type: "output", text: arg || "" }]);
      return;
    }

    if (cmd === "ls") {
      setLines((prev) => [
        ...prev,
        { type: "output", text: "Desktop,  Documents,  Downloads,  Projects" },
      ]);
      return;
    }

    if (cmd === "pwd") {
      setLines((prev) => [...prev, { type: "output", text: cwd }]);
      return;
    }

    if (cmd === "about") {
      setLines((prev) => [
        ...prev,
        { type: "output", text: "SanderOS browser terminal demo." },
      ]);
      return;
    }

    setLines((prev) => [
      ...prev,
      { type: "error", text: `Command not found: ${cmd}` },
      { type: "output", text: 'Type "help" for available commands.' },
    ]);
  };

  return (
    <div
      className="h-full w-full bg-[#0b1220] text-slate-100 font-mono text-sm p-3"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="h-full overflow-auto rounded-md border border-slate-700 bg-[#0a0f1a] p-3">
        {lines.map((line, i) => (
          <div
            key={`${line.type}-${i}`}
            className={
              line.type === "error"
                ? "text-rose-400"
                : line.type === "system"
                ? "text-sky-300"
                : line.type === "input"
                ? "text-slate-200"
                : "text-slate-300"
            }
          >
            {line.text}
          </div>
        ))}

        <form
          className="mt-2 flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            runCommand(input);
            setInput("");
          }}
        >
          <span className="text-emerald-400 shrink-0">{prompt}</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none text-slate-100"
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
          />
        </form>

        <div ref={endRef} />
      </div>
    </div>
  );
}
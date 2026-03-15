import React, { useEffect, useState } from "react";
import { Plus, File as FileIcon, Trash2, Edit, Save } from "lucide-react";

type AppFile = { id: string; name: string; content: string };

const STORAGE_KEY = "sander-os-simple-files:v1";
const defaultFiles: AppFile[] = [
  { id: "1", name: "README.md", content: "# Welcome to Sander OS\n\nThis is a demo file." },
];

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export default function FilesApp() {
  const [files, setFiles] = useState<AppFile[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : defaultFiles;
    } catch {
      return defaultFiles;
    }
  });
  const [selectedId, setSelectedId] = useState<string | null>(files[0]?.id ?? null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editorValue, setEditorValue] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(files));
  }, [files]);

  useEffect(() => {
    const sel = files.find((f) => f.id === selectedId) ?? null;
    setEditorValue(sel?.content ?? "");
    setEditingId(null);
  }, [selectedId, files]);

  function createFile() {
    const f: AppFile = { id: uid(), name: "untitled.txt", content: "" };
    setFiles((s) => [f, ...s]);
    setSelectedId(f.id);
    setEditingId(f.id);
  }

  function deleteFile(id: string) {
    if (!confirm("Delete this file?")) return;
    setFiles((s) => s.filter((f) => f.id !== id));
    if (selectedId === id) setSelectedId(null);
  }

  function renameFile(id: string, name: string) {
    setFiles((s) => s.map((f) => (f.id === id ? { ...f, name } : f)));
    setEditingId(null);
  }

  function saveFile(id: string) {
    setFiles((s) => s.map((f) => (f.id === id ? { ...f, content: editorValue } : f)));
    alert("Saved locally");
  }

  const selected = files.find((f) => f.id === selectedId) ?? null;

  return (
    <div className="flex h-full text-white">
      <aside className="w-64 border-r border-slate-700 p-4 bg-slate-900">
        <div className="flex items-center justify-between mb-4">
          <div className="text-lg font-medium">Files</div>
          <button onClick={createFile} title="New file" className="p-2 rounded bg-slate-800 hover:bg-slate-700">
            <Plus size={16} />
          </button>
        </div>

        <div className="space-y-2 overflow-auto max-h-[70vh]">
          {files.map((f) => (
            <div
              key={f.id}
              className={
                "flex items-center gap-2 p-2 rounded cursor-pointer " + (f.id === selectedId ? "bg-slate-800" : "hover:bg-slate-850")
              }
              onClick={() => setSelectedId(f.id)}
            >
              <FileIcon size={16} />
              {editingId === f.id ? (
                <input
                  autoFocus
                  defaultValue={f.name}
                  onBlur={(e) => renameFile(f.id, e.target.value || f.name)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") (e.target as HTMLInputElement).blur();
                  }}
                  className="bg-transparent border-b border-slate-600 focus:outline-none text-sm flex-1"
                />
              ) : (
                <div className="text-sm truncate flex-1">{f.name}</div>
              )}

              <button
                title="Rename"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingId(f.id);
                }}
                className="p-1 rounded hover:bg-slate-800"
              >
                <Edit size={14} />
              </button>

              <button
                title="Delete"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteFile(f.id);
                }}
                className="p-1 rounded hover:bg-red-800"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          {files.length === 0 && <div className="text-sm text-slate-400">No files — create one.</div>}
        </div>
      </aside>

      <main className="flex-1 p-4 bg-slate-900">
        {!selected && <div className="text-slate-400">Select a file to view or edit</div>}

        {selected && (
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-3">
              <div className="text-lg font-semibold">{selected.name}</div>
              <div className="flex items-center gap-2">
                <button onClick={() => saveFile(selected.id)} className="px-3 py-1 rounded bg-sky-600 hover:bg-sky-700 flex items-center gap-2">
                  <Save size={14} /> Save
                </button>
              </div>
            </div>

            <textarea
              value={editorValue}
              onChange={(e) => setEditorValue(e.target.value)}
              className="flex-1 w-full bg-slate-800 p-3 rounded resize-none focus:outline-none text-sm"
            />
          </div>
        )}
      </main>
    </div>
  );
}
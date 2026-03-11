import { Folder, Globe, Terminal } from "lucide-react";
import type { AppDefinition } from "../types";
import FilesApp from "./files/App";
import BrowserApp from "./browser/App";
import TerminalApp from "./terminal/App";

export const APP_REGISTRY: AppDefinition[] = [
  {
    id: "files",
    title: "Files",
    icon: <Folder size={28} />,
    defaultWidth: 620,
    defaultHeight: 420,
    content: <FilesApp />,
  },
  {
    id: "browser",
    title: "Browser",
    icon: <Globe size={28} />,
    defaultWidth: 760,
    defaultHeight: 500,
    content: <BrowserApp />,
  },
  {
    id: "terminal",
    title: "Terminal",
    icon: <Terminal size={28} />,
    defaultWidth: 640,
    defaultHeight: 420,
    content: <TerminalApp />,
  },
];
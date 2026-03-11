"use client";

import { useRef, useState } from "react";
import { Minus, X } from "lucide-react";
import type { ReactNode } from "react";
import type { WindowState } from "@/src/types";

type Props = {
  window: WindowState;
  children: ReactNode;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onFocus: (id: string) => void;
  onMove: (id: string, x: number, y: number) => void;
};

export default function AppWindow({
  window,
  children,
  onClose,
  onMinimize,
  onFocus,
  onMove,
}: Props) {
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ mx: 0, my: 0, wx: 0, wy: 0 });

  const onPointerDownTitle = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isWindowControl(e.target)) return;

    setDragging(true);
    onFocus(window.id);
    dragStart.current = {
      mx: e.clientX,
      my: e.clientY,
      wx: window.x,
      wy: window.y,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMoveTitle = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const dx = e.clientX - dragStart.current.mx;
    const dy = e.clientY - dragStart.current.my;

    const nextX = Math.max(0, dragStart.current.wx + dx);
    const nextY = Math.max(0, dragStart.current.wy + dy);

    onMove(window.id, nextX, nextY);
  };

  const onPointerUpTitle = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    setDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const isWindowControl = (target: EventTarget | null) => {
    return target instanceof HTMLElement && !!target.closest("[data-window-control='true']");
  }

  if (window.minimized) return null;

  return (
    <div
      className="absolute rounded-xl border border-slate-600 bg-slate-900/95 shadow-2xl overflow-hidden"
      style={{
        left: window.x,
        top: window.y,
        width: window.width,
        height: window.height,
        zIndex: window.z,
      }}
      onMouseDown={() => onFocus(window.id)}
    >
      <div
        className="h-10 px-3 border-b border-slate-700 bg-slate-800/90 flex items-center justify-between cursor-move select-none"
        onPointerDown={onPointerDownTitle}
        onPointerMove={onPointerMoveTitle}
        onPointerUp={onPointerUpTitle}
      >
        <span className="text-sm">{window.title}</span>
        <div className="flex items-center gap-1">
          <button
            data-window-control="true"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onMinimize(window.id);
            }}
            className="h-7 w-7 rounded-md hover:bg-slate-700 flex items-center justify-center"
            aria-label="Minimize"
          >
            <Minus size={16} />
          </button>
          <button
            data-window-control="true"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onClose(window.id);
            }}
            className="h-7 w-7 rounded-md hover:bg-slate-700 flex items-center justify-center"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>
      </div>
      <div className="h-[calc(100%-2.5rem)] overflow-auto">{children}</div>
    </div>
  );
}
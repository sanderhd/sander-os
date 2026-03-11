import type { ReactNode } from "react";

export type AppId = "files" | "browser" | "terminal";

export type AppDefinition = {
    id: AppId;
    title: string;
    icon: ReactNode;
    defaultWidth: number;
    defaultHeight: number;
    content: ReactNode;
};

export type WindowState = {
    id: string;
    appId: AppId;
    title: string;
    x: number;
    y: number;
    width: number;
    height: number;
    z: number;
    minimized: boolean;
}
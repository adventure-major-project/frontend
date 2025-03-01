"use client";

import dynamic from "next/dynamic";

const Excalidraw = dynamic(
  () => import("@excalidraw/excalidraw").then((mod) => mod.Excalidraw),
  { ssr: false }
);

export default function CanvasPage() {
  return (
    <div className="h-screen w-screen">
      <Excalidraw />
    </div>
  );
}

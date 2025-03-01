"use client";
import Link from "next/link";
import Image from "next/image";
import RenderCanvas from "@/app/_components/RenderCanvas";

export default function CanvasPage() {
  const campaignName = "Samsung Heapdhone Z23";

  return (
    <RenderCanvas campaignName={campaignName} />
  );
}

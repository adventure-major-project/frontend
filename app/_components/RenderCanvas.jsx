"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import Loader from "./Loader";
import RightSidebar from "./RightSidebar";

const Excalidraw = dynamic(
  () => import("@excalidraw/excalidraw").then((mod) => mod.Excalidraw),
  { ssr: false }
);

export default function CanvasPage({campaignName = "Campaign Name", ...props}) {
  return (
    <div className="relative h-screen w-screen bg-[#232329] text-white">
      <div className="absolute top-[1rem] left-20 flex items-center gap-4 px-4 py-2 bg-[#232329] rounded-lg shadow-md z-10">
        <Link href="/">
          <Image src="/logo.jpg" alt="Logo" className="cursor-pointer" height={24} width={32} />
        </Link>
        <h1 className="text-lg font-semibold" title="Campaign Name">{
            campaignName.length > 20 ? campaignName.slice(0, 20) + "..." : campaignName
          }</h1>
      </div>
      <Loader text="Loading canvas..." />
        <div className="absolute inset-0 z-0">
        <Excalidraw
              theme="dark"
              name={campaignName}
              autoFocus={true}
              renderTopRightUI={RightSidebar}
              {...props}
            />
        </div>
    </div>
  );
}

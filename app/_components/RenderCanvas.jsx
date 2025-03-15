"use client";
import dynamic from "next/dynamic";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import Loader from "./Loader";
import RightSidebar from "./RightSidebar";
import { useUpdateCanvasState } from "@/hooks/useCanvas";
import { toast, Toaster } from "react-hot-toast";

const Excalidraw = dynamic(
  () => import("@excalidraw/excalidraw").then((mod) => mod.Excalidraw),
  { ssr: false }
);

export default function RenderCanvas({ campaign, canvasData }) {
  const { mutate: updateCanvas } = useUpdateCanvasState();
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);
  const [imageURLs, setImageURLs] = useState({}); // Stores image URLs against element IDs

  // Load initial canvas state when Excalidraw API is available
  useEffect(() => {
    if (canvasData?.data && excalidrawAPI) {
      excalidrawAPI.updateScene(canvasData.data);
    }
  }, [canvasData, excalidrawAPI]);

  // Function to save the canvas state
  const handleSave = useCallback(() => {
    if (!campaign?.id || !excalidrawAPI) return;

    const elements = excalidrawAPI.getSceneElements();
    const appState = excalidrawAPI.getAppState();

    // Remove collaborators to prevent errors
    const cleanedAppState = { ...appState, collaborators: undefined };

    // Attach image URLs to elements
    const updatedElements = elements.map((el) => {
      if (el.type === "image" && imageURLs[el.id]) {
        return { ...el, imageUrl: imageURLs[el.id] }; // Store the image URL in the element
      }
      return el;
    });

    updateCanvas({
      id: campaign.id,
      data: { elements: updatedElements, appState: cleanedAppState },
    });

    // Show success toast
    toast.success("Canvas saved successfully!");

    console.log("Canvas state saved!", { elements: updatedElements, appState: cleanedAppState });
  }, [campaign?.id, excalidrawAPI, updateCanvas, imageURLs]);

  // Listen for "Ctrl + S" and trigger save
  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        event.preventDefault();
        handleSave();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleSave]);
  
  return (
    <div className="relative h-screen w-screen bg-[#232329] text-white">
      <div className="absolute top-[1rem] left-20 flex items-center gap-4 z-10">
        <div className="flex items-center gap-4 px-4 py-2 bg-[#232329] rounded-lg shadow-md z-10">
          <Link href="/">
            <Image src="/logo.jpg" alt="Logo" className="cursor-pointer" height={24} width={32} />
          </Link>
          <h1 className="text-lg font-semibold" title="Campaign Name">
            {campaign?.name?.length > 20 ? campaign.name.slice(0, 20) + "..." : campaign?.name || "Untitled"}
          </h1>
        </div>
        <button
          className="bg-[#e87415] hover:bg-[#ff9f1c] px-4 py-2 rounded-lg font-semibold"
          onClick={handleSave}
        >
          Save
        </button>
        <Toaster toastOptions={ {success: {
          duration: 3000,
          iconTheme: {
            primary: 'green',
            secondary: 'black',
          },
        },}} />
      </div>

      {!canvasData && <Loader text="Loading canvas..." />}

      <div className="absolute inset-0 z-0">
        <Excalidraw
          theme="dark"
          name={campaign?.name}
          autoFocus={true}
          renderTopRightUI={() => <RightSidebar campaignId={campaign?.id} campaignName={campaign?.name} />}
          initialData={canvasData?.data}
          excalidrawAPI={(api) => setExcalidrawAPI(api)}
        />
      </div>
    </div>
  );
}

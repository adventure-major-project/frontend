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
  async () => {
    const mod = await import("@excalidraw/excalidraw");
    return mod.Excalidraw;
  },
  {
    ssr: false,
    loading: () => <Loader text="Loading canvas..." />
  }
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

  // Function to handle image drops
  const onDropImage = useCallback(async (e) => {
    e.preventDefault();
    console.log('Drop event triggered');
    
    if (!excalidrawAPI) {
      console.log('ExcalidrawAPI not available');
      return;
    }

    const imageUrl = e.dataTransfer.getData('text/plain');
    console.log('Image URL from drop:', imageUrl);
    
    if (!imageUrl) {
      console.log('No image URL found in drop data');
      return;
    }

    try {
      console.log('Creating new image element...');
      // Create a new image element to load the image
      const img = new window.Image();
      img.crossOrigin = "anonymous"; // Enable CORS
      
      // Create a promise to wait for image load
      const imageLoadPromise = new Promise((resolve, reject) => {
        img.onload = () => {
          console.log('Image loaded successfully', { width: img.width, height: img.height });
          resolve(img);
        };
        img.onerror = (error) => {
          console.error('Image load error:', error);
          reject(error);
        };
      });

      img.src = imageUrl;
      console.log('Set image source, waiting for load...');
      
      // Wait for image to load
      const loadedImg = await imageLoadPromise;
      
      // Create a canvas to handle the image
      console.log('Creating canvas for image processing...');
      const canvas = document.createElement('canvas');
      canvas.width = loadedImg.width;
      canvas.height = loadedImg.height;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(loadedImg, 0, 0);
      
      // Get image data as base64 with preserved transparency
      const dataURL = canvas.toDataURL('image/png');
      console.log('Generated dataURL:', dataURL.substring(0, 100) + '...');
      
      // Add image element to Excalidraw
      console.log('Adding image to Excalidraw...');
      
      // Get current viewport for positioning
      const { width, height, scrollX, scrollY } = excalidrawAPI.getAppState();
      const centerX = scrollX + width / 2;
      const centerY = scrollY + height / 2;

      // Create the image element with proper positioning
      const imageElement = {
        type: "image",
        x: centerX - loadedImg.width / 2,
        y: centerY - loadedImg.height / 2,
        width: loadedImg.width,
        height: loadedImg.height,
        angle: 0,
        strokeColor: "transparent",
        backgroundColor: "transparent",
        fillStyle: "hachure",
        strokeWidth: 1,
        strokeStyle: "solid",
        roughness: 1,
        opacity: 100,
        groupIds: [],
        frameId: null,
        roundness: null,
        seed: Math.floor(Math.random() * 2000),
        version: 1,
        versionNonce: Math.floor(Math.random() * 2000),
        isDeleted: false,
        boundElements: null,
        updated: Date.now(),
        link: null,
        locked: false,
        fileId: Date.now().toString(),
        scale: [1, 1],
        id: Date.now().toString(),
      };

      // Add the image to Excalidraw's files
      await excalidrawAPI.addFiles([
        {
          id: imageElement.fileId,
          dataURL,
          mimeType: "image/png",
          created: Date.now(),
          lastRetrieved: Date.now(),
        }
      ]);

      // Get current elements and add new image element
      const currentElements = excalidrawAPI.getSceneElements();
      excalidrawAPI.updateScene({
        elements: [...currentElements, imageElement]
      });

      console.log('Image added to Excalidraw:', imageElement);

      // Store the original URL against the element ID
      setImageURLs(prev => ({
        ...prev,
        [imageElement.id]: imageUrl
      }));
      console.log('Image URL stored in state');
    } catch (error) {
      console.error('Detailed error in onDropImage:', error);
      toast.error('Failed to add image to canvas');
    }
  }, [excalidrawAPI]);

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

      <div 
        className="absolute inset-0 z-0" 
        onDrop={onDropImage} 
        onDragOver={(e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = 'copy';
        }}
        onDragEnter={(e) => {
          e.preventDefault();
          console.log('Drag enter event');
        }}
      >
        <Excalidraw
          theme="dark"
          name={campaign?.name}
          autoFocus={true}
          renderTopRightUI={() => <RightSidebar campaignId={campaign?.id} campaignName={campaign?.name} />}
          initialData={canvasData?.data}
          excalidrawAPI={(api) => {
            console.log('Excalidraw API initialized');
            setExcalidrawAPI(api);
          }}
          UIOptions={{
            canvasActions: {
              changeViewBackgroundColor: true,
              clearCanvas: true,
              saveAsImage: true,
              theme: true,
              loadScene: true,
            },
            dockedSidebarBreakpoint: 0,
          }}
          renderCustomStats={() => null}
          detectScroll={false}
          handleKeyboardGlobally={true}
        />
      </div>
    </div>
  );
}

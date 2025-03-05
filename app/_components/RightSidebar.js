"use client";
import { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";

import {
  useBackgrounds,
  useProducts,
  useUploadBackgroundText,
  useUploadProductText,
  useDeleteBackground,
  useDeleteProduct,
} from "@/hooks/useImages";
import API_BASE_URL from "@/lib/config";

export default function RightSidebar({campaignId, campaignName}) {
  // State for Prompts & Results
  const [bgPrompt, setBgPrompt] = useState("");
  const [productPrompt, setProductPrompt] = useState("");
  const [showBGResults, setShowBGResults] = useState(false);
  const [showProductResults, setShowProductResults] = useState(false);

  // Fetch images (GET request)
  const {
    data: backgrounds,
    isLoading: bgLoading,
    error: bgError,
  } = useBackgrounds(campaignId);
  const {
    data: products,
    isLoading: prodLoading,
    error: prodError,
  } = useProducts(campaignId);

  const layers = [
    { id: 1, name: "Background", visible: true },
    { id: 2, name: "Product", visible: true },
    { id: 3, name: "Logo", visible: true },
    { id: 4, name: "Text", visible: true },
  ];

  // Mutations for posting text
  const uploadBG = useUploadBackgroundText();
  const uploadProduct = useUploadProductText();
  const deleteBG = useDeleteBackground();
  const deleteProduct = useDeleteProduct();

  return (
    <div className="absolute top-0 right-0 p-4 flex h-[calc(100vh-5rem)] w-[20rem] bg-[#232329] bg-opacity-60 backdrop-blur-md shadow-lg rounded-lg flex-col gap-4">
      {/* Title */}
      <h2 className="text-white text-lg font-semibold">{campaignName}</h2>

      {/* Background Text Prompt */}
      <div className="flex flex-col gap-2">
        <label className="text-gray-300 text-sm">Background Prompt</label>
        <textarea
          value={bgPrompt}
          onChange={(e) => setBgPrompt(e.target.value)}
          className="w-full h-20 p-2 rounded-lg bg-black/30 text-white border border-gray-600 focus:outline-none"
          placeholder="Describe background..."
        />
        <div className="flex justify-between mt-2">
          <button
            onClick={() => {
              setShowBGResults(true);
              setShowProductResults(false);
            }}
            className="bg-gray-700 text-white px-3 py-1 rounded-lg text-sm"
          >
            See Results
          </button>
          <button
            onClick={() => {
              if (!campaignId) {
                console.error("Campaign ID is missing!");
                alert("Error: Campaign ID is missing!");
                return;
              }
              if (!bgPrompt.trim()) {
                console.error("Background text is empty!");
                alert("Error: Please enter a background prompt.");
                return;
              }
              uploadBG.mutate({ campaign: campaignId, text: bgPrompt });
            }}
            className="bg-[#e87415] text-white px-3 py-1 rounded-lg text-sm"
            disabled={!campaignId || !bgPrompt.trim()}
          >
            Generate
          </button>
        </div>
      </div>

      {/* Background Results (Fetching Images) */}
      {bgLoading && <p className="text-white">Loading backgrounds...</p>}
      {bgError && (
        <p className="text-red-500">
          Error loading backgrounds: {bgError.message}
        </p>
      )}
      {showBGResults && (
        <Results
          images={backgrounds}
          deleteImage={deleteBG.mutate}
          setShowResults={setShowBGResults}
        />
      )}

      {/* Product Text Prompt */}
      <div className="flex flex-col gap-2">
        <label className="text-gray-300 text-sm">Product Prompt</label>
        <textarea
          value={productPrompt}
          onChange={(e) => setProductPrompt(e.target.value)}
          className="w-full h-20 p-2 rounded-lg bg-black/30 text-white border border-gray-600 focus:outline-none"
          placeholder="Describe product..."
        />
        <div className="flex justify-between mt-2">
          <button
            onClick={() => {
              setShowProductResults(true);
              setShowBGResults(false);
            }}
            className="bg-gray-700 text-white px-3 py-1 rounded-lg text-sm"
          >
            See Results
          </button>
          <button
            onClick={() => {
              if (!campaignId) {
                console.error("Campaign ID is missing!");
                alert("Error: Campaign ID is missing!");
                return;
              }
              if (!productPrompt.trim()) {
                console.error("Product text is empty!");
                alert("Error: Please enter a product prompt.");
                return;
              }
              uploadProduct.mutate({
                campaign: campaignId,
                text: productPrompt,
              });
            }}
            className="bg-[#e87415] text-white px-3 py-1 rounded-lg text-sm"
            disabled={!campaignId || !productPrompt.trim()}
          >
            Generate
          </button>
        </div>
      </div>

      {/* Product Results (Fetching Images) */}
      {prodLoading && <p className="text-white">Loading products...</p>}
      {prodError && (
        <p className="text-red-500">
          Error loading products: {prodError.message}
        </p>
      )}
      {showProductResults && (
        <Results
          images={products}
          deleteImage={deleteProduct.mutate}
          setShowResults={setShowProductResults}
        />
      )}


<div className="flex flex-col gap-2 mt-auto relative">
        <label className="text-gray-300 text-sm">Layers</label>
        <button
          // onClick={addLayer}
          className="mt-2 px-2 bg-gray-700 hover:bg-gray-900 text-white text-sm py-1 rounded-md absolute right-2 top-[-1rem]"
        >
          + Add Layer
        </button>
        <div className="relative flex flex-col gap-2 bg-black/30 p-2 rounded-lg border border-gray-600 max-h-40 overflow-y-auto">
          {layers.map((layer, index) => (
            <div
              key={layer.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(index)}
              className="flex items-center justify-between bg-gray-800 p-2 rounded-md cursor-pointer"
            >
              {/* Drag Handle */}
              <span className="text-gray-400 cursor-grab">☰</span>

              {/* Layer Name */}
              <span className="text-white flex-1 text-sm truncate px-2">
                {layer.name}
              </span>

              {/* Hide/Unhide Button */}
              <button
                // onClick={() => toggleVisibility(layer.id)}
                className="text-white text-xs px-2"
              >
                {layer.visible ? "👁" : "🚫"}
              </button>

              {/* Delete Button */}
              <button
                // onClick={() => removeLayer(layer.id)}
                className="text-red-500 hover:text-red-700 text-sm px-2"
              >
                🗑
              </button>
            </div>
          ))}
        </div>        
      </div>
    </div>
  );
}

// Results Component (Displays Images)
function Results({ images, deleteImage, setShowResults }) {
  return (
    <div className="absolute top-0 left-[-22rem] p-4 w-[20rem] h-[calc(100vh-5rem)] bg-[#232329] rounded-lg overflow-y-auto">
      <div
        className="absolute top-0 right-0 p-2 m-1 bg-[#e87415] rounded-lg cursor-pointer"
        onClick={() => setShowResults(false)}
      >
        <X size={24} className="text-white" />
      </div>
      <h3 className="text-white text-md mb-2">Generated Images</h3>
      {images?.length > 0 ? (
        images.map((img) => (
          <div key={img.id} className="relative p-3">
            <Image
              src={img.image ? `${API_BASE_URL}${img.image}` : "/charlie-loader.gif"}
              width={300}
              height={300}
              className="rounded-lg"
              alt="Generated"
            />
            <button
              onClick={() => deleteImage(img.id)}
              className="absolute top-1 right-1 bg-red-500 text-white px-3 py-2 rounded-full"
            >
              🗑
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-400">No images available</p>
      )}
    </div>
  );
}

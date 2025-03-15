"use client";
import { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import { useQueryClient } from '@tanstack/react-query';
import { toast, Toaster } from 'react-hot-toast';

import {
  useBackgrounds,
  useProducts,
  useUploadBackgroundText,
  useUploadProductText,
  useDeleteBackground,
  useDeleteProduct,
  useUploadProductImage,
} from "@/hooks/useImages";
import axiosContainer from "@/lib/axiosContainer";
import API_BASE_URL from "@/lib/config";

export default function RightSidebar({campaignId, campaignName }) {
  const queryClient = useQueryClient();
  const uploadImage = useUploadProductImage();
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

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    uploadImage.mutate({
      campaignId,
      image: file
    });
  };

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

      {/* Add upload button */}
      <div className="flex flex-col gap-2">
        <label className="text-gray-300 text-sm">Upload Custom Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className="bg-[#e87415] text-white px-3 py-2 rounded-lg text-sm text-center cursor-pointer hover:bg-[#ff9f1c]"
        >
          Upload Image
        </label>
      </div>

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
  const handleDragStart = (e, imageUrl) => {
    console.log('Drag start triggered with URL:', imageUrl);
    
    // Create a new image element for dragging using window.Image
    const img = new window.Image();
    img.src = imageUrl;
    
    // Set the drag data
    e.dataTransfer.setData('text/plain', imageUrl);
    e.dataTransfer.setDragImage(img, 0, 0);
    e.dataTransfer.effectAllowed = 'copy';
    
    console.log('Drag data set:', {
      url: imageUrl,
      effect: e.dataTransfer.effectAllowed
    });
  };

  const handlePromptClick = (prompt) => {
    if (!prompt) return;
    
    navigator.clipboard.writeText(prompt).then(() => {
      toast.success('Prompt copied to clipboard!');
    }).catch(() => {
      toast.error('Failed to copy prompt');
    });
  };

  return (
    <div className="absolute top-0 left-[-22rem] p-4 w-[20rem] h-[calc(100vh-5rem)] bg-[#232329] rounded-lg overflow-y-auto">
      <div
        className="absolute top-0 right-0 p-2 m-1 bg-[#e87415] rounded-lg cursor-pointer"
        onClick={() => setShowResults(false)}
      >
        <X size={24} className="text-white" />
      </div>
      <h3 className="text-white text-md mb-2">Generated Images</h3>
      {/* <Toaster /> */}
      {images?.length > 0 ? (
        images.map((img) => {
          const imageUrl = img.image ? `${API_BASE_URL}${img.image}` : "/charlie-loader.gif";
          const tooltipText = img.is_custom_uploaded_image 
            ? "Custom uploaded item, no prompt available" 
            : img.prompt || "No prompt available";
          
          return (
            <div key={img.id} className="relative p-3 group">
              <div className="relative">
                <img
                  src={imageUrl}
                  width={300}
                  height={300}
                  className="rounded-lg cursor-grab"
                  alt="Generated"
                  draggable="true"
                  onDragStart={(e) => handleDragStart(e, imageUrl)}
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
                {/* Tooltip */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-normal max-w-[10rem] text-center cursor-pointer z-10"
                  onClick={() => !img.is_custom_uploaded_image && handlePromptClick(img.prompt)}
                >
                  {tooltipText}
                  {!img.is_custom_uploaded_image && img.prompt && (
                    <div className="text-xs text-gray-400 mt-1">Click to copy prompt</div>
                  )}
              {/* Semi-transparent overlay on hover */}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-200 rounded-lg" />
                </div>
              </div>
              <button
                onClick={() => deleteImage(img.id)}
                className="absolute top-1 right-1 bg-red-500 text-white px-3 py-2 rounded-full"
              >
                🗑
              </button>
            </div>
          );
        })
      ) : (
        <p className="text-gray-400">No images available</p>
      )}
    </div>
  );
}

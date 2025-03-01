"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import Excalidraw
const Excalidraw = dynamic(
  () => import("@excalidraw/excalidraw").then((mod) => mod.Excalidraw),
  { ssr: false }
);

export default function CanvasPage() {
  const [showModal, setShowModal] = useState(false);
  const [campaignName, setCampaignName] = useState("");
  const [bgPrompt, setBgPrompt] = useState("");
  const [productPrompt, setProductPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Trigger modal to show when component mounts
    setShowModal(true);
  }, []);

  const handleCreateCampaign = () => {
    if (!campaignName) {
      setError("Campaign name is required");
      return;
    }
    setLoading(true);
    setError("");
    // Your API call to create campaign (mocked)
    setTimeout(() => {
      setLoading(false);
      setShowModal(false); // Hide modal after successful creation (you can redirect here)
    }, 1000);
  };

  return (
    <div className="relative h-screen w-screen">
      {/* Excalidraw Component in the background */}
      <div className="absolute inset-0 z-0">
        <Excalidraw />
      </div>

      {/* Data Entry Modal in the foreground */}
      {showModal && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl text-white font-semibold mb-4">Create Campaign</h2>
            <div className="space-y-4">
              <input
                type="text"
                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded"
                placeholder="Campaign Name"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
              />
              <textarea
                type="text"
                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded"
                placeholder="Prompt for Background Image"
                value={bgPrompt}
                onChange={(e) => setBgPrompt(e.target.value)}
              />
              <textarea
                type="text"
                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded"
                placeholder="Prompt for Product Image"
                value={productPrompt}
                onChange={(e) => setProductPrompt(e.target.value)}
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                onClick={handleCreateCampaign}
                disabled={loading}
                className="w-full py-2 mt-4 bg-blue-600 text-white rounded-lg"
              >
                {loading ? "Creating..." : "Create Campaign"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

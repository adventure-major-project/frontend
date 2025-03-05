"use client";

import { useEffect, useState } from "react";
import { useCreateCampaign } from "@/hooks/useCampaign";
import { useRouter } from "next/navigation";
import RenderCanvas from "@/app/_components/RenderCanvas";
import Link from "next/link";

export default function CanvasPage() {
  const [showModal, setShowModal] = useState(false);
  const [campaignName, setCampaignName] = useState("");
  const [description, setDescription] = useState("");
  // const [bgPrompt, setBgPrompt] = useState("");
  // const [productPrompt, setProductPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    setShowModal(true);
  }, []);

  const { mutate: createCampaign, isLoading } = useCreateCampaign();

  const handleCreateCampaign = () => {
    if (!campaignName) {
      setError("Campaign name is required");
      return;
    }
    setLoading(true);
    setError("");
    const campaignData = {
      name: campaignName,
      description: description,
    };
    createCampaign(campaignData, {
      onSuccess: (data) => {
        console.log("Campaign created:", data);
        setLoading(false);
        setShowModal(false); // Hide modal after successful creation
        router.push(`/canvas/${data?.id}`);
      },
      onError: (err) => {
        setLoading(false);
        setError("Failed to create campaign: " + err.message);
      },
    });
  };

  return (
    <div className="relative h-screen w-screen">
      {/* Excalidraw Component in the background */}
      <RenderCanvas campaign={{"name": campaignName.length > 0 ? campaignName : "Campaign Name"}} />

      {/* Data Entry Modal in the foreground */}
      {showModal && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <Link href="/profile#campaigns" className="absolute top-6 right-6 text-white px-2 py-1 bg-gray-700 rounded-lg hover:bg-gray-600">
             View Campaigns
            </Link>
            <button onClick={
              // go back
              () => router.back()
              } className="absolute top-6 left-6 text-white px-2 py-1 bg-gray-700 rounded-lg hover:bg-gray-600">
             Back
            </button>
            <h2 className="text-2xl text-white font-semibold mb-4 mt-12">Create Campaign</h2>
            <div className="space-y-4">
              <input
                type="text"
                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded"
                placeholder="Campaign Name *"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
              />
              <textarea
                type="text"
                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {/* <textarea
                type="text"
                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded"
                placeholder="Prompt for Background Image *"
                value={bgPrompt}
                onChange={(e) => setBgPrompt(e.target.value)}
              />
              <textarea
                type="text"
                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded"
                placeholder="Prompt for Product Image"
                value={productPrompt}
                onChange={(e) => setProductPrompt(e.target.value)}
              /> */}
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                onClick={handleCreateCampaign}
                disabled={loading || isLoading}
                className="w-full text-center px-6 py-2 bg-gradient-to-r from-[#e87415] to-[#ff9f1c] text-white rounded-lg flex items-center justify-center gap-2 
        hover:from-[#d76612] hover:to-[#ff8c00] transition-all duration-300 shadow-lg shadow-orange-500/30"
              >
                {(loading || isLoading) ? "Creating..." : "Create Campaign"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
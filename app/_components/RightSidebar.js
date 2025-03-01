"use client";
import Image from "next/image";
import { useState } from "react";
// cross icon from lucide-react
import { X } from "lucide-react";

export default function RightSidebar() {
  const campaignName = "Samsung Headphone Z23";
  const [bgPrompt, setBgPrompt] = useState("");
  const [productPrompt, setProductPrompt] = useState("");
  const [showBGResults, setShowBGResults] = useState(false);
    const [showProductResults, setShowProductResults] = useState(false);
    const layers = [
    { id: 1, name: "Background", visible: true },
    { id: 2, name: "Product", visible: true },
    { id: 3, name: "Logo", visible: true },
    { id: 4, name: "Text", visible: true },
  ];



  return (
    <div className="absolute top-0 right-0 p-4 flex h-[calc(100vh-5rem)] w-[20rem] bg-[#232329] bg-opacity-60 backdrop-blur-md shadow-lg rounded-lg flex-col gap-4">
      {/* Title */}
      <h2 className="text-white text-lg font-semibold">{campaignName}</h2>

      {/* Background Image Prompt */}
      <div className="flex flex-col gap-2">
        <label className="text-gray-300 text-sm">Background Image Prompt</label>
        {/* grid with 2 columns, textarea spans 2 columsn */}
        <div className="relative flex flex-col">
            <div>
                <textarea
                    value={bgPrompt}
                    onChange={(e) => setBgPrompt(e.target.value)}
                    className="w-full h-20 p-2 rounded-lg bg-black/30 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 block"
                    placeholder="A black and grey colored theme..."
                />
            </div>
            <div className="flex justify-between mt-2">
                <button
                    onClick={() => setShowBGResults(true)}
                    className="bg-gray-700 text-white px-3 py-1 rounded-lg text-sm"
                >
                    See Results
                </button>
                <button
                    className="bg-[#e87415] text-white px-3 py-1 rounded-lg text-sm"
                >
                    Generate
                </button>
            </div>
        </div>
      </div>

      {/* Product Image Prompt */}
      <div className="flex flex-col gap-2">
        <label className="text-gray-300 text-sm">Product Prompt</label>
        <div className="relative flex flex-col">
            <div>
                <textarea
                    value={productPrompt}
                    onChange={(e) => setProductPrompt(e.target.value)}
                    className="w-full h-20 p-2 rounded-lg bg-black/30 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 block"
                    placeholder="A white headphone..."
                />
            </div>
            <div className="flex justify-between mt-2">
                <button
                    onClick={() => setShowProductResults(true)}
                    className="bg-gray-700 text-white px-3 py-1 rounded-lg text-sm"
                >
                    See Results
                </button>
                <button
                    className="bg-[#e87415] text-white px-3 py-1 rounded-lg text-sm"
                >
                    Generate
                </button>
            </div>
        </div>
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


      {/* Results Component (Renders on See Results Click) */}
      {showBGResults && <Results setShowResults={setShowBGResults} result="bg" />}
        {showProductResults && <Results setShowResults={setShowProductResults} result="product" />}
    </div>
  );
}

// Dummy Results Component
function Results({setShowResults, result}) {
  return (
    <div className="absolute top-0 left-[-22rem] p-4 w-[20rem] h-[calc(100vh-5rem)] bg-[#232329] backdrop-blur-lg shadow-lg rounded-lg">
        <div className="absolute top-0 right-0 p-2 m-1 bg-[#e87415] rounded-lg cursor-pointer" onClick={() => setShowResults(false)}>
            <X size={24} className="text-white" />
        </div>
      <h3 className="text-white text-md font-semibold mb-2">Generated {result === "bg" ? "Background" : "Product"} Images</h3>
      <div className="flex flex-col gap-2 overflow-y-auto h-[calc(100vh-9rem)]">
        {/* Placeholder Images */}
        <Image src="/bg-demo.png" className="rounded-lg" width={300} height={300} />
        <Image src="/bg-demo.png" className="rounded-lg" width={300} height={300} />
        <Image src="/bg-demo.png" className="rounded-lg" width={300} height={300} />
        <Image src="/bg-demo.png" className="rounded-lg" width={300} height={300} />
      </div>
    </div>
  );
}

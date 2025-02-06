"use client"

const Introduction = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="Adventurevideo.mp4"
        autoPlay
        loop
        muted
      ></video>

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full bg-black/50 text-white px-6 text-center">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4">
          Welcome to Adventure
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-2xl">
          Engage your audience with stunning visuals.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={() => window.location.href = "#about"}
            className="px-6 py-2 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-200 hover:text-black transition"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}

export default Introduction;

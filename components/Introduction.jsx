"use client"
// import { useRef } from "react";


const Introduction = () => {
  // const videoRef = useRef(null);

  // const handleFullscreen = () => {
  //   if (videoRef.current) {
  //     if (videoRef.current.requestFullscreen) {
  //       videoRef.current.requestFullscreen();
  //     } else if (videoRef.current.mozRequestFullScreen) {
  //       videoRef.current.mozRequestFullScreen();
  //     } else if (videoRef.current.webkitRequestFullscreen) { 
  //       videoRef.current.webkitRequestFullscreen();
  //     } else if (videoRef.current.msRequestFullscreen) {
  //       videoRef.current.msRequestFullscreen();
  //     }
  //   }
  // };
  return (
    <div className="relative w-full h-screen overflow-hidden">
  
    <video
      className="absolute top-0 left-0 w-full h-full object-cover"
      src="Adventurevideo.mp4"
      autoPlay
      loop
      muted
    ></video>

   
    <div className="relative z-10 flex flex-col items-center justify-center w-full h-full bg-black/50 text-white">
      <h1 className="text-4xl md:text-7xl font-bold mb-4">Welcome to Adventure</h1>
      <p className="text-2xl md:text-2xl text-cream ">
        Engage your audience with stunning visuals.
      </p>
      <div className="mt-6 flex space-x-4">
          {/* <button
            className="px-6 py-2 bg-gray-600 text-white font-bold rounded-lg hover:bg-white hover:text-black transition"
            onClick={handleFullscreen}
          >
            View Fullscreen
          </button> */}
          <button
            onClick={() => window.location.href = "#about"}
            className="px-6 py-2 bg-blacklooking text-white font-bold rounded-lg hover:bg-cream hover:text-black transition"
          >
            Learn More
          </button>
        </div>
    </div>
  </div>
  )
}

export default Introduction

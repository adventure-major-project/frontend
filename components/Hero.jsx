"use client";
import React from "react";
import { CustomButton } from ".";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  const handleScroll = () => {};

  return (
    <div className="bg-hero-bg bg-cover bg-center w-full h-screen text-white py-16 px-6 relative hero">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center">
        
        {/* Left Content */}
        <div className="lg:w-1/2 text-center lg:text-left space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            AdVenture: <br /> AI-Powered Ad Poster Generator
          </h1>
          <p className="text-cream text-lg sm:text-xl md:text-2xl">
            Automate the design process of your Ad and posters using AI with             
            various customization options.
          </p>
          <div className="pt-6">
            <Link href="/canvas" className="w-fit font-bold hover:bg-gray-200 px-6 py-2 bg-gradient-to-r from-[#e87415] to-[#ff9f1c] text-white rounded-lg flex items-center gap-2 
        hover:from-[#d76612] hover:to-[#ff8c00] transition-all duration-300 shadow-lg shadow-orange-500/30">
              Get Started
            </Link>
          </div>
        </div>
    
        {/* Right Image Section */}
        <div className="lg:w-1/2 flex justify-center lg:justify-end relative mt-8 lg:mt-0">
          {/* First Photo */}
          <div className="relative aspect-[3/4] w-44 sm:w-52 md:w-60 lg:w-64 rounded-md overflow-hidden shadow-lg transform rotate-6 -mr-10 md:-mr-16 z-10">
            <Image src="/poster4.jpeg" alt="Photo 1" layout="fill" objectFit="cover" />
          </div>

          {/* Second Photo */}
          <div className="relative aspect-[3/4] w-44 sm:w-52 md:w-60 lg:w-64 rounded-md overflow-hidden shadow-lg transform -rotate-3 -mr-6 md:-mr-12 z-20">
            <Image src="/poster5.jpg" alt="Photo 2" layout="fill" objectFit="cover" />
          </div>

          {/* Third Photo */}
          <div className="relative aspect-[3/4] w-44 sm:w-52 md:w-60 lg:w-64 rounded-md overflow-hidden shadow-lg transform -rotate-6 z-30">
            <Image src="/poster6.jpg" alt="Photo 3" layout="fill" objectFit="cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

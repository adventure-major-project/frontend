"use client";
import React from "react";
import { CustomButton } from ".";
import Image from "next/image";

const Hero = () => {
  const handleScroll = () => {};
  return (
    // <div className="hero bg-black bg-hero-bg bg-cover bg-center h-screen w-full">
    //   <div className="flex-1 pt-36 padding-x ">
    //     <h1 className="hero__title_whitecolor text-cream">
    //       Designing & developing the future
    //     </h1>
    //     <p className="hero__subtitle text-cream">
    //       {" "}
    //       We are a team of designers and developers who are passionate about
    //       creating innovative and user-friendly products.
    //     </p>
    //     <CustomButton
    //       title="Get Started"
    //       containerStyles=" mt-10"
    //       handleClick={handleScroll}
    //     />
    //   </div>
    //   <div className="lg:w-1/2 mt-10 lg:mt-0 flex flex-wrap justify-center lg:justify-end space-x-4">
    //       <div className="relative w-72 h-40 shadow-lg rounded-md overflow-hidden">
    //         <Image
    //           src="/hero1.jpg"
    //           alt="Business Card 1"
    //           layout="fill"
    //           objectFit="cover"
    //         />
    //       </div>
    //       <div className="relative w-72 h-40 shadow-lg rounded-md overflow-hidden -mt-10">
    //         <Image
    //           src="/hero2.jpg"
    //           alt="Business Card 2"
    //           layout="fill"
    //           objectFit="cover"
    //         />
    //       </div>
    //       <div className="relative w-72 h-40 shadow-lg rounded-md overflow-hidden">
    //         <Image
    //           src="/hero3.jpg"
    //           alt="Business Card 3"
    //           layout="fill"
    //           objectFit="cover"
    //         />
    //       </div>
    //     </div>
    // </div>

    <div className="bg-hero-bg bg-cover bg-center w-full h-screen text-white py-16 px-6 relative hero">
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center">
      
      <div className="lg:w-1/2 text-center lg:text-left space-y-6">
        <h1 className="hero__title leading-tight">
        AdVenture: <br /> AI-Powered Ad Poster Generator
        </h1>
        <p className="text-cream hero__subtitle">
        Automate the design process of your Ad and posters using AI with             
        various customization options.
        </p>
        <div className="pt-6">
          <button className="bg-cream text-blacklooking font-bold py-3 px-6 rounded-md shadow-lg hover:bg-gray-200">
            Get Started
          </button>
        </div>
      </div>
  
      <div className="lg:w-1/2 flex justify-center lg:justify-end relative mt-8 lg:mt-0">
          {/* First Photo */}
          <div className="relative  aspect-[3/4] w-60 rounded-md overflow-hidden shadow-lg transform rotate-6 -mr-16 z-10">
            <Image
              src="/poster4.jpeg" 
              alt="Photo 1"
              layout="fill"
              objectFit="cover"
            />
          </div>

          {/* Second Photo */}
          <div className="relative aspect-[3/4] w-60 rounded-md overflow-hidden shadow-lg transform -rotate-3 -mr-12 z-20">
            <Image
              src="/poster5.jpg" 
              alt="Photo 2"
              layout="fill"
              objectFit="fill"
            />
          </div>

          {/* Third Photo
          <div className="relative aspect-[3/4] w-60 rounded-md overflow-hidden shadow-lg transform rotate-3 -mr-8 z-30">
            <Image
              src="/hero3.jpg" 
              alt="Photo 3"
              layout="fill"
              objectFit="cover"
            />
          </div> */}

          {/* Fourth Photo */}
          <div className="relative aspect-[3/4] w-60 rounded-md overflow-hidden shadow-lg transform -rotate-6 z-40">
            <Image
              src="/poster6.jpg" 
              alt="Photo 4"
              layout="fill"
              objectFit="fill"
            />
          </div>
        </div>

      
    </div>
  </div>
  );
};

export default Hero;

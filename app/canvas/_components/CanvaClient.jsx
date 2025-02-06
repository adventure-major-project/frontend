"use client"
import dynamic from "next/dynamic";

export const CanvasComponent = dynamic(() => import('./Canvas.jsx'), { 
    ssr: false,
    loading: () => <p>Loading...</p>,
  });
  

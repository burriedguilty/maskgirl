"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import IdolCard1 from "../components/IdolCard1";
import CloudMove from "../components/CloudMove";

export default function Home() {
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  
  // Simple performance detection on client side
  useEffect(() => {
    // Check if device is likely low-powered (mobile or older device)
    const checkPerformance = () => {
      // Check if it's a mobile device
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      
      // Check if the device has limited memory or CPU cores
      const isLowPower = typeof navigator.hardwareConcurrency !== 'undefined' && navigator.hardwareConcurrency < 4;
      
      setIsLowPerformance(isMobile || isLowPower);
    };
    
    checkPerformance();
  }, []);

  return (
    <div className="h-screen flex flex-col overflow-hidden relative">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/bg.webp" 
          alt="Background" 
          fill
          priority
          quality={90}
          className="object-cover"
        />
      </div>
      {/* Moving clouds */}
      <CloudMove count={isLowPerformance ? 4 : 8} performanceMode={isLowPerformance} />
      <div className="relative z-10 flex flex-col flex-1">
        {/* Navbar */}
        <Navbar />
        
        {/* Main content */}
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-6xl">
            <IdolCard1 />
          </div>
        </main>
      </div>
    </div>
  );
}

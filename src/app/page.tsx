"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import IdolCard1 from "../components/IdolCard1";
import CloudMove from "../components/CloudMove";
import Dock from "../components/dock";
import GalleryPage from "../components/GalleryPage";
import AnimatedEntry from "../components/AnimatedEntry";

export default function Home() {
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showDock, setShowDock] = useState(false);
  
  // Effect to show dock after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDock(true);
    }, 2200); // Show dock after main content has appeared (IdolCard1 animation + extra delay)
    
    return () => clearTimeout(timer);
  }, []);
  
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
      
      {/* Dock - positioned absolutely at the bottom with animation */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex justify-center pointer-events-none">
        <AnimatedEntry 
          direction="up" 
          delay={0.3} 
          duration={1.2} 
          distance={40}
          className="pointer-events-auto"
          showChildren={showDock}
          childrenDelay={0.2}
        >
          <Dock 
            items={[
              {
                icon: <div className="w-8 h-8 bg-[#e23090]/30 rounded-lg flex items-center justify-center border border-pink-400/50">
                  <Image src="/xcom.svg" alt="X" width={20} height={20} className="w-5 h-5 filter brightness-0 invert opacity-80" />
                </div>,
                label: "X",
                onClick: () => window.open('https://x.com/itsmaskgirl', '_blank'),
              },
              {
                icon: <div className="w-8 h-8 bg-[#f745a7]/30 rounded-lg flex items-center justify-center border border-pink-400/50">
                  <Image src="/gallery.svg" alt="Gallery" width={20} height={20} className="w-5 h-5 filter brightness-0 invert opacity-80" />
                </div>,
                label: "Gallery",
                onClick: () => setShowGallery(true),
              },
              {
                icon: <div className="w-8 h-8 bg-[#ff6eb4]/30 rounded-lg flex items-center justify-center border border-pink-400/50">
                  <Image src="/buy.svg" alt="Buy" width={20} height={20} className="w-5 h-5 filter brightness-0 invert opacity-80" />
                </div>,
                label: "Buy",
                onClick: () => console.log("Buy clicked"),
              },
            ]}
            className="bg-gradient-to-br from-[#e23090]/40 to-[#f745a7]/40 backdrop-blur-md border-t border-pink-400/20"
            magnification={60}
            baseItemSize={40}
            panelHeight={56}
          />
        </AnimatedEntry>
      </div>

      {/* Gallery Page */}
      <GalleryPage isVisible={showGallery} onClose={() => setShowGallery(false)} />
    </div>
  );
}

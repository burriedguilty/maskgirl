"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Glass from './Glass';
import AnimatedEntry from './AnimatedEntry';

const Navbar = () => {
  // State untuk mengontrol animasi konten
  const [showContent, setShowContent] = useState(false);
  
  // Effect untuk menunda animasi konten
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500); // Delay 500ms setelah container muncul
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="mx-[3%] mt-[3%]">
      <AnimatedEntry direction="up" delay={0.1} duration={0.7} distance={50} childrenDelay={0.4} showChildren={showContent}>
        <div className="relative">
          {/* Pink background behind glass */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#e23090] to-[#f745a7] rounded-[18px] z-0"></div>
          
          <Glass className="w-full mb-4 sticky top-4 z-50 relative">
            <nav className="flex justify-between items-center px-6 py-3">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-10 h-10 flex items-center justify-center">
                <Image 
                  src="/logo.png" 
                  alt="Logo" 
                  width={40} 
                  height={40} 
                  className="object-contain" 
                />
              </div>
            </div>
            
            {/* Glass buttons */}
            <div className="flex gap-4">
              <Glass className="overflow-hidden">
                <button className="px-4 py-2 text-white hover:text-pink-100 transition-colors">
                  Button 1
                </button>
              </Glass>
              <Glass className="overflow-hidden">
                <button className="px-4 py-2 text-white hover:text-pink-100 transition-colors flex items-center justify-center">
                  <img src="/pumpfun.svg" alt="Pump Fun" width="28" height="28" />
                </button>
              </Glass>
            </div>
          </nav>
        </Glass>
      </div>
      </AnimatedEntry>
    </div>
  );
};

export default Navbar;

"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Glass from './Glass';
import DebugContainer from './DebugContainer';
import AnimatedEntry from './AnimatedEntry';

const IdolCard1: React.FC = () => {
  // State to track current polaroid
  const [currentPolaroid, setCurrentPolaroid] = useState(0);
  
  // Debug mode state - can be toggled as needed
  const [debugMode] = useState(false);
  
  // Toast notification state
  const [showToast, setShowToast] = useState(false);
  // State untuk melacak posisi klik
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  
  // Effect untuk menghilangkan toast setelah beberapa detik
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  // Function to navigate between polaroids
  const navigatePolaroid = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentPolaroid((prev) => (prev === 0 ? 5 : prev - 1));
    } else {
      setCurrentPolaroid((prev) => (prev === 5 ? 0 : prev + 1));
    }
  };

  // Toast notification component dengan style Glass
  const renderToast = () => {
    if (!showToast) return null;
    
    // Posisi toast berdasarkan posisi klik
    const toastStyle = {
      position: 'fixed',
      left: `${clickPosition.x}px`,
      top: `${clickPosition.y - 40}px`, // Sedikit di atas posisi klik
      zIndex: 9999,
      transform: 'translate(-50%, -100%)', // Posisikan di atas kursor
    } as React.CSSProperties;
    
    return (
      <div style={toastStyle} className="animate-fade-in">
        <Glass className="px-3 py-1">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
              <path d="M20 6L9 17l-5-5"></path>
            </svg>
            <span className="text-white text-xs">Copied!</span>
          </div>
        </Glass>
      </div>
    );
  };
  
  // State untuk mengontrol animasi konten
  const [showContent, setShowContent] = useState(false);
  
  // Effect untuk menunda animasi konten
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 600); // Delay 600ms setelah container muncul
    
    return () => clearTimeout(timer);
  }, []);
  
  const renderContent = () => {
    return (
      <AnimatedEntry direction="down" delay={0.2} duration={0.8} distance={100} childrenDelay={0.6} showChildren={showContent}>
        <div 
          className="flex flex-col md:flex-row w-full max-w-4xl mx-auto gap-4 md:gap-8 px-4 sm:px-8 md:px-12 py-4 md:py-6 rounded-xl bg-gradient-to-br from-[#e23090] to-[#f745a7] shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.08)] border border-white/20 relative overflow-visible"
          style={{
            boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(255,255,255,0.05)'
          }}
        >
          {/* Subtle light effect at top-right corner */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-20 rounded-full blur-2xl -mr-10 -mt-10"></div>
          {/* Subtle shadow at bottom-left corner */}
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-black opacity-20 rounded-full blur-2xl -ml-10 -mb-10"></div>
          {/* Heart image at bottom-right corner with subtle rotation */}
          <div className="absolute bottom-0 right-0 -mb-16 -mr-16 z-60 animate-sway">
            <Image src="/heart.webp" alt="Heart" width={160} height={160} className="w-40 h-auto" />
          </div>
          {/* Spark image at top-left corner with floating animation */}
          <div className="absolute top-0 left-0 -mt-16 -ml-16 z-10 animate-float">
            <Image src="/spark.webp" alt="Spark" width={160} height={160} className="w-40 h-auto" />
          </div>
          
          {/* Animation keyframes */}
          <style jsx>{`
            @keyframes float {
              0% {
                transform: translateY(0px);
              }
              50% {
                transform: translateY(-10px);
              }
              100% {
                transform: translateY(0px);
              }
            }
            .animate-float {
              animation: float 4s ease-in-out infinite;
            }
            
            @keyframes sway {
              0% {
                transform: rotate(-5deg);
              }
              50% {
                transform: rotate(5deg);
              }
              100% {
                transform: rotate(-5deg);
              }
            }
            .animate-sway {
              animation: sway 6s ease-in-out infinite;
              transform-origin: center bottom;
            }
          `}</style>
          {/* Left section with three areas */}
          <div className="flex-1 flex flex-col justify-between px-6 py-4 gap-4">
            {/* Area 1: Description at top */}
            <div className="space-y-2 sm:space-y-3">
              <div className="max-w-[200px] sm:max-w-[250px] md:max-w-[300px]">
                <Image src="/logoa.png" alt="Logo" width={300} height={150} className="w-full h-auto" />
              </div>
              <p className="text-sm sm:text-base md:text-lg relative">
                <span className="absolute -top-[1px] -right-[1px] text-pink-300 opacity-70">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Vivamus lacinia odio vitae vestibulum.
                </span>
                <span className="absolute -bottom-[1px] -left-[1px] text-pink-900 opacity-50">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Vivamus lacinia odio vitae vestibulum.
                </span>
                <span className="relative text-white">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Vivamus lacinia odio vitae vestibulum.
                </span>
              </p>
              <div className="flex gap-2 sm:gap-3">
                <Glass className="inline-block px-1.5 sm:px-2 py-0">
                  <span className="text-white text-xs sm:text-sm">Mask</span>
                </Glass>
                <Glass className="inline-block px-1.5 sm:px-2 py-0">
                  <span className="text-white text-xs sm:text-sm">Girl</span>
                </Glass>
              </div>
            </div>
            
            {/* Area 2: Search bar style */}
            <div className="h-12 flex items-center justify-center">
              <div 
                className="w-full h-10 sm:h-12 bg-white bg-opacity-80 rounded-full grid grid-cols-[auto_1fr_auto] items-center gap-2 sm:gap-3 px-3 sm:px-4 border border-pink-200 relative overflow-hidden cursor-pointer"
                style={{
                  boxShadow: '2px -2px 12px rgba(255, 102, 178, 0.2), 0 4px 8px rgba(0, 0, 0, 0.1), inset -1px 1px 4px rgba(255, 102, 178, 0.15)'
                }}
                onClick={(e) => {
                  // Simpan posisi klik
                  setClickPosition({ x: e.clientX, y: e.clientY });
                  
                  // Alternatif untuk clipboard API yang lebih aman
                  const contractAddress = '0x1234567890abcdef1234567890abcdef12345678';
                  
                  // Membuat elemen input sementara
                  const tempInput = document.createElement('input');
                  tempInput.value = contractAddress;
                  document.body.appendChild(tempInput);
                  
                  // Pilih teks dan salin
                  tempInput.select();
                  try {
                    document.execCommand('copy');
                    setShowToast(true); // Tampilkan toast notification
                  } catch (err) {
                    console.error('Failed to copy:', err);
                  }
                  
                  // Hapus elemen sementara
                  document.body.removeChild(tempInput);
                }}
              >
                {/* Subtle inner shadow effect at top right */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-radial from-white/30 to-transparent opacity-60 rounded-full -mr-8 -mt-16"></div>
                
                {/* Left element */}
                <div className="flex-shrink-0">
                  <Image 
                    src="/pumpfun.svg" 
                    alt="Search" 
                    width={20} 
                    height={20} 
                    style={{ filter: 'invert(45%) sepia(85%) saturate(1752%) hue-rotate(308deg) brightness(101%) contrast(101%)' }} 
                    className="w-4 h-4 sm:w-5 sm:h-5 pointer-events-none"
                  />
                </div>
                
                {/* Center element */}
                <div className="flex justify-center overflow-hidden pointer-events-none">
                  <span 
                    className="text-pink-600 font-medium hover:text-pink-800 transition-colors truncate"
                    style={{
                      fontSize: 'clamp(0.6rem, 1.8vw, 0.875rem)',
                    }}
                  >
                    0x1234567890abcdef1234567890abcdef12345678
                  </span>
                </div>
                
                {/* Right element */}
                <div className="flex-shrink-0 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 sm:w-4 sm:h-4">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Area 3: Music section at bottom */}
            <div className="mt-2 sm:mt-4">
              <Glass className="p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <span className="font-bold text-white text-sm sm:text-base">Now Playing</span>
                  <span className="text-xs text-white/80">3:45</span>
                </div>
                <div className="h-1.5 sm:h-2 bg-white/20 rounded-full mb-2 sm:mb-3">
                  <div className="h-full w-2/3 bg-white/60 rounded-full"></div>
                </div>
                <div className="flex justify-between items-center">
                  <button className="p-1 sm:p-2 text-white hover:text-white/80 transition-colors">
                    <Image src="/prev.svg" alt="Previous" width={20} height={20} className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                  <button className="p-1 sm:p-2 text-white hover:text-white/80 transition-colors">
                    <Image src="/play.svg" alt="Play" width={28} height={28} className="w-7 h-7 sm:w-8 sm:h-8" />
                  </button>
                  <button className="p-1 sm:p-2 text-white hover:text-white/80 transition-colors">
                    <Image src="/next.svg" alt="Next" width={20} height={20} className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>
              </Glass>
            </div>
          </div>
          
          {/* Right section with polaroid stack */}
          <div className="flex-1 flex justify-center items-center px-2 sm:px-4 md:px-6 relative mt-6 md:mt-0">
            {/* Navigation buttons */}
            <div className="absolute left-0 sm:left-2 md:left-4 z-60">
              <Glass className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full p-0 bg-gradient-to-br from-[#e23090] to-[#f745a7]">
                <button 
                  onClick={() => navigatePolaroid('prev')}
                  className="w-full h-full flex items-center justify-center text-white"
                >
                  <span className="inline-flex items-center justify-center text-sm sm:text-lg">◀</span>
                </button>
              </Glass>
            </div>
            
            <div className="absolute right-0 sm:right-2 md:right-4 z-60">
              <Glass className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full p-0 bg-gradient-to-br from-[#e23090] to-[#f745a7]">
                <button 
                  onClick={() => navigatePolaroid('next')}
                  className="w-full h-full flex items-center justify-center text-white"
                >
                  <span className="inline-flex items-center justify-center text-sm sm:text-lg">▶</span>
                </button>
              </Glass>
            </div>
            
            {/* Polaroid fan arrangement */}
            <div className="relative h-72 sm:h-80 md:h-96 w-64 sm:w-72 md:w-80">
              {/* Polaroid 1 */}
              <div 
                className={`absolute bg-white p-3 sm:p-4 pb-8 sm:pb-12 shadow-lg transform transition-all duration-300 ${
                  currentPolaroid === 0 
                    ? 'z-50 rotate-0 scale-100 saturate-100 top-0 left-0' 
                    : 'z-10 -rotate-15 scale-95 opacity-100 saturate-[0.6] top-4 -left-8'
                }`}
              >
                <div className="w-full h-full sm:w-56 md:w-64 sm:h-72 md:h-80 mb-2 sm:mb-4 relative overflow-hidden">
                  <Image 
                    src="/polaroid1.jpg" 
                    alt="Idol Photo 1" 
                    width={640}
                    height={800}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Polaroid 2 */}
              <div 
                className={`absolute bg-white p-3 sm:p-4 pb-8 sm:pb-12 shadow-lg transform transition-all duration-300 ${
                  currentPolaroid === 1 
                    ? 'z-50 rotate-0 scale-100 saturate-100 top-0 left-0' 
                    : 'z-20 -rotate-8 scale-95 opacity-100 saturate-[0.6] top-2 -left-4'
                }`}
              >
                <div className="w-full h-full sm:w-56 md:w-64 sm:h-72 md:h-80 mb-2 sm:mb-4 relative overflow-hidden">
                  <Image 
                    src="/polaroid2.jpg" 
                    alt="Idol Photo 2" 
                    width={640}
                    height={800}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Polaroid 3 */}
              <div 
                className={`absolute bg-white p-3 sm:p-4 pb-8 sm:pb-12 shadow-lg transform transition-all duration-300 ${
                  currentPolaroid === 2 
                    ? 'z-50 rotate-0 scale-100 saturate-100 top-0 left-0' 
                    : 'z-30 rotate-0 scale-95 opacity-100 saturate-[0.6] top-0 left-0'
                }`}
              >
                <div className="w-full h-full sm:w-56 md:w-64 sm:h-72 md:h-80 mb-2 sm:mb-4 relative overflow-hidden">
                  <Image 
                    src="/polaroid3.jpg" 
                    alt="Idol Photo 3" 
                    width={640}
                    height={800}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Polaroid 4 */}
              <div 
                className={`absolute bg-white p-3 sm:p-4 pb-8 sm:pb-12 shadow-lg transform transition-all duration-300 ${
                  currentPolaroid === 3 
                    ? 'z-50 rotate-0 scale-100 saturate-100 top-0 left-0' 
                    : 'z-20 rotate-8 scale-95 opacity-100 saturate-[0.6] top-2 -right-4'
                }`}
              >
                <div className="w-full h-full sm:w-56 md:w-64 sm:h-72 md:h-80 mb-2 sm:mb-4 relative overflow-hidden">
                  <Image 
                    src="/polaroid4.jpg" 
                    alt="Idol Photo 4" 
                    width={640}
                    height={800}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Polaroid 5 */}
              <div 
                className={`absolute bg-white p-3 sm:p-4 pb-8 sm:pb-12 shadow-lg transform transition-all duration-300 ${
                  currentPolaroid === 4 
                    ? 'z-50 rotate-0 scale-100 saturate-100 top-0 left-0' 
                    : 'z-10 rotate-15 scale-95 opacity-100 saturate-[0.6] top-4 -right-8'
                }`}
              >
                <div className="w-full h-full sm:w-56 md:w-64 sm:h-72 md:h-80 mb-2 sm:mb-4 relative overflow-hidden">
                  <Image 
                    src="/polaroid5.jpg" 
                    alt="Idol Photo 5" 
                    width={640}
                    height={800}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Polaroid 6 */}
              <div 
                className={`absolute bg-white p-3 sm:p-4 pb-8 sm:pb-12 shadow-lg transform transition-all duration-300 ${
                  currentPolaroid === 5 
                    ? 'z-50 rotate-0 scale-100 saturate-100 top-0 left-0' 
                    : 'z-0 rotate-[20deg] scale-95 opacity-100 saturate-[0.6] top-6 -right-10'
                }`}
              >
                <div className="w-full h-full sm:w-56 md:w-64 sm:h-72 md:h-80 mb-2 sm:mb-4 relative overflow-hidden">
                  <Image 
                    src="/polaroid6.jpg" 
                    alt="Idol Photo 6" 
                    width={640}
                    height={800}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedEntry>
    );
  };
  
  return (
    <>
      {debugMode ? (
        <DebugContainer type="container" label="IdolCard1">
          {renderContent()}
        </DebugContainer>
      ) : renderContent()}
      {renderToast()}
      
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translate(-50%, -90%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -100%);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default IdolCard1;

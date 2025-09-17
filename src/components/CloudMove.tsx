"use client";

import React, { useMemo, useState, useEffect } from 'react';
import Image from 'next/image';

interface CloudProps {
  count?: number;
  performanceMode?: boolean;
}

interface CloudPosition {
  top: number;
  initialLeft: number;
  delay: number;
  duration: number;
  size: number;
}

const CloudMove: React.FC<CloudProps> = React.memo(({ count = 5, performanceMode = false }) => {
  // State untuk mengontrol visibilitas awan
  const [showClouds, setShowClouds] = useState(false);
  
  // Effect untuk menunda munculnya awan setelah load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowClouds(true);
    }, 100); // Dipercepat menjadi 300ms
    
    return () => clearTimeout(timer);
  }, []);
  
  // Generate random initial positions and animation settings
  const cloudData = useMemo<CloudPosition[]>(() => {
    const cloudCount = performanceMode ? Math.min(count, 4) : Math.min(count, 8);
    
    return Array.from({ length: cloudCount }, (_, i) => {
      // Bagi area vertikal menjadi 7 bagian (100vh / 7)
      // Tentukan area mana yang akan digunakan untuk awan ini
      const areaIndex = i % 7; // Memastikan setiap awan berada di area yang berbeda
      const areaStart = areaIndex * (100 / 7);
      const areaEnd = (areaIndex + 1) * (100 / 7);
      
      // Posisi acak dalam area yang ditentukan
      const topPosition = areaStart + Math.random() * (areaEnd - areaStart);
      
      // Ukuran acak antara 400-800px
      const cloudSize = Math.floor(Math.random() * 400) + 400;
      
      // Untuk initial load, posisikan beberapa awan di tengah website
      // Sisanya di luar tepi kanan untuk animasi normal
      const isInitialCenterCloud = i < 3; // 3 awan pertama di tengah saat initial load
      const initialLeftPosition = isInitialCenterCloud 
        ? Math.random() * 60 + 20 // 20-80% (di tengah layar)
        : Math.random() * 20 + 100; // 100-120% (di luar tepi kanan)
      
      return {
        top: topPosition, // Posisi vertikal dalam area yang ditentukan
        initialLeft: initialLeftPosition,
        delay: isInitialCenterCloud ? 0 : (i * 5 + Math.random() * 10), // Awan tengah tanpa delay
        duration: performanceMode ? 320 - i * 20 : 280 - i * 15, // Durasi lebih lama untuk gerakan dari kanan ke kiri
        size: cloudSize, // Ukuran awan 400-800px
      };
    });
  }, [count, performanceMode]);
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {showClouds && cloudData.map((cloud, i) => (
        <div 
          key={i}
          className={`cloud cloud-${i % 4}`}
          style={{
            animationDelay: `${cloud.delay}s`,
            animationDuration: `${cloud.duration}s`,
            '--cloud-top': `${cloud.top}%`,
            '--initial-left': `${cloud.initialLeft}%`,
            '--cloud-size': `${cloud.size}px`,
          }}
        >
          <Image 
            src="/cloud.webp" 
            alt=""
            width={650}
            height={400}
            priority={i < 2}
            className="w-full h-auto"
            style={{ objectFit: 'contain' }}
          />
        </div>
      ))}
      
      <style jsx>{`
        .cloud {
          position: absolute;
          top: var(--cloud-top);
          left: var(--initial-left);
          opacity: 0;
          animation: moveAcrossFromRandom linear infinite;
          animation-fill-mode: both;
          width: var(--cloud-size);
        }
        
        .cloud img {
          filter: drop-shadow(0 4px 8px rgba(0,0,0,0.05));
        }
        
        .cloud-0 {
          z-index: 1;
          filter: blur(${performanceMode ? '0' : '1px'});
        }
        
        .cloud-1 {
          z-index: 2;
        }
        
        .cloud-2 {
          z-index: 1;
          filter: blur(${performanceMode ? '0' : '1px'});
        }
        
        .cloud-3 {
          z-index: 2;
        }
        
        /* Animation yang hanya bergerak dari kanan ke kiri, lalu respawn */
        @keyframes moveAcrossFromRandom {
          /* Tahap 1: Muncul di posisi awal dengan fade in */
          0% {
            left: var(--initial-left);
            opacity: 0;
            transform: translateY(5px);
          }
          2% {
            opacity: 0.8;
            transform: translateY(0);
          }
          /* Tahap 2: Bergerak dari posisi awal ke kiri sampai keluar layar */
          90% {
            left: -60%;
            opacity: 0.8;
          }
          /* Tahap 3: Fade out saat keluar layar */
          100% {
            left: -70%;
            opacity: 0;
          }
          /* Tidak ada tahap kembali ke kanan - animasi akan restart dari awal */
        }
      `}</style>
    </div>
  );
});

CloudMove.displayName = 'CloudMove';

export default CloudMove;
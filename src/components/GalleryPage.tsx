'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// Tipe untuk item gallery
type GalleryItem = {
  id: number;
  src: string;
  width: number;
  height: number;
  alt: string;
};

// Data gallery menggunakan file 1-8.jpg dari folder gallery
const galleryItems: GalleryItem[] = [
  { id: 1, src: '/gallery/1.jpg', width: 800, height: 1000, alt: 'Mask Girl Gallery Image' },
  { id: 2, src: '/gallery/2.jpg', width: 1200, height: 800, alt: 'Mask Girl Gallery Image' },
  { id: 3, src: '/gallery/3.jpg', width: 900, height: 1100, alt: 'Mask Girl Gallery Image' },
  { id: 4, src: '/gallery/4.jpg', width: 1000, height: 1000, alt: 'Mask Girl Gallery Image' },
  { id: 5, src: '/gallery/5.jpg', width: 800, height: 1200, alt: 'Mask Girl Gallery Image' },
  { id: 6, src: '/gallery/6.jpg', width: 1100, height: 900, alt: 'Mask Girl Gallery Image' },
  { id: 7, src: '/gallery/7.jpg', width: 900, height: 900, alt: 'Mask Girl Gallery Image' },
  { id: 8, src: '/gallery/8.jpg', width: 1200, height: 1000, alt: 'Mask Girl Gallery Image' },
];

interface GalleryPageProps {
  isVisible: boolean;
  onClose: () => void;
}

const GalleryPage: React.FC<GalleryPageProps> = ({ isVisible, onClose }) => {
  const [columns, setColumns] = useState(3);
  // Removed image selection and navigation functionality

  // Mengatur jumlah kolom berdasarkan lebar layar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setColumns(1);
      } else if (window.innerWidth < 1024) {
        setColumns(2);
      } else {
        setColumns(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Membagi item gallery ke dalam kolom untuk layout masonry
  const getColumnItems = () => {
    const columnItems: GalleryItem[][] = Array.from({ length: columns }, () => []);
    
    galleryItems.forEach((item, index) => {
      columnItems[index % columns].push(item);
    });
    
    return columnItems;
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-br from-[#e23090]/95 to-[#f745a7]/95 overflow-y-auto rounded-t-3xl backdrop-blur-sm border-t border-white/20"
          style={{ height: '85vh', boxShadow: '0 -10px 30px rgba(0,0,0,0.25)' }}
        >
          {/* Sticky header with handle for dragging/closing - entire area clickable */}
          <div 
            className="sticky top-0 z-10 pt-3 pb-4 bg-gradient-to-b from-[#e23090]/95 to-[#e23090]/80 hover:from-[#e23090] hover:to-[#e23090]/90 backdrop-blur-sm rounded-t-3xl border-b border-white/10 shadow-md cursor-pointer transition-colors group" 
            style={{ boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
            onClick={onClose}
            aria-label="Close gallery"
          >
            <div className="flex justify-center">
              <div 
                className="w-16 h-1.5 rounded-full bg-white/40 group-hover:bg-white/60 transition-all group-hover:w-20 group-hover:h-2 shadow-sm pointer-events-none animate-pulse"
                style={{ boxShadow: '0 1px 3px rgba(255,255,255,0.1)', animationDuration: '2s' }}
              ></div>
            </div>
          </div>
          
          {/* Safe area spacer */}
          <div className="h-4"></div>

          {/* Masonry Gallery */}
          <div className="px-4 pb-28 pt-4">
            <div className="flex gap-4 rounded-2xl overflow-hidden p-3 bg-white/5 backdrop-blur-sm border border-white/10" style={{ boxShadow: 'inset 0 0 20px rgba(0,0,0,0.05)' }}>
              {getColumnItems().map((column, columnIndex) => (
                <div key={columnIndex} className="flex-1 flex flex-col gap-5">
                  {column.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: item.id * 0.05 }}
                      className="relative overflow-hidden rounded-xl shadow-lg bg-white p-3 border border-white/30"
                      style={{ boxShadow: '0 4px 15px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255,255,255,0.15)' }}
                    >
                      <div className="relative aspect-auto overflow-hidden rounded-lg group">
                        <Image
                          src={item.src}
                          alt={item.alt}
                          width={item.width}
                          height={item.height}
                          className="w-full h-auto object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-105"
                          priority={item.id <= 4} // Prioritas loading untuk 4 gambar pertama
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Image Viewer Modal placeholder - actual modal moved outside */}

          {/* Decorative elements removed to prevent visual artifacts */}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GalleryPage;

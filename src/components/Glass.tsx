"use client";

import React, { ReactNode, useState } from 'react';

interface GlassProps {
  children: ReactNode;
  className?: string;
}

const Glass: React.FC<GlassProps> = ({ children, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      className={`
        relative
        bg-white/[0.08]
        backdrop-blur-[40px]
        rounded-[18px]
        shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.08)]
        border
        ${isHovered 
          ? 'bg-white/[0.12] border-white/[0.35] shadow-[0_12px_40px_rgba(0,0,0,0.15),0_4px_12px_rgba(0,0,0,0.1),0_0_20px_rgba(255,255,255,0.15)]' 
          : 'border-white/[0.2]'
        }
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        boxShadow: isHovered 
          ? '0 12px 40px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(255,255,255,0.08), 0 0 20px rgba(255,255,255,0.15)'
          : '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(255,255,255,0.05)'
      }}
    >
      {/* Gradient border effect */}
      <div 
        className={`
          absolute inset-0 rounded-[18px] -z-10
          bg-gradient-to-br
          ${isHovered 
            ? 'from-white/[0.5] via-white/[0.1] to-white/[0.45]' 
            : 'from-white/[0.4] via-white/[0.05] to-white/[0.35]'
          }
        `}
        style={{
          padding: '0.5px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude'
        }}
      />
      
      {/* Top highlight */}
      <div 
        className={`
          absolute top-0 left-0 right-0 h-[50%] 
          bg-gradient-to-b rounded-t-[18px] pointer-events-none
          ${isHovered 
            ? 'from-white/[0.12] to-transparent' 
            : 'from-white/[0.08] to-transparent'
          }
        `} 
      />
      
      {/* Inner glow layer */}
      <div 
        className={`
          absolute inset-[2px] rounded-[16px] pointer-events-none
          bg-gradient-to-b
          ${isHovered 
            ? 'from-white/[0.12] via-white/[0.03] to-white/[0.06]' 
            : 'from-white/[0.1] via-white/[0.02] to-white/[0.05]'
          }
        `}
      />
      
      {/* Content wrapper */}
      <div className="relative z-10 p-[5px]">
        {children}
      </div>
    </div>
  );
};

export default Glass;
"use client";

import React, { ReactNode } from 'react';

interface DebugContainerProps {
  children: ReactNode;
  type?: 'container' | 'section' | 'text' | 'media' | 'control' | 'custom';
  customColor?: string;
  className?: string;
  label?: string;
}

const DebugContainer: React.FC<DebugContainerProps> = ({ 
  children, 
  type = 'container', 
  customColor,
  className = '',
  label
}) => {
  // Debug border colors for different element types
  const borderColors = {
    container: 'border-blue-500',
    section: 'border-green-500',
    text: 'border-yellow-500',
    media: 'border-orange-500',
    control: 'border-teal-500',
    custom: customColor || 'border-purple-500'
  };

  const borderColor = borderColors[type];
  
  return (
    <div 
      className={`relative border-2 border-dashed ${borderColor} ${className}`}
      data-debug-type={type}
    >
      {label && (
        <div className={`absolute -top-3 left-2 bg-white px-1 text-xs text-${borderColor.replace('border-', '')}`}>
          {label}
        </div>
      )}
      {children}
    </div>
  );
};

export default DebugContainer;

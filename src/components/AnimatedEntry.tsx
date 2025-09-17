"use client";

import React, { useState, useEffect, ReactNode } from 'react';

interface AnimatedEntryProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  childrenDelay?: number; // Delay untuk animasi children
  showChildren?: boolean; // Kontrol kapan children muncul
}

const AnimatedEntry: React.FC<AnimatedEntryProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 50,
  className = '',
  childrenDelay = 0.3,
  showChildren = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [childrenVisible, setChildrenVisible] = useState(false);

  useEffect(() => {
    // Animasi container
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay * 1000);

    // Animasi children
    const childrenTimer = setTimeout(() => {
      setChildrenVisible(showChildren);
    }, (delay + childrenDelay) * 1000);

    return () => {
      clearTimeout(timer);
      clearTimeout(childrenTimer);
    };
  }, [delay, childrenDelay, showChildren]);

  // Menentukan transform awal berdasarkan direction
  const getInitialTransform = () => {
    switch (direction) {
      case 'up': return `translateY(${distance}px)`;
      case 'down': return `translateY(-${distance}px)`;
      case 'left': return `translateX(${distance}px)`;
      case 'right': return `translateX(-${distance}px)`;
      default: return `translateY(${distance}px)`;
    }
  };

  return (
    <div
      className={`transition-all ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0, 0)' : getInitialTransform(),
        transitionDuration: `${duration}s`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<React.HTMLAttributes<HTMLElement>>, {
            style: {
              ...((child as React.ReactElement<React.HTMLAttributes<HTMLElement>>).props.style || {}),
              opacity: childrenVisible ? 1 : 0,
              transform: childrenVisible ? 'scale(1)' : 'scale(0.95)',
              transition: `opacity ${duration * 0.8}s, transform ${duration * 0.8}s`,
              transitionDelay: `${index * 0.1}s`,
            },
          });
        }
        return child;
      })}
    </div>
  );
};

export default AnimatedEntry;

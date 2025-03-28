// src/components/animations/BackgroundAnimation.jsx
import React, { useEffect, useRef } from 'react';

const BackgroundAnimation = ({ children }) => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Create animated background elements
    const createBackgroundElements = () => {
      // Clear any existing elements
      const existingElements = container.querySelectorAll('.bg-element');
      existingElements.forEach(el => el.remove());
      
      // Create elements
      for (let i = 0; i < 15; i++) {
        const element = document.createElement('div');
        element.className = 'bg-element absolute rounded-full opacity-20';
        
        // Random size between 50 and 200px
        const size = Math.random() * 150 + 50;
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        
        // Random position
        element.style.left = `${Math.random() * 100}%`;
        element.style.top = `${Math.random() * 100}%`;
        
        // Random background color (either mustard yellow or navy blue with low opacity)
        const color = Math.random() > 0.5 ? '#E7B10A' : '#1A374D';
        element.style.backgroundColor = color;
        
        // Random animation duration between 15 and 30 seconds
        const duration = Math.random() * 15 + 15;
        element.style.animation = `float ${duration}s ease-in-out infinite`;
        
        // Random animation delay
        element.style.animationDelay = `${Math.random() * 5}s`;
        
        container.appendChild(element);
      }
    };
    
    createBackgroundElements();
    
    // Recreate on resize
    const handleResize = () => {
      createBackgroundElements();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden bg-gradient-to-b from-tazama-yellow to-tazama-blue">
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default BackgroundAnimation;
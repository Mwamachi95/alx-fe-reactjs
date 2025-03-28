import React, { useEffect, useState } from 'react';
import '../../styles/animations.css';

const LogoAnimation = () => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const logoText = "tazama";
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 3000); // Duration slightly longer than the animation
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="flex justify-center items-center">
      <div className={`logo-container relative ${animationComplete ? 'animation-complete' : ''}`}>
        {logoText.split('').map((letter, index) => (
          <span 
            key={index}
            className="logo-letter text-tazama-blue text-6xl md:text-8xl font-bold"
            style={{ 
              animationDelay: `${index * 0.15}s`,
              opacity: 0
            }}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default LogoAnimation;
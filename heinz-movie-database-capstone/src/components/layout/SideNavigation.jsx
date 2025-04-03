import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useTheme, THEMES } from '../../contexts/ThemeContext';

const SideNavigation = ({ backgroundColor = 'yellow', onStateChange, isBloodOrangePage }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const navRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === THEMES.DARK;
  
  // Get background color based on page type, theme, and prop
  const getBgColorClass = () => {
    if (isDark) {
      if (isBloodOrangePage) {
        return 'bg-tazama-blood-orange-light'; // Light blood orange for sidebar in dark mode
      }
      return 'bg-gray-800'; // Regular dark mode
    }
    
    // Light mode - use prop value
    return backgroundColor === 'blue' ? 'bg-tazama-blue' : 'bg-tazama-yellow';
  };
  
  // Get text color based on theme and background
  const getTextColorClass = () => {
    if (isDark) {
      return 'text-white';
    }
    return backgroundColor === 'blue' ? 'text-tazama-yellow' : 'text-tazama-blue';
  };
  
  const handleBack = () => {
    navigate(-1);
  };
  
  // Add event listeners for hover
  useEffect(() => {
    const nav = navRef.current;
    
    const handleMouseEnter = () => {
      setIsExpanded(true);
      if (onStateChange) onStateChange(true);
    };
    
    const handleMouseLeave = () => {
      setIsExpanded(false);
      if (onStateChange) onStateChange(false);
    };
    
    if (nav) {
      nav.addEventListener('mouseenter', handleMouseEnter);
      nav.addEventListener('mouseleave', handleMouseLeave);
    }
    
    return () => {
      if (nav) {
        nav.removeEventListener('mouseenter', handleMouseEnter);
        nav.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [onStateChange]);
  
  return (
    <nav 
      ref={navRef}
      className={`fixed left-0 top-0 h-screen w-16 hover:w-56 ${getBgColorClass()} transition-all duration-300 ease-in-out overflow-hidden z-40 flex flex-col`}
    >
      {/* Top section - Profile */}
      <div className="pt-4 px-4">
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-full border-2 ${getTextColorClass()} border-current flex items-center justify-center flex-shrink-0`}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
              />
            </svg>
          </div>
          <span className={`ml-4 font-medium ${getTextColorClass()} whitespace-nowrap opacity-0 nav-text`}>
            Profile
          </span>
        </div>
      </div>
      
      {/* Navigation items */}
      <div className="flex-grow flex flex-col justify-center px-4">
        <div className="space-y-0">
          <NavLink 
            to="/home" 
            className={({ isActive }) => 
              `flex items-center ${isActive ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`
            }
          >
            <div className={`w-10 h-10 rounded-md ${getTextColorClass()} flex items-center justify-center flex-shrink-0`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <span className={`ml-4 font-medium ${getTextColorClass()} whitespace-nowrap opacity-0 nav-text`}>
              Home
            </span>
          </NavLink>
          
          <NavLink 
            to="/favorites" 
            className={({ isActive }) => 
              `flex items-center ${isActive ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`
            }
          >
            <div className={`w-10 h-10 rounded-md ${getTextColorClass()} flex items-center justify-center flex-shrink-0`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <span className={`ml-4 font-medium ${getTextColorClass()} whitespace-nowrap opacity-0 nav-text`}>
              Favorites
            </span>
          </NavLink>
        </div>
      </div>
      
      {/* Back button */}
      <div className="pb-8 px-4 mt-auto">
        <button 
          onClick={handleBack}
          className="flex items-center opacity-70 hover:opacity-100 transition-opacity"
        >
          <div className={`w-10 h-10 rounded-md ${getTextColorClass()} flex items-center justify-center flex-shrink-0`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </div>
          <span className={`ml-4 font-medium ${getTextColorClass()} whitespace-nowrap opacity-0 nav-text`}>
            Back
          </span>
        </button>
      </div>
    </nav>
  );
};

export default SideNavigation;
// src/components/layout/TopNavigation.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../common/ThemeToggle';
import { useTheme, THEMES } from '../../contexts/ThemeContext';

const TopNavigation = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === THEMES.DARK;
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };
  
  // Use direct styles for guaranteed application
  const navStyle = {
    backgroundColor: isDark ? '#2d3748' : '#ffffff', // dark:bg-gray-800 / bg-white
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    transition: 'background-color 0.2s ease-in-out'
  };
  
  const inputStyle = {
    backgroundColor: isDark ? '#4a5568' : '#ffffff', // dark:bg-gray-700 / bg-white
    borderColor: isDark ? '#4a5568' : '#e2e8f0', // dark:border-gray-600 / border-gray-300
    color: isDark ? '#ffffff' : '#1a202c' // dark:text-white / text-gray-900
  };
  
  const buttonStyle = {
    backgroundColor: isDark ? '#4a5568' : '#f7fafc', // dark:bg-gray-600 / bg-gray-100
    borderColor: isDark ? '#4a5568' : '#e2e8f0', // dark:border-gray-600 / border-gray-300
    color: isDark ? '#e2e8f0' : '#4b5563' // dark:text-gray-300 / text-gray-500
  };
  
  return (
    <div 
      style={navStyle}
      className="py-4 sticky top-0 z-30"
    >
      <div className="px-6 flex justify-between items-center">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="w-full max-w-lg">
          <div className="relative flex w-full">
            {/* Input */}
            <input
              type="text"
              style={inputStyle}
              className="w-full pl-4 pr-3 py-2 border rounded-l-md leading-5 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-tazama-yellow focus:border-tazama-yellow"
              placeholder="Search for movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            
            {/* Button */}
            <button 
              type="submit" 
              style={buttonStyle}
              className="px-5 py-2 border border-l-0 rounded-r-md flex items-center justify-center"
            >
              <svg 
                className="h-5 w-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
            </button>
          </div>
        </form>
        
        <div className="flex items-center ml-4">
          {/* Theme Toggle */}
          <ThemeToggle />
          
          {/* Tazama Logo */}
          <span 
            className="hidden md:block ml-4 text-2xl font-bold"
            style={{ color: isDark ? '#E7B10A' : '#1A374D' }} // text-tazama-yellow / text-tazama-blue
          >
            tazama
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopNavigation;
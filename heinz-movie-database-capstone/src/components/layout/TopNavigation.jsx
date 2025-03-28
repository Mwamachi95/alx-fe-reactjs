// src/components/layout/TopNavigation.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TopNavigation = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      if (onSearch) {
        onSearch(searchQuery);
      } else {
        navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      }
    }
  };
  
  return (
    <div className="bg-white shadow-sm py-4 sticky top-0 z-30">
      <div className="px-6 flex justify-between items-center">
        {/* Search Bar - YouTube style, aligned with page content */}
        <form onSubmit={handleSearch} className="w-full max-w-lg flex items-center">
          <div className="relative flex w-full">
            {/* Input with right rounded corners removed */}
            <input
              type="text"
              className="w-full pl-4 pr-3 py-2 border border-gray-300 rounded-l-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-tazama-yellow focus:border-tazama-yellow"
              placeholder="Search for movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            
            {/* Button attached directly to input */}
            <button 
              type="submit" 
              className="px-5 py-2 bg-gray-100 hover:bg-gray-200 border border-l-0 border-gray-300 rounded-r-md flex items-center justify-center transition-colors"
            >
              <svg 
                className="h-5 w-5 text-gray-500" 
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
        
        {/* Tazama Logo */}
        <div className="hidden md:block ml-4">
          <span className="text-2xl font-bold text-tazama-blue">
            tazama
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopNavigation;
// src/components/layout/TopNavigation.jsx - Update
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TopNavigation = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    type: '',
    year: '',
  });
  const navigate = useNavigate();
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Build search URL with filters
      const params = new URLSearchParams();
      params.set('q', searchQuery);
      
      if (advancedFilters.type) params.set('type', advancedFilters.type);
      if (advancedFilters.year) params.set('year', advancedFilters.year);
      
      navigate(`/search?${params.toString()}`);
    }
  };
  
  const handleAdvancedChange = (e) => {
    const { name, value } = e.target;
    setAdvancedFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  return (
    <div className="bg-white shadow-sm py-4 sticky top-0 z-30">
      <div className="px-6 flex justify-between items-center">
        {/* Search Bar - YouTube style */}
        <form onSubmit={handleSearch} className="w-full max-w-lg">
          <div className="relative flex w-full">
            {/* Input with right rounded corners removed */}
            <input
              type="text"
              className="w-full pl-4 pr-3 py-2 border border-gray-300 rounded-l-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-tazama-yellow focus:border-tazama-yellow"
              placeholder="Search for movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            
            {/* Advanced search toggle */}
            <button 
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="px-3 bg-gray-100 hover:bg-gray-200 border border-gray-300 border-l-0 border-r-0"
              title="Advanced Search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </button>
            
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
          
          {/* Advanced search options */}
          {showAdvanced && (
            <div className="mt-2 p-3 bg-white border border-gray-300 rounded-md shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="adv-type" className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    id="adv-type"
                    name="type"
                    value={advancedFilters.type}
                    onChange={handleAdvancedChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-tazama-yellow focus:border-tazama-yellow"
                  >
                    <option value="">All Types</option>
                    <option value="movie">Movies</option>
                    <option value="series">TV Series</option>
                    <option value="episode">Episodes</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="adv-year" className="block text-sm font-medium text-gray-700 mb-1">
                    Year
                  </label>
                  <input
                    type="number"
                    id="adv-year"
                    name="year"
                    value={advancedFilters.year}
                    onChange={handleAdvancedChange}
                    placeholder="e.g. 2021"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-tazama-yellow focus:border-tazama-yellow"
                    min="1900"
                    max={new Date().getFullYear()}
                  />
                </div>
              </div>
            </div>
          )}
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
// src/components/movie/SearchFilters.jsx
import React, { useState } from 'react';

const SearchFilters = ({ onFilterChange, onSortChange, onClearFilters }) => {
  const [expanded, setExpanded] = useState(false);
  const [filters, setFilters] = useState({
    type: '',
    year: '',
    yearRange: 'exact' // 'exact', 'before', 'after'
  });
  const [sortBy, setSortBy] = useState('');
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    onSortChange(value);
  };
  
  const handleClear = () => {
    setFilters({
      type: '',
      year: '',
      yearRange: 'exact'
    });
    setSortBy('');
    onClearFilters();
  };
  
  return (
    <div className="mb-6 bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium text-gray-800">Search Filters</h3>
        <button 
          onClick={() => setExpanded(!expanded)}
          className="text-tazama-blue hover:text-tazama-yellow"
        >
          {expanded ? 'Collapse' : 'Expand'}
        </button>
      </div>
      
      {expanded && (
        <div className="space-y-4 pt-2 border-t border-gray-200">
          {/* Type Filter */}
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              id="type"
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-tazama-yellow focus:border-tazama-yellow"
            >
              <option value="">All Types</option>
              <option value="movie">Movies</option>
              <option value="series">TV Series</option>
              <option value="episode">Episodes</option>
            </select>
          </div>
          
          {/* Year Filter */}
          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
              Year
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                id="year"
                name="year"
                value={filters.year}
                onChange={handleFilterChange}
                placeholder="e.g. 2021"
                className="flex-grow p-2 border border-gray-300 rounded-md focus:ring-tazama-yellow focus:border-tazama-yellow"
                min="1900"
                max={new Date().getFullYear()}
              />
              <select
                name="yearRange"
                value={filters.yearRange}
                onChange={handleFilterChange}
                className="p-2 border border-gray-300 rounded-md focus:ring-tazama-yellow focus:border-tazama-yellow"
              >
                <option value="exact">Exact Year</option>
                <option value="before">Before Year</option>
                <option value="after">After Year</option>
              </select>
            </div>
          </div>
          
          {/* Sort Options */}
          <div>
            <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-1">
              Sort By
            </label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={handleSortChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-tazama-yellow focus:border-tazama-yellow"
            >
              <option value="">Default</option>
              <option value="year_asc">Year (Oldest First)</option>
              <option value="year_desc">Year (Newest First)</option>
              <option value="title_asc">Title (A-Z)</option>
              <option value="title_desc">Title (Z-A)</option>
            </select>
          </div>
          
          {/* Actions */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={handleClear}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 mr-2"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
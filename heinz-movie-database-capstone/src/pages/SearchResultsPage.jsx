// src/pages/SearchResultsPage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { searchMovies } from '../services/api';
import MovieGrid from '../components/movie/MovieGrid';
import SearchFilters from '../components/movie/SearchFilters';
import { useLoading } from '../contexts/LoadingContext';
import { sortMovies } from '../utils/sortingUtils';

const SearchResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('q') || '';
  
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    type: queryParams.get('type') || '',
    year: queryParams.get('year') || '',
    yearRange: queryParams.get('yearRange') || 'exact'
  });
  const [sortBy, setSortBy] = useState(queryParams.get('sortBy') || '');
  const { startLoading, stopLoading } = useLoading();
  
  // Update URL with current filters and sort
  const updateQueryParams = (newFilters, newSort) => {
    const params = new URLSearchParams();
    params.set('q', query);
    
    if (newFilters.type) params.set('type', newFilters.type);
    if (newFilters.year) params.set('year', newFilters.year);
    if (newFilters.yearRange) params.set('yearRange', newFilters.yearRange);
    if (newSort) params.set('sortBy', newSort);
    
    navigate(`/search?${params.toString()}`, { replace: true });
  };
  
  // Fetch movies when query or filters change
  useEffect(() => {
    if (!query) return;
    
    const fetchMovies = async () => {
      setError(null);
      
      try {
        startLoading();
        const data = await searchMovies(query, 1, filters);
        setMovies(data.movies || []);
      } catch (err) {
        setError(err.message);
        setMovies([]);
      } finally {
        stopLoading();
      }
    };
    
    fetchMovies();
  }, [query, filters, startLoading, stopLoading]);
  
  // Apply sorting whenever movies or sortBy changes
  useEffect(() => {
    setFilteredMovies(sortMovies(movies, sortBy));
  }, [movies, sortBy]);
  
  // Handler for filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    updateQueryParams(newFilters, sortBy);
  };
  
  // Handler for sort changes
  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    updateQueryParams(filters, newSortBy);
  };
  
  // Handler for clearing filters and sort
  const handleClearFilters = () => {
    const emptyFilters = {
      type: '',
      year: '',
      yearRange: 'exact'
    };
    setFilters(emptyFilters);
    setSortBy('');
    updateQueryParams(emptyFilters, '');
  };
  
  // Get active filter count for badge
  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.type) count++;
    if (filters.year) count++;
    if (sortBy) count++;
    return count;
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Search Results for "{query}"</h1>
        <span className="text-gray-600">
          {filteredMovies.length} {filteredMovies.length === 1 ? 'result' : 'results'}
          {getActiveFilterCount() > 0 && (
            <span className="ml-2 px-2 py-1 bg-tazama-yellow text-tazama-blue text-xs rounded-full">
              {getActiveFilterCount()} active {getActiveFilterCount() === 1 ? 'filter' : 'filters'}
            </span>
          )}
        </span>
      </div>
      
      <SearchFilters 
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
        onClearFilters={handleClearFilters}
      />
      
      <MovieGrid 
        movies={filteredMovies} 
        loading={false}
        error={error} 
        emptyMessage={
          getActiveFilterCount() > 0
            ? `No movies found for "${query}" with the current filters. Try adjusting or clearing your filters.`
            : `No movies found for "${query}". Try a different search term.`
        }
      />
    </div>
  );
};

export default SearchResultsPage;
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { searchMovies } from '../services/api';
import MovieGrid from '../components/movie/MovieGrid';
import SearchFilters from '../components/movie/SearchFilters';
import Pagination from '../components/common/Pagination';
import { useLoading } from '../contexts/LoadingContext';
import { sortMovies } from '../utils/sortingUtils';

const SearchResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('q') || '';
  
  // Extract page from URL or default to 1
  const initialPage = parseInt(queryParams.get('page'), 10) || 1;
  
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    type: queryParams.get('type') || '',
    year: queryParams.get('year') || '',
    yearRange: queryParams.get('yearRange') || 'exact'
  });
  const [sortBy, setSortBy] = useState(queryParams.get('sortBy') || '');
  const { startLoading, stopLoading } = useLoading();
  
  // Calculate total pages based on total results (OMDB returns 10 results per page)
  const totalPages = Math.ceil(totalResults / 10);
  
  // Update URL with current search parameters
  const updateQueryParams = (newFilters, newSort, newPage = 1) => {
    const params = new URLSearchParams();
    params.set('q', query);
    params.set('page', newPage.toString());
    
    if (newFilters.type) params.set('type', newFilters.type);
    if (newFilters.year) params.set('year', newFilters.year);
    if (newFilters.yearRange) params.set('yearRange', newFilters.yearRange);
    if (newSort) params.set('sortBy', newSort);
    
    navigate(`/search?${params.toString()}`, { replace: true });
  };
  
  // Fetch movies when query, filters, or page changes
  useEffect(() => {
    if (!query) return;
    
    const fetchMovies = async () => {
      setError(null);
      
      try {
        startLoading();
        const data = await searchMovies(query, currentPage, filters);
        setMovies(data.movies || []);
        setTotalResults(data.totalResults || 0);
      } catch (err) {
        setError(err.message);
        setMovies([]);
        setTotalResults(0);
      } finally {
        stopLoading();
      }
    };
    
    fetchMovies();
  }, [query, filters, currentPage, startLoading, stopLoading]);
  
  // Apply sorting whenever movies or sortBy changes
  useEffect(() => {
    setFilteredMovies(sortMovies(movies, sortBy));
  }, [movies, sortBy]);
  
  // Handler for filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
    updateQueryParams(newFilters, sortBy, 1);
  };
  
  // Handler for sort changes
  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    updateQueryParams(filters, newSortBy, currentPage);
  };
  
  // Handler for page changes
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    updateQueryParams(filters, sortBy, newPage);
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
    setCurrentPage(1);
    updateQueryParams(emptyFilters, '', 1);
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
          {totalResults} {totalResults === 1 ? 'result' : 'results'}
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
      
      {/* Pagination at top only */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalResults={totalResults}
        onPageChange={handlePageChange}
        className="mb-6" // Add margin bottom to separate from results
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
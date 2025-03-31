// src/components/movie/MovieGrid.jsx
import React from 'react';
import MovieCard from './MovieCard';

const MovieGrid = ({ 
  movies, 
  loading = false, 
  error = null, 
  emptyMessage = 'No movies found',
}) => {
  // Use explicit Tailwind classes for grid
  const gridClasses = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6";
  
  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-tazama-yellow"></div>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-4">
        <p>{error}</p>
      </div>
    );
  }
  
  // Empty state
  if (!movies || movies.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 text-center">
        <p className="text-gray-600 dark:text-gray-300">{emptyMessage}</p>
      </div>
    );
  }
  
  // Movie grid
  return (
    <div className={gridClasses}>
      {movies.map(movie => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
};

export default MovieGrid;
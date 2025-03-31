// src/pages/FavoritesPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import MovieGrid from '../components/movie/MovieGrid';
import { useFavorites } from '../contexts/FavoritesContext';

const FavoritesPage = () => {
  const { favorites } = useFavorites();
  
  // Empty state when no favorites
  if (favorites.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <svg 
          className="w-16 h-16 text-gray-300 mb-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
          />
        </svg>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">No Favorites Yet</h2>
        <p className="text-gray-500 mb-6 max-w-md">
          You haven't added any movies to your favorites. Browse movies and click the heart icon to add them here.
        </p>
        <Link 
          to="/home" 
          className="px-6 py-3 bg-tazama-yellow text-tazama-blue font-bold rounded-lg hover:bg-opacity-90 transition-all"
        >
          Browse Movies
        </Link>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Favorite Movies</h1>
        <p className="text-gray-600">{favorites.length} {favorites.length === 1 ? 'movie' : 'movies'}</p>
      </div>
      
      <MovieGrid 
        movies={favorites}
        emptyMessage="No favorites found. Try adding some!"
      />
    </div>
  );
};

export default FavoritesPage;
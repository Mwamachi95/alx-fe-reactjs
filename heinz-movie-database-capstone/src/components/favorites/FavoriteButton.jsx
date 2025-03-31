// src/components/favorites/FavoriteButton.jsx
import React from 'react';
import { useFavorites } from '../../contexts/FavoritesContext';

const FavoriteButton = ({ movie, className = '' }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(movie.imdbID);
  
  const handleClick = (e) => {
    e.preventDefault(); // Prevent navigation when inside a link
    e.stopPropagation(); // Prevent event bubbling
    
    console.log('Toggle favorite for:', movie.Title); // Debugging
    toggleFavorite(movie);
  };
  
  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center justify-center p-2 rounded-full transition-colors ${
        isFav 
          ? 'text-red-500 hover:text-red-600' 
          : 'text-gray-400 hover:text-red-500'
      } ${className}`}
      aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
      title={isFav ? 'Remove from favorites' : 'Add to favorites'}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-6 w-6" 
        fill={isFav ? 'currentColor' : 'none'} 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth={isFav ? 0 : 2}
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
        />
      </svg>
    </button>
  );
};

export default FavoriteButton;
// src/components/movie/MovieCard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FavoriteButton from '../favorites/FavoriteButton';

const MovieCard = ({ movie, className = '' }) => {
  const [imageError, setImageError] = useState(false);
  
  // Get a locally hosted placeholder image
  const placeholderImage = '/placeholder.png';
  
  // Pre-validate the poster URL
  const isPosterValid = movie.Poster && movie.Poster !== 'N/A' && !imageError;
  
  // Use the appropriate image source
  const posterUrl = isPosterValid ? movie.Poster : placeholderImage;
  
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 ${className} relative`}>
      <Link to={`/movie/${movie.imdbID}`} className="block">
        {/* Poster Image with Aspect Ratio Container */}
        <div className="relative pb-[150%] bg-gray-200 dark:bg-gray-700">
          <img 
            src={posterUrl} 
            alt={`${movie.Title} poster`}
            onError={() => setImageError(true)}
            className="absolute top-0 left-0 w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        
        {/* Movie Info */}
        <div className="p-4">
          <h3 className="font-semibold text-lg leading-tight truncate text-gray-900 dark:text-white">
            {movie.Title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{movie.Year}</p>
          
          {/* Placeholder for future rating or additional info */}
          {movie.Type && (
            <span className="inline-block px-2 py-1 mt-2 text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded capitalize">
              {movie.Type}
            </span>
          )}
        </div>
      </Link>
      
      {/* Favorite Button - Positioned absolutely in top-right corner */}
      <div className="absolute top-2 right-2">
        <FavoriteButton movie={movie} className="bg-white dark:bg-gray-800 bg-opacity-70 dark:bg-opacity-70 hover:bg-opacity-100 dark:hover:bg-opacity-100 shadow-sm" />
      </div>
    </div>
  );
};

export default MovieCard;
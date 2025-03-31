// src/components/movie/MovieCard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FavoriteButton from '../favorites/FavoriteButton';

const MovieCard = ({ movie, className = '' }) => {
  const [imageError, setImageError] = useState(false);
  
  // Get a locally hosted placeholder image
  const placeholderImage = '/placeholder.png'; // Local placeholder in public folder
  // Fallback online placeholder if needed
  const onlinePlaceholder = 'https://placehold.co/300x450/e2e8f0/1e293b?text=No+Poster';
  
  // Pre-validate the poster URL
  const isPosterValid = movie.Poster && movie.Poster !== 'N/A' && !imageError;
  
  // Use the appropriate image source
  const posterUrl = isPosterValid ? movie.Poster : (placeholderImage || onlinePlaceholder);
  
  return (
    <div className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 ${className} relative`}>
      <Link to={`/movie/${movie.imdbID}`} className="block">
        {/* Poster Image with Aspect Ratio Container */}
        <div className="relative pb-[150%] bg-gray-200">
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
          <h3 className="font-semibold text-lg leading-tight truncate text-gray-900">
            {movie.Title}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{movie.Year}</p>
          
          {/* Placeholder for future rating or additional info */}
          {movie.Type && (
            <span className="inline-block px-2 py-1 mt-2 text-xs font-semibold bg-gray-100 rounded capitalize">
              {movie.Type}
            </span>
          )}
        </div>
      </Link>
      
      {/* Favorite Button - Positioned absolutely in top-right corner */}
      <div className="absolute top-2 right-2">
        <FavoriteButton movie={movie} className="bg-white bg-opacity-70 hover:bg-opacity-100 shadow-sm" />
      </div>
    </div>
  );
};

export default MovieCard;
// src/pages/MovieDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovieDetails } from '../services/api';
import BackButton from '../components/common/BackButton';
import FavoriteButton from '../components/favorites/FavoriteButton';
import { useLoading } from '../contexts/LoadingContext';
// import { useFavorites } from '../contexts/FavoritesContext';
import { useTheme, THEMES } from '../contexts/ThemeContext';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const { startLoading, stopLoading } = useLoading();
  const { theme } = useTheme();
  // const isDark = theme === THEMES.DARK;
  
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        startLoading();
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        stopLoading();
      }
    };
    
    fetchMovieDetails();
  }, [id, startLoading, stopLoading]);
  
  // Error state
  if (error) {
    return (
      <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-6 py-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">Error Loading Movie</h3>
        <p>{error}</p>
        <Link to="/home" className="mt-4 inline-block text-tazama-blue dark:text-tazama-yellow hover:underline">
          Return to Home Page
        </Link>
      </div>
    );
  }
  
  // No movie data
  if (!movie) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Loading movie details...</p>
      </div>
    );
  }
  
  // Format movie data
  const {
    Title,
    // Year,
    Rated,
    Runtime,
    Genre,
    Director,
    Actors,
    Plot,
    Poster,
    imdbRating,
    imdbVotes,
    BoxOffice,
    Awards,
    Released
  } = movie;
  
  // Handle potentially missing poster
  const posterUrl = (Poster && Poster !== 'N/A') 
    ? Poster 
    : 'https://placehold.co/300x450/e2e8f0/1e293b?text=No+Poster';
  
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 pt-4">
        <BackButton />
      </div>
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-tazama-blue to-black text-white py-12">
        <div className="absolute inset-0 opacity-20" style={{ 
          backgroundImage: `url(${posterUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(10px)'
        }}></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
            <img 
              src={posterUrl} 
              alt={`${Title} poster`}
              className="w-full rounded-lg shadow-lg md:max-w-xs mx-auto object-cover"
              onError={(e) => { e.target.src = 'https://placehold.co/300x450/e2e8f0/1e293b?text=No+Poster' }}
            />
          </div>
          
          {/* Basic Info */}
          <div className="flex-grow">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{Title}</h1>
            <div className="flex flex-wrap gap-2 text-sm mb-4">
              {Released && <span>{Released}</span>}
              {Rated && <span>• {Rated}</span>}
              {Runtime && <span>• {Runtime}</span>}
            </div>
            
            {Genre && (
              <div className="mb-4">
                {Genre.split(',').map(genre => (
                  <span 
                    key={genre} 
                    className="inline-block bg-tazama-yellow text-tazama-blue px-3 py-1 rounded-full text-xs font-semibold mr-2 mb-2"
                  >
                    {genre.trim()}
                  </span>
                ))}
              </div>
            )}
            
            {Plot && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Plot</h3>
                <p className="text-gray-200">{Plot}</p>
              </div>
            )}
            
            <div className="flex items-center mb-4">
              {imdbRating && (
                <div className="bg-tazama-yellow text-tazama-blue font-bold rounded px-3 py-2 mr-2">
                  {imdbRating}/10
                </div>
              )}
              
              <span className="text-sm text-gray-300">
                {imdbVotes && `${imdbVotes} votes`}
              </span>
              
              {/* Add favorite button */}
              <div className="ml-4">
                <FavoriteButton 
                  movie={movie} 
                  className="bg-white bg-opacity-20 hover:bg-opacity-30"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Details Section - FIXED FOR DARK MODE */}
      <div className="max-w-6xl mx-auto px-4 py-8 bg-white dark:bg-gray-900 transition-colors">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - People */}
          <div>
            <h3 className="text-xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-2 mb-4 text-gray-900 dark:text-white">Cast & Crew</h3>
            
            {Director && Director !== 'N/A' && (
              <div className="mb-4">
                <h4 className="text-gray-600 dark:text-gray-400 font-medium">Director</h4>
                <p className="text-gray-900 dark:text-gray-200">{Director}</p>
              </div>
            )}
            
            {Actors && Actors !== 'N/A' && (
              <div className="mb-4">
                <h4 className="text-gray-600 dark:text-gray-400 font-medium">Actors</h4>
                <p className="text-gray-900 dark:text-gray-200">{Actors}</p>
              </div>
            )}
          </div>
          
          {/* Middle Column - Details */}
          <div>
            <h3 className="text-xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-2 mb-4 text-gray-900 dark:text-white">Details</h3>
            
            {Released && Released !== 'N/A' && (
              <div className="mb-4">
                <h4 className="text-gray-600 dark:text-gray-400 font-medium">Release Date</h4>
                <p className="text-gray-900 dark:text-gray-200">{Released}</p>
              </div>
            )}
            
            {Runtime && Runtime !== 'N/A' && (
              <div className="mb-4">
                <h4 className="text-gray-600 dark:text-gray-400 font-medium">Runtime</h4>
                <p className="text-gray-900 dark:text-gray-200">{Runtime}</p>
              </div>
            )}
            
            {Rated && Rated !== 'N/A' && (
              <div className="mb-4">
                <h4 className="text-gray-600 dark:text-gray-400 font-medium">Rating</h4>
                <p className="text-gray-900 dark:text-gray-200">{Rated}</p>
              </div>
            )}
          </div>
          
          {/* Right Column - Box Office */}
          <div>
            <h3 className="text-xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-2 mb-4 text-gray-900 dark:text-white">Box Office</h3>
            
            {BoxOffice && BoxOffice !== 'N/A' && (
              <div className="mb-4">
                <h4 className="text-gray-600 dark:text-gray-400 font-medium">Box Office</h4>
                <p className="text-gray-900 dark:text-gray-200">{BoxOffice}</p>
              </div>
            )}
            
            {Awards && Awards !== 'N/A' && (
              <div className="mb-4">
                <h4 className="text-gray-600 dark:text-gray-400 font-medium">Awards</h4>
                <p className="text-gray-900 dark:text-gray-200">{Awards}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
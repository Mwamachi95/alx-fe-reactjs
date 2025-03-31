// src/pages/MovieDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovieDetails } from '../services/api';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMovieDetails();
  }, [id]);
  
  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-tazama-yellow"></div>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">Error Loading Movie</h3>
        <p>{error}</p>
        <Link to="/home" className="mt-4 inline-block text-tazama-blue hover:underline">
          Return to Home Page
        </Link>
      </div>
    );
  }
  
  // No movie data
  if (!movie) {
    return (
      <div className="bg-gray-100 p-8 rounded-lg text-center">
        <p className="text-xl text-gray-600">Movie not found</p>
        <Link to="/home" className="mt-4 inline-block text-tazama-blue hover:underline">
          Return to Home Page
        </Link>
      </div>
    );
  }
  
  // Format movie data
  const {
    Title,
    Year,
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
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
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
            
            {imdbRating && (
              <div className="flex items-center mb-4">
                <div className="bg-tazama-yellow text-tazama-blue font-bold rounded px-3 py-2 mr-2">
                  {imdbRating}/10
                </div>
                <span className="text-sm text-gray-300">
                  {imdbVotes && `${imdbVotes} votes`}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Details Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - People */}
          <div>
            <h3 className="text-xl font-semibold border-b border-gray-200 pb-2 mb-4">Cast & Crew</h3>
            
            {Director && Director !== 'N/A' && (
              <div className="mb-4">
                <h4 className="text-gray-600 font-medium">Director</h4>
                <p>{Director}</p>
              </div>
            )}
            
            {Actors && Actors !== 'N/A' && (
              <div className="mb-4">
                <h4 className="text-gray-600 font-medium">Actors</h4>
                <p>{Actors}</p>
              </div>
            )}
          </div>
          
          {/* Middle Column - Details */}
          <div>
            <h3 className="text-xl font-semibold border-b border-gray-200 pb-2 mb-4">Details</h3>
            
            {Released && Released !== 'N/A' && (
              <div className="mb-4">
                <h4 className="text-gray-600 font-medium">Release Date</h4>
                <p>{Released}</p>
              </div>
            )}
            
            {Runtime && Runtime !== 'N/A' && (
              <div className="mb-4">
                <h4 className="text-gray-600 font-medium">Runtime</h4>
                <p>{Runtime}</p>
              </div>
            )}
            
            {Rated && Rated !== 'N/A' && (
              <div className="mb-4">
                <h4 className="text-gray-600 font-medium">Rating</h4>
                <p>{Rated}</p>
              </div>
            )}
          </div>
          
          {/* Right Column - Box Office */}
          <div>
            <h3 className="text-xl font-semibold border-b border-gray-200 pb-2 mb-4">Box Office</h3>
            
            {BoxOffice && BoxOffice !== 'N/A' && (
              <div className="mb-4">
                <h4 className="text-gray-600 font-medium">Box Office</h4>
                <p>{BoxOffice}</p>
              </div>
            )}
            
            {Awards && Awards !== 'N/A' && (
              <div className="mb-4">
                <h4 className="text-gray-600 font-medium">Awards</h4>
                <p>{Awards}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
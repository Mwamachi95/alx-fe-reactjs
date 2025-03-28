// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPopularMovies } from '../services/api';

const HomePage = () => {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const movies = await getPopularMovies();
        setFeaturedMovies(movies);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMovies();
  }, []);
  
  return (
    <div>
      <section className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Welcome to Tazama</h1>
        <p className="text-gray-600 mb-6">
          Discover and explore your favorite movies
        </p>
        
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-tazama-yellow"></div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>{error}</p>
          </div>
        )}
      </section>
      
      {!loading && !error && featuredMovies.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Acclaimed Movies</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {featuredMovies.map(movie => (
              <Link 
                to={`/movie/${movie.imdbID}`} 
                key={movie.imdbID}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
              >
                <div className="relative pb-[150%]">
                  <img 
                    src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'} 
                    alt={movie.Title}
                    className="absolute h-full w-full object-cover"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/300x450?text=No+Poster' }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1 truncate">{movie.Title}</h3>
                  <p className="text-gray-600">{movie.Year}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;
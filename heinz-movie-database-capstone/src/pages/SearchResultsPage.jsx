// src/pages/SearchResultsPage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { searchMovies } from '../services/api';

const SearchResultsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('q') || '';
  
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (!query) return;
    
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await searchMovies(query);
        setMovies(data.movies || []);
      } catch (err) {
        setError(err.message);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMovies();
  }, [query]);
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Search Results for "{query}"</h1>
      
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
      
      {!loading && !error && movies.length === 0 && (
        <div className="bg-gray-100 p-8 rounded-lg text-center">
          <p className="text-xl text-gray-600">No movies found for "{query}"</p>
          <p className="mt-2 text-gray-500">Try searching for something else</p>
        </div>
      )}
      
      {!loading && !error && movies.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies.map(movie => (
            <div 
              key={movie.imdbID} 
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
            >
              <div className="relative pb-2/3">
                <img 
                  src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'} 
                  alt={movie.Title}
                  className="absolute h-full w-full object-cover"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/300x450?text=No+Poster' }}
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-1">{movie.Title}</h2>
                <p className="text-gray-600">{movie.Year}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
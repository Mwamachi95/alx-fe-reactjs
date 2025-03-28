// src/pages/SearchResultsPage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { searchMovies } from '../services/api';
import MovieGrid from '../components/movie/MovieGrid';

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
      
      <MovieGrid 
        movies={movies} 
        loading={loading} 
        error={error} 
        emptyMessage={`No movies found for "${query}". Try a different search term.`}
      />
    </div>
  );
};

export default SearchResultsPage;
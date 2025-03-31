// src/pages/SearchResultsPage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { searchMovies } from '../services/api';
import MovieGrid from '../components/movie/MovieGrid';
import { useLoading } from '../contexts/LoadingContext';

const SearchResultsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('q') || '';
  
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const { startLoading, stopLoading } = useLoading();
  
  useEffect(() => {
    if (!query) return;
    
    const fetchMovies = async () => {
      setError(null);
      
      try {
        startLoading();
        const data = await searchMovies(query);
        setMovies(data.movies || []);
      } catch (err) {
        setError(err.message);
        setMovies([]);
      } finally {
        stopLoading();
      }
    };
    
    fetchMovies();
  }, [query, startLoading, stopLoading]);
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Search Results for "{query}"</h1>
      
      <MovieGrid 
        movies={movies} 
        loading={false} // We're using the global loading state now
        error={error} 
        emptyMessage={`No movies found for "${query}". Try a different search term.`}
      />
    </div>
  );
};

export default SearchResultsPage;
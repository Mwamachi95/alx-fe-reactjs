// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { getPopularMovies } from '../services/api';
import MovieGrid from '../components/movie/MovieGrid';

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
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-4">Acclaimed Movies</h2>
        <MovieGrid 
          movies={featuredMovies} 
          loading={loading} 
          error={error} 
          emptyMessage="No featured movies available at the moment."
        />
      </section>
    </div>
  );
};

export default HomePage;
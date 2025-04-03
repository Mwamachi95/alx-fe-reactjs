import React, { useState, useEffect } from 'react';
import { getPopularMovies } from '../services/api';
import MovieGrid from '../components/movie/MovieGrid';
import { useLoading } from '../contexts/LoadingContext';

const HomePage = () => {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [error, setError] = useState(null);
  const { loading, startLoading, stopLoading } = useLoading();
  
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        console.log("Starting to load data...");
        startLoading();
        const movies = await getPopularMovies();
        setFeaturedMovies(movies);
      } catch (err) {
        setError(err.message);
      } finally {
        console.log("Finished loading data...");
        stopLoading();
      }
    };
    
    fetchMovies();
    
    // Cleanup function
    return () => {
      stopLoading();
    };
  }, [startLoading, stopLoading]);
  
  return (
    <div>
      <section className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Welcome to Tazama</h1>
        <p className="text-gray-600 mb-6">
          Discover and explore your favorite movies
        </p>
        {loading && <p className="text-tazama-yellow">Loading...</p>}
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-4">Acclaimed Movies</h2>
        <MovieGrid 
          movies={featuredMovies} 
          loading={false}
          error={error} 
          emptyMessage="No featured movies available at the moment."
        />
      </section>
    </div>
  );
};

export default HomePage;
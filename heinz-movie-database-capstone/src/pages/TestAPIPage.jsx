import React, { useEffect, useState } from 'react';
import { searchMovies, getMovieDetails } from '../services/api';

const TestAPIPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const testAPI = async () => {
      try {
        setLoading(true);
        // Test search functionality
        const results = await searchMovies('avengers');
        setSearchResults(results.movies);
        
        // Test get details functionality
        if (results.movies && results.movies.length > 0) {
          const details = await getMovieDetails(results.movies[0].imdbID);
          setMovieDetails(details);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    testAPI();
  }, []);
  
  if (loading) return <div className="p-8">Loading...</div>;
  
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">API Test Results</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Search Results:</h2>
        <ul className="list-disc pl-6">
          {searchResults.map(movie => (
            <li key={movie.imdbID} className="mb-1">
              {movie.Title} ({movie.Year})
            </li>
          ))}
        </ul>
      </div>
      
      {movieDetails && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Movie Details:</h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-bold">{movieDetails.Title}</h3>
            <p><strong>Year:</strong> {movieDetails.Year}</p>
            <p><strong>Rated:</strong> {movieDetails.Rated}</p>
            <p><strong>Runtime:</strong> {movieDetails.Runtime}</p>
            <p><strong>Director:</strong> {movieDetails.Director}</p>
            <p><strong>Plot:</strong> {movieDetails.Plot}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestAPIPage;
// src/services/api.js
import { API_KEY, BASE_URL } from '../utils/constants';

/**
 * Search for movies based on query
 * @param {string} query - Search term
 * @param {number} page - Page number for pagination
 * @returns {Promise} - Promise with search results
 */
export const searchMovies = async (query, page = 1) => {
  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${query}&page=${page}&type=movie`);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    
    if (data.Response === 'False') {
      throw new Error(data.Error || 'No movies found');
    }
    
    return {
      movies: data.Search,
      totalResults: parseInt(data.totalResults, 10),
      currentPage: page
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Get detailed information about a specific movie
 * @param {string} id - IMDB ID of the movie
 * @returns {Promise} - Promise with movie details
 */
export const getMovieDetails = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    
    if (data.Response === 'False') {
      throw new Error(data.Error || 'Movie details not found');
    }
    
    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * Get popular movies (this is a workaround since OMDB doesn't have a popular movies endpoint)
 * We'll use predefined popular movie titles
 */
export const getPopularMovies = async () => {
  try {
    const popularTitles = ['inception', 'interstellar', 'godfather', 'dark knight', 'pulp fiction'];
    
    const results = await Promise.all(
      popularTitles.map(title => searchMovies(title, 1))
    );
    
    // Get the first movie from each search result
    const popularMovies = results
      .map(result => result.movies && result.movies.length > 0 ? result.movies[0] : null)
      .filter(movie => movie !== null);
    
    return popularMovies;
  } catch (error) {
    throw error;
  }
};
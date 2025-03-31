// src/services/api.js
// Base configuration
const API_KEY = '8c90cfe2'; // Your OMDB API key
const BASE_URL = 'https://www.omdbapi.com/';

/**
 * Search for movies based on query and filters
 * @param {string} query - Search term
 * @param {number} page - Page number for pagination
 * @param {object} filters - Filter options
 * @returns {Promise} - Promise with search results
 */
export const searchMovies = async (query, page = 1, filters = {}) => {
  try {
    let url = `${BASE_URL}?apikey=${API_KEY}&s=${query}&page=${page}`;
    
    // Add type filter if specified
    if (filters.type) {
      url += `&type=${filters.type}`;
    }
    
    // Add year filter if specified
    if (filters.year) {
      // OMDB API only supports exact year in the query
      // We'll handle before/after ranges in the client-side filtering
      url += `&y=${filters.year}`;
    }
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    
    if (data.Response === 'False') {
      throw new Error(data.Error || 'No movies found');
    }
    
    // Client-side filtering for year ranges if needed
    let movies = data.Search;
    if (filters.year && filters.yearRange !== 'exact') {
      movies = movies.filter(movie => {
        const movieYear = parseInt(movie.Year, 10);
        const filterYear = parseInt(filters.year, 10);
        
        if (filters.yearRange === 'before') {
          return movieYear < filterYear;
        } else if (filters.yearRange === 'after') {
          return movieYear > filterYear;
        }
        return true;
      });
    }
    
    return {
      movies,
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
 * Get popular movies (workaround since OMDB doesn't have a dedicated popular movies endpoint)
 * @returns {Promise} - Promise with popular movies
 */
export const getPopularMovies = async () => {
  try {
    // Array of popular movie titles to search for
    const popularTitles = [
      'inception', 'interstellar', 'godfather', 'pulp fiction', 'dark knight',
      'shawshank redemption', 'fight club', 'matrix', 'lord of the rings', 'avengers'
    ];
    
    // Pick a random set of titles to keep it interesting
    const shuffled = [...popularTitles].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 5);
    
    // Fetch movies in parallel
    const results = await Promise.all(
      selected.map(title => searchMovies(title, 1))
    );
    
    // Get the first movie from each search result
    const popularMovies = results
      .map(result => result.movies && result.movies.length > 0 ? result.movies[0] : null)
      .filter(movie => movie !== null);
    
    return popularMovies;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return [];
  }
};

// Export all functions
export default {
  searchMovies,
  getMovieDetails,
  getPopularMovies
};
// src/utils/sortingUtils.js
/**
 * Sort an array of movies based on sort criteria
 * @param {Array} movies - Array of movie objects
 * @param {string} sortBy - Sort criteria (e.g., 'year_asc', 'title_desc')
 * @returns {Array} - Sorted array of movies
 */
export const sortMovies = (movies, sortBy) => {
  if (!sortBy || !movies || !movies.length) {
    return movies;
  }
  
  const [field, direction] = sortBy.split('_');
  const sortedMovies = [...movies];
  
  sortedMovies.sort((a, b) => {
    let valueA, valueB;
    
    if (field === 'year') {
      valueA = parseInt(a.Year, 10) || 0;
      valueB = parseInt(b.Year, 10) || 0;
    } else if (field === 'title') {
      valueA = a.Title || '';
      valueB = b.Title || '';
    } else {
      return 0;
    }
    
    if (direction === 'asc') {
      return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
    } else {
      return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
    }
  });
  
  return sortedMovies;
};
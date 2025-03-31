// src/contexts/FavoritesContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

// Constants
const STORAGE_KEY = 'tazama-favorites';

// Create context
const FavoritesContext = createContext();

// Create custom hook for using favorites
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

// Create provider component
export const FavoritesProvider = ({ children }) => {
  // Initialize with an empty array
  const [favorites, setFavorites] = useState([]);
  
  // ISSUE: This only runs on component mount, we need to make sure it loads first
  useEffect(() => {
    // Load favorites from localStorage
    try {
      const storedFavorites = localStorage.getItem(STORAGE_KEY);
      if (storedFavorites) {
        const parsedFavorites = JSON.parse(storedFavorites);
        console.log('Loaded favorites:', parsedFavorites); // Debugging
        setFavorites(parsedFavorites);
      }
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
    }
  }, []);
  
  // Save to localStorage whenever favorites change
  useEffect(() => {
    // Only save if favorites have been initialized and changed
    if (favorites) {
      console.log('Saving favorites:', favorites); // Debugging
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    }
  }, [favorites]);
  
  // Check if a movie is in favorites
  const isFavorite = (movieId) => {
    return favorites.some(movie => movie.imdbID === movieId);
  };
  
  // Add a movie to favorites
  const addFavorite = (movie) => {
    if (!isFavorite(movie.imdbID)) {
      const newFavorites = [...favorites, movie];
      setFavorites(newFavorites);
      console.log('Added to favorites:', movie.Title); // Debugging
    }
  };
  
  // Remove a movie from favorites
  const removeFavorite = (movieId) => {
    const newFavorites = favorites.filter(movie => movie.imdbID !== movieId);
    setFavorites(newFavorites);
    console.log('Removed from favorites:', movieId); // Debugging
  };
  
  // Toggle favorite status
  const toggleFavorite = (movie) => {
    if (isFavorite(movie.imdbID)) {
      removeFavorite(movie.imdbID);
    } else {
      addFavorite(movie);
    }
  };
  
  const value = {
    favorites,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite
  };
  
  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;
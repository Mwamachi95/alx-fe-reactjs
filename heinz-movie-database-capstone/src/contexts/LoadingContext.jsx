// src/contexts/LoadingContext.jsx
import React, { createContext, useContext, useState, useCallback } from 'react';

const LoadingContext = createContext();

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [barColor, setBarColor] = useState('#E7B10A'); // Default yellow color

  // Start loading with minimum duration
  const startLoading = useCallback(() => {
    setLoading(true);
  }, []);
  
  // Stop loading with a minimum visible duration
  const stopLoading = useCallback(() => {
    // Add a slight delay to make loading more visible
    setTimeout(() => {
      setLoading(false);
    }, 800); // Minimum loading time of 800ms
  }, []);
  
  // Method to set the color
  const setLoadingBarColor = useCallback((color) => {
    setBarColor(color === 'blue' ? '#1A374D' : '#E7B10A');
  }, []);

  return (
    <LoadingContext.Provider value={{ 
      loading, 
      startLoading, 
      stopLoading,
      setLoadingBarColor 
    }}>
      {loading && (
        <div className="fixed top-0 left-0 w-full z-50">
          <div className="h-1 w-full bg-gray-200 overflow-hidden">
            <div 
              className="h-full animate-loadingBar"
              style={{ backgroundColor: barColor, width: '100%' }}
            ></div>
          </div>
        </div>
      )}
      {children}
    </LoadingContext.Provider>
  );
};
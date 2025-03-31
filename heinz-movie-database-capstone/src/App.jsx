// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import SearchResultsPage from './pages/SearchResultsPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import TestAPIPage from './pages/TestAPIPage';
import { LoadingProvider } from './contexts/LoadingContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { ThemeProvider, useTheme, THEMES } from './contexts/ThemeContext';
import './App.css';
import './styles/animations.css';

// AppContent component to use hooks
const AppContent = () => {
  const { theme } = useTheme();
  const isDark = theme === THEMES.DARK;
  
  // Apply background color to body directly
  useEffect(() => {
    document.body.style.backgroundColor = isDark ? '#1a202c' : '#ffffff';
  }, [isDark]);
  
  return (
    <div style={{ 
      backgroundColor: isDark ? '#1a202c' : '#ffffff',
      color: isDark ? '#ffffff' : '#1a202c',
      minHeight: '100vh'
    }}>
      <Router>
        <FavoritesProvider>
          <LoadingProvider>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              
              <Route path="/home" element={
                <Layout sideNavColor="yellow">
                  <HomePage />
                </Layout>
              } />
              
              <Route path="/favorites" element={
                <Layout sideNavColor="yellow">
                  <FavoritesPage />
                </Layout>
              } />
              
              <Route path="/search" element={
                <Layout sideNavColor="yellow">
                  <SearchResultsPage />
                </Layout>
              } />
              
              <Route path="/movie/:id" element={
                <Layout sideNavColor="blue">
                  <MovieDetailsPage />
                </Layout>
              } />
              
              <Route path="/test-api" element={<TestAPIPage />} />
            </Routes>
          </LoadingProvider>
        </FavoritesProvider>
      </Router>
    </div>
  );
};

// Main App component 
function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import SearchResultsPage from './pages/SearchResultsPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import TestAPIPage from './pages/TestAPIPage';
import './styles/animations.css';

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
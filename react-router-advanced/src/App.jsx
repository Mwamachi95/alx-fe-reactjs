import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import './App.css';

// Page Components
import Home from './components/Home';
import About from './components/About';
import Profile from './components/Profile';
import BlogPost from './components/BlogPost';
import NotFound from './components/NotFound';
import Login from './components/Login';

function App() {
  // Simple authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Login and Logout functions
  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <div className="app">
        {/* Navigation */}
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/blog/1">Blog Post 1</Link></li>
            <li><Link to="/blog/2">Blog Post 2</Link></li>
            {isAuthenticated ? (
              <li><button onClick={logout}>Logout</button></li>
            ) : (
              <li><Link to="/login">Login</Link></li>
            )}
          </ul>
        </nav>

        {/* Auth status display */}
        <div className="auth-status">
          Status: {isAuthenticated ? 'Logged In' : 'Logged Out'}
        </div>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login onLogin={login} isAuthenticated={isAuthenticated} />} />
          
          {/* Protected route for Profile and nested routes */}
          <Route 
            path="/profile/*" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          
          {/* Dynamic route with parameter */}
          <Route path="/blog/:id" element={<BlogPost />} />
          
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Page Components
import Home from './components/Home';
import About from './components/About';
import Profile from './components/Profile';
import BlogPost from './components/BlogPost';
import NotFound from './components/NotFound';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider, useAuth } from './AuthContext';

// Navigation component with auth-aware links
const Navigation = () => {
  const { isAuthenticated, logout } = useAuth();
  
  return (
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
  );
};

// Auth status component
const AuthStatus = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="auth-status">
      Status: {isAuthenticated ? 'Logged In' : 'Logged Out'}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app">
          <Navigation />
          <AuthStatus />

          {/* Routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            
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
    </AuthProvider>
  );
}

export default App;
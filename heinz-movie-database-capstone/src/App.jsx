// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import TestAPIPage from './pages/TestAPIPage';
import './styles/animations.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/test-api" element={<TestAPIPage />} />
        {/* We'll add more routes later */}
      </Routes>
    </Router>
  );
}

export default App;
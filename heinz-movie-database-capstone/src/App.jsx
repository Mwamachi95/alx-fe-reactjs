import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import './styles/animations.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* We'll add more routes later */}
      </Routes>
    </Router>
  );
}

export default App;
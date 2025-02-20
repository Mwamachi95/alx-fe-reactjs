// App.jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './component-temp/Home';
import About from './component-temp/About';
import Services from './component-temp/Services';
import Contact from './component-temp/Contact';
import Navbar from './component-temp/Navbar'; // Import the Navbar component
import Footer from './component-temp/Footer';

function App() {
  return (
    <BrowserRouter>
    <Navbar /> {/* Include the Navbar here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;


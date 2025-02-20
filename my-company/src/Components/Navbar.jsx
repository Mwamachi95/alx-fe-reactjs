import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={{ display: 'flex', justifyContent: 'space-around', padding: '10px', background: '#eee', listStyleType: 'none'}}>
            <li><Link to="/" style={{ margin: '10px', textDecoration: 'none' }}>Home</Link></li>
            <li><Link to="/about" style={{ margin: '10px', textDecoration: 'none' }}>About</Link></li>
            <li><Link to="/services" style={{ margin: '10px', textDecoration: 'none' }}>Services</Link></li>
            <li><Link to="/contact" style={{ margin: '10px', textDecoration: 'none' }}>Contact</Link></li>
        </nav>
    );
};

export default Navbar;
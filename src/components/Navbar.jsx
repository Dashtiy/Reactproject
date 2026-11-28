import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav style={{ display: 'flex', gap: '20px', padding: '15px', background: '#222', color: '#fff' }}>
            <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>
            <Link to="/about" style={{ color: '#fff', textDecoration: 'none' }}>About</Link>
            <Link to="/projects" style={{ color: '#fff', textDecoration: 'none' }}>Projects</Link>
            <Link to="/game" style={{ color: '#fff', textDecoration: 'none' }}>Crypto Game</Link>
        </nav>
    );
}


export default Navbar;
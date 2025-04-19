import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = '/'; // Redirect to login
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/student" style={{textDecoration:"none", color:"white"}}>
        <span>🧠 NeuroWell</span></Link>
        
      </div>

      <ul className="navbar-links">
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
        <li>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

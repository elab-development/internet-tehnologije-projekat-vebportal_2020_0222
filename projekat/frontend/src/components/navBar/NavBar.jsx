import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <div>
      <nav className="navbar">
        <ul className="navbar-list">
        <li className="navbar-title">
            <h1>SPORTSKI PORTAL</h1>
          </li>
          <li className="navbar-item">
            <Link to="/" className="navbar-link">Početna strana</Link>
          </li>
          <li className="navbar-item">
            <Link to="/nba" className="navbar-link">NBA</Link>
          </li>
          <li className="navbar-item">
            <Link to="/evroliga" className="navbar-link">Evroliga</Link>
          </li>
          <li className="navbar-item">
            <Link to="/evrokup" className="navbar-link">Evrokup</Link>
          </li>
          <li className="navbar-item">
            <Link to="/login" className="navbar-link">Login</Link> 
          </li>
          <li className="navbar-item">
            <Link to="/articleDetails" className="navbar-link">AddArticle</Link> 
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;

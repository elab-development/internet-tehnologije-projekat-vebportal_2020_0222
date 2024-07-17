import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';

function NavBar({ isLoggedIn, isAdmin }) {
  return (
    <div>
      <nav className="navbar">
        <ul className="navbar-list">
          <li className="navbar-title">
            <h1>SPORTSKI PORTAL</h1>
          </li>
          <li className="navbar-item">
            <Link to="/articles" state={{ id: 0 }} className="navbar-link">Početna strana</Link>
          </li>
          <li className="navbar-item">
            <Link to="/articles" state={{ id: 1 }} className="navbar-link">NBA</Link>
          </li>
          <li className="navbar-item">
            <Link to="/articles" state={{ id: 2 }} className="navbar-link">Evroliga</Link>
          </li>
          <li className="navbar-item">
            <Link to="/articles" state={{ id: 3 }} className="navbar-link">Evrokup</Link>
          </li>
          {isLoggedIn ? (
            <li className="navbar-item">
              <Link to="/user" className="navbar-link">Korisnik</Link>
            </li>
          ) : (
            <li className="navbar-item">
              <Link to="/login" className="navbar-link">Login</Link>
            </li>
          )}
          {isAdmin && (
            <li className="navbar-item">
              <Link to="/addArticle" className="navbar-link">Dodaj članak</Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;

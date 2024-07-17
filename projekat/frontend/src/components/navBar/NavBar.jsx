import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

function NavBar({ isLoggedIn, isAdmin }) {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <h1>SPORTSKI PORTAL</h1>
          </li>
          <li>
            <Link to="/articles" state={{ id: 0 }}>
              Početna strana
            </Link>
          </li>
          <li>
            <Link to="/articles" state={{ id: 1 }}>
              NBA
            </Link>
          </li>
          <li>
            <Link to="/articles" state={{ id: 2 }}>
              Evroliga
            </Link>
          </li>
          <li>
            <Link to="/articles" state={{ id: 3 }}>
              Evrokup
            </Link>
          </li>
          {isLoggedIn ? (
            <li>
              <Link to="/user">Korisnik</Link>
            </li>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
          {isAdmin && (
            <li>
              <Link to="/addArticle">Dodaj članak</Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;

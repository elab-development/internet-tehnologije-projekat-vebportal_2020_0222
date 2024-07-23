import React, { useState } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { searchArticles } from "../../services/articleService";

function NavBar({ isLoggedIn, isAdmin }) {

  const [search, setSearch] = useState("");

  const handleSearchChange = (e) =>{

      setSearch(e.target.value);

  }

  const handleSearchSubmit = async(e) =>{

    try {
      e.preventDefault();
      const data = await searchArticles(search);
      

    } catch (error) {
      
    }
    

    
  }

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
          <li>
          <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Pretraga..."
                value={search}
                onChange={handleSearchChange}
              />
              <button type="submit">Pretraži</button>
            </form>
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

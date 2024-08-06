import React, { useState } from "react";
import "./NavBar.css";
import { Link, useNavigate } from "react-router-dom";
import { searchArticles } from "../../services/articleService";

function NavBar({ isLoggedIn, isAdmin }) {

  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (e) =>{

      setSearch(e.target.value);

  }

  const handleSearchSubmit = async(e) =>{

    try {
      e.preventDefault();
      const pretraga = {
        search:search
      }
      const data = await searchArticles(pretraga);
      const articles = data.clanci;
      setSearch("");
      navigate("/searchArticle",{state:{articles}});

    } catch (error) {
      alert("Nema clanaka sa tim imenom!");
    }
    
  }

  const clickHandlerTitle = (e) =>{

    e.preventDefault();
    navigate("/");

  }

  return (
    <div className="navbar-container">
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <h1 className="navbar-title" onClick={clickHandlerTitle}>SPORTSKI PORTAL</h1>
        </li>
        <li className="navbar-item">
          <Link className="navbar-link" to="/articles" state={{ id: 0 }}>
            Početna strana
          </Link>
        </li>
        <li className="navbar-item">
          <Link className="navbar-link" to="/articles" state={{ id: 1 }}>
            NBA
          </Link>
        </li>
        <li className="navbar-item">
          <Link className="navbar-link" to="/articles" state={{ id: 2 }}>
            Evroliga
          </Link>
        </li>
        <li className="navbar-item">
          <Link className="navbar-link" to="/articles" state={{ id: 3 }}>
            Evrokup
          </Link>
        </li>
        <li className="navbar-item">
          <form className="navbar-search-form" onSubmit={handleSearchSubmit}>
            <input
              className="navbar-search-input"
              type="text"
              placeholder="Pretraga..."
              value={search}
              onChange={handleSearchChange}
            />
            <button className="navbar-search-button" type="submit">Pretraži</button>
          </form>
        </li>
        {isLoggedIn ? (
          <li className="navbar-item">
            <Link className="navbar-link" to="/user">Korisnik</Link>
          </li>
        ) : (
          <li className="navbar-item">
            <Link className="navbar-link" to="/login">Login</Link>
          </li>
        )}
        {isAdmin && (
          <li className="navbar-item">
            <Link className="navbar-link" to="/addArticle">Dodaj članak</Link>
          </li>
        )}
      </ul>
    </nav>
  </div>
  );
}

export default NavBar;

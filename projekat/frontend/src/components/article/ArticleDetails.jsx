import React from "react";
import "./ArticleDetails.css";
import { useLocation, useNavigate } from "react-router-dom";

const ArticleDetails = () => {
  const location = useLocation();
  const { article } = location.state || {};
  const navigate = useNavigate();

  const clickHandler = (e) => {
    e.preventDefault();
    const kategorija = article.categories.category_id;
    //dodati navigaciju ka
  };

  return (
    <div className="article-container">
      <h1 className="article-title">{article.title}</h1>
      <div className="article-meta">
        <span>
          Autor: {article.authors.name} {article.authors.surname}
        </span>
        <span>Datum: {article.publishing_date}</span>
        <span onClick={clickHandler}>
          Kategorija: {article.categories.name}
        </span>
      </div>
      <div className="button-container">
        <button className="button-details">Prikazi komentare</button>
        <button className="button-details">Komentari</button>
      </div>

      <p className="article-text">{article.content}</p>
    </div>
  );
};

export default ArticleDetails;

import React from "react";
import "./ArticleDetails.css";
import { useLocation, useNavigate } from "react-router-dom";
import ButtonComment from "../button-comment/ButtonComment";

const ArticleDetails = () => {
  const location = useLocation();
  const { article } = location.state || {};
  const navigate = useNavigate();

  const clickHandler = (e) => {
    e.preventDefault();
    const kategorija = article.categories.category_id;
  };

  const commentsHandler = (e) =>{

    e.preventDefault();
    navigate("/commentsView",{state:{article}});

  }

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
        <button className="button-details" onClick={commentsHandler}>Prikazi komentare</button>
        <ButtonComment articleId={article.article_id}/>
      </div>

      <p className="article-text">{article.content}</p>
    </div>
  );
};

export default ArticleDetails;

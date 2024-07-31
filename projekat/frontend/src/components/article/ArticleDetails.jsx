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
    navigate("/articles", { state: { id: kategorija } });
  };

  const commentsHandler = (e) => {
    e.preventDefault();
    if (article.number_of_comments === 0) {
      return;
    }
    console.log("Clanak: " + JSON.stringify(article));
    navigate("/commentsView", { state: { article } });
  };

  return (
    <div className="article-details-container">
      <h1 className="article-details-title">{article.title}</h1>
      <div className="article-details-header">
        <div className="article-details-info">
          <span>
            Autor: {article.authors.name} {article.authors.surname}
          </span>
          <span>Datum: {article.publishing_date}</span>
          <span onClick={clickHandler}>
            Kategorija: {article.categories.name}
          </span>
        </div>
      </div>
      <div className="article-details-buttons">
        <button className="article-details-button" onClick={commentsHandler}>
          Prikazi komentare
        </button>
        <ButtonComment articleId={article.article_id} />
      </div>
      <div className="article-details-body">
        <div className="article-details-image-wrapper">
          <img
            className="article-details-image"
            src={article.image_url}
            alt={article.title}
          />
        </div>
        <p className="article-details-content">{article.content}</p>
      </div>
    </div>
  );
};

export default ArticleDetails;

import React, { useState } from "react";
import "./MainArticle.css";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

function MainArticle({ article }) {
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate("/articleDetails", { state: { article } });
  };

  const commentsHandler = (e) => {
    e.preventDefault();
    if (article.number_of_comments === 0) {
      return;
    }
    console.log("Dugme");
    navigate("/commentsView", { state: { article } });
  };

  return (
    <div className="col-md-4 mb-3">
      <article className="card-main">
        <div className="message-button" onClick={commentsHandler}>
          <span className="comment-count">{article.number_of_comments}</span>
          <i className="fas fa-comment-alt" content="4"></i>
        </div>
        <div className="card-body-main">
          <div className="card-content-main">
            <h3 className="card-content-author">
              {article.authors.name} {article.authors.surname}
            </h3>
            <h1 className="card-title-main" onClick={clickHandler}>
              {article.title}
            </h1>
          </div>
          <div className="card-images">
            <img src={article.image_url}></img>
          </div>
        </div>
      </article>
    </div>
  );
}

export default MainArticle;

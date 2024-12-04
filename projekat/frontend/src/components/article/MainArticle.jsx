import React from "react";
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
    navigate("/commentsView", { state: { article } });
  };

  return (
    <div className="main-article-container">
      <article className="main-article-article">
        <div className="main-article-header">
          <div className="main-article-author">
            {article.authors.name} {article.authors.surname}
          </div>
          <div className="main-article-comments" onClick={commentsHandler}>
            <span className="main-article-comment-count">{article.number_of_comments}</span>
            <i className="main-article-comment-icon fas fa-comments"></i>
          </div>
        </div>
        <div className="main-article-body">
          <div className="main-article-title-wrapper">
            <h1 className="main-article-title" onClick={clickHandler}>
              {article.title}
            </h1>
          </div>
          <div className="main-article-image-wrapper">
            <img className="main-article-image" src={article.image_url} alt={article.title} />
          </div>
        </div>
      </article>
    </div>
  );
}

export default MainArticle;

import React from "react";
import "./Article.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";

function Article({ article }) {
  const navigate = useNavigate();

  const clickHandler = (e) => {
    e.preventDefault();
    navigate("/articleDetails", { state: { article } });
  };

  const commentsHandler = async (e) => {
    e.preventDefault();
    if (article.number_of_comments === 0) {
      return 0;
    }
    navigate("/commentsView", { state: { article } });
  };

  return (
    <div className="article-container">
      <article className="article-article">
        <div className="article-header">
          <div className="article-comments" onClick={commentsHandler}>
            <span className="article-comment-count">{article.number_of_comments}</span>
            <i className="fas fa-comment article-comment-icon"></i>
          </div>
        </div>
        <div className="article-body">
          <div className="article-image-wrapper">
            <img className="article-image" src={article.image_url} alt="Article" />
          </div>
          <div className="article-title-wrapper">
            <h1 className="article-title" onClick={clickHandler}>
              {article.title}
            </h1>
          </div>
        </div>
      </article>
    </div>
  );
}

export default Article;

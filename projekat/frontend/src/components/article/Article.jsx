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
    if(article.number_of_comments === 0){
      return 0;
    }
    navigate("/commentsView", { state: { article } });
  };

  return (
    <div className="col-md-4 mb-3">
      <article className="card">
        <div className="message-button-article" onClick={commentsHandler}>
          <span className="comment-count">{article.number_of_comments}</span>
          <i className="fas fa-comment-alt" content="4"></i>
        </div>
        <div className="card-images">
          <img src={article.image_url} alt="Article" />
        </div>
        <div className="card-body">
          <h1 className="card-title" onClick={clickHandler}>
            {article.title}
          </h1>
        </div>
      </article>
    </div>
  );
}

export default Article;

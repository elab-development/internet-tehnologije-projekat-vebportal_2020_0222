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
    <div>
      <article>
        <div  onClick={commentsHandler}>
          <span >{article.number_of_comments}</span>
          <i  content="4"></i>
        </div>
        <div >
          <img src={article.image_url} alt="Article" />
        </div>
        <div>
          <h1 onClick={clickHandler}>
            {article.title}
          </h1>
        </div>
      </article>
    </div>
  );
}

export default Article;

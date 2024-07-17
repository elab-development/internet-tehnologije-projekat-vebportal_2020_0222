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
    <div>
      <article >
        <div onClick={commentsHandler}>
          <span >{article.number_of_comments}</span>
          <i content="4"></i>
        </div>
        <div >
          <div>
            <h3>
              {article.authors.name} {article.authors.surname}
            </h3>
            <h1 onClick={clickHandler}>
              {article.title}
            </h1>
          </div>
          <div>
            <img src={article.image_url}></img>
          </div>
        </div>
      </article>
    </div>
  );
}

export default MainArticle;

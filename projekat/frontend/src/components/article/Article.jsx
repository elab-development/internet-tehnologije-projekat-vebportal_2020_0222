import React, { useState } from "react";
import "./Article.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";
import { getCommentsByArticleId } from "../../services/commentService";

function Article({ article, index }) {

  const navigate = useNavigate();

  const clickHandler = (e)=>{

    e.preventDefault();
    console.log("Komentari moji grobari!");
    navigate("/articleDetails", { state: { article } });
    

  }

  const commentsHandler = async (e) =>{

    e.preventDefault();
    navigate("/commentsView",{state:{article}});
  }


  return (
    <div className="col-md-4 mb-3">
      <article className="card">
      <div className="message-button-article"  onClick={commentsHandler}   >
        <span className="comment-count">4</span>
          <i className="fas fa-comment-alt" content="4"></i>
        </div>
        <div className="card-body">
          <h1 className="card-title" onClick={clickHandler}>{article.title}</h1>
        </div>
      </article>
    </div>
  );
}

export default Article;

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
    navigate("/articles",{state:{id:kategorija}});
  };

  const commentsHandler = (e) =>{

    e.preventDefault();
    if (article.number_of_comments === 0) {
        return;
      }
    console.log("Clanak: " + JSON.stringify(article));
    navigate("/commentsView",{state:{article}});

  }

  return (
    <div>
      <h1>{article.title}</h1>
      <div>
        <span>
          Autor: {article.authors.name} {article.authors.surname}
        </span>
        <span>Datum: {article.publishing_date}</span>
        <span onClick={clickHandler}>
          Kategorija: {article.categories.name}
        </span>
      </div>
      <div>
        <button onClick={commentsHandler}>Prikazi komentare</button>
        <ButtonComment articleId={article.article_id}/>
      </div>

      <img src={article.image_url}></img>
      <p>{article.content}</p>
    </div>
  );
};

export default ArticleDetails;

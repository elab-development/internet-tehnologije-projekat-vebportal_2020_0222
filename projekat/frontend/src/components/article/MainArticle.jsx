import React, { useState } from "react";
import "./MainArticle.css";
import {useNavigate } from "react-router-dom";




function MainArticle({ article }) {

 const navigate = useNavigate();

 const clickHandler = () =>{

    navigate("/articleDetails", {state:{article}});
   

 }

  return (
    <div className="col-md-4 mb-3" onClick={clickHandler}>
      <article className="card-main">
        <div className="card-body-main">
          <div className="card-content-main">
            <h3 className="card-content-author">
              {article.authors.name} {article.authors.surname}
            </h3>
            <h1 className="card-title-main">{article.title}</h1>
          </div>
          <div className=".card-images">
          </div>
        </div>
      </article>
    </div>
  );
}

export default MainArticle;

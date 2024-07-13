import React, { useState } from "react";
import "./Article.css";

function Article({ article, index }) {



  return (
    <div className="col-md-4 mb-3">
      <article className="card">
        <div className="card-body">
          <h1 className="card-title">{article.title}</h1>
        </div>
      </article>
    </div>
  );
}

export default Article;

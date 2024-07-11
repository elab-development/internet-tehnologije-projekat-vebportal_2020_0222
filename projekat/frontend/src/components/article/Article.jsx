import React from "react";
import "./Article.css";

function Article({ article, index }) {
  return (
    <div className="col-md-4 mb-3">
      <article className="card">
        <div className="card-body">
          <h2 className="card-title">{article.title}</h2>
        </div>
      </article>
    </div>
  );
}

export default Article;

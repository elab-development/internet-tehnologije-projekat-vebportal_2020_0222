import React from "react";
import { useLocation } from "react-router-dom";
import Article from "./Article";
import "./SearchedArticles.css";

function SearchedArticles() {
  const location = useLocation();
  const { articles } = location.state || {};

  return (
    <div>
      <div className="divac">
        {articles.map((article, index) => (
          <Article key={index} article={article} />
        ))}
      </div>
    </div>
  );
}

export default SearchedArticles;

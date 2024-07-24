import React from "react";
import { useLocation } from "react-router-dom";
import Article from "./Article";

function SearchedArticles() {
  const location = useLocation();
  const { articles } = location.state || {};

  return (
    <div>
      <div>
        {articles.map((article, index) => (
          <Article key={index} article={article} />
        ))}
      </div>
    </div>
  );
}

export default SearchedArticles;

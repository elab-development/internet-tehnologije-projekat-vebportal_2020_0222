import React, { useEffect, useState } from "react";
import { index } from "../../services/articleService";
import Article from "../article/Article";
import NavBar from "../navBar/NavBar";
import "./HomePage.css";
import MainArticle from "../article/MainArticle";

function HomePage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const artikli = await index();
      console.log(artikli.clanci);
      setArticles(artikli.clanci);
    }

    fetchData();
  }, []);

  return (
    <div className="homepage">
      <div>
        {articles.length > 0 ? (
          <>
            <div className="homepage-main-article">
              <MainArticle article={articles[0]} />
            </div>
            <div className="articles">
              {articles.slice(1).map((article, index) => (
                <Article key={index} article={article} />
              ))}
            </div>
          </>
        ) : (
          <p className="text-center w-100">Nema članaka u sistemu!</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;

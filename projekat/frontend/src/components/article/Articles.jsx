import React, { useState, useEffect } from "react";
import { getArticlesByCategory, index } from "../../services/articleService";
import Article from "./Article";
import MainArticle from "./MainArticle";
import { useLocation } from "react-router-dom";
import { getStandings } from "../../services/rapidApiService";
import Standings from "../standings/Standings";
import "./Articles.css";

function Articles() {
  const location = useLocation();
  const { id } = location.state || 0;
  const [articles, setArticles] = useState([]);
  const [standings, setStandings] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (id === 0) {
        const artikli = await index();
        setArticles(artikli.clanci.data);
      } else {
        const artikli = await getArticlesByCategory(id);
        setArticles(artikli.clanci.data);
      }

      //const tabela = await getStandings(138, 53198);
      //setStandings(tabela.standings);
    }

    fetchData();
  }, [id]);

  const renderArticles = (articles) => {
    const articleChunks = [];
    for (let i = 0; i < articles.length; i += 2) {
      articleChunks.push(articles.slice(i, i + 2));
    }
    return articleChunks.map((chunk, index) => (
      <div className="articles-row" key={index}>
        {chunk.map((article, idx) => (
          <Article key={idx} article={article} />
        ))}
      </div>
    ));
  };

  return (
    <div>
      <div>
        {articles && articles.length > 0 ? (
          <>
            <div>
              <MainArticle article={articles[0]} />
            </div>
            {renderArticles(articles.slice(1, 3))}
            <div>
              {/* <Standings standings={standings} /> */}
            </div>
            {renderArticles(articles.slice(3))}
          </>
        ) : (
          <p>Učitavanje...</p>
        )}
      </div>
    </div>
  );
}

export default Articles;


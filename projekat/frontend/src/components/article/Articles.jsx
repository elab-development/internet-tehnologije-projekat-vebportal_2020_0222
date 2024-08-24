import React, { useState, useEffect } from "react";
import { getArticlesByCategory, index } from "../../services/articleService";
import Article from "./Article";
import MainArticle from "./MainArticle";
import { useLocation } from "react-router-dom";
import Standings from "../standings/Standings";
import "./Articles.css";
import useStandings from "../../customHooks/useStandings";

function Articles() {
  const location = useLocation();
  const { id } = location.state || 0;
  const [articles, setArticles] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [showButton, setShowButton] = useState(true);
  const [tournamentId, setTournamentId] = useState(138);
  const [seasonId, setSeasonId] = useState(53198);

  /* const {standings,loading,error} = useStandings({tournamentId,seasonId}); */

  useEffect(() => {
    async function fetchData() {
      if (id === 0) {
        const artikli = await index();
        setArticles(artikli.clanci.data);
      } else {
        const artikli = await getArticlesByCategory(id);
         if(id === 2){
          setTournamentId(138);
          setSeasonId(53198);
        }
        else if(id === 3){
          setTournamentId(141);
          setSeasonId(52934);
        }
        else{
          setTournamentId(0);
        }
        setArticles(artikli.clanci.data);
      }
      setPageNumber(2);

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

  const loadMoreArticles = async () => {
    try {
      let loadedArticles;
      setPageNumber((prev) => prev + 1);
      if(id === 0){
        const response = await index(pageNumber);
        console.log("Uslo ovdje index!");
        loadedArticles = response.clanci.data;
      }

      else{
        const response = await getArticlesByCategory(id,pageNumber);
        console.log("Uslo ovdje drugo!");
        loadedArticles = response.clanci.data;
      }

      if(loadedArticles.length === 0){
        setShowButton(false);
        return;
      }
      console.log("Dodati clanci:" + JSON.stringify(loadedArticles));
      setArticles([...articles, ...loadedArticles]);
    } catch (error) {
      alert(error.message);
    }
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
            {/* {loading ? (
              <p>Učitavanje tabele...</p>
            ) : (
              { <div>
                <Standings standings={standings} />
              </div> }
            )} */}
            {renderArticles(articles.slice(3))}
            <div className="articles-button-containter">
              {showButton ? (
                <button
                  className="articles-button-show-more"
                  onClick={loadMoreArticles}
                >
                  Učitaj više
                </button>
              ) : null}
            </div>
          </>
        ) : (
          <p>Učitavanje...</p>
        )}
      </div>
    </div>
  );
  
}

export default Articles;

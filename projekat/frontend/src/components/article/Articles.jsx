import React, { useState, useEffect } from "react";
import { getArticlesByCategory, index } from "../../services/articleService";
import Article from "./Article";
import MainArticle from "./MainArticle";
import { useLocation } from "react-router-dom";
import { getCommentsByArticleId } from "../../services/commentService";
import { getStandings } from "../../services/rapidApiService";
import Standings from "../Standings";

function Articles() {
  const location = useLocation();
  const { id } = location.state || 0;
  const [articles, setArticles] = useState([]);
  const [commentsArticles, setCommentsArticles] = useState([]);
  const [standings, setStandings] = useState([]);
  const [tournamentId, setTournamentId] = useState(null);

  //Evroliga 138, Evrokup 148, 
  useEffect(() => {
    async function fetchData() {
      if (id === 0) {
        const artikli = await index();
        console.log("Artikli: " + artikli.clanci.data);
        setArticles(artikli.clanci.data);
      } else {
        console.log("Usao drugo: " + id);
        const artikli = await getArticlesByCategory(id);
        console.log(artikli);
        setArticles(artikli.clanci.data);
      }

      const tabela = await getStandings(138, 53198);
      setStandings(tabela.standings);
      console.log("Tablica: " + JSON.stringify(tabela.standings));
      console.log(JSON.stringify(commentsArticles));
      console.log("Bok decki: " + id);
    }

    fetchData();
  }, [id]);

  return (
    <div>
      <div>
        {articles && articles.length > 0 ? (
          <>
            <div>
              <MainArticle article={articles[0]} />
            </div>
            <div>
              {articles.slice(1).map((article, index) => (
                <Article key={index} article={article} />
              ))}
            </div>
            <div>
              <Standings standings={standings}></Standings>
            </div>
          </>
        ) : (
          <p>Nema članaka u sistemu!</p>
        )}
      </div>
    </div>
  );
}

export default Articles;

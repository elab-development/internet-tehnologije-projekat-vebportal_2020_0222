import React, { useState, useEffect } from "react";
import { getArticlesByCategory, index } from "../../services/articleService";
import Article from "./Article";
import MainArticle from "./MainArticle";
import { useLocation } from "react-router-dom";
import { getCommentsByArticleId } from "../../services/commentService";

function Articles() {
  const location = useLocation();
  const { id } = location.state || 0;
  const [articles, setArticles] = useState([]);
  const [commentsArticles, setCommentsArticles] = useState([]);
  
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
        setArticles(artikli.clanci);
      }

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
          </>
        ) : (
          <p>Nema članaka u sistemu!</p>
        )}
      </div>
    </div>
  );
}

export default Articles;

import React, { useEffect, useState } from 'react';
import { index } from '../../services/articleService';
import Article from '../article/Article';
import NavBar from '../navBar/NavBar'; 
import './HomePage.css';
import MainArticle from '../article/MainArticle';


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
      <div className="container mt-4">
        <div className="row">
          {articles.length > 0 ? (
             <>
             <MainArticle article={articles[0]} />
             {articles.map((article, index) => (
               <Article key={index} article={article} />
             ))}
           </>
          ) : (
            <p className="text-center w-100">Nema članaka u sistemu!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;

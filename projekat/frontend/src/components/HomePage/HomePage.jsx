import React, { useEffect, useState } from "react";
import { index } from "../../services/articleService";
import Article from "../article/Article";
import NavBar from "../navBar/NavBar";
import MainArticle from "../article/MainArticle";
import Articles from "../article/Articles";
import { useNavigate } from "react-router-dom";

function HomePage() {

  const navigate = useNavigate();

  useEffect(()=>{

    navigate("/articles",{state:{id:0}});

  },);
    
  
  return (
    <div>
      <h1>Učitavanje...</h1>
    </div>
  );
}

export default HomePage;

import React, { useEffect, useState } from "react";
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

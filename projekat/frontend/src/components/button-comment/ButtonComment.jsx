import React from 'react'
import { useNavigate } from 'react-router-dom';

function ButtonComment({articleId}) {

  const navigate = useNavigate();

  const buttonHandler = (e) =>{

    e.preventDefault();

    navigate("/addComment", {state:{articleId}});

  }

  return (
    <button onClick={buttonHandler}>Komentariši</button>
  )
}

export default ButtonComment
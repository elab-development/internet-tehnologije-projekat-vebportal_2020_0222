import React from "react";
import { useNavigate } from "react-router-dom";

function ButtonComment({ articleId }) {
  const navigate = useNavigate();

  const buttonHandler = (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      navigate("/addComment", { state: { articleId } });
      return;
    }

    navigate("/login");
  };

  return <button onClick={buttonHandler}>Komentariši</button>;
}

export default ButtonComment;

import React from "react";
import { useNavigate } from "react-router-dom";
import './ButtonComment.css';
import { showCommentByUserAndArticle } from "../../services/commentService";

function ButtonComment({ articleId }) {
  const navigate = useNavigate();

  const buttonHandler = async (e) => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if(!user){
        navigate("/login");
        return;
      }
      const userId = user.user_id;
      await showCommentByUserAndArticle(articleId,userId);
      
    } catch (error) {
      alert(error.message);
      return;
    }

    navigate("/addComment", { state: { articleId } });
  };

  return (
    <button className="buttonComment-btn" onClick={buttonHandler}>
      Komentariši
    </button>
  );
}

export default ButtonComment;

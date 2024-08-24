import React, { useState } from "react";
import {
  addNegativeVotes,
  addPositiveVotes,
  destroy,
} from "../../services/commentService";
import { useNavigate } from "react-router-dom";
import "./CommentComp.css";

function CommentComp({ comment }) {
  const [positive, setPositive] = useState(comment.positive_votes);
  const [negative, setNegative] = useState(comment.negative_votes);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const addPositiveVote = async (e) => {
    e.preventDefault();
    try {
      const comment2 = await addPositiveVotes(comment.comment_id);
      console.log(JSON.stringify(comment2.komentari));
      setPositive(comment2.komentari.positive_votes);
    } catch (error) {
      console.log(error.message);
      navigate("/login");
    }
  };

  const addNegativeVote = async (e) => {
    e.preventDefault();
    try {
      console.log("Usao ovde!");
      await addNegativeVotes(comment.comment_id);
      setNegative((prev) => prev + 1);
    } catch (error) {
      console.log(error.message);
      navigate("/login");
    }
  };

  const userHandler = (e) => {
    e.preventDefault();
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if(!loggedUser){
      navigate("/login");
      return;
    }
    const user = comment.users;
    console.log("Najnovije: " + JSON.stringify(user));
    navigate("/showUser", { state: { user } });
  };

  const deleteHandler = async(commentId) =>{

    try {
      await destroy(commentId);
      alert("Uspelo je brisanje komentara!");
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }

  }

  return (
    <div className="commentComp-container">
      <div className="commentComp-header">
        <div className="commentComp-avatar" onClick={userHandler}>
          {comment.users.name.charAt(0)}
        </div>
        <div className="commentComp-userInfo">
          <span className="commentComp-userName" onClick={userHandler}>
            {comment.users.name}
          </span>
        </div>
      </div>
      <div className="commentComp-text">{comment.text}</div>
      <div className="commentComp-votes">
        <button
          className="commentComp-voteButton positive"
          onClick={addPositiveVote}
        >
          +
        </button>
        <span className="commentComp-voteCount">{positive}</span>
        <button
          className="commentComp-voteButton negative"
          onClick={addNegativeVote}
        >
          -
        </button>
        <span className="commentComp-voteCount">{negative}</span>
        {user && user.isAdmin ? (
          <button className="commentComp-deleteButton" onClick={()=>deleteHandler(comment.comment_id)}>
            Obriši komentar
          </button>
        ):<></>}
      </div>
    </div>
  );
}

export default CommentComp;
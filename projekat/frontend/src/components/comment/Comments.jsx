import React, { useState } from "react";
import "./Comments.css";
import { addNegativeVotes, addPositiveVotes } from "../../services/commentService";

function Comments({ comment }) {

    const [positive, setPositive] = useState(comment.positive_votes);
    const [negative, setNegative] = useState(comment.negative_votes);


  const addPositiveVote = async (e) =>{

    e.preventDefault();
    try {
        await addPositiveVotes(comment.comment_id);
        setPositive(prev=>prev+1);
    } catch (error) {
        alert(error.message);
    }
    

  }

  const addNegativeVote = async (e) =>{

    e.preventDefault();
    try {
        await addNegativeVotes(comment.comment_id);
        setNegative(prev=>prev+1);
    } catch (error) {
        alert(error.message);
    }
    

  }

  return (
    <div className="comment-container">
      <div className="comment-header">
        <div className="avatar">{comment.users.name.charAt(0)}</div>
        <div className="username-time">
          <span className="username">{comment.users.name}</span>
          <span className="time">fasdf</span>
        </div>
      </div>
      <div className="comment-content">{comment.text}</div>
      <div className="comment-footer">
        <div className="votes">
          <button className="vote-button upvote" onClick={addPositiveVote}>+</button>
          <span className="vote-count">{positive}</span>
          <button className="vote-button downvote" onClick={addNegativeVote}>-</button>
          <span className="vote-count">{negative}</span>
        </div>
      </div>
    </div>
  );
}

export default Comments;

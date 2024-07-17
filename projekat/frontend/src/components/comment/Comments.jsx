import React, { useState } from "react";
import "./Comments.css";
import { addNegativeVotes, addPositiveVotes } from "../../services/commentService";

function Comments({ comment }) {

    const [positive, setPositive] = useState(comment.positive_votes);
    const [negative, setNegative] = useState(comment.negative_votes);


  const addPositiveVote = async (e) =>{

    e.preventDefault();
    try {
        const comment2 = await addPositiveVotes(comment.comment_id);
        console.log(JSON.stringify(comment2.komentari));
        setPositive(comment2.komentari.positive_votes);
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
    <div >
      <div >
        <div >{comment.users.name.charAt(0)}</div>
        <div>
          <span>{comment.users.name}</span>
          <span>fasdf</span>
        </div>
      </div>
      <div>{comment.text}</div>
      <div >
        <div>
          <button onClick={addPositiveVote}>+</button>
          <span >{positive}</span>
          <button onClick={addNegativeVote}>-</button>
          <span >{negative}</span>
        </div>
      </div>
    </div>
  );
}

export default Comments;

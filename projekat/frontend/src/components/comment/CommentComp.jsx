import React, { useState } from "react";
import {
  addNegativeVotes,
  addPositiveVotes,
} from "../../services/commentService";
import { useNavigate } from "react-router-dom";

function CommentComp({ comment }) {
  const [positive, setPositive] = useState(comment.positive_votes);
  const [negative, setNegative] = useState(comment.negative_votes);
  const navigate = useNavigate();

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
      await addNegativeVotes(comment.comment_id);
      setNegative((prev) => prev + 1);
    } catch (error) {
      console.log(error.message);
      navigate("/login");
    }
  };

  const userHandler = (e) => {
    e.preventDefault();
    const user = comment.users;
    console.log("Najnovije: " + JSON.stringify(user));
    navigate("/showUser", { state: { user } });
  };

  return (
    <div>
      <div>
        <div onClick={userHandler}>{comment.users.name.charAt(0)}</div>
        <div>
          <span>{comment.users.name}</span>
          <span>fasdf</span>
        </div>
      </div>
      <div>{comment.text}</div>
      <div>
        <div>
          <button onClick={addPositiveVote}>+</button>
          <span>{positive}</span>
          <button onClick={addNegativeVote}>-</button>
          <span>{negative}</span>
        </div>
      </div>
    </div>
  );
}

export default CommentComp;

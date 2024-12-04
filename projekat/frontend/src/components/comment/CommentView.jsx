import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getCommentsByArticleId, getCommentsWithMostNegativeVotes, getCommentsWithMostPositiveVotes } from "../../services/commentService";
import './CommentView.css';
import ButtonComment from "../button-comment/ButtonComment";
import CommentComp from "./CommentComp";

function CommentView() {
  const location = useLocation();
  const { article } = location.state || {};
  const [comments, setComments] = useState([]);
  
  useEffect(() => {
    async function fetchData() {
      const comms = await getCommentsByArticleId(article.article_id);
      setComments(comms.komentari);
    }

    fetchData();
  }, [article]);

  const positiveHandler = async (e) => {
    try {
      e.preventDefault();
      const positive = await getCommentsWithMostPositiveVotes(article.article_id);
      console.log("Pozitiva: " + JSON.stringify(positive));
      setComments(positive.komentari);
    } catch (error) {
      alert(error.message);
    }
  }

  const negativeHandler = async (e) => {
    try {
      e.preventDefault();
      const negative = await getCommentsWithMostNegativeVotes(article.article_id);
      console.log("Negativac: " + JSON.stringify(negative));
      setComments(negative.komentari);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="commentView-container">
      {comments.length === 0 ? (
        <h1 className="commentView-loading">Učitavanje...</h1>
      ) : (
        <div>
          <h2 className="commentView-title">{article.title}</h2>
          <ButtonComment articleId={article.article_id}></ButtonComment>
          <div className="commentView-buttons">
            <h4 onClick={positiveHandler}>Pozitivni</h4>
            <h4 onClick={negativeHandler}>Negativni</h4>
          </div>
          <div className="commentView-comments">
            {comments.map((comment, index) => (
              <CommentComp key={index} index={index} comment={comment} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CommentView;

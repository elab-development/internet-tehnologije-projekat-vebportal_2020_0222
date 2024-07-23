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
      console.log("Komentari" + JSON.stringify(comms.komentari));
      setComments(comms.komentari);
    }

    fetchData();
  }, [article]);

  const positiveHandler = async(e) =>{

    try {
        e.preventDefault();
        const positive = await getCommentsWithMostPositiveVotes(article.article_id);
        console.log("Pozitiva: " + JSON.stringify(positive.komentari));
        setComments(positive.komentari);

    } catch (error) {
        console.log(error.message);
    }

  }

  const negativeHandler = async(e) =>{

    try {
        e.preventDefault();
        const negative = await getCommentsWithMostNegativeVotes(article.article_id);
        console.log("Pozitiva: " + JSON.stringify(negative.komentari));
        setComments(negative.komentari);

    } catch (error) {
        alert(error.message);
    }

  }

  return (
    <div>
      {comments.length === 0 ? (
        <h1>Učitavanje...</h1>
      ) : (
        <div>
          <h2>{article.title}</h2>
          <ButtonComment articleId={article.article_id}></ButtonComment>
          <div>
            <h4 onClick={positiveHandler}>Pozitivni</h4>
            <h4 onClick={negativeHandler}>Negativni</h4>
          </div>
          <div>
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

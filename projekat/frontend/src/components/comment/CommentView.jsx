import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getCommentsByArticleId } from "../../services/commentService";
import Comments from "./Comments";
import './CommentView.css';

function CommentView() {
  const location = useLocation();
  const { article } = location.state || {};
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const comms = await getCommentsByArticleId(article.article_id);
      console.log(JSON.stringify(comms.komentari));
      setComments(comms.komentari);
    }

    fetchData();
  }, [article]);

  return (
    <div className="comment-view-container">
      {comments.length === 0 ? (
        <h1>Učitavanje...</h1>
      ) : (
        <div>
          <h2 className="comments-article-title">{article.title}</h2>
          <button className="button-details">Komentariši</button>
          <div className="comments-list">
            <h4>Hronoloski</h4>
            <h4>Pozitivni</h4>
            <h4>Negativni</h4>
          </div>
          <div className="comments">
            {comments.map((comment, index) => (
              <Comments key={index} index={index} comment={comment} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CommentView;

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCommentsByUserId } from '../../services/commentService';
import CommentComp from '../comment/CommentComp';
import { show } from '../../services/articleService';
import { banUser } from '../../services/userService';
import './ShowUser.css';

function ShowUser() {
  const location = useLocation();
  const { user } = location.state || {};
  const [comments, setComments] = useState([]);
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();

  const handleComments = async (e) => {
    e.preventDefault();

    try {
      const comments = await getCommentsByUserId(user.user_id);
      setComments(comments.komentari);
      setFlag(true);
    } catch (error) {
      console.error(error);
    }
  };

  const openArticleHandler = async (articleId) => {
    try {
      const data = await show(articleId);
      const article = data.article;
      navigate("/articleDetails", { state: { article } });
    } catch (error) {
      alert("Greska prilikom ucitavanja artikla!");
    }
  };

  const banUserHandler = async (user_id) => {
    try {
      await banUser(user_id);
      alert("Korisnik je uspesno banovan!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="showUser-container">
      <label className="showUser-label">Ime i prezime: </label>
      <input type="text" value={`${user.name} ${user.surname}`} readOnly className="showUser-input" />
      <label className="showUser-label">Email:</label>
      <input type="text" value={user.email} readOnly className="showUser-input" />
      <label className="showUser-label">Username: </label>
      <input type="text" value={user.username} readOnly className="showUser-input" />
      <button onClick={handleComments} className="showUser-button">Prikazi sve komentare korisnika</button>
      <button onClick={() => banUserHandler(user.user_id)} className="showUser-button">Banuj korisnika</button>
      {comments && (
        <div className="showUser-comments" readOnly={flag}>
          {comments.map((comment, index) => (
            <div key={index} className="showUser-comment">
              <h3 className="showUser-commentTitle" onClick={() => openArticleHandler(comment.articles.article_id)}>
                {comment.articles.title}
              </h3>
              <CommentComp index={index} comment={comment} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShowUser;

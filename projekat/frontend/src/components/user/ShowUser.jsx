import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getCommentsByUserId } from '../../services/commentService';
import CommentComp from '../comment/CommentComp';
import { show } from '../../services/articleService';
import { banUser } from '../../services/userService';

function ShowUser() {

  const location = useLocation();
  const {user} = location.state || {};
  const [comments, setComments] = useState([]);
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();

  const handleComments = async (e) => {

    e.preventDefault();

    try {
        console.log("User id: " + user.user_id);
        const comments = await getCommentsByUserId(user.user_id);
        console.log(JSON.stringify(comments));
        console.log("Komentari korisnika: " + comments.komentari);
        setComments(comments.komentari);
        setFlag(true);
    } catch (error) {
        
    }

  }


  const openArticleHandler = async (articleId) =>{

      try {
        const data = await show(articleId);
        const article = data.article;
        console.log("Nenad canak: "+JSON.stringify(article));
        navigate("/articleDetails", {state:{article}});
      } catch (error) {
        alert("Greska prilikom ucitavanja artikla!");
      }
      


  }

  const banUserHandler = async (user_id) =>{

      try {
        await banUser(user_id);
        alert("Korisnik je uspesno banovan!");

      } catch (error) {
        alert(error.message);
      }

  }

  return (
    <div>
        <label>Ime i prezime: </label>
        <input type="text" value={`${user.name} ${user.surname}`} readOnly />
        <label>Email:</label>
        <input type="text" value={user.email} readOnly />
        <label>Username: </label>
        <input type="text" value={user.username} readOnly />
        <button onClick={handleComments}>Prikazi sve komentare korisnika</button>
        <button onClick={()=>{banUser(user.user_id)}}>Banuj korisnika</button>
        {comments?
        <div readOnly = {flag}>
            {comments.map((comment, index) => (
              <div key={index}>
              <h3 onClick={()=>openArticleHandler(comment.articles.article_id)}>{comment.articles.title}</h3>
              <CommentComp index={index} comment={comment} />
            </div>
            ))}
          </div>:<h1>Poruka</h1>}

    </div>
  )
}

export default ShowUser
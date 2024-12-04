import React, { useState } from "react";
import "./AddComment.css";
import { useLocation, useNavigate } from "react-router-dom";
import { store } from "../../services/commentService";
import { show } from "../../services/articleService";

function AddComment() {
  const location = useLocation();
  const { articleId } = location.state || {};
  const [text, setText] = useState("");
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const user = JSON.parse(localStorage.getItem("user"));
      setUserId(user.user_id);
      const comment = {
        text: text,
        user_id: user.user_id,
        article_id: articleId,
      };

      await store(comment);
      const clanak = await show(articleId);
      const article = clanak.article;
      navigate("/articleDetails",{state:{article}});
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="addComment-container">
      <h3 className="addComment-title">Pošalji komentar</h3>
      <form className="addComment-form">
        <div className="addComment-formGroup">
          <label htmlFor="comment" className="addComment-label">Vaš komentar</label>
          <textarea
            id="comment"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Vaš komentar"
            className="addComment-textarea"
          />
        </div>
        <button
          type="submit"
          onClick={submitHandler}
          className="addComment-button"
        >
          Pošalji komentar
        </button>
      </form>
    </div>
  );
}

export default AddComment;

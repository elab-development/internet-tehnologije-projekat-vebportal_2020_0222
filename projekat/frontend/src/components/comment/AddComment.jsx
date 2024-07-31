import React, { useState } from "react";
import "./AddComment.css";
import { useLocation } from "react-router-dom";
import { store } from "../../services/commentService";

function AddComment() {
  const location = useLocation();
  const { articleId } = location.state || {};
  const [text, setText] = useState("");
  const [userId, setUserId] = useState(null);

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const user = JSON.parse(localStorage.getItem("user"));
      setUserId(user.user_id);
      console.log("User_id: " + user.user_id);
      const comment = {
        text: text,
        user_id: user.user_id,
        article_id: articleId,
      };

      console.log("Comment: " + JSON.stringify(comment));
      await store(comment);
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

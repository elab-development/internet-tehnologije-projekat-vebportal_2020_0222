import React, { useState } from "react";
import { store } from "../../services/articleService";
import "./AddArticle.css";
import { show } from "../../services/authorService";

function AddArticle() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [publishingDate, setPublishingDate] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState(null);
  const categories = [
    { id: 1, name: "NBA" },
    { id: 2, name: "Euroleague" },
    { id: 3, name: "Eurocup" }
  ];
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!validTypes.includes(file.type)) {
        alert("Please select a valid image (jpg, jpeg, png).");
        setImage(null);
        return;
      }

      const maxSize = 2 * 1024 * 1024;
      if (file.size > maxSize) {
        alert("Image is too large. Maximum size is 2MB.");
        setImage(null);
        return;
      }
    }
    console.log("Image is valid!");
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    formData.append("publishing_date", formattedDate);
    formData.append("author_id", authorId);
    formData.append("category_id", categoryId);
    formData.append("image", image);
    console.log("Form data: " + formData);
    console.log("JSON form data: " + JSON.stringify(formData));
    try {
      await show(authorId);
      const response = await store(formData);
      console.log(JSON.stringify(response));
      setTitle("");
      setContent("");
      setPublishingDate("");
      setAuthorId("");
      setCategoryId("");
      setImage(null);
      alert("Clanak je uspesno dodat!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="addArticle-container">
      <h2 className="addArticle-title">Dodavanje članka</h2>
      <form onSubmit={handleSubmit} className="addArticle-form">
        <div className="addArticle-formGroup">
          <label htmlFor="title" className="addArticle-label">
            Naslov
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="addArticle-input-title"
          />
        </div>
        <div className="addArticle-formGroup">
          <label htmlFor="content" className="addArticle-label">
            Sadržaj
          </label>
          <textarea
            id="content"
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="addArticle-textarea"
          ></textarea>
        </div>
        <div className="addArticle-formGroup">
          <label htmlFor="authorId" className="addArticle-label">
            ID autora
          </label>
          <input
            type="text"
            id="authorId"
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
            required
            className="addArticle-input"
          />
        </div>
        <div className="addArticle-formGroup">
      <label htmlFor="categoryId" className="addArticle-label">
        Kategorija
      </label>
      <select
        id="categoryId"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        required
        className="addArticle-input-category"
      >
        <option value="" disabled>
          Izaberite kategoriju
        </option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
        <div className="addArticle-formGroup">
          <label htmlFor="image" className="addArticle-label">
            Slika
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            required
            className="addArticle-input"
          />
        </div>
        <button type="submit" className="addArticle-button">
          Dodaj
        </button>
      </form>
    </div>
  );
}

export default AddArticle;

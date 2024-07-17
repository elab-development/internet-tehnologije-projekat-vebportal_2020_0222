import React, { useState } from "react";
import { store } from "../../services/articleService";
import "./AddArticle.css";

function AddArticle() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [publishingDate, setPublishingDate] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState(null);

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
    formData.append("publishing_date", publishingDate);
    formData.append("author_id", authorId);
    formData.append("category_id", categoryId);
    formData.append("image", image);
    console.log("Form data: " + formData);
    console.log("JSON form data: " + JSON.stringify(formData));
    try {
      const response = await store(formData);
      console.log(JSON.stringify(response));
      setTitle("");
      setContent("");
      setPublishingDate("");
      setAuthorId("");
      setCategoryId("");
      setImage(null);
    } catch (error) {
      console.error("There was an error uploading the article!", error);
    }
  };

  return (
    <div>
      <h2>Add Article</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="publishingDate">Publishing Date</label>
          <input
            type="date"
            id="publishingDate"
            value={publishingDate}
            onChange={(e) => setPublishingDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="authorId">Author</label>
          <input
            type="text"
            id="authorId"
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="categoryId">Category</label>
          <input
            type="text"
            id="categoryId"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            required
          />
        </div>
        <button type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddArticle;

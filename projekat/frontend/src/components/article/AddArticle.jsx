import React, { useState, useEffect} from 'react';
import { store } from '../../services/articleService';

function AddArticle() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [publishingDate, setPublishingDate] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    e.preventDefault();
    setImage(e.target.files[0]);
    //console.log(image + " Slika: " + JSON.stringify(image));
  };

  useEffect(() => {
    console.log("Trenutna slika: ", image);
  }, [image]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Slika:' + image);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('publishing_date', publishingDate);
    formData.append('author_id', authorId);
    formData.append('category_id', categoryId);
    formData.append('image', image);
    console.log('Form data: ' + JSON.stringify(formData));
    //console.log(JSON.stringify(formData) + " " + JSON.stringify(formData.image));
    const poruka = await store(formData);
    console.log(JSON.stringify(poruka));
  };

  return (
    <div className="container mt-5">
      <h2>Add Article</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            className="form-control"
            id="content"
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="publishingDate">Publishing Date</label>
          <input
            type="date"
            className="form-control"
            id="publishingDate"
            value={publishingDate}
            onChange={(e) => setPublishingDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="authorId">Author</label>
          <input
            type="text"
            className="form-control"
            id="authorId"
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="categoryId">Category</label>
          <input
            type="text"
            className="form-control"
            id="categoryId"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            className="form-control"
            id="image"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default AddArticle;

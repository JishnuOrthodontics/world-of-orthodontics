import React, { useState } from 'react';
import { db, auth } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'posts'), {
        title,
        content,
        category,
        author: auth.currentUser.uid,
        timestamp: new Date().toISOString(),
        upvotes: 0
      });
      navigate('/forum'); // Redirect to forum after posting
    } catch (error) {
      alert('Error creating post: ' + error.message);
    }
  };

  return (
    <div className="create-post-container">
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Post Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Clinical Tips">Clinical Tips</option>
          <option value="Case Studies">Case Studies</option>
          <option value="Practice Management">Practice Management</option>
        </select>
        <button type="submit">Publish Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
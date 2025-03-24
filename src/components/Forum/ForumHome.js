import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const ForumHome = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const snapshot = await getDocs(collection(db, 'posts'));
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchPosts();
  }, []);

  return (
    <div className="forum-container">
      <h2>Community Forum</h2>
      <Link to="/create-post" className="new-post-button">New Post</Link>
      
      <div className="posts-list">
        {posts.map(post => (
          <div key={post.id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}...</p>
            <div className="post-meta">
              <span>By: {post.author}</span>
              <span>Category: {post.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForumHome;
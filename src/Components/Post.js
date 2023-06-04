import React, { useState, useEffect } from 'react'
import './Post.css';
import Avatar from '@mui/material/Avatar';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';


function Post({ postId, user, username, caption, avatarImage, imageURL }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      const commentsRef = collection(db, `posts/${postId}/comments`);
      const q = query(commentsRef, orderBy('timestamp', 'desc'));
      unsubscribe = onSnapshot(q, (snapshot) => {
        const sortedComments = snapshot.docs.map((doc) => ({
          id: doc.id, // include the document ID
          ...doc.data()
        }));
        setComments(sortedComments);
      });
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [postId]);

  async function postComment(e) {
    e.preventDefault();
    if (comment.trim() !== '') {
      const commentData = {
        username: user,
        text: comment.trim(),
        timestamp: new Date().getTime(),
      };
  
      const commentsRef = collection(db, `posts/${postId}/comments`);
      try {
        await addDoc(commentsRef, commentData);
        setComment('');
      } catch (error) {
        console.log('Error adding comment:', error);
      }
    }
  }

  return (
    <div className="post">
        <div className="post-header">
            <Avatar
                className="post-avatar"
                alt='#'
                src={avatarImage}
            />
            <h3>{username}</h3>
        </div>
        <img class="post-image" src={imageURL} />

        <h4 className="post-text"><strong className="post-username">{username}</strong> {caption}</h4>

        <div className="post-comment">
          {comments.map((comment) => (
            <p key={postId}>
              <strong>{comment.username}</strong> {comment.text}
            </p>
          ))}
        </div>
        <form className="post-comment-box">
          <input 
            className="post-input"
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="post-button"
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >
            Post
          </button>
        </form>
    </div>
  )
}

export default Post;
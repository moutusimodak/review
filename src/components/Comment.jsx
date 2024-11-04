import React, { useState } from 'react';
import NestedComment from './NestedComment';

const Comment = () => {
  const [comments, setComments] = useState([]);

  const addComment = (commentId, text) => {
    if (!text) return;

    const newComments = JSON.parse(JSON.stringify(comments));

    const addCommentRecursive = (tree, id) => {
      for (const comment of tree) {
        if (comment.id === id) {
          comment.replies.push({ id: Date.now(), text, replies: [] });
          return true;
        }
        if (addCommentRecursive(comment.replies, id)) return true;
      }
      return false;
    };

    if (commentId === -1) {
      newComments.push({ id: Date.now(), text, replies: [] });
    } else {
      addCommentRecursive(newComments, commentId);
    }
    setComments(newComments);
  };

  const deleteComment = (commentId) => {
    const newComments = JSON.parse(JSON.stringify(comments));

    const deleteCommentRecursive = (tree, id) => {
      for (let i = 0; i < tree.length; i++) {
        if (tree[i].id === id) {
          tree.splice(i, 1);
          return true;
        }
        if (deleteCommentRecursive(tree[i].replies, id)) return true;
      }
      return false;
    };

    deleteCommentRecursive(newComments, commentId);
    setComments(newComments);
  };

  return (
    <div>
      <h1>Comments</h1>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Add comment..."
          style={{
            flex: '1',
            padding: '0.5rem',
            border: '1px solid black',
            borderRadius: '4px',
          }}
          onKeyDown={(e) => e.key === 'Enter' && addComment(-1, e.target.value)}
        />
        <button
          style={{
            padding: '0.5rem 1rem',
            border: 'none',
            backgroundColor: 'blue',
            color: '#fff',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
          onClick={(e) => {
            addComment(-1, e.target.previousSibling.value);
            e.target.previousSibling.value = '';
          }}
        >
          Add
        </button>
      </div>
      <NestedComment comments={comments} addComment={addComment} deleteComment={deleteComment} />
    </div>
  );
};

export default Comment;

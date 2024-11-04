import React, { useState } from "react";
import Nesting from "./Nesting";

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
      <div>
        <input
          type="text"
          placeholder="Add comment"
  
        />
        <button
          onClick={(e) => {
            addComment(-1, e.target.previousSibling.value);
            e.target.previousSibling.value = "";
          }}
        >
          Add
        </button>
      </div>
      <Nesting
        comments={comments}
        addComment={addComment}
        deleteComment={deleteComment}
      />
    </div>
  );
};

export default Comment;

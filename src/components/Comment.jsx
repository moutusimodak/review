import React, { useState } from "react";
import Nesting from "./Nesting";
import {v4 as uuidv4} from 'uuid'

const Comment = () => {
  const [comments, setComments] = useState([]);

  const addComment = (commentId, text) => {
    if (!text) return;

    const newComments = JSON.parse(JSON.stringify(comments));

    const addCommentRecursive = (val, id) => {
      for (const comment of val) {
        if (comment.id === id) {
          comment.replies.push({ id: uuidv4(), text, replies: [] });
          return true;
        }
        if (addCommentRecursive(comment.replies, id)) return true;
      }
      return false;
    };

    if (commentId === -1) {
      newComments.push({ id: uuidv4(), text, replies: [] });
    } else {
      addCommentRecursive(newComments, commentId);
    }
    setComments(newComments);
  };

  const deleteComment = (commentId) => {
    const newComments = JSON.parse(JSON.stringify(comments));

    const deleteCommentRecursive = (val, id) => {
      for (let i = 0; i < val.length; i++) {
        if (val[i].id === id) {
            val.splice(i, 1);
          return true;
        }
        if (deleteCommentRecursive(val[i].replies, id)) return true;
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

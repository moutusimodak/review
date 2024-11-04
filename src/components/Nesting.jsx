import React, { useState } from "react";

const Nesting = ({ comments, addComment, deleteComment }) => {
  const [showInput, setShowInput] = useState(null);
  const [replyText, setReplyText] = useState("");

  const handleReply = (commentId) => {
    if (replyText) {
      addComment(commentId, replyText);
      setReplyText("");
      setShowInput(null);
    }
  };

  return comments.map((comment) => (
    <div key={comment.id}>
      <p>{comment.text}</p>
      <div>
        <button onClick={() => setShowInput(comment.id)}>Reply</button>
        <button onClick={() => deleteComment(comment.id)}>Delete</button>
      </div>

      {showInput === comment.id && (
        <div>
          <input
            type="text"
            placeholder="Reply"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
           
          />
          <button onClick={() => handleReply(comment.id)}>Add</button>
          <button onClick={() => setShowInput(null)}>Cancel</button>
        </div>
      )}

      {comment.replies.length > 0 && (
        <div style={{ paddingLeft: "2rem" }}>
          <Nesting
            comments={comment.replies}
            addComment={addComment}
            deleteComment={deleteComment}
          />
        </div>
      )}
    </div>
  ));
};

export default Nesting;

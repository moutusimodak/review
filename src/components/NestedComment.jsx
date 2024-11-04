import React, { useState } from 'react';

const NestedComment = ({ comments, addComment, deleteComment }) => {
  const [showInput, setShowInput] = useState(null);
  const [replyText, setReplyText] = useState('');

  const handleReply = (commentId) => {
    if (replyText) {
      addComment(commentId, replyText);
      setReplyText('');
      setShowInput(null);
    }
  };

  return comments.map((comment) => (
    <div key={comment.id} style={{ marginBottom: '1rem', paddingLeft: '1rem', borderLeft: '1px solid #ddd' }}>
      <p style={{ margin: '0.5rem 0' }}>{comment.text}</p>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button
          style={{
            padding: '0.25rem 0.5rem',
            backgroundColor: 'transparent',
            border: '1px solid black',
            borderRadius: '4px',
            color: 'blue',
            cursor: 'pointer',
          }}
          onClick={() => setShowInput(comment.id)}
        >
          Reply
        </button>
        <button
          style={{
            padding: '0.25rem 0.5rem',
            backgroundColor: 'transparent',
            border: '1px solid black',
            borderRadius: '4px',
            color: 'blue',
            cursor: 'pointer',
          }}
          onClick={() => deleteComment(comment.id)}
        >
          Delete
        </button>
      </div>

      {showInput === comment.id && (
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
          <input
            type="text"
            placeholder="Reply..."
            style={{
              flex: '1',
              padding: '0.5rem',
              border: '1px solid black',
              borderRadius: '4px',
            }}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleReply(comment.id)}
          />
          <button
            style={{
              padding: '0.5rem 1rem',
              border: 'none',
              backgroundColor: 'black',
              color: '#fff',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
            onClick={() => handleReply(comment.id)}
          >
            Add
          </button>
          <button
            style={{
              padding: '0.5rem 1rem',
              border: 'none',
              backgroundColor: '#6c757d',
              color: '#fff',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
            onClick={() => setShowInput(null)}
          >
            Cancel
          </button>
        </div>
      )}

      {comment.replies.length > 0 && (
        <div style={{ paddingLeft: '1rem' }}>
          <NestedComment comments={comment.replies} addComment={addComment} deleteComment={deleteComment} />
        </div>
      )}
    </div>
  ));
};

export default NestedComment;

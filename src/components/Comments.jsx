import React, { useState } from 'react';
import "../styles/Comment.css"
const Comment = ({ comment }) => {
    const [showReplies, setShowReplies] = useState(false);

    const toggleReplies = () => {
        setShowReplies(!showReplies);
    };

    const decodeHTML = (html) => {
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    };

    return (
        <div className={`container ${comment.id !== 'root' ? 'rootComment' : ''}`}>
            <div className="header">
                <p className="author">{comment.author}</p>
                {comment.children && comment.children.length > 0 && (
                    <span
                        className="toggleRepliesBtn"
                        onClick={toggleReplies}
                    >
                        {showReplies ? 'Hide Replies' : `View Replies(${comment.children.length})`}
                    </span>
                )}
            </div>
            <p className="text" dangerouslySetInnerHTML={{ __html: decodeHTML(comment.text) }}></p>
            {showReplies && (
                <div className="repliesContainer">
                    {comment.children.map((childComment) => (
                        <Comment key={childComment.id} comment={childComment} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Comment;

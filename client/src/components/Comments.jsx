import React, { useState } from 'react';
import "../styles/Comment.css";

const Comment = ({ comment }) => {
    // State to track whether replies are visible or not
    const [showReplies, setShowReplies] = useState(false);

    // Function to toggle the visibility of replies
    const toggleReplies = () => {
        setShowReplies(!showReplies);
    };

    // Function to decode HTML entities in the comment text
    const decodeHTML = (html) => {
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    };

    return (
        <div className={`container ${comment.id !== 'root' ? 'rootComment' : ''}`}>
            <div className="header">
                {/* Display comment author */}
                <p className="author">@{comment.author}</p>

                {/* Display "View Replies" button if there are replies */}
                {comment.children && comment.children.length > 0 && (
                    <span
                        className="toggleRepliesBtn"
                        onClick={toggleReplies}
                    >
                        {showReplies ? 'Hide Replies' : `View Replies(${comment.children.length})`}
                    </span>
                )}
            </div>

            {/* Display the comment text with HTML content */}
            <p className="text" dangerouslySetInnerHTML={{ __html: decodeHTML(comment.text) }}></p>

            {/* Display replies if they are visible */}
            {showReplies && (
                <div className="repliesContainer">
                    {/* Render child comments using recursive Comment component */}
                    {comment.children.map((childComment) => (
                        <Comment key={childComment.id} comment={childComment} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Comment;

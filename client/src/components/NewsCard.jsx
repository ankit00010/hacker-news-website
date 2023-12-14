import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getPostDetails } from '../features/postDetails/postDetailsSlice';
import { calculateTimespan, extractDomain } from '../utils/formatUtil';
import "../styles/NewsCard.css";

const NewsCard = ({ title, url, points, author, created_at, num_comments, objectID }) => {
    // Access the dispatch function from the Redux store
    const dispatch = useDispatch();

    // Extract the domain from the URL, or set to null if URL is undefined
    const source = url ? extractDomain(url) : null;

    // Handle the click event on the title
    const handleTitleClick = () => {
        // Dispatch the getPostDetails action with the objectID
        if (objectID) {
            dispatch(getPostDetails(objectID));
        } else {
            console.error('objectID is undefined. Cannot fetch details.');
        }
    };

    return (
        // News card container
        <div className="card">
            {/* Title as a link to the post details page */}
            <Link
                to={`/post/${objectID}`}
                onClick={handleTitleClick}
                className="title"
            >
                {title}
            </Link>

            {/* Metadata section with points, author, timespan, and a link to the comments page */}
            <p className="metadata">
                {points} points | {author} | {calculateTimespan(created_at)} |{'  '}
                {/* Link to the comments page */}
                <Link to={`/post/${objectID}`} className="comments-link">
                    {num_comments} comments
                </Link>
            </p>

            {/* Source section with the domain and a link to the original source */}
            {source && (
                <p className="source">
                    Source: <a href={url} target="_blank" rel="noopener noreferrer">{source}</a>
                </p>
            )}
        </div>
    );
};

export default NewsCard;

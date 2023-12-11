import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getPostDetails } from '../features/postDetails/postDetailsSlice';
import { calculateTimespan, extractDomain } from '../utils/formatUtil';
import "../styles/NewsCard.css"
const NewsCard = ({ title, url, points, author, created_at, num_comments, objectID }) => {
    const dispatch = useDispatch();
    const source = url ? extractDomain(url) : null;

    const handleTitleClick = () => {
        if (objectID) {

            dispatch(getPostDetails(objectID));
        } else {
            console.error('objectID is undefined. Cannot fetch details.');
        }
    };

    return (
        <div className="card">
            <Link
                to={`/post/${objectID}`}
                onClick={handleTitleClick}
                className="title"
            >
                {title}
            </Link>
            <p className="metadata">
                {points} points | {author} | {calculateTimespan(created_at)} | {num_comments} comments
            </p>
            {source && (
                <p className="source">
                    Source: <a href={url} target="_blank" rel="noopener noreferrer">{source}</a>
                </p>
            )}
        </div>
    );
};

export default NewsCard;


// Importing React and necessary hooks from React
import React, { useState, useEffect } from 'react';

// Importing useParams, useDispatch, and useSelector from react-router-dom and react-redux
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Importing actions and selectors from the postDetailsSlice file
import { selectPostDetails, getPostDetails } from '../features/postDetails/postDetailsSlice';

// Importing utility functions for formatting and extracting domain
import { formatDate, extractDomain } from '../utils/formatUtil';

// Importing the Comment component for rendering comments
import Comment from './Comments';

// Importing the CSS file for styling
import '../styles/PostDetails.css';

// Functional component for displaying details of a post
const PostDetails = () => {
    // Extracting the 'objectId' parameter from the URL
    const { objectId } = useParams();

    // Setting up state for loading status
    const [loading, setLoading] = useState(true);

    // Creating a dispatch function for Redux actions
    const dispatch = useDispatch();

    // Retrieving post details from the Redux store
    const postDetails = useSelector(selectPostDetails);

    // Fetching post details when the component mounts or 'objectId' changes
    useEffect(() => {
        const fetchData = async () => {
            // Fetch post details only if they are not already present in the store
            if (!postDetails || !postDetails.title) {
                await dispatch(getPostDetails(objectId));
            }
            setLoading(false);
        };

        fetchData();
    }, [dispatch, objectId, postDetails]);

    // Formatting the creation date of the post
    const formattedDate = postDetails.created_at ? formatDate(postDetails.created_at) : '';

    return (
        <div className="post-details"> {/* Apply Tailwind class for styling */}
            {loading ? (
                // Display a loading message while data is being fetched
                <p>Loading...</p>
            ) : (
                // Display post details and comments when data is loaded
                <>
                    {postDetails.title && (
                        <div>
                            <h2>
                                {/* Displaying the post title as a hyperlink to the source URL */}
                                <a href={postDetails.url} target="_blank" rel="noopener noreferrer">
                                    {postDetails.title}
                                </a>
                            </h2>
                            <p>
                                {/* Displaying post details such as points, author, and creation date */}
                                {postDetails.points} points by {postDetails.author} on {formattedDate}
                                {postDetails.url && (
                                    // Displaying the source URL if available
                                    <span>
                                        {' | Source: '}
                                        <a href={postDetails.url} target="_blank" rel="noopener noreferrer">
                                            {extractDomain(postDetails.url)}
                                        </a>
                                    </span>
                                )}
                            </p>
                        </div>
                    )}

                    {postDetails.children && postDetails.children.length > 0 && (
                        <div>
                            {/* Displaying comments if they exist */}
                            <h3>Comments:</h3>
                            {postDetails.children.map((comment) => (
                                // Rendering each comment using the Comment component
                                <Comment key={comment.id} comment={comment} />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

// Exporting the PostDetails component as the default export
export default PostDetails;

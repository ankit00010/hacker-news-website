import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectPostDetails, getPostDetails } from '../features/postDetails/postDetailsSlice';
import { formatDate, extractDomain } from '../utils/formatUtil';
import Comment from './Comments';

const PostDetails = () => {
    const { objectId } = useParams();
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const postDetails = useSelector(selectPostDetails);

    useEffect(() => {
        const fetchData = async () => {
            if (!postDetails) {
                await dispatch(getPostDetails(objectId));
            }
            setLoading(false);
        };

        fetchData();
    }, [dispatch, objectId, postDetails]);

    const formattedDate = postDetails.created_at ? formatDate(postDetails.created_at) : '';

    return (
        <div className="post-details">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {postDetails.title && (
                        <div>
                            <h2>
                                <a className='title' href={postDetails.url} target="_blank" rel="noopener noreferrer">
                                    {postDetails.title}
                                </a>
                            </h2>
                            <p>
                                {postDetails.points} points by {postDetails.author} on {formattedDate}
                                {postDetails.url && (
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
                            <h3>Comments:</h3>
                            {postDetails.children.map((comment) => (
                                <Comment key={comment.id} comment={comment} />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default PostDetails;

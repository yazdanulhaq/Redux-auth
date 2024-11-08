import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostDetail } from '../actions/postActions';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './PostDetail.css';

const PostDetail = () => {
    const { postId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, post } = useSelector((state) => state.postDetail || {});

    useEffect(() => {
        dispatch(fetchPostDetail(postId));
    }, [dispatch, postId]);

    const handleGoToPosts = () => {
        navigate('/Posts');
    };

    return (
        <div className="post-detail-container">
            {loading && (
                <div className="loading-spinner">
                    <p>Loading...</p>
                </div>
            )}
            {error && (
                <div className="error-message">
                    <p>Error: {error}</p>
                </div>
            )}
            {post && (
                <div className="post-detail">
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                </div>
            )}
        
        </div>
    );
};

export default PostDetail;
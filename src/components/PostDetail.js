import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostDetail } from '../actions/postActions';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FaEye, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
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
                    <h2 className="product-title">{post.title}</h2>
                    <p className="product-desc">{post.body}</p>
                    <div className="post-icon-center-css px-6 pt-4 pb-2">
                        <span className="post-icon-space inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                            <FaEye className="post-icon-css" /> {post.views}
                        </span>
                        <span className="post-icon-space inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                            <FaThumbsUp className="post-icon-css" /> {post.reactions?.likes}
                        </span>
                        <span className="post-icon-space inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                            <FaThumbsDown className="post-icon-css2" /> {post.reactions?.dislikes}
                        </span>
                    </div>
                </div>
            )}
            {!loading && !post && <p>No post available</p>}
        </div>
    );
};

export default PostDetail;
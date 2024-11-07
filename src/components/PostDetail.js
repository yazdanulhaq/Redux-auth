import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostDetail } from '../actions/postActions';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

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
            <style>
                {`
          .post-detail-container {
            max-width: 800px;
            margin: 40px auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .loading-spinner {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100px;
            }
            .error-message {
                color: #red;
            font-weight: bold;
            text-align: center;
            }
            .post-detail {
            margin-top: 20px;
          }
          h2 {
            font-weight: bold;
            color: #333;
          }
          p {
            color: #666;
          }
          .card-btn2 {
    width: 267px;
    background: linear-gradient(135deg, #4a90e2, #0057b8);
    color: white;
    margin-left: 543px;
    margin-bottom: -12px;
    margin-top: 20px;
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 16px;
}
          `}
            </style>
        </div>
    );
};

export default PostDetail;
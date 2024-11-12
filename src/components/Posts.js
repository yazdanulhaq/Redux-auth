import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../actions/postActions';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import './Posts.css';

const Posts = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, posts } = useSelector((state) => state.posts || {});

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const handleGoToProducts = () => {
        navigate('/Products');
    };

    const handlePostClick = (postId) => {
        navigate(`/post/${postId}`);
    };

    return (
        <div className="container">
            <h1 className="title">Posts</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <div className="posts-grid">
                {posts?.posts?.length > 0 ? (
                    posts?.posts?.map((post) => (
                        <div
                            key={post.id}
                            className="post-card"
                            onClick={() => handlePostClick(post.id)}
                        >
                            <h3 className="post-title">{post.title.substring(0, 30) + "..."}</h3>
                            <p>{post.body.substring(0, 30) + "..."}</p>
                            <div className="post-icon-center-css px-6 pt-4 pb-2">
                                <span className="post-icon-space inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                    <FaEye className='post-icon-css' /> {post.views}
                                </span>
                                <span className="post-icon-space inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                    <FaThumbsUp className='post-icon-css' /> {post.reactions.likes}
                                </span>
                                <span className="post-icon-space inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                    <FaThumbsDown className='post-icon-css2' /> {post.reactions.dislikes}
                                </span>
                            </div>
                        </div>

                    ))
                ) : (
                    !loading && <p>No posts available</p>
                )}
            </div>
        </div>
    );
};

export default Posts;

// Posts.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../actions/postActions';
import { useNavigate } from 'react-router-dom';
import './Posts.css';

const Posts = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize navigate function
    const { loading, error, posts } = useSelector(state => state.posts || {});

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const handleGoToProducts = () => {
        navigate('/Products'); // Navigate to Card.js page
    };

    return (
        <div className="container">
            <h1 className="title">Posts</h1>
            <button onClick={handleGoToProducts} className='card-btn'>Go to Products </button>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <div className="posts-grid">
                {posts?.posts?.length > 0 ? (
                    posts.posts.map((post, index) => (
                        <div key={index} className="post-card">
                            <h3 className="post-title">{post.title}</h3>
                            <p className="post-body">{post.body}</p>
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

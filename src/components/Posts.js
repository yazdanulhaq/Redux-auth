import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../actions/postActions'; // Import the action to fetch posts
import './Login.css';

const Posts = () => {
    const dispatch = useDispatch();
    const { loading, error, posts } = useSelector(state => state.posts.posts);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    return (
        <div className="container">
            <h1>Posts</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {posts && posts.map((post, index) => (
                <div key={index}>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </div>
            ))}
        </div>
    );
};

export default Posts;

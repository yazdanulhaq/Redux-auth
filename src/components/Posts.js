import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, setPage } from '../actions/postActions';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import './Posts.css';

const Posts = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Select data from Redux store
    const { posts, total, page, limit, loading, error } = useSelector((state) => state.posts);

    // useRef for stable references to page and total
    const pageRef = useRef(page);
    const totalRef = useRef(total);
    const limitRef = useRef(limit);

    // Update refs when these values change
    useEffect(() => {
        pageRef.current = page;
        totalRef.current = total;
        limitRef.current = limit;
    }, [page, total, limit]);

    // Handle infinite scroll
    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop + 1 >=
            document.documentElement.scrollHeight
        ) {
            if (
                !loading &&
                pageRef.current < Math.ceil(totalRef.current / limitRef.current)
            ) {
                dispatch(setPage(pageRef.current + 1));
            }
        }
    };

    // Add/remove scroll event listener
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Fetch posts when the page changes
    useEffect(() => {
        if (page) {
            dispatch(fetchPosts(page, limit));
        }
    }, [dispatch, page, limit]);

    // Navigate to post detail on click
    const handlePostClick = (postId) => {
        navigate(`/post/${postId}`);
    };

    return (
        <div className="container">
            <h1 className="title">Posts</h1>
            {loading && <p className="loading-text">Loading...</p>}
            {error && <p className="error-text">Error: {error}</p>}
            <div className="posts-grid">
                {posts && posts.length > 0 ? (
                    posts.map((post) => (
                        <div
                            key={post.id}
                            className="post-card"
                            onClick={() => handlePostClick(post.id)}
                        >
                            <h3 className="post-title">
                                {post.title.length > 30
                                    ? post.title.substring(0, 30) + "..."
                                    : post.title}
                            </h3>
                            <p className="post-body">
                                {post.body.length > 30
                                    ? post.body.substring(0, 30) + "..."
                                    : post.body}
                            </p>
                            <div className="post-icon-center-css px-6 pt-4 pb-2">
                                <span className="post-icon-space inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                    <FaEye className="post-icon-css" /> {post.views}
                                </span>
                                <span className="post-icon-space inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                    <FaThumbsUp className="post-icon-css" /> {post.reactions?.likes || 0}
                                </span>
                                <span className="post-icon-space inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                    <FaThumbsDown className="post-icon-css2" /> {post.reactions?.dislikes || 0}
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    !loading && <p className="no-posts-text">No posts available</p>
                )}
            </div>
        </div>
    );
};

export default Posts;

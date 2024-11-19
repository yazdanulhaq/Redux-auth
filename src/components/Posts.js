import React, { useEffect,useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts ,setPage } from '../actions/postActions';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import './Posts.css';

const Posts = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { posts, total, page, limit, loading, error } = useSelector((state) => state.posts);

    const pageRef = useRef(page);
    const totalRef = useRef(total);
    const limitRef = useRef(limit);

    useEffect(() => {
        pageRef.current = page;
        totalRef.current = total;
        limitRef.current = limit;
    }, [page, total, limit]);

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop + 1 >=
            document.documentElement.scrollHeight
        ) {
            if (!loading && pageRef.current < Math.ceil(totalRef.current / limitRef.current)) {
                const nextPage = pageRef.current + 1;
                dispatch(setPage(nextPage));
            }
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, []);

    useEffect(() => {
        if (page) {
          dispatch(fetchPosts(page, limit));
        }
      }, [dispatch, page, limit]);


    const handlePostClick = (postId) => {
        navigate(`/post/${postId}`);
    };
    

    return (
        <div className="container">
            <h1 className="title">Posts</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <div className="posts-grid">
                {posts.length > 0 ? (
                    posts.map((post) => (
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

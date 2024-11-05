import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostDetail } from '../actions/postActions';
import { useParams } from 'react-router-dom';


const PostDetail = () => {
    const { postId } = useParams();
    const dispatch = useDispatch();
    const { loading, error, post } = useSelector(state => state.postDetail || {});

    useEffect(() => {
        dispatch(fetchPostDetail(postId));
    }, [dispatch, postId]);

    return (
        <div className="post-detail">
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {post && (
                <>
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                </>
            )}
        </div>
    );
};

export default PostDetail;

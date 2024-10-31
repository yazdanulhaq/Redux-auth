export const POST_REQUEST = 'POST_REQUEST';
export const POST_SUCCESS = 'POST_SUCCESS';
export const POST_FAILURE = 'POST_FAILURE';

export const fetchPosts = () => {
    return async (dispatch) => {
        dispatch({ type: POST_REQUEST });
        try {
            const response = await fetch('https://dummyjson.com/posts', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) {
                throw new Error('Failed to login');
            }

            const posts = await response.json();
            dispatch({ type: POST_SUCCESS, payload: { posts: posts } });
        } catch (error) {
            dispatch({ type: POST_FAILURE, error: error.message });
        }
    };
};

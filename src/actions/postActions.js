export const POST_REQUEST = 'POST_REQUEST';
export const POST_SUCCESS = 'POST_SUCCESS';
export const POST_FAILURE = 'POST_FAILURE';

export const fetchPosts = () => async (dispatch) => {
    dispatch({ type: 'POST_REQUEST' });
    try {
        const response = await fetch('https://dummyjson.com/posts', {
            headers: {
                'Accept': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Received non-JSON response");
        }

        const data = await response.json();
        dispatch({ type: 'POST_SUCCESS', payload: data });
    } catch (error) {
        dispatch({ type: 'POST_FAILURE', error: error.message });
    }
};


export const fetchPostDetail = (postId) => async (dispatch) => {
    dispatch({ type: POST_REQUEST });
    try {
        const response = await fetch(`/api/https://dummyjson.com/posts/${postId}`);
        const data = await response.json();
        dispatch({ type: POST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: POST_FAILURE, error: error.message });
    }
};
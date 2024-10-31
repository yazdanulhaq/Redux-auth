import { POST_REQUEST, POST_SUCCESS, POST_FAILURE } from '../actions/postActions';

const initialState = {
    loading: false,
    posts: null,
    error: null,
};

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_REQUEST:
            return { ...state, loading: true, error: null };
        case POST_SUCCESS:
            return { loading: false, posts: action.payload.posts, error: null };
        case POST_FAILURE:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
};

export default postReducer;
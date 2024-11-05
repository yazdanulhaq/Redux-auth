import { POST_REQUEST, POST_SUCCESS, POST_FAILURE } from '../actions/actionTypes';

const initialState = {
    loading: false,
    post: null,
    error: null,
};

const postDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_REQUEST:
            return { ...state, loading: true };
        case POST_SUCCESS:
            return { ...state, loading: false, post: action.payload, error: null };
        case POST_FAILURE:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
};

export default postDetailReducer;

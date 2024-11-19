import { POST_REQUEST, POST_SUCCESS, POST_FAILURE,SET_PAGE} from '../actions/postActions';

const initialState = {
    posts: [],
    total: 0,
    page: 1,
    limit: 6,
    loading: false,
    error: null,
};

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_REQUEST:
            return { ...state, loading: true, error: null };

        case POST_SUCCESS:
            return {
                ...state,
                posts: state.page === 1
                    ? action.payload.posts 
                    : [...state.posts, ...action.payload.posts],
                total: action.payload.total,
                loading: false
            };

        case POST_FAILURE:
            return { ...state, loading: false, error: action.error };

            case SET_PAGE:
                return { ...state, page: action.payload };

        default:
            return state;
    }
};

export default postReducer;
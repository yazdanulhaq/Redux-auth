import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../actions/authActions';

const initialState = {
    loading: false,
    isAuthenticated: false,
    user: null,
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { ...state, loading: true, error: null };
        case LOGIN_SUCCESS:
            return { loading: false, isAuthenticated: true, user: action.payload.user, error: null };
        case LOGIN_FAILURE:
            return { ...state, loading: false, isAuthenticated: false, error: action.error };
        case LOGOUT:
            return { ...state, loading: false, isAuthenticated: false, user: null, error: null };
        default:
            return state;
    }
};

export default authReducer;
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';


export const login = (username, password) => {
    return async (dispatch) => {
        dispatch({ type: LOGIN_REQUEST });
        try {
            const response = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    password
                })
            });

            if (!response.ok) {
                throw new Error('Failed to login');
            }

            const data = await response.json();
            dispatch({ type: LOGIN_SUCCESS, payload: { username: data } });
        } catch (error) {
            dispatch({ type: LOGIN_FAILURE, error: error.message });
        }
    };
};

export const logout = (navigate) => {
    return (dispatch) => {
        dispatch({ type: LOGOUT });
        navigate('/');
    };
};
export const PRODUCT_REQUEST = 'PRODUCT_REQUEST';
export const PRODUCT_SUCCESS = 'PRODUCT_SUCCESS';
export const PRODUCT_FAILURE = 'PRODUCT_FAILURE';
export const UPDATE_TOTAL = "UPDATE_TOTAL";
export const UPDATE_SKIP = "UPDATE_SKIP";

export const fetchProducts = (url, limit, skip) => {
    return async (dispatch) => {
        dispatch({ type: PRODUCT_REQUEST });
        try {
            const response = await fetch(`https://dummyjson.com/${url}?limit=${limit}&skip=${skip}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) {
                throw new Error('Failed to login');
            }

            const products = await response.json();
            dispatch({ type: PRODUCT_SUCCESS, payload: { products: products } });
        } catch (error) {
            dispatch({ type: PRODUCT_FAILURE, error: error.message });
        }
    };
};

export const fetchProductDetail = (ProductId) => async (dispatch) => {
    dispatch({ type: PRODUCT_REQUEST });
    try {
        const response = await fetch(`https://dummyjson.com/products/${ProductId}`);
        const data = await response.json();
        dispatch({ type: PRODUCT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: PRODUCT_FAILURE, error: error.message });
    }
};
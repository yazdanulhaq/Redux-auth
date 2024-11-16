export const PRODUCT_REQUEST = 'PRODUCT_REQUEST';
export const PRODUCT_SUCCESS = 'PRODUCT_SUCCESS';
export const PRODUCT_FAILURE = 'PRODUCT_FAILURE';
export const SET_PAGE = "SET_PAGE";


export const setProducts = (products, total) => ({
    type: PRODUCT_SUCCESS,
    payload: { products, total },
});


export const fetchProducts = (page, limit) => {
    return async (dispatch, getState) => {
        const { loading } = getState().products;

        if (loading) return;

        dispatch({ type: PRODUCT_REQUEST });
        try {
            const skip = (page - 1) * limit;
            const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) {
                throw new Error('Failed to login');
            }

            const data = await response.json();
            dispatch(setProducts(data.products, data.total));
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

export const setPage = (page) => ({
    type: SET_PAGE,
    payload: page, // Ensure `page` is passed correctly
});
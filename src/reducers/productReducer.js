import { PRODUCT_REQUEST, PRODUCT_SUCCESS, PRODUCT_FAILURE } from '../actions/productActions';

const initialState = {
    loading: false,
    products: null,
    error: null,
};

const productActions = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_REQUEST:
            return { ...state, loading: true, error: null };
        case PRODUCT_SUCCESS:
            return { loading: false, products: action.payload.products, error: null };
        case PRODUCT_FAILURE:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
};

export default productActions;





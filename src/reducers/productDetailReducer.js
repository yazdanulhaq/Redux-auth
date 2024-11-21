import { PRODUCT_REQUEST, PRODUCT_SUCCESS, PRODUCT_FAILURE } from '../actions/actionTypes';

const initialState = {
    loading: false,
    product: null,
    error: null,
};

const productDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_REQUEST:
            return { ...state, loading: true };
        case PRODUCT_SUCCESS:
            console.log(action.payload)
            return { ...state, loading: false, product: action.payload, error: null };
        case PRODUCT_FAILURE:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
};

export default productDetailReducer;

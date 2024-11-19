import { PRODUCT_REQUEST, PRODUCT_SUCCESS, PRODUCT_FAILURE, SET_PAGE } from '../actions/productActions';

const initialState = {
    products: [],
    total: 0,
    page: 1,
    limit: 6,
    loading: false,
    error: null,
};

const productActions = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_REQUEST:
            return { ...state, loading: true, error: null };

        case PRODUCT_SUCCESS:
            return {
                ...state,
                products: state.page === 1
                    ? action.payload.products 
                    : [...state.products, ...action.payload.products],
                total: action.payload.total,
                loading: false
            };

        case PRODUCT_FAILURE:
            return { ...state, loading: false, error: action.error };

        case SET_PAGE:
            console.log("Updating Page:", action.payload);
            return { ...state, page: action.payload };

        default:
            return state;
    }
};

export default productActions;
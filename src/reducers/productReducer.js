import { PRODUCT_REQUEST, PRODUCT_SUCCESS, PRODUCT_FAILURE, UPDATE_SKIP, UPDATE_TOTAL } from '../actions/productActions';

const initialState = {
    loading: false,
    products: [], // Initialize products as an empty array
    total: 0, // Add a total field for the total product count
    limit: 6,
    skip: 0,
    error: null,
};

const productActions = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_REQUEST:
            return { ...state, loading: true, error: null };

        case PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: state.products.length > 0
                    ? [...state.products, ...action.payload.products.products]
                    : action.payload.products.products,
                total: action.payload.products.total,
                limit: action.payload.products.limit || state.limit, // Update or keep default
                skip: action.payload.products.skip || state.skip,   // Update or keep default
                error: null,
            };

        case PRODUCT_FAILURE:
            return { ...state, loading: false, error: action.error };

        case UPDATE_SKIP:
            return { ...state, skip: action.payload };

        case UPDATE_TOTAL:
            return { ...state, total: action.payload };

        default:
            return state;
    }
};

export default productActions;
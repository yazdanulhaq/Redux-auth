// src/reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import postReducer from './postReducer';
import productReducer from './productReducer';


const rootReducer = combineReducers({
    auth: authReducer,
    posts: postReducer,
    products: productReducer
});

export default rootReducer;
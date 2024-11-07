// src/store.js
import { createStore, applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import rootReducer from './reducers';

// Persist configuration
const persistConfig = {
  key: 'root', // Key to save the persisted data
  storage,
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Enable Redux DevTools Extension if available
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create store with persisted reducer
const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);

// Create a persistor
const persistor = persistStore(store);

export { store, persistor };

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import Navbar from './components/Navbar';

const root = createRoot(document.getElementById('root'));
root.render(<App />);
root.render(
    <Provider store={store}>
        <BrowserRouter>
             <Navbar />
            <App />
        </BrowserRouter>
    </Provider>
);

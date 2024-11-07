import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Profile from './components/Profile';
import Posts from './components/Posts';
import Products from './components/Products';
import PostDetail from './components/PostDetail';
import ProductDetail from './components/ProductDetail';
import Navbar from './components/Navbar';

const App = () => {
    return (
        <BrowserRouter>
        <Navbar />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Profile" element={<Profile />} />
                <Route path="/Posts" element={<Posts />} />
                <Route path="/Products" element={<Products />} />
                <Route path="/post/:postId" element={<PostDetail />} />
                <Route path="/product/:productId" element={<ProductDetail />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
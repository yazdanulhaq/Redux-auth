import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Profile from './components/Profile';
import Posts from './components/Posts';
import Products from './components/Products';



const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Posts" element={<Posts />} />
            <Route path="/Products" element={<Products />} />
        </Routes>
    );
};

export default App;


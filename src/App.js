import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Profile from './components/Profile';
import Posts from './components/Posts';


const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/posts" element={<Posts />} />
        </Routes>
    );
};

export default App;

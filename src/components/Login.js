import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../actions/authActions';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, isAuthenticated, user } = useSelector(state => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(username, password));
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/profile'); // Redirect to profile page if logged in
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="container">
            <h1>{isAuthenticated ? `${user}'s Profile` : 'Login Page'}</h1>
            {isAuthenticated ? (
                <button onClick={handleLogout}>Logout</button>
            ) : (
                <form onSubmit={handleSubmit}>
                    <label>Username:</label>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    {error && <p className="error">{error}</p>}
                </form>
            )}
        </div>
    );
};

export default Login;

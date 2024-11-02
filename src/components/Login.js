import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../actions/authActions';
import { useNavigate } from 'react-router-dom';
import Profile from '../components/Profile';
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
        <div className="login-container">
            <h1>{isAuthenticated ? `${user}'s Profile` : 'Login Page'}</h1>
            {isAuthenticated ? (
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            ) : (
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Username:</label>
                        <input 
                            type="text" 
                            id="username"
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password:</label>
                        <input 
                            type="password" 
                            id="password"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    {error && <p className="error-msg">{error}</p>}
                </form>
            )}
        </div>
    );
};

export default Login;

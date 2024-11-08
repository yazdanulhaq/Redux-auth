import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/authActions';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    console.log("user : ", user)
    const handleLogout = () => {
        dispatch(logout(navigate));
    };


    return (
        <nav className="navbar">
            <div className="navbar-container">
                <input type="checkbox" id="menuToggle" />
                <label htmlFor="menuToggle" className="menu-icon">&#9776;</label>
                <ul className="navbar-menu">
                    {!user && (
                        <li><NavLink to="/" className="nav-link">Login</NavLink></li>
                    )}
                    {user && (
                        <li><NavLink to="/profile" className="nav-link">Profile</NavLink></li>
                    )}

                    <li><NavLink to="/posts" className="nav-link">Posts</NavLink></li>
                    <li><NavLink to="/products" className="nav-link">Products</NavLink></li>

                    {user && (
                        <>
                            <li>
                                <NavLink to="/profile" className="nav-link user-link">
                                    {user.firstName} {user.lastName}
                                </NavLink>
                            </li>
                            <li>
                                <button onClick={handleLogout} className="logout-button">Logout</button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;

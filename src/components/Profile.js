import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user } = useSelector(state => state.auth);
    const navigate = useNavigate();

    const GoToPost = () => {
        navigate('/posts');
    };

    return (
        <div>
            <h1>Welcome to your profile, {user}!</h1>
            <p>This is your profile page.</p>
            <button onClick={GoToPost}>Go to Post</button>
        </div>
    );
};

export default Profile;

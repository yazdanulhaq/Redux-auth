import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { loading, error, isAuthenticated, user } = useSelector(state => state.auth);
  console.log("user",user)
    const navigate = useNavigate();

    const goToPost = () => {
        navigate('/posts');
    };

    return (
        <div className="profile-container">
            <h1>Welcome to your profile, {user.name}!</h1>
            <p>This is your profile page.</p>
            <button className="btn-go-to-post" onClick={goToPost}>
                Go to Posts
            </button>
            <style>
                {`
          .profile-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .btn-go-to-post {
            background-color: #4CAF50;
            color: #fff;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
          .btn-go-to-post:hover {
            background-color: #3e8e41;
          }
        `}
            </style>
        </div>
    );
};

export default Profile;
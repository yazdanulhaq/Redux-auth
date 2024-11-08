import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Profile.css';


const Profile = () => {
  const { loading, error, isAuthenticated, user } = useSelector(state => state.auth);
  console.log("user", user)
  const navigate = useNavigate();

  const goToPost = () => {
    navigate('/posts');
  };

  return (
    <div className="profile-container">
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <img src={user.image} alt="user profile" style={{ borderRadius: "66px" }} />
      </div>
      <h1>Welcome to your profile,<b> {user.username}</b></h1>
      <h3>USER Gender:- <b>{user.gender}</b></h3>
      <h1>USER EMAIL:- <br /> <b>{user.email}</b></h1>
      <h4>This is your profile page.</h4>
    </div>
  );
};

export default Profile;
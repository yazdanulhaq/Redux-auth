import React from 'react';
import { useSelector } from 'react-redux';
import './Profile.css';


const Profile = () => {
  const { user } = useSelector(state => state.auth);

  return (
    <div>
      <div className="bg-img2 login-container">
        <h2>Welcome to Your Profile Page!</h2>
        <div className="login-form2">
          <div style={{ textAlign: "center", marginBottom: "10px" }}>
            <img src={user.image} alt="user profile" style={{ borderRadius: "66px" }} />
          </div>
          <p>User Name: <br /> <b>{user.firstName} {user.lastName}</b></p>
          {user.gender && (
            <p>User Gender: <br /> <b> {user.gender}</b></p>
          )}
          <p>User Email: <br /> <b> {user.email}</b></p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
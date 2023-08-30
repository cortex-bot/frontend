import React, { useState, useEffect } from 'react';
import { host, getUserData, brokerLogin, getUserHoldings } from "../../configs.json";
import './UserProfile.css'; // Import the CSS file for styling
import BrokerData from './BrokerData';

function UserProfile({ username }) {
  const [userData, setUserData] = useState(null);
 
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`${host + getUserData}?username=${username}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data.data);

          localStorage.setItem('userProfilePic', data.data.user_details.profile_pic);
        } else {
          console.error('Error:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserDetails();
  }, [username]);

  const handleLogout = () => {
    // Clear username and sessionID from localStorage
    localStorage.removeItem('username');
    localStorage.removeItem('sessionID');
    localStorage.removeItem('userProfilePic');
    // Refresh the page
    window.location.reload();
  };




  return (
    <div>
    <div className="profile-container glassy">
      <div className="profile-header">
        <h2 className="profile-username">{userData ? userData.username : 'Loading...'}</h2>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
      <div className="profile-details">
        {userData ? (
          <>
            <div className="profile-avatar">
              <img src={userData.user_details.profile_pic} alt="User Avatar" />
            </div>
            <div className="profile-info">
              <p className="profile-field"><strong>Email:</strong> {userData.email}</p>
              <p className="profile-field"><strong>PAN:</strong> {userData.pan}</p>
              <p className="profile-field"><strong>Phone:</strong> {userData.phone}</p>
              <p className="profile-field"><strong>Gender:</strong> {userData.user_details.gender}</p>
              <p className="profile-field"><strong>About:</strong> {userData.user_details.about}</p>
              <p className="profile-field"><strong>Date Of Birth:</strong> {userData.user_details.dob}</p>
              <div className="access-pills">
                <strong>Access:</strong>
                {userData.access.map((access, index) => (
                  <span key={index} className="access-pill">{access}</span>
                ))}
              </div>
            </div>
          </>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
      </div>
      <br/>
     {userData ?  <BrokerData clientname={userData.username} className = "glassy" />:<div>USername not found</div>}
    </div>
  );
}

export default UserProfile;

import React, { useState, useEffect } from 'react';
// @ts-expect-error TS(2732): Cannot find module '../../configs.json'. Consider ... Remove this comment to see the full error message
import { host, getUserData, brokerLogin, getUserHoldings } from "../../configs.json";
import './UserProfile.css'; // Import the CSS file for styling
// @ts-expect-error TS(6142): Module './BrokerData' was resolved to 'D:/workspac... Remove this comment to see the full error message
import BrokerData from './BrokerData';

function UserProfile({
  username
}: any) {
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




  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  return (<div>
    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    <div className="profile-container glassy">
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <div className="profile-header">
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <h2 className="profile-username">{userData ? (userData as any).username : 'Loading...'}</h2>
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <div className="profile-details">
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        {userData ? (<>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div className="profile-avatar">
              {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <img src={(userData as any).user_details.profile_pic} alt="User Avatar"/>
            </div>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div className="profile-info">
              {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <p className="profile-field"><strong>Email:</strong> {(userData as any).email}</p>
              {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <p className="profile-field"><strong>PAN:</strong> {(userData as any).pan}</p>
              {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <p className="profile-field"><strong>Phone:</strong> {(userData as any).phone}</p>
              {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <p className="profile-field"><strong>Gender:</strong> {(userData as any).user_details.gender}</p>
              {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <p className="profile-field"><strong>About:</strong> {(userData as any).user_details.about}</p>
              {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <p className="profile-field"><strong>Date Of Birth:</strong> {(userData as any).user_details.dob}</p>
              {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <div className="access-pills">
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <strong>Access:</strong>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                {(userData as any).access.map((access: any, index: any) => (<span key={index} className="access-pill">{access}</span>))}
              </div>
            </div>
          {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          </>) : (<p>Loading user data...</p>)}
      </div>
      </div>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <br />
     {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
     {userData ? <BrokerData clientname={(userData as any).username} className="glassy"/> : <div>USername not found</div>}
    </div>);
}

export default UserProfile;

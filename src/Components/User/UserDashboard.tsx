import React, { useState, useEffect } from 'react';
import './UserDashboard.css';
import { host, userLogin, brokerLogin } from "../../configs.json";
import UserProfile from "./UserProfile";

function Toast({ message, type }) {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
  };

  return visible ? (
    <div className={`toast ${type}`}>
      <p className="message">{message}</p>
      <button className="close-button" onClick={handleClose}>
        X
      </button>
    </div>
  ) : null;
}


function UserDashboard() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('');
  const [sessionID, setSesssionID] = useState(null);
//   const [userData, setUserData] = useState(null);

  const checkSession = () => {
    console.log('Checking session');
    const sessionID_browser = localStorage.getItem('sessionID');
    const username_browser = localStorage.getItem('username');
    const sessionExpiry = localStorage.getItem('sessionExpiry');
    const currentTime = new Date().getTime();

    if (sessionID_browser && username_browser && sessionExpiry ){
        // && currentTime < sessionExpiry) {÷
      // User already logged in, fetch user details
      setUsername(username_browser);
      setSesssionID(sessionID_browser)
    }
  };



  useEffect(() => {
    checkSession();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(host + userLogin, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.status === 'SUCCESS') {
          localStorage.setItem('sessionID', data.data.session_id);
          localStorage.setItem('username', data.data.username);
          localStorage.setItem('sessionExpiry', new Date(data.data.session_expiry_at).getTime());
          setToastMessage('Login Successful!');
          setToastType('success');
        //   setUserData(data.data);
        window.location.reload();
        } else {
          setToastMessage('Login Failed! - ' + data.error_description);
          setToastType('error');
        }
      } else {
        setToastMessage('Something went wrong');
        setToastType('error');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      {(username && sessionID) ? (
        <UserProfile username={username} session_id = {sessionID} />
      ): (
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>User Login</h2>
          <input
            className="input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="button" type="submit">
            Login
          </button>
        </form>
      ) }
      {toastMessage && <Toast message={toastMessage} type={toastType} />}
    </div>
  );
}

export default UserDashboard;

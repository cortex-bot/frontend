import React, { useState, useEffect } from 'react';
import './UserDashboard.css';
// @ts-expect-error TS(2732): Cannot find module '../../configs.json'. Consider ... Remove this comment to see the full error message
import { host, userLogin, brokerLogin } from "../../configs.json";
// @ts-expect-error TS(6142): Module './UserProfile' was resolved to 'D:/workspa... Remove this comment to see the full error message
import UserProfile from "./UserProfile";

function Toast({
  message,
  type
}: any) {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
  };

  return visible ? (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={`toast ${type}`}>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <p className="message">{message}</p>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
      // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
      setUsername(username_browser);
      // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
      setSesssionID(sessionID_browser)
    }
  };



  useEffect(() => {
    checkSession();
  }, []);

  const handleSubmit = async (e: any) => {
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
          // @ts-expect-error TS(2345): Argument of type 'number' is not assignable to par... Remove this comment to see the full error message
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
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className="container">
      {(username && sessionID) ? (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <UserProfile username={username} session_id = {sessionID} />
      ): (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <form className="login-form" onSubmit={handleSubmit}>
          {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <h2>User Login</h2>
          {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <input
            className="input"
            type="text"
            placeholder="Username"
            // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | nu... Remove this comment to see the full error message
            value={username}
            // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
            onChange={(e) => setUsername(e.target.value)}
          />
          {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <input
            className="input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <button className="button" type="submit">
            Login
          </button>
        </form>
      ) }
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      {toastMessage && <Toast message={toastMessage} type={toastType} />}
    </div>
  );
}

export default UserDashboard;

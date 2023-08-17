import React, { useState, useEffect } from 'react';
import { host, brokerLogin, getUserHoldings,brokerLogout } from "../../configs.json";
import './BrokerData.css';

export default function BrokerData({ clientname }) {
  const [brokerDetails, setBrokerDetails] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const [otp, setOtp] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sessionID, setSesssionID] = useState(false);
  useEffect(() => {
    const fetchUserHoldings = async () => {
      try {
        let holdingsPayload = {
        broker_name: "ANGEL_ONE",
          username: clientname,
          session_id: localStorage.getItem("brokerSessionID")
        };
  
        const response = await fetch(host + getUserHoldings, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(holdingsPayload)
        });
  
        if (response.ok) {
          const data = await response.json();
          if (data.status === "SUCCESS") {
            // console.log("Success in holdings", data.data);
            if(data.data.message =="Please Login to fetch the holdings"){
              localStorage.removeItem("brokerDetails");
              setIsLoggedIn(false);
            }
            setHoldings(data.data.data);
            // console.log("is logged in:", isLoggedIn);
            // console.log("holdings data:", data.data.data);
          } else {
            console.error('Error:', data.error_description);
          }
        } else {
          console.error('Error:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    if (isLoggedIn) {
      fetchUserHoldings();
    }
  }, [isLoggedIn]);
  

  const handleBrokerLogin = async () => {
    try {
        console.log('client anem is ',clientname);

        let loginPayload = {
            broker_name: "ANGEL_ONE",
            username: clientname,
            session_id: localStorage.getItem("sessionID"),
            totp: otp
        }
      const response = await fetch(host + brokerLogin, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginPayload),
      });

      if (response.ok) {

            const data = await response.json();

        if(data.status == "SUCCESS"){
            setBrokerDetails({name : data.data.broker_name,clientId: data.data.client_id,
                brokerSessionId:data.data.session_id});
            setIsLoggedIn(true);
            setSesssionID(data.data.session_id);
            localStorage.setItem("brokerDetails", JSON.stringify({name : data.data.broker_name,clientId: data.data.client_id,
                brokerSessionId:data.data.session_id}));
        }
        else{
            console.error('Error:', data.error_description);
        }
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleBrokerLogout = async () => {
    try {
        let logoutPayload = {
            broker_name: "ANGEL_ONE",
            username: clientname,
            // session_id: localStorage.getItem("brokerSessionID")
        }
      const response = await fetch(host + brokerLogout, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logoutPayload),
      });

      if (response.ok) {
        const data = await response.json();
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLogout = () => {

    handleBrokerLogout();

    setBrokerDetails(null);
    setHoldings([]);
    setIsLoggedIn(false);
    localStorage.removeItem('brokerDetails')
  };


  useEffect(() => {
    setBrokerDetails(JSON.parse(localStorage.getItem("brokerDetails")));
    if(JSON.parse(localStorage.getItem("brokerDetails") != null))
        {setIsLoggedIn(true);}
  }, []);


  return (
    <div className="broker-container">
      {brokerDetails ? (
        <>
        <div className="profile-header">
        <h2 className="profile-username">{brokerDetails.name}</h2>
        <p>Broker ID: {brokerDetails.clientId}</p>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>

          {/* <div className="broker-details">
            <h3><center><b>{brokerDetails.name}</b></center></h3>
            <p>Broker ID: {brokerDetails.clientId}</p>
          </div> */}
          {/* <button className="logout-button" onClick={handleLogout}>Logout</button> */}
        </>
      ) : (
        <div className="broker-login">
          <h3>Broker Login</h3>
          <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
          <button onClick={handleBrokerLogin}>Login</button>
        </div>
      )}

    {
      holdings.length > 0 ? 
      (
        <div className="holdings-table">
          <h3>Holdings</h3>
          <table>
            <thead>
              <tr>
                <th>tradingsymbol</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((holding, index) => (
                <tr key={index}>
                  <td>{holding.tradingsymbol}</td>
                  <td>{holding.quantity}</td>
                  <td>{holding.averageprice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ):<div/>
      
      } 



    </div>
  );
}

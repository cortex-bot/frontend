import React, { useState, useEffect } from 'react';
// @ts-expect-error TS(2732): Cannot find module '../../configs.json'. Consider ... Remove this comment to see the full error message
import { host, brokerLogin, getUserHoldings,brokerLogout } from "../../configs.json";
import './BrokerData.css';

export default function BrokerData({
  clientname
}: any) {
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
            // @ts-expect-error TS(2345): Argument of type '{ name: any; clientId: any; brok... Remove this comment to see the full error message
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
    // @ts-expect-error TS(2345): Argument of type 'string | null' is not assignable... Remove this comment to see the full error message
    setBrokerDetails(JSON.parse(localStorage.getItem("brokerDetails")));
    // @ts-expect-error TS(2345): Argument of type 'boolean' is not assignable to pa... Remove this comment to see the full error message
    if(JSON.parse(localStorage.getItem("brokerDetails") != null))
        {setIsLoggedIn(true);}
  }, []);


  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  return (<div className="broker-container">
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      {brokerDetails ? (<>
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <div className="profile-header">
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <h2 className="profile-username">{(brokerDetails as any).name}</h2>
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <p>Broker ID: {(brokerDetails as any).clientId}</p>
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>

          {/* <div className="broker-details">
          <h3><center><b>{brokerDetails.name}</b></center></h3>
          <p>Broker ID: {brokerDetails.clientId}</p>
        </div> */}
          {/* <button className="logout-button" onClick={handleLogout}>Logout</button> */}
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        </>) : (<div className="broker-login">
          {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <h3>Broker Login</h3>
          {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)}/>
          {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <button onClick={handleBrokerLogin}>Login</button>
        </div>)}

    {holdings.length > 0 ?
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        (<div className="holdings-table">
          {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <h3>Holdings</h3>
          {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <table>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <thead>
              {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <tr>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <th>tradingsymbol</th>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <th>Quantity</th>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <th>Price</th>
              </tr>
            </thead>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <tbody>
              {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              {holdings.map((holding, index) => (<tr key={index}>
                  {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <td>{(holding as any).tradingsymbol}</td>
                  {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <td>{(holding as any).quantity}</td>
                  {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <td>{(holding as any).averageprice}</td>
                </tr>))}
            </tbody>
          </table>
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        </div>) : <div />} 



    </div>);
}

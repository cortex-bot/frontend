import { FaUserAlt, FaAlgolia, FaDev } from 'react-icons/fa';
import { MdRequestPage } from 'react-icons/md';
import { IoStatsChartSharp } from 'react-icons/io5';
import { AiOutlineControl } from 'react-icons/ai';
import { FaChessKnight, FaUser ,FaChartLine,FaSignal} from 'react-icons/fa';
import { Link } from 'react-router-dom';
// @ts-expect-error TS(2307): Cannot find module '../../assets/logo.png' or its ... Remove this comment to see the full error message
import logo from '../../assets/logo.png';

import { useState, useEffect } from 'react';
import './Sidebar.css';

const SideBar = () => {
  const [userProfilePic, setUserProfilePic] = useState('');

  useEffect(() => {
    const fetchUserProfilePic = () => {
      const userProfilePic = localStorage.getItem('userProfilePic');
      // @ts-expect-error TS(2345): Argument of type 'string | null' is not assignable... Remove this comment to see the full error message
      setUserProfilePic(userProfilePic);
    };

    fetchUserProfilePic();
  }, []);

return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col bg-primary text-secondary shadow-lg">
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <SideBarIcon icon={<img alt="logo" src={logo} className="rounded" />} path="/" label="Home" />
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <SideBarIcon icon={<IoStatsChartSharp size="28" />} path="/ranking" label="Ranking" />
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <SideBarIcon icon={<AiOutlineControl size="28" />} path="/executor_cp" label="Executor CP" />
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <SideBarIcon icon={<FaChessKnight size="28" />} path="/strategy_dashboard" label="Strategy Dashboard" />

      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <SideBarIcon icon={<FaSignal size="28" />} path="/generate_signals" label="Generate Signals" />
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <SideBarIcon icon={<FaChartLine size="28" />} path="/signals_dashboard" label="Signals Dashboard" />


        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <div className="user-profile-pic ">
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Link to="/user">

      {userProfilePic ? (
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <img src={userProfilePic} alt="User Profile" />
          ): 
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <FaUser size="28" className='user-icon'/>
      }
        </Link>
        </div>
    


      </div>
    
  );
};

const SideBarIcon = ({
  icon,
  path
}: any) => (
  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  <Link to={path}>
    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    <div className="sidebar-icon">{icon}</div>
  </Link>
);

export default SideBar;

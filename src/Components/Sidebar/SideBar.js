import { FaUserAlt, FaAlgolia, FaDev } from 'react-icons/fa';
import { MdRequestPage } from 'react-icons/md';
import { IoStatsChartSharp } from 'react-icons/io5';
import { AiOutlineControl } from 'react-icons/ai';
import { FaChessKnight, FaUser ,FaChartLine,FaSignal} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

import { useState, useEffect } from 'react';
import './Sidebar.css';

const SideBar = () => {
  const [userProfilePic, setUserProfilePic] = useState('');

  useEffect(() => {
    const fetchUserProfilePic = () => {
      const userProfilePic = localStorage.getItem('userProfilePic');
      setUserProfilePic(userProfilePic);
    };

    fetchUserProfilePic();
  }, []);

return (
    <div className="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col bg-primary text-secondary shadow-lg">
      <SideBarIcon icon={<img alt="logo" src={logo} className="rounded" />} path="/" label="Home" />
      <SideBarIcon icon={<IoStatsChartSharp size="28" />} path="/ranking" label="Ranking" />
      <SideBarIcon icon={<AiOutlineControl size="28" />} path="/executor_cp" label="Executor CP" />
      <SideBarIcon icon={<FaChessKnight size="28" />} path="/strategy_dashboard" label="Strategy Dashboard" />

      <SideBarIcon icon={<FaSignal size="28" />} path="/generate_signals" label="Generate Signals" />
      <SideBarIcon icon={<FaChartLine size="28" />} path="/signals_dashboard" label="Signals Dashboard" />


        <div className="user-profile-pic ">
        <Link to="/user">

      {userProfilePic ? (
          <img src={userProfilePic} alt="User Profile" />
          ): 
          <FaUser size="28" className='user-icon'/>
      }
        </Link>
        </div>
    


      </div>
    
  );
};

const SideBarIcon = ({ icon, path }) => (
  <Link to={path}>
    <div className="sidebar-icon">{icon}</div>
  </Link>
);

export default SideBar;

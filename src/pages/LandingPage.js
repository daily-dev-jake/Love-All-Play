import React from "react";
import "./LandingPage.css";
import { HiOutlineHome } from "react-icons/hi";
import { MdDescription } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
const LandingPage = () => {
  

  return (
    <div className='landing-wrapper'>
      <div>
      <h1>Welcome!</h1>
      <h2>Press <HiOutlineHome /> icon to start recording score</h2>
      <h2>Press <MdDescription /> icon to see your match history</h2>
      <h2>Press <FaRegUserCircle /> icon to set player names</h2>
      </div>
    </div>
  );
};

export default LandingPage;

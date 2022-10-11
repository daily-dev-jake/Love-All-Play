import React from "react";
import './BottomNav.css'
import { HiHome } from "react-icons/hi";
import { HiOutlineHome } from "react-icons/hi";
import { MdDescription } from "react-icons/md";
import { MdOutlineDescription } from "react-icons/md";
import { IoMdSettings } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";

const BottomNav = () => {
  return (
    <footer className='Btm-nav'>
      {/* <div className='Btm-wrapper'> */}
        <div className='Home-nav'>
          <HiHome fontSize={52} />
        </div>
        <div className='Log-nav'>
          <MdOutlineDescription fontSize={50} />
        </div>
        <div className='Settings-nav'>
          <IoSettingsOutline fontSize={50} />
        </div>
        <div className='Profile-nav'>
          <FaRegUserCircle fontSize={46} />
        </div>
      {/* </div> */}
    </footer>
  );
};

export default BottomNav;

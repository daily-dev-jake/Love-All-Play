import React from "react";
import { NavLink } from "react-router-dom";

import "./BottomNav.css";
import { HiHome } from "react-icons/hi";
import { HiOutlineHome } from "react-icons/hi";
import { MdDescription } from "react-icons/md";
import { MdOutlineDescription } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";

const BottomNav = () => {
  return (
    <nav className='Btm-nav'>
      <NavLink
        to='/app/gamepage'
        className={({ isActive }) => (isActive ? "active" : "inactive")}>
        {({ isActive }) =>
          isActive ? <HiHome fontSize={36}/> : <HiOutlineHome fontSize={32}/>
        }
      </NavLink>
       <NavLink
        to='/app/records'
        className={({ isActive }) => (isActive ? "active" : "inactive")}>
        {({ isActive }) =>
          isActive ? (
            <MdDescription fontSize={36}/>
          ) : (
            <MdOutlineDescription fontSize={32}/>
          )
        }
      </NavLink>
      {/* <NavLink
        to='/app/settings'
        className={({ isActive }) => (isActive ? "active" : "inactive")}>
        {({ isActive }) =>
          isActive ? (
            <IoMdSettings/>
          ) : (
            <IoSettingsOutline />
          )
        }
      </NavLink> */}
      <NavLink
        to='/app/user'
        className={({ isActive }) => (isActive ? "active" : "inactive")}>
        {({ isActive }) =>
          isActive ? (
            <FaUserCircle fontSize={36}/>
          ) : (
            <FaRegUserCircle fontSize={32}/>
          )
        }
      </NavLink>
    </nav>
  );
};

export default BottomNav;

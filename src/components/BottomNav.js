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
          isActive ? <HiHome fontSize={65} /> : <HiOutlineHome fontSize={52} />
        }
      </NavLink>
      <NavLink
        to='/app/records'
        className={({ isActive }) => (isActive ? "active" : "inactive")}>
        {({ isActive }) =>
          isActive ? (
            <MdDescription fontSize={65} />
          ) : (
            <MdOutlineDescription fontSize={50} />
          )
        }
      </NavLink>
      <NavLink
        to='/app/settings'
        className={({ isActive }) => (isActive ? "active" : "inactive")}>
        {({ isActive }) =>
          isActive ? (
            <IoMdSettings fontSize={65} />
          ) : (
            <IoSettingsOutline fontSize={50} />
          )
        }
      </NavLink>
      <NavLink
        to='/app/user'
        className={({ isActive }) => (isActive ? "active" : "inactive")}>
        {({ isActive }) =>
          isActive ? (
            <FaUserCircle fontSize={65} />
          ) : (
            <FaRegUserCircle fontSize={48} />
          )
        }
      </NavLink>
    </nav>
  );
};

export default BottomNav;

import React from "react";
import "./UserPage.css";
import PlayerProfileForm from '../components/PlayerProfileForm'
const UserPage = () => {

  return (
    <PlayerProfileForm action={'edit'} />
  );
};

export default UserPage;

import React, { useState, useEffect } from "react";
import { GoogleLogin, googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import "./UserPage.css";

const UserPage = ({ handleNameChange, player1Name, player2Name }) => {
  const [nameofPlayer1, setPlayer1] = useState("");
  const [nameofPlayer2, setPlayer2] = useState("");
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);


  const handleOnNameChange = (e, playerNum) => {
    console.log(e.target.value, " ", playerNum);
    e.preventDefault();
    if (playerNum === 1) setPlayer1(e.target.value);
    if (playerNum === 2) setPlayer2(e.target.value);
  };
  const handlePlayerNameUpdate = (e) => {
    // TODO: Save it

    e.preventDefault();
    console.log(nameofPlayer1, " ", nameofPlayer2);
    savePlayerName(nameofPlayer1, nameofPlayer2);
    handleNameChange(1, nameofPlayer1);
    handleNameChange(2, nameofPlayer2);
  };
  const savePlayerName = (playerName1, playerName2) => {
    sessionStorage.setItem('playerName1', playerName1);
    sessionStorage.setItem('playerName2', playerName2);
  };
  
const googleLogin = useGoogleLogin({
  flow: 'auth-code',
  onSuccess: async (codeResponse) => {
    // const options = {
    //   headers: {
    //     'Access-Control-Allow-Origin' : '*',
    //     'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',   
    // }
    // }
      console.log("Code Response: "+codeResponse.code);
      const tokens = await axios.post(
          `http://localhost:${process.env.REACT_APP_SERVER_PORT}/auth/google`, {
              code: codeResponse.code
          });
          // setUser();
      console.log(tokens);
  },
  onError: errorResponse => console.log(errorResponse),
});


  useEffect(() => {
    if (user) {
      googleLogin();
    }
  },
    [user,googleLogin]
  );

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  return (
    <div>
      {profile ? (
        <div className="loggedin-container">
          <img src={profile.picture} alt="user" />
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <button onClick={logOut}>Log out</button>
        </div>
      ) : (
        <div className='guest-view'>
          <div className="guest-header">
            <h1>Hi Guest</h1>
            <h3>Login or Sign up with Google here!</h3>
            {googleLogin()}
          </div>
          <form onSubmit={handlePlayerNameUpdate}>
            <div className='form-group'>
              <label htmlFor='player1' className='form-label'>
                Player 1:
              </label>
              <input
                type='text'
                id='player1'
                className='form-input'

                onChange={(e) => handleOnNameChange(e, 1)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='player2' className='form-label'>
                Player 2:
              </label>
              <input
                type='text'
                id='player2'
                className='form-input'
                onChange={(e) => handleOnNameChange(e, 2)}
              />
              <button className='form-button' type='submit'>
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserPage;

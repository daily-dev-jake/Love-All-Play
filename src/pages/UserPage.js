import React, { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import "./UserPage.css";

const UserPage = ({ setPlayer1Name, setPlayer2Name, player1Name, player2Name, loginProfile, setProfile }) => {
  // const [nameofPlayer1, setPlayer1] = useState("");
  // const [nameofPlayer2, setPlayer2] = useState("");
  const [user, setUser] = useState([]);
  // const [loginProfile, setProfile] = useState([]);

  const handleOnNameChange = (e, playerNum) => {
    console.log(e.target.value, " ", playerNum);
    e.preventDefault();
    if (playerNum === 1) setPlayer1Name(e.target.value);
    if (playerNum === 2) setPlayer2Name(e.target.value);
  };
  const handlePlayerNameUpdate = (e) => {
    // TODO: Save it

    e.preventDefault();
    console.log(player1Name, " ", player2Name);
    // savePlayerName(nameofPlayer1, nameofPlayer2);

    // handleNameChange(1, nameofPlayer1);
    // handleNameChange(2, nameofPlayer2);
  };
  // const savePlayerName = (playerName1, playerName2) => {
  //   sessionStorage.setItem('playerName1', playerName1);
  //   sessionStorage.setItem('playerName2', playerName2);
  // };

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      setUser(codeResponse);
    },
    onError: errorResponse => console.log(errorResponse),
  });

  const isObjectEmpty = (objectName) => {
    return JSON.stringify(objectName) === "{}" || JSON.stringify(objectName) === "[]";
  };

  useEffect(() => {
    console.log("Gmail user object: " + JSON.stringify(user, null, 4));
    if (!isObjectEmpty(user)) {
      // INFO: by right this is supposed to send to backend and process the client_id+client_secret
      // console.log("User object: " + JSON.stringify(user, null, 4));
      axios.post("https://oauth2.googleapis.com/token", {
        'code': user.code,
        'client_id': process.env.REACT_APP_GOOGLE_CLIENT_ID,
        'client_secret': process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
        'redirect_uri': 'postmessage',
        'grant_type': 'authorization_code'
      })
        .then((tokens) => {
          // console.log("tokens: " + JSON.stringify(tokens, null, 4));
          // INFO: Gets userInfo
          axios
            .get('https://www.googleapis.com/oauth2/v3/userinfo', {
              headers: { Authorization: `Bearer ${tokens.data.access_token}` },
            })
            .then(res => {
              // console.log("res obj: " + JSON.stringify(res.data));
              setProfile(res.data);
              setPlayer1Name(res.data.name);
              return;
            });
        }).catch((error) => {
          console.log(error);
          // alert('Failed to login');
        }

        );
    }
    //

  },
    [user, loginProfile, setPlayer1Name, player1Name, setProfile]
  );

  const logOut = () => {
    googleLogout();
    // sets profile to empty object
    setProfile({});
  };

  return (
    <div>
      {!isObjectEmpty(loginProfile) ? (
        <div className="loggedin-container">
          <img src={loginProfile.picture} alt="user" />
          <h3>Logged in</h3>
          <p>Name {" (Player 1): " + loginProfile.name}</p>
          {/* <p>Email Address: {loginProfile.email}</p> */}
          {player2Name !== "" ? (
            <>
              <p>Player 2:{player2Name}</p>
              <button className="rename-button">Rename</button>
            </>
          ) : (
            <>
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
            </>
          )}
          <button onClick={logOut}>Log out</button>
        </div>
      ) : (
        <div className='guest-view'>
          <div className="guest-header">
            <h1>Hi Guest</h1>
            <button onClick={googleLogin}>Login or Sign up with Google 🚀!</button>
          </div>
          <form onSubmit={handlePlayerNameUpdate}>
            <div className='form-group'>
              <label htmlFor='player1' className='form-label'>
                Player 1:
              </label>
              <label htmlFor='player1' className='form-label'>
                {player1Name}
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
      )
      }
    </div >
  );
};

export default UserPage;

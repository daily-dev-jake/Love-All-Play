import React, { useState } from "react";
import "./UserPage.css";

const UserPage = ({handleNameChange, player1Name, player2Name}) => {
  const [nameofPlayer1, setPlayer1] = useState("");
  const [nameofPlayer2, setPlayer2] = useState("");

  const handleOnNameChange = (e, playerNum) => {
    console.log(e.target.value," ",playerNum);
    e.preventDefault();
    if(playerNum === 1) setPlayer1(e.target.value);
    if(playerNum === 2) setPlayer2(e.target.value);
  };
  const handlePlayerNameUpdate = (e) => {
    // TODO: Save it
    
    e.preventDefault();
    console.log(nameofPlayer1," ",nameofPlayer2);
    savePlayerName(nameofPlayer1,nameofPlayer2);
    handleNameChange(1, nameofPlayer1);
    handleNameChange(2, nameofPlayer2);
  };
  const savePlayerName = (playerName1,playerName2) => {
    sessionStorage.setItem('playerName1', playerName1);
    sessionStorage.setItem('playerName2', playerName2);
  };
  return (
    <div>
      <div className='guest-view'>
      <div className="guest-header">
        <h1>Hi Guest</h1>
        <a href="./">Login or Sign up here</a>
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
              
              onChange={(e) => handleOnNameChange(e,1)}
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
              onChange={(e) => handleOnNameChange(e,2)}
            />
            <button className='form-button' type='submit'>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserPage;

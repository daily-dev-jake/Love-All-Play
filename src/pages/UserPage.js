import React from "react";
import "./UserPage.css";

const UserPage = ({ setPlayer1Name, setPlayer2Name, player1Name, player2Name }) => {

  const handleOnNameChange = (e, playerNum) => {
    e.preventDefault();
    if (playerNum === 1) setPlayer1Name(e.target.value);
    if (playerNum === 2) setPlayer2Name(e.target.value);
  };
  const handlePlayerNameUpdate = (e) => {
    e.preventDefault();
    console.log(player1Name, " ", player2Name);
    if(player1Name !== '' || player2Name !== '')
      savePlayersNamesLocally(player1Name, player2Name);
  };
  const savePlayersNamesLocally = (player1Name, player2Name) => {
    localStorage.setItem('player1Name', player1Name);
    localStorage.setItem('player2Name', player2Name);
  };

  return (
    <div className="profile-wrapper">
      <h1>User settings</h1>

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
  );
};

export default UserPage;

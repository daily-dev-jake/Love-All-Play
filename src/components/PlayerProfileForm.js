import React, { useState, useEffect } from "react";
import "./PlayerProfileForm.css";
import api from '../dbService'
import { Link, useNavigate } from "react-router-dom";

const PlayerProfileForm = ({ action }) => {
  const navigate = useNavigate();
  const DEFAULT_ID = -1;
  const DEFAULT_PLAYER_OBJECT = { id: DEFAULT_ID, name: "", email: "" };
  const [player1Details, setPlayer1Details] = useState(DEFAULT_PLAYER_OBJECT);
  const [player2Details, setPlayer2Details] = useState(DEFAULT_PLAYER_OBJECT);
  const [submitted, setSubmitted] = useState(false);
  const [playerCreated, setPlayerCreated] = useState(false);

  useEffect(() => {
    const checkIfPlayerExist = async (player, playerNumber) => {
      if (player.name === '' && player.email === '') {
        setPlayer1Details(JSON.parse(player));
        if (action === 'edit') {
          try {
            await api.getById('player', player.id);
          } catch (error) {
            // If player data doesn't exist
            if (playerNumber === 1) {
              setPlayer1Details(DEFAULT_PLAYER_OBJECT);
              localStorage.setItem('player1', JSON.stringify(DEFAULT_PLAYER_OBJECT));
            }
            else {
              setPlayer2Details(DEFAULT_PLAYER_OBJECT);
              localStorage.setItem('player2', JSON.stringify(DEFAULT_PLAYER_OBJECT));
            }
          }
        }
      }
    }
    console.log('action: ' + action);
    const DEFAULT_PLAYER_OBJECT = { id: DEFAULT_ID, name: "", email: "" };
    const p1 = JSON.parse(localStorage.getItem('player1'));
    const p2 = JSON.parse(localStorage.getItem('player2'));
    if (p2 === null || p1 === null) return;

    checkIfPlayerExist(p1, 1);
    checkIfPlayerExist(p2, 2);
  }, [action, DEFAULT_ID]);

  const createNewPlayer = async (playerDetails, playerNumber) => {
    if (playerDetails.id === DEFAULT_ID) {
      const { id, ...p1 } = playerDetails; // creates obj without id
      try {
        const res = await api.create('player', p1);
        if (res) {
          console.log(res);
          if (playerNumber === 1) {
            setPlayer1Details((prev) => ({ ...prev, id: res._id }));
            localStorage.setItem('player1', JSON.stringify({ ...playerDetails, id: res._id }));
          }
          else {
            setPlayer2Details((prev) => ({ ...prev, id: res._id }));
            localStorage.setItem('player2', JSON.stringify({ ...playerDetails, id: res._id }));
          }
          return res._id;
        }
      } catch (error) {
        console.log('Failed to create new player: ' + playerDetails.name);
        alert('Failed to create new player: ' + playerDetails.name + ". Email in use.");
      }
    }
  }

  const createMatch = async (id1, id2) => {
    const players = { 'player1': id1, 'player2': id2 };
    const res = await api.create('match', players);
    if (res) {
      console.log('After creating match\'s response: ' + res);
      localStorage.setItem('matchId', res._id);
    }
  }
  const savePlayersNames = async () => {
    localStorage.setItem('player1', JSON.stringify(player1Details));
    localStorage.setItem('player2', JSON.stringify(player2Details));

    if (action === 'edit') {
      // update db
      if (player1Details.id !== DEFAULT_ID) api.update('player', player1Details.id, player1Details);
      if (player2Details.id !== DEFAULT_ID) api.update('player', player2Details.id, player2Details);
    }
    else if (action === 'create') {
      // create new users
      const player1Id = await createNewPlayer(player1Details, 1);
      const player2Id = await createNewPlayer(player2Details, 2);
      await createMatch(player1Id, player2Id);
    }
    else {
      // action === 'login'
      let player1Verified = false;
      let player2Verified = false;
      let player1Id = '';
      let player2Id = '';
      try {
        let p1 = await api.getByName('player', player1Details.name);
        p1 = await api.getByEmail('player', player1Details.email);
        if (p1) {
          // Player 1 verified
          player1Verified = true;
          player1Id = p1._id;
        }
      } catch (error) {
        player1Verified = false;
        localStorage.removeItem('player1');
      }
      try {
        let p2 = await api.getByName('player', player2Details.name);
        p2 = await api.getByEmail('player', player2Details.email);
        if (p2) {
          // Player 2 verified
          player2Verified = true;
          player2Id = p2._id;
        }
      } catch (error) {
        player2Verified = false;
        localStorage.removeItem('player2');
      }
      alert(`${player1Details.name} is ${player1Verified ? 'logged in' : 'not signed up. Please sign up first'}. \n
${player2Details.name} is ${player2Verified ? 'logged in' : 'not signed up. Please sign up first'}.`);
      if (player1Verified && player2Verified) {
        await createMatch(player1Id, player2Id);
      }
    }
  };

  const handleOnChange = (e, playerNum) => {
    const { name, value } = e.target;
    if (playerNum === 1) setPlayer1Details((prev) => ({ ...prev, [name]: value }));
    if (playerNum === 2) setPlayer2Details((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlayerProfileUpdate = (e) => {
    e.preventDefault();

    if (!player1Details.name.trim() || !player1Details.email.trim()) {
      alert("Please fill in both fields.");
      return;
    }

    console.log("Submitted Data:", player1Details);
    setSubmitted(true);
    savePlayersNames();
  };

  useEffect(() => {
    console.log(`player1Details: ${JSON.stringify(player1Details)}`);
    console.log(`player2Details: ${JSON.stringify(player2Details)}`);
    if (player1Details.id !== DEFAULT_ID || player2Details.id !== DEFAULT_ID)
      setPlayerCreated(true);
    else setPlayerCreated(false);
  }, [player1Details, player2Details, setPlayer1Details, setPlayer2Details, DEFAULT_ID]);

  useEffect(() => {
    if (submitted && playerCreated)
      setTimeout(() => {
        navigate('/app/gamepage')
      }, 5000);
  }, [submitted, playerCreated, navigate]);

  const redirector = () => <div>
    <h2>Thanks for signing up!</h2>
    <p>Now redirecting to game page</p>
  </div>


  return (
    <div className="profile-wrapper">
      {action === 'edit' && player1Details.name === '' && player1Details.email === ''
        ?
        <div>
          <h1>Please go back to <Link to={"/landing"}>landing page</Link></h1>
        </div>
        : <div>
          {action === 'create'
            ? <h1>Add Players</h1>
            : action === 'edit'
              ? <h1>Edit Players</h1>
              : <h1>Player Login</h1> //login
          }
          {submitted && playerCreated
            ? redirector()
            : (
              <form onSubmit={handlePlayerProfileUpdate}>
                <div className='form-group'>
                  <label htmlFor='player1' className='form-label'>
                    Player 1:
                  </label>
                  <label htmlFor='player1' className='form-label'>
                    Name:
                  </label>
                  <input
                    type='text'
                    name="name"
                    value={player1Details.name}
                    className='form-input'
                    onChange={(e) => handleOnChange(e, 1)}
                  />
                  <label htmlFor='player1' className='form-label'>
                    Email:
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={player1Details.email}
                    onChange={(e) => handleOnChange(e, 1)}
                    className="form-input"
                    placeholder="you@example.com"
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='player2' className='form-label'>
                    Player 2:
                  </label>
                  <label htmlFor='player2' className='form-label'>
                    Name:
                  </label>
                  <input
                    type='text'
                    name='name'
                    value={player2Details.name}
                    className='form-input'
                    onChange={(e) => handleOnChange(e, 2)}
                  />
                  <label htmlFor='player2' className='form-label'>
                    Email:
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={player2Details.email}
                    onChange={(e) => handleOnChange(e, 2)}
                    className="form-input"
                    placeholder="you@example.com"
                  />
                  <button className='form-button' type='submit'>
                    Submit
                  </button>
                </div>
              </form>
            )}
        </div>}
    </div>
  );
};

export default PlayerProfileForm;

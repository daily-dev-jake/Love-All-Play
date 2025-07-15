import React, { useState, useEffect } from "react";
import "./LandingPage.css";
import { HiOutlineHome } from "react-icons/hi";
import { MdDescription } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { Link, Navigate } from "react-router-dom";

const LandingPage = () => {

  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');

  useEffect(() => {
    const p1 = JSON.parse(localStorage.getItem('player1'));
    const p2 = JSON.parse(localStorage.getItem('player2'));

    if (p1) setPlayer1Name(p1.name);
    if (p2) setPlayer2Name(p2.name);
  }, []);

  return (
    <div className='landing-wrapper'>
      <div>
        <h1>Welcome {player1Name === '' ? '' :
          <div>{player1Name} & {player2Name}!</div>
        }!</h1>
        {player1Name === ''
          ?
          <div>
            <Link to={"/app/signup"}>
              <p>Sign up for new account</p>
            </Link>
            <p>OR</p>
            <Link to={"/app/login"}>
              <p>Login</p>
            </Link>
          </div>
          : <div>
            <h2>Press <HiOutlineHome /> icon to start recording score</h2>
            <h2>Press <MdDescription /> icon to see your match history</h2>
            <h2>Press <FaRegUserCircle /> icon to edit player profiles</h2>
          </div>
        }
      </div>
    </div>
  );
};

export default LandingPage;

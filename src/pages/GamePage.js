import React, { useState, useEffect, useContext } from "react";
import PlayerCourts from "../components/PlayerCourts";
import { MdOutlineSwapVert } from "react-icons/md";
import "./GamePage.css"
const playerScores = {
  player1: 0,
  player2: 0,
};

const GamePage = () => {
  //initialise state
  const [playerTopScores, setPlayerTopScores] = useState(0);
  const [playerBtmScores, setPlayerBtmScores] = useState(0);

  //#region Court position
  //  -------------
  //  |     |     | Top
  //  |  R  |  L  |
  //  -------------
  //  |  L  |  R  | Btm
  //  |     |     |
  //  -------------
  //#endregion

  const handleClickTopCourt = () => {
    setPlayerTopScores(playerTopScores + 1);
    playerScores.player1++;
  };
  const handleClickBtmCourt = () => {
    setPlayerBtmScores(playerBtmScores + 1);
    playerScores.player2++;
  };
  // useEffect(() => {
  //   //initial states
  //   setPlayer1Scores(playerScores.player1);
  //   setPlayer2Scores(playerScores.player2);
  //   setPlayer1Position("R");
  // }, []);

  return (
    <div className='gamePage'>
      <PlayerCourts
        playerScores={playerTopScores}
        handleClickCourt={handleClickTopCourt}
      />
      <div className='net'>
        <MdOutlineSwapVert fontSize={52} />
        <img alt='Net' />
      </div>
      <PlayerCourts
        playerScores={playerBtmScores}
        handleClickCourt={handleClickBtmCourt}
      />
      <div className='gamescore-wrapper'>Scores</div>
    </div>
  );
};

export default GamePage;

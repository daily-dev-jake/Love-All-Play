import React, { useState, useEffect, useContext } from "react";
import PlayerCourts from "../components/PlayerCourts";
import { MdOutlineSwapVert } from "react-icons/md";
import { GrPowerReset } from "react-icons/gr";
import "./GamePage.css";
const playerScores = {
  player1: 0,
  player2: 0,
};

const GamePage = () => {
  //initialise state
  const [topCourtScore, setTopCourtScore] = useState(0);
  const [btmCourtScore, setBtmCourtScore] = useState(0);

  //#region Court position
  //  -------------
  //  |     |     | Top
  //  |  R  |  L  |
  //  -------------
  //  |  L  |  R  | Btm
  //  |     |     |
  //  -------------
  //#endregion

  const makeCourtGreen = (courtPosition) => {
    if (courtPosition === "top") {
    }
    if (courtPosition === "btm") {
    }
  };

  const isWon = () => {
    if (
      (topCourtScore === 21 && btmCourtScore < 20) ||
      (btmCourtScore === 21 && topCourtScore < 20)
    ) {
      // Winner court is top court
      console.log("Won");
      return true;
    }
    return false;
  };

  const isMatchPoint = (topCourtScore, btmCourtScore) => {
    if (topCourtScore === 20 && btmCourtScore < 20) {
      return true;
    }
    if (btmCourtScore === 20 && topCourtScore < 20) {
      //Make Court green
      makeCourtGreen("btm");
      return true;
    }
    return false;
  };
  const handleClickTopCourt = () => {
    setTopCourtScore(topCourtScore + 1);
    playerScores.player1++;
    if (isMatchPoint) {
      //Make Court green
      makeCourtGreen("top");
    }
  };
  const handleClickBtmCourt = () => {
    setBtmCourtScore(btmCourtScore + 1);
    playerScores.player2++;
    if (isMatchPoint) {
      //Make Court green
      makeCourtGreen("top");
    }
  };
  const handleClickSwapCourt = () => {

  }
  // useEffect(() => {
  //   //initial states
  //   setPlayer1Scores(playerScores.player1);
  //   setPlayer2Scores(playerScores.player2);
  //   setPlayer1Position("R");
  // }, []);

  return (
    <div className='gamePage'>
      <PlayerCourts
        playerScores={topCourtScore}
        handleClickCourt={handleClickTopCourt}
      />
      <div className='net' onClick={handleClickSwapCourt}>
        <MdOutlineSwapVert fontSize={55} />
        <img alt='Net' />
      </div>
      <PlayerCourts
        playerScores={btmCourtScore}
        handleClickCourt={handleClickBtmCourt}
      />
      <div className='gameScore-wrapper'>
        <p>Scores</p>
        <div className='gameScores'>
          <GrPowerReset fontSize={50}/>

          <div className='courtScore'>{topCourtScore}</div>
          <p>:</p>
          <div className='courtScore'>{btmCourtScore}</div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;

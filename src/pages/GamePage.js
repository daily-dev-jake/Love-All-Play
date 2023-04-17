import React, { useState, useEffect, useContext } from "react";
import PlayerCourts from "../components/PlayerCourts";
import { MdOutlineSwapVert } from "react-icons/md";
import { GrPowerReset } from "react-icons/gr";
import "./GamePage.css";

const DEBUG = true;

const debugScores = {
  player1: 0,
  player2: 0,
};

const playerScores = {
  player1: 0,
  player2: 0,
};

const GamePage = () => {
  //initialise state
  const [topCourtScore, setTopCourtScore] = useState(playerScores.player1);
  const [btmCourtScore, setBtmCourtScore] = useState(playerScores.player2);

  useEffect(() => {
    if (DEBUG) {
      //initial states
      setTopCourtScore(debugScores.player1);
      setBtmCourtScore(debugScores.player2);
      playerScores.player1 = debugScores.player1;
      playerScores.player2 = debugScores.player1;
      console.log("Init: topCourtScore = " + topCourtScore + " btmCourtScore = " + btmCourtScore);
    }
  }, []);

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
    console.log(courtPosition + " Match Point");
  };

  const resetMatch = () => {
    if (DEBUG) {
      setTopCourtScore(debugScores.player1);
      setBtmCourtScore(debugScores.player1);
      playerScores.player1 = debugScores.player1;
      playerScores.player2 = debugScores.player1;
    } else {
      setTopCourtScore(0);
      setBtmCourtScore(0);
      playerScores.player1 = 0;
      playerScores.player2 = 0;
    }
  };

  const checkTopWon = (topCourtScore, btmCourtScore) => {
    if (
      (topCourtScore === 21 && btmCourtScore < 20) ||
      (topCourtScore >= 20 &&
       btmCourtScore >= 20 &&
      (topCourtScore - btmCourtScore) >= 2) ||
      (topCourtScore === 29)
    ) {
      // Winner court is top court
      console.log("Top Won with score of " + topCourtScore + " : " + btmCourtScore);

      resetMatch();
    }
  };

  const checkBtmWon = (topCourtScore, btmCourtScore) => {
    if (
      (btmCourtScore === 21 && topCourtScore < 20) ||
      (btmCourtScore >= 20 &&
       topCourtScore >= 20 &&
      (btmCourtScore - topCourtScore) >= 2) ||
      (btmCourtScore === 29)
    ) {
      // Winner court is btm court
      console.log("Btm Won with score of " + btmCourtScore + " : " + topCourtScore);
      resetMatch();
    }
  };

  const checkMatchPoint = (topCourtScore, btmCourtScore) => {
    if (
      (topCourtScore === 20 && btmCourtScore <= 19) ||
      (btmCourtScore >= 20 &&
       topCourtScore >= 20 &&
      (topCourtScore - btmCourtScore) >= 1)
    ) {
      makeCourtGreen("top");
      return true;
    }
    if (
      (btmCourtScore === 20 && topCourtScore <= 19) ||
      (btmCourtScore >= 20 &&
       topCourtScore >= 20 &&
      (btmCourtScore - topCourtScore) >= 1)
    ) {
      //Make Court green
      makeCourtGreen("btm");
      return true;
    }
    return false;
  };
  const handleClickTopCourt = () => {
    setTopCourtScore((prevState) => prevState + 1);
    playerScores.player1++;
    console.log("top score = " + playerScores.player1);
    checkMatchPoint(playerScores.player1, playerScores.player2);
    checkTopWon(playerScores.player1, playerScores.player2);
  };
  const handleClickBtmCourt = () => {
    setBtmCourtScore((prevState) => prevState + 1);
    playerScores.player2++;
    console.log("btm score = " + playerScores.player2);
    checkMatchPoint(playerScores.player1, playerScores.player2);
    checkBtmWon(playerScores.player1, playerScores.player2);
  };
  const handleClickSwapCourt = () => {};
  const handleResetMatch = () => {
    resetMatch();
  };

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
          <GrPowerReset fontSize={50} onClick={handleResetMatch} />

          <div className='courtScore'>{topCourtScore}</div>
          <p>:</p>
          <div className='courtScore'>{btmCourtScore}</div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;

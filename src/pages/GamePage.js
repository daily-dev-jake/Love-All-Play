import React, { useState, useEffect, useContext } from "react";
import PlayerCourts from "../components/PlayerCourts";
import { MdOutlineSwapVert } from "react-icons/md";
import { GrPowerReset } from "react-icons/gr";
import "./GamePage.css";

const DEBUG = false;

class Player {
  constructor(playerName, playerScore) {
    this.playerName = playerName;
    this.playerScore = playerScore;
  }
}
// TODO: Make 2 or 4 players (If 4 players = need to make 2 teams)
const playerCount = {
  Two: 2,
  Four: 4,
};

const debugScores = {
  player1: 19,
  player2: 19,
};

// const debugMatchScores = {
//   player1: 0,
//   player2: 0,
// };

const playerScores = {
  player1: 0,
  player2: 0,
};

const playerMatchScores = {
  player1: 0,
  player2: 0,
};

const GamePage = ({ player1Name, player2Name }) => {
  //initialise state
  const [topCourtScore, setTopCourtScore] = useState(playerScores.player1);
  const [btmCourtScore, setBtmCourtScore] = useState(playerScores.player2);
  const Player1 = new Player(player1Name, playerScores.player1);
  const Player2 = new Player(player2Name, playerScores.player2);
  const [player1MatchScore, setplayer1MatchScore] = useState(
    playerMatchScores.player1
  );
  const [player2MatchScore, setplayer2MatchScore] = useState(
    playerMatchScores.player2
  );
  
  useEffect(() => {
    Player1.playerName = player1Name;
    Player2.playerName = player2Name;
    console.log(
      "Init: topCourtScore = " +
        topCourtScore + " with player 1: " + player1Name +
        " btmCourtScore = " +
        btmCourtScore + " with player 2: " + player2Name
    );
    }, [player1Name, player2Name]);
  useEffect(() => {
    Player1.playerName = player1Name;
    Player2.playerName = player2Name;
    if (DEBUG) {
      //initial states
      setTopCourtScore(debugScores.player1);
      setBtmCourtScore(debugScores.player2);
      playerScores.player1 = debugScores.player1;
      playerScores.player2 = debugScores.player1;
      // console.log(
      //   "Init: topCourtScore = " +
      //     topCourtScore + " with player 1: " + player1Name +
      //     " btmCourtScore = " +
      //     btmCourtScore + " with player 2: " + player2Name
      // );
    }
    // else {

    //   const player1 = new Player(player1Name, 0);
    //   const player2 = new Player(player2Name, 0);
    // }
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

  const resetGame = () => {
    if (DEBUG) {
      setTopCourtScore(debugScores.player1);
      setBtmCourtScore(debugScores.player1);
      // setplayer1MatchScore(0);
      // setplayer2MatchScore(0);
      playerScores.player1 = debugScores.player1;
      playerScores.player2 = debugScores.player1;
    } else {
      setTopCourtScore(0);
      setBtmCourtScore(0);
      // setplayer1MatchScore(0);
      // setplayer2MatchScore(0);
      playerScores.player1 = 0;
      playerScores.player2 = 0;
    }
  };
  const resetMatches = () => {
    if (DEBUG) {
      setplayer1MatchScore(0);
      setplayer2MatchScore(0);
    } else {
      setplayer1MatchScore(0);
      setplayer2MatchScore(0);
    }
  };

  const checkTopWon = (topCourtScore, btmCourtScore) => {
    if (
      (topCourtScore === 21 && btmCourtScore < 20) ||
      (topCourtScore >= 20 &&
        btmCourtScore >= 20 &&
        topCourtScore - btmCourtScore >= 2) ||
      topCourtScore === 29
    ) {
      // Winner court is top court
      console.log(
        "Top Won with score of " + topCourtScore + " : " + btmCourtScore
      );
      setplayer1MatchScore((prevState) => prevState + 1);
      playerMatchScores.player1++;
      console.log("Match point to player", " ", playerMatchScores.player1.toString());
      resetGame();
    }
  };

  const checkBtmWon = (topCourtScore, btmCourtScore) => {
    if (
      (btmCourtScore === 21 && topCourtScore < 20) ||
      (btmCourtScore >= 20 &&
        topCourtScore >= 20 &&
        btmCourtScore - topCourtScore >= 2) ||
      btmCourtScore === 29
    ) {
      // Winner court is btm court
      console.log(
        "Btm Won with score of " + btmCourtScore + " : " + topCourtScore
      );
      setplayer2MatchScore((prevState) => prevState + 1);
      playerMatchScores.player2++;
      resetGame();
    }
  };

  const checkMatchPoint = (topCourtScore, btmCourtScore) => {
    if (
      (topCourtScore === 20 && btmCourtScore <= 19) ||
      (btmCourtScore >= 20 &&
        topCourtScore >= 20 &&
        topCourtScore - btmCourtScore >= 1)
    ) {
      makeCourtGreen("top");
      return true;
    }
    if (
      (btmCourtScore === 20 && topCourtScore <= 19) ||
      (btmCourtScore >= 20 &&
        topCourtScore >= 20 &&
        btmCourtScore - topCourtScore >= 1)
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
  const handleResetGame = () => {
    console.log("Pressed Reset Game");
    resetGame();
  };

  const handleResetMatches = () => {
    console.log("Pressed Reset Matches");
    resetMatches();
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
      <div className='score-wrapper'>
        <div className='gameScore-wrapper'>
          <p>Scores</p>
          <div className='gameScores'>
            <GrPowerReset fontSize={50} onClick={handleResetGame} />
            <div className='score'>
              <label className="names">{Player1.playerName}</label>
              <div className='courtScore'>{topCourtScore}</div>
            </div>
            <p>:</p>
            <div className='score'>
              <label className="names">{Player2.playerName}</label>
              <div className='courtScore'>{btmCourtScore}</div>
            </div>
          </div>
        </div>
        <div className='gameMatch-wrapper'>
          <p>Matches</p>
          <div className='gameMatch'>
            <GrPowerReset fontSize={50} onClick={handleResetMatches} />

            <div className='courtMatchScore'>{player1MatchScore}</div>
            <p>:</p>
            <div className='courtMatchScore'>{player2MatchScore}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;

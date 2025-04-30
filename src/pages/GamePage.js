import React, { useState, useEffect, useContext, useMemo } from "react";
import PlayerCourts from "../components/PlayerCourts";
import { MdOutlineSwapVert } from "react-icons/md";
import { GrPowerReset } from "react-icons/gr";
import "./GamePage.css";

const DEBUG = process.env.ENV === 'DEBUG';

// TODO: Make 2 or 4 players (If 4 players = need to make 2 teams)
const playerCount = {
  Two: 2,
  Four: 4,
};
const courtPosition = {
  Top: "Top",
  Bottom: "Bottom",
};
const debugScoreType = {
  Game: "Game",
  Match: "Match",
};
const debugChanges = {
  player1CurrentScore: 19,
  player2CurrentScore: 19,
  player1MatchScore: 2,
  player2MatchScore: 2,
};


const GamePage = ({ player1Name, player2Name }) => {
  //#region initialise player1 and 2
  const [player1, setPlayer1] = useState({
    name: '',
    currentScore: 0,
    matchScore: 0,
    position: courtPosition.Top,
  });

  const [player2, setPlayer2] = useState({
    name: '',
    currentScore: 0,
    matchScore: 0,
    position: courtPosition.Bottom,
  });
  //#endregion

  useEffect(() => {
    // Set players names on change
    setPlayer1(prev => ({
      ...prev,
      name: player1Name
    }));
    setPlayer2(prev => ({
      ...prev,
      name: player2Name
    }));
  }, [player1Name, player2Name]);

  useEffect(() => {
    if (DEBUG) {
      updateScoresWhenDebug(debugScoreType.Game);
    }
  }, []);

  useEffect(() => {
    console.log(player1);
    console.log(player2);
    const didPlayer1WinGame = checkLeftCourtWon(player1.currentScore, player2.currentScore);
    const didPlayer2WinGame = checkLeftCourtWon(player2.currentScore, player1.currentScore);
    if (didPlayer1WinGame || didPlayer2WinGame) {
      alert("Game set: with scores of Player 1: " + player1.currentScore + ", Player 2: " + player2.currentScore);
      console.log(
        "Game set: with scores of Player 1: " + player1.currentScore + ", Player 2: " + player2.currentScore
      );
      resetGame();
      if (didPlayer1WinGame) {
        setPlayer1(prev => ({
          ...prev,
          matchScore: prev.matchScore + 1
        }));
      }
      if (didPlayer2WinGame) {
        setPlayer2(prev => ({
          ...prev,
          matchScore: prev.matchScore + 1
        }));
      }
    }
    const didPlayer1WinMatch = checkMatchPoint(player1.matchScore);
    // console.log("player1.matchScore: " + player1.matchScore);
    if (didPlayer1WinMatch) {
      alert("Player1 won overall match!");
      console.log("Player1 won overall match!");
      // TODO: Add Congrats / summary page
      resetMatches();
    }
    const didPlayer2WinMatch = checkMatchPoint(player2.matchScore);
    // console.log("player2.matchScore: " + player2.matchScore);
    if (didPlayer2WinMatch) {
      alert("Player2 won overall match!");
      console.log("Player2 won overall match!");
      // TODO: Add Congrats / summary page
      resetMatches();
    }
  }, [player1, player2]);

  // Scoring Terminologies:
  // 1. Rally score (Current score)
  // 2. Game score (Score at the end of the game)
  // 3. Match score (Score at the end of the match)
  //#region Court position
  //  -------------
  //  |     |     | Top
  //  |  R  |  L  |
  //  -------------
  //  |  L  |  R  | Btm
  //  |     |     |
  //  -------------
  //#endregion

  const updateScoresWhenDebug = (scoreType) => {
    // update scores to debugScores
    if (scoreType === debugScoreType.Game) {
      setPlayer1(prev => ({
        ...prev,
        currentScore: debugChanges.player1CurrentScore
      }));
      setPlayer2(prev => ({
        ...prev,
        currentScore: debugChanges.player2CurrentScore
      }));
    }
    // else {
    //   setPlayer1(prev => ({
    //     ...prev,
    //     matchScore: debugChanges.player1MatchScore
    //   }));
    //   setPlayer2(prev => ({
    //     ...prev,
    //     matchScore: debugChanges.player2MatchScore
    //   }));
    // }
  }

  const makeCourtGreen = (position) => {
    // TODO: makeCourtGreen
    console.log(position + " Match Point");
  };

  const resetGame = () => {
    if (DEBUG) {
      updateScoresWhenDebug(debugScoreType.Game);
    } else {
      setPlayer1(prev => ({
        ...prev,
        currentScore: 0
      }));
      setPlayer2(prev => ({
        ...prev,
        currentScore: 0
      }));
    }
  };
  const resetMatches = () => {
    setPlayer1(prev => ({
      ...prev,
      matchScore: 0
    }));
    setPlayer2(prev => ({
      ...prev,
      matchScore: 0
    }));

  };

  const checkLeftCourtWon = (court1, court2) => {
    // console.log(
    //   "court1 " + court1 + " || court2 " + court2
    // );
    if (
      (court1 === 21 && court2 < 20)
      || (court1 >= 20 &&
        court2 >= 20 &&
        court1 - court2 >= 2
      )
      || court1 === 29
    ) {
      // Winner court is left court
      return true;
    }
    return false;
  };
  const checkMatchPoint = (matchScore) => {
    if (matchScore === 3)
      return true;
    return false;
  };
  const handleClickTopCourt = () => { handleClickCourt(courtPosition.Top) };

  const handleClickBottomCourt = () => { handleClickCourt(courtPosition.Bottom) };

  const handleClickCourt = (position) => {
    if (position === player1.position) {
      setPlayer1(prev => ({
        ...prev,
        currentScore: prev.currentScore + 1
      }));
    }
    else {
      setPlayer2(prev => ({
        ...prev,
        currentScore: prev.currentScore + 1
      }));
    }
  };
  const handleClickSwapCourt = () => {
    if (player1.position === courtPosition.Top) {
      setPlayer1(prev => ({
        ...prev,
        position: courtPosition.Bottom
      }));
      setPlayer2(prev => ({
        ...prev,
        position: courtPosition.Top
      }));
    }
    else {
      setPlayer1(prev => ({
        ...prev,
        position: courtPosition.Top
      }));
      setPlayer2(prev => ({
        ...prev,
        position: courtPosition.Bottom
      }));
    }

  };
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
      <div className="court-wrapper">
        <PlayerCourts
          playerScores={player1.position === courtPosition.Top ? player1.currentScore : player2.currentScore}
          handleClickCourt={handleClickTopCourt}
        />
        <div className='net-region' onClick={handleClickSwapCourt}>
          <MdOutlineSwapVert fontSize={55} />
          <div className="net">Net</div>
          {/* <img alt='Net' /> */}
        </div>
        <PlayerCourts
          playerScores={player1.position === courtPosition.Bottom ? player1.currentScore : player2.currentScore}
          handleClickCourt={handleClickBottomCourt}
        />
      </div>
      <div className='score-wrapper'>
        <div className="names"><strong>Player</strong></div>
        <label className="names"><strong>{player1.position === courtPosition.Top ? player1.name : player2.name}</strong></label>
        <label className="names"><strong>{player1.position === courtPosition.Bottom ? player1.name : player2.name}</strong></label>
        <div><strong>Reset</strong></div>

        <div className="names"><strong>Game Score</strong></div>
        <div className='courtScore'>{player1.position === courtPosition.Top ? player1.currentScore : player2.currentScore}</div>
        <div className='courtScore'>{player1.position === courtPosition.Bottom ? player1.currentScore : player2.currentScore}</div>
        <div className='courtScore'><GrPowerReset onClick={handleResetGame} /></div>

        <div className="names"><strong>Match Score</strong></div>
        <div className='courtMatchScore'>{player1.position === courtPosition.Top ? player1.matchScore : player2.matchScore}</div>
        <div className='courtMatchScore'>{player1.position === courtPosition.Bottom ? player1.matchScore : player2.matchScore}</div>
        <div className='courtMatchScore'><GrPowerReset onClick={handleResetMatches} /></div>
      </div>
    </div>
  );
};

export default GamePage;

import React, { useState, useEffect } from "react";
import PlayerCourts from "../components/PlayerCourts";
import { MdOutlineSwapVert } from "react-icons/md";
import { GrPowerReset } from "react-icons/gr";
import "./GamePage.css";
import api from "../dbService";

const DEBUG = process.env.ENV === 'DEBUG';

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

const GamePage = () => {
  //#region initialise player 1 and 2 and match id
  const [matchId, setMatchId] = useState('');
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
  }

  const makeCourtGreen = (position) => {
    // TODO: makeCourtGreen
    console.log(position + " Match Point");
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
  const getPlayerIDsFromStore = () => {
    if (localStorage.getItem('player1') !== null && localStorage.getItem('player2') != null) {
      const p1 = JSON.parse(localStorage.getItem('player1'));
      const p2 = JSON.parse(localStorage.getItem('player2'));
      const players = { 'player1': p1.id, 'player2': p2.id };
      return players;
    }
    return null;
  }



  useEffect(() => {
    if (DEBUG) {
      updateScoresWhenDebug(debugScoreType.Game);
    }
    const p1 = JSON.parse(localStorage.getItem('player1'));
    const p2 = JSON.parse(localStorage.getItem('player2'));
    if (p1 === null || p2 === null) return;
    console.log('Setting players names');
    if (p1.name !== '') setPlayer1(prev => ({ ...prev, name: p1.name }));
    if (p2.name !== '') setPlayer2(prev => ({ ...prev, name: p2.name }));
  }, []);

  useEffect(() => {
    const isNewMatch = () => {
      // check and create new match if both game and match scores are 0
      if (player1.currentScore === 0 && player2.currentScore === 0 &&
        player1.matchScore === 0 && player2.matchScore === 0){
          if(localStorage.getItem('matchId') !== '')
            setMatchId(localStorage.getItem('matchId'));
          else
            console.log('Warning! Match id does not exist!');
          return true;
        }

      return false;
    }
    const getGameResult = (didPlayer1WinGame, player1Score, player2Score) => {
      //Should return in this format
      //{
      //   "winner": "6819c40527e27a3715805e0e",
      //   "player1Score": 18,
      //   "player2Score": 21
      // }
      const gameWinner = {'matchId': matchId};
      const playerIDs = getPlayerIDsFromStore();
      didPlayer1WinGame
        ? gameWinner.winner = playerIDs.player1
        : gameWinner.winner = playerIDs.player2
      gameWinner.player1Score = player1Score;
      gameWinner.player2Score = player2Score;
      return gameWinner;
    }
    const resetMatches = () => {
      setPlayer1(prev => ({
        ...prev,
        matchScore: 0,
        currentScore: 0
      }));
      setPlayer2(prev => ({
        ...prev,
        matchScore: 0,
        currentScore: 0
      }));
    };

    console.log(player1);
    console.log(player2);
    if (isNewMatch()) return;
    const didPlayer1WinGame = checkLeftCourtWon(player1.currentScore, player2.currentScore);
    const didPlayer2WinGame = checkLeftCourtWon(player2.currentScore, player1.currentScore);
    console.log('Checking if any players won: ' + didPlayer1WinGame + ' and ' + didPlayer2WinGame);
    if (didPlayer1WinGame || didPlayer2WinGame) {
      alert("Game set: with scores of Player 1: " + player1.currentScore + ", Player 2: " + player2.currentScore);
      console.log(
        "Game set: with scores of Player 1: " + player1.currentScore + ", Player 2: " + player2.currentScore
      );

      const gameResult = getGameResult(didPlayer1WinGame, player1.currentScore, player2.currentScore);
      console.log(gameResult);
      api.create('game', gameResult);

      // Add 1 for game winner to match score
      if (didPlayer1WinGame) {
        setPlayer1(prev => ({ ...prev, matchScore: prev.matchScore + 1 }));
      }
      else if (didPlayer2WinGame) {
        setPlayer2(prev => ({ ...prev, matchScore: prev.matchScore + 1 }));
      }

      // reset game
      if (DEBUG) {
        updateScoresWhenDebug(debugScoreType.Game);
      } else {
        setPlayer1(prev => ({ ...prev, currentScore: 0 }));
        setPlayer2(prev => ({ ...prev, currentScore: 0 }));
      }
    }

    const didPlayer1WinMatch = checkMatchPoint(player1.matchScore);
    console.log("player1.matchScore: " + player1.matchScore);
    if (didPlayer1WinMatch) {
      alert(player1.name + " won overall match!");
      console.log("Player1 won overall match!");
      // TODO: Add Congrats / summary page
      resetMatches();
    }
    const didPlayer2WinMatch = checkMatchPoint(player2.matchScore);
    // console.log("player2.matchScore: " + player2.matchScore);
    if (didPlayer2WinMatch) {
      alert(player2.name + " won overall match!");
      console.log("Player2 won overall match!");
      // TODO: Add Congrats / summary page
      resetMatches();
    }
  }, [player1, player2, matchId]);

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

  const handleClickTopCourt = () => { handleClickCourt(courtPosition.Top) };

  const handleClickBottomCourt = () => { handleClickCourt(courtPosition.Bottom) };

  const handleClickCourt = (position) => {
    if (position === player1.position) {
      setPlayer1(prev => ({ ...prev, currentScore: prev.currentScore + 1 }));
    }
    else {
      setPlayer2(prev => ({ ...prev, currentScore: prev.currentScore + 1 }));
    }
  };
  const handleClickSwapCourt = () => {
    if (player1.position === courtPosition.Top) {
      setPlayer1(prev => ({ ...prev, position: courtPosition.Bottom }));
      setPlayer2(prev => ({ ...prev, position: courtPosition.Top }));
    }
    else {
      setPlayer1(prev => ({ ...prev, position: courtPosition.Top }));
      setPlayer2(prev => ({ ...prev, position: courtPosition.Bottom }));
    }

  };
  const handleResetGame = () => {
    console.log("Pressed Reset Game");
    if (DEBUG) {
      updateScoresWhenDebug(debugScoreType.Game);
    } else {
      setPlayer1(prev => ({ ...prev, currentScore: 0 }));
      setPlayer2(prev => ({ ...prev, currentScore: 0 }));
    }
  };

  const handleResetMatches = () => {
    console.log("Pressed Reset Matches");
    // Ask User if they are sure, progress will not be saved.
    alert('Warning! Please note that progress will not be saved.');
    
    setPlayer1(prev => ({
      ...prev,
      matchScore: 0,
      currentScore: 0
    }));
    setPlayer2(prev => ({
      ...prev,
      matchScore: 0,
      currentScore: 0
    }));
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

import React from "react";
import PlayerCourts from "../components/PlayerCourts";
import { MdOutlineSwapVert } from "react-icons/md";

const GamePage = () => {
  return (
    <div>
      <PlayerCourts />
      <div className='net'>
        <MdOutlineSwapVert fontSize={52} />
        <img alt='Net' />
      </div>
      <PlayerCourts />
      <div className='gamescore-wrapper'>Scores</div>
    </div>
  );
};

export default GamePage;

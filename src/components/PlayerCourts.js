import React from "react";
import "./Court.css";

const PlayerCourts = ({ playerScores }, { handleClickCourt }) => {
  return (
    <div className='playercourts-wrapper'>
      <div className='court'>
        <button onClick={handleClickCourt}>{playerScores.toString()}</button>
      </div>
      <div className='court'>
        <button onClick={handleClickCourt}>{playerScores.toString()}</button>
      </div>
    </div>
  );
};

export default PlayerCourts;

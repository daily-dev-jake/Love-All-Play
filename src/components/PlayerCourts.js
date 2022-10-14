import React from "react";
import "./Court.css";

const PlayerCourts = ({ playerScores, handleClickCourt }) => {
  return (
    <div className='playercourts-wrapper' onClick={handleClickCourt}>
      <div className='court'>
        <div>{playerScores}</div>
      </div>
      <div className='court'>
        <div>{playerScores}</div>
      </div>
    </div>
  );
};

export default PlayerCourts;

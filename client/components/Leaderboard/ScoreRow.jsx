import React from "react";

const ScoreRow = ({key, info}) => {
  const {username, score} = info;
  return(
    <div>
      <span>{key}. </span><span>{username} </span><span>{score}</span>
    </div>
  )
};

export default ScoreRow;


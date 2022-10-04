import React from "react";

const ScoreRow = props => {
  console.log(props);
  const {username, score} = props.info;
  return(
    <div>
      <span>{props.scoreKey}. </span><span>{username} </span><span>{score}</span>
    </div>
  )
};

export default ScoreRow;


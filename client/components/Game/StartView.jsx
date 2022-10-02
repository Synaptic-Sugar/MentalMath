import React from 'react';
import { Navigate } from 'react-router-dom';



const StartView = props =>
(
    <div id='startView'>
        <button id='start' onClick={props.renderGameView}></button>
        <button id='leaderboard'></button>
    </div>
);

export default StartView;
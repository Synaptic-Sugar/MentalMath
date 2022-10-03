import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import AiProfiles from './Multiplayer/AiProfiles';

/* Game Modes:
    1. Timer ( question difficulty increases related to timer count down: 30s, 60s)
    2. 3 Lives ( with each question you have 10 secs to answer, wrong answers subtract 1 life )
    3. Versus ghost player ( choose user to compete against, real-time updates to see progress )
    4. Versus ai ( plays against ai )
    5. Training ( questions generated are based off of prev failed questions )
*/
/* Difficulty Levels:
    1. Easy (score + 1) includes 0 and 1 multiplication
    2. Medium (score + 3)
    3. Hard (score + 10)
    4. God ((score + 5) * 10)
*/

const StartView = props =>{
    const [gameMode, setGameMode] = useState('timer60');
    const [vs, setVs] = useState('solo');
    const [difficulty, setDifficulty] = useState('easy');
    const [opponent, setOpponent] = useState(AiProfiles[0]);

    const selectAiOpponent = (index)=>{
        setOpponent(AiProfiles[index]);
    }

    const gameModeStyle = (mode)=>{
        return mode === gameMode ? {'backgroundColor': 'green'} : {'backgroundColor': 'grey'};
    }
    const vsStyle = (versus)=>{
        return versus === vs ? {'backgroundColor': 'green'} : {'backgroundColor': 'grey'};
    }
    const difficultyStyle = (diff)=>{
       return diff === difficulty ? {'backgroundColor': 'green'} : {'backgroundColor': 'grey'};
    }

    return (
        <div id='startView'>
            <button id='start' onClick={ ()=> props.startGame(gameMode, vs, difficulty, opponent) }>Start</button>
            <button id='leaderboard' onClick={ ()=> props.renderGameView('leaderboard') }>Leaderboards</button>
            <div id='gameMode'>Game Mode:
                <button className='btnGameMode'  style={ gameModeStyle('timer60') } onClick={ ()=> setGameMode('timer60') }>60 Second Sprint</button>
                <button className='btnGameMode' style={ gameModeStyle('timer30') } onClick={ ()=> setGameMode('timer30') }>30 Second Sprint</button>
                <button className='btnGameMode' style={ gameModeStyle('3Lives') } onClick={ ()=> setGameMode('3Lives') }>3 Lives</button>
                <button className='btnGameMode' style={ gameModeStyle('train') } onClick={ ()=> setGameMode('train') }>Training</button>
            </div>
            <div id='Vs'>Multiplayer:
                <button className='btnVs' style={ vsStyle('solo') } onClick={ ()=> setVs('solo') }>Solo</button>
                <button className='btnVs' style={ vsStyle('ghost') } onClick={ ()=> setVs('ghost') }>Ghost</button>
                <button className='btnVs' style={ vsStyle('ai') } onClick={ ()=> setVs('ai') }>AI</button>
            </div>
            <div id='difficulty'> Difficulty
                <button className='btnDifficulty' style={ difficultyStyle('easy') } onClick={ ()=> setDifficulty('easy') }>Easy</button>
                <button className='btnDifficulty' style={ difficultyStyle('med') } onClick={ ()=> setDifficulty('med') }>Medium</button>
                <button className='btnDifficulty' style={ difficultyStyle('hard') } onClick={ ()=> setDifficulty('hard') }>Hard</button>
                <button className='btnDifficulty' style={ difficultyStyle('god') } onClick={ ()=> setDifficulty('god') }>God Mode</button>
            </div>
        </div>
    );
}

export default StartView;
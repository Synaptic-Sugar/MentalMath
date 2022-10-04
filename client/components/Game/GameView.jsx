import React, { Component } from 'react';
import Questions from './Questions';
import Timer from './Timer';
import { Navigate } from 'react-router-dom';

class GameView extends Component {
  constructor(props){
    super(props);
    console.log(props.gameMode);
    this.initAiTimer;
    if(props.opponent !== undefined && props.vs === 'ai'){
      this.initAiTimer = props.opponent.timeToAnswer;
    }
    this.state = {
      score: 0,
      timer: this.setInitTime(),
      opponentScore: 0,
      aiTimer: this.initAiTimer,
      lives: 3,
      failedQuestions: new Set(),
      correctAnswers: new Map(),
      gameOver: false,
    };
    this.gameOver = this.gameOver.bind(this);
    this.countDown = this.countDown.bind(this);
    this.addToCorrectAnswers = this.addToCorrectAnswers.bind(this);
    this.addToFailedQuestions = this.addToFailedQuestions.bind(this);
    this.renderGame = this.renderGame.bind(this);
  }
    
  gameOver(){
    console.log('made it to gameOver');
    this.props.changeView('leaderboard');
    
    // Ends game
    // Sends game stats to backend
    // Renders leaderboard view
  }

  setInitTime(){
    switch(this.props.gameMode){
    case 'timer30':
      return 30;
    case '3Lives':
      return 5;
    case 'train':
      return 120;
    default:
      return 60;
    }
  }

  countDown(){

    if(this.state.timer <= 0) this.gameOver();
        
    if(this.props.vs !== 'ai'){
      this.setState({
        ...this.state,
        timer: this.state.timer - 1
      });
    }
    else{
      let newAiTimer = this.state.aiTimer;
      let opponentScore = this.state.opponentScore;
      if(newAiTimer <= 0){
        newAiTimer = this.initAiTimer + 1;
        opponentScore++;
      }
      this.setState({
        ...this.state,
        timer: this.state.timer - 1,
        aiTimer: newAiTimer - 1,
        opponentScore: opponentScore
      });
    }
  }

  addToCorrectAnswers(question, completeTime){
    let fastestTime = completeTime;
    // If already solved question take faster answer
    if(this.state.correctAnswers.has(question)){
      const prevAnswerTime = this.state.correctAnswers.get(question);
      fastestTime = Math.min(prevAnswerTime, completeTime);
    }
    // Create new correct answers list
    const newCorrectAnswers = new Map(this.state.correctAnswers);
    newCorrectAnswers.set(question, fastestTime);
    if(this.props.gameMode === '3Lives'){
      this.setState({
        ...this.state,
        correctAnswers: newCorrectAnswers,
        score: this.state.score + 1,
        timer: this.state.timer + 5,
      });
    }
    else{
      this.setState({
        ...this.state,
        correctAnswers: newCorrectAnswers,
        score: this.state.score + 1,
      });
    }
  }

  addToFailedQuestions(question){
    const newFailedQuestions = new Set(this.state.failedQuestions);
    newFailedQuestions.add(question);
    if(this.props.gameMode === '3Lives'){
      const stopGame = this.state.lives === 1;
      this.setState({
        ...this.state,
        failedQuestions: newFailedQuestions,
        lives: this.state.lives - 1,
        gameOver: stopGame
      });
    }
    else{
      this.setState({
        ...this.state,
        failedQuestions: newFailedQuestions
      });
    }
  }

  renderGame(){
    if(this.state.gameOver){
      this.gameOver();
      return;
    }
    switch(this.props.gameMode){
    case 'timer60':
      if(this.props.vs === 'solo'){
        return (
          <>
            <Timer time={ this.state.timer } countDown={ this.countDown }/>
            <div id='scoreDisplay'>Score: { this.state.score }</div>
            <Questions 
              state={ this.state }
              gameMode={ this.props.gameMode }
              difficulty={ this.props.difficulty }
              addToCorrectAnswers={ (question, answer)=> this.addToCorrectAnswers(question, answer) }
              addToFailedQuestions={ (question)=> this.addToFailedQuestions(question) }
            />
          </>
        );
      }
      else{
        return (
          <>
            <Timer time={ this.state.timer } countDown={ this.countDown }/>
            <div id='scoreDisplay'>Score: { this.state.score }</div>
            <div id='scoreDisplay'>Opponent's Score: { this.state.opponentScore }</div>
            <Questions 
              state={ this.state }
              gameMode={ this.props.gameMode }
              difficulty={ this.props.difficulty }
              addToCorrectAnswers={ (question, answer)=> this.addToCorrectAnswers(question, answer) }
              addToFailedQuestions={ (question)=> this.addToFailedQuestions(question) }
            />
          </>
        );
      }
    case 'timer30':
      if(this.props.vs === 'solo'){
        return (
          <>
            <Timer time={ this.state.timer } countDown={ this.countDown }/>
            <div id='scoreDisplay'>Score: { this.state.score }</div>
            <Questions 
              state={ this.state }
              gameMode={ this.props.gameMode }
              difficulty={ this.props.difficulty }
              addToCorrectAnswers={ (question, answer)=> this.addToCorrectAnswers(question, answer) }
              addToFailedQuestions={ (question)=> this.addToFailedQuestions(question) }
            />
          </>
        );
      }
      else{
        return (
          <>
            <Timer time={ this.state.timer } countDown={ this.countDown }/>
            <div id='scoreDisplay'>Score: { this.state.score }</div>
            <div id='scoreDisplay'>Opponent's Score: { this.state.opponentScore }</div>
            <Questions 
              state={ this.state }
              gameMode={ this.props.gameMode }
              difficulty={ this.props.difficulty }
              addToCorrectAnswers={ (question, answer)=> this.addToCorrectAnswers(question, answer) }
              addToFailedQuestions={ (question)=> this.addToFailedQuestions(question) }
            />
          </>
        );
      }
    case '3Lives':
      if(this.props.vs === 'solo'){
        return (
          <>
            <Timer time={ this.state.timer } countDown={ this.countDown }/>
            <div id='livesDisplay'>Lives: { this.state.lives }</div>
            <div id='scoreDisplay'>Score: { this.state.score }</div>
            <Questions 
              state={ this.state }
              gameMode={ this.props.gameMode }
              difficulty={ this.props.difficulty }
              addToCorrectAnswers={ (question, answer)=> this.addToCorrectAnswers(question, answer) }
              addToFailedQuestions={ (question)=> this.addToFailedQuestions(question) }
            />
          </>
        );
      }
      else{
        return (
          <>
            <Timer time={ this.state.timer } countDown={ this.countDown }/>
            <div id='livesDisplay'>Lives: { this.state.lives }</div>
            <div id='scoreDisplay'>Score: { this.state.score }</div>
            <div id='scoreDisplay'>Opponent's Score: { this.state.opponentScore }</div>
            <Questions 
              state={ this.state }
              gameMode={ this.props.gameMode }
              difficulty={ this.props.difficulty }
              addToCorrectAnswers={ (question, answer)=> this.addToCorrectAnswers(question, answer) }
              addToFailedQuestions={ (question)=> this.addToFailedQuestions(question) }
            />
          </>
        );
      }
    case 'train':
      if(this.props.vs === 'solo'){
        return (
          <>
            <Timer time={ this.state.timer } countDown={ this.countDown }/>
            <div id='scoreDisplay'>Score: { this.state.score }</div>
            <Questions 
              state={ this.state }
              gameMode={ this.props.gameMode }
              difficulty={ this.props.difficulty }
              addToCorrectAnswers={ (question, answer)=> this.addToCorrectAnswers(question, answer) }
              addToFailedQuestions={ (question)=> this.addToFailedQuestions(question) }
            />
          </>
        );
      }
      else{
        return (
          <>
            <Timer time={ this.state.timer } countDown={ this.countDown }/>
            <div id='scoreDisplay'>Score: { this.state.score }</div>
            <div id='scoreDisplay'>Opponent's Score: { this.state.opponentScore }</div>
            <Questions 
              state={ this.state }
              gameMode={ this.props.gameMode }
              difficulty={ this.props.difficulty }
              addToCorrectAnswers={ (question, answer)=> this.addToCorrectAnswers(question, answer) }
              addToFailedQuestions={ (question)=> this.addToFailedQuestions(question) }
            />
          </>
        );
      }
    default:
      break;
    }
  }

  render(){
    const game = this.renderGame();
    return(
      <div>{game}</div>
    );
  }
}

export default GameView;
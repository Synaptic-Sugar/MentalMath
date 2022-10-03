import React, { Component } from 'react';
import Questions from './Questions';
import Timer from './Timer';

class GameView extends Component {
    constructor(props){
        super(props);
        this.state = {
            score: 0,
            opponentScore: 0,
            lives: 3,
            failedQuestions: new Set(),
            correctAnswers: new Map(),
            gameOver: false,
        }
        this.gameOver = this.gameOver.bind(this);
        this.addToCorrectAnswers = this.addToCorrectAnswers.bind(this);
        this.addToFailedQuestions = this.addToFailedQuestions.bind(this);
        this.renderGame = this.renderGame.bind(this);
    }

    setInitTime(){
        switch(this.props.gameMode){
            case 'timer30':
                return 30;
            case '3Lives':
                return 10;
            case 'train':
                return 120;
            default:
                return 60;
        }
    }

    renderGame(){
        if(this.state.gameOver){
            this.gameOver();
            return;
        }
        console.log(`Difficulty: ${this.props.difficulty}`)
        switch(this.props.gameMode){
            case 'timer60':
                if(this.props.vs === 'solo'){
                    return (
                      <>
                          <Timer time={ this.setInitTime() } setGameOver={()=> this.gameOver()}/>
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
                            <Timer time={60} setGameOver={()=> this.gameOver()}/>
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
                          <Timer time={60} setGameOver={()=> this.gameOver()}/>
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
                            <Timer time={60} setGameOver={()=> this.gameOver()}/>
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
                            <Timer time={10} setGameOver={()=> this.gameOver()}/>
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
                            <Timer time={10} setGameOver={()=> this.gameOver()}/>
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
                return (
                    <>
                        <Timer time={30} setGameOver={()=> this.gameOver()}/>
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
            case 'train':
                if(this.props.vs === 'solo'){
                    return (
                        <>
                            <Timer time={120} setGameOver={()=> this.gameOver()}/>
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
                            <Timer time={120} setGameOver={()=> this.gameOver()}/>
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

    gameOver(){
        // Ends game
        // Saves game stats in leaderboard
        // Renders leaderboard view
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

        this.setState({
            ...this.state,
            correctAnswers: newCorrectAnswers,
            score: this.state.score + 1,
        });
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

    render(){
        const game = this.renderGame();
        return(
            <div>{game}</div>
        )
    }
}

export default GameView;
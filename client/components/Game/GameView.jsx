import React, { Component } from 'react';
import Questions from './Questions';
import Timer from './Timer';
/*Game Modes:
    1. Timer Game mode( question difficulty increases related to timer count down)
    2. 3 Lives ( with each question you have 10 secs)
    3. God mode ( otis presentation )
*/

class GameView extends Component {
    constructor(props){
        super(props);
        this.state = {
            score: 0,
            wrongAnswers: [],
            gameOver: false,
        }
        this.gameOver = this.gameOver.bind(this);
        this.incrementScore = this.incrementScore.bind(this);
    }
    gameOver(){

    }
    incrementScore(){
        this.setState({
            ...this.state,
            score: this.state.score + 1
        });
    }
    render(){
        return( 
            <div>
                <Timer setGameOver={()=> this.gameOver()}/>
                <div>Score: {this.state.score}</div>
                <Questions score={this.state.score} incrementScore={()=> this.incrementScore()}/>
            </div>
        )
    }
}

export default GameView;
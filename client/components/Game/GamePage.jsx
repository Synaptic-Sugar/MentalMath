import React, { Component } from 'react';
import GameView from './GameView';
import StartView from './StartView';

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

class GamePage extends Component {
  constructor(props){
    super(props);
    this.state = {
        showView: 'start',
        gameMode: 'timer60',
        vs: 'solo',
        difficulty: 'easy'
    }
    this.renderView = this.renderView.bind(this);
    this.changeView = this.changeView.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  changeView(view){
    this.setState({
        ...this.state,
        showView: view
    })
  }
  startGame(gameMode, vs, difficulty){
      this.setState({
          ...this.state,
          showView: 'game',
          gameMode: gameMode,
          vs: vs,
          difficulty: difficulty
      });
  }

  renderView(view){
    switch(view){
        case 'start':
          return <StartView startGame={ (gameMode, vs, difficulty)=> this.startGame(gameMode, vs, difficulty) } />;
        case 'game':
          return <GameView gameMode={ this.state.gameMode } vs={this.state.vs} difficulty={ this.state.difficulty }/>;
        case 'leaderboard':
        return (
        <div>GameOver</div>
        );
        default:
          break;
        }
  }
  render(){
    const view = this.renderView(this.state.showView);
    return(
        <div>
            {view}
        </div>
    );
  }
}

export default GamePage;
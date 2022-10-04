import React, { Component } from 'react';
import GameView from './GameView';
import StartView from './StartView';
import { Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom'; 

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

export const GamePageWrapper = props =>{
  const { state } = useLocation();
  return <GamePage {...state}/>
}

class GamePage extends Component {
  constructor(props){
    super(props);
    console.log('username: ' + props.username);
    this.state = {
      showView: 'game',
      gameMode: props.gameMode,
      vs: props.vs,
      difficulty: props.difficulty,
      opponent: props.opponent,
    };
    this.renderView = this.renderView.bind(this);
    this.changeView = this.changeView.bind(this);
    this.startGame = this.startGame.bind(this);
  }
  componentDidMount(){
    this.setState({
      ...this.state,
      'endGame': ()=> this.changeView('leaderboard')
    })
  }

  changeView(view){
    this.setState({
      ...this.state,
      showView: view
    });
  }
  startGame(gameMode, vs, difficulty, opponent){
    this.setState({
      ...this.state,
      showView: 'game',
      gameMode: gameMode,
      vs: vs,
      difficulty: difficulty,
      opponent: opponent
    });
  }

  renderView(view){
    console.log('username: ' + this.props.username);
    switch(view){
    case 'start':
      return <StartView startGame={ (gameMode, vs, difficulty, opponent)=> this.startGame(gameMode, vs, difficulty, opponent) } />;
    case 'game':
      return <GameView username={this.props.username} changeView={(view)=> this.changeView(view)} gameMode={ this.state.gameMode } vs={this.state.vs} difficulty={ this.state.difficulty } opponent={ this.state.opponent }/>;
    case 'leaderboard':
      return (
        <Navigate id='gameNavigation' state={{username: this.props.username}} to='/leaderboardpage'/>
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
import React, { Component } from 'react';
import GameView from './GameView';
import StartView from './StartView';

class GamePage extends Component {
  constructor(props){
    super(props);
    this.state = {
        showView: 'start'
    }
    this.renderView = this.renderView.bind(this);
    this.changeView = this.changeView.bind(this);
  }
  changeView(view){
    this.setState({
        ...this.state,
        showView: view
    })
  }
  renderView(view){
    switch(view){
        case 'start':
          return <StartView renderGameView={()=> this.changeView('game')}/>;
        case 'game':
          return <GameView/>;
        case 'gameOver':
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
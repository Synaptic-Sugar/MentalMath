import React, { Element, Component } from 'react';
import ScoreRow from './ScoreRow.jsx';

class LeaderboardPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      personalScores: [],
      globalScores: []
    };
    this.personalBest = this.personalBest.bind(this);
    this.globalBest = this.globalBest.bind(this);
  }

  //fetch request for personal best
  personalBest (username) {
    //easy mode 30 seconds
    fetch(`/leaderboardApi/getPersonalScores/${username}`)
      .then(res => {
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) data = [];
        return this.setState({
          personalScores: data
        });
      })
      .catch(err => console.log('personal best leaderboard', err));
  }
    
  //fetch request for top user scores
  globalBest (){
    //easy mode 30 seconds
    fetch('/leaderboardApi/getTopTen/')
      .then(res => {
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) data = [];
        return this.setState({
          globalScores: data
        });
      })
      .catch(err => console.log('global best leaderboard', err));
  }
  componentDidMount() {
    this.personalBest(username);
    this.globalBest();
  }
  



  render(){
    //call to fetches
    
    const buildPersonalBest = this.personalScores.map((score, i)=> {
      return(
        <ScoreRow key = {i} info = {score}/>
      );
    });
    const buildGlobalBest = this.globalScores.map((score, i)=> {
      return(
        <ScoreRow key = {i} info = {score}/>
      );
    });

    return(
      <section>
        <h1>Place - Name - Score</h1>
        <div>
          {buildPersonalBest}
        </div>
        <div>
          {buildGlobalBest}
        </div>
      </section>
    );
  }
}

export default LeaderboardPage;
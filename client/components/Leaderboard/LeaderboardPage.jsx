import React, { Element, Component } from 'react';
import ScoreRow from './ScoreRow.jsx';
import { useLocation } from 'react-router-dom'; 
const LeaderboardPageWrapper = props =>{
  const { state } = useLocation();
  return <LeaderboardPage {...state}/>
}

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
    this.personalBest(this.props.username);
    this.globalBest();
  }
  



  render(){
    //call to fetches
    
    const buildPersonalBest = this.state.personalScores.map((score, i)=> {
      return(
        <ScoreRow key={i} scoreKey={i} info={score}/>
      );
    });
    const buildGlobalBest = this.state.globalScores.map((score, i)=> {
      return(
        <ScoreRow key={i} scoreKey={i} info={score}/>
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
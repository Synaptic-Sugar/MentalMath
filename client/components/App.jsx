import React, { Element, Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './Login/LoginPage';
import GamePage from './Game/GamePage';
import LeaderboardPage from './Leaderboard/LeaderboardPage';
import '../styles/main.scss';

// use <Link to=""></Link> as replacements for anchors

const App = props => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element = {<LoginPage/>}
        />
        <Route
          path = "/gamepage"
          element = {<GamePage/>}
        />
        <Route
          path = "/leaderboardpage"
          element = {<LeaderboardPage/>}
        />
      </Routes>
    </div>
  );
};

export default App;
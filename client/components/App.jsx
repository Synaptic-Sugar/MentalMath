import React, { Element, Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './Login/LoginPage';
import GamePage from './Game/GamePage';
import LeaderboardPage from './Leaderboard/LeaderboardPage';
import '../styles/main.scss';

// use <Link to=""></Link> as replacements for anchors

const App = props => {
  const userSignedIn = false;
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element = {<LoginPage userSignedIn = {userSignedIn}/>}
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

// export const Content = ({ user }) => {
//   return (
//     <>
//       <Switch>
//         <Route exact path="/index" component={MainIndex} />
//         {user.isSignedIn ? (
//           <Route exact path="/restricted" component={RestrictedPage} />
//         ) : (
//           <Redirect to="/login" />
//         )}
//         {user.role === "teacher" ? (
//           <Route exact path="/only-teacher" component={OnlyTeacher} />
//         ) : (
//           <Redirect to="/index" />
//         )}
//         {user.role === "student" ? (
//           <Route exact path="/only-student" component={OnlyStudent} />
//         ) : (
//           <Redirect to="/index" />
//         )}
//         <Route exact path="/login" component={LoginPage} />
//       </Switch>
//     </>
//   );
// };
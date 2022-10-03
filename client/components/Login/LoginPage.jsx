import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import LoginView from './LoginView';


class LoginPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      isValidUser: false,
      showView: 'login'
    };
    this.validateUser = this.validateUser.bind(this);
    this.renderView = this.renderView.bind(this);
    this.showView = this.showView.bind(this);
  }
  validateUser(){
    this.setState({
      ...this.state,
      isValidUser: true
    });
  }
  showView(view){
    this.setState({
      ...this.state,
      showView: view
    });
  }
  renderView(view){
    switch(view){
    case 'login':
      return <LoginView validateUser={this.validateUser} showView={this.showView} isValidUser={this.state.isValidUser}/>;
    case 'signup':
      return (
        <div>Sign up</div>
      );
    case 'oAuth':
      return (
        <div>Sign up</div>
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

export default LoginPage;

// import * as React from "react";
// import { Navigate } from "react-router-dom";

// class LoginForm extends React.Component {
//   state = { user: null, error: null };

//   async handleSubmit(event) {
//     event.preventDefault();
//     try {
//       let user = await login(event.target);
//       this.setState({ user });
//     } catch (error) {
//       this.setState({ error });
//     }
//   }

//   render() {
//     let { user, error } = this.state;
//     return (
//       <div>
//         {error && <p>{error.message}</p>}
//         {user && (
//           <Navigate to="/dashboard" replace={true} />
//         )}
//         <form
//           onSubmit={(event) => this.handleSubmit(event)}
//         >
//           <input type="text" name="username" />
//           <input type="password" name="password" />
//         </form>
//       </div>
//     );
//   }
// }
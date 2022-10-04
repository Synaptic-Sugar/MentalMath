import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import LoginView from './LoginView';
import SignUpView from './SignUpView';


class LoginPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      isValidUser: false,
      showView: 'login',
      username: undefined,
    };
    this.goToGit = this.goToGit.bind(this);
    this.validateUser = this.validateUser.bind(this);
    this.signUpUser = this.signUpUser.bind(this);
    this.renderView = this.renderView.bind(this);
    this.showView = this.showView.bind(this);
  }

  validateUser (username, password){
    const body = { 'username': username, 'password': password };
    fetch('/userApi/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(res => {
        console.log('res: ', res);
        return res.json();
      })
      .then((data) => {
        console.log('data: ', data);
        this.setState({
          ...this.state,
          isValidUser: data === username,
          'username': data
        });
      })
      .catch(err => console.log('Login fetch /login: ERROR: ', err));
  }
  signUpUser (username, password){
    const body = { 'username': username, 'password': password };
    fetch('/userApi/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(res => {
        console.log('res: ', res);
        return res.json();
      })
      .then((data) => {
        console.log('data: ', data);
        this.setState({
          ...this.state,
          isValidUser: data === username,
          'username': data
        });
      })
      .catch(err => console.log('Login fetch /login: ERROR: ', err));
  }

  goToGit(){
    fetch('/userApi/auth')
      .catch(err => console.log('Login fetch /login: ERROR: ', err));
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
      return <LoginView validateUser={this.validateUser} username={this.state.username} showView={this.showView} isValidUser={this.state.isValidUser} goToGit={this.goToGit}/>
    case 'signup':
      return <SignUpView signUpUser={this.signUpUser} username={this.state.username} showView={this.showView} isValidUser={this.state.isValidUser} goToGit={this.goToGit}/>
    default:
      break;
    }
  }
  render(){
    const view = this.renderView(this.state.showView)
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
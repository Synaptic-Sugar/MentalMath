import React, { Element, Component } from 'react';
import { Navigate } from 'react-router-dom';

const LoginView = props =>
  (
    <div id= 'login'> 
      <input id='newUsername'></input>
      <input id='newPassword'></input>
      <button id='submitSignUp' onClick={() => props.signUpUser(document.getElementById('newUsername').value, document.getElementById('newPassword').value)}>Sign Up</button>
      <button id='gitButton' onClick={()=> props.goToGit()}>SIGN UP WITH GITHUB</button>
      <button id='login' onClick={()=> props.showView('login')}>login</button>
      { props.isValidUser && (<Navigate id='gameNavigation' state={{username: props.username}} to='/startpage'/>)}
    </div>
  );

export default LoginView;
import React, { Element, Component } from 'react';
import { Navigate } from 'react-router-dom';

const LoginView = props =>
  (
    <div id= 'login'> 
      <input id='username'></input>
      <input id='password'></input>
      <button id='submit' onClick={props.validateUser}>Login</button>
      <button id='signup' onClick={()=> props.showView('signup')}>signup</button>
      { props.isValidUser && (<Navigate id='gameNavigation' to='/startpage'/>)}
    </div>
  );

export default LoginView;
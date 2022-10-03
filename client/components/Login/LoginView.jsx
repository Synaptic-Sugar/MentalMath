import React, { Element, Component } from 'react';
import { Navigate } from 'react-router-dom';

const LoginView = props =>
  (
    <div id= 'login'> 
      <input id='username' value='user'></input>
      <input id='password'value='pass'></input>
      <button id='submit' onClick={props.validateUser(this.user, this.pass)}>Login</button>
      <a className='button' href='/auth'>SIGN IN WITH GITHUB</a>
      <button id='signup' onClick={()=> props.showView('signup')}>signup</button>
      { props.isValidUser && (<Navigate id='gameNavigation' to='/startpage'/>)}
    </div>
  );

export default LoginView;
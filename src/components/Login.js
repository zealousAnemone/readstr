import React from 'react';

const Login = (props) => {
  return (
    <div id='login-container'>
      <header>
        <h3>Login or sign up</h3>
        <p id='close' onClick={props.toggleLogin}>X</p>
      </header>
      <div id="login-form">
        <input type='text'></input>
        <input type='password'></input>
        <button>Login or Sign up!</button>
      </div>
    </div>
  )
}

export default Login;
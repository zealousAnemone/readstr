import React from 'react';

class Login extends React.Component  {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
    }

    this.loginUser = this.loginUser.bind(this);
  }

  loginUser() {
    const userInfo = {
      username: this.state.username,
      password: this.state.password,
    }
    fetch('/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
      })
  }

  render() {
    return (
      <div id='login-container'>
        <header>
          <h3>Login or sign up</h3>
          <p id='close' onClick={this.props.toggleLogin}>X</p>
        </header>
        <div id="login-form">
          <input type='text'></input>
          <input type='password'></input>
          <button onClick={this.loginUser}>Login or Sign up!</button>
        </div>
      </div>
    )
  }
}

export default Login;
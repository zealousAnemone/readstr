import React from 'react';

const Header = (props) => {
  return (
    <div>
      <header>
        <h3 id='readstr' onClick={props.toggleList}> READSTR </h3>
        <h3 id="login" onClick={props.toggleLogin}> Log In</h3>
        <h3 id='to-read' onClick={props.toggleList}> To Read </h3>
      </header>
    </div>
  )
};

export default Header;

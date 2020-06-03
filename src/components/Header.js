import React from 'react';

const Header = (props) => {
  return (
    <div>
      <header>
        <h3 onClick={props.toggleApp}> READSTR </h3>
        <h3 onClick={props.toggleList}> To Read </h3>
      </header>
    </div>
  )
};

export default Header;

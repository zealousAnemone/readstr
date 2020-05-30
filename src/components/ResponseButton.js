import React from 'react';

const ResponseButton = (props) => {
  return <button onClick={props.acceptBook}>{props.type.toUpperCase()}</button>
}

export default ResponseButton;
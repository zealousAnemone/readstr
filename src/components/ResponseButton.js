import React from 'react';

const ResponseButton = (props) => {
  return <button onClick={props.type === 'accept' ? props.acceptBook : props.removeBook}>{props.type.toUpperCase()}</button>
}

export default ResponseButton;
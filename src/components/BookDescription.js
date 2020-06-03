import React from 'react';

const BookDescription = (props) => {
  return (
    <h4>{props.title}</h4>
    <p id="book-description">{props.description}</p>
  )
}

export default BookDescription;

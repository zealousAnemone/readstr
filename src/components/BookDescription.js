import React from 'react';

const BookDescription = (props) => {
  return (
    <div>
      <h4>{props.title}</h4>
      <p id="book-description">{props.description}</p>
    </div>
    
  )
}

export default BookDescription;

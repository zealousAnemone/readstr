import React from 'react';

const BookCover = (props) => {
  return (
    <div>
      <img src={props.cover} />
    </div>
  )
}

export default BookCover;
import React from 'react';

const BookCover = (props) => {
    return (
      <div>
        <img src={props.imgUrl} />
      </div>
    )
}

export default BookCover;
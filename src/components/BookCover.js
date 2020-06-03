import React from 'react';

const BookCover = (props) => {
  let imgUrl;
  console.log(props.isbn);
  const bookUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn:${props.isbn}`;
  fetch(bookUrl)
    .then(res => res.json())
    .then((result) => {
      // imgUrl = result.items[0].imageLinks.thumbnail;
      console.log(`Result: ${result}`);
    })
  return (
    <div>
      <img src={imgUrl} />
    </div>
  )
}

export default BookCover;
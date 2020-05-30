import Header from './Header';
import BookCover from './BookCover';
import ResponseButton from './ResponseButton';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookCover: null,
      bookDescription: null,
      isbn: null,
      toRead: [],
      notToRead: [],
    };
    this.getRandomNumber = this.getRandomNumber.bind(this);
  }

  getRandomNumber(num) {
    return Math.floor(Math.random() * num);
  }

  componentDidMount() {
    fetch('https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=jM07dApGlEAKNArQnG0PYJbONw8a4HWD')
      .then(res => res.json())
      .then(
        (result) => {
          const bookList = result.results.books;
          const randomBook = bookList[this.getRandomNumber(bookList.length)];

          this.setState({
            bookCover: randomBook.book_image,
            bookDescription: randomBook.description,
            isbn: randomBook.primary_isbn10,
          })
        }
      )
  }

  render() {
    return (
      <div>
        <Header />
        <BookCover cover={this.state.bookCover} />
        <ResponseButton type='accept' />
        <ResponseButton type='reject' />
      </div>
    )
  }
}

export default App;
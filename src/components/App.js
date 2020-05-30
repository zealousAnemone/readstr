import Header from './Header';
import BookCover from './BookCover';
import ResponseButton from './ResponseButton';
import BookDescription from './BookDescription';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookTitle: null,
      bookCover: null,
      bookDescription: null,
      isbn: null,
      toRead: [],
      dontShow: [],
    };
    this.acceptBook = this.acceptBook.bind(this);
    this.getRandomBook = this.getRandomBook.bind(this);
  }

   // accepts array of books
  getRandomBook(list) {
    // gets random num within bounds of array
    const rand = Math.floor(Math.random() * list.length);
    return list[rand];
  }

  acceptBook() {
    const tempToRead = this.state.toRead;
    tempToRead.push(this.state.bookTitle);
    this.setState({
      toRead: tempToRead,
    })
    console.log(`To read: ${this.state.toRead}`);
  }

  componentDidMount() {
    fetch('https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=jM07dApGlEAKNArQnG0PYJbONw8a4HWD')
      .then(res => res.json())
      .then(
        (result) => {
          const bookList = result.results.books;
          const randomBook = this.getRandomBook(bookList);

          this.setState({
            bookTitle: randomBook.title,
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
        <div id="main">
          <BookCover cover={this.state.bookCover} />
          <BookDescription description={this.state.bookDescription} />
          <ResponseButton type='accept' acceptBook={this.acceptBook} />
          <ResponseButton type='reject' />
        </div>
      </div>
    )
  }
}

export default App;
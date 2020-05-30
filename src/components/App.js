import Header from './Header';
import BookCover from './BookCover';
import ResponseButton from './ResponseButton';
import BookDescription from './BookDescription';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookList: [],
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
    // make sure no book currently stored 
    this.setState({
      bookTitle: null,
      bookCover: null,
      bookDescription: null,
      isbn: null,
    })
    // gets random index within bounds of array
    const rand = Math.floor(Math.random() * list.length);
    // returns book at that index
    const randomBook = list[rand];
    this.setState({
      bookTitle: randomBook.title,
      bookCover: randomBook.book_image,
      bookDescription: randomBook.description,
      isbn: randomBook.primary_isbn10,
    })
  }

  acceptBook() {
    const tempToRead = this.state.toRead;
    tempToRead.push(this.state.bookTitle);
    this.setState({
      toRead: tempToRead,
    })
    this.getRandomBook(this.state.bookList);
    console.log(`To read: ${this.state.toRead}`);
  }

  componentDidMount() {
    fetch('https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=jM07dApGlEAKNArQnG0PYJbONw8a4HWD')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            bookList: result.results.books,
          });
          this.getRandomBook(this.state.bookList);  
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
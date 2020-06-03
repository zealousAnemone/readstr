import Header from './Header';
import BookCover from './BookCover';
import ResponseButton from './ResponseButton';
import BookDescription from './BookDescription';
import ToReadList from './ToReadList';
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
      toggleList: false,
      // dontShow: [],
    };
    this.acceptBook = this.acceptBook.bind(this);
    this.rejectBook = this.rejectBook.bind(this);
    this.getRandomBook = this.getRandomBook.bind(this);
    this.removeBook = this.removeBook.bind(this);
    this.toggleList = this.toggleList.bind(this);
    this.toggleApp = this.toggleApp.bind(this);
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
    if (list.length > 0) {
      const rand = Math.floor(Math.random() * list.length);
      // returns book at that index
      const randomBook = list[rand];
      this.setState({
        bookTitle: randomBook.title,
        // bookCover: randomBook.book_image,
        // bookDescription: randomBook.description,
        // isbn: randomBook.primary_isbn10,
        isbn: randomBook.isbn,
      })
    } else {
      console.log('No more books!');
    }
  }

  toggleList() {
    this.setState({
      toggleList: true,
    })
  }

  toggleApp() {
    this.setState({
      toggleList: false,
    })
  }

  removeBook(book) {
    // make copy of bookList
    // copy is filtered to not include book just shown
    const newBookList = this.state.bookList.filter((el) => el.title !== book)
  
    // setState with copy of bookList
    this.setState({
      bookList: newBookList,
    })
    // For testing... remove later
    /*console.log('Current bookList:');
    this.state.bookList.forEach((book) => {
      console.log(book.title);
    })*/
    
  }

  acceptBook() {
    const tempToRead = this.state.toRead;
    tempToRead.push(this.state.bookTitle);
    this.setState({
      toRead: tempToRead,
    })
    window.localStorage.setItem('toRead', JSON.stringify(this.state.toRead));
    this.removeBook(this.state.bookTitle);
    this.getRandomBook(this.state.bookList);
    // console.log(`To read: ${this.state.toRead}`);
  }

  rejectBook() {
    this.removeBook(this.state.bookTitle);
    this.getRandomBook(this.state.bookList);
  }

  componentDidMount() {
    fetch('/books/')
      .then(res => res.json())
      .then((books) => {
        this.setState({
          bookList: books,
        });
        this.getRandomBook(this.state.bookList);
      })
      .catch(err => console.log('Unable to get books'));

    /*fetch('https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=jM07dApGlEAKNArQnG0PYJbONw8a4HWD')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            bookList: result.results.books,
          });
          this.getRandomBook(this.state.bookList);  
        }
      )*/
  }

  render() {
    return (
      <div>
        <Header toggleList={this.toggleList} toggleApp={this.toggleApp} />
        <div id="main">
          {!this.state.toggleList? 
          <div>
            <div id='book-area'>
              <BookCover isbn={this.state.isbn} />
              <div>
                <BookDescription description={this.state.bookDescription} />
                <ResponseButton type='accept' acceptBook={this.acceptBook} />
                <ResponseButton type='reject' rejectBook={this.rejectBook} />
              </div>
            </div>
          </div> : <ToReadList list={JSON.parse(window.localStorage.getItem('toRead'))} />}
        </div>
      </div>
    )
  }
}

export default App;
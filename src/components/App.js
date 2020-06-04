import Header from './Header';
import BookCover from './BookCover';
import ResponseButton from './ResponseButton';
import BookDescription from './BookDescription';
import ToReadList from './ToReadList';
import React from 'react';
import regeneratorRuntime from 'regenerator-runtime';

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
      imgUrl: null,
    };
    this.acceptBook = this.acceptBook.bind(this);
    this.rejectBook = this.rejectBook.bind(this);
    this.removeBook = this.removeBook.bind(this);
    this.toggleList = this.toggleList.bind(this);
    this.toggleApp = this.toggleApp.bind(this);
    this.getRandomBook = this.getRandomBook.bind(this);
  }

  componentWillMount() {

    let bookList = [];

    fetch('/books/')
    .then(res => res.json())
    .then((books) => {
      bookList = books;
    })
    .finally(() => {
      const random = this.getRandomBook(bookList);
      this.setState({
        bookList: bookList,
        bookTitle: random.title,
        isbn: random.isbn,
        bookCover: random.cover,
      })
      console.log(this.state.bookList);
    })
  }

  getRandomBook(list) {
      if (list.length > 0) {
        const rand = Math.floor(Math.random() * list.length);
        return list[rand];
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
    const newBook = this.getRandomBook(newBookList);
    // setState with copy of bookList
    this.setState({
      bookList: newBookList,
      bookTitle: newBook.title,
      isbn: newBook.isbn,
      bookCover: newBook.cover,
    })  
  }

  acceptBook() {
  
    const tempToRead = JSON.parse(localStorage.getItem('toRead'));
    tempToRead.push(this.state.bookTitle);
    window.localStorage.setItem('toRead', JSON.stringify(tempToRead));
    this.removeBook(this.state.bookTitle);
  }

  rejectBook() {
    // this.removeBook(this.state.bookTitle);
    // this.getRandomBook(this.state.bookList);
  }
  /*componentDidMount() {
    

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
  }*/

  render() {
    
    return (
      <div>
        <Header toggleList={this.toggleList} toggleApp={this.toggleApp} />
        <div id="main">
          {!this.state.toggleList? 
          <div>
            <div id='book-area'>
              <BookCover imgUrl={this.state.bookCover} />
              <div>
                <BookDescription title={this.state.bookTitle} description={this.state.bookDescription} />
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
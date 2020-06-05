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
      toggleList: false,
    };
    this.acceptBook = this.acceptBook.bind(this);
    this.rejectBook = this.rejectBook.bind(this);
    this.removeBook = this.removeBook.bind(this);
    this.toggleList = this.toggleList.bind(this);
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
        bookDescription: random.details,
      })
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

  toggleList(e) {
    if (e.target.id === 'to-read') {
      this.setState({
        toggleList: true,
      })
    } else {
      this.setState({
        toggleList: false,
      })
    }
  }

  removeBook(book) {
    const newBookList = this.state.bookList.filter((el) => el.title !== book)
    const newBook = this.getRandomBook(newBookList);
    this.setState({
      bookList: newBookList,
      bookTitle: newBook.title,
      isbn: newBook.isbn,
      bookCover: newBook.cover,
      bookDescription: newBook.details,
    })  
  }

  acceptBook() {
  
    const tempToRead = JSON.parse(localStorage.getItem('toRead'));
    tempToRead.push(this.state.bookTitle);
    window.localStorage.setItem('toRead', JSON.stringify(tempToRead));
    this.removeBook(this.state.bookTitle);
  }

  rejectBook() {
    this.removeBook(this.state.bookTitle);
  }

  render() {
    
    return (
      <div>
        <Header toggleList={this.toggleList} />
        <div id="main">
          {!this.state.toggleList? 
          <div>
            <div id='book-area'>
              <BookCover imgUrl={this.state.bookCover} />
              <div>
                <BookDescription title={this.state.bookTitle} description={this.state.bookDescription} />
                <ResponseButton type='accept' acceptBook={this.acceptBook} />
                <ResponseButton type='reject' removeBook={this.removeBook} />
              </div>
            </div>
          </div> : <ToReadList list={JSON.parse(window.localStorage.getItem('toRead'))} />}
        </div>
      </div>
    )
  }
}

export default App;
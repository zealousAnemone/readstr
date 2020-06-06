import Header from './Header';
import BookCover from './BookCover';
import ResponseButton from './ResponseButton';
import BookDescription from './BookDescription';
import ToReadList from './ToReadList';
import Login from './Login';
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
      toggleLogin: false,
    };
    this.acceptBook = this.acceptBook.bind(this);
    this.removeBook = this.removeBook.bind(this);
    this.toggleList = this.toggleList.bind(this);
    this.toggleLogin = this.toggleLogin.bind(this);
    this.getRandomBook = this.getRandomBook.bind(this);
  }

  componentDidMount() {

    let bookList = [];

    fetch('/books/')
    .then(res => res.json())
    .then((books) => {
      bookList = books;
      // console.log(bookList);
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

  toggleLogin() {
    console.log('toggleLogin running');
    this.setState({
      toggleLogin: !this.state.toggleLogin,
    })
  }

  removeBook() {
    const newBookList = this.state.bookList.filter((el) => el.title !== this.state.bookTitle)
    // console.log('book to remove: ', this.state.bookTitle, '. New book list: ', newBookList);
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
    const data = {
      isbn: this.state.isbn,
      title: this.state.bookTitle,
    }
    // console.log('book accepted: ', this.state.bookTitle);
    fetch('/toread/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      // .then((res) => res.json())
      // .then((response) => {
      //   // console.log(response);
      // })

    this.removeBook();
  }

  render() {
    let login;
    let blurred = '';
    if (this.state.toggleLogin) {
      login = < Login toggleLogin={this.toggleLogin} />;
      blurred = 'blurredBackground';
    }
    return (
      <div>
        <Header toggleList={this.toggleList} toggleLogin={this.toggleLogin} />
        <div id="main">
          {!this.state.toggleList? 
          <div className={ blurred }>
            <div id='book-area'>
              <BookCover imgUrl={this.state.bookCover} />
              <div>
                <BookDescription title={this.state.bookTitle} description={this.state.bookDescription} />
                <ResponseButton type='accept' acceptBook={this.acceptBook} />
                <ResponseButton type='reject' removeBook={this.removeBook} />
              </div>
            </div>
          </div> : <ToReadList />}
          { login }
        </div>
      </div>
    )
  }
}

export default App;
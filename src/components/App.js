import Header from './Header';
import BookCover from './BookCover';
import ResponseButton from './ResponseButton';
import React from 'react';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <BookCover />
        <ResponseButton type='accept' />
        <ResponseButton type='reject' />
      </div>
    )
  }
}

export default App;
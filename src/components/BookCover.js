import React from 'react';

class BookCover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrl: null,
    }
  }

  componentDidMount() {
    const bookUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn:${this.props.isbn}`;
    console.log(this.props.isbn);
    fetch(bookUrl)
      .then(res => res.json())
      .then((result) => {
        console.log(`Result: ${JSON.stringify(result)}`);
        this.setState({
          imgUrl: result.items[0].volumeInfo.imageLinks.thumbnail,
        })
      })
  }
  render() {
    return (
      <div>
        <img src={this.state.imgUrl} />
      </div>
    )
  }
}

export default BookCover;
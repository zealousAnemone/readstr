import React from 'react';

class ToReadList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toReadList: [],
    }
  }

  componentWillMount() {
    fetch('/toread/')
      .then(res => res.json())
      .then((results) => {
        this.setState({
          toReadList: results,
        })
        
      })
  }

  render() {
    return (
      <div id='to-read-list'>
        <h2>To Read</h2>
        <ul>
          {this.state.toReadList.map((item) => 
            <li key={item.isbn}>{item.title}</li>)
          }
        </ul>
      </div>
    )
  }
}
  

export default ToReadList;
import React from 'react';

const ToReadList = (props) => {
  
  return (
    <div>
      <h4>To Read List</h4>
      <ul>
        {props.list.map((item) => 
          <li>{item}</li>)
        }
      </ul>
    </div>
  )
}

export default ToReadList;
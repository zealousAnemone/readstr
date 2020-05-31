import React from 'react';

const ToReadList = (props) => {
  
  return (
    <div>
      <ul>
        {props.list.map((item) => 
          <li>{item}</li>)
        }
      </ul>
    </div>
  )
}

export default ToReadList;
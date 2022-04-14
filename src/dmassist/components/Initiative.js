import React, {useState} from 'react';

const Initiative = (props) => {
  const [order, setOrder] = useState([])
  const orderAdd = () => {
    const newOrder = [...order]
  }
  const addInit = () => {
  }
  const addButtonStyle = {
    border: "none",
    fontSize: "1.25em",
    backgroundColor: "rgba(255, 255, 255, 0)"
  }
  return (
    <div>
      <ul>
      </ul>
        <button onClick={addInit} style={addButtonStyle}>+</button>
    </div>
  )
}

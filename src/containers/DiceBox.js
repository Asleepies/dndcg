import React, {useState} from 'react'



export const DiceBox = (props) => {
  const sides = [3,4,6,8,10,12,20,100]

  const roll = (d,n) => {
    let rolls = [];
    let total = 0;
    for (let i=0; i < n; i++) {
      let r = Math.floor(Math.random() * d+1);
      rolls.push(r)
      total += r;
    }
    console.log(rolls)
  }

  const roll2 = ({target}) => {
    console.log(target)
  }

  return (
    <div>
      {sides.map(d => <button onClick={roll2}>D{d}</button> )}
    </div>
  )
}
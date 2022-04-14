import React, {useState} from 'react'

export const DiceBox = (props) => {
  
  const sides = [6,4,8,10,12,20,100,3,2]
  
  const [count, setCount] = useState(1)
  const countChange = ({target}) => {
    setCount(target.value)
  }

  const [dice, setDice] = useState(6)
  const diceChange = ({target}) => {
    setDice(target.value)
  }

  const roll = () => {
    const d = dice;
    const n = count;
    let rolls = [];
    let total = 0;
    for (let i=0; i < n; i++) {
      let r = Math.floor(Math.random() * d+1);
      rolls.push(r)
      total += r;
    }
    console.log(rolls, total)
  }

  return (
    <div>
      <input type="number"  value={count} onChange={countChange}/>
      {/* {sides.map(d => <button onClick={roll2} key={`D${d}`}>D{d}</button> )} */}
      <select name='dice'>
      {sides.map(d => <option key={`D${d}`} value={d} onChange={diceChange}>D{d}</option> )}
      </select>
      <button onClick={roll}>Roll</button>
    </div>
  )
}
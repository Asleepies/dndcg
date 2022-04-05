import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {CharacterInfo} from './containers/CharacterInfo.js'
import {DiceBox} from './containers/DiceBox.js'


const CharacterSheet = (props) => {
  const [isStart, setIsStart] = useState(false)
  const handleStart = () => {
    isStart ? setIsStart(false) : setIsStart(true)
  }
  return (
    <div>
      <h1>Let's Make an Adventurer!</h1>
      
      <CharacterInfo onClick={handleStart}/>

    </div>
    )
}

// ========================================

ReactDOM.render(
  <CharacterSheet />,
  document.getElementById('root')
);

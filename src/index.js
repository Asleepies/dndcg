import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {CharacterSheet} from './containers/CharacterSheet.js'
import {DiceBox} from './dicebox/DiceBox.js'
import {DMAssist} from './dmassist/DMAssist.js'


const NavBar = (props) => {
  const [page, setPage] = useState(<CharacterSheet />)
  const pageChange = ({target}) => {
    setPage(pages[target.id[1]])
  }
  const pages = [<CharacterSheet />, <DiceBox />, <DMAssist />]
  return (
    <div>
      <div>
        <button onClick={pageChange} id='p0'>Character Assistant</button>
        <button onClick={pageChange} id='p1'>Dice Box</button>
        <button onClick={pageChange} id='p2'>DM Assist</button>
      </div>
      {page}
    </div>
  )
}



// ========================================

ReactDOM.render(
  <NavBar />,
  document.getElementById('root')
);

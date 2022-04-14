import React, {useState} from 'react';
import { NewPlayer } from '../components/NewPlayer';
import { Player } from '../components/Player';

export const PlayerContainer = (props) => {
  const [players, setPlayers] = useState([null])
  const playerAdd = (player,id) => {
    const tempPlayers = [...players]
    tempPlayers.splice(id, 1, player)
    setPlayers(tempPlayers)
  }
  const playerRemove = (id) => {
    const tempPlayers = [...players]
    tempPlayers.splice(id, 1)
    setPlayers(tempPlayers)
  }
  const hpChange = (player,id) => {
    const tempPlayers = [...players]
    tempPlayers.splice(id, 1, player)
    setPlayers(tempPlayers)
  }
  const newPlayer = () => {
    const tempPlayers = [...players, null]
    setPlayers(tempPlayers)
  }
  
  const who = () => {
    console.log(players)
  }

  return (<div>

    { players.length ? 
    players.map((p, i) => 
    p ? <Player pc={p} id={i} key={p.name} onRemove={playerRemove} hpChange={hpChange}/> 
    : <NewPlayer id={i} key={`new${i}`} onAdd={playerAdd} onCancel={playerRemove}/>)    
    : null }

    { players.length ? <button onClick={newPlayer}>+</button> : <NewPlayer onAdd={playerAdd}/> }
    
    <button onClick={who}>who?</button>

  </div>)

}
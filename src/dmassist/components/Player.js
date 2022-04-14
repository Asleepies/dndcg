import React, {useState} from 'react';

export const Player = (props) => {
  const pc = props.pc 
  
  const styles = {
    box: {
      position: 'relative',
      width: '23em',
      padding: '.5%',
      border: '1px solid blue',
    },

    name: {
      margin: '0'
    },

    atts: {
      div: {display:'flex',
        justifyContent:'space-around'},
      att: {margin: '1%'}
    },

    removeButton: {
      position: 'absolute',
      top: '1%',
      right: '1%'
    }

  }
  
  const name = pc.name
  const player = pc.player
  const namesDisplay = (
    <div>
      <div>
        <h1 style={{margin:"0"}}>{name}</h1>
      </div>
      <div>
        <h2 style={{margin:"0"}}>{player}</h2>
      </div>
    </div>
  )
  
  
  const job = pc.job
  const jobDisplay = <p>{job}</p>
  
  
  const race = pc.race
  const raceDisplay = <p>{race}</p>
  
  
  const hp = pc.hp
  const hpChange = ({target}) => {
    const newPC = {...pc, hp: target.value}
    props.hpChange(newPC,props.id)
  }
  const hpInput = (
    <div>
      <label> HP:
        <input type="number" value={hp} onChange={hpChange}></input>
      </label>
    </div>
  )
  
  // MAYBE WILL USE IN THIS FILE LATER BUT DOUBTFUL
  // const attChange = (newAtts) => {
    //   setAttributes(newAtts)
    // }
  const attributes = pc.attributes
  const attDisplay = (
    <div style={styles.atts.div}>
      {Object.keys(attributes).map(att => (
      <div key={`${att}Div`}>
        <h6 style={styles.atts.att}>{att}:</h6>
          <p style={styles.atts.att}>{attributes[att]}</p>
      </div>
      ))}
    </div>
  )

  

  const removePlayer = () => {
    props.onRemove(props.id)
  }

  return (
    <div style={styles.box}>
      {namesDisplay}
      {jobDisplay}
      {raceDisplay}
      {hpInput}
      {attDisplay}
      <button onClick={removePlayer} style={styles.removeButton}>X</button>

    </div>
  )
}

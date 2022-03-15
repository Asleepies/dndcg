import React from 'react'

const CharacterName = (props) => {
  const handleChange = ({target}) => {
    const newName = target.value
    const dest = target.id
    props.onChange([newName, dest])
  }
  return (<div>
      <label>Character Name:
        <input type="text" placeholder="Mr Wizard" value={props.name} id="cn" onChange={handleChange}/>
      </label>
    </div>)
}

const PlayerName = (props) => {
  const handleChange = ({target}) => {
    const newName = target.value
    const dest = target.id
    props.onChange([newName, dest])
  }
  return (<div>
    <label>Player Name:
      <input type="text" placeholder="Mr Kyle" value={props.name} id="pn" onChange={handleChange}/>
    </label>
  </div>)
}

export const Names = (props) => {
  const handleChange = (names) => {
    props.onChange(names)
  }
  return (
    <div>
      <CharacterName name={props.cn} onChange={handleChange}/>
      <PlayerName name={props.pn} onChange={handleChange}/>
    </div>
  )
}
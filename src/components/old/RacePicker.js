import React from 'react'

export const RacePicker = (props) => {
  const raceList = ["Dragonborn", "Dwarf", "Elf", "Gnome", "Half-Elf", 
  "Half-Orc", "Halfling", "Human", "Teifling"];
  const changeRace = ({target}) => { 
    const newRace = target.value
    props.onChange(newRace) 
  }

  const randomRace = () => {
    let race = raceList[Math.floor(Math.random() * raceList.length)]
    props.onChange(race)
  }

  return (
    <div>
      <select name='races' onChange={changeRace} value={props.race}>
        <option>--Choose Race--</option>
      {raceList.map((race,index) => (
        <option value={race} key={index}>{race}</option>
      ))}
      </select>
      <button onClick={randomRace}>Random</button>
    </div>
  )
}
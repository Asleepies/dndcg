import React, {useState} from 'react';

export const NewPlayer = (props) => {
  const [pc, setPc] = useState(null)


  const styles = {
    box: {
      position: 'relative',
      width: '23em',
      // height: '6em',
      padding: '.5%',
      border: '1px solid blue'
    },
    name: {
      margin: '0'
    },
    cancelButton: {
      position: 'absolute',
      top: '1%',
      right: '1%'
    }
  }
  
  const [name, setName] = useState('')
  const nameChange = ({target}) => {
    const newName = target.value
    setName(newName)
  }
  const [player, setPlayer] = useState('')
  const playerChange = ({target}) => {
    const newPlayer = target.value
    setPlayer(newPlayer)
  }
  const namesInput = (
    <div>
      <div>
        <input type='text' placeholder='Character Name' value={name} onChange={nameChange}></input>
      </div>
      <div>
        <input type='text' placeholder='Player Name' value={player} onChange={playerChange}></input>
      </div>
    </div>
  )

  const [job, setJob] = useState('')
  const jobList = ["Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Monk",
  "Paladin", "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard"];
  const changeJob = ({target}) => { 
    const newJob = target.value
    setJob(newJob) 
  }
  const jobSelect = (
    <select name='jobs' onChange={changeJob} value={job}>
      <option>--Class--</option>
      {jobList.map((job,index) => (
        <option value={job} key={index}>{job}</option>
      ))}
    </select>
  )

  const [race, setRace] = useState('')
  const raceList = ["Dragonborn", "Dwarf", "Elf", "Gnome", "Half-Elf", 
  "Half-Orc", "Halfling", "Human", "Teifling"];
  const changeRace = ({target}) => { 
    const newRace = target.value
    setRace(newRace) 
  }
  const raceSelect = (
    <select name='races' onChange={changeRace} value={race}>
        <option>--Race--</option>
      {raceList.map((r,index) => (
        <option value={r} key={`race${index}`}>{r}</option>
      ))}
    </select>
  )

  const [hp, setHp] = useState(0)
  const hpChange = ({target}) => {
    setHp(target.value)
  }
  const hpInput = (
    <div>
      <label> HP:
        <input type="number" value={hp} onChange={hpChange}></input>
      </label>
    </div>
  )

  const [attributes, setAttributes] = useState({
      Str: 10, Dex: 10, Con: 10, Int: 10, Wis: 10, Cha: 10 })
  const attChange = (newAtts) => {
    setAttributes(newAtts)
  }
  const attInput = (
    <div>
      {Object.keys(attributes).map(att => (
      <label key={`${att}-lab`}>{att}:
        <input type="number" className="attInput" key={att} id={att} value={attributes[att]} onChange={attChange}/>
      </label>))}
    </div>
  )

  const [ac, setAC] = useState(10)
  const acChange = ({target}) => {
    setAC(target.value)
  }
  const acInput = (
    <div>
      <label> AC:
        <input type="number" value={ac} onChange={acChange}/>
      </label>
    </div>
  )

  const createPlayer = () => {
    const newPlayer = {
      // id: props.id,
      name: name,
      player: player,
      job: job,
      race: race,
      hp: hp,
      attributes: attributes
    }
    props.onAdd(newPlayer,props.id)
  }

  const cancelAdd = () => {
    props.onCancel(props.id)
  }

  return (
    <div style={styles.box}>
      {namesInput}
      {jobSelect}
      {raceSelect}
      {hpInput}
      {acInput}
      {attInput}
      <button onClick={createPlayer}>Save</button>
      <button onClick={cancelAdd} style={styles.cancelButton}>X</button>
    </div>
  )
}

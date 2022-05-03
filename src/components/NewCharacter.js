import React, {useState} from 'react';

export const NewCharacter = (props) => {
  // const [pc, setPc] = useState(null)

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

  const [level, setLevel] = useState(1)
  const levelChange = ({target}) => {
    setLevel(target.value)
  }
  const levelInput = (
    <div>
      <label> Level:
        <input type="number" value={level} onChange={levelChange} className='statInput'/>
      </label>
    </div>
  )

  const [stats, setStats] = useState({
      Str: 10, Dex: 10, Con: 10, Int: 10, Wis: 10, Cha: 10 })
  const statChange = ({target}) => {
    const tempStats = {...stats}
    tempStats[target.id] = target.value
    setStats(tempStats)
  }
  const statsRoll = () => {
    let tempStats = {}
    for (let stat of Object.keys(stats)) { 
      tempStats[stat] = Math.floor(Math.random() * (19 - 8) + 8);
    }
    setStats(tempStats)
  }
  const statsInput = (
    <div className='newStats'>
      <button onClick={statsRoll}>Roll Stats</button>
      <div className='newStatDiv'>
        {Object.keys(stats).map(stat => (
        <div key={`${stat}div`} className='statBlock'>
          <h6 className='newSLabel'>{stat}:</h6>
          <input type="number" className="statInput" id={stat} value={stats[stat]} onChange={statChange}/>
        </div>))}

      </div>
    </div>
)

  const createPlayer = () => {
    const newPlayer = {
      name: name,
      player: player,
      job: job,
      race: race,
      level: level,
      stats: stats
    }
    props.onStart(newPlayer)
  }

  return (
    <div className='box'>
      {namesInput}
      {jobSelect}
      {raceSelect}
      {levelInput}
      {statsInput}
      <button onClick={createPlayer}>Save</button>
    </div>
  )
}

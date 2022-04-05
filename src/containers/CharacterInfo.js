import React, {useState} from 'react'
// import {Attributes} from '../components/Attributes.js'
import {JobPicker} from '../components/JobPicker.js'
import {RacePicker} from '../components/RacePicker.js'
import {Names} from '../components/Names.js'
import {Fetcher} from '../components/Fetcher.js'
import {Display} from '../components/Display.js'


export const CharacterInfo = (props) => {
  const [characterName, setCharacterName] = useState('')
  const [playerName, setPlayerName] = useState('')
  const nameChange = (nameList) => {
    const [newName, dest] = nameList
    dest === 'pn' ? setPlayerName(newName) : setCharacterName(newName)
  }

  const [race, setRace] = useState('')
  const raceChange = (newRace) => {
    setRace(newRace)
  }
  const [raceInfo, setRaceInfo] = useState({})
  
  
  const [job, setJob] = useState('')
  const jobChange = (newJob) => {
    setJob(newJob)
  }
  const [jobInfo, setJobInfo] = useState({})
  const jobFetch = (info) => {
    const [job, lvl, race, spells, action] = info;
    job.levels = lvl;
    job.action = action;
    job.spellList = spells
    if (race) { setRaceInfo(race) }
    setJobInfo(job)
  }

  const [attributes, setAttributes] = useState({
    Str: 10, Dex: 10, Con: 10, Int: 10, Wis: 10, Cha: 10 })
  const attChange = (newAtts) => {
    setAttributes(newAtts)
  }

  const showMe = () => {
    console.log(jobInfo)
  }

  return (
    <div>
      <Names names={[characterName, playerName]} onChange={nameChange} />
      <RacePicker race={race} onChange={raceChange}/>
      <JobPicker job={job} onChange={jobChange}/>
      <Fetcher job={job} race={race} onClick={jobFetch}/>
      {Object.keys(jobInfo).length > 0 ? 
        <Display char={[job,race]} names={[characterName,playerName]} attributes={[attributes, attChange]} jData={jobInfo} rData={raceInfo}/> 
        : null}
    </div>
  )
}
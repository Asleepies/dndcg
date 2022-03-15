import React, {useState} from 'react'
// import {Attributes} from '../components/Attributes.js'
import {JobPicker} from '../components/JobPicker.js'
import {RacePicker} from '../components/RacePicker.js'
import {Names} from '../components/Names.js'
import {JobFetcher} from '../components/JobFetcher.js'
import {JobDisplay} from '../components/JobDisplay.js'


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
  
  const [job, setJob] = useState('')
  const jobChange = (newJob) => {
    setJob(newJob)
  }
  const [jobInfo, setJobInfo] = useState({})
  const jobFetch = (info) => {
    const [job, lvl, action] = info;
    job.levels = lvl
    job.action = action
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
      <JobFetcher job={job} jdata={jobInfo} onClick={jobFetch}/>
      {Object.keys(jobInfo).length > 0 ? 
        <JobDisplay job={job} names={[characterName,playerName]} attributes={[attributes, attChange]} jData={jobInfo}/> 
        : null}
    </div>
  )
}
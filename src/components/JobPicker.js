import React from 'react'

export const JobPicker = (props) => {
  const jobList = ["Barbarian", "Bard", "Claric", "Druid", "Fighter", "Monk",
  "Paladin", "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard"];
  const changeJob = ({target}) => { 
    const newJob = target.value
    props.onChange(newJob) 
  }
  const randomJob = () => {
    let newJob = jobList[Math.floor(Math.random() * jobList.length)]
    props.onChange(newJob)
  }

  return (
    <div>
      <select name='jobs' onChange={changeJob} value={props.job}>
        <option>--Choose Class--</option>
      {jobList.map((job,index) => (
        <option value={job} key={index}>{job}</option>
      ))}
      </select>
      <button onClick={randomJob}>Random</button>
    </div>
  )
}
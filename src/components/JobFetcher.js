import React, {useState} from 'react'



export const JobFetcher = (props) => {
  const [action, setAction] = useState('user')
  const actionChange = ({target}) => {
    setAction(target.value)
  }

  const job = props.job
  let jobInfo = props.jdata
  const lvl = 1;

  const randomChar = (data) => {
    const [jobData, lvl, action] = data;

    let equipmentOptions = [...jobData.starting_equipment_options]
    delete jobData.starting_equipment_options
    equipmentOptions.forEach(option => {
      if (option.from.equipment_option){ delete option.from.equipment_option }
      for (let c=0; c < option.choose; c++) {
        let choice = Math.floor(Math.random() * option.from.length)
        jobData.starting_equipment.push(option.from.splice(choice,1)[0  ])
      }
    })

    let profOptions = [...jobData.proficiency_choices]
    delete jobData.proficiency_choices
    profOptions.forEach(option => {
      for (let c=0; c < option.choose; c++) {
        let choice = Math.floor(Math.random() * option.from.length)
        jobData.proficiencies.push(option.from.splice(choice,1)[0])
      }
    })

    console.log([jobData,lvl,action])
    props.onClick([jobData,lvl,action])
  }

  const jobFetch = async() => {
    const epClass = `https://www.dnd5eapi.co/api/classes/${job.toLowerCase()}`;
    const epLevels = `${epClass}/levels/${lvl}`;
    try {
      const resClass = await fetch(epClass)
      const resLvl = await fetch(epLevels)
      if (resClass.ok && resLvl.ok) {
        const jResClass = await resClass.json()
        const jResLvl = await resLvl.json()
        action === "user" ? props.onClick([jResClass, jResLvl, action]) 
          : randomChar([jResClass, jResLvl, action])
      }   
    } catch (err) {
      console.log(err)
    }
  } 
  return (
  <div>
    <select name='actions' onChange={actionChange}>
      <option>--What would you like to do?--</option>
      <option value="user"> Make my own character </option>
      <option value="rand"> Get a random character </option>
    </select>
    <button onClick={jobFetch}>Let's Go</button>
  </div>
  )
}
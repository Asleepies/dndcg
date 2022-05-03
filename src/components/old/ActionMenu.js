import React, {useState} from 'react'

export const ActionMenu = (props) => {

  const jobFetch = async() => {
    const epClass = `https://www.dnd5eapi.co/api/classes/${job.toLowerCase()}`;
    const epLevels = `${epClass}/levels/${lvl}`;
    try {
      const resClass = await fetch(epClass)
      const resLvl = await fetch(epLevels)
      if (resClass.ok && resLvl.ok) {
        const jResClass = await resClass.json()
        const jResLvl = await resLvl.json()
        props.onClick([jResClass, jResLvl])
      }   
    } catch (err) {
      console.log(err)
    }
  }
  
  return (
    <div>
      <select name='actions' onChange="" value="">
        <option>--What would you like to do?--</option>
        <option value="">Make my own character</option>
        <option value="">Get a random character</option>
      </select>
      <button onClick="">Random</button>
    </div>
  )

}
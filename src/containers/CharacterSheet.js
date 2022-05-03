import React, {useState, useEffect} from 'react'
import {NewCharacter} from '../components/NewCharacter.js'
import {Character} from '../components/Character.js'

export const CharacterSheet = (props) => {

  const [character, setCharacter] = useState({})
  const characterNew = (newcharacter) => {
    setCharacter(newcharacter)
  }  
  const onReset = () => {
    setCharacter({})
  }
  
  const [data, setData] = useState({})
  
  useEffect(() => {
    const dataFetch = async() => {
      if (!Object.keys(character).length) { return }
      const ep = `https://www.dnd5eapi.co/api/`
      const epRace = `${ep}races/${character.race.toLowerCase()}`;
      const epClass = `${ep}classes/${character.job.toLowerCase()}`;
      const epLevels = `${epClass}/levels/${character.level}`;
      
      try {
        const resJob = await fetch(epClass);
        const resLvl = await fetch(epLevels);
        const resRace = await fetch(epRace);
        let resCache = {}
  
        if (resJob.ok) {
          const jResJob = await resJob.json();
          resCache.job = jResJob;
        }
        if (resRace.ok) {
          const jResRace = await resRace.json();
          resCache.race = jResRace;
        }
        if (resLvl.ok) {
          const jResLvl = await resLvl.json();
          resCache.level = jResLvl
          const spells = Object.keys(jResLvl).includes('spellcasting') ? jResLvl.spellcasting : null;
          const spellChoices = []
          if (spells) {
            for (let [k,v] of Object.entries(spells)) {
              let list = [v]
              let n = k.split('_')
              let epSpell;
                if (n[0] === 'cantrips') {
                  epSpell = `${epClass}/levels/0/spells`;
                  list.unshift(0) }
                else if ( n[0] === 'spell') {
                  epSpell = `${epClass}/levels/${n[3]}/spells`
                  list.unshift(n[3]) }
                
              if ((n[0] === 'spell' && v > 0) || n[0] === 'cantrips') {
                try {
                  const res = await fetch(epSpell)
                  if (res.ok) {
                    const jres = await res.json()
                    for (let s of jres.results ) {
                      list.push(s.name)
                    }
                    spellChoices.push(list)
                  }
                } catch (err) {
                  console.log(err)
                }
              }
            }
            resCache.spell = spellChoices
          }
        }
        setData(resCache)
      } catch (err) {
        console.log(err)
      }
    }
    dataFetch()
  }, [character])

  const show = () => {
    console.log(data)
  }
  
  return (
    <div id='Sheet'>
      <h1>Let's Make an Adventurer!</h1>
      
      {!Object.keys(character).length ?
       <NewCharacter onStart={characterNew}/> 
      : <Character pc={character} data={data} onReset={onReset} />}
      <button onClick={show}>show</button>
      {JSON.stringify(data)}

    </div>
    )
}


// Line 16:21:  Effect callbacks are synchronous to prevent race conditions. Put the async function inside:

// useEffect(() => {
//   async function fetchData() {
//     // You can await here
//     const response = await MyAPI.getData(someId);
//     // ...
//   }
//   fetchData();
// }, [someId]); // Or [] if effect doesn't need props or state

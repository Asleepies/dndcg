import React, {useState} from 'react'



export const Fetcher = (props) => {
  const [action, setAction] = useState('user')
  const actionChange = ({target}) => {
    setAction(target.value)
  }

  const job = props.job
  const race = props.race ? props.race : null;
  const lvl = 1;

  const randomChar = (data) => {
    const [jobData, lvl, race, action] = data;

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

    const rOptions = {...race.starting_proficiency_options}
    delete race.starting_proficiency_options
    for (let p=0; p < rOptions.choose; p++) {
      let choice = Math.floor(Math.random() * rOptions.from)
      race.starting_proficiencies.push(rOptions.from.splice(choice,1)[0])
    }

    console.log([jobData,lvl,race,action])
    props.onClick([jobData,lvl,race,action])
  }

  const jobFetch = async() => {
    // console.log(race)
    const ep = `https://www.dnd5eapi.co/api/`
    const epRace = `${ep}races/${race ? race.toLowerCase() : race}`;
    const epClass = `${ep}classes/${job.toLowerCase()}`;
    const epLevels = `${epClass}/levels/${lvl}`;
    
    try {
      const resClass = await fetch(epClass);
      const resLvl = await fetch(epLevels);
      const resRace = race ? await fetch(epRace) : null;  
      if (resClass.ok && resLvl.ok) {
        const jResRace = resRace.ok ? await resRace.json() : null;
        const jResClass = await resClass.json();
        const jResLvl = await resLvl.json();
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
        }

        jResRace ? console.log(jResRace) : console.log('why');
        action === "user" ? props.onClick([jResClass, jResLvl, jResRace, spellChoices, action]) 
          : randomChar([jResClass, jResLvl, jResRace, action])
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
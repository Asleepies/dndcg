import React, {useState} from 'react';


export const Character = (props) => {
  const pc = props.pc 
  const data = props.data

  const onReset = () => {
    props.onReset()
  }  
  return (
    <div className="box">
      <Basics pc={pc} data={Object.keys(data).length ? data : null}/>
      {Object.keys(data).length ? <Featraits data={data} /> : <div>Loading </div>}
      {Object.keys(data).length ? <Cross1 data={data} /> : <div>Loading </div>}
      {Object.keys(data).length  ? <Proficiencies data={data} /> :  <div>Loading Proficiencies</div>}
      {Object.keys(data).length  ? <Equipment data={data.job} /> :  <div>Loading Equipment</div>}
      {Object.keys(data).includes('spell') ? <Spells data={data} /> : <div>Loading Spells</div>}
      <button onClick={onReset} className='removeButton'>X</button>

    </div>
  )
}

const Basics = (props) => {
  const pc = props.pc
  const name = pc.name
  const player = pc.player
  const job = pc.job
  const race = pc.race
  const stats = pc.stats
  let subJob = props.data ? (props.data.job.subclasses[0].name) : null;
  let subRace = props.data ? ((Object.keys(props.data.race).length && props.data.race.subraces.length) 
      ? props.data.race.subraces[0].name 
      : null) : null

  return (
    <div>
      <div className="crossSection">
        <div>
          <div>
            <h1 style={{margin:"0"}}>{name}</h1>
          </div>
          <div>
            <h2 style={{margin:"0"}}>{player}</h2>
          </div>
        </div>
        <div>
          <p style={{margin:"0 .25em"}}>{race}</p>
          <p style={{margin:"0 .25em"}}>{subRace}</p>
          <p style={{margin:"0 .25em"}}>{job}</p>
          <p style={{margin:"0 .25em"}}>{subJob}</p>
        </div>
      </div>
      <div className='statsDiv'>
        {Object.keys(stats).map(stat => (
        <div key={`${stat}Div`} className='statBlock'>
          <h6 className='statPush'>{stat}:</h6>
            <p className='statPush'>{stats[stat]}({stats[stat]>9 ? `+` : null }{(Math.floor(stats[stat]-10)/2)})</p>
        </div>
        ))}
      </div>
      
    </div>
  )
}

const Cross1 = (props) => {
  const data = props.data
  const job = data.job
  const race = data.race
  const levels = data.level

  return (
    <div className="crossSection" id="hd-saves-profbonus">
        <div>
          <h6>Hit Die:</h6>
          <div>D{job.hit_die}</div>
        </div>
        <div>
          <h6>Saving Throws:</h6>
          <div>{job.saving_throws[0].name},{job.saving_throws[1].name}</div>
        </div>
        <div>
          <h6>Proficiency:</h6>
          <div>+{levels.prof_bonus}</div>
        </div>
        <div>
          <h6>Speed:</h6>
          <div>{Object.keys(race).length > 0  ? `${race.speed}ft.` : null}</div>
        </div>
        {Object.keys(race).length > 0 ? 
        (<div>
          <h6>Racial Ability Bonus:</h6>
          {race.ability_bonuses.map(b => 
          <div key={`bonus${b.ability_score.index}`}>{b.ability_score.name} +{b.bonus}</div>)}          
        </div>) : null }        
        <div>
          <h6>Size:</h6>
          <div>{race ? race.size : null}</div>
        </div>
      </div>
  )
}

const Featraits = (props) => {
  const race = props.data.race
  const levels = props.data.level
  
  return (
    <div className="crossSection" id='feature-traits'>
      {Object.keys(race).length > 0 ? (<div>
        <h6>Traits:</h6>
        {race.traits.map((t) => <div key={t.index}>{t.name}</div>)}
      </div>) : null}
      {/* </div>) : <div>Pick a race</div>} */}
      <div>
        <h6>Features: </h6>
        {levels.features.map((f) => f.index.includes("spellcasting") ? null 
        : <div key={f.index}>{f.name}</div>)}
      </div>
      {Object.keys(race).length > 0 ? <div>
        <h6>Languages:</h6>
        {race.languages.map((l) => <div key={l.index}>{l.name}</div>)}
      </div> : null}
    </div>
  )
}

const Proficiencies = (props) => {
  const job = props.data.job
  const race = props.data.race

  return (
    <div className="crossSection" id='proficiencies'>
      <div>
        <h6>Proficiencies:</h6>  
        {job.proficiencies.map(prof => (
        <div key={prof.index}>{prof.name}</div>))}
        {Object.keys(race).length > 0 ? race.starting_proficiencies.map(prof => (
          <div key={prof.index}>{prof.name}</div>
        )): null}
      </div>

      {/* {job.action === 'user' ? job.proficiency_choices.map((choice, i) => ( */}
      {job.proficiency_choices.map((choice, i) => (
      <div key={`${choice.type}Choices${i}`}>
        <h6>Choose {choice.choose} </h6>
        {choice.from.map((prof) => (
        <div key={prof.index}>{prof.name}</div>))}
      </div>
      ))} 
       {/* )) : null} */}
      
      {race.starting_proficiency_options ? (<div>
        <h6>Choose {race.starting_proficiency_options.choose}</h6>
        {race.starting_proficiency_options.from.map((prof) => (
        <div key={prof.index}>{prof.name}</div>))}
      </div>)
        : null}
      
    </div>
   )
}

const Equipment = (props) => {
  // Job data received from the api
  const data = props.data

  return (
    <div className="crossSection">
      <div>
        <h6>Starting Equipment</h6>  
        {data.starting_equipment.map(item => ( item.equipment ? 
        <div key={item.equipment.index}>{item.equipment.name}</div> : null))}
      </div>
      
      {/* {data.action === 'user' ? data.starting_equipment_options.map((choice, i) => ( */}
      {data.starting_equipment_options.map((choice, i) => (
        <div key={`${choice.type}Choices${i}`}>
          <h6>Choose {choice.choose} </h6>
          {choice.from.map((item, i) => ( 
          
          item.equipment ? 
          <div key={item.equipment.index}>{item.equipment.name}</div>
          
          : item.equipment_option ? 
          <div key={item.equipment_option.from.equipment_category.index}>{item.equipment_option.from.equipment_category.name}</div> 
          
          : item[0] ? (
          <div key={`ecSet${i}`}>set
            {Object.entries(item).map(([k,v], i) => 
            (<div key={i}>{v.equipment_option? v.equipment_option.from.equipment_category.name: v.equipment.name }</div>))} 
          </div>
          )
          
          : <div key={`ec${i}`}>farts</div>)
          )}
        </div>
          ))}
          {/* )) : null} */}
    </div>
  )
}

const Spells = (props) => {
  const spells = props.data.spell
  const levels = props.data.level
  const job = props.data.job

  return (
    <div className="crossSection">
      <div>
        <h6>Spellcasting: {job.spellcasting.spellcasting_ability.name}</h6>
        {Object.keys(levels.spellcasting).map((k) => 
          k === "cantrips_known" ? <div key={k}>Cantrips: {levels.spellcasting[k]}</div>
          : k === "spells_known" ? <div key={k}>Spells Known: {levels.spellcasting[k]}</div> 
          : levels.spellcasting[k] ? <div key={k}>Level {k.slice(-1)} slots: {levels.spellcasting[k]}</div>
          : null )}
      </div>

      {spells.map(l => (
        <div key={`spell${l[0]}`}>
          <h6 key={`slot${l[0]}num`}>Choose {(Object.keys(levels.spellcasting).includes('spells_known') 
            && l[0] > 0) 
            ? levels.spellcasting.spells_known : l[1]}:</h6>
          {l.map((s,i) => (
            i < 2 ? null : <div key={s}>{s}</div>
          ))}
        </div>
      ))}
    </div>
  )
}
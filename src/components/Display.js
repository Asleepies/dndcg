import React from 'react';
import {Attributes} from './Attributes.js'

const Spells = (props) => {
  
  const spells = props.spells

  return (
    <div className="spellLevels">
      {spells.map(l => (
        <div key={`spell${l[0]}`}>
          <h6 key={`slot${l[0]}num`}>Choose {l[1]}:</h6>
          {l.map((s,i) => (
            i < 2 ? null : <div key={s}>{s}</div>
          ))}
        </div>
      ))}
    </div>
  )
}


export const Display = (props) => {
  const [job, race] = props.char
  const jData = props.jData
  const rData = props.rData
  const [cn, pn] = props.names
  const [attributes, setAttributes] = props.attributes
  const handleChange = (newAtts) => {
    setAttributes(newAtts)
  }
  const lvl = 1


  return Object.keys(jData).length > 0 ? (
    <div>
      <div id='names'>
      {cn ? (<div className='crossSection'><h3>{cn} the {jData.name ? jData.name: "Celibate"}</h3><h4>Lvl{lvl}</h4></div>) 
          : (<div className='crossSection'><h3>Mr. Wizard the {jData.name ? jData.name : "Celibate"}</h3><h4>--Lvl {lvl}</h4></div>)} 
      {pn ? <h4 className="plyrName">{pn}</h4> : <h4 className="plyrName">Mr Kyle</h4>}
      </div>

      <Attributes job={job} attributes={attributes} onChange={handleChange}/>
      
      <div className="crossSection" id="hd-saves-profbonus">
        <div>
          <h6>Hit Die:</h6>
          <div>D{jData.hit_die}</div>
        </div>
        <div>
          <h6>Saving Throws:</h6>
          <div>{jData.saving_throws[0].name},{jData.saving_throws[1].name}</div>
        </div>
        <div>
          <h6>Proficiency:</h6>
          <div>+{jData.levels.prof_bonus}</div>
        </div>
        <div>
          <h6>Speed:</h6>
          <div>{rData ? `${rData.speed}ft.` : null}</div>
        </div>
        <div>
          <h6>Racial Ability Bonus:</h6>
          {rData ? rData.ability_bonuses.map(b => <div key={`bonus${b.ability_score.index}`}>{b.ability_score.name} +{b.bonus}</div>) : null}          
        </div>        
        <div>
          <h6>Size:</h6>
          <div>{rData ? rData.size : null}</div>
        </div>
      </div>

      <div className="crossSection" id='feature-traits'>
        {rData ? (<div>
          <h6>Traits:</h6>
          {rData.traits.map((t) => <div key={t.index}>{t.name}</div>)}
        </div>) : <div>Pick a race</div>}
        <div>
          <h6>Features: </h6>
          {jData.levels.features.map((f) => f.index.includes("spellcasting") ? null 
          : <div key={f.index}>{f.name}</div>)}
        </div>
        <div>
          <h6>Languages</h6>
          {rData.languages.map((l) => <div key={l.index}>{l.name}</div>)}
        </div>
      </div>

      <div className="crossSection" id='subRaces'>

        <div>
          <h6>Sub Class: </h6>
          <div>{jData.subclasses[0].name}</div>
        </div>

        {rData.subraces.length > 0 ? 
        <div>
          <h6>Sub Race: </h6>
          <div>{rData.subraces[0].name}</div>
        </div> : null}
      </div>


      <div className="crossSection" id='equipment'>
        <div>
          <h6>Starting Equipment</h6>  
          {jData.starting_equipment.map(item => ( item.equipment ? 
          <div key={item.equipment.index}>{item.equipment.name}</div> : null))}
        </div>

        {jData.action === 'user' ? jData.starting_equipment_options.map((choice, i) => (
        <div key={`${choice.type}Choices${i}`}>
          <h6>Choose {choice.choose} </h6>
          {choice.from.map((item, i) => ( 
          
          item.equipment ? 
          <div key={item.equipment.index}>{item.equipment.name}</div>
          
          : item.equipment_option ? 
          <div key={item.equipment_option.from.equipment_category.index}>{item.equipment_option.from.equipment_category.name}</div> 
          
          : item[0] ? (
          <div key={`ecSet${i}`}>set
            {/* {makeSet(item)} */}
            {Object.entries(item).map(([k,v], i) => (<div key={i}>{v.equipment_option? v.equipment_option.from.equipment_category.name: v.equipment.name }</div>))} 
          </div>
          )
          
          : <div key={`ec${i}`}>farts</div>)
          )}
        </div>
          )) : null}
      </div>

      <div className="crossSection" id='proficiencies'>
        <div>
          <h6>Proficiencies:</h6>  
          {jData.proficiencies.map(prof => (
          <div key={prof.index}>{prof.name}</div>))}
          {rData ? rData.starting_proficiencies.map(prof => (
            <div key={prof.index}>{prof.name}</div>
          )): null}
        </div>

        {jData.action === 'user' ? jData.proficiency_choices.map((choice, i) => (
        <div key={`${choice.type}Choices${i}`}>
          <h6>Choose {choice.choose} </h6>
          {choice.from.map((prof) => (
          <div key={prof.index}>{prof.name}</div>))}
        </div>
          )) : null}

        {rData.starting_proficiency_options ? (<div>
          <h6>Choose {rData.starting_proficiency_options.choose}</h6>
          {rData.starting_proficiency_options.from.map((prof) => (
          <div key={prof.index}>{prof.name}</div>))}
        </div>)
          : null}
          
      </div>


      {jData.spellcasting ? ( 
      <div className="crossSection" id='spell'>
        <div>
          <h6>Spellcasting: {jData.spellcasting.spellcasting_ability.name}</h6>
          {Object.keys(jData.levels.spellcasting).map((k) => 
            k === "cantrips_known" ? <div key={k}>Cantrips: {jData.levels.spellcasting[k]}</div>
            : k === "spells_known" ? <div key={k}>Spells Known: {jData.levels.spellcasting[k]}</div> 
            : jData.levels.spellcasting[k] ? <div key={k}>Level {k.slice(-1)} slots: {jData.levels.spellcasting[k]}</div>
            : null )}
        </div>
        {/* {spellChoices(jData.levels.spellcasting)} */}
        <Spells spells={jData.spellList}/>
      </div>) : null}
    </div>

  ) : (

    <div>
      {cn ? (<div className='crossSection'><h3>{cn} the {jData.name ? jData.name: "Celibate"}</h3><h4>Lvl{lvl}</h4></div>) 
          : (<div className='crossSection'><h3>Mr. Wizard the {jData.name ? jData.name : "Celibate"}</h3><h4>--Lvl {lvl}</h4></div>)
          }
      {pn ? <h4 className="plyrName">{pn}</h4> : <h4 className="plyrName">Mr Kyle</h4>}
    </div>
  )
}


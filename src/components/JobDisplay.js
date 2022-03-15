import React from 'react';
import {Attributes} from './Attributes.js'


export const JobDisplay = (props) => {
  const jData = props.jData
  const [cn, pn] = props.names
  const [attributes, setAttributes] = props.attributes
  const handleChange = (newAtts) => {
    setAttributes(newAtts)
  }
  const lvl = 1

  return Object.keys(jData).length > 0 ? (
    <div>
      <div>
      {cn ? (<div className='crossSection'><h3>{cn} the {jData.name ? jData.name: "Celibate"}</h3><h4>Lvl{lvl}</h4></div>) 
          : (<div className='crossSection'><h3>Mr. Wizard the {jData.name ? jData.name : "Celibate"}</h3><h4>--Lvl {lvl}</h4></div>)
          }
      {pn ? <h4 className="plyrName">{pn}</h4> : <h4 className="plyrName">Mr Kyle</h4>}
      </div>

      <Attributes job={props.job} attributes={attributes} onChange={handleChange}/>
      
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
      </div>

      <div className="crossSection" id='spell-feature'>
        {jData.spellcasting.spellcasting_ability ? (<div>
          <h6>Spellcasting: {jData.spellcasting.spellcasting_ability.name}</h6>
          {Object.keys(jData.levels.spellcasting).map((k) => 
            k === "cantrips_known" ? <div key={k}>Cantrips: {jData.levels.spellcasting[k]}</div>
            : k === "spells_known" ? <div key={k}>Spells Known: {jData.levels.spellcasting[k]}</div> 
            : jData.levels.spellcasting[k] ? <div key={k}>Level {k.slice(-1)} slots: {jData.levels.spellcasting[k]}</div>
            : null
          )}
        </div>) : null}
        <div>
          <h6>Features: </h6>
          {jData.levels.features.map((f) => 
          f.index.includes("spellcasting") ? null : <div key={f.index}>{f.name}</div>)}
        </div>  
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
        </div>

        {jData.action === 'user' ? jData.proficiency_choices.map((choice, i) => (
        <div key={`${choice.type}Choices${i}`}>
          <h6>Choose {choice.choose} </h6>
          {choice.from.map((prof) => (
          <div key={prof.index}>{prof.name}</div>))}
        </div>
          )) : null}
          
      </div>
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


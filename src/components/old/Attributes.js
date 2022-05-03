import React, {useEffect} from 'react'

export const Attributes = (props) => {
  const a = props.attributes

  
  const attChange = ({target}) => {
    const x = {
      ...a,
      [target.id]: parseInt(target.value)
    }
    props.onChange(x)
  }
  
  const randomAtts = () => {
    let newGuy = {}
    for (let att of Object.keys(a)) { 
      newGuy[att] = Math.floor(Math.random() * (17 - 8) + 8);
    }
    props.onChange(newGuy)
  }
  
  useEffect(() => {randomAtts()}, [])
  
  return (
    <div>
      {Object.keys(a).map(att => (
          <label key={`${att}-lab`}>{att}:
            <input type="number" className="statInput" key={att} id={att} value={a[att]} onChange={attChange}/>
          </label>
      ))}
      <button onClick={randomAtts}>Random</button>
    </div>
  )
}
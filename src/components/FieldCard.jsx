/*Responsibel for handling one field UI,settings,preview,dleet button */
import "./FieldCard.css"

export default function FieldCard(props){

  return (
    <div className="fieldCard-container">
      <label>Field Label</label>
            <input 
            value={props.label}
            onChange={(e)=>props.updateFieldLabel(props.id,e.target.value)}
            />
      
            <div className="required-now">
            <label >Required
            <input type="checkbox" onChange={e =>props.updateRequired(props.id,e.target.checked)}/></label>

            {
            props.type === "select" && 
              props.options.map((option,index)=>(
                <input key={index} value={option.label} onChange={(e)=>props.updateOptionLabel(props.id,index,e.target.value)} type="text" placeholder="add option name"/>
              ))
            }
            </div>
      

      <h4>Preview</h4>
          {
            props.type ==="text" ? 
          <label className="text-preview">
            {props.label}
            {props.required && "*"}
            <input
              type="text"
              placeholder="user input here"
              required={props.required} />
          </label>
            : ( 
            props.type === "select"  ?
            <>
            <label>{props.label}{props.required && "*"}</label>
            <select className="select-preview">
              {props.options.map((option,index)=>(
                <option key={index} value={option.label}>{option.label}</option>
              ))}
            </select>
            </>
            :
          <label className="checkbox-preview">
            <input type="checkbox" required={props.required} />
            {props.label}{props.required && "*"}
          </label>
          )
          }
          <button className="delete-btn" onClick={()=>props.deleteField(props.id)}>Delete</button>
    </div>
  )
}






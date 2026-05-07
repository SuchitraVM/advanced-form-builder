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
            :
          <label className="checkbox-preview">
            <input type="checkbox" required={props.required} />
            {props.label}{props.required && "*"}
          </label>
          }
          <button className="delete-btn" onClick={()=>props.deleteField(props.id)}>Delete</button>
    </div>
  )
}






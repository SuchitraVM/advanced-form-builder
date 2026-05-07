/*Responsibel for handling one field UI,settings,preview,dleet button */

export default function FieldCard(props){
  return (
    <div>
            <input 
            value={props.label}
            onChange={(e)=>props.updateFieldLabel(props.id,e.target.value)}
            />
            <label>Required</label>
            <input type="checkbox" onChange={e =>props.updateRequired(props.id,e.target.checked)}/>
            
          {
            props.type ==="text" ? 
            <label>
              {props.required && "*"}
            <input 
            type="text"
            placeholder="user input here"
            required = {props.required}
            />
            
            </label>
            :
          <label>{props.required && "*"}
              <input type="checkbox" required = {props.required}/>{props.label}
            </label>
          }
          <button onClick={()=>props.deleteField(props.id)}>Delete</button>
          </div>
  )
}
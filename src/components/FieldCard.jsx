/*Responsibel for handling one field UI,settings,preview,dleet button */
import "./FieldCard.css"

export default function FieldCard(props){

  return (
    <div className="fieldCard-container">
      <label className="field-label">Field Label</label>
            <input 
            className="fieldLabel"
            value={props.label}
            onChange={(e)=>props.updateFieldLabel(props.id,e.target.value)}
            />
      
          <div className="required-now">
          <label>
            Required</label>
            <input 
              type="checkbox" 
              onChange={e => props.updateRequired(props.id, e.target.checked)} 
            />
          </div>


          {props.type === "select" && (
            <>
              {/* Wrap the map function in curly braces */}
              {props.options.map((option, index) => (
                <div key={index} className="option-settings">
                  <input
                    value={option.label}
                    onChange={(e) => props.updateOptionLabel(props.id, index, e.target.value)}
                    type="text"
                    placeholder="add option name"
                  />
                  <button className="optionDelete-btn" onClick={() => props.deleteOption(props.id, index)}>
                    Delete
                  </button>
                  </div>
                ))}
                <button className="addOption-btn" onClick={() => props.addOption(props.id)}>
                  Add Option
                </button>
                  </>
                )}

      <h4>Preview</h4>
          {
            props.type ==="text" ? 
            <div className="text-preview">
            <label>{props.label} {props.required && "*"}</label>
              <input
                type="text"
                placeholder="user input here"
                required={props.required} />
            </div>
            : ( 
            props.type === "select"  ?
            <div className="select-preview-container">
            <label>{props.label} {props.required && "*"}</label>
            <select className="select-preview">
              <option>Select an option</option>
              {props.options.map((option,index)=>(
                <option key={index} value={option.label}>{option.label}</option>
                
              ))}
            </select>
            </div>
            :
          <label className="checkbox-preview">
            <input type="checkbox" required={props.required} />
            {props.label} {props.required && "*"}
          </label>
          )
          }
          <button className="fieldDelete-btn" onClick={()=>props.deleteField(props.id)}>Delete</button>
    </div>
  )
}







/* Responsible for handling one field UI, settings, preview, delete button */

import { useState } from "react"
import "./FieldCard.css"

export default function FieldCard(props) {

  const [password, setPassword] = useState("")
   const [ confirmPassword , setConfirmPassword] = useState("")
  const [ showPassword , setShowPassword ] = useState(false)
   const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  function toggleShowPassword(){
    setShowPassword(!showPassword)
  }

  function toggleShowConfirmPassword(){
    setShowConfirmPassword(!showConfirmPassword)
  }


  function passwordValidation(){
    if(confirmPassword && password.length < 8){
      return (
      <p className="password-length">Password must be at least 8 characters</p>
    )
    }
    else if(confirmPassword && password !== confirmPassword){
      return (
      <p className="password-error">Passwords do not match</p>
        )
    }else if (confirmPassword && password === confirmPassword && password.length >= 8){
     return (<p className="password-success"> Passwords match</p>)
    }
    return null
  }


  function renderPreview() {

    if (
      props.type === "text" ||
      props.type === "email" || 
      props.type === "number"
    ) {
      return (
        <div className="text-preview">
          <label>
            {props.label} {props.required && "*"}
          </label>

          <input
            type={props.type}
            placeholder={props.type === "text" ? "user input here" : "Enter email here"}
            required={props.required}
          />
        </div>
      )
    }

    else if(props.type === "textarea"){
      return (
        <div className="textarea-preview">
          <label>
            {props.label} {props.required && "*"}
          </label>
          <textarea 
            rows={5}
            cols={40}
            placeholder="Enter your text here"
            required={props.required}
          />

        </div>
      )
    }

    else if (props.type === "password") {
      return (
        <div className="password-preview-container">

          <label>
            {props.label} {props.required && "*"}
          </label>

          <div className="setPassword-inputs">
          <input
            type= {showPassword === true ? "text" : "password"}
            placeholder="Set Password"
            required={props.required}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button type="button" onClick={toggleShowPassword}>👁</button>
          </div>


          <div className="confirmPassword-inputs">
          <input
            type={showConfirmPassword === true ? "text" : "password"}
            placeholder="Confirm Password"
            required={props.required}
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
          <button type="button" onClick={toggleShowConfirmPassword}>👁</button>
          </div>
          
          {
              passwordValidation()
              
          }

        </div>
      )
    }

    else if (props.type === "select") {
      return (
        <div className="select-preview-container">

          <label>
            {props.label} {props.required && "*"}
          </label>

          <select className="select-preview">

            <option>Select an option</option>

            {props.options.map((option, index) => (
              <option key={index} value={option.label}>
                {option.label}
              </option>
            ))}

          </select>

        </div>
      )
    }

    else if (props.type === "checkbox") {
      return (
        <label className="checkbox-preview">

          <input
            type="checkbox"
            required={props.required}
          />

          {props.label} {props.required && "*"}

        </label>
      )
    }

    return null
  }


  /*displayed on screen */
  return (
    
    <div className="fieldCard-container">
    {
      !props.isPreviewMode && 
      (
        <div className="field-label">
        <label>
          Field Label
        </label>
        <input
          className="fieldLabel"
          value={props.label}
          onChange={(e) =>
            props.updateFieldLabel(props.id, e.target.value)
          }/>

        <div className="required-now">
          <label>
            Required
          </label>

          <input
            type="checkbox"
            onChange={(e) =>
              props.updateRequired(props.id, e.target.checked)
            }
          />
        </div>

      {props.type === "select" && (
        <>

          {props.options.map((option, index) => (

            <div key={index} className="option-settings">

              <input
                value={option.label}
                onChange={(e) =>
                  props.updateOptionLabel(
                    props.id,
                    index,
                    e.target.value
                  )
                }
                type="text"
                placeholder="add option name"
              />

              <button
                className="optionDelete-btn"
                onClick={() =>
                  props.deleteOption(props.id, index)
                }
              >
                Delete
              </button>

            </div>
          ))}

          <button
            className="addOption-btn"
            onClick={() => props.addOption(props.id)}
          >
            Add Option
          </button>

        </>
      )}
      
      <h4>Preview</h4>
      </div>
      )
    }

      <div>
        {renderPreview()}
      </div>

      {!props.isPreviewMode && 
        <div className="preview-btns">
          <button className="up-btn" onClick={()=>props.moveFieldUp(props.id)}>↑</button>
          <button className="down-btn" onClick={()=>props.moveFieldDown(props.id)}>↓</button>
          <button
            className="fieldDelete-btn"
            onClick={() => props.deleteField(props.id)}
          >
            Delete Field
          </button>
        </div>
      }
    </div>
  )
}





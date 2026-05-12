import { useState,useEffect } from "react";
import FieldCard from "../components/FieldCard"
import "./BuilderPage.css"

export default function BuilderPage() {
  const [fields, setFields] = useState(()=>JSON.parse(localStorage.getItem('fields')) || []);
  const [selectedFieldType, setSelectedFieldType] = useState("text")
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  
  useEffect(()=>{
    /*storing and converting to json*/
    localStorage.setItem('fields',JSON.stringify(fields))

  },[fields])

  function addFields(){
    const newFields = {
      id : Date.now(),
      type : selectedFieldType,
      label : "", 
      required : false,
      options : selectedFieldType === "select" ? 
        [{ label:"option 1", value: "option1" },
         { label: "Option 2", value: "option2" }] : []
      }
    setFields([...fields, newFields]);
  }

  const contactFormTemplate = [

  {
    id: Date.now() + 1,
    type: "text",
    label: "Full Name",
    required: true,
    options: []
  },

  {
    id: Date.now() + 2,
    type: "email",
    label: "Email Address",
    required: true,
    options: []
  },

  {
    id: Date.now() + 3,
    type: "text",
    label: "Message",
    required: true,
    options: []
  }
]

  const signupFormTemplate = [
    {
    id: Date.now() + 1,
    type: "text",
    label: "UserName",
    required: true,
    options: []
  },

  {
    id: Date.now() + 2,
    type: "email",
    label: "Email Address",
    required: true,
    options: []
  },

  {
    id: Date.now() + 3,
    type: "password",
    label: "Password",
    required: true,
    options: []
  }
  ]

  const feedbackFormTemplate = [{
    id: Date.now() + 1,
    type: "text",
    label: "Full Name",
    required: true,
    options: []
  },

  {
    id: Date.now() + 2,
    type: "textarea",
    label: "Feedback",
    required: true,
    options: []
  },

  {
    id: Date.now() + 3,
    type: "number",
    label: "Rate out of 10",
    required: true,
    options: []
  }]


  function handleTemplateChange(templateName){
    if(templateName === "contact"){
      return setFields(contactFormTemplate)
    }else if(templateName === "signup"){
      return setFields(signupFormTemplate)
    }else if(templateName === "feedback"){
      return setFields(feedbackFormTemplate)
    }else{
      return
    }
  }
  
 

  function updateFieldLabel(id , newLabel){
    const updateFields = fields.map((field)=>(
      field.id === id ? {...field,label:newLabel} : field
    ))
    setFields(updateFields);
  }

  function updateOptionLabel(fieldId,optionIndex,newLabel){
    
    const updateOptions =  fields.map((field)=> fieldId === field.id ? {...field,options:field.options.map((option,index)=>
      (optionIndex === index ? {...option, label :newLabel} : option))} : field)

     setFields(updateOptions)
      
  }

  function deleteField(id){
    const fieldDelete = fields.filter((filed)=>(
      filed.id !== id 
    ))
    setFields(fieldDelete)
  }

  function updateRequired(id,checkedValue){
    const required = fields.map((field)=>(
      field.id === id ? {...field, required:checkedValue} : field
    ))
    setFields(required)
  }
  
  function addOption(fieldId){
    const newOption = {label : "",value : Date.now()}
    const add = fields.map((field)=>(
      field.id === fieldId ? {...field,options: [...field.options, newOption]} : field
    ))
    setFields(add)
  }

  function deleteOption(fieldId,optionId){
    const optionDelete = fields.map((field)=>(
      fieldId === field.id ? (field.options.length > 1 ?
      {...field, 
       options :  field.options.filter((option,index)=>(optionId !== index)) }:
        field ) : field
    ))
    setFields(optionDelete)
  }

  function handleExport(){

    const jsonData = JSON.stringify(fields,null,2)

    const blob = new Blob([jsonData,{
      type : "application/json"
    }])

    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")

    link.href = url
    link.download = "form-schema.json"

    link.click()

    URL.revokeObjectURL(url)
  }

  function handleImport(){
    try{
    let jsonString = prompt("enter your JSON here")
    if(!jsonString) return;

    const data = JSON.parse(jsonString);
      if(!Array.isArray(data)){
        alert("Invalid JSON format. Please check your syntax")
        return
      }
    setFields(data)}
    catch(e){
      alert("Invalid JSON format. Please check your syntax")
      console.error("Import Error:",e)
    }

  }


  function moveFieldUp(fieldId){
    const updatedFields = [...fields]
    const index =  fields.findIndex( (field)=>(
      fieldId === field.id
    ))
    if(index <= 0){
      return
    }

    [updatedFields[index], updatedFields[index - 1]] = [updatedFields[index - 1], updatedFields[index]]
    
    setFields(updatedFields)
    console.log("up")
  }

  function moveFieldDown(fieldId){
    const updatedFields = [...fields]

    const index =  fields.findIndex( (field)=>(
      fieldId === field.id
    ))
    if(index === fields.length-1 || index === -1){
      return
    }

    [updatedFields[index], updatedFields[index + 1]] = [updatedFields[index + 1], updatedFields[index]]
    
    setFields(updatedFields)
    console.log("down")
  }










  return (
    <div className="builder-container">
      {
      !isPreviewMode && (
      <div>
      <h2>Form Builder</h2>
      <div className="controls">
      <button onClick={addFields}>Add Field</button>
      <select value={selectedFieldType} onChange={(e)=>setSelectedFieldType(e.target.value)}>
        <option value="text">text</option>
        <option value="checkbox">checkbox</option>
        <option value="select">select</option>
        <option value="email">email</option>
        <option value="password">password</option>
        <option value="textarea">textarea</option>
        <option value="number">number</option>
      </select>
      <select onChange={(e)=> handleTemplateChange(e.target.value)}>
        <option value="">Choose a template</option>
        <option value="contact">Contact Form</option>
        <option value="signup">Signup Form</option>
        <option value="feedback">Feedback Form</option>
      </select>
      
      {fields.length > 0 && <button className="export-btn" onClick={handleExport}>Export JSON</button>}
      {fields.length >0 && <button className="import-btn" onClick={handleImport}>Import JSON</button>}
      </div>
      </div>
      )
      }

      {fields.length !== 0 && <button className="previewMode-btn" onClick={()=>setIsPreviewMode(!isPreviewMode)}>{(isPreviewMode) ?"Back to Builder " : "Preview Form"}</button>}
      {
        fields.length === 0 ? 
        <div className="msg-container">
        <p className="render-message">No fields added yet.<br />
          <span>Click "Add Field" to start building your form.</span> 
        </p>
        </div> :
        fields.map((field=>(
          /* settings section*/
          <FieldCard 
            key={field.id}
            id={field.id}
            required={field.required} 
            type={field.type} 
            label={field.label}
            options={field.options}
            updateFieldLabel={updateFieldLabel}
            updateRequired={updateRequired}
            deleteField = {deleteField}
            addOption={addOption}
            deleteOption={deleteOption}
            updateOptionLabel={updateOptionLabel}
            moveFieldUp={moveFieldUp}
            moveFieldDown={moveFieldDown}
            isPreviewMode={isPreviewMode}
            />
            
        )))
      }
      {isPreviewMode && 
      <button
        type="button"
        className="submit-btn" 
        onClick={(e) => {
          e.preventDefault(); // Prevents the page from reloading
          alert("Form submitted successfully");
        }}
      >
        Submit
      </button>
        }


   </div>
  )
}
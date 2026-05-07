import { useState,useEffect } from "react";
import FieldCard from "../components/FieldCard"

export default function BuilderPage() {
  const [fields, setFields] = useState(()=>JSON.parse(localStorage.getItem('fields')) || []);
  const [selectedFieldType, setSelectedFieldType] = useState("text")
  
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
      fieldId === field.id ?
      {...field, 
       options : field.options.filter((option,index)=>(optionId !== index)) }:
        field
    ))
    setFields(optionDelete)
  }

  return (
    <div>
      <h2>Form Builder</h2>
      <button onClick={addFields}>Add Field</button>
      <select value={selectedFieldType} onChange={(e)=>setSelectedFieldType(e.target.value)}>
        <option value="text">text</option>
        <option value="checkbox">checkbox</option>
        <option value="select">select</option>
      </select>
      {
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
            />
            
        )))
      }

   </div>
  )
}